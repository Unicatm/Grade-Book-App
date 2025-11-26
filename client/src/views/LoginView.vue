<template>
  <v-container class="fill-height bg-grey-lighten-4" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12 rounded-lg pa-4">
          <v-card-title
            class="text-center text-h5 font-weight-bold text-primary mb-4"
          >
            Login
          </v-card-title>

          <v-card-text>
            <v-alert
              v-if="errorMessage"
              type="error"
              variant="tonal"
              closable
              class="mb-4"
              @click:close="errorMessage = null"
            >
              {{ errorMessage }}
            </v-alert>

            <v-form
              @submit.prevent="handleLogin"
              v-model="isValid"
              ref="formRef"
            >
              <v-text-field
                v-model="email"
                label="Email"
                prepend-inner-icon="mdi-email"
                variant="outlined"
                :rules="emailRules"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Parolă"
                prepend-inner-icon="mdi-lock"
                variant="outlined"
                type="password"
                :rules="passwordRules"
                required
                class="mt-2"
              ></v-text-field>

              <v-btn
                type="submit"
                block
                color="primary"
                size="large"
                class="mt-4"
                :loading="isLoading"
                :disabled="!isValid"
              >
                Intra in cont
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const email = ref("");
const password = ref("");
const errorMessage = ref(null);
const isLoading = ref(false);
const isValid = ref(false);
const formRef = ref(null);

const router = useRouter();
const authStore = useAuthStore();

const emailRules = [
  (v) => !!v || "Email is mandatory",
  (v) => /.+@.+\..+/.test(v) || "The email should be valid.",
];
const passwordRules = [(v) => !!v || "Password is mandatory"];

const handleLogin = async () => {
  const { valid } = await formRef.value.validate();
  if (!valid) return;

  isLoading.value = true;
  errorMessage.value = null;

  try {
    await authStore.loginUser(email.value, password.value);

    router.push("/dashboard");
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || "Error";
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.bg-grey-lighten-4 {
  background-color: #f5f5f5 !important;
}
</style>
