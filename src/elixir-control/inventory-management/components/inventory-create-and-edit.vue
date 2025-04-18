<script>
import { InventoryItem } from "../model/inventory.entity.js";
import { InventoryProcessApiService } from "../services/inventory-process-api.service.js";

export default {
  name: 'InventoryCreateAndEdit',
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    entity: {
      type: Object,
      default: () => new InventoryItem({}),
    },
    edit: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      item: new InventoryItem({}),
      inventoryService: new InventoryProcessApiService(),
    };
  },
  watch: {
    entity: {
      immediate: true,
      handler(newVal) {
        this.item = new InventoryItem(newVal || {});
      },
    },
    visible(newVal) {
      if (newVal) {
        this.item = new InventoryItem(this.entity || {});
      }
    },
  },
  methods: {
    closeDialog() {
      this.$emit('update:visible', false);
      this.$emit('canceled');
    },
    async saveItem() {
      try {
        if (this.edit && this.item.id) {
          await this.inventoryService.update(this.item.id, this.item);
        } else {
          const response = await this.inventoryService.create(this.item);
          this.$emit('item-created', response.data);
        }
        this.$emit('saved');
        this.closeDialog();
      } catch (error) {
        console.error("Error saving inventory item:", error);
      }
    },
  },
};
</script>

<template>
  <pv-dialog :visible="visible" @update:visible="closeDialog" :header="edit ? 'Edit Item' : 'Create Item'">
    <div class="form-group">
      <label for="name">Name:</label>
      <pv-input-text id="name" v-model="item.name" required />
    </div>

    <div class="form-group">
      <label for="quantity">Quantity:</label>
      <pv-input-number id="quantity" v-model="item.quantity" required />
    </div>

    <div class="form-group">
      <label for="unit">Unit:</label>
      <pv-input-text id="unit" v-model="item.unit" required />
    </div>

    <div class="form-group">
      <label for="supplier">Supplier:</label>
      <pv-input-text id="supplier" v-model="item.supplier" required />
    </div>

    <div class="form-group">
      <label for="costPerUnit">Cost Per Unit:</label>
      <pv-input-number id="costPerUnit" v-model="item.costPerUnit" required />
    </div>

    <div class="form-group">
      <label for="expiration">Expiration Date:</label>
      <pv-calendar id="expiration" v-model="item.expiration" dateFormat="mm/dd/yy" />
    </div>

    <div class="form-group">
      <label for="lastUpdated">Last Updated:</label>
      <pv-calendar id="lastUpdated" v-model="item.lastUpdated" dateFormat="mm/dd/yy" />
    </div>

    <div class="form-group">
      <label for="type">Type:</label>
      <select class="button-type" id="type" v-model="item.type" required>
        <option value="">Select Type</option>
        <option value="Raw Material">Raw Material</option>
        <option value="Equipment">Equipment</option>
        <option value="Consumable">Consumable</option>
      </select>
    </div>

    <template #footer>
      <pv-button label="Cancel" @click="closeDialog" />
      <pv-button label="Save" severity="success" @click="saveItem" />
    </template>
  </pv-dialog>
</template>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}
.button-type {
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
}
</style>
