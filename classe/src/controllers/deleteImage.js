const { deleteFile } = require('../services/digitalOcean');
const knex = require('../connections/conexao');

const excluirImagem = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;

    try {
        const produtoEncontrado = await knex('produtos').where({
            id,
            usuario_id: usuario.id
        }).first();

        if (!produtoEncontrado) {
            return res.status(404).json('Produto não encontrado');
        }
        const deleteImage = await deleteFile(produtoEncontrado.imagem);
        if (deleteImage.error) {
            res.status(400).json(deleteImage.error.message);
        }

        const produto = await knex('produtos')
            .where({ id })
            .update({
                imagem: null
            });

        if (!produto) {
            return res.status(400).json("Imagem não foi excluida!");
        }

        return res.status(200).json('Imagem foi excluida com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = { excluirImagem }