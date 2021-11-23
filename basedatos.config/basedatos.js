const mongoose = require("mongoose")

const conexionBD = async() => {
    await mongoose.connect(process.env.BASEDATOS_URL)
        .then(() => console.log("base datos conectada"))
}

module.exports = { conexionBD }