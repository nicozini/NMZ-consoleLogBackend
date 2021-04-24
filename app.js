const express       = require('express')
const app           = express()
const port          = process.env.PORT ;
const userRoutes    = require('./Router/userRoutes');
const productRoutes = require('./Router/productRoutes');
const mainRoutes    = require('./Router/mainRoutes');

app.use(express.static('public'));
app.set('view engine','ejs');

app.use('/', mainRoutes) ;

app.use('/users', userRoutes) ;

app.use('/product', productRoutes) ;

 

app.listen(port || 3030, () => {
    console.log('VerduMarket Run on port '+ port);
});