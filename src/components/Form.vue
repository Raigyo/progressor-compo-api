<template>
  <h3>Créer une tâche</h3>
  <!-- "@" = "v-on:" -->
  <form @submit.prevent="createTask">
    <input type="text" placeholder="Nom de la tâche" v-model="name" />
    <br />
    <textarea
      cols="30"
      rows="10"
      placeholder="Description de la tâche"
      v-model="description"
    />
    <br />
    <select v-model="temporality">
      <!-- ":" = "v-bind" -->
      <option
        v-for="tempo in temporalityTypes"
        :value="tempo.value"
        :key="tempo.id"
      >
        {{ tempo.name }}
      </option>
    </select>
    <br />
    <button>Créer</button>
  </form>
</template>

<script>
import { ref } from "vue";
export default {
  name: "Form",
  emits: ["createtask"],
  // we use composition api
  setup(props, context) {
    const name = ref("");
    const description = ref("");
    const temporalityTypes = ref([
      { id: 1, name: "court terme", value: "short-term" },
      { id: 2, name: "moyen terme", value: "medium-term" },
      { id: 3, name: "long terme", value: "long-term" },
    ]);
    const temporality = ref("");
    const createTask = () => {
      const task = {
        id: Date.now(),
        name: name.value,
        desscription: description.value,
        temporality: temporality.value,
      };
      console.log(task);
      // custom events
      context.emit("createtask", task);
      resetForm();
    };

    const resetForm = () => {
      name.value = "";
      description.value = "";
      temporality.value = null;
    };
    return { name, description, temporalityTypes, temporality, createTask };
  },
};
</script>

<style scoped>
input,
textarea,
select,
button {
  width: 90%;
  margin: 5px 10px;
}
</style>
