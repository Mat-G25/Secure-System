require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const authRoutes = require('./routes/authRoutes')
const app = express()


app.use(helmet())
app.use(cors())
app.use(express.json())
app.use('/auth', authRoutes)

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Muitas requisições vindo deste IP, tente novamente mais tarde.',
})
app.use(limiter)


app.get('/', (req, res) => {
  res.json({ message: 'API rodando!' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
