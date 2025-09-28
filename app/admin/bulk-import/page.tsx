'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import curriculumData from '@/data/curriculum'

export default function BulkImport() {
  const [importing, setImporting] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleImport = async () => {
    setImporting(true)
    setResult(null)

    try {
      const response = await fetch('/api/bulk-import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        error: 'Failed to import curriculum'
      })
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
                      variant={course.shared ? "secondary" : "default"}
                      className={course.shared ? "bg-yellow-600/20 text-yellow-400" : ""}
                    >
                      {course.title} {course.shared && "(Shared)"}
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
          <Button
            onClick={handleImport}
            disabled={importing}
            className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-3"
          >
            {importing ? 'Importing Curriculum...' : 'Import All Curriculum Data'}
          </Button>
        </CardContent>
      </Card>

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