const { request } = require('express');
const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan')
const rutas = require('./routers/router.detection')
const path = require('path')

//settings
app.set('port', process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }))
    //rutas
app.use("/", rutas)

//staticfiles
app.use(express.static(path.join(__dirname, "public")));
app.use("/jsFiles", express.static(__dirname + "/public/js"));


//server
const port = app.get('port')
app.listen(port, () => {
    console.log(`Aplicación corriendo en la ruta http://localhost:${port}`);
})

app.use(express.static('public'));