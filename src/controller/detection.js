const db = require('../../db/conexion')
const controller = {}
const { request, response } = require('express');


let name = "";
controller.dataPost = (req = request, res = response) => {
    const data = req.body;
    name = data.nombre
    console.log(name);
    // pasarNonbre(data.nombre)
    res.redirect("/")
}

// const pasarNonbre = (nombre) => {
//     console.log(nombre);
//     return data = {
//         nombre
//     }
// }

controller.listarDatos = async(req = request, res = response) => {

    const nombre = "Joaquin Guzman Loera"


    const datos = await db.collection('alertabancaria').where("nombre", "==", `${name}`).get()

    datos.forEach((result) => {
        res.render("index", {
            data: result.data()
        })
    })





}






module.exports = controller;