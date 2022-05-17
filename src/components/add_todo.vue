<template>
  <main class="w-full h-56 bg-cyan-200 flex flex-col justify-center items-center">
      <span class="text-2xl font-bold">Welcome</span>
      <span class="text-slate-400">To get started,add items to your list</span>
      <div class="w-11/12 lg:w-4/12 h-1/6  mt-2 flex justify-around items-center">
          <input v-model="todo_content" type="text" class="w-8/12 h-5/6 outline-none border border-gray-500 box-border px-2 rounded-md" placeholder="i want to do ...">
          <button @click="senTodo()" type="button" class="w-2/12 h-5/6 bg-blue-400 rounded-md text-white">add</button>
      </div>
  </main>
</template>

<script>
export default {
  props:["todo"],
  emits : ["add_todo"],
  data() {
    return {
      todo_content : "",
    }
  },
  methods: {
    senTodo(){
      let obj = {
          is_done : false,
          content : this.todo_content
      };
      this.$emit("add_todo",obj);
      this.todo_content = ""; 
    },
  },
}
</script>