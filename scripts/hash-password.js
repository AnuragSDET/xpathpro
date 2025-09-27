const bcrypt = require('bcryptjs')

const password = process.argv[2] || 'password123'
const hash = bcrypt.hashSync(password, 12)

console.log('Password:', password)
console.log('Hash:', hash)
console.log('\nSQL:')
console.log(`INSERT INTO users (email, name, role, password) VALUES ('your-email@example.com', 'Admin User', 'admin', '${hash}');`)