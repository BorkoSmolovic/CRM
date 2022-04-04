<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="text-h6 text-grey-8">
          Projects
          <q-btn
            style="background: orange; color: white"
            class="float-right text-capitalize shadow-3 q-mx-sm"
            icon="refresh"
            @click="getProjects()"
          />
          <q-btn
            label="Add project"
            style="background: green; color: white"
            class="float-right text-capitalize shadow-3"
            icon="post_add"
            @click="openAddDialog = true"
          />
        </div>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <q-table :rows="data" :columns="columns" :loading="tableLoading">
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
                  currentIndex = props.pageIndex;
                  currentProject = props.row;
                  openEditDialog = true;
                "
              />
              <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="deleteProject(props.row)"/>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <add-project
      :openAddDialog="openAddDialog"
      :projectStatuses="projectStatuses"
      @closeAddDialog="openAddDialog = false"
      @projectAdded="updateTable($event)"
    ></add-project>
    <edit-project
      :openEditDialog="openEditDialog"
      :projectStatuses="projectStatuses"
      @closeEditDialog="openEditDialog = false"
      @projectEdited="updateTable($event)"
      :currentProject="currentProject"
    ></edit-project>
  </div>
</template>


<script>
import { defineComponent, defineAsyncComponent } from "vue";
import axios from "axios";

const columns = [
  { name: "Id", label: "Id", field: "id", sortable: true, align: "left" },
  {
    name: "Title",
    label: "Title",
    field: "title",
    sortable: true,
    align: "left",
  },
  {
    name: "Description",
    label: "Description",
    field: "description",
    sortable: true,
    align: "left",
  },
  {
    name: "Deadline",
    label: "Deadline",
    field: "deadline",
    sortable: true,
    align: "left",
  },
  {
    name: "Status",
    label: "Status",
    field: "status",
    sortable: true,
    align: "left",
  },
  {
    name: "Action",
    label: "Action",
    field: "Action",
    sortable: false,
    align: "center",
  },
];

export default defineComponent({
  name: "Projects page",
  setup() {
    return {
      columns,
    };
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
      data: [],
      tableLoading: false,
      openAddDialog: false,
      openEditDialog: false,
      projectStatuses: [],
      currentProject: null,
      currentIndex: -1,
    };
  },
  methods: {
    getProjects() {
      this.tableLoading = true;
      axios
        .get("/api/projects")
        .then((response) => {
          this.tableLoading = false;
          this.data = response.data;
        })
        .catch((error) => {
          this.tableLoading = false;
          //if user isnt logged he is pushed to login page
          if (error.response.status == 401) {
            this.$router.push("/Login");
          }
        });
      this.tableLoading = false;
    },
    getProjectStatuses() {
      axios
        .get("/api/projectStatuses")
        .then((response) => {
          this.projectStatuses = response.data;
        })
        .catch((error) => {
          //if user isnt logged he is pushed to login page
          if (error.response.status == 401) {
            this.$router.push("/Login");
          }
        });
    },
    updateTable(project) {
      let message="";
      if(this.currentIndex != -1){
        message = "Project edited succesfully";
        this.data[this.data.indexOf(this.currentProject)] = project;
        this.currentIndex = -1;
        this.openEditDialog = false;
      }else{
        message = "Project added succesfully";
         this.data.push(project);
      this.openAddDialog = false;
      }
      this.$swal({
              icon: "success",
              title: message,
              timer: 1500,
            });
    },
    deleteProject(project){
      this.$swal({
  title: 'Do you want to delete '+ project.title +' project?',
  showDenyButton: true,
  confirmButtonText: 'Delete',
  denyButtonText: `Cancel`,
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    axios
        .delete("/api/projects/"+project.id)
        .then((response) => {
          this.data.splice(this.data.indexOf(project),1);
          this.$swal({
              icon: "success",
              title: "Project deleted successfully",
              timer: 1500,
            });
        })
        .catch((error) => {
          //if user isnt logged he is pushed to login page
          if (error.response.status == 401) {
            this.$router.push("/Login");
          }
        });

  }
})
    }
  },
  mounted() {
    this.getProjects();
    this.getProjectStatuses();
  },
});
</script>

<style scoped>
</style>
