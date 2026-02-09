<script setup>
import { ref } from 'vue';

// Dados fictícios para os KPIs
const kpis = ref([
  { label: 'Receita Total', value: 6200, color: '#22d3ee', trend: '+12%' },
  { label: 'Despesa Total', value: 3100, color: '#fb923c', trend: '-5%' },
  { label: 'Economia Líquida', value: 3100, color: '#4ade80', trend: '+18%' },
]);

// Dados para a lista de categorias
const categories = ref([
  { name: 'Moradia', value: 2100, percent: 68, color: '#8b5cf6' },
  { name: 'Alimentação', value: 650, percent: 21, color: '#f59e0b' },
  { name: 'Transporte', value: 200, percent: 6, color: '#22d3ee' },
  { name: 'Outros', value: 150, percent: 5, color: '#94a3b8' },
]);

const formatCurrency = (val) => {
  return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};
</script>

<template>
  <div class="reports-container">
    <header class="reports-header">
      <h1>Relatórios Analíticos</h1>
      <div class="date-picker">
        <span>Fevereiro, 2026</span>
        <button class="btn-icon">📅</button>
      </div>
    </header>

    <div class="kpi-grid">
      <div v-for="kpi in kpis" :key="kpi.label" class="kpi-card">
        <p class="kpi-label">{{ kpi.label }}</p>
        <h3 :style="{ color: kpi.color }">{{ formatCurrency(kpi.value) }}</h3>
        <span class="trend">{{ kpi.trend }} em relação ao mês anterior</span>
      </div>
    </div>

    <div class="main-reports-grid">
      <section class="report-section chart-area">
        <div class="section-header">
          <h3>Fluxo de Caixa</h3>
          <div class="legend">
            <span class="dot income"></span> Receita
            <span class="dot expense"></span> Despesa
          </div>
        </div>
        <div class="chart-mockup">
          <div class="visual-placeholder">
             Gráfico de Evolução Mensal
             <div class="mock-line"></div>
          </div>
        </div>
      </section>

      <section class="report-section categories-area">
        <h3>Gastos por Categoria</h3>
        <div class="category-list">
          <div v-for="cat in categories" :key="cat.name" class="cat-item">
            <div class="cat-info">
              <span>{{ cat.name }}</span>
              <span>{{ formatCurrency(cat.value) }}</span>
            </div>
            <div class="cat-progress-bg">
              <div 
                class="cat-progress-fill" 
                :style="{ width: cat.percent + '%', backgroundColor: cat.color }"
              ></div>
            </div>
            <span class="cat-percent">{{ cat.percent }}% do total de gastos</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.reports-container { padding: 20px; color: #f8fafc; }

.reports-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.date-picker {
  background: #1e293b;
  padding: 8px 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #334155;
}

/* KPI Cards */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.kpi-card {
  background: #1e293b;
  padding: 20px;
  border-radius: 24px;
  border: 1px solid #334155;
}

.kpi-label { color: #94a3b8; font-size: 0.9rem; margin-bottom: 10px; }
.kpi-card h3 { font-size: 1.8rem; margin-bottom: 5px; }
.trend { font-size: 0.75rem; color: #64748b; }

/* Main Grid Layout */
.main-reports-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 20px;
}

.report-section {
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid #1e293b;
  padding: 25px;
  border-radius: 24px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.legend { font-size: 0.8rem; color: #94a3b8; }
.dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 5px; }
.dot.income { background: #22d3ee; }
.dot.expense { background: #fb923c; }

/* Category List Styles */
.cat-item { margin-bottom: 20px; }
.cat-info { display: flex; justify-content: space-between; font-weight: 600; margin-bottom: 8px; }
.cat-progress-bg { background: #0f172a; height: 6px; border-radius: 10px; overflow: hidden; }
.cat-progress-fill { height: 100%; border-radius: 10px; }
.cat-percent { font-size: 0.7rem; color: #64748b; margin-top: 4px; display: block; }

/* Chart Mockup Space */
.chart-mockup {
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #334155;
  border-radius: 16px;
  color: #475569;
}
</style>