<template>
  <svg class="news-loader" viewBox="0 0 476 40" width="100%" aria-hidden="true" focusable="false">
    <rect class="skeleton-shape" x="8" y="6" width="26" height="28" rx="4" />
    <rect class="skeleton-shape" x="46" y="9" width="300" height="6" rx="2" />
    <rect class="skeleton-shape" x="46" y="22" width="60" height="5" rx="2" />
    <rect class="skeleton-shape" x="114" y="22" width="90" height="5" rx="2" />
  </svg>
</template>

<style scoped>
.news-loader {
  display: block;
}

.skeleton-shape {
  fill: #21262d;
  animation: skeleton-pulse 1.4s ease-in-out infinite;
}

@keyframes skeleton-pulse {
  50% {
    opacity: 0.5;
  }
}

@media (prefers-reduced-motion: reduce) {
  .skeleton-shape {
    animation: none;
  }
}
</style>
