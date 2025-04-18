<script>
import { Bottling } from "../model/bottling.entity.js";
import DataManager from "../../../shared/components/data-manager.component.vue";
import BottlingCreateAndEdit from "../components/bottling-create-and-edit.component.vue";
import WinemakingProcessManagement from "./winemaking-process-management.component.vue";
import { BottlingApiService } from "../services/bottling-api.service.js"; // ✅ Import corregido

export default {
  name: "bottling-management",
  components: { WinemakingProcessManagement, BottlingCreateAndEdit, DataManager },

  data() {
    return {
      title: { singular: 'Bottling', plural: 'Bottling' },
      bottlingArray: [],
      bottling: new Bottling({}),
      selectedBottling: [],
      bottlingApiService: null,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      submitted: false,
    }
  },

  methods: {
    //#region Utility Methods
    notifySuccessfulAction(message) {
      this.$toast.add({severity: 'success', summary: 'Success', detail: message, life: 3000});
    },

    findIndexById(id) {
      return this.bottlingArray.findIndex(bottling => bottling.id === id);
    },
    //#endregion

    //#region Event Handlers
    onNewItem() {
      this.bottling = new Bottling({});
      this.isEdit = false;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },

    onEditItem(item) {
      this.bottling = new Bottling(item);
      this.isEdit = true;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },

    onDeleteItem(item) {
      this.bottling = new Bottling(item);
      this.deleteBottling();
    },

    onDeleteSelectedItems(selectedItems) {
      this.selectedBottling = selectedItems;
      this.deleteSelectedBottling();
    },

    onCancelRequestedManagement() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },

    onSaveRequestedManagement(item) {
      console.log('onSaveRequestedManagement', item);
      this.submitted = true;

      if (item.id) {
        this.updateBottling();
      } else {
        this.createBottling();
      }

      this.createAndEditDialogIsVisible = false;
      this.isEdit = false;
    },
    //#endregion

    //#region Action Methods
    createBottling() {
      this.bottlingApiService.create(this.bottling.batchId, this.bottling).then(response => {
        let newBottling = new Bottling(response.data);
        this.bottlingArray.push(newBottling);
        this.notifySuccessfulAction('Bottling created successfully');
      })
          .catch(error => {
            console.error("Error creating bottling data", error);
          });
    },

    updateBottling() {
      this.bottlingApiService.update(this.bottling.batchId, this.bottling).then(response => {
        let index = this.findIndexById(this.bottling.id);
        this.bottlingArray[index] = new Bottling(response.data);
        this.notifySuccessfulAction('Bottling updated successfully');
      })
          .catch(error => {
            console.error("Error updating bottling data", error);
          });
    },

    deleteBottling() {
      this.bottlingApiService.delete(this.bottling.batchId).then(() => {
        let index = this.findIndexById(this.bottling.id);
        this.bottlingArray.splice(index, 1);
        this.notifySuccessfulAction('Bottling deleted successfully');
      })
          .catch(error => {
            console.error("Error deleting bottling data", error);
          });
    },

    deleteSelectedBottling() {
      this.selectedBottling.forEach(bottling => {
        this.bottlingApiService.delete(bottling.batchId).then(() => {
          this.bottlingArray = this.bottlingArray.filter(b => b.id !== bottling.id);
          this.notifySuccessfulAction('Bottling deleted successfully');
        })
            .catch(error => {
              console.error("Error deleting bottling data", error);
            });
      });
    },

    getAllBottling() {
      // No endpoint definido para getAll, puedes quitar esta función o adaptarla según tu backend
      console.warn("getAllBottling is not implemented in BottlingApiService");
    }
    //#endregion
  },

  //#region Lifecycle Hooks
  created() {
    this.bottlingApiService = new BottlingApiService(); // ✅ Corrección aquí
    this.getAllBottling();
    console.log('Bottling Management component created');
  }
}
</script>

<template>
  <winemaking-process-management></winemaking-process-management>

  <div class="w-full">
    <data-manager
        :title="title"
        v-bind:items="bottlingArray"
        v-on:new-item-requested-manager="onNewItem"
        v-on:edit-item-requested-manager="onEditItem($event)"
        v-on:delete-item-requested-manager="onDeleteItem($event)"
        v-on:delete-selected-items-requested-manager="onDeleteSelectedItems($event)"
    >
      <template #custom-columns-manager>
        <pv-column :sortable="true" field="id" header="Id" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="batchId" header="Batch Id" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="bottlingDate" header="Bottling Date" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="bottleSizeMl" header="Bottle Size (ml)" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="numberOfBottles" header="Number of Bottles" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="labelType" header="Label Type" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="corkType" header="Cork Type" style="min-width: 6rem"/>
      </template>
    </data-manager>

    <bottling-create-and-edit
        :visible="createAndEditDialogIsVisible"
        :edit="isEdit"
        :item="bottling"
        v-on:cancel-requested-bottling="onCancelRequestedManagement"
        v-on:save-requested-bottling="onSaveRequestedManagement($event)"
    />
  </div>
</template>

<style scoped>
</style>
