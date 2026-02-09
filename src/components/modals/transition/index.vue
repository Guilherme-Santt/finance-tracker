<script setup>
import { ref } from 'vue';

const emit = defineEmits(['close', 'save']);

const transaction = ref({
  description: '',
  amount: null,
  category: 'Alimentação',
  type: 'expense',
  date: new Date().toISOString().substr(0, 10)
});

const categories = [
  { name: 'Moradia', icon: '🏠', date: new Date().toISOString().substr(0, 10), time: new Date().toISOString().substr(11, 5) },
  { name: 'Alimentação', icon: '🍴', date: new Date().toISOString().substr(0, 10), time: new Date().toISOString().substr(11, 5) },
  { name: 'Transporte', icon: '🚗', date: new Date().toISOString().substr(0, 10), time: new Date().toISOString().substr(11, 5) },
  { name: 'Lazer', icon: '🎮', date: new Date().toISOString().substr(0, 10), time: new Date().toISOString().substr(11, 5) },
  { name: 'Saúde', icon: '💊', date: new Date().toISOString().substr(0, 10), time: new Date().toISOString().substr(11, 5) },
  { name: 'Trabalho', icon: '💰', date: new Date().toISOString().substr(0, 10), time: new Date().toISOString().substr(11, 5) }
];

const submitForm = () => {
  emit('save', { ...transaction.value });
  emit('close');
};
</script>

<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <header>
        <h2>Nova Transação</h2>
        <button class="btn-close-x" @click="$emit('close')">&times;</button>
      </header>
      
      <form @submit.prevent="submitForm" class="transaction-form">
        <div class="type-selector">
          <button 
            type="button" 
            :class="{ active: transaction.type === 'income' }"
            @click="transaction.type = 'income'"
            class="btn-type income"
          >Receita</button>
          <button 
            type="button" 
            :class="{ active: transaction.type === 'expense' }"
            @click="transaction.type = 'expense'"
            class="btn-type expense"
          >Despesa</button>
        </div>

        <div class="input-group">
          <label>Valor</label>
          <div class="amount-input-wrapper">
            <span class="currency-prefix">R$</span>
            <input type="number" step="0.01" v-model="transaction.amount" placeholder="0,00" required>
          </div>
        </div>

        <div class="input-group">
          <label>Descrição</label>
          <input type="text" v-model="transaction.description" placeholder="Ex: Mercado mensal" required>
        </div>

        <div class="input-group">
          <label>Categoria</label>
          <select v-model="transaction.category">
            <option v-for="cat in categories" :key="cat.name" :value="cat.name">
              {{ cat.icon }} {{ cat.name }}
            </option>
          </select>
        </div>

        <div class="input-group">
          <label>Data</label>
          <input type="date" v-model="transaction.date" required>

          <label>Hora</label>
          <input type="time" v-model="transaction.time" required>
        </div>

        <button type="submit" class="btn-submit">Confirmar Transação</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(2px);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #1e293b;
  padding: 2rem;
  border-radius: 28px;
  border: 1px solid #334155;
  width: 95%;
  max-width: 420px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

header {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 2rem;
}

h2 { font-size: 1.25rem; color: #f8fafc; margin: 0; }

.btn-close-x {
  background: none; border: none; color: #94a3b8;
  font-size: 1.5rem; cursor: pointer;
}

/* Form Styles */
.transaction-form { display: flex; flex-direction: column; gap: 1.5rem; }

.type-selector {
  display: flex; background: #0f172a; padding: 4px; border-radius: 12px;
}

.btn-type {
  flex: 1; border: none; background: transparent; color: #94a3b8;
  padding: 10px; border-radius: 10px; cursor: pointer; transition: 0.3s;
  font-weight: 600;
}

.btn-type.active.income { background: rgba(34, 211, 238, 0.1); color: #22d3ee; }
.btn-type.active.expense { background: rgba(251, 146, 60, 0.1); color: #fb923c; }

.input-group { display: flex; flex-direction: column; gap: 0.5rem; }
.input-group label { font-size: 0.85rem; color: #94a3b8; font-weight: 500; }

input, select {
  background: #0f172a; border: 1px solid #334155; color: white;
  padding: 12px; border-radius: 12px; outline: none; transition: 0.3s;
}

input:focus, select:focus { border-color: #22d3ee; }

.amount-input-wrapper { position: relative; display: flex; align-items: center; }
.currency-prefix { position: absolute; left: 12px; color: #64748b; font-weight: bold; }
.amount-input-wrapper input { padding-left: 40px; width: 100%; font-size: 1.2rem; }

.btn-submit {
  margin-top: 1rem; padding: 14px; border-radius: 14px; border: none;
  background: linear-gradient(to right, #22d3ee, #8b5cf6);
  color: white; font-weight: bold; cursor: pointer; transition: 0.3s;
}

.btn-submit:hover { opacity: 0.9; transform: translateY(-1px); }
</style>