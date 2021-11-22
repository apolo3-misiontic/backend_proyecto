const { gql } = require("apollo-server-express")
const { type_Avances } = require("../modelos/avances/type_Avances")
const { type_Inscripciones } = require("../modelos/inscripciones/type_Inscripciones")
const { type_Proyectos } = require("../modelos/proyectos/type_Proyectos")
const { type_Usuarios } = require("../modelos/usuarios/type_Usuarios")

const type_General = gql `
    scalar Date

    enum enum_Roles{
        ESTUDIANTE
        LIDER
        ADMINISTRADOR
    }

    enum enum_EstadoRegistro{
        PENDIENTE
        AUTORIZADO
        NO_AUTORIZADO
    }

    enum enum_EstadoInscripcion{
        PENDIENTE
        ACEPTADA
        RECHAZADA
    }

    enum enum_EstadoProyecto{
        ACTIVO
        INACTIVO
    }
    enum enum_FaseProyecto{
        INICIADO
        EN_DESARROLLO
        TERMINADO
        NULL
    }

`
const Types = [type_General, type_Usuarios, type_Proyectos, type_Inscripciones, type_Avances]

module.exports = { Types }