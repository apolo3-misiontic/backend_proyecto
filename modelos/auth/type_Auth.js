const {gql} = require("apollo-server-express")

const type_Auth = gql`

    type Token{
        Token: String
        Error: String
    }

    type Query{
        refrescarTokenUsuario: Token
    }

    type Mutation{

        registrarUsuario(
            Primer_Nombre: String!
            Segundo_Nombre: String
            Primer_Apellido: String!
            Segundo_Apellido: String!
            Correo: String!
            Identificacion: String!
            Contrasena: String!
            Rol: enum_Roles!
        ): Token
        
        loginUsuario(Correo: String!, Contrasena: String!): Token
    
    }

`

module.exports = { type_Auth }