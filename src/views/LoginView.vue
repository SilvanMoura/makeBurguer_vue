<template>
    <div id="main-container">
        <main class="form-signin w-100 m-auto">
            <form @submit.stop.prevent="submit">
                
                <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

                <Message v-if="msg" :msg="msg" />

                <div class="form-floating">
                    <input v-model="email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                    <label for="floatingInput">Email address</label>
                </div>

                <div class="form-floating">
                    <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
                    <label for="floatingPassword">Password</label>
                </div>

                <div id="btn-register">
                    <span>Não tem conta? </span>
                    <button type="button" @click="loadRegister">Cadastre-se.</button>
                </div>
                
                
                <button class="w-100 btn btn-lg btn-warning" type="submit">Sign in</button>

            </form>
        </main>
    </div>
    
</template>

<script>

    import Cookie from 'js-cookie';
    import Message from '../components/Message.vue';
    import axios from 'axios';

    export default {
        name: "Login",

        data(){
            return{
                email: '',
                password: '',
                msg: ''
            };
        },

        components: {
            Message
        },

        methods: {
             async submit() {

                if(this.email == '' || this.password == ''){
                    this.msg = "Informações incompletas, revise os campos.";

                    setTimeout( () => {
                        this.email = '';
                        this.password = '';
                    }, 3000);

                    this.msg = "";

                    return false;
                }

                const payload = {
                    email: this.email,
                    password: this.password
                };

                axios.post('http://localhost:8000/api/login', payload )
                .then(response =>{
                    const data = response.data;

                
                    if( data.access_token ){
                        Cookie.set('_myapp_token', data.access_token);
                        this.msg = "Login realizado com sucesso";

                        setTimeout( () => {
                            this.msg = "";
                            window.location.href = "/"
                            
                            
                        }, 3000);
                    }else{
                        setTimeout( () => {
                            this.msg = "Login não realizado, por favor, verifique o e-mail e/ou senha";

                            this.email = "";
                            this.password = "";

                        }, 3000);
                    }
                })
                .catch(error => console.log(error));

            },
            loadRegister(){
                this.$router.push('/register');
            }
        }
    }
</script>

<style scoped>

    #main-container{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        max-width: 500px;
        margin: 0 auto;
    }

    .form-signin .form-floating:focus-within {
        z-index: 2;
    }

    .form-signin input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    .form-signin input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }

    #btn-register{
        margin: 15px 0;
        text-align: center;
    }

    #btn-register button{
        background-color: #fff;
        border: none;
        color: #FCBA03;
    }

    #btn-register button:hover{
        color: #dfa300;
    }

</style>