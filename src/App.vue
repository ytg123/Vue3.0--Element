<template>
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
  <router-view />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>
