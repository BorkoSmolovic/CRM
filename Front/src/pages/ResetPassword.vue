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
              <div class="col text-h6 ellipsis">
                {{ $t("resetPasswordTitle") }}
              </div>
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
                :label="$t('newPassword')"
                lazy-rules
                :rules="[
                (val) => val != !!val || this.$t('mandatoryField'),
                (val) => val.length >= 8 || this.$t('minLength')
                ]"
              />

              <q-input
                type="password"
                filled
                v-model="password_confirmation"
                :label="$t('confirmPassword')"
                lazy-rules
                :rules="[
                  (val) => val != !!val || this.$t('mandatoryField'),
                  (val) => val == password || this.$t('passwordMatchError'),
                ]"
              />

              <div>
                <q-toolbar class="bg-white text-primary q-px-none">
                  <q-btn
                    :label="$t('resetPasswordBtn')"
                    type="button"
                    color="primary"
                    @click="resetPassword()"
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
import swal from "vue-sweetalert2";

export default defineComponent({
  name: "Login componenet",
  setup() {},
  data() {
    return {
      email: "",
      password: "",
      password_confirmation: "",
      token: "",
      options: [
        { label: "ME", value: "me" },
        { label: "EN", value: "en-us" },
      ],
    };
  },
  mounted() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    this.email = params.email;
    this.token = params.token;
  },
  methods: {
    resetPassword() {
      axios
        .post("/api/reset-password", {
          token: this.token,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        })
        .then((response) => {
          this.$router.push("/login");
          this.$swal({
            icon: "success",
            title: this.$t("passwordChangeSuccess"),
            timer: 1500,
          });
        })
        .catch((error) => {
          if (error.response.status == 422) {
            this.$swal({
              title: "Error: " + error.response.status,
              text: error.response.data.message,
              icon: "error",
            });
          }
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
