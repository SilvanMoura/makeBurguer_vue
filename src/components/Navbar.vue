<template>
    <header>

        <Router-link id="logo-url" to="/">
            <img :src="logo" :alt="alt" id="logo">
        </Router-link>

        <nav>
            <router-link to="/">Home</router-link>
            <router-link v-if="!link" to="/requests">Pedidos</router-link>
        </nav>

        <router-link v-if="link" to="/login" class="btn-auth">Entrar</router-link>
        <router-link v-if="!link" to="/" @click="logout">Sair</router-link>

    </header>
    
</template>

<script>
    import Cookies from 'js-cookie';

    export default{
        name: "Navbar",
        props: ["logo", "alt"],
        data(){
            return{
                link: true
            }
        },

        methods: {
            loadPage(){
                const token = Cookies.get("_myapp_token");

                !token ? this.link=true : this.link=false ;
            },
            logout(){
                Cookies.remove("_myapp_token");
                this.$router.push('/');
            }
        },
        mounted() {
            this.loadPage()
        }
    }
</script>

<style scoped>

    header{
        background-color: #222;
        border-bottom: 4px solid #111;
        padding: 15px 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #logo{
        width: 40px;
        height: 40px;
    }

    nav a, .btn-auth{
        color: #FCBA03;
        text-decoration: none;
        margin: 12px;
        transition: .5s;
    }

    nav a:hover, .btn-auth:hover{
        color: #FFF;
    }
</style>