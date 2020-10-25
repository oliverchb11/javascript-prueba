const express = require('express');
const app = express();
require('dotenv').config();


app.set('port', process.env.PORT || 3000);


const port = app.get('port')
app.listen(port, () => {
    console.log(`Aplicación corriendo en la ruta http://localhost:${port}`);
})

app.use(express.static('public'));