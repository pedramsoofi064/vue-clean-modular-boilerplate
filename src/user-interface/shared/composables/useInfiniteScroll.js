// useInfiniteScroll.js
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

/**
 * useInfiniteScroll({ root = null, rootMargin = '0px', threshold = 0.1, disabled = false, onIntersect })
 * - root: scroll container element (or null for viewport)
 * - rootMargin: IntersectionObserver rootMargin
 * - threshold: when to trigger (0 - 1)
 * - disabled: stop observing
 * - onIntersect: callback called when sentinel becomes visible
 *
 * Returns:
 * - sentinelRef: ref to attach to the sentinel element
 * - observing: ref boolean
 * - stop(), start()
 */
export function useInfiniteScroll({ root = null, rootMargin = '0px', threshold = 0.1, disabled = false, onIntersect } = {}) {
  const sentinelRef = ref(null)
  const observing = ref(false)
  let observer = null

  function start() {
    stop()
    if (disabled) return
    if (!('IntersectionObserver' in window)) {
      // If no support, user should fallback to scroll listener version
      return
    }
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // call the callback; you can pass entry if needed
            onIntersect && onIntersect(entry)
          }
        })
      },
      { root: root || null, rootMargin, threshold }
    )

    if (sentinelRef.value) {
      observer.observe(sentinelRef.value)
      observing.value = true
    }
  }

  function stop() {
    if (observer) {
      observer.disconnect()
      observer = null
    }
    observing.value = false
  }

  onMounted(() => {
    if (!disabled) start()
  })

  onBeforeUnmount(() => stop())

  watch(
    () => sentinelRef.value,
    (el) => {
      // if sentinel appears later, (re)start observing
      if (observer && el) observer.observe(el)
    }
  )

  return { sentinelRef, observing, start, stop }
}