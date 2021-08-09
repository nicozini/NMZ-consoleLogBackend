// Express
const express = require('express');
const app = express();
const port = process.env.PORT;
const methodOverride = require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');
const cors    = require('cors')


//Rutas
const userRoutes        = require('./src/Router/userRoutes');
const productRoutes     = require('./src/Router/productRoutes');
const mainRoutes        = require('./src/Router/mainRoutes');
const productApiRoutes  = require('./src/Router/api/productApiRoutes');
const userApiRoutes     = require('./src/Router/api/userApiRoutes');


//Middleware de Session
const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');

app.use(session({
    secret: 'verduSecret, shh!',
    resave: false,
    saveUninitialized: false,
}));


app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views', __dirname + '/src/views');

app.use(cors());
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
app.use('/api/users', userApiRoutes) ; 
app.use('/api/products', productApiRoutes) ;
app.use((req,res,next)=>{res.status(404).render('not-found')});

 
// Server
app.listen(port || 3030, () => {
    console.log('VerduMarket Run on port '+ port);
});