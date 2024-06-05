<template>
    <div class="container mt-5">
        <div class="card bg-dark custom-card">
            <div class="card-header text-white border-1 border-white">
                <h4>Agregar Articulo</h4>
                <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                    Datos guardados con éxito
                </div>
            </div>
            <div class="card-body bg-dark text-white">
                <Form :validation-schema="validationSchema" @submit="onTodoBien">
                    <div class="mb-3">
                        <span class="p-left">Clave Articulos</span>
                        <Field name="claveArticulo" id="claveArticulo" type="number" class="form-control mt-1"
                            v-model="model.articulos.claveArticulo" />
                        <ErrorMessage name="claveArticulo" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        <span class="p-left">Descripcion</span>
                        <Field name="descripcion" id="descripcion" type="text" class="form-control text-capitalize mt-1"
                            v-model="model.articulos.descripcion" />
                        <ErrorMessage name="descripcion" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        <span class="p-left">Existencia</span>
                        <Field name="existencia" id="existencia" type="number" class="form-control text-capitalize mt-1"
                            v-model="model.articulos.existencia" />
                        <ErrorMessage name="existencia" class="errorValidacion" />
                    </div>
                    <div class="mb-4">
                        <span class="p-left">Precio</span>
                        <Field name="precio" id="precio" type="number" class="form-control mt-1"
                            v-model="model.articulos.precio" />
                        <ErrorMessage name="precio" class="errorValidacion" />
                    </div>
                    <div class="mb-1">
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
    name: "ArticulosCreateView",
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
    methods: {
        onTodoBien() {
            alert('Todo bien');
            this.guardarArticulos();
        },
        guardarArticulos() {
            axios.post('http://localhost:3000/api/articulos', this.model.articulos)
                .then(res => {
                    if (res.data.affectedRows == 1) {
                        this.model.articulos = {
                            claveArticulo: '',
                            descripcion: '',
                            existencia: '',
                            precio: '',
                        }
                        this.mensaje = 1;
                    }
                })
        }
    }
}
</script>

<style scoped>
.errorValidacion {
    color: red;
    font-weight: bold;
}

.p-left {
    padding-left: 8px;
}

.custom-card {
    width: 50%;
    margin: auto;
    padding: 10px;
}
</style>
