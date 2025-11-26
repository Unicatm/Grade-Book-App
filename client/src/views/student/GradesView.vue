<template>
  <v-container fluid>
    <h1 class="text-h4 mb-4 text-primary">Grades</h1>

    <v-card class="mb-6 elevation-2" color="blue-grey-lighten-5">
      <v-card-text>
        <div class="d-flex justify-space-between align-center">
          <div class="text-subtitle-1">Average Grade</div>
          <div class="text-h4 font-weight-bold text-success">
            {{ gradesStore.averageGrade }}
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-skeleton-loader
      v-if="gradesStore.isLoading"
      type="table-row-divider@5"
    ></v-skeleton-loader>

    <v-alert
      v-else-if="gradesStore.error"
      type="error"
      variant="tonal"
      class="mb-4"
    >
      {{ gradesStore.error }}
      <v-btn
        size="small"
        color="error"
        class="ml-4"
        @click="gradesStore.fetchStudentGrades"
        >Reîncărcați</v-btn
      >
    </v-alert>

    <v-data-table
      v-else
      :headers="headers"
      :items="gradesStore.grades"
      item-key="id"
      class="elevation-1"
      no-data-text="You don't have any grades recorded yet."
    >
      <template v-slot:item.data="{ item }">
        <span v-if="item.data">
          {{ date.format(item.data, "keyboardDate") }}
        </span>
        <span v-else>-</span>
      </template>

      <template v-slot:item.valoare="{ item }">
        <v-chip
          :color="getGradeColor(item.valoare)"
          dark
          class="font-weight-bold"
        >
          {{ item.valoare }}
        </v-chip>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { onMounted } from "vue";
import { useGradesStore } from "@/stores/grades";
import { useDate } from "vuetify";

const date = useDate();
const gradesStore = useGradesStore();

const headers = [
  { title: "Materie", key: "subject.name" },
  { title: "Nota", key: "valoare" },
  { title: "Data", key: "data" },
];

const getGradeColor = (value) => {
  if (value >= 9) return "green-darken-3";
  if (value >= 7) return "light-blue-darken-3";
  if (value >= 5) return "orange-darken-1";
  return "red-darken-3";
};

onMounted(() => {
  if (!gradesStore.grades.length) {
    gradesStore.fetchStudentGrades();
  }
});
</script>
