<template>
  <svg class="user-loader" viewBox="0 0 600 60" width="100%" aria-hidden="true" focusable="false">
    <rect class="skeleton-shape" x="10" y="7" rx="3" ry="3" width="410" height="6" />
    <rect class="skeleton-shape" x="11" y="22" rx="3" ry="3" width="380" height="6" />
    <rect class="skeleton-shape" x="10" y="38" rx="3" ry="3" width="178" height="6" />
    <rect class="skeleton-shape" x="7" y="55" rx="3" ry="3" width="380" height="6" />
    <rect class="skeleton-shape" x="3" y="68" rx="3" ry="3" width="388" height="6" />
  </svg>
</template>

<style scoped>
.user-loader {
  display: block;
}

.skeleton-shape {
  fill: #f3f3f3;
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
