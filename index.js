const express = require("express")
const cors = require("cors")
const { ApolloServer } = require("apollo-server-express")
const { conexionBD } = require("./basedatos.config/basedatos")
const { Types } = require("./graphql/typeDefs")
const { Resolvers } = require("./graphql/resolvers")

require("dotenv").config()

const app = express()
const puerto = process.env.PORT || 4444

app.use(cors())
app.use(express.json())

const servidor = new ApolloServer({
    typeDefs: Types,
    resolvers: Resolvers
})


app.listen(puerto, async() => {
    conexionBD()
        .then(() => servidor.start())
        .then(() => servidor.applyMiddleware({ app }))
        .then(() => console.log("conexion exitosa al servidor, puerto =>", puerto))
        .catch(e => console.warn({ messageError: e }))
})