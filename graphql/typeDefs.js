const { gql } = require("apollo-server-express")
const { type_Inscripciones } = require("../modelos/inscripciones/type_Inscripciones")
const { type_Proyectos } = require("../modelos/proyectos/type_Proyectos")
const { type_Usuarios } = require("../modelos/usuarios/type_Usuarios")

const type_General = gql `
    scalar Date
`
const Types = [type_General, type_Usuarios, type_Proyectos, type_Inscripciones]

module.exports = { Types }