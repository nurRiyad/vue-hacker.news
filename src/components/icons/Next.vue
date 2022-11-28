<script setup lang="ts">
interface Props {
  width: number

}
withDefaults(defineProps<Props>(), {
  width: 32,

})
</script>

<template>
  <svg width="32" height="32" viewBox="0 0 24 24"><path fill="#888888" d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z" /></svg>
</template>
