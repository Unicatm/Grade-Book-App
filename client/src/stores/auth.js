import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { login } from "../api/authApi";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(JSON.parse(localStorage.getItem("authUser")) || null);
  const token = ref(localStorage.getItem("authToken") || null);

  const isAuthenticated = computed(() => {
    return !!token.value && !!user.value;
  });

  const userEmail = computed(() => {
    return user.value?.email || "";
  });

  const userRole = computed(() => {
    return user.value?.role || "";
  });

  const userName = computed(() => {
    return user.value?.name || "";
  });

  async function loginUser(email, password) {
    try {
      const { token: newToken, user: newUser } = await login({
        email,
        password,
      });

      token.value = newToken;
      user.value = newUser;

      localStorage.setItem("authToken", newToken);
      localStorage.setItem("authUser", JSON.stringify(newUser));

      return true;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  function logoutUser() {
    user.value = null;
    token.value = null;
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
  }

  function checkAuth() {
    const savedToken = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("authUser");

    if (savedToken && savedUser) {
      token.value = savedToken;
      user.value = JSON.parse(savedUser);
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    userEmail,
    userRole,
    userName,
    loginUser,
    logoutUser,
    checkAuth,
  };
});
