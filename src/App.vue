<script>
import my_header from "./components/my_header.vue";
import add_todo from "./components/add_todo.vue";
import show_todo from "./components/show_todo.vue";
import loader from "./components/loading.vue";
import axios from "axios";

export default {
  components: {
    my_header,
    add_todo,
    show_todo,
    loader
  },
  data() {
    return {
      todos: [],
      havaIsNotDone : false,
      havaIsDone : false,
      load : false
    };
  },
  methods: {
    undo() {
      let count = 0;
      for (const item in this.todos) {
        if (this.todos[item].is_done == false) {
          count += 1;
        }
      }
      if(count <= 0){
        this.havaIsNotDone = false;
      }else{
         this.havaIsNotDone = true;
      }
       
      return count;
    },
    done() {
      let count = 0;
      for (const item in this.todos) {
        if (this.todos[item].is_done != false) {
          count += 1;
        }
      }
       if(count <= 0){
        this.havaIsDone = false;
      }else{
         this.havaIsDone = true;
      }
     
      return count;
    },
    getTodo(obj) {
      
      axios
        .post(
          "/todos.json",
          obj
        )
        .then((ans) =>
          this.todos.push({
            ...obj,
            key: ans.data.name,
          })
          
        )
        .catch((erroee) => console.log(erroee));
    },
    remover(key) {
      axios
        .delete(
          `/todos/${key}.json`
        )
        .then((re) => {
          if (re.status == 200) {
            this.todos = this.todos.filter((item) => item.key != key);
          }
        });
    },

    updateTodo(key, content) {
      axios
        .patch(
          `/todos/${key}.json`,
          { content }
        )
        .then((res) => {
          this.todos = this.todos.map((item) => {
            if (item.key == key) {
              return {
                ...item,
                content : content,
              };
            } else {
              return item;
            }
          });
        })
        .catch();
    },
    changeDone(key) {
      axios.patch( `/todos/${key}.json`, { is_done : true})
      .then(res => {
        this.todos = this.todos.map((item) => {
        if (item.key == key) {
          return {
            ...item,
            is_done: true,
          };
        } else {
          return item;
        }
      });
      })
      .catch();
    },
    changeunDone(key) {
      axios.patch( `/todos/${key}.json`, { is_done : false})
      .then(res => {
        this.todos = this.todos.map((item) => {
        if (item.key == key) {
          return {
            ...item,
            is_done: false,
          };
        } else {
          return item;
        }
      });
      })
      .catch();
    },
  },
  created() {
    this.load = true
    axios
      .get(
        "/todos.json"
      )
      .then((res) => {
      this.load = false;
       if (res.data != null) {
          Object.entries(res.data).forEach((item) => {
          this.todos.push({
            key: item[0],
            ...item[1],
          });

        });
       }else{

       }
      })
      .catch();
  },
 
};
</script>

<template>
  <loader v-if="load == true"></loader>
  <my_header v-show="load == false"></my_header>
  <add_todo @add_todo="getTodo" :todo="todos" v-if="load == false"></add_todo>
  <show_todo
    :todo="todos"
    :undo_length="undo()"
    :do_length="done()"
    :ISDONE="havaIsDone"
    :ISUNDONE="havaIsNotDone"
    @key_for_remove="remover"
    @key_for_done="changeDone"
    @key_for_undone="changeunDone"
    @update="updateTodo"  v-if="load == false"></show_todo>
</template>