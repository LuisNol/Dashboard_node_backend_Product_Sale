// Rutas para producto
const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');


router.get('/resumen', ventaController.obtenerResumenVentas);
router.get('/ventas/resumen', ventaController.obtenerResumenVentas);

router.get('/resumenH', ventaController.obtenerResumenHorasVentas);  // Esta es la nueva ruta

// Rutas para la gestión de ventas
router.post('/crear', ventaController.crearVenta);
router.post('/', ventaController.crearVenta);
router.get('/', ventaController.obtenerVentas);
router.put('/:id', ventaController.actualizarVenta);
router.get('/:id', ventaController.obtenerVenta);
router.delete('/:id', ventaController.eliminarVenta);

module.exports = router;