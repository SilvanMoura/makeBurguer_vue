<template>

    <div id="burger-table">
        <Message v-if="msg" :msg="msg" />
        <TableMobile />
    </div>

</template>

<script>

    import Message from './Message.vue';
    import TableMobile from './TableMobile.vue';
    /* import TableDesktop from './TableDesktop.vue'; */

    export default {
        name: "Dashboard",
        data() {
            return {
                burgers: null,
                burger_id: null,
                status: [],
                msg: null
            }
        },
        components: {
            Message,
            TableMobile
        }
    }
</script>

<style scoped>

    #burger-table{
        max-width: 1200px;
        margin: 0 auto;
        height: 70vh;
    }

    #burger-table-heading,
    #burger-table-rows,
    .burger-table-row{
        display: flex;
        flex-wrap: wrap;
    }

    #burger-table-heading{
        font-weight: bold;
        padding: 12px;
        border-bottom: 3px solid #333;
    }

    #burger-table-heading div,
    .burger-table-row div{
        width: 16%;
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

    #burger-table-heading .order-id,
    .burger-table-row .order-number{
        width: 5%;
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

</style>