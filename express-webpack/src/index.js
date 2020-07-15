import "bootstrap/dist/css/bootstrap-reboot.min.css";
import "./style.css";

import Vue from "vue";
import App from "./App.vue";

const root = document.createElement("div");
root.id = "app";
document.body.appendChild(root);

const vue = new Vue({
  render: (h) => h(App),
  components: {
    App,
  },
}).$mount("#app");

console.log(vue);
