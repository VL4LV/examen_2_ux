const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


// Ruta de prueba para verificar conexión
router.get('/ping', (req, res) => {
  res.send('pong');
}); 

router.post('/createUser', authController.createUser);
router.post('/logIn', authController.logIn);
router.post('/logout', authController.logOut);

module.exports = router;


