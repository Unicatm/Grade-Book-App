import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { getStudentGrades } from "../api/gradesApi";

export const useGradesStore = defineStore("grades", () => {
  const grades = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  const averageGrade = computed(() => {
    if (!grades.value.length) return 0;
    const sum = grades.value.reduce((acc, item) => acc + item.valoare, 0);
    return (sum / grades.value.length).toFixed(2);
  });

  async function fetchStudentGrades() {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await getStudentGrades();

      grades.value = data;
    } catch (err) {
      error.value = "Couldn't load grades.";
      console.error("Error loading grades:", err);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    grades,
    isLoading,
    error,
    averageGrade,
    fetchStudentGrades,
  };
});
