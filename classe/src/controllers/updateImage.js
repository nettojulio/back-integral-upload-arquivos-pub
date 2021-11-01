const { sendFile, deleteFile, fullURL } = require('../services/digitalOcean');
const knex = require('../connections/conexao');

const atualizarImagem = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;
    const { imagem, imagem_b64 } = req.body;

    try {
        const produtoEncontrado = await knex('produtos').where({
            id,
            usuario_id: usuario.id
        }).first();

        if (!produtoEncontrado) {
            return res.status(404).json('Produto não encontrado');
        }

        if (imagem === null || typeof imagem !== 'string' || !imagem.trim()) {
            return res.status(404).json('Nome da imagem não é válido!');
        }

        if (imagem_b64 === null || typeof imagem_b64 !== 'string' || !imagem_b64.trim()) {
            return res.status(404).json('Formato de codificação para atualização é inválido!');
        }


        const deleteImage = await deleteFile(produtoEncontrado.imagem);
        if (deleteImage.error) {
            res.status(400).json(deleteImage.error.message);
        }

        const buffer = Buffer.from(imagem_b64, 'base64');

        const failureUpload = await sendFile(imagem, buffer);

        if (failureUpload.error) {
            return res.status(400).json(failureUpload.error.message);
        }

        const urlImagem = fullURL(imagem);
        if (urlImagem.error) {
            return res.status(400).json(urlImagem.error.message);
        }

        const produto = await knex('produtos')
            .where({ id })
            .update({
                imagem
            });

        if (!produto) {
            return res.status(400).json("Imagem não foi atualizada");
        }

        return res.status(200).json('Imagem foi atualizada com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = { atualizarImagem }