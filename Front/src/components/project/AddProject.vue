<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="openAddDialog" :persistent="true">
      <q-card style="width: 550px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Add Project</div>
        </q-card-section>

        <q-separator />

        <q-form @submit="AddProject()" ref="form">
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
              $emit('closeAddDialog');
              resetForm();
            "
          />
          <q-btn
            flat
            label="Add"
            style="background: green; color: white"
            type="submit"
            color="success"
            @click="AddProject()"
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
    openAddDialog: false,
    projectStatuses: null,
  },
  methods: {
    AddProject() {
      //check if required fields are filled
      this.$refs.form.validate().then((success) => {
        if (success) {
          this.form.status_id = this.status.id;
          axios
            .post("/api/projects", this.form)
            .then((response) => {
              this.$emit('projectAdded',response.data)
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
