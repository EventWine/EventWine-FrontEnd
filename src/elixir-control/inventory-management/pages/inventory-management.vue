<script>
import HeaderContent from "../../../public/component/header-content.component.vue";
import InventoryCreateAndEdit from "../components/inventory-create-and-edit.vue";
import {InventoryProcessApiService} from "../services/inventory-process-api.service.js";
import {InventoryItem} from "../model/inventory.entity.js";
import {FilterMatchMode} from "@primevue/core";

export default {
  name: "InventoryManagement",
  components: {
    HeaderContent,
    InventoryCreateAndEdit,
  },
  data() {
    return {
      inventoryList: [],
      selectedItem: null,
      inventoryService: null,
      dialogVisible: false,
      isEdit: false,
      globalFilterValue: '',
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        type: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        unit: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      loading: false,
    };
  },
  //#region Lifecycle Hooks
  created() {
    this.inventoryService = new InventoryProcessApiService();
    this.fetchInventory();
  },
  //#endregion
  methods: {
    //#region Methods
    async fetchInventory() {
      this.loading = true;
      try {
        this.inventoryList = await this.inventoryService.getAll();
      } catch (error) {
        console.error("Error fetching inventory:", error);
      } finally {
        this.loading = false;
      }
    },

    showDetails(item) {
      this.selectedItem = new InventoryItem(item);
      this.isEdit = true;
      this.dialogVisible = true;
    },

    openNewItemDialog() {
      this.selectedItem = new InventoryItem({});
      this.isEdit = false;
      this.dialogVisible = true;
    },

    async deleteItem(item) {
      if (confirm(`Are you sure you want to delete ${item.name}?`)) {
        try {
          await this.inventoryService.delete(item.id);
          await this.fetchInventory();
        } catch (error) {
          console.error("Error deleting item:", error);
        }
      }
    },

    viewItemDetails(item) {
      this.$router.push({ name: 'InventoryDetails', params: { id: item.id } });
    },

    onGlobalFilterChange(e) {
      this.filters['global'].value = e.target.value;
    },

    clearFilter() {
      this.initFilters();
    },

    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        type: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        unit: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      };
      this.globalFilterValue = '';
    },

    async onItemSaved() {
      await this.fetchInventory();
      this.dialogVisible = false;
    },

    async onItemCreated(newItem) {
      await this.fetchInventory();
      this.dialogVisible = false;
    },
    //#endregion
  }
};
</script>

<template>
  <header-content></header-content>
  <div class="inventory-management">
    <pv-card class="mb-4">
      <template #title>
        <h1 class="text-3xl font-bold">Inventory Management</h1>
      </template>
      <template #content>
        <div class="card">
          <pv-toolbar class="mb-4">
            <template #start>
              <div class="p-input-icon-left">
                <i class="pi pi-search" />
                <pv-input-text v-model="globalFilterValue" placeholder="Search inventory" @input="onGlobalFilterChange" />
              </div>
            </template>
            <template #end>
              <pv-button label="Add New Item" icon="pi pi-plus" @click="openNewItemDialog" class="p-button-success" />
            </template>
          </pv-toolbar>

          <pv-data-table
              :value="inventoryList"
              :paginator="true"
              :rows="10"
              :rows-per-page-options="[5, 10, 15]"
              current-page-report-template="Showing {first} to {last} of {totalRecords} items"
              :filters="filters"
              :global-filter-fields="['name', 'type', 'unit']"
              :loading="loading"
          >
            <pv-column field="name" header="Name" :sortable="true" :filter-field="'name'">
              <template #filter="{ filterModel }">
                <pv-input-text v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by name" />
              </template>
            </pv-column>
            <pv-column field="type" header="Type" :sortable="true" :filter-field="'type'">
              <template #filter="{ filterModel }">
                <pv-input-text v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by type" />
              </template>
            </pv-column>
            <pv-column field="unit" header="Unit" :sortable="true" :filter-field="'unit'">
              <template #filter="{ filterModel }">
                <pv-input-text v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by unit" />
              </template>
            </pv-column>

            <pv-column headerStyle="width: 12rem">
              <template #body="{ data }">
                <pv-button icon="pi pi-eye" class="p-button-rounded p-button-info mr-2" @click="viewItemDetails(data)" />
                <pv-button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="showDetails(data)" />
                <pv-button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="deleteItem(data)" />
              </template>
            </pv-column>
          </pv-data-table>
        </div>

        <InventoryCreateAndEdit
            v-model:visible="dialogVisible"
            :entity="selectedItem"
            :edit="selectedItem && selectedItem.id"
            @canceled="dialogVisible = false"
            @saved="onItemSaved"
            @item-created="onItemCreated"
        />
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
.inventory-management {
  padding: 20px;
}

.card {
  background: var(--surface-card);
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

:deep(.p-column-filter) {
  width: 100%;
}
</style>
