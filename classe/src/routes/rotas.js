const express = require('express');
const usuarios = require('../controllers/usuarios');
const login = require('../controllers/login');
const produtos = require('../controllers/produtos');
const atualizar = require('../controllers/updateImage');
const excluir = require('../controllers/deleteImage');
const verificaLogin = require('../middlewares/verificaLogin');

const rotas = express();

// cadastro de usuario
rotas.post('/usuarios', usuarios.cadastrarUsuario);

// login
rotas.post('/login', login.login);

// filtro para verificar usuario logado
rotas.use(verificaLogin);

// obter e atualizar perfil do usuario logado
rotas.get('/perfil', usuarios.obterPerfil);
rotas.put('/perfil', usuarios.atualizarPerfil);

// crud de produtos
rotas.get('/produtos', produtos.listarProdutos);
rotas.get('/produtos/:id', produtos.obterProduto);
rotas.post('/produtos', produtos.cadastrarProduto);
rotas.put('/produtos/:id', produtos.atualizarProduto);
rotas.delete('/produtos/:id', produtos.excluirProduto);

rotas.put('/atualizar/produtos/:id', atualizar.atualizarImagem);
rotas.delete('/atualizar/produtos/:id', excluir.excluirImagem);

module.exports = rotas;