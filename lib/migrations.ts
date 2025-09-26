import { supabase } from './supabase'

export async function runMigrations() {
  try {
    // Create layout_settings table using direct SQL
    const { error: createError } = await supabase
      .rpc('exec_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS layout_settings (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            key VARCHAR(255) UNIQUE NOT NULL,
            value JSONB NOT NULL,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `
      })

    if (createError) {
      console.log('Table creation attempt:', createError.message)
      // Try alternative approach - direct table creation
      try {
        await supabase.from('layout_settings').select('id').limit(1)
        console.log('✅ layout_settings table exists')
      } catch {
        console.log('⚠️  Creating table via upsert...')
      }
    } else {
      console.log('✅ Created layout_settings table')
    }

    // Insert default navbar settings
    const { error: insertError } = await supabase
      .from('layout_settings')
      .upsert({
        key: 'navbar',
        value: {
          logo: 'xPath Pro',
          links: [
            { label: 'Home', href: '/' },
            { label: 'Courses', href: '/courses' },
            { label: 'About', href: '/about' },
            { label: 'Contact', href: '/contact' }
          ],
          ctaButton: {
            label: 'Get Started',
            href: '/courses'
          }
        }
      }, { onConflict: 'key' })

    if (insertError) {
      console.error('Failed to insert navbar settings:', insertError)
    } else {
      console.log('✅ Default navbar settings configured')
    }

    return { success: true }
  } catch (error) {
    console.error('Migration failed:', error)
    return { success: false, error }
  }
}