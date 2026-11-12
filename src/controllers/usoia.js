const con = require('../db')

const cadastrar = (req, res) => {
    const { usuarioId, sistema, tipo, finalidade, tecnologia, nivelRisco, revisaoHumana } = req.body
    try {
        const sql = 'INSERT INTO usoia (usuarioId, sistema, tipo, finalidade, tecnologia, nivelRisco, revisaoHumana) VALUES (?, ?, ?, ?, ?, ?, ?);'
        con.query(sql, [usuarioId, sistema, tipo, finalidade, tecnologia, nivelRisco, revisaoHumana], (err, results) => {
            if (err) {
                console.error(err)
                res.status(500).json({ error: 'Erro ao cadastrar usoia' })
            } else {
                const novoRegistro = req.body
                novoRegistro.id = results.insertId
                res.status(201).json({ message: 'usoia cadastrado(a) com sucesso', data: novoRegistro })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Erro ao cadastrar usoia', details: 'Informe { usuarioId, sistema, tipo, finalidade, tecnologia, nivelRisco, revisaoHumana }' })
    }
}

const listar = (req, res) => {
    const sql = 'SELECT * FROM usoia;'
    con.query(sql, (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao buscar usoia' })
        } else {
            res.json(results)
        }
    })
}

const buscarPorId = (req, res) => {
    const id = Number(req.params.id)
    const sql = 'SELECT * FROM usoia WHERE id = ?;'
    con.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao buscar usoia' })
        } else {
            if (results.length === 0) {
                res.status(404).json({ message: 'usoia não encontrado(a)' })
            } else {
                res.json(results[0])
            }
        }
    })
}

const alterar = (req, res) => {
    const id = Number(req.params.id)
    const chaves = Object.keys(req.body)
    let campos = ''
    const colunas = []
    chaves.forEach((chave) => {
        campos += `${chave} = ?,`
        colunas.push(req.body[chave])
    })
    campos = campos.slice(0, -1)
    colunas.push(id)
    const sql = `UPDATE usoia SET ${campos} WHERE id = ?;`
    con.query(sql, colunas, (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ erro: 'Erro ao alterar usoia', msg: err.sqlMessage })
        } else {
            if (results.affectedRows == 1)
                res.json("Registro alterado com sucesso")
            else
                res.status(404).json({ msg: "Nada alterado no banco de dados", erro: results })
        }
    })
}

const excluir = (req, res) => {
    const id = Number(req.params.id)
    const sql = 'DELETE FROM usoia WHERE id = ?;'
    con.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ erro: 'Erro ao excluir usoia', msg: err.sqlMessage })
        } else {
            if (results.affectedRows == 1)
                res.json("Registro excluído com sucesso")
            else
                res.status(404).json({ msg: "Nada alterado no banco de dados", erro: results })
        }
    })
}

const resumo = (req, res) => {
    const sql1 = 'SELECT count(*) as "Total" FROM usoia;'
    const sql2 = 'SELECT * FROM usoia;'
    con.query(sql1, (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao contar total' })
        } else {
            const resposta = {}
            resposta.media = results
            con.query(sql2, (err, results) => {
                if (err) {
                    console.error(err)
                    res.status(500).json({ error: 'Erro ao buscar ocorrencia' })
                } else {
                    resposta.eventos = results
                    res.json(resposta)
                }
            })
        }
    })
}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    alterar,
    excluir,
    resumo
}
