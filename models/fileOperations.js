const fs = require('fs');
const path = require('path');
const archivo = path.join(__dirname + '/../data/products.json')

module.exports = {
    
    getProductList: () => {
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
    },
    save: (products) => {
        const productJSON = JSON.stringify(products, null, 2);
        
        fs.writeFileSync(archivo, productJSON, 'utf-8');
        return true;
    },
    saveNew: (product) => {
        //recibo un un solo articulo
        const jsonProducts = fs.readFileSync(archivo);
        let products = JSON.parse(jsonProducts);
        

        products.push(product);

        const productJSON = JSON.stringify(products, null, 2);
        
        fs.writeFileSync(archivo, productJSON, 'utf-8');
        return true;
    },
    delete: function(id) {
        let allProducts = this.getProductList();
        let finalProducts = allProducts.filter(oneProduct => oneProduct.id !== id);
        let writedProducts = this.save(finalProducts);
        return writedProducts;

        // fs.writeFileSync(archivo, JSON.stringify(finalProducts, null, ' '));
        // return finalProducts;
    }
};