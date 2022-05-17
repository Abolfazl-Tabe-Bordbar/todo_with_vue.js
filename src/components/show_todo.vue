<template>
  <section class="w-full h-auto flex justify-center items-center mt-5">
    <div class="w-11/12 lg:w-5/12 h-auto flex flex-col justify-start items-center">
      <div class=" w-full h-10 border-b border-slate-300 flex justify-start items-end relative">
        <button type="button" class="select-none w-3/12 h-5/6 flex justify-center items-center absolute -bottom-[1px]" :class="{'border': !what,'border-slate-300': !what,'rounded-t-sm': !what,'border-b-white': !what}" @click="what = !what">
          <span class="font-bold">undone</span>
          <span class=" text-white bg-slate-400 w-5 h-5 leading-5 rounded-sm text-sm ml-1">{{ undo_length }}</span>
        </button>
        <button type="button" class="select-none w-3/12 h-5/6 flex justify-center items-center absolute -bottom-[1px] left-[120px]" :class="{'border': what,'border-slate-300': what,'rounded-t-sm': what,'border-b-white' :what }" @click="what = !what">
          <span class="font-bold">done</span>
          <span class="text-white bg-green-500 w-5 h-5 leading-5 rounded-sm text-sm ml-1" >{{ do_length }}</span>
        </button>
      </div>
      <div class="w-full h-auto flex flex-col justify-start items-center">
        <div v-show="item.is_done == what" v-for="(item, index) in todo" :key="index" class="
            w-full
            h-12
            border border-slate-300
            rounded-sm
            flex
            justify-between
            items-center
            box-border
            px-5
            mt-2
          ">
          <span>{{ item.content }}</span>
          <div class="w-4/12 h-5/6 flex justify-between items-center">
            <button type="button" class="w-4/12 h-5/6 text-white rounded-md bg-green-500 text-sm" @click="done(item.key)" v-if="item.is_done == false"> done </button>
            <button type="button" class="w-4/12 h-5/6 text-white rounded-md bg-green-500 text-sm" @click="undone(item.key)" v-if="item.is_done == true"> undone </button>
            <button type="button" class="w-4/12 h-5/6 text-white rounded-md bg-blue-500 text-sm" @click="update(item.key)"> edit </button>
            <button type="button" class="w-3/12 h-5/6 text-white rounded-md bg-red-500 text-sm" @click="remove(item.key)"> delete </button>
          </div>
        </div>
        <div v-if="ISUNDONE == false && what == false"  class=" w-full h-52  flex flex-col justify-center items-center">
          <span class="font-bold">You Have Not Work To Done</span>
          <img src="./../assets/box.svg" class="w-8/12 h-4/6" alt="">
        </div>
        <div v-if="ISDONE == false && what == true"  class=" w-full h-52 flex flex-col justify-center items-center">
          <span class="font-bold">You Have Not Work Done</span>
           <img src="./../assets/box.svg" class="w-8/12 h-4/6" alt="">
        </div>
        

      </div>

    

    </div>
  </section>
</template>
<script>
  export default {
    props: {
      todo: {},
      undo_length: {},
      do_length: {},
      ISDONE: {},
      ISUNDONE: {}
    },
    emits: ["key_for_remove", "update", "key_for_done", "key_for_undone"],
    data() {
      return {
        what: false,
      };
    },
    methods: {
      remove(key) {
        this.$emit("key_for_remove", key);
      },
      done(key) {
        this.$emit("key_for_done", key);
      },
      undone(key) {
        this.$emit("key_for_undone", key);
      },
      update(key) {
        let content = prompt("Enter new content : ");
        this.$emit("update", key, content);
      },
    },
  };
</script>