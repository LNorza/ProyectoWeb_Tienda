<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">Tienda</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink class="navbar-brand" to="/clientes">Clientes</RouterLink>
                        <RouterLink class="navbar-brand" to="/vendedores">Vendedores</RouterLink>
                        <RouterLink class="navbar-brand" to="/articulos">Articulos</RouterLink>
                        <RouterLink class="navbar-brand" to="/ventas">Ventas</RouterLink>
                        <RouterLink class="navbar-brand" to="/clientes/registro">Registro</RouterLink>
                        <RouterLink class="navbar-brand" to="/clientes/entrada"> Entrada</RouterLink>

                        <button @click="salidaSistemas()" class="btn btn-primary" v-if="validado == true">Salir</button>
                    </li>

                </ul>
            </div>
        </div>
    </nav>
</template>


<script>
import { RouterLink } from 'vue-router';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default {
    name: "MenuView",
    data() {
        return {
            validado: false,
            auth: '',
        }
    },
    // mounted() {
    //   this.auth = getAuth()
    //   onAuthStateChanged(this.auth,(user)=>{
    //     if(user){
    //       this.validado = true
    //     }else{
    //       this.validado = false
    //     }
    //   })
    // },
    // methods: {
    //   salidaSistemas(){
    //     signOut(this.auth).then(()=>{
    //       this.$router.push("/");
    //     })
    //   }
    // }, 
}
</script>