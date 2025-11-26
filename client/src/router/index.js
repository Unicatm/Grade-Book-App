import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import DashboardView from "@/views/DashboardView.vue";
import GradesView from "@/views/student/GradesView.vue";
import StudentLayout from "@/layouts/StudentLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: "/",
    //   name: "home",
    //   component: HomeView,
    // },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
      redirect: { name: "student-grades" },
    },
    {
      path: "/student",
      component: StudentLayout,
      meta: { requiresAuth: true, roles: ["student"] },
      children: [
        {
          path: "grades",
          name: "student-grades",
          component: GradesView,
        },
      ],
    },
  ],
});

export default router;
