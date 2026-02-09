<script setup>
import { computed, ref } from 'vue';
// Imagine que o modal está em seu arquivo de componentes
import transitionModal from '@/components/modals/transition/index.vue'; 

const accounts = ref([
  { id: 1, name: 'Salário CLT', value: 5000, type: 'income', category: 'Trabalho', icon: '💰', limit: 0, day: 5 },
  { id: 2, name: 'Freelance UX', value: 1200, type: 'income', category: 'Extra', icon: '🎨', limit: 0, day: 15 },
  { id: 3, name: 'Aluguel/Condomínio', value: 2100, type: 'expense', category: 'Moradia', icon: '🏠', limit: 2100, day: 10 },
  { id: 4, name: 'Supermercado/VR', value: 850, type: 'expense', category: 'Alimentação', icon: '🛒', limit: 1000, day: 20 },
]);

const isModalOpen = ref(false);
const editingAccount = ref(null);

const incomes = computed(() => accounts.value.filter(a => a.type === 'income'));
const expenses = computed(() => accounts.value.filter(a => a.type === 'expense'));

// Abre modal para criar novo
const openCreateModal = () => {
  editingAccount.value = null;
  isModalOpen.value = true;
};

// Abre modal para editar existente
const openEditModal = (account) => {
  editingAccount.value = { ...account };
  isModalOpen.value = true;
};

const formatCurrency = (val) => {
  return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};
</script>

<template>
  <div class="accounts-container">
    
    <header class="section-header">
      <h1>Gestão de Contas</h1>
      <button class="btn-add-main" @click="openCreateModal">+ Nova Conta ou Renda</button>
    </header>

    <section class="account-group">
      <h2 class="group-title income-text">Fontes de Renda</h2>
      <div class="grid-layout">
        <div v-for="item in incomes" :key="item.id" class="glass-card income-border">
          <div class="card-header">
            <div class="header-left">
              <span class="icon">{{ item.icon }}</span>
              <span class="category-tag">{{ item.category }}</span>
            </div>
            <div class="header-right">
              <span class="day-badge income-bg">Dia {{ item.day }}</span>
              <button class="btn-edit-small" @click="openEditModal(item)">✎</button>
            </div>
          </div>
          <div class="card-body">
            <h3>{{ item.name }}</h3>
            <p class="value income-text">{{ formatCurrency(item.value) }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="account-group mt-10">
      <h2 class="group-title expense-text">Gastos e Limites (Budget)</h2>
      <div class="grid-layout">
        <div v-for="item in expenses" :key="item.id" class="glass-card expense-border">
          <div class="card-header">
            <div class="header-left">
              <span class="icon">{{ item.icon }}</span>
              <span class="category-tag">{{ item.category }}</span>
            </div>
            <div class="header-right">
              <span class="day-badge expense-bg">Dia {{ item.day }}</span>
              <button class="btn-edit-small" @click="openEditModal(item)">✎</button>
            </div>
          </div>
          <div class="card-body">
            <div class="title-row">
              <h3>{{ item.name }}</h3>
              <span class="percentage" :class="{ 'warning': (item.value / item.limit) > 0.8 }">
                {{ Math.round((item.value / item.limit) * 100) }}%
              </span>
            </div>
            <p class="value">{{ formatCurrency(item.value) }} <span class="limit">/ {{ formatCurrency(item.limit) }}</span></p>
            
            <div class="progress-container">
              <div 
                class="progress-bar" 
                :style="{ width: (item.value / item.limit) * 100 + '%' }"
                :class=" (item.value / item.limit) > 0.8 ? 'bg-warning' : 'bg-expense'"
              ></div>
            </div>
          </div>
        </div>

        <div class="glass-card add-card-dash" @click="openCreateModal">
          <span class="add-icon">+</span>
          <p>Adicionar Novo</p>
        </div>
      </div>
    </section>

    <transition name="pop">
        <transitionModal 
            v-if="isModalOpen" 
            :initialData="editingAccount"
            @close="isModalOpen = false" 
        />
    </transition>
  </div>
</template>

<style scoped>
.accounts-container { padding: 20px; }
.mt-10 { margin-top: 40px; }

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.btn-add-main {
  background: linear-gradient(to right, #22d3ee, #8b5cf6);
  border: none; color: white; padding: 12px 24px;
  border-radius: 14px; font-weight: bold; cursor: pointer;
  transition: 0.3s;
}

.group-title {
  font-size: 1.1rem; font-weight: 700; margin-bottom: 20px;
  text-transform: uppercase; letter-spacing: 1px;
}

.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.glass-card {
  background: rgba(30, 41, 59, 0.7);
  border-radius: 24px; padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative; transition: all 0.3s ease;
}

/* Estilo do Botão Editar */
.header-right { display: flex; align-items: center; gap: 10px; }
.btn-edit-small {
  background: rgba(255, 255, 255, 0.05);
  border: none; color: #94a3b8; width: 32px; height: 32px;
  border-radius: 10px; cursor: pointer; transition: 0.2s;
}
.btn-edit-small:hover { background: #334155; color: #22d3ee; }

/* Card de Adição na Grade */
.add-card-dash {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; border: 2px dashed #334155;
  background: transparent; cursor: pointer; opacity: 0.6;
}
.add-card-dash:hover { opacity: 1; border-color: #22d3ee; }
.add-icon { font-size: 2rem; color: #22d3ee; margin-bottom: 10px; }

/* Reutilizando as cores e progresso anteriores */
.income-border:hover { border-color: #22d3ee; transform: translateY(-4px); }
.expense-border:hover { border-color: #fb923c; transform: translateY(-4px); }
.income-text { color: #22d3ee; }
.expense-text { color: #fb923c; }
.value { font-size: 1.5rem; font-weight: 800; margin: 8px 0; }
.progress-container { background: #0f172a; height: 8px; border-radius: 10px; margin-top: 15px; overflow: hidden; }
.progress-bar { height: 100%; transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
.bg-expense { background: linear-gradient(to right, #fb923c, #f97316); }
.bg-warning { background: #ef4444; box-shadow: 0 0 10px rgba(239, 68, 68, 0.5); }

/* Animação do Modal */
.pop-enter-active, .pop-leave-active { transition: all 0.3s ease; }
.pop-enter-from, .pop-leave-to { opacity: 0; transform: scale(0.9); }
</style>