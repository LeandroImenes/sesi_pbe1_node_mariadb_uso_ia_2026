const express = require("express")
const router = express.Router()

const usuarioController = require('./controllers/usuario')
const usoiaController = require('./controllers/usoia')

const rotaInicial = (req, res) => {
    res.json("Back-end respondendo")
}

router.get('/', rotaInicial)

// Rotas para usuario
router.get('/usuario', usuarioController.listar)
router.get('/usuario/:id', usuarioController.buscarPorId)
router.post('/usuario', usuarioController.cadastrar)
router.patch('/usuario/:id', usuarioController.alterar)
router.delete('/usuario/:id', usuarioController.excluir)
router.post('/usuario/login', usuarioController.login)

// Rotas para usoia
router.get('/usoia', usoiaController.listar)
router.get('/usoia/resumo', usoiaController.resumo)
router.get('/usoia/:id', usoiaController.buscarPorId)
router.post('/usoia', usoiaController.cadastrar)
router.put('/usoia/:id', usoiaController.alterar)
router.delete('/usoia/:id', usoiaController.excluir)

module.exports = router
