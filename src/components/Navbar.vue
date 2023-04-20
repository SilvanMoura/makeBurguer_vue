<template>
    <nav>
        <Router-link to="/">
            <img src="" id="logo">
        </Router-link>
        <router-link to="/">Home</router-link> |
        <router-link to="/requests">Pedidos</router-link>
    </nav>
</template>

<script>
    export default{
        name: "Navbar"
    }
</script>

<style scoped>

</style>