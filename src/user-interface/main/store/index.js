import { defineStore } from "pinia";
import actions from "./actions.store.js";
import state from "./state.store.js";
import getters from "./getters.store.js";

export const useMainStore = defineStore("main", {
  actions,
  state,
  getters,
});
