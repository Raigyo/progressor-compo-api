<template>
  <h3>Créer une tâche</h3>
  <!-- "@" = "v-on:" -->
  <form @submit.prevent="createTask">
    <input
      type="text"
      placeholder="Nom de la tâche"
      v-model="name"
      ref="txtName"
    />
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
import { ref, onMounted } from "vue";
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
    let txtName = ref(null);
    const createTask = () => {
      const task = {
        id: Date.now(),
        name: name.value,
        description: description.value,
        temporality: temporality.value,
      };
      // console.log(task);
      // custom events
      context.emit("createtask", task);
      resetForm();
    };

    const resetForm = () => {
      name.value = "";
      description.value = "";
      temporality.value = null;
      txtName.value.focus();
    };
    onMounted(() => {
      // console.log("onMounted / txtName", txtName.value);
      txtName.value.focus();
    });
    return {
      name,
      description,
      temporalityTypes,
      temporality,
      createTask,
      txtName,
    };
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
