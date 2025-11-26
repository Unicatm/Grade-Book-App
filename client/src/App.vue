<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title class="font-weight-bold">
        Online Grade Book
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn text to="/">Home</v-btn>

      <v-btn v-if="!authStore.isAuthenticated" text to="/login">Login</v-btn>
      <v-btn v-else text @click="handleLogout">Logout</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "./stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logoutUser();
  router.push("/login");
};
</script>
