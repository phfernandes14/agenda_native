// API REST dos Contatos
import express from 'express'
import { connectToDatabase } from '../utils/mongodb.js'
import { check, validationResult } from 'express-validator'

const router = express.Router()
const nomeCollection = 'contatos'
const { db, ObjectId } = await connectToDatabase()

/**********************************************
 * Validações
 * 
 **********************************************/
const validaContato = [
    check('nome')
        .not().isEmpty().trim().withMessage('É obrigatório informar o nome')
        .isAlphanumeric('pt-BR', { ignore: '/. ' }).withMessage('O nome deve conter apenas caracteres alfanuméricos')
        .isLength({ min: 3 }).withMessage('O nome é muito curta. Informe ao menos 3 caracteres')
        .isLength({ max: 100 }).withMessage('O nome é muito longo. Informe no máximo 100 caracteres'),
    check('email')
    .not().isEmpty().trim().withMessage('É obrigatório informar o email do contato')
    .isLowercase().withMessage('O email não pode conter caracteres MAIÚSCULOS')
    .isEmail().withMessage('O email do contato deve ser válido'),
    check('ddd_telefone_1').not().isEmpty().trim().withMessage('É obrigatório informar o 1°Telefone'),
    check('ddd_telefone_2').not().isEmpty().trim().withMessage('É obrigatório informar o 2°Telefone')
      ]


check('text_settings_descriptions.*.value')

/**********************************************
 * GET /api/contatos
 **********************************************/
 router.get('/', async (req, res) => {
    /* 
     #swagger.tags = ['Prestadores']
     #swagger.description = 'Endpoint para obter todos os Prestadores de Serviço do sistema.' 
     */
    try {
      db.collection(nomeCollection).find({}, {
        projection: { senha: false }
      }).sort({ nome: 1 }).toArray((err, docs) => {
        if (!err) {
          /* 
          #swagger.responses[200] = { 
       schema: { "$ref": "#/definitions/Prestadores" },
       description: "Listagem dos prestadores de serviço obtida com sucesso" } 
       */
          res.status(200).json(docs)
        }
      })
    } catch (err) {
      /* 
         #swagger.responses[500] = { 
      schema: { "$ref": "#/definitions/Erro" },
      description: "Erro ao obter a listagem dos prestadores" } 
      */
      res.status(500).json({
        errors: [
          {
            value: `${err.message}`,
            msg: 'Erro ao obter a listagem dos contatos',
            param: '/'
          }
        ]
      })
    }
  })

/**********************************************
 * GET /contatos/id/:id
 **********************************************/
router.get("/id/:id", async (req, res) => {
      /* #swagger.tags = ['Prestadores']
      #swagger.description = 'Endpoint que retorna os dados do prestador filtrando pelo id' 
      */
    try {
        db.collection(nomeCollection).find({ "_id": { $eq: ObjectId(req.params.id) } }).toArray((err, docs) => {
            if (err) {
                res.status(400).json(err) //bad request
            } else {
                res.status(200).json(docs) //retorna o documento
            }
        })
    } catch (err) {
        res.status(500).json({ "error": err.message })
    }
})

/**********************************************
 * GET /prestadores/razao/:razao
 **********************************************/
router.get("/razao/:razao", async (req, res) => {
    /* #swagger.tags = ['Prestadores']
      #swagger.description = 'Endpoint que retorna os dados do prestador filtrando por parte da Razão Social' 
      */
    try {
        db.collection(nomeCollection).find({ nome: { $regex: req.params.nome, $options: "i" } }).toArray((err, docs) => {
            if (err) {
                res.status(400).json(err) //bad request
            } else {
                res.status(200).json(docs) //retorna o documento
            }
        })
    } catch (err) {
        res.status(500).json({ "error": err.message })
    }
})

/**********************************************
 * POST /prestadores/
 **********************************************/
router.post('/', validaContato, async (req, res) => {
    /* #swagger.tags = ['Prestadores']
      #swagger.description = 'Endpoint que inclui um novo prestador' 
      */
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json(({
            errors: errors.array()
        }))
    } else {
        await db.collection(nomeCollection)
            .insertOne(req.body)
            .then(result => res.status(201).send(result)) //retorna o ID do documento inserido)
            .catch(err => res.status(400).json(err))
    }
})

/**********************************************
 * PUT /prestadores
 * Alterar um prestador pelo ID
 **********************************************/
router.put('/', validaContato, async (req, res) => {
  let idDocumento = req.body._id
  delete req.body._id //removendo o ID do body para o update não apresentar o erro 66
    /* #swagger.tags = ['Prestadores']
      #swagger.description = 'Endpoint que permite alterar os dados do prestador pelo id' 
      */
    const schemaErrors = validationResult(req)
    if (!schemaErrors.isEmpty()) {
        return res.status(403).json(({
            errors: schemaErrors.array() //retorna um Forbidden
        }))
    } else {
        await db.collection(nomeCollection)
            .updateOne({ '_id': { $eq: ObjectId(idDocumento) } },
                { $set: req.body }
            )
            .then(result => res.status(202).send(result))
            .catch(err => res.status(400).json(err))
    }
})

/**********************************************
 * DELETE /contato/
 **********************************************/
router.delete('/:id', async (req, res) => {
    /* #swagger.tags = ['Prestadores']
      #swagger.description = 'Endpoint que permite excluir um prestador filtrando pelo id' 
      */
    await db.collection(nomeCollection)
        .deleteOne({ "_id": { $eq: ObjectId(req.params.id) } })
        .then(result => res.status(202).send(result))
        .catch(err => res.status(400).json(err))
})

export default router