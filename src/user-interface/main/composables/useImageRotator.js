import { ref, computed, onBeforeUnmount, unref, isRef } from "vue";

/**
 * Usage: put this in setup()
 * - `imagesSource` is your computed/ref/array of images
 * - `intervalsMs` optional [msSlot0, msSlot1, msSlot2]
 */
export const useImageRotator = (
  imagesSource,
  intervalsMs = [10000, 15000, 20000]
) => {
  const imagesRef = isRef(imagesSource)
    ? imagesSource
    : ref(imagesSource || []);
  // current shown indices (start with first 3)
  const current = ref([0, 1, 2]);
  // pointer to the next candidate index in the images array
  const nextPointer = ref(3);
  // sequential scheduler state
  const currentSlot = ref(0);
  const scheduler = ref(null);

  const shownImages = computed(() => {
    const imgs = unref(imagesRef) || [];
    return current.value.map((idx) =>
      idx != null && imgs[idx] !== undefined ? imgs[idx] : null
    );
  });

  function findNextIndex() {
    const imgs = unref(imagesRef) || [];
    const n = imgs.length;
    if (n === 0) return null;

    // start scanning from nextPointer, wrap around
    for (let i = 0; i < n; i++) {
      const cand = (nextPointer.value + i) % n;
      // skip if currently shown
      if (!current.value.includes(cand)) {
        // advance pointer to the slot after chosen one for next time
        nextPointer.value = (cand + 1) % n;
        return cand;
      }
    }
    // if all indices are currently shown (i.e., n <= 3), return null
    return null;
  }

  function replaceSlot(slotIdx) {
    const imgs = unref(imagesRef) || [];
    if (imgs.length <= 3) return; // nothing to rotate
    const next = findNextIndex();
    if (next != null) current.value[slotIdx] = next;
  }

  function scheduleNextTick() {
    const imgs = unref(imagesRef) || [];
    if (imgs.length <= 3) return; // no rotation needed

    const ints = [
      intervalsMs[0] ?? intervalsMs[intervalsMs.length - 1],
      intervalsMs[1] ?? intervalsMs[intervalsMs.length - 1],
      intervalsMs[2] ?? intervalsMs[intervalsMs.length - 1],
    ];

    const slot = currentSlot.value % 3;
    scheduler.value = setTimeout(() => {
      replaceSlot(slot);
      currentSlot.value = (slot + 1) % 3; // after last (2), go back to 0
      scheduleNextTick();
    }, ints[slot]);
  }

  function start() {
    stop(); // ensure no duplicate timers
    scheduleNextTick();
  }

  function stop() {
    if (scheduler.value) {
      clearTimeout(scheduler.value);
      scheduler.value = null;
    }
  }

  // keep current indices sane if the images array changes length or content
  function normalizeOnImagesChange() {
    const imgs = unref(imagesRef) || [];
    const n = imgs.length;
    if (n === 0) {
      current.value = [null, null, null];
      return;
    }
    if (n <= 3) {
      // just cycle through available ones
      current.value = Array.from({ length: 3 }, (_, i) => i % n);
      nextPointer.value = n; // pointer set beyond end so next findNextIndex will wrap correctly
      return;
    }
    // ensure indices are valid (< n)
    current.value = current.value.map((idx, i) =>
      idx == null || idx >= n ? i : idx
    );
    // ensure nextPointer points to something not currently shown
    while (current.value.includes(nextPointer.value)) {
      nextPointer.value = (nextPointer.value + 1) % n;
    }
    // keep currentSlot within [0..2]
    currentSlot.value = currentSlot.value % 3;
  }

  // watcher usage: if your `imagesSource` is a ref/computed, you should call
  // normalizeOnImagesChange() whenever it changes. If you're inside setup you can:
  // watch(imagesRef, normalizeOnImagesChange, { immediate: true })
  // But to keep this tiny, caller can either call normalizeOnImagesChange() after changing images
  // or add a watch in their component.

  onBeforeUnmount(stop);

  return {
    shownImages,
    start,
    stop,
    replaceSlot,
    normalizeOnImagesChange,
    _current: current,
  };
};
