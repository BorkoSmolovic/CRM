<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="openEditDialog" :persistent="true">
      <q-card style="width: 550px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Edit Project</div>
        </q-card-section>

        <q-separator />

        <q-form @submit="EditProject()" ref="form">
          <q-input
            outlined
            v-model="form.title"
            label="Title"
            class="q-ma-md"
            :rules="[(val) => val != !!val || 'This field is mandatory']"
          />
          <q-input
            outlined
            v-model="form.description"
            label="Description"
            type="textarea"
            class="q-ma-md"
            :rules="[(val) => val != !!val || 'This field is mandatory']"
          />
          <div class="row">
            <div class="col">
              <q-input
                outlined
                v-model="form.deadline"
                label="Deadline"
                stack-label
                type="date"
                class="q-ma-md"
                :rules="[(val) => val != !!val || 'This field is mandatory']"
              />
              <q-separator />
            </div>
            <div class="col">
              <q-select
                outlined
                v-model="status"
                :options="projectStatuses"
                label="Status"
                option-value="id"
                option-label="label"
                class="q-ma-md"
                :rules="[(val) => val != !!val || 'This field is mandatory']"
              />
              <q-separator />
            </div>
          </div>
        </q-form>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Close"
            style="background: red; color: white"
            @click="
              $emit('closeEditDialog');
              resetForm();
            "
          />
          <q-btn
            flat
            label="Edit"
            style="background: green; color: white"
            type="submit"
            color="success"
            @click="EditProject()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    return {};
  },
  data() {
    return {
      status: null,
      form: {
        title: "",
        description: "",
        deadline: "",
        status_id: "",
      },
    };
  },
  props: {
    openEditDialog: false,
    projectStatuses: null,
    currentProject: null,
  },
  watch: {
    // whenever question changes, this function will run
    openEditDialog(val) {
      if (val) {
        this.form.title = this.currentProject.title
        this.form.description = this.currentProject.description
        this.form.deadline = this.currentProject.deadline
        this.status = this.currentProject.status
      }
    }
  },
  methods: {
    EditProject() {
      //check if required fields are filled
      this.$refs.form.validate().then((success) => {
        if (success) {
          this.form.status_id = this.status.id;
          axios
            .put("/api/projects/"+this.currentProject.id, this.form)
            .then((response) => {
              this.$emit('projectEdited',response.data)
            })
            .catch((error) => {
              //if user isnt logged he is pushed to login page
              if (error.response.status == 401) {
                this.$router.push("/Login");
              }
            });
        }
      });
    },
    resetForm() {
      this.$refs.form.resetValidation();
      this.status = null;
      this.form = {
        title: "",
        description: "",
        deadline: "",
        status_id: "",
      };
    },
  },
};
</script>
