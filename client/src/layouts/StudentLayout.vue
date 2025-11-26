<template>
  <v-app>
    <v-navigation-drawer app permanent>
      <v-list dense nav>
        <v-list-item-title class="pa-4 text-h6 font-weight-bold text-primary"
          >Elev</v-list-item-title
        >

        <v-list-item
          v-for="item in navItems"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon
            ><v-icon>{{ item.icon }}</v-icon></v-list-item-icon
          >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import { reactive } from "vue";

const navItems = reactive([
  {
    title: "Notele Mele",
    icon: "mdi-file-chart",
    to: { name: "student-grades" },
  },
  //   {
  //     title: "Absențe",
  //     icon: "mdi-calendar-remove",
  //     to: { name: "student-absences" },
  //   },
  { title: "Profil", icon: "mdi-account", to: "/student/profile" },
]);
</script>
