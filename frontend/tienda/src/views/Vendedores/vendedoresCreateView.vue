<template>
    <div class="container mt-5">
        <div class="card bg-dark custom-card">
            <div class="card-header text-white border-1 border-white">
                <h4>Agregar Vendedor</h4>
                <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                    Datos guardados con éxito
                </div>
            </div>
            <div class="card-body bg-dark text-white">
                <Form :validation-schema="validationSchema" @submit="onTodoBien">
                    <div class="mb-3">
                        <span class="p-left">Id</span>
                        <Field name="idVendedor" id="idvendedor" type="number" class="form-control mt-1"
                            v-model="model.vendedor.idVendedor" />
                        <ErrorMessage name="idVendedor" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        <span class="p-left">Nombre</span>
                        <Field name="nombre" id="nombre" type="text" class="form-control text-capitalize mt-1"
                            v-model="model.vendedor.nombre" />
                        <ErrorMessage name="nombre" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        <span class="p-left">Apellido</span>
                        <Field name="apellido" id="apellido" type="text" class="form-control text-capitalize mt-1"
                            v-model="model.vendedor.apellido" />
                        <ErrorMessage name="apellido" class="errorValidacion" />
                    </div>
                    <div class="mb-4">
                        <span class="p-left">Departamento</span>
                        <Field name="departamentoTienda" id="departamentotienda" type="text" class="form-control mt-1"
                            v-model="model.vendedor.departamentoTienda" />
                        <ErrorMessage name="departamentoTienda" class="errorValidacion" />
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
    name: "VendedoresCreate",
    components: { Field, Form, ErrorMessage },
    data() {
        const validationSchema = toTypedSchema(
            zod.object({
                idVendedor: zod.number({ message: 'Solo Numeros' }).int(),
                nombre: zod.string().min(1, { message: 'Requerido' }),
                apellido: zod.string().min(1, { message: 'Requerido' }),
                departamentoTienda: zod.string().min(1, { message: 'Requerido' }),
            })
        )
        return {
            validationSchema,
            mensaje: 0,
            model: {
                vendedor: {
                    idVendedor: '',
                    nombre: '',
                    apellido: '',
                    departamentoTienda: '',
                }
            }
        }
    },
    methods: {
        onTodoBien() {
            this.guardarVendedores();
        },
        guardarVendedores() {
            axios.post('http://localhost:3000/api/vendedores', this.model.vendedor)
                .then(res => {
                    if (res.data.affectedRows == 1) {
                        this.model.vendedor = {
                            idVendedor: '',
                            nombre: '',
                            apellido: '',
                            departamentoTienda: '',
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
