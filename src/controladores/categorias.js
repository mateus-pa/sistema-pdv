const knex = require('../bancodedados/conexao');

const cadastrarCategoria = async (req, res) => {
    const { descricao } = req.body;

    if(!descricao){
        return res.status(400).json({ mensagem: 'A descrição da Categoria é obrigatória '})
    }

    const categoriaExiste = await pool.query(
        `SELECT * FROM categorias WHERE descricao = $1`,
        [descricao]
      );

      if (categoriaExiste.rowCount > 0)
      return res.status(400).json({
        mensagem: "Categoria já cadastrada",
      });

    try {
        const query = 'insert into categorias(descricao) values ($1) returning *'
        const {rows} = await pool.query(query,[descricao])

        return res.status(201).json(rows[0]);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor'})
    }
}

const listarCategoria = async (req, res ) => {
    try {
        const query = 'SELECT * FROM categorias'
                

        const { rows } = await pool.query(query)

        return res.json(rows)
        
    } catch (error) {
        return res .status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

module.exports = {
    cadastrarCategoria,
    listarCategoria
}