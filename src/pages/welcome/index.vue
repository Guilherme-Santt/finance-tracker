<script setup>
import { ref } from 'vue';
import Sidebar from '@/components/sidebar/index.vue'  
import Panel from '@/components/panel/index.vue'
import Dashboard from '@/components/dashboard/index.vue'

const balance = ref(12450.75);
const transactions = ref([
  { id: 1, name: 'Dinner at Bistro', date: 'Feb 9', amount: 150.00, type: 'expense', icon: '🍴' },
  { id: 2, name: 'Salary Deposit', date: 'Feb 5', amount: 4200.00, type: 'income', icon: '💰' },
  { id: 3, name: 'Movie Night', date: 'Feb 2', amount: 45.50, type: 'expense', icon: '🎬' },
]);

</script>

<template>
    <Dashboard 
    :balance="balance"
    :transactions="transactions"
    /> 
</template>

<style scoped>
/* Variáveis de Cor */
:component {
  --bg-dark: #0f172a;
  --card-bg: #1e293b;
  --neon-cyan: #22d3ee;
  --neon-purple: #8b5cf6;
  --text-main: #f8fafc;
  --text-dim: #94a3b8;
  --income: #4ade80;
  --expense: #fb923c;
}

</style>