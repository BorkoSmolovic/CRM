<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="openAddDialog" :persistent="true">
      <q-card style="width: 550px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">{{this.$t(api+'.add')}}</div>
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
              $emit('closeAddDialog');
              resetForm();
            "
          />
          <q-btn
            flat
            :label="this.$t('add')"
            style="background: green; color: white"
            type="submit"
            color="success"
            @click="addItem(api)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { addItem } from "../../statics/Functions/TableFunctions";

export default {
  setup() {
    return {};
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
      },
    };
  },
  props: {
    api: null,
    openAddDialog: false,
    projectStatuses: null,
  },
  methods: {
    addItem,
    resetForm() {
      this.$refs.form.resetValidation();
      this.form = {
        name: "",
        email: "",

      };
    },
  },
  watch: {
    // whenever question changes, this function will run
    openAddDialog(val){
      if(this.$refs.form){
         this.resetForm();
      }
    }
  },
};
</script>
