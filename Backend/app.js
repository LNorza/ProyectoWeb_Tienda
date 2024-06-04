let express = require('express');
let mysql = require('mysql');
let cors = require('cors');

let app = express();
app.use(express.json());
app.use(cors());

//Rutas de acceso:
app.get('/', (request, response) => {
    response.send("Ruta de iniciosss");
});

//Conexion a MySQL
let connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Invermex2018!',
    database: 'pwdata',
    port: 3306,
});
connection.connect((error) => {
    if (error) {
        throw error;
    }
    console.log('Conexion con base de datos MySQL establecida');
})

//Encender Servidor
let puerto = 3000;
app.listen(puerto, () => {
    console.log('Servidor corriendo en puerto ' + puerto);
});

//------------------------------------------------------------------------------------------
//----------------------------------|Seccion de "Clientes"|---------------------------------
//------------------------------------------------------------------------------------------

//Seleccionar todos los Clientes:
app.get('/api/clientes', (request, response) => {
    const queryData = "SELECT * FROM clientes";
    connection.query(queryData, (error, filas) => {
        if (error) {
            throw error;
        } else {
            response.send(filas);
        }
    });
})

//Seleccionar un Cliente por ID:
app.get('/api/clientes/:id', (request, response) => {
    const id = request.params.id;
    const queryData = "SELECT * FROM clientes WHERE id = ?";
    connection.query(queryData, [id], (error, fila) => {
        if (error) {
            throw error;
        } else {
            response.send(fila);
        }
    });
})

//Borrar Clientes por ID:
app.delete('/api/clientes/:id', (request, response) => {
    const id = request.params.id;
    const query = 'DELETE FROM clientes WHERE id = ?';

    connection.query(query, [id], (err, result) => {
        if (err) {
            return response.status(500).json({ error: err });
        }
        return response.json({ affectedRows: result.affectedRows });
    });
});

//Insertar un nuevo cliente
app.post('/api/clientes', (request, response) => {
    let data = {
        id: request.body.id,
        nombre: request.body.nombre,
        apellido: request.body.apellido,
        direccion: request.body.direccion,
        telefono: request.body.telefono,
        rfc: request.body.rfc,
        curp: request.body.curp,
        cp: request.body.cp
    }
    let sql = 'INSERT INTO clientes SET ?';
    connection.query(sql, data, (error, fila) => {
        if (error) {
            throw error;
        } else {
            response.send(fila);
        }
    })
})

//Actualizar un cliente:
app.put('/api/clientes/:id', (request, response) => {
    const id = request.params.id;
    let data = {
        id: request.body.id,
        nombre: request.body.nombre,
        apellido: request.body.apellido,
        direccion: request.body.direccion,
        telefono: request.body.telefono,
        rfc: request.body.rfc,
        curp: request.body.curp,
        cp: request.body.cp
    }
    let sql = 'UPDATE clientes SET ? WHERE id = ?';
    connection.query(sql, [data, id], (error, fila) => {
        if (error) {
            throw error;
        } else {
            response.send(fila);
        }
    })
})

//------------------------------------------------------------------------------------------
//---------------------------------|Seccion de "Vendedores"|--------------------------------
//------------------------------------------------------------------------------------------

//Seleccionar todos los Vendedores:
app.get('/api/vendedores', (request, response) => {
    const queryData = "SELECT * FROM vendedores";
    connection.query(queryData, (error, filas) => {
        if (error) {
            throw error;
        } else {
            response.send(filas);
        }
    });
})

//Seleccionar un vendedor por ID:
app.get('/api/vendedores/:id', (request, response) => {
    const id = request.params.id;
    const queryData = "SELECT * FROM vendedores WHERE idVendedor = ?";
    connection.query(queryData, [id], (error, fila) => {
        if (error) {
            throw error;
        } else {
            response.send(fila);
        }
    });
})

//Borrar Vendedores por ID:
app.delete('/api/vendedores/:id', (request, response) => {
    const id = request.params.id;
    const query = 'DELETE FROM vendedores WHERE idVendedor = ?';

    connection.query(query, [id], (error, result) => {
        if (error) {
            return response.status(500).json({ error: error });
        }
        return response.json({ affectedRows: result.affectedRows });
    });
})

//Insertar un nuevo vendedor
app.post('/api/vendedores', (request, response) => {
    let data = {
        idVendedor: request.body.idVendedor,
        nombre: request.body.nombre,
        apellido: request.body.apellido,
        departamentoTienda: request.body.departamentoTienda,
    }
    let sql = 'INSERT INTO vendedores SET ?';
    connection.query(sql, data, (error, fila) => {
        if (error) {
            throw error;
        } else {
            response.send(fila);
        }
    })
})

//Actualizar un vendedor:
app.put('/api/vendedores/:id', (request, response) => {
    const id = request.params.id;
    let data = {
        idVendedor: request.body.idVendedor,
        nombre: request.body.nombre,
        apellido: request.body.apellido,
        departamentoTienda: request.body.departamentoTienda,
    }
    let sql = 'UPDATE vendedores SET ? WHERE idVendedor = ?';
    connection.query(sql, [data, id], (error, fila) => {
        if (error) {
            throw error;
        } else {
            response.send(fila);
        }
    })
})


//------------------------------------------------------------------------------------------
//---------------------------------|Seccion de "Articulos"|---------------------------------
//------------------------------------------------------------------------------------------

//Seleccionar todos los Articulos:
app.get('/api/articulos', (request, response) => {
    const queryData = "SELECT * FROM articulos";
    connection.query(queryData, (error, filas) => {
        if (error) {
            throw error;
        } else {
            response.send(filas);
        }
    });
})

//Seleccionar un Articulo por ID:
app.get('/api/articulos/:id', (request, response) => {
    const id = request.params.id;
    const queryData = "SELECT * FROM articulos WHERE claveArticulo = ?";
    connection.query(queryData, [id], (error, fila) => {
        if (error) {
            throw error;
        } else {
            response.send(fila);
        }
    });
})

//Borrar Articulos por claveArticulo:
app.delete('/api/articulos/:id', (request, response) => {
    const id = request.params.id;
    const query = 'DELETE FROM articulos WHERE claveArticulo = ?';

    connection.query(query, [id], (error, result) => {
        if (error) {
            return response.status(500).json({ error: error });
        }
        return response.json({ affectedRows: result.affectedRows });
    });
})

//Insertar un nuevo articulo
app.post('/api/articulos', (request, response) => {
    let data = {
        claveArticulo: request.body.claveArticulo,
        descripcion: request.body.descripcion,
        existencia: request.body.existencia,
        precio: request.body.precio,
    }
    let sql = 'INSERT INTO articulos SET ?';
    connection.query(sql, data, (error, fila) => {
        if (error) {
            throw error;
        } else {
            response.send(fila);
        }
    })
})

//Actualizar un articulo:
app.put('/api/articulos/:id', (request, response) => {
    const id = request.params.id;
    let data = {
        claveArticulo: request.body.claveArticulo,
        descripcion: request.body.descripcion,
        existencia: request.body.existencia,
        precio: request.body.precio,
    }
    let sql = 'UPDATE articulos SET ? WHERE claveArticulo = ?';
    connection.query(sql, [data, id], (error, fila) => {
        if (error) {
            throw error;
        } else {
            response.send(fila);
        }
    })
})

//------------------------------------------------------------------------------------------
//---------------------------------|Seccion de "Ventas"|------------------------------------
//------------------------------------------------------------------------------------------













