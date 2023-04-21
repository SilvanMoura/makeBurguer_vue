<template>
  <Navbar :logo="logoSrc" :alt="appName"/>
  <router-view/>
  <Footer />
</template>

<script>
  import Navbar from './components/Navbar.vue';
  import Footer from './components/Footer.vue';
  
  export default{
    components:{
      Navbar,
      Footer
    },
    data(){
      return{
        logoSrc: "/img/logo.png",
        appName: "Make Your Burger"
      }
    }
  }
</script>

<style>
  *{
    font-family: Helvetica;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
</style>
