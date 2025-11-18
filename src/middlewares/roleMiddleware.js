const checkRole = (rolesPermitidas) => {
  return (req, res, next) => {
    const userRole = req.user.role

    if (!rolesPermitidas.includes(userRole)) {
      return res.status(403).json({
        message: 'Acesso Proibido: Você não tem permissão de Admin! 🚫',
      })
    }

    next()
  }
}

module.exports = checkRole
