<script>
import HeaderContent from "../component/header-content.component.vue";

export default {
  name: "home-content",
  components: {HeaderContent},
  methods: {
    goToInventory() {
      this.$router.push('/vinicultor/inventory');
    },
    goToProcess() {
      this.$router.push('/vinicultor/winemaking-process/batches');
    }
  }
}
</script>

<template>
  <header-content></header-content>
  <div class="home-container">
    <h1 class="title">Welcome to Elixir Control</h1>
    <p class="subtitle">Manage your wine production and inventory with ease.</p>

    <div class="button-group">
      <pv-button
          label="Go to Inventory"
          icon="pi pi-box"
          class="p-button-primary"
          @click="goToInventory"
      />
      <pv-button
          label="Go to Winemaking"
          icon="pi pi-cog"
          class="p-button-secondary ml-2"
          @click="goToProcess"
      />
    </div>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px); /* espacio para el toolbar */
  padding: 2rem;
  text-align: center;
}

.title {
  font-size: 2.5rem;
  color: #ffffff; /* blanco para fondo gris */
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #dddddd; /* gris claro */
  margin-bottom: 2rem;
}

.button-group {
  display: flex;
  justify-content: center;
}
</style>
