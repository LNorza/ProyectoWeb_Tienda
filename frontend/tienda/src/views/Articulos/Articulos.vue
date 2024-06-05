<template>
    <div class="container mt-5 custom-table">
        <div class="card bg-dark">
            <div class="card-header text-white border-1 border-white border-opacity-50">
                <h4>Articulos
                    <RouterLink to="/articulos/create" class=" btn btn-primary float-end">
                        agregar
                    </RouterLink>
                </h4>
            </div>
            <div class="card-body">
                <table class="mt-3 table table-dark table-hover border-1 border-white">
                    <thead class="text-center">
                        <th>ID</th>
                        <th>Descripción</th>
                        <th>Existencia</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </thead>

                    <tbody v-if="articulos.length > 0">
                        <tr v-for="(articulos, index) in articulos" :key="index">
                            <td><span class="text-center">{{ articulos.claveArticulo }}</span></td>
                            <td><span>{{ articulos.descripcion }}</span></td>
                            <td><span>{{ articulos.existencia }}</span></td>
                            <td><span>{{ articulos.precio }}</span></td>
                            <td class="w-25 text-center">
                                <RouterLink :to="{ path: '/articulos/' + articulos.claveArticulo + '/edit' }"
                                    class="btn btn-success"> Editar</RouterLink>
                                &nbsp;
                                <button class="btn btn-danger"
                                    @click="deleteArticulos(articulos.claveArticulo)">Borrar</button>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="9" style="text-align: center;"> Sin Articulos</td>
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
    name: "Articulos",
    data() {
        return {
            articulos: [],
        }
    },
    mounted() {// cuando se carga la pagina
        this.getArticulos();
    },
    methods: {
        getArticulos() {
            axios.get('http://localhost:3000/api/articulos').then(res => {
                this.articulos = res.data;
            });
        },
        deleteArticulos(claveArticulo) {
            axios.delete('http://localhost:3000/api/articulos/' + claveArticulo).then(res => {
                if (res.data.affectedRows > 0) {
                    this.getArticulos();//reclagre los datos
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