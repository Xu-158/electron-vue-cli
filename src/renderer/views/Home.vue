<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <button @click="test()">测试发送通知</button>
    {{reply}}
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
export default {
  name: "Home",
  data(){
    return {
      reply:''
    }
  },
  // mounted() {
  //   window.ipcOn("replyHello", (e) => {
  //     console.log("e: ", e);
  //     this.reply = e
  //   });
  // },
  // methods: {
  //   test() {
  //     window.ipcSend("hello", { title: "新通知", data: "推送通知！" });
  //   },
  // },
  // components: {
  //   HelloWorld,
  // },
};
</script>
