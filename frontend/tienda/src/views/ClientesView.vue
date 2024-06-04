<template>
    <div class="container mt-5">
        <div class="card bg-dark">
            <div class="card-header text-white border-1 border-white border-opacity-50">
                <h4>Clientes
                    <RouterLink to="/clientes/create" class="btn btn-primary float-end">
                        Agregar
                    </RouterLink>
                </h4>
            </div>
            <div class="card-body">
                <table class="mt-3 table table-dark table-hover border-1 border-white">
                    <thead class="text-center">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Dirección</th>
                            <th>Teléfono</th>
                            <th>RFC</th>
                            <th>CURP</th>
                            <th>CP</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody v-if="clientes.length > 0">
                        <tr class="text-center" v-for="(cliente, index) in clientes" :key="index">
                            <td><span>{{ cliente.id }}</span></td>
                            <td><span>{{ cliente.nombre }}</span></td>
                            <td><span>{{ cliente.apellido }}</span></td>
                            <td><span>{{ cliente.direccion }}</span></td>
                            <td><span>{{ cliente.telefono }}</span></td>
                            <td><span>{{ cliente.rfc }}</span></td>
                            <td><span>{{ cliente.curp }}</span></td>
                            <td><span>{{ cliente.cp }}</span></td>
                            <td>
                                <RouterLink :to="{ path: '/clientes/' + cliente.id + '/edit' }" class="btn btn-success">
                                    Editar
                                </RouterLink>
                                &nbsp;
                                <button class="btn btn-danger" @click="deleteCliente(cliente.id)">
                                    Borrar
                                </button>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="9" style="text-align:center;">Sin clientes :(</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { RouterLink } from 'vue-router'
export default {
    name: "ClientesView",
    data() {
        return {
            clientes: [],
        }
    },
    mounted() { //cuando se carga la página
        this.getClientes();
    },
    methods: {
        getClientes() {
            axios.get('http://localhost:3000/api/clientes').then(res => {
                this.clientes = res.data;
            });
        },
        deleteCliente(iddelclienteaborrar) {
            axios.delete('http://localhost:3000/api/clientes/' + iddelclienteaborrar).then(res => {
                if (res.data.affectedRows > 0) {
                    this.getClientes(); //se recarguen los datos.
                }
            });
        }
    }
}
</script>

<style scoped>
.custom-card {
    width: 50%;
    margin: auto;
    padding: 10px;
}

th {
    border-bottom: 2px solid gray;
    padding-bottom: 8px;
}

td {
    border-right: 1px solid gray;
    padding: 6px;
}

td span {
    display: block;
    padding: 4px;
}
</style>