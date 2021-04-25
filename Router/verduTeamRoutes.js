const express           = require('express');
const router            = express.Router()
const verduTeamController= require('../controllers/verduTeamController');

console.log('entro en rutas de Verduteam');

router.get('/productUpload',verduTeamController.productUpload);

module.exports = router;

