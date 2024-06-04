<template>
    <div class="container mt-3">
        <div class="card bg-dark custom-card">
            <div class="card-header text-white border-1 border-white">
                <h4>Agregar cliente</h4>
                <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                    Datos guardados con éxito
                </div>
            </div>
            <div class="card-body bg-dark text-white">
                <Form :validation-schema="validationSchema" @submit="onTodoBien">
                    <div class="mb-3">
                        Id
                        <Field name="id" id="id" type="number" class="form-control" v-model="model.cliente.id" />
                        <ErrorMessage name="id" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Nombre
                        <Field name="nombre" id="nombre" type="text" class="form-control"
                            v-model="model.cliente.nombre" />
                        <ErrorMessage name="nombre" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Apellido
                        <Field name="apellido" id="apellido" type="text" class="form-control"
                            v-model="model.cliente.apellido" />
                        <ErrorMessage name="apellido" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Dirección
                        <Field name="direccion" id="direccion" type="text" class="form-control"
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
                        <Field name="cp" id="cp" type="text" class="form-control" v-model="model.cliente.cp" />
                        <ErrorMessage name="cp" class="errorValidacion" />
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
    name: "ClientesCreate",
    components: { Field, Form, ErrorMessage },
    data() {
        const phoneRegex = new RegExp(
            /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
        );
        const rfcRegex = new RegExp(
            /^([a-z]{3,4})(\d{2})(\d{2})(\d{2})([0-9a-z]{3})$/i
        );
        const curpRegex = new RegExp(
            /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|BC|BS|CC|CH|CL|CM|CS|DF|DG|GR|GT|HG|JC|MC|MN|MS|NE|NL|NT|OC|PL|QR|QT|SL|SP|SR|TC|TL|TS|VZ|YN|ZS|BCS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d]\d)$/g
        );

        const cpRegex = new RegExp(
            /^[0-9]{5}$/
        );



        const validationSchema = toTypedSchema(
            zod.object({
                id: zod.number({ message: 'Solo Numeros' }).int(),
                nombre: zod.string().min(1, { message: 'Requerido' }),
                apellido: zod.string().min(1, { message: 'Requerido' }),
                direccion: zod.string().min(1, { message: 'Requerido' }),
                telefono: zod.string().regex(phoneRegex, 'numero no valido').min(10, { message: 'Minimo 10' }),
                rfc: zod.string().regex(rfcRegex, 'RFC No Valido'),
                curp: zod.string().regex(curpRegex, 'Curp No Valido'),
                cp: zod.string().regex(cpRegex, 'Código postal no válido'),
            })
        )
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
        }
    },
    methods: {
        onTodoBien() {
            alert('Todo validado');
            this.guardarCliente();
        },
        guardarCliente() {
            axios.post('http://localhost:3000/api/clientes', this.model.cliente)
                .then(res => {
                    //si insertamos 1 registro
                    if (res.data.affectedRows == 1) {
                        //limpiamos los cuadros de texto
                        this.model.cliente = {
                            id: '',
                            nombre: '',
                            apellido: '',
                            direccion: '',
                            telefono: '',
                            rfc: '',
                            curp: '',
                            cp: ''
                        }
                        //Para que salga el mensaje de éxito
                        this.mensaje = 1;
                    }
                })
        }
    }
}
</script>

<style scoped>
.custom-card {
    width: 50%;
    /* Puedes ajustar este valor según tus necesidades */
    margin: auto;
    padding: 10px;
    /* Ajustar el padding si es necesario */
}

.errorValidacion {
    color: red;
    font-weight: bold;
}
</style>