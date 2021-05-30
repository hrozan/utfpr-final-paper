<template>
  <div>
    <h1>{{ message }}</h1>
    <button class="btn btn-primary" v-on:click="showMessage">Click Me</button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'App',
  data() {
    return {
      message: ""
    }
  },
  methods: {
    showMessage() {
      this.message = "Higor Rozan"
    }
  }
})
</script>

<style>
</style>
