<template>
    <section class="vh-100">
        <div class=" container py-5 h-75">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card shadow-2-strong background-table text-white" style="border-radius: 1rem;">
                        <div class="card-body p-5 text-center">

                            <h3 class="mb-5">Registro de usuarios</h3>
                            <div v-if="mensaje == 1" class="alert alert-danger" role="alert">
                                Usuario registrado con éxito
                            </div>

                            <div data-mdb-input-init class="form-outline mb-3">
                                <input v-model="correo" type="email" id="typeEmailX-2"
                                    class="form-control form-control-lg" />
                                <label class="form-label mt-2 fs-5" for="typeEmailX-2">Correo</label>
                            </div>

                            <div data-mdb-input-init class="form-outline mb-3">
                                <input v-model="password" type="password" id="typePasswordX-2"
                                    class="form-control form-control-lg" />
                                <label class="form-label mt-2 fs-5" for="typePasswordX-2">Contraseña</label>
                            </div>

                            <button @click.prevent="registro()" data-mdb-button-init data-mdb-ripple-init
                                class="btn btn-primary btn-lg btn-block w-" type="submit">Registrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default {
    name: "RegistroView",
    data() {
        return {
            correo: '',
            password: '',
            mensaje: 0
        }
    },
    methods: {
        registro() {
            createUserWithEmailAndPassword(getAuth(), this.correo, this.password)
                .then((data) => {
                    this.mensaje = 1
                    this.correo = ''
                    this.password = ''
                })
                .catch((error) => {
                    alert(error.message)
                })
        },
    }
}
</script>

<style scoped>
.background-table {
    background-color: #212529;
}
</style>