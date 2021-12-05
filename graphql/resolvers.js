const { resolvers_Auth } = require("../modelos/auth/resolvers_Auth");
const { resolvers_Avances } = require("../modelos/avances/resolvers_Avances");
const { resolvers_Inscripciones } = require("../modelos/inscripciones/resolvers_Inscripciones");
const { resolvers_Proyectos } = require("../modelos/proyectos/resolvers_Proyectos");
const { resolvers_Usuarios } = require("../modelos/usuarios/resolvers_Usuarios");

const Resolvers = [resolvers_Usuarios, resolvers_Auth,resolvers_Proyectos, resolvers_Inscripciones, resolvers_Avances]

module.exports = { Resolvers }