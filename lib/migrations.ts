import { supabase } from './supabase'

export async function runMigrations() {
  try {
    // Check if layout_settings table exists
    const { data: tables } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_name', 'layout_settings')

    if (!tables || tables.length === 0) {
      // Create layout_settings table
      const { error: createError } = await supabase.rpc('exec', {
        sql: `
          CREATE TABLE layout_settings (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            key VARCHAR(255) UNIQUE NOT NULL,
            value JSONB NOT NULL,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `
      })

      if (createError) {
        console.error('Failed to create layout_settings table:', createError)
      } else {
        console.log('✅ Created layout_settings table')
      }
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