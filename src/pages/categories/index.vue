<script setup>
import { ref } from 'vue';
import modalCategories from '@/components/modals/categories/index.vue';

const categories = ref([
  { id: 1, name: 'Moradia', icon: '🏠', color: '#8b5cf6', type: 'expense', count: 12 },
  { id: 2, name: 'Alimentação', icon: '🍴', color: '#fb923c', type: 'expense', count: 45 },
  { id: 3, name: 'Transporte', icon: '🚗', color: '#22d3ee', type: 'expense', count: 8 },
  { id: 4, name: 'Lazer', icon: '🎮', color: '#f59e0b', type: 'expense', count: 15 },
  { id: 5, name: 'Trabalho', icon: '💰', color: '#4ade80', type: 'income', count: 2 },
]);

const removeCategory = (id) => {
  if(confirm("Deseja excluir esta categoria? Os gastos vinculados ficarão 'Sem Categoria'.")) {
    categories.value = categories.value.filter(c => c.id !== id);
  }
};

const isModal = ref(false);
const dataCategory = ref({})
</script>

<template>
  <div class="category-page">
    <header class="header">
      <div>
        <h1>Categorias</h1>
        <p>Personalize os nomes, ícones e cores das suas movimentações</p>
      </div>
      <button @click="isModal = true" class="btn-primary">+ Nova Categoria</button>
    </header>

    <div class="category-grid">
      <div v-for="cat in categories" :key="cat.id" class="cat-card">
        <div class="cat-visual">
          <div class="icon-circle" :style="{ backgroundColor: cat.color + '20', color: cat.color }">
            {{ cat.icon }}
          </div>
          <div class="color-picker-hint" :style="{ background: cat.color }"></div>
        </div>

        <div class="cat-details">
          <div class="cat-info">
            <h3>{{ cat.name }}</h3>
            <span class="type-tag" :class="cat.type">{{ cat.type === 'income' ? 'Renda' : 'Gasto' }}</span>
          </div>
          <p class="usage-count">{{ cat.count }} transações vinculadas</p>
        </div>

        <div class="cat-actions">
          <button @click="dataCategory = cat, isModal = true" class="btn-icon" title="Editar">✎</button>
          <button @click="removeCategory(cat.id)" class="btn-icon delete" title="Excluir">🗑</button>
        </div>
      </div>

      <div class="cat-card add-placeholder">
        <span>➕</span>
        <p>Adicionar Nova</p>
      </div>
    </div>
  </div>
  <modal-categories 
    :initial-data="dataCategory"
    v-if="isModal"
    @close="isModal = false"
    @save="saveCategory"
  ></modal-categories>
</template>

<style scoped>
.category-page { padding: 20px; color: #f8fafc; }

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header h1 { font-size: 1.8rem; margin: 0; }
.header p { color: #94a3b8; margin-top: 5px; }

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

/* Card Style */
.cat-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  position: relative;
  transition: 0.3s ease;
}

.cat-card:hover {
  border-color: #475569;
  transform: translateY(-2px);
}

.cat-visual {
  position: relative;
}

.icon-circle {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.color-picker-hint {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid #1e293b;
}

.cat-details { flex: 1; }

.cat-info { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
.cat-info h3 { margin: 0; font-size: 1.1rem; }

.type-tag {
  font-size: 0.65rem;
  padding: 2px 8px;
  border-radius: 6px;
  text-transform: uppercase;
  font-weight: 700;
}
.type-tag.income { background: rgba(74, 222, 128, 0.1); color: #4ade80; }
.type-tag.expense { background: rgba(251, 146, 60, 0.1); color: #fb923c; }

.usage-count { font-size: 0.8rem; color: #64748b; margin: 0; }

/* Actions */
.cat-actions { display: flex; gap: 5px; }
.btn-icon {
  background: transparent;
  border: none;
  color: #475569;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: 0.2s;
}
.btn-icon:hover { background: #334155; color: #f8fafc; }
.btn-icon.delete:hover { color: #ef4444; }

/* Add Placeholder Card */
.add-placeholder {
  border: 2px dashed #334155;
  background: transparent;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  opacity: 0.6;
}
.add-placeholder:hover {
  opacity: 1;
  border-color: #94a3b8;
}
.add-placeholder span { font-size: 1.5rem; margin-bottom: 5px; }

.btn-primary {
  background: linear-gradient(to right, #22d3ee, #8b5cf6);
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
}
</style>