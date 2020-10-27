const db = require('../../db/conexion')
const controller = {}
const { request, response } = require('express');

controller.listarDatos = async(req = request, res = response) => {
    const nombre = "Joaquin Guzman Loera"
    console.log('Esperemos que funcione');
    const datos = await db.collection('alertabancaria').where("Nombre", "==", `${nombre}`).get()

    datos.forEach((result) => {
        console.log(result.data());
        res.render("index", {
            data: result.data()
        })
    })



}

module.exports = controller;