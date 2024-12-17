const Venta = require("../models/Venta");
const Producto = require("../models/Producto");

// Crear una venta
exports.crearVenta = async (req, res) => {
    try {
        const { producto, cantidad } = req.body;

        // Validar si el producto existe
        const productoDB = await Producto.findById(producto);
        if (!productoDB) {
            return res.status(404).json({ msg: 'No existe el producto' });
        }

        // Calcular el costo total (cantidad * precio del producto)
        const costoTotal = cantidad * productoDB.precio;

        // Crear la venta
        let venta = new Venta({
            producto,
            cantidad,
            costoTotal
        });

        await venta.save();
        res.send(venta);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

// Obtener todas las ventas
exports.obtenerVentas = async (req, res) => {
    try {
        const ventas = await Venta.find().populate('producto', 'nombre precio categoria ubicacion');
        res.json(ventas);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

// Actualizar una venta
exports.actualizarVenta = async (req, res) => {
    try {
        const { producto, cantidad } = req.body;
        let venta = await Venta.findById(req.params.id);

        if (!venta) {
            return res.status(404).json({ msg: 'No existe la venta' });
        }

        // Validar si el producto existe
        const productoDB = await Producto.findById(producto);
        if (!productoDB) {
            return res.status(404).json({ msg: 'No existe el producto' });
        }

        // Calcular nuevo costo total
        const costoTotal = cantidad * productoDB.precio;

        // Actualizar campos de la venta
        venta.producto = producto;
        venta.cantidad = cantidad;
        venta.costoTotal = costoTotal;

        venta = await Venta.findByIdAndUpdate({ _id: req.params.id }, venta, { new: true });
        res.json(venta);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

// Obtener una venta específica
exports.obtenerVenta = async (req, res) => {
    try {
        const venta = await Venta.findById(req.params.id).populate('producto', 'nombre precio categoria ubicacion');

        if (!venta) {
            return res.status(404).json({ msg: 'No existe la venta' });
        }

        res.json(venta);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

// Eliminar una venta
exports.eliminarVenta = async (req, res) => {
    try {
        const venta = await Venta.findById(req.params.id);

        if (!venta) {
            return res.status(404).json({ msg: 'No existe la venta' });
        }

        await Venta.findByIdAndRemove({ _id: req.params.id });
        res.json({ msg: 'Venta eliminada con éxito' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }


    
};


// Obtener resumen de ventas por fecha
exports.obtenerResumenVentas = async (req, res) => {
    try {
        const resumen = await Venta.aggregate([
            {
                $group: {
                    _id: { 
                        $dateToString: { 
                            format: "%Y-%m-%d", 
                            date: "$fechaVenta"  ,// Usamos el campo fechaVenta, que es de tipo Date
                            timezone: "America/Lima" // Ajuste de zona horaria a Lima
                        }
                    },
                    totalVentas: { 
                        $sum: "$costoTotal"  // Sumar el costo total de cada venta
                    }
                }
            },
            { 
                $sort: { 
                    _id: 1  // Ordenar por fecha ascendente
                } 
            }
        ]);

        res.json(resumen); // Enviar el resultado como JSON
    } catch (error) {
        console.error("Error al obtener el resumen de ventas:", error);
        res.status(500).json({
            msg: "Error al obtener el resumen de ventas",
            error: error.message,
            stack: error.stack
        });
    }
};

exports.obtenerResumenHorasVentas = async (req, res) => {
    try {
      const resumen = await Venta.aggregate([
        {
          $project: {
            fechaVenta: {
              $dateToString: {
                format: "%Y-%m-%d", // Formato de fecha (año-mes-día)
                date: "$fechaVenta",
                timezone: "America/Lima" // Ajuste de zona horaria a Lima
              }
            },
            horaVenta: {
              $dateToString: { 
                format: "%H", // Extrae solo la hora
                date: "$fechaVenta", 
                timezone: "America/Lima" // Ajuste de zona horaria a Lima
              }
            },
            costoTotal: 1 // Incluir el campo costoTotal
          }
        },
        {
          $group: {
            _id: { 
              fecha: "$fechaVenta", // Agrupar por fecha
              hora: "$horaVenta" // Y por hora
            },
            totalVentas: { $sum: "$costoTotal" } // Sumar el costoTotal de las ventas de esa hora
          }
        },
        {
          $sort: { "_id.fecha": 1, "_id.hora": 1 } // Ordenar por fecha y hora ascendente
        }
      ]);
      
      res.json(resumen); // Enviar el resultado como JSON
    } catch (error) {
      console.error("Error al obtener el resumen de ventas por hora:", error);
      res.status(500).json({
        msg: "Error al obtener el resumen de ventas por hora",
        error: error.message,
        stack: error.stack
      });
    }
  };
  
  

