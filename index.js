const express = require("express")
const cors = require("cors")
const { ApolloServer, ApolloError } = require("apollo-server-express")
const { conexionBD } = require("./basedatos.config/basedatos")
const { Types } = require("./graphql/typeDefs")
const { Resolvers } = require("./graphql/resolvers")
const { ValidarToken } = require("./modelos/auth/Auth")

require("dotenv").config()

const app = express()
const puerto = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

const servidor = new ApolloServer({
    typeDefs: Types,
    resolvers: Resolvers,
    context: ({ req, res }) => {
        const token = req.headers?.authorization ?? null
        if(token) {
            const dataUsuario = ValidarToken(token)
            if (dataUsuario) {
                return { dataUsuario: dataUsuario }
            }
        }
        return { Error: "Su sesion expiró o no ha ingresado correctamente" }
    },

})

/* app.use((req, res, next) => {
    if (!req.headers.authorization) {
        res.send(new ApolloError("problemas asquis"))
    } else {
        next()
    }
}) */

app.listen(puerto, async () => {
    conexionBD()
        .then(() => servidor.start())
        .then(() => servidor.applyMiddleware({ app }))
        .then(() => console.log("conexion exitosa al servidor, puerto =>", puerto))
        .catch(e => console.warn({ messageError: e }))
})