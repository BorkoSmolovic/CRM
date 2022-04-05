<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog
      v-model="openDetailsDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space />
          <q-btn dense flat icon="close" @click="$emit('closeDetailsDialog')">
            <q-tooltip class="bg-white text-primary">{{this.$t('close')}}}</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">{{tempItem.name}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">

          <projects
          :api="api"
          :adminAddApi="adminAddApi"
          :tempUserItem="tempItem"
          ></projects>

          </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, defineAsyncComponent, ref } from "vue";

export default {
  setup () {
    return {
    }
  },
  data(){
    return{
      api:"",
      adminAddApi:"",
    }
  },
  props:{
    openDetailsDialog:false,
    tempItem: null,
  },
  components: {
    Projects: defineAsyncComponent(() =>
      import("pages/Projects")
    )
  },
  watch:{
    //from prop item gets user id and returns its projects
    tempItem(val){
      this.api = "projects/" + val.id
      this.adminAddApi = "projects?id=" + val.id
    }
  }
}
</script>

<style scoped>
.swal2-container {
  z-index: 10000;
}
</style>
