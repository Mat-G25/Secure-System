const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/authControllers');
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

const checkRole = require('../middlewares/roleMiddleware')

router.get('/profile', authMiddleware, (req, res) => {
  res.json({
    message: `Bem-vindo de volta, usuário ${req.user.id}!`,
    seu_cargo: req.user.role,
    dados_sensiveis: "Aqui estariam dados que só você pode ver."
  });
});

router.get('/admin', authMiddleware, checkRole(['admin']), (req, res) => {
  res.json({
    message: 'Área Restrita acessada com sucesso!',
    segredo: 'O código nuclear é 1234'
  });
});

module.exports = router