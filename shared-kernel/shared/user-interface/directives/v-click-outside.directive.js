export const vClickOutside = {
  beforeMount(el, binding) {
    el.handelClickEvent = function (event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.addEventListener("click", el.handelClickEvent);
  },
  unmounted(el) {
    document.removeEventListener("click", el.handelClickEvent);
  },
};
