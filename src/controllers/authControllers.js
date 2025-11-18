const db = require('../config/db')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body

  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email])
    const user = result.rows[0]

    if (!user) {
      return res.status(400).json({ message: 'E-mail ou senha inválidos' })
    }

    const validPassword = await bcrypt.compare(password, user.password_hash)
    if (!validPassword) {
      return res.status(400).json({ message: 'E-mail ou senha inválidos' })
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }, 
    )

    res.json({
      message: 'Login realizado com sucesso!',
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erro no servidor' })
  }
}

exports.register = async (req, res) => {
  const { name, email, password } = req.body

  try {
    const userExists = await db.query('SELECT * FROM users WHERE email = $1', [email])
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'E-mail já cadastrado!' })
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = await db.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, role',
      [name, email, passwordHash],
    )

    res.status(201).json({
      message: 'Usuário criado com sucesso!',
      user: newUser.rows[0],
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erro no servidor' })
  }
}
