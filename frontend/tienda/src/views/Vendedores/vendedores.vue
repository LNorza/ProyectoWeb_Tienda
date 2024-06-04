<template>
    <div class="container mt-5 custom-table">
        <div class="card bg-dark">
            <div class="card-header text-white border-1 border-white border-opacity-50">
                <h4>Vendedores
                    <RouterLink to="/vendedores/create" class=" btn btn-primary float-end">
                        agregar
                    </RouterLink>
                </h4>
            </div>
            <div class="card-body">
                <table class="mt-3 table table-dark table-hover border-1 border-white">
                    <thead class="text-center">
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Departamento</th>
                        <th>Acciones</th>
                    </thead>
                    <tbody v-if="vendedores.length > 0">
                        <tr v-for="(Vendedor, index) in vendedores" :key="index">
                            <td><span class="text-center">{{ Vendedor.idVendedor }}</span></td>
                            <td><span>{{ Vendedor.nombre }}</span></td>
                            <td><span>{{ Vendedor.apellido }}</span></td>
                            <td><span>{{ Vendedor.departamentoTienda }}</span></td>
                            <td class="w-25 text-center">
                                <RouterLink :to="{ path: '/vendedores/' + Vendedor.idVendedor + '/edit' }"
                                    class="btn btn-success"> Editar</RouterLink>
                                &nbsp;
                                <button class="btn btn-danger"
                                    @click="deletevendedores(Vendedor.idvendedor)">Borrar</button>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="9" style="text-align: center;"> sin Clientes</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    </div>


</template>

<script>
import axios from 'axios'
import { RouterLink } from 'vue-router';
export default {
    name: "VendedoresView",
    data() {
        return {
            vendedores: [],
        }
    },
    mounted() {// cuando se carga la pagina
        this.getVendedores();
    },
    methods: {
        getVendedores() {
            axios.get('http://localhost:3000/api/vendedores').then(res => {
                this.vendedores = res.data;
            });
        },
        deletevendedores(idvendedorBorrar) {
            axios.delete('http://localhost:3000/api/vendedores/' + idvendedorBorrar).then(res => {
                if (res.data.affectedRows > 0) {
                    this.getVendedores();//reclagre los datos
                }
            });
        }
    }
}
</script>

<style scoped>
.custom-table {
    width: 70%;
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