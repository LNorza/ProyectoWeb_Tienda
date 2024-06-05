<template>
    <div class="container mt-5">
        <div class="card bg-dark custom-card">
            <div class="card-header text-white border-1 border-white">
                <h4>Editar Articulo</h4>
                <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                    Datos Actualizados con éxito
                </div>
            </div>
            <div class="card-body bg-dark text-white-50">
                <Form :validation-schema="validationSchema" @submit="onTodoBien">
                    <div class="mb-3">
                        <span class="p-left">Clave Articulos</span>
                        <Field name="claveArticulo" id="claveArticulo" type="number" class="form-control mt-2"
                            v-model="model.articulos.claveArticulo" />
                        <ErrorMessage name="claveArticulo" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        <span class="p-left">Descripcion</span>
                        <Field name="descripcion" id="descripcion" type="text" class="form-control text-capitalize mt-2"
                            v-model="model.articulos.descripcion" />
                        <ErrorMessage name="descripcion" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        <span class="p-left">Existencia</span>
                        <Field name="existencia" id="existencia" type="number" class="form-control text-capitalize mt-2"
                            v-model="model.articulos.existencia" />
                        <ErrorMessage name="existencia" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        <span class="p-left">Precio</span>
                        <Field name="precio" id="precio" type="number" class="form-control text-capitalize mt-2"
                            v-model="model.articulos.precio" />
                        <ErrorMessage name="precio" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        <button type="submit" class="btn btn-primary">Guardar</button>
                    </div>
                </Form>
            </div>
        </div>

    </div>
</template>
<script>
import axios from 'axios';
import { Field, Form, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
export default {
    name: "ArticulosEditarView",
    components: { Field, Form, ErrorMessage },
    data() {
        const validationSchema = toTypedSchema(
            zod.object({
                claveArticulo: zod.number({ message: 'Solo Numeros' }).int(),
                descripcion: zod.string().min(1, { message: 'Requerido' }),
                existencia: zod.number({ message: 'Solo Numeros' }).int(),
                precio: zod.number({ message: 'Solo Numeros' }).int(),
            })
        )
        return {
            validationSchema,
            mensaje: 0,
            model: {
                articulos: {
                    claveArticulo: '',
                    descripcion: '',
                    existencia: '',
                    precio: '',
                }
            }
        }
    },
    mounted() {
        this.getArticulos(this.$route.params.id);
    },
    methods: {
        getArticulos(claveArticulo) {
            axios.get('http://localhost:3000/api/articulos/' + claveArticulo)
                .then(res => {
                    this.model.articulos = res.data[0];
                });
        },
        onTodoBien() {
            this.guardarArticulos();
        },
        guardarArticulos() {
            console.log(this.model.articulos);
            this.mensaje = 1;
            axios.put('http://localhost:3000/api/articulos/' + this.$route.params.id, this.model.articulos)
                .then(res => {
                    if (res.data.affectedRows == 1) {
                        this.model.articulos = {
                            claveArticulo: '',
                            descripcion: '',
                            existencia: '',
                            precio: '',
                        }
                        //Para que salga el mensaje de éxito
                        this.mensaje = 1;
                    }
                })
        },
        // limpiarFormulario() {
        //     this.model.articulos = {
        //         claveArticulo: '',
        //         descripcion: '',
        //         existencia: '',
        //         precio: ''
        //     };
        // }
    }
}
</script>

<style scoped>
.custom-card {
    width: 50%;
    margin: auto;
    padding: 10px;
}

.p-left {
    padding-left: 8px;
}


.errorValidacion {
    color: red;
    font-weight: bold;
}
</style>