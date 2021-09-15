<template>
  <!-- v-model = 2 ways binding -->
  <input type="text" placeholder="Filtrer" v-model="letters" @keyup="filter" />
  <h3>Toutes les tâches</h3>
  <!-- <div v-if="taskFiltered.length > 0"> -->
  <!-- v-show uses css / v-if maniupulate DOM (ressources consuming) -->
  <div v-show="taskFiltered.length > 0">
    <div class="task" v-for="task in taskFiltered" :key="task.id">
      <h4>{{ task.name }}</h4>
      <p>{{ task.description }}</p>
      <p>Échéance: {{ convertTemporalityCase(task.temporality) }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import tasksService from "@/services/tasks.js";
export default {
  name: "Tasks",
  setup() {
    const tasks = ref([]);
    const letters = ref("");
    tasks.value = tasksService.read();
    let taskFiltered = ref([]);

    const convertTemporalityCase = (temporality) => {
      return tasksService.convertCase(temporality);
    };
    const filter = () => {
      // console.log(letters.value);
      if (letters.value.length === 0) {
        taskFiltered.value = tasks.value;
      } else {
        taskFiltered.value = tasks.value.filter((t) =>
          t.name.toLocaleLowerCase().includes(letters.value.toLocaleLowerCase())
        );
      }
    };
    filter();
    return { tasks, taskFiltered, convertTemporalityCase, letters, filter }; // to use fct in templates
  },
};
</script>

<style scoped>
.task {
  margin: 10px 15px;
  border: 3px solid #42b983;
  border-radius: 5px;
}
</style>
