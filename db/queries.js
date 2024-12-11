const pool = require('./pool')
const { format } = require('date-fns')

async function createMember(member) {
  const { username, email, firstName, lastName, password, membership } = member
  try {
    await pool.query(`INSERT INTO members (username, email, first_name, last_name, password, membership)
      VALUES ($1,$2,$3,$4,$5,$6)`,
    [username, email, firstName, lastName, password, membership])
  } catch (err) {
    console.error('Error inserting data')
  }

  

}

async function updateMember(username) {
  try {
    await pool.query(`
      UPDATE members
      SET membership = 'member'
      WHERE username = $1
      `, [username])
  } catch (err) {
    console.error('Error updating membership')
  }
  
}

async function createMessage(message, user) {
  try {
    let timestamp = new Date()
    timestamp = format(timestamp, "EEE MM dd yyyy h:mma 'EST'")

    await pool.query(`
      INSERT INTO messages (message,title,timestamp,username)
        VALUES ($1,$2,$3,$4)
      `,[message.message, message.title, timestamp, user.username])
  } catch (err) {
    console.error('Error sending message')
  }

}

async function getAllMessages() {
  try {
    const { rows } = await pool.query(`SELECT * FROM messages;`)
    return rows
  } catch (err) {
    console.error('Error retrieving messages')
  }
  
}

module.exports = {
  createMember,
  createMessage,
  updateMember,
  getAllMessages
}