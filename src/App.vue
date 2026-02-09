<script setup>
import Sidebar from '@/components/sidebar/index.vue'
import Panel from '@/components/panel/index.vue'
</script>

<template>
  <div class="dashboard-container">
    <sidebar />
    <RouterView />
    <Panel />
  </div>
</template>

<style scoped>
.dashboard-container {
  display: grid;
  grid-template-columns: 200px 1fr 300px;
  gap: 2rem;
  background-color: #0f172a;
  min-height: 100vh;
  padding: 2rem;
}
</style>