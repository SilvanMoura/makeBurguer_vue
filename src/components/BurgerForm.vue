<template>
    <div>
        <Message v-if="msg" :msg="msg" />

        <div>
            <form id="burger-form" @submit="createBurger">

                <div class="input-container">
                    <label for="name">Nome do cliente:</label>
                    <input type="text" id="name" name="name" v-model="name" placeholder="Digite o seu nome">
                </div>

                <div class="input-container">
                    <label for="bread">Escolha o pão</label>
                    <select name="bread" id="bread" v-model="bread">
                        <option value="selecioneSeuPao">Selecione o seu pão</option>
                        <option v-for="bread in breads" :key="bread.id" :value="bread.type">{{bread.type}}</option>
                    </select>
                </div>
                
                <div class="input-container">
                    <label for="meat">Escolha a carne do seu Burger</label>
                    <select name="meat" id="meat" v-model="meat">
                        <option value="selecioneSuaCarne">Selecione o tipo de carne</option>
                        <option v-for="meat in meats" :key="meat.id" :value="meat.type">{{meat.type}}</option>
                    </select>
                </div>

                <div id="optionals-container" class="input-container">
                    <label id="optionals-title" for="optionals">Selecione os opcionais</label>
                    <div class="checkbox-container" v-for="optional in optionalsData" :key="optional.id">
                        <input type="checkbox" name="optionals" v-model="optionals" :value="optional.type">
                        <span>{{optional.type}}</span>
                    </div>
                </div>

                <div class="input-container">
                    <input type="submit" class="submit-btn" value="Criar meu Burger!">
                </div>

            </form>
        </div>
    </div>
</template>

<script>

import Message from './Message.vue';
import axios from 'axios';

export default {
    name: "BurgerForm",
    data() {
        return {
            breads: [],
            meats: [],
            optionalsData: [],
            name: null,
            bread: null,
            meat: null,
            optionals: [],
            msg: null
        }
    },
    methods: {
        getIngredientes() {

            axios.get("http://localhost:8000/api/burguerIngredients")
                .then(response => {
                    const data = response.data;
                    this.breads = [];
                    this.meats = [];
                    this.optionalsData = [];

                    for (var i = 0; i < data.length; i++) {
                        this.breads.push({
                            "id": data[i].id,
                            "type": data[i].breads
                        });

                        this.meats.push({
                            "id": data[i].id,
                            "type": data[i].meats
                        });

                        this.optionalsData.push({
                            "id": data[i].id,
                            "type": data[i].optionals
                        });
                    }

                })
                .catch(error => console.log(error));
                
        },

        async createBurger(e) {

            e.preventDefault();

            const data = {
                name: this.name,
                meat: this.meat,
                bread: this.bread,
                optionals: Array.from(this.optionals),
                status: "Solicitado"
            }

            axios.post("http://localhost:8000/api/burguerCreate", data)
                .then(response => {
                    this.msg = `Pedido Nº ${response.data.id} realizado com sucesso`;

                    setTimeout(() => this.msg = "", 3000);

                    this.name = "";
                    this.meat = "";
                    this.bread = "";
                    this.optionals = "";
                })
            .catch(error => console.log(error));
            
        }
    },
    mounted() {
        this.getIngredientes();
    },
    components: {
        Message
    },
}
</script>

<style scoped>
#burger-form {
    max-width: 400px;
    margin: 0 auto;
}

.input-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}

label {
    font-weight: bold;
    margin-bottom: 15px;
    color: #222;
    padding: 5px 10px;
    border-left: 4px solid #FCBA03;
}

input,
select {
    padding: 5px 10px;
    width: 300px;
}

#opcionais-container {
    flex-direction: row;
    flex-wrap: wrap;
}

#opcionais-title {
    width: 100%;
}

.checkbox-container {
    display: flex;
    align-items: flex-start;
    width: 50%;
    margin-bottom: 20px;
}

.checkbox-container span,
.checkbox-container input {
    width: auto;
}

.checkbox-container span {
    margin-left: 6px;
    font-weight: bold;
}

.submit-btn {
    background-color: #222;
    color: #FCBA03;
    font-weight: bold;
    border: 2px solid #222;
    padding: 10px;
    font-size: 16px;
    margin: 0 auto;
    cursor: pointer;
    transition: .5s;
}

.submit-btn:hover {
    background-color: transparent;
    color: #222;
}
</style>