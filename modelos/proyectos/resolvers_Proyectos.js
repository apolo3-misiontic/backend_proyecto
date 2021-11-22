const { modeloProyectos } = require("./Proyectos")

const resolvers_Proyectos = {
    Query: {
        listarProyectos: async(parent, arg) => {
            const listadoProyectos = await modeloProyectos.find()
                .populate("Lider_Id")
                .populate({ path: "Inscripciones", populate: "Estudiante_Id" })
                .populate({ path: "Avances_Proyecto", populate: "Estudiante_Id" })


            return listadoProyectos
        },
        buscarProyecto: async(parent, arg) => {
            const proyecto = await modeloProyectos.findById({ _id: arg._id })
                .populate("Lider_Id")
                .populate({ path: "Inscripciones", populate: "Estudiante_Id" })
                .populate({ path: "Avances_Proyecto", populate: "Estudiante_Id" })


            return proyecto
        },
        buscarProyectosPorLider: async(parent, arg) => {
            const proyectosPorLider = await modeloProyectos.find({ Lider_Id: arg.Lider_Id })
                .populate("Lider_Id")
                .populate({ path: "Inscripciones", populate: "Estudiante_Id" })
                .populate({ path: "Avances_Proyecto", populate: "Estudiante_Id" })

            return proyectosPorLider
        }
    },
    Mutation: {
        crearProyecto: async(parent, arg) => {

            const proyectoCreado = await modeloProyectos.create({
                Nombre_Proyecto: arg.Nombre_Proyecto,
                Objetivo_General: arg.Objetivo_General,
                Objetivos_Especificos: arg.Objetivos_Especificos,
                Presupuesto: arg.Presupuesto,
                Fecha_Inicio: arg.Fecha_Inicio,
                Fecha_Terminacion: arg.Fecha_Terminacion,
                Lider_Id: arg.Lider_Id,
                Estado: arg.Estado,
                Fase: arg.Fase
            })

            //const proyecto = await modeloProyectos.findById({ _id: proyectoCreado._id }).populate("Lider_Id")
            return proyectoCreado
        },
        editarProyecto: async(parent, arg) => {
            const proyectoEditado = await modeloProyectos.findByIdAndUpdate({ _id: arg._id }, {
                Nombre_Proyecto: arg.Nombre_Proyecto,
                Objetivo_General: arg.Objetivo_General,
                $push: { Objetivos_Especificos: arg.Objetivos_Especificos },
                Presupuesto: arg.Presupuesto,
                Fecha_Inicio: arg.Fecha_Inicio,
                Fecha_Terminacion: arg.Fecha_Terminacion,
                Estado: arg.Estado,
                Fase: arg.Fase
            }, { new: true })
            return proyectoEditado
        },
        eliminarProyecto: async(parent, arg) => {
            const proyectoEliminado = await modeloProyectos.findByIdAndDelete({ _id: arg._id })
            return proyectoEliminado
        }
    }
}

module.exports = { resolvers_Proyectos }