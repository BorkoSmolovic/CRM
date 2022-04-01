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
              <div class="col text-h6 ellipsis">{{$t('loginTitle')}}</div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input filled v-model="email" label="Email" lazy-rules />

              <q-input
                type="password"
                filled
                v-model="password"
                :label="$t('password')"
                lazy-rules
              />

              <div>
                <q-toolbar class="bg-white text-primary q-px-none">
      <q-btn :label="$t('loginBtn')" to="/" type="button" color="primary" />
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

export default defineComponent({
  setup() {
    return {
      email: ref("borko.smolovic@gmail.com"),
      password: ref("qwer"),
      options: [
        { label: "ME", value: "me" },
        { label: "EN", value: "en-us" },
      ],
    };
  },
});
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #1149d4 0%, #8ad8f8 100%);
}
</style>