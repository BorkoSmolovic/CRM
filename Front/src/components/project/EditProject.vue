<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="openEditDialog" :persistent="true">
      <q-card style="width: 550px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">{{this.$t(translation+".edit")}}</div>
        </q-card-section>

        <q-separator />

        <q-form @submit="addItem(api)" ref="form">
          <q-input
            outlined
            v-model="form.title"
            :label="this.$t(translation+'.title')"
            class="q-ma-md"
            :rules="[(val) => val != !!val || this.$t('mandatoryField')]"
          />
          <q-input
            outlined
            v-model="form.description"
            :label="this.$t(translation+'.description')"
            type="textarea"
            class="q-ma-md"
            :rules="[(val) => val != !!val || this.$t('mandatoryField')]"
          />
          <div class="row">
            <div class="col">
              <q-input
                outlined
                v-model="form.deadline"
                :label="this.$t(translation+'.deadline')"
                stack-label
                type="date"
                class="q-ma-md"
                :rules="[(val) => val != !!val || this.$t('mandatoryField')]"
              />
              <q-separator />
            </div>
            <div class="col">
              <q-select
                outlined
                v-model="status"
                :options="projectStatuses"
                :label="this.$t(translation+'.status')"
                option-value="id"
                option-label="label"
                class="q-ma-md"
                :rules="[(val) => val != !!val || this.$t('mandatoryField')]"
              />
              <q-separator />
            </div>
          </div>
        </q-form>
        <q-card-actions align="right">
          <q-btn
            flat
            :label="this.$t('close')"
            style="background: red; color: white"
            @click="
              $emit('closeEditDialog');
              resetForm();
            "
          />
          <q-btn
            flat
            :label="this.$t('edit')"
            style="background: green; color: white"
            type="submit"
            color="success"
            @click="editItem(api)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { editItem } from "../../statics/Functions/TableFunctions";

export default {
  setup() {
    return {};
  },
  data() {
    return {
      api:'projects',
      translation:'projects',
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
    tempItem: null,
  },
  watch: {
    // whenever question changes, this function will run
    openEditDialog(val) {
      if (val) {
        this.form.title = this.tempItem.title;
        this.form.description = this.tempItem.description;
        this.form.deadline = this.tempItem.deadline;
        this.status = this.tempItem.status;
      }
    },
    status(val) {
      if (val) {
        this.form.status_id = val.id;

      }
    },
  },
  methods: {
    editItem,
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
