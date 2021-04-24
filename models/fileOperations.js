const fs = require('fs');
const path = require('path');

let operacionesArchivos =
{
    archivo: path.join('models','productsDataBase.json'),
    leerArchivoJson: function () {
        return JSON.parse(fs.readFileSync(this.archivo, 'utf-8'));
    },
    grabarUnJson: function (dato) {
        return  fs.writeFileSync(this.archivo, dato)
    },
}
module.exports = operacionesArchivos;
