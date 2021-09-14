<template>
  <h3>Toutes les tâches</h3>
  <div v-if="tasks.length > 0">
    <div class="task" v-for="task in tasks" :key="task.id">
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
    tasks.value = tasksService.read();

    const convertTemporalityCase = (temporality) => {
      return tasksService.convertCase(temporality);
    };

    return { tasks, convertTemporalityCase }; // to use fct in templates
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
