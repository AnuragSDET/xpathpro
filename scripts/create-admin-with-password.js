const { createClient } = require('@supabase/supabase-js')
const bcrypt = require('bcryptjs')

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function createAdminUser() {
  try {
    console.log('Creating admin user with password authentication...')
    
    // Hash the password
    const hashedPassword = await bcrypt.hash('admin123', 12)
    
    // Create or update admin user
    const { data, error } = await supabase
      .from('users')
      .upsert({
        email: 'admin@xpath.pro',
        name: 'Admin User',
        role: 'admin',
        status: 'active',
        provider: 'credentials',
        password_hash: hashedPassword
      }, {
        onConflict: 'email'
      })
      .select()

    if (error) {
      console.error('Error creating admin user:', error)
      return
    }

    console.log('✅ Admin user created successfully!')
    console.log('📧 Email: admin@xpath.pro')
    console.log('🔑 Password: admin123')
    console.log('🎯 Role: admin')
    
  } catch (error) {
    console.error('Setup failed:', error)
  }
}

createAdminUser()