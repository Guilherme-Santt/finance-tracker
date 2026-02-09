<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  initialData: Object // Se vier preenchido, é modo edição
});

const emit = defineEmits(['close', 'save']);

const category = ref({
  name: '',
  icon: '📁',
  color: '#22d3ee',
  type: 'expense'
});

// Cores sugeridas para o sistema
const colorPalette = [
  '#22d3ee', '#8b5cf6', '#fb923c', '#4ade80', 
  '#f43f5e', '#eab308', '#ec4899', '#64748b'
];

// Emojis sugeridos
const commonIcons = ['💰', '🏠', '🛒', '🚗', '🎮', '🍔', '💊', '🎓', '✈️', '👔', '🏋️', '🔌'];

onMounted(() => {
  if (props.initialData) {
    category.value = { ...props.initialData };
  }
});

const submit = () => {
  emit('save', { ...category.value });
  emit('close');
};
</script>

<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <header>
        <h2>{{ initialData ? 'Editar Categoria' : 'Nova Categoria' }}</h2>
        <button class="btn-close" @click="$emit('close')">&times;</button>
      </header>

      <form @submit.prevent="submit">
        <div class="preview-section">
          <div class="icon-preview" :style="{ backgroundColor: category.color + '20', color: category.color }">
            {{ category.icon }}
          </div>
        </div>

        <div class="input-group">
          <label>Nome da Categoria</label>
          <input type="text" v-model="category.name" placeholder="Ex: Assinaturas" required>
        </div>

        <div class="input-group">
          <label>Tipo</label>
          <div class="type-toggle">
            <button type="button" :class="{ active: category.type === 'income' }" @click="category.type = 'income'">Renda</button>
            <button type="button" :class="{ active: category.type === 'expense' }" @click="category.type = 'expense'">Gasto</button>
          </div>
        </div>

        <div class="input-group">
          <label>Cor de Identificação</label>
          <div class="color-grid">
            <button 
              v-for="color in colorPalette" 
              :key="color" 
              type="button"
              class="color-btn"
              :style="{ backgroundColor: color }"
              :class="{ selected: category.color === color }"
              @click="category.color = color"
            ></button>
          </div>
        </div>

        <div class="input-group">
          <label>Ícone</label>
          <div class="icon-grid">
            <button 
              v-for="icon in commonIcons" 
              :key="icon" 
              type="button"
              class="icon-btn"
              :class="{ selected: category.icon === icon }"
              @click="category.icon = icon"
            >{{ icon }}</button>
          </div>
        </div>

        <button type="submit" class="btn-save">
          {{ initialData ? 'Salvar Alterações' : 'Criar Categoria' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(15, 23, 42, 0.9); backdrop-filter: blur(2px);
  display: flex; align-items: center; justify-content: center; z-index: 2000;
}

.modal-content {
  background: #1e293b; border: 1px solid #334155; padding: 2rem;
  border-radius: 28px; width: 90%; max-width: 380px;
}

header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
.btn-close { background: none; border: none; color: #94a3b8; font-size: 1.5rem; cursor: pointer; }

/* Preview */
.preview-section { display: flex; justify-content: center; margin-bottom: 1.5rem; }
.icon-preview {
  width: 70px; height: 70px; border-radius: 20px;
  display: flex; align-items: center; justify-content: center;
  font-size: 2rem; border: 2px solid rgba(255,255,255,0.05);
}

.input-group { margin-bottom: 1.2rem; }
.input-group label { display: block; font-size: 0.8rem; color: #94a3b8; margin-bottom: 8px; }

input {
  width: 100%; background: #0f172a; border: 1px solid #334155;
  color: white; padding: 12px; border-radius: 12px; outline: none;
}

/* Type Toggle */
.type-toggle { display: flex; background: #0f172a; padding: 4px; border-radius: 10px; }
.type-toggle button {
  flex: 1; border: none; background: transparent; color: #64748b;
  padding: 8px; border-radius: 8px; cursor: pointer; font-weight: bold;
}
.type-toggle button.active { background: #1e293b; color: #f8fafc; }

/* Grids (Cores e Ícones) */
.color-grid, .icon-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }

.color-btn {
  height: 30px; border-radius: 8px; border: 2px solid transparent; cursor: pointer;
}
.color-btn.selected { border-color: white; transform: scale(1.1); }

.icon-btn {
  background: #0f172a; border: 1px solid #334155; padding: 8px;
  border-radius: 8px; cursor: pointer; font-size: 1.2rem;
}
.icon-btn.selected { border-color: #22d3ee; background: rgba(34, 211, 238, 0.1); }

.btn-save {
  width: 100%; margin-top: 1rem; padding: 14px; border-radius: 14px;
  border: none; background: linear-gradient(to right, #22d3ee, #8b5cf6);
  color: white; font-weight: bold; cursor: pointer;
}
</style>