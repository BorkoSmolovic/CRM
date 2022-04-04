<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="text-h6 text-grey-8">
          {{ this.$t(translation + ".pageTitle") }}
          <q-btn
            style="background: orange; color: white"
            class="float-right text-capitalize shadow-3 q-mx-sm"
            icon="refresh"
            @click="getItems(api)"
          />
          <q-btn
            :label="this.$t(translation + '.add')"
            style="background: green; color: white"
            class="float-right text-capitalize shadow-3"
            icon="post_add"
            @click="openAddDialog = true"
          />
        </div>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <q-table
          :rows="data ? data : []"
          :columns="columns"
          :loading="tableLoading"
          row-key="id"
        >
          <template v-slot:body-cell-Status="props">
            <q-td :props="props">
              {{ props.value.label }}
            </q-td>
          </template>

          <template v-slot:body-cell-Action="props">
            <q-td :props="props">
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
    <add-project
      :api="api"
      :openAddDialog="openAddDialog"
      :projectStatuses="projectStatuses"
      @closeAddDialog="openAddDialog = false"
      @itemAdded="updateTable($event)"
    ></add-project>
    <edit-project
      :api="api"
      :openEditDialog="openEditDialog"
      :projectStatuses="projectStatuses"
      @closeEditDialog="openEditDialog = false"
      @itemUpdated="updateTable($event)"
      :tempItem="tempItem"
    ></edit-project>
  </div>
</template>


<script>
import { defineComponent, defineAsyncComponent, ref } from "vue";
import axios from "axios";
import {
  getItems,
  getProjectStatuses,
  updateTable,
  deleteItem,
} from "../statics/Functions/TableFunctions";

export default defineComponent({
  name: "Projects page",
  setup() {
    return {};
  },
  components: {
    AddProject: defineAsyncComponent(() =>
      import("components/project/AddProject")
    ),
    EditProject: defineAsyncComponent(() =>
      import("components/project/EditProject")
    ),
  },
  data() {
    return {
      translation: "projects",
      data: [],
      tableLoading: false,
      openAddDialog: false,
      openEditDialog: false,
      projectStatuses: [],
      tempItem: null,
      tempIndex: -1,
    };
  },
  props: {
    api: {
      type: String,
      default: "projects",
    },
  },
  methods: {
    getItems,
    getProjectStatuses,
    updateTable,
    deleteItem,
  },
  mounted() {
    this.getItems(this.api);
    this.getProjectStatuses();
  },
  computed: {
    columns() {
      return [
        { name: "Id", label: "Id", field: "id", sortable: true, align: "left" },
        {
          name: "Title",
          label: this.$t(this.translation + ".title"),
          field: "title",
          sortable: true,
          align: "left",
        },
        {
          name: "Description",
          label: this.$t(this.translation + ".description"),
          field: "description",
          sortable: true,
          align: "left",
        },
        {
          name: "Deadline",
          label: this.$t(this.translation + ".deadline"),
          field: "deadline",
          sortable: true,
          align: "left",
        },
        {
          name: "Status",
          label: this.$t(this.translation + ".status"),
          field: "status",
          sortable: true,
          align: "left",
        },
        {
          name: "Action",
          label: this.$t(this.translation + ".action"),
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
