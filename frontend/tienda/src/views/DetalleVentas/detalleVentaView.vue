<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Detalle de Ventas de Hoy</h4>
            </div>
            <div class="card-body">
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Clave de Artículo</th>
                            <th>Descripción</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Vendedor</th>
                            <th>Departamento</th>
                            <th>Hora</th>
                        </tr>
                    </thead>
                    <tbody v-if="ventas.length > 0">
                        <template v-for="(venta, index) in ventas" :key="index">
                            <template v-if="index === 0 || venta.iddetalleVenta !== ventas[index - 1].iddetalleVenta">
                                <tr :class="(index % 2 === 0) ? 'even-row' : 'odd-row'">
                                    <td colspan="7" class="separator-row text-right">Folio venta: {{
                                        venta.iddetalleVenta }}</td>
                                </tr>
                            </template>
                            <tr :class="(index % 2 === 0) ? 'even-row' : 'odd-row'">
                                <td>{{ venta.clavearticulo }}</td>
                                <td>{{ venta.descripcion_articulo }}</td>
                                <td>{{ venta.cantidad }}</td>
                                <td>{{ venta.precio }}</td>
                                <td>{{ venta.nombre }}, {{ venta.apellido }}</td>
                                <td>{{ venta.departamentotienda }}</td>
                                <td>{{ venta.hora }}</td>
                            </tr>
                        </template>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="7" style="text-align: center;">No hay ventas para hoy</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "Detalleventas",
    data() {
        return {
            ventas: [],
        }
    },
    mounted() {
        this.getDetalleVentasHoy();
    },
    methods: {
        getDetalleVentasHoy() {
            axios.get('http://localhost:3000/api/detalleventas/hoy')
                .then(response => {
                    this.ventas = response.data;
                })
        }
    }
};
</script>


<style scoped>
/* Define el tamaño y comportamiento de la tabla */
table {
    width: 100%;
    border-collapse: collapse;
    /* Fusiona los bordes de las celdas */
}

/* Estilos para los encabezados de las columnas y las celdas */
th,
td {
    border: 1px solid #ddd;
    /* Define un borde delgado */
    padding: 8px;
    /* Agrega espacio alrededor del contenido */
    text-align: left;
    /* Alinea el texto a la izquierda */
}

/* Estilo para los encabezados de las columnas */
th {
    background-color: #f2f2f2;
    /* Color de fondo para los encabezados */
}

/* Estilo para las filas pares */
.even-row {
    background-color: #f9f9f9;
    /* Color de fondo para las filas pares */
}

/* Estilo para las filas impares */
.odd-row {
    background-color: #ffffff;
    /* Color de fondo para las filas impares */
}

/* Estilo para las filas que separan los folios de venta */
.separator-row {
    font-weight: bold;
    /* Texto en negrita */
    background-color: #dddddd;
    /* Color de fondo para las filas separadoras */
}

/* Estilo específico para alinear el texto a la derecha */
.separator-row.text-right {
    text-align: center;
    /* Alinea el texto al centro */
}
</style>