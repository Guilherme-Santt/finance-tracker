<script setup>
</script>

<template>
    <aside class="right-panel">
      <div class="category-card">
        <h3>Spending by Category</h3>
        <div class="donut-chart">
          <div class="donut-inner">$2,400</div>
        </div>
      </div>
      <button class="btn-add">+ ADD EXPENSE</button>
    </aside>
</template>

<style scoped>
/* Right Panel */
.category-card {
  background: #1e293b;
  padding: 1.5rem;
  border-radius: 24px;
  text-align: center;
}

.donut-chart {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: conic-gradient(#22d3ee 0% 40%, #8b5cf6 40% 80%, #fb923c 80% 100%);
  margin: 20px auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.donut-inner {
  width: 110px;
  height: 110px;
  background: #1e293b;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.btn-add {
  width: 100%;
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 16px;
  border: none;
  background: linear-gradient(to right, #22d3ee, #8b5cf6);
  color: white;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(139, 92, 246, 0.2);
}
</style>