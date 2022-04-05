<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card
          v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '30%' }"
        >
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="../statics/images/kodio.jpeg" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">{{ $t("loginTitle") }}</div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                filled
                v-model="email"
                label="Email"
                lazy-rules
                :rules="[(val) => val != !!val || this.$t('mandatoryField')]"
              />

              <q-input
                type="password"
                filled
                v-model="password"
                :label="$t('password')"
                lazy-rules
                :rules="[(val) => val != !!val || this.$t('mandatoryField')]"
              />

              <div>
                <q-toolbar class="bg-white text-primary q-px-none">
                  <q-btn
                    :label="$t('loginBtn')"
                    type="button"
                    color="primary"
                    @click="login()"
                  />
                  <q-space />
                  <q-btn-toggle
                    v-model="$i18n.locale"
                    toggle-color="secondary"
                    :options="options"
                  />
                </q-toolbar>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import axios from "axios";
import swal from 'vue-sweetalert2'

export default defineComponent({
  name: "Login componenet",
  setup() {
    return {
      email: ref("admin@gmail.com"),
      password: ref("admin.12"),
      options: [
        { label: "ME", value: "me" },
        { label: "EN", value: "en-us" },
      ],
    };
  },
  methods: {
    login() {
      axios.get("/sanctum/csrf-cookie").then((response) => {
        axios
          .post("/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            this.$router.push("/");
            this.$swal({
              icon: "success",
              title: this.$t("loginSuccess"),
              timer: 1500,
            });
          })
          .catch((error) => {
             if (error.response.status == 422) {
          this.$swal({
            title: "Error: "+error.response.status,
            text: error.response.data.message,
            icon: "error",
          });
          }
          });
      });
    },
  },
});
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #1149d4 0%, #8ad8f8 100%);
}
</style>
