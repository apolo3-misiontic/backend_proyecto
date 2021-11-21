const { modeloUsuarios } = require("./Usuarios")

const resolvers_Usuarios = {
    Query: {
        listarUsuarios: async(parent, arg) => {
            const listaUsuarios = await modeloUsuarios.find()
                .populate("Proyectos_Liderados")
                .populate({ path: "Inscripciones", populate: "Proyecto_Id" })

            return listaUsuarios
        },
        buscarUsuario: async(parent, arg) => {

            const filtroinscripcion = arg.FiltroInscripciones && { Estado: arg.FiltroInscripciones }

            if (Object.keys(arg).includes("_id")) {
                const buscarUsuario = await modeloUsuarios.findById({ _id: arg._id })
                    .populate("Proyectos_Liderados")
                    .populate({ path: "Inscripciones", match: {...filtroinscripcion }, populate: "Proyecto_Id" })

                return buscarUsuario

            } else if (Object.keys(arg).includes("correoOidentificacion")) {
                const buscarUsuario = await modeloUsuarios.findOne({ $or: [{ Correo: arg.correoOidentificacion }, { Identificacion: arg.correoOidentificacion }] })
                    .populate("Proyectos_Liderados")
                    .populate({ path: "Inscripciones", match: {...filtroinscripcion }, populate: "Proyecto_Id" })

                return buscarUsuario
            }
        }
    },
    Mutation: {
        crearUsuario: async(parent, arg) => {

            const usuarioCreado = await modeloUsuarios.create({
                Primer_Nombre: arg.Primer_Nombre,
                Segundo_Nombre: arg.Segundo_Nombre,
                Primer_Apellido: arg.Primer_Apellido,
                Segundo_Apellido: arg.Segundo_Apellido,
                Correo: arg.Correo,
                Identificacion: arg.Identificacion,
                Contrasena: arg.Contrasena,
                Rol: arg.Rol,
            })
            return usuarioCreado
        },
        editarUsuario_Id: async(parent, arg) => {
            const usuarioEditadoId = await modeloUsuarios.findByIdAndUpdate({ _id: arg._id }, {
                Primer_Nombre: arg.Primer_Nombre,
                Segundo_Nombre: arg.Segundo_Nombre,
                Primer_Apellido: arg.Primer_Apellido,
                Segundo_Apellido: arg.Segundo_Apellido,
                Correo: arg.Correo,
                Identificacion: arg.Identificacion,
                Contrasena: arg.Contrasena,
                Estado: arg.Estado
            }, { new: true })
            return usuarioEditadoId
        },
        eliminarUsuario: async(parent, arg) => {
            if (Object.keys(arg).includes("_id")) {
                const usuarioEliminado = await modeloUsuarios.findByIdAndDelete({ _id: arg._id })
                return usuarioEliminado
            } else if (Object.keys(arg).includes("Correo")) {
                const usuarioEliminado = await modeloUsuarios.findOneAndDelete({ Correo: arg.Correo })
                return usuarioEliminado
            } else if (Object.keys(arg).includes("Identificacion")) {
                const usuarioEliminado = await modeloUsuarios.findOneAndDelete({ Identificacion: arg.Identificacion })
                return usuarioEliminado
            }
        }

    }
}

module.exports = { resolvers_Usuarios }

/*
else if (Object.keys(arg).includes("Identificacion")) {
                const buscarUsuario = await modeloUsuarios.findOne({ Identificacion: arg.Identificacion })
                    .populate("Proyectos_Liderados")
                    .populate({ path: "Inscripciones", populate: "Proyecto_Id" })

                return buscarUsuario
*/