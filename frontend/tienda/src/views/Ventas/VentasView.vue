<template>
    <div class="container mt-5">
        <div class="card bg-dark">
            <div class="card-header text-white border-1 border-white border-opacity-50">
                <h4>Registrar Venta</h4>
                <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                    Artículo agregado con éxito
                </div>
                <div v-if="mensajeCompra == 1" class="alert alert-primary" role="alert">
                    Compra con exito
                </div>

            </div>
            <div class="card-body">
                <div class="mb-3 row  text-white">
                    <div class="col-md-6">
                        <label for="articulo" class="form-label">Artículo</label>
                        <select v-model="articuloSeleccionado" @change="calcularPrecioTotal" id="articulo"
                            class="form-select" required>
                            <option value="" disabled selected>{{ mensaje ? 'Seleccionar otro artículo' :
                                'Selecciona un artículo' }}</option>
                            <option v-for="articulo in articulos" :key="articulo.claveArticulo"
                                :value="articulo.claveArticulo">
                                {{ articulo.claveArticulo }} - {{ articulo.descripcion }}
                            </option>
                        </select>
                    </div>
                    <div class="col-md-auto">
                        <label for="cantidad" class="form-label">Cantidad</label>
                        <input type="number" v-model.number="cantidad" @input="calcularPrecioTotal" id="cantidad"
                            class="form-control" :max="articuloSeleccionadoExistencia" required :min="1" />
                    </div>
                    <div class="col-md-auto">
                        <label for="precioUnitario" class="form-label">Precio</label>
                        <input type="text" v-model="precioUnitario" id="precioUnitario" class="form-control" readonly />
                    </div>
                    <div class="col-md-auto">
                        <label for="precioTotal" class="form-label">Precio Total</label>
                        <input type="text" v-model="precioTotal" id="precioTotal" class="form-control" readonly />
                    </div>
                </div>



                <div class="mb-3 row justify-content-center">
                    <div class="col-md-3">
                        <button @click="agregarArticulo" class="btn btn-primary full-width"
                            :disabled="cantidad > articuloSeleccionadoExistencia">Agregar Artículo</button>
                    </div>
                </div>

                <div class="mb-3  text-white" v-if="mensaje == 1">
                    <h5>Lista de Artículos:</h5>
                    <ul>
                        <li v-for="(item, index) in listaArticulos" :key="index">
                            {{ item.nombre }} - Cantidad: {{ item.cantidad }} - Precio: {{ item.precioUnitario }} -
                            Precio
                            Total: {{ item.precioTotal }}
                        </li>
                    </ul>
                    <div class="mb-3">
                        <h5>Total de la compra: {{ totalCompra }}</h5>
                    </div>
                    <div class="mb-3">
                        <label for="vendedor" class="form-label">Vendedor</label>
                        <select v-model="vendedorSeleccionado" id="vendedor" class="form-select" required>
                            <option value="" disabled selected>Selecciona un Vendedor</option>
                            <option v-for="vendedor in vendedores" :key="vendedor.idvendedor"
                                :value="vendedor.idvendedor">
                                {{ vendedor.idvendedor }} . {{ vendedor.nombre }},{{ vendedor.apellido }} Departamento
                                {{ vendedor.departamentotienda }}
                            </option>
                        </select>
                    </div>
                    <div class="mb-3 row justify-content-end">
                        <div class="col-md-1">
                            <button @click="limpiarFormulario" class="btn btn-warning">Cancelar</button>
                        </div>
                        <div class="col-md-2">
                            <button @click="comprar" class="btn btn-success full-width"
                                :disabled="!vendedorSeleccionado">Comprar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Ventas',
    data() {
        return {
            mensaje: 0,
            mensajeCompra: 0,
            articulos: [],
            articuloSeleccionado: '',
            cantidad: 1,
            precioUnitario: '0',
            precioTotal: '0',
            listaArticulos: [],
            vendedores: [],
            vendedorSeleccionado: '',
            listaCompras: []
        }
    },
    computed: {
        articuloSeleccionadoExistencia() {
            const articulo = this.articulos.find(art => art.claveArticulo === this.articuloSeleccionado);
            return articulo ? articulo.existencia : 0;
        },
        totalCompra() {
            // Calcular el total sumando el precio total de cada artículo en la lista
            return this.listaArticulos.reduce((total, item) => total + item.precioTotal, 0);
        },
    },
    mounted() {
        this.getVendedores();
        this.getArticulos();
    },
    methods: {

        calcularPrecioTotal() {
            const articulo = this.articulos.find(art => art.claveArticulo === this.articuloSeleccionado);
            if (articulo) {
                this.precioUnitario = articulo.precio;
                if (this.cantidad > articulo.existencia) {
                    this.cantidad = articulo.existencia;
                }
                this.precioTotal = this.cantidad * this.precioUnitario;
            }
        },
        agregarArticulo() {
            const articulo = this.articulos.find(art => art.claveArticulo === this.articuloSeleccionado);
            if (articulo && this.cantidad <= articulo.existencia) {
                this.listaArticulos.push({
                    claveArticulo: articulo.claveArticulo,
                    nombre: articulo.descripcion,
                    cantidad: this.cantidad,
                    precioUnitario: articulo.precio,
                    precioTotal: this.precioTotal
                });
                this.mensaje = 1; // Mostrar mensaje al agregar artículo
                // Limpiar campos después de agregar artículo
                this.cantidad = 1;
                this.precioTotal = '0';
                this.precioUnitario = '0';
                this.articuloSeleccionado = ''; // Limpiar selección de artículo
            }
        },
        getArticulos() {
            axios.get('http://localhost:3000/api/articulos').then(res => {
                this.articulos = res.data;
                // console.log(this.articulos);
            });
        },
        getVendedores() {
            axios.get('http://localhost:3000/api/vendedores').then(res => {
                this.vendedores = res.data;
            });
        },
        comprar() {
            if (!this.vendedorSeleccionado) {
                alert("Debe seleccionar un vendedor antes de comprar.");
                return;
            }
            const obtenerFechaHoraActual = () => {
                const fecha = new Date();
                const anio = fecha.getFullYear();
                const mes = ('0' + (fecha.getMonth() + 1)).slice(-2);
                const dia = ('0' + fecha.getDate()).slice(-2);
                const horas = ('0' + fecha.getHours()).slice(-2);
                const minutos = ('0' + fecha.getMinutes()).slice(-2);
                const segundos = ('0' + fecha.getSeconds()).slice(-2);
                return `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
            };


            const compra = this.listaArticulos.map(item => ({
                claveArticulo: item.claveArticulo,
                cantidad: item.cantidad,
                precio: item.precioUnitario,
                fecha: obtenerFechaHoraActual(),
                idVendedor: this.vendedorSeleccionado
            }));
            axios.post('http://localhost:3000/api/ventas', compra)
                .then(res => {
                    // Verificar si se insertó un registro exitosamente
                    if (res.data.affectedRows == 1) {
                        // Limpiar los datos después de una inserción exitosa
                        this.listaArticulos = []; // Limpiar lista de artículos
                        // Otros códigos de limpieza si es necesario

                        // Mostrar mensaje de éxito
                        this.mensajeCompra = 1;
                    }
                })
            // console.log("Compra realizada:", compra);

            // Reset después de la compra
            this.listaArticulos = [];
            this.vendedorSeleccionado = '';
            this.mensaje = 0; // Resetear mensaje de éxito
            this.listaCompras = '';
        },
        limpiarFormulario() {
            this.listaArticulos = [];
            this.vendedorSeleccionado = '';
            this.mensaje = 0; // Resetear mensaje de éxito
            this.listaCompras = '';
        }
    }
}
</script>
<style scoped>
.full-width {
    width: 100%;
}
</style>