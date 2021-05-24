// Express
const express = require('express');
const app = express();

const port = process.env.PORT;

const methodOverride = require('method-override');
const session = require('express-session');

const cookies = require('cookie-parser');


//Rutas
const userRoutes = require('./Router/userRoutes');
const productRoutes = require('./Router/productRoutes');
const mainRoutes = require('./Router/mainRoutes');


//Middleware de Session
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

app.use(session({
    secret: 'verduSecret, shh!',
    resave: false,
    saveUninitialized: false,
}));

app.use(express.static('public'));
app.set('view engine','ejs');

// URL encode para capturar informacion del formulario en req.body
app.use(express.urlencoded({ extended: false }));

// Middlewares nivel APP
app.use(methodOverride('_method'));
app.use(cookies());
app.use(userLoggedMiddleware);



// Routes
app.use('/', mainRoutes) ;
app.use('/users', userRoutes) ; 
app.use('/products', productRoutes) ;

 
// Server
app.listen(port || 3030, () => {
    console.log('VerduMarket Run on port '+ port);
});