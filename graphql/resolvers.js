const { resolvers_Inscripciones } = require("../modelos/inscripciones/resolvers_Inscripciones");
const { resolvers_Proyectos } = require("../modelos/proyectos/resolvers_Proyectos");
const { resolvers_Usuarios } = require("../modelos/usuarios/resolvers_Usuarios");

const Resolvers = [resolvers_Usuarios, resolvers_Proyectos, resolvers_Inscripciones]

module.exports = { Resolvers }