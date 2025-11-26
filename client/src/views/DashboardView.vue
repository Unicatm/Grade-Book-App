<template>
  <v-container>
    <v-card class="pa-6 mt-4">
      <v-card-title class="text-h4">Panoul Principal 👋</v-card-title>
      <v-card-subtitle class="mt-2">
        Welcome, {{ authStore.userName || "Utilizator" }}!
      </v-card-subtitle>

      <v-card-text>
        Role:
        <v-chip color="primary" class="font-weight-bold ml-2">
          {{ authStore.userRole.toUpperCase() }}
        </v-chip>
      </v-card-text>

      <v-btn color="error" @click="handleLogout">Logout</v-btn>
    </v-card>
  </v-container>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logoutUser();
  router.push("/login");
};
</script>
