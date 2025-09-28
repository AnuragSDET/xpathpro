'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import curriculumData from '@/data/curriculum'

export default function BulkImport() {
  const [importing, setImporting] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [stepImporting, setStepImporting] = useState(false)
  const [stepResults, setStepResults] = useState<any[]>([])
  const [currentStep, setCurrentStep] = useState('')

  const handleStepImport = async () => {
    setStepImporting(true)
    setStepResults([])
    setResult(null)

    try {
      const adminUser = localStorage.getItem('adminUser')
      if (!adminUser) {
        setStepResults([{ success: false, message: 'Please login as admin first' }])
        setStepImporting(false)
        return
      }

      const steps = ['categories', 'lessons', ...Array.from({ length: curriculumData.categories.length }, (_, i) => i)]
      
      for (const step of steps) {
        let stepName = ''
        if (step === 'categories') stepName = 'Creating Categories'
        else if (step === 'lessons') stepName = 'Creating Lessons'
        else stepName = `Creating Courses for ${curriculumData.categories[step as number].name}`
        
        setCurrentStep(stepName)
        
        const response = await fetch('/api/bulk-import-step', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-admin-user': adminUser
          },
          body: JSON.stringify({ step })
        })

        const data = await response.json()
        setStepResults(prev => [...prev, data])
        
        if (!data.success) break
        
        // Small delay between steps
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    } catch (error) {
      setStepResults(prev => [...prev, {
        success: false,
        message: `Step import failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      }])
    } finally {
      setStepImporting(false)
      setCurrentStep('')
    }
  }

  const handleImport = async () => {
    setImporting(true)
    setResult(null)

    try {
      // Get admin user from localStorage
      const adminUser = localStorage.getItem('adminUser')
      if (!adminUser) {
        setResult({
          success: false,
          error: 'Please login as admin first'
        })
        setImporting(false)
        return
      }

      // Add timeout to prevent hanging
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

      const response = await fetch('/api/bulk-import', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-user': adminUser
        },
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const data = await response.json()
      setResult(data)
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        setResult({
          success: false,
          error: 'Import timed out. This might be due to Sanity API issues. Please check your Sanity configuration.'
        })
      } else {
        setResult({
          success: false,
          error: `Failed to import curriculum: ${error instanceof Error ? error.message : 'Unknown error'}`
        })
      }
    } finally {
      setImporting(false)
    }
  }

  const totalCourses = curriculumData.categories.reduce((acc, cat) => acc + cat.courses.length, 0)
  const totalLessons = curriculumData.categories.reduce((acc, cat) => 
    acc + cat.courses.reduce((courseAcc, course) => 
      courseAcc + (course.lessons?.length || 0), 0), 0)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-2">
          Bulk Import Curriculum
        </h1>
        <p className="text-slate-400">Import all categories, courses, and lessons from TestMaster curriculum</p>
      </div>

      {/* Preview */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Import Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{curriculumData.categories.length}</div>
              <div className="text-slate-400">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">{totalCourses}</div>
              <div className="text-slate-400">Courses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{totalLessons}</div>
              <div className="text-slate-400">Unique Lessons</div>
            </div>
          </div>

          <div className="space-y-4">
            {curriculumData.categories.map((category, index) => (
              <div key={index} className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">{category.name}</h3>
                <p className="text-slate-400 text-sm mb-3">{category.description}</p>
                <div className="flex flex-wrap gap-2">
                  {category.courses.map((course, courseIndex) => (
                    <Badge 
                      key={courseIndex} 
                      variant={(course as any).shared ? "secondary" : "default"}
                      className={(course as any).shared ? "bg-yellow-600/20 text-yellow-400" : ""}
                    >
                      {course.title} {(course as any).shared && "(Shared)"}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-600/20 border border-blue-500/30 rounded-lg">
            <h4 className="text-blue-400 font-semibold mb-2">Smart Lesson Sharing</h4>
            <p className="text-slate-300 text-sm">
              Courses marked as "Shared" will reference the same lesson content. For example, 
              "Java Programming" appears in multiple categories but will be created once and shared across all courses.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Import Button */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Button
              onClick={handleImport}
              disabled={importing || stepImporting}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-3"
            >
              {importing ? 'Importing Curriculum...' : 'Import All Curriculum Data'}
            </Button>
            <Button
              onClick={handleStepImport}
              disabled={importing || stepImporting}
              variant="outline"
              className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3"
            >
              {stepImporting ? `Step Import: ${currentStep}...` : 'Import Step-by-Step (Recommended)'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Step Results */}
      {stepResults.length > 0 && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Step-by-Step Import Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stepResults.map((stepResult, index) => (
                <div key={index} className={`p-3 rounded-lg border ${
                  stepResult.success 
                    ? 'bg-emerald-600/20 border-emerald-500/30 text-emerald-400' 
                    : 'bg-red-600/20 border-red-500/30 text-red-400'
                }`}>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">
                      {stepResult.success ? '✅' : '❌'} {stepResult.message}
                    </span>
                    {stepResult.count && (
                      <span className="text-sm opacity-75">({stepResult.count} items)</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {result && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className={`text-white ${result.success ? 'text-emerald-400' : 'text-red-400'}`}>
              Import {result.success ? 'Successful' : 'Failed'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {result.success ? (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">{result.stats.categories}</div>
                    <div className="text-slate-400">Categories Created</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-400">{result.stats.courses}</div>
                    <div className="text-slate-400">Courses Created</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">{result.stats.lessons}</div>
                    <div className="text-slate-400">Lessons Created</div>
                  </div>
                </div>
                <div className="p-4 bg-emerald-600/20 border border-emerald-500/30 rounded-lg">
                  <p className="text-emerald-400 font-semibold">✅ All curriculum data has been imported successfully!</p>
                  <p className="text-slate-300 text-sm mt-1">
                    You can now manage courses and lessons through the admin panel or Sanity Studio.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-red-600/20 border border-red-500/30 rounded-lg">
                <p className="text-red-400 font-semibold">❌ Import failed</p>
                <p className="text-slate-300 text-sm mt-1">{result.error}</p>
                {result.details && (
                  <p className="text-slate-400 text-xs mt-2">{result.details}</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}