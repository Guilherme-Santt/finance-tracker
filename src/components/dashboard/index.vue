<script setup>
// Definimos as props para que o componente pai possa enviar os dados
defineProps({
  balance: {
    type: Number,
    required: true,
    default: 0
  },
  transactions: {
    type: Array,
    required: true,
    default: () => []
  }
});
</script>

<template>
  <main class="content">
    <header class="hero">
      <p class="label">Total Balance</p>
      <h2 class="balance-amount">${{ balance.toLocaleString() }}</h2>
      <div class="time-filters">
        <button class="btn-filter">TODAY</button>
        <button class="btn-filter active">MONTH</button>
      </div>
    </header>

    <section class="chart-mock">
      <div class="bar" style="height: 40%"></div>
      <div class="bar" style="height: 70%"></div>
      <div class="bar" style="height: 50%"></div>
      <div class="bar" style="height: 90%"></div>
      <div class="bar" style="height: 60%"></div>
    </section>

    <section class="transactions">
      <h3>Recent Transactions</h3>
      <div v-for="item in transactions" :key="item.id" class="transaction-card">
        <div class="info">
          <div class="icon-box">{{ item.icon }}</div>
          <div>
            <p class="name">{{ item.name }}</p>
            <p class="date">{{ item.date }}</p>
          </div>
        </div>
        <p :class="['amount', item.type]">
          {{ item.type === 'income' ? '+' : '-' }} ${{ item.amount.toFixed(2) }}
        </p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.hero { text-align: center; margin-bottom: 3rem; }
.label { color: #94a3b8; text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem; }
.balance-amount { font-size: 3.5rem; color: #22d3ee; text-shadow: 0 0 20px rgba(34, 211, 238, 0.3); margin: 0.5rem 0; }
.btn-filter { background: #1e293b; border: 1px solid #334155; color: white; padding: 8px 16px; border-radius: 20px; margin: 0 5px; cursor: pointer; }
.btn-filter.active { border-color: #22d3ee; color: #22d3ee; }
.chart-mock { background: rgba(30, 41, 59, 0.5); border: 1px solid #334155; height: 200px; border-radius: 20px; display: flex; align-items: flex-end; padding: 20px; gap: 15px; margin-bottom: 2rem; }
.bar { flex: 1; background: linear-gradient(to top, #22d3ee, #8b5cf6); opacity: 0.6; border-radius: 4px 4px 0 0; }
.transaction-card { display: flex; justify-content: space-between; align-items: center; background: rgba(30, 41, 59, 0.4); padding: 1rem; border-radius: 16px; margin-bottom: 1rem; border: 1px solid #1e293b; }
.info { display: flex; align-items: center; gap: 1rem; }
.icon-box { background: #334155; padding: 10px; border-radius: 12px; font-size: 1.2rem; }
.name { font-weight: 600; margin: 0; }
.date { font-size: 0.8rem; color: #94a3b8; margin: 0; }
.amount.income { color: #4ade80; }
.amount.expense { color: #fb923c; }
</style>