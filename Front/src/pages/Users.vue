<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="text-h6 text-grey-8">
          {{ this.$t(api + ".pageTitle") }}
          <q-btn
            style="background: orange; color: white"
            class="float-right text-capitalize shadow-3 q-mx-sm"
            icon="refresh"
            @click="getItems(api)"
          />
          <q-btn
            :label="this.$t(api + '.add')"
            style="background: green; color: white"
            class="float-right text-capitalize shadow-3"
            icon="post_add"
            @click="openAddDialog = true"
          />
        </div>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <q-table
          :rows="data"
          :columns="columns"
          :loading="tableLoading"
          row-key="id"
        >

          <template v-slot:body-cell-Action="props">
            <q-td :props="props">
              <q-btn
                icon="list_alt"
                size="sm"
                flat
                dense
                @click="
                  tempItem = props.row;
                  openDetailsDialog = true;
                "
              />
              <q-btn
                icon="edit"
                size="sm"
                flat
                dense
                @click="
                  tempIndex = props.pageIndex;
                  tempItem = props.row;
                  openEditDialog = true;
                "
              />
              <q-btn
                icon="delete"
                size="sm"
                class="q-ml-sm"
                flat
                dense
                @click="deleteItem(api, props.row)"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <add-user
      :api="api"
      :openAddDialog="openAddDialog"
      @closeAddDialog="openAddDialog = false"
      @itemAdded="updateTable($event)"
    ></add-user>
    <edit-user
      :api="api"
      :openEditDialog="openEditDialog"
      @closeEditDialog="openEditDialog = false"
      @itemUpdated="updateTable($event)"
      :tempItem="tempItem"
    ></edit-user>
    <details-user
      :openDetailsDialog="openDetailsDialog"
      @closeDetailsDialog="openDetailsDialog = false"
      :tempItem="tempItem"
    ></details-user>
  </div>
</template>


<script>
import { defineComponent, defineAsyncComponent, ref } from "vue";
import axios from "axios";
import {
  getItems,
  updateTable,
  deleteItem,
} from "../statics/Functions/TableFunctions";

export default defineComponent({
  name: "Users page",
  setup() {
    return {
    };
  },
  components: {
    AddUser: defineAsyncComponent(() =>
      import("components/user/AddUser")
    ),
    EditUser: defineAsyncComponent(() =>
      import("components/user/EditUser")
    ),
    DetailsUser: defineAsyncComponent(() =>
      import("components/user/DetailsUser")
    ),
  },
  data() {
    return {
      api: "users",
      data: [],
      tableLoading: false,
      openAddDialog: false,
      openEditDialog: false,
      openDetailsDialog: false,
      tempItem: null,
      tempIndex: -1,
    };
  },
  methods: {
    getItems,
    updateTable,
    deleteItem,
  },
  mounted() {
    this.getItems(this.api);
  },
  computed: {
    columns() {
      return [
        { name: "Id", label: "Id", field: "id", sortable: true, align: "left" },
        {
          name: "Name",
          label: this.$t(this.api + ".name"),
          field: "name",
          sortable: true,
          align: "left",
        },
        {
          name: "Email",
          label: this.$t(this.api + ".email"),
          field: "email",
          sortable: true,
          align: "left",
        },
        {
          name: "Action",
          label: this.$t(this.api + ".action"),
          field: "Action",
          sortable: false,
          align: "center",
        },
      ];
    },
  },
});
</script>

<style scoped>
</style>
