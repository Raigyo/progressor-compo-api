<template>
  <div class="home">
    <HelloWorld msg="Progressor (compo API)" />
    <Form @createtask="addTask" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Form from "@/components/Form.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    Form,
  },
  setup() {
    const addTask = (payload) => {
      console.log("Home.vue | addTask()", payload);
    };
    return { addTask };
  },
};
</script>
