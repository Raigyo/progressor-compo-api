<template>
  <Modal
    v-if="isInEditMode"
    :task="taskToEdit"
    @updatetask="updateTask($event)"
    @cancel="cancelEdit"
  />
  <!-- v-model = 2 ways binding -->
  <input type="text" placeholder="Filtrer" v-model="letters" @keyup="filter" />
  <div class="radio-filters">
    <label for="all">
      <input type="radio" value="" id="all" v-model="selectedTemporality" />
      Toutes
    </label>
    <label for="short-term">
      <input
        type="radio"
        value="short-term"
        id="short-term"
        v-model="selectedTemporality"
      />
      Court terme
    </label>
    <label for="medium-term">
      <input
        type="radio"
        value="medium-term"
        id="medium-term"
        v-model="selectedTemporality"
      />
      Moyen terme
    </label>
    <label for="long-term">
      <input
        type="radio"
        value="long-term"
        id="long-term"
        v-model="selectedTemporality"
      />
      Long terme
    </label>
  </div>
  <h3>Toutes les tâches</h3>
  <!-- <div v-if="tasksFiltered.length > 0"> -->
  <!-- v-show uses css / v-if maniupulate DOM (ressources consuming) -->
  <div v-show="tasksFiltered.length > 0">
    <div class="task" v-for="task in tasksFiltered" :key="task.id">
      <h4>{{ task.name }}</h4>
      <p>{{ task.description }}</p>
      <p>Échéance: {{ convertTemporalityCase(task.temporality) }}</p>
      <div>
        <button class="small" @click="() => deleteTask(task.id)">
          Effacer
        </button>
        <button class="small" @click="() => toggleToEdit(task)">Editer</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import tasksService from "@/services/tasks.js";
import Modal from "../components/Modal.vue";
export default {
  name: "Tasks",
  components: {
    Modal,
  },
  setup() {
    const tasks = ref([]);
    const letters = ref("");
    const selectedTemporality = ref("");
    let tasksFiltered = ref([]);
    let isInEditMode = ref(false);
    let taskToEdit = ref(null);
    tasks.value = tasksService.read();

    const convertTemporalityCase = (temporality) => {
      return tasksService.convertCase(temporality);
    };

    const filter = () => {
      // console.log(letters.value);
      if (letters.value.length === 0) {
        tasksFiltered.value = tasks.value;
      } else {
        tasksFiltered.value = tasks.value.filter((t) =>
          t.name.toLocaleLowerCase().includes(letters.value.toLocaleLowerCase())
        );
      }
      if (selectedTemporality.value !== "") {
        tasksFiltered.value = tasksFiltered.value.filter(
          (t) => t.temporality === selectedTemporality.value
        );
        // console.log(("tasksFiltered", tasksFiltered.value));
        // console.log(("selectedTemporality", selectedTemporality.value));
      }
    };

    const toggleToEdit = (task) => {
      // console.log("toggleToEdit", task);
      taskToEdit.value = task;
      isInEditMode.value = true;
    };

    const updateTask = (task) => {
      console.log("updateTask", task);
    };

    const cancelEdit = () => {
      isInEditMode.value = false;
      taskToEdit.value = null;
    };

    const deleteTask = (id) => {
      tasksService.deleteTask(id);
      tasks.value = tasksService.read();
      filter();
    };

    filter();
    // watch(selectedTemporality, (newValue, oldValue) => {
    //   console.log("newValue", newValue, "| oldValue", oldValue);
    // });
    watch(selectedTemporality, (newValue) => {
      console.log("newvalue", newValue);
      if (newValue !== "") {
        filter();
      } else {
        tasksFiltered.value = tasks.value;
        filter();
      }
    });
    return {
      tasks,
      letters,
      selectedTemporality,
      tasksFiltered,
      convertTemporalityCase,
      filter,
      isInEditMode,
      deleteTask,
      taskToEdit,
      toggleToEdit,
      updateTask,
      cancelEdit,
    }; // to use fct in templates
  },
};
</script>

<style scoped>
.task {
  margin: 10px 15px;
  padding-bottom: 5px;
  border: 3px solid #42b983;
  border-radius: 5px;
}
.radio-filters {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.small {
  width: 60px;
}
</style>
