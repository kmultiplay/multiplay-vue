<template>
  <Nav></Nav>
  <Header></Header>
  <Main></Main>
</template>

<script setup lang="ts">
import Nav from "@/components/Layout/NavbarComponent.vue";
import Header from "@/components/Layout/HeaderComponent.vue";
import Main from "@/components/Layout/MainComponent.vue";
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
