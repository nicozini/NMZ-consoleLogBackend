const express       = require('express')
const app           = express()
const port          = process.env.PORT ;
const methodOverride = require('method-override');  

const userRoutes    = require('./Router/userRoutes');
const productRoutes = require('./Router/productRoutes');
const mainRoutes    = require('./Router/mainRoutes');

app.use(express.static('public'));
app.set('view engine','ejs');
//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));
// Middleware compatibilidad PUT y DELETE
app.use(methodOverride('_method'));

app.use('/', mainRoutes) ;

app.use('/users', userRoutes) ;

app.use('/products', productRoutes) ;

 

app.listen(port || 3030, () => {
    console.log('VerduMarket Run on port '+ port);
});