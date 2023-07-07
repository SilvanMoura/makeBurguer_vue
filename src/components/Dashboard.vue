<template>

    <div id="burger-table">
        <Message v-if="msg" :msg="msg" />
        <TableDesktop v-if="showDesktop" />
        <TableMobile v-if="showMobile" />
    </div>

</template>

<script>

    import Message from './Message.vue';
    import TableMobile from './TableMobile.vue';
    import TableDesktop from './TableDesktop.vue';

    export default {
        name: "Dashboard",
        data() {
            return {
                burgers: null,
                burger_id: null,
                status: [],
                msg: null,
                screenWidth: null,
                showDesktop: true,
                showMobile: false
            }
        },
        components: {
            Message,
            TableMobile,
            TableDesktop
        },
        mounted() {
            this.updateScreenWidth();
            
            window.addEventListener("resize", this.updateScreenWidth);
        },
        beforeDestroy() {
            window.removeEventListener("resize", this.updateScreenWidth);
        },
        methods: {
            updateScreenWidth() {
                this.screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

                if(this.screenWidth <= 780){
                    this.showDesktop = false;
                    this.showMobile = true;
                }else{
                    this.showDesktop = true;
                    this.showMobile = false;
                }
            }
        }
    }
</script>
