import { defineStore } from "pinia";
import actions from "./actions.store.js";
import state from "./state.store.js";
import getters from "./getters.store.js";

export const useAboutUsStore = defineStore("about-us", {
  actions,
  state,
  getters,
});

