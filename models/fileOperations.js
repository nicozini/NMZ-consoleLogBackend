const fs = require('fs');
const path = require('path');

module.exports = {

    getProductList: () => {
        const archivo = path.join(__dirname + '/../data/productsDataBase.json');
        const jsonProducts = fs.readFileSync(archivo);
        const products = JSON.parse(jsonProducts);
        return products;
    }

    


};