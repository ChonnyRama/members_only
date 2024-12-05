const pool = require('./pool')

async function createMember(member) {
  const { username, email, firstName, lastName, password } = member
  try {
    await pool.query(`INSERT INTO members (username, email, first_name, last_name, password, membership)
      VALUES ($1,$2,$3,$4,$5, 'basic')`,
    [username, email, firstName, lastName, password])
  } catch (err) {
    console.error('Error inserting data')
  }

  

}

async function createMessage(message) {

}

module.exports = {
  createMember,
  createMessage
}