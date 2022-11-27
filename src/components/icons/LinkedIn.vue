<script setup lang="ts">
interface Props {
  width: number

}
withDefaults(defineProps<Props>(), {
  width: 32,

})
</script>

<template>
  <svg :width="width" height="32" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M20.452 20.45h-3.56v-5.57c0-1.328-.022-3.036-1.85-3.036c-1.851 0-2.134 1.447-2.134 2.942v5.664H9.352V8.997h3.413v1.566h.049c.475-.9 1.636-1.85 3.367-1.85c3.605 0 4.27 2.371 4.27 5.456v6.281ZM5.339 7.433a2.063 2.063 0 1 1 0-4.13a2.065 2.065 0 0 1 0 4.13ZM7.12 20.45H3.558V8.997H7.12V20.45ZM23 0H1a1 1 0 0 0-1 1v22a1 1 0 0 0 1 1h22a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1Z" /></svg>
</template>
