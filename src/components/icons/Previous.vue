<script setup lang="ts">
interface Props {
  width: number

}
withDefaults(defineProps<Props>(), {
  width: 32,

})
</script>

<template>
  <svg width="32" height="32" viewBox="0 0 24 24"><path fill="#888888" d="M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z" /></svg>
</template>
