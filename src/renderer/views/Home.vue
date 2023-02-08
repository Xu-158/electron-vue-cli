<template>
  <div class="home">
    <button @click="test()">测试发送通知</button>
    {{ reply }}
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      reply: "",
    };
  },
  mounted() {
    this.$ipcRenderer.on("replyHello", (e) => {
      console.log("e: ", e);
      this.reply = e;
    });
  },
  methods: {
    test() {
      this.$ipcRenderer.send("hello", { title: "新通知", data: "推送通知！" });
    },
  },
};
</script>
