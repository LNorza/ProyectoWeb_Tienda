<template>
    <div class="container mt-5">
        <div class="card bg-dark custom-card">
            <div class="card-header text-white border-1 border-white">
                <h4>Editar Vendedor</h4>
                <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                    Datos Actualizados con éxito
                </div>
            </div>
            <div class="card-body bg-dark text-white-50">
                <Form :validation-schema="validationSchema" @submit="onTodoBien">
                    <div class="mb-3">
                        <span class="p-left">Id</span>
                        <Field name="idVendedor" id="idVendedor" type="number" class="form-control mt-2"
                            v-model="model.vendedor.idVendedor" />
                        <ErrorMessage name="idVendedor" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        <span class="p-left">Nombre</span>
                        <Field name="nombre" id="nombre" type="text" class="form-control text-capitalize mt-2"
                            v-model="model.vendedor.nombre" />
                        <ErrorMessage name="nombre" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        <span class="p-left">Apellido</span>
                        <Field name="apellido" id="apellido" type="text" class="form-control text-capitalize mt-2"
                            v-model="model.vendedor.apellido" />
                        <ErrorMessage name="apellido" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        <span class="p-left">Departamento</span>
                        <Field name="departamentoTienda" id="departamentoTienda" type="text"
                            class="form-control text-capitalize mt-2" v-model="model.vendedor.departamentoTienda" />
                        <ErrorMessage name="departamentoTienda" class="errorValidacion" />
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
    name: "VendedoresEditar",
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
    mounted() {
        this.getVendedore(this.$route.params.id);
    },
    methods: {
        getVendedore(idVendedor) {
            axios.get('http://localhost:3000/api/vendedores/' + idVendedor)
                .then(res => {
                    this.model.vendedor = res.data[0];
                });
        },
        onTodoBien() {
            alert('Todo validado');
            this.guardarVendedores();
        },
        guardarVendedores() {
            console.log(this.model.vendedor);
            this.mensaje = 1;
            this.limpiarFormulario();
            // axios.put('http://localhost:3000/api/vendedores/'+this.$route.params.id,this.model.vendedor)
            // .then(res => {
            //     //si insertamos 1 registro
            //     if(res.data.affectedRows == 1){ 
            //         //limpiamos los cuadros de texto
            //         this.model.vendedor = { 
            //             idVendedor: '',
            //             nombre: '',
            //             apellido: '',
            //             departamentoTienda: '',
            //         }
            //         //Para que salga el mensaje de éxito
            //         this.mensaje = 1;
            //     }
            // })
        },
        limpiarFormulario() {
            this.model.vendedor = {
                idVendedor: '',
                nombre: '',
                apellido: '',
                departamentoTienda: ''
            };
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

.p-left {
    padding-left: 8px;
}


.errorValidacion {
    color: red;
    font-weight: bold;
}
</style>