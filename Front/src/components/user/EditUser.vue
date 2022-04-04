<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="openEditDialog" :persistent="true">
      <q-card style="width: 550px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">{{this.$t(api+".edit")}}</div>
        </q-card-section>

        <q-separator />

        <q-form @submit="addItem(api)" ref="form">
          <q-input
            outlined
            v-model="form.name"
            :label="this.$t(api+'.name')"
            class="q-ma-md"
            :rules="[(val) => val != !!val || this.$t('mandatoryField')]"
          />
          <q-input
            outlined
            v-model="form.email"
            :label="this.$t(api+'.email')"
            class="q-ma-md"
            :rules="[(val) => val != !!val || this.$t('mandatoryField')]"
          />
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
      status: null,
      form: {
        name: "",
        email: "",
      },
    };
  },
  props: {
    api: null,
    openEditDialog: false,
    tempItem: null,
  },
  watch: {
    // whenever question changes, this function will run
    openEditDialog(val) {
      if (val) {
        this.form.name = this.tempItem.name;
        this.form.email = this.tempItem.email;
      }
    },
  },
  methods: {
    editItem,
    resetForm() {
      this.$refs.form.resetValidation();
      this.status = null;
      this.form = {
        name: "",
        email: "",
      };
    },
  },
};
</script>
