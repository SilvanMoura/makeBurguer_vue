<template>

    <div id="burger-table">
        <Message v-if="msg" :msg="msg" />

        <div id="burger-table-rows">

            <div class="burger-table-row" v-for="burger in burgers" :key="burger.id">
                <div class="order-number">
                    <p>Id:</p>
                    <div>{{ burger.id  }}</div>
                </div>

                <div>
                    <p>Nome:</p>
                    <div>
                        {{  burger.name  }}
                    </div>
                </div>

                <div>
                    <p>Pão:</p> 
                    <div>
                        {{  burger.bread  }}
                    </div>
                </div>

                <div> 
                    <p>Carne:</p>
                    <div>
                        {{  burger.meat  }}
                    </div>
                </div>
                
                
                <div class="order-opcional">
                    <p>Opcionais:</p>
                    <ul>
                        <li v-for="(opcional, index) in burger.optionals" :key="index">
                            {{ opcional }}
                        </li>
                    </ul>
                </div>
                <div class="actions-btn">
                    <select name="status" class="status" @change="updatedBurger($event, burger.id)">
                        <option value="">Selecione</option>
                        <option v-for="burgerStatus in status" :key="burgerStatus.id" :value="burgerStatus.status" :selected="burger.status == burgerStatus.status">
                            {{ burgerStatus.status }}
                        </option>
                    </select>
                    <button class="delete-btn" @click="deleteBurger(burger.id)">Cancelar</button>
                </div>
            </div>

        </div>
    </div>

</template>

<script>

    import Message from './Message.vue';
    import axios from 'axios';

    export default {
        name: "TableMobile",
        data() {
            return {
                burgers: null,
                burger_id: null,
                status: [],
                msg: null
            }
        },
        components: {
            Message
        },
        methods: {
            getPedidos() {
                
                axios.get("http://localhost:8000/api/burguerAll")
                .then(response => {
                    
                    const data = response.data;

                    this.burgers = data;

                    for (var i = 0; i < data.length; i++) {
                        data[i].optionals == '' ? 
                            data[i].optionals = ["Nenhum opcional informado"] : 
                            data[i].optionals = data[i].optionals.split(";");

                        this.burguer = data[i].status;
                    }

                    this.getStatus();
                })
                .catch(error => console.log(error));

                
            },

            getStatus(){
                axios.get("http://localhost:8000/api/burguerStatus")
                .then(response => {
                    const data = response.data;

                    for (var i = 0; i < data.length; i++) {
                        this.status.push({
                            "id": data[i].id,
                            "status": data[i].status_burguer
                        });
                    }
                })
                .catch(error => console.log(error));

                

            },

            deleteBurger(id){
                axios.delete(`http://127.0.0.1:8000/api/burguerDelete/${id}`)
                .then(response => {
                    this.msg = `Pedido removido com sucesso`;

                    setTimeout( () => this.msg = "" , 3000);

                    this.getPedidos();
                })
                .catch(error => console.log(error));
                
                
            },

            updatedBurger(event, id){

                const option = event.target.value;

                if(option == ""){

                    this.msg = `A opção "Selecione não é um estado válido, selecione outro por gentileza!"`;
                    setTimeout( () => {
                        this.msg = "";
                    }, 3000);
                    
                    return false;
                }
                
                const dataJson = { status: option };

                axios.patch(`http://localhost:8000/api/burguerUpdate/${id}`, dataJson)
                .then(response => {
                    const res = response.data;

                    this.msg = `Pedido Nº ${res.id} atualizado para "${res.status}"`;

                    setTimeout( () => this.msg = "" , 3000);
                })
                .catch(error => console.log(error));
            }
        },
        mounted() {
            this.getPedidos()
        }
    }
</script>

<style scoped>

    #burger-table{
        max-width: 1200px;
        margin: 0 auto;
        height: 70vh;
    }

    #burger-table-rows,
    .burger-table-row{
        display: flex;
        flex-wrap: wrap;
    }

    .burger-table-row div{
        font-size: 20px;
        font-family: Arial, Helvetica, sans-serif;
        font-style: normal;
        display: flex;
        gap: 5px;
    }

    .burger-table-row div{
        width: 15%;
    }

    .burger-table-row .actions-btn{
        width: 25%;
    }

    .burger-table-row .actions-btn select,
    .burger-table-row .actions-btn button{
        border-radius: 5%;
    }

    .burger-table-row{
        width: 100%;
        padding: 12px;
        border-bottom:  1px solid #CCC;
    }
    .burger-table-row .order-number{
        width: 10%;
    }

    select{
        padding: 12px 6px;
        margin-right: 12px;
    }

    .delete-btn{
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

    .delete-btn:hover{
        background-color: transparent;
        color: #222;
    }

    @media (max-width: 780px) {
      .burger-table-row{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
      .burger-table-row div{
        display: flex;
        flex-direction: row;
      }
    }

    @media (max-width: 780px){
        .burger-table-row div{
            display: flex;
            justify-content: center;
            width: auto;
        }

        .order-opcional ul li{
            list-style-type: none;
            margin-left: -25px;
        }
        
    }


</style>