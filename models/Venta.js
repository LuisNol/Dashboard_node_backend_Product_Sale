const mongoose = require('mongoose');

const VentaSchema = mongoose.Schema({
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto', // Relación con la tabla Producto
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    costoTotal: {
        type: Number, // Se calcula cantidad * precio del producto
        required: true
    },
    fechaVenta: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Venta', VentaSchema);
