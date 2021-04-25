const fs = require('fs');
const path = require('path');

module.exports = {

    getProductList: () => {
        const archivo = path.join(__dirname + '/../data/productsDataBase.json');
        const jsonProducts = fs.readFileSync(archivo);
        const products = JSON.parse(jsonProducts);
        return products;
    },

    findById: function(id) {
        let products = this.getProductList();
        let productFinded = products.find(element => element.id == id);
        
        return productFinded;
    },

    weekProduct: function(week) {
        let products = this.getProductList();
        let weekProduct = products.filter(weekProduct => weekProduct.week === week);
        return weekProduct;
    }
};