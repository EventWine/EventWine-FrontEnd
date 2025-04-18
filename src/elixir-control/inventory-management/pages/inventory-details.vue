<script>
import { InventoryProcessApiService } from "../services/inventory-process-api.service.js";
import HeaderContent from "../../../public/component/header-content.component.vue";

export default {
  name: 'InventoryDetails',
  components: { HeaderContent },
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      item: null,
      loading: true,
      error: false,
      service: new InventoryProcessApiService(),
    };
  },
  created() {
    this.fetchItem();
  },
  methods: {
    async fetchItem() {
      try {
        const response = await this.service.getById(this.id);
        this.item = response.data;
      } catch (error) {
        console.error("Error loading inventory item:", error);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
    goBack() {
      this.$router.push({ name: 'Inventory-Management' });
    },
  },
};
</script>

<template>
  <header-content></header-content>
  <div class="p-4">
    <pv-card>
      <template #title>
        <h2 class="text-2xl font-bold">Inventory Details</h2>
      </template>
      <template #content>
        <pv-skeleton v-if="loading" width="100%" height="150px" />
        <div v-else-if="error">
          <pv-message severity="error" :closable="false">Failed to load inventory item.</pv-message>
        </div>
        <div v-else>
          <div class="p-grid">
            <div class="p-col-12 p-md-6"><strong>Name:</strong> {{ item.name }}</div>
            <div class="p-col-12 p-md-6"><strong>Quantity:</strong> {{ item.quantity }}</div>
            <div class="p-col-12 p-md-6"><strong>Unit:</strong> {{ item.unit }}</div>
            <div class="p-col-12 p-md-6"><strong>Supplier:</strong> {{ item.supplier }}</div>
            <div class="p-col-12 p-md-6"><strong>Cost Per Unit:</strong> {{ item.costPerUnit }}</div>
            <div class="p-col-12 p-md-6"><strong>Expiration:</strong> {{ item.expiration }}</div>
            <div class="p-col-12 p-md-6"><strong>Last Updated:</strong> {{ item.lastUpdated }}</div>
            <div class="p-col-12 p-md-6"><strong>Type:</strong> {{ item.type }}</div>
          </div>
        </div>
      </template>
      <template #footer>
        <pv-button label="Back" icon="pi pi-arrow-left" @click="goBack" class="p-button-secondary" />
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
.p-grid > div {
  margin-bottom: 0.75rem;
}
</style>