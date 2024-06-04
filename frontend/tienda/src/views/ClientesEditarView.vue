<template>
    <div class="container mt-2">
        <div class="card bg-dark custom-card">
            <div class="card-header text-white border-1 border-white">
                <h4>Editar cliente</h4>
                <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                    Datos actualizados con éxito
                </div>
            </div>
            <div class="card-body bg-dark text-white-50">
                <Form :validation-schema="validationSchema" @submit="onTodoBien">
                    <div class="mb-3">
                        Id
                        <Field name="id" id="id" type="number" class="form-control" v-model="model.cliente.id" />
                        <ErrorMessage name="id" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Nombre
                        <Field name="nombre" id="nombre" type="text" class="form-control text-capitalize"
                            v-model="model.cliente.nombre" />
                        <ErrorMessage name="nombre" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Apellido
                        <Field name="apellido" id="apellido" type="text" class="form-control text-capitalize"
                            v-model="model.cliente.apellido" />
                        <ErrorMessage name="apellido" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Dirección
                        <Field name="direccion" id="direccion" type="text" class="form-control text-capitalize"
                            v-model="model.cliente.direccion" />
                        <ErrorMessage name="direccion" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Teléfono
                        <Field name="telefono" id="telefono" type="text" class="form-control"
                            v-model="model.cliente.telefono" />
                        <ErrorMessage name="telefono" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        RFC
                        <Field name="rfc" id="rfc" type="text" class="form-control" v-model="model.cliente.rfc" />
                        <ErrorMessage name="rfc" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        CURP
                        <Field name="curp" id="curp" type="text" class="form-control" v-model="model.cliente.curp" />
                        <ErrorMessage name="curp" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        CP
                        <Field name="cp" id="cp" type="number" class="form-control" v-model="model.cliente.cp" />
                        <ErrorMessage name="cp" class="errorValidacion" />
                    </div>
                    <div>
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
    name: "ClientesCreate",
    components: { Field, Form, ErrorMessage },
    data() {
        const phoneRegex = new RegExp(
            /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
        );
        const validationSchema = toTypedSchema(
            zod.object({
                id: zod.number({ message: 'Solo números' }).int(),
                nombre: zod.string().min(1, { message: 'Requerido' }),
                apellido: zod.string().min(1, { message: 'Requerido' }),
                direccion: zod.string().min(1, { message: 'Requerido' }),
                telefono: zod.string().regex(phoneRegex, 'Número no válido').min(10, { message: 'Mínimo 10' }),
                rfc: zod.string().min(12, { message: 'RFC no válido' }).max(15, { message: 'RFC no válido' }),
                curp: zod.string().min(18, { message: 'CURP no válida' }).max(18, { message: 'CURP no válida' }),
                cp: zod.number({ message: 'Código postal no válido' })
                    .int()
                    .refine(val => val.toString().length >= 5 && val.toString().length <= 10, {
                        message: 'Código postal no válido'
                    })
            })
        );
        return {
            validationSchema,
            mensaje: 0,
            model: {
                cliente: {
                    id: '',
                    nombre: '',
                    apellido: '',
                    direccion: '',
                    telefono: '',
                    rfc: '',
                    curp: '',
                    cp: ''
                }
            }
        };
    },
    mounted() {
        this.getCliente(this.$route.params.id);
    },
    methods: {
        getCliente(clienteID) {
            axios.get('http://localhost:3000/api/clientes/' + clienteID).then(res => {
                this.model.cliente = res.data[0];
            });
        },
        onTodoBien() {
            this.guardarCliente();
        },
        guardarCliente() {
            console.log('Datos enviados:', this.model.cliente);
            axios.put('http://localhost:3000/api/clientes/' + this.$route.params.id, this.model.cliente)
                .then(res => {
                    console.log('Respuesta del servidor:', res.data);
                    if (res.data.affectedRows == 1) {
                        this.model.cliente = {
                            id: '',
                            nombre: '',
                            apellido: '',
                            direccion: '',
                            telefono: '',
                            rfc: '',
                            curp: '',
                            cp: ''
                        };
                        this.mensaje = 1;
                    }
                })
                .catch(error => {
                    console.error('Error al guardar el cliente:', error);
                });
        }
    }
};
</script>

<style scoped>
.custom-card {
    width: 50%;
    margin: auto;
    padding: 10px;
}

.errorValidacion {
    color: red;
    font-weight: bold;
}
</style>
