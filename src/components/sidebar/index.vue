<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<template>
    <nav class="sidebar">
      <h1 class="logo">Finance.io</h1>
      <ul class="nav-links">
        <li :class="{active: router.currentRoute.value.name === 'Welcome'}" @click="router.push('/')"><span>🏠</span> Dashboard</li>
        <li :class="{active: router.currentRoute.value.name === 'Accounts'}" @click="router.push('/accounts')"><span>💳</span> Contas</li>
        <li :class="{active: router.currentRoute.value.name === 'Reports'}" @click="router.push('/reports')"><span>📊</span> Relatórios</li>
        <li :class="{active: router.currentRoute.value.name === 'Categories'}" @click="router.push('/categories')"><span>🏷️</span> Categorias</li>
        <li :class="{active: router.currentRoute.value.name === 'Settings'}" @click="router.push('/settings')"><span>⚙️</span> Configurações</li>
      </ul>
    </nav>
</template>

<style scoped>
.logo {
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(to right, #22d3ee, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem;
}

.nav-links {
  list-style: none;
  padding: 0;
}

.nav-links li {
  padding: 12px 0;
  color: #94a3b8;
  cursor: pointer;
  transition: 0.3s;
}

.nav-links li.active, .nav-links li:hover {
  color: #22d3ee;
}
</style>
