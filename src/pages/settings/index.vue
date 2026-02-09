<script setup>
import { ref } from 'vue';

const user = ref({
  name: 'Alex Silva',
  email: 'alex.silva@email.com',
  currency: 'BRL (R$)',
  notifications: true,
  darkMode: true,
  twoFactor: false
});

const saveSettings = () => {
  alert('Configurações salvas com sucesso!');
};
</script>

<template>
  <main class="settings-page">
    <header class="page-header">
      <h1>Configurações</h1>
      <p>Gerencie sua conta e preferências do sistema</p>
    </header>

    <div class="settings-grid">
      <section class="settings-card">
        <div class="card-header">
          <span class="icon">👤</span>
          <h3>Perfil do Usuário</h3>
        </div>
        <div class="form-group">
          <label>Nome Completo</label>
          <input type="text" v-model="user.name" placeholder="Seu nome">
        </div>
        <div class="form-group">
          <label>E-mail</label>
          <input type="email" v-model="user.email" placeholder="seu@email.com">
        </div>
      </section>

      <section class="settings-card">
        <div class="card-header">
          <span class="icon">🎨</span>
          <h3>Preferências</h3>
        </div>
        <div class="setting-item">
          <div class="text">
            <span>Moeda Principal</span>
            <small>Usada para todos os cálculos automáticos</small>
          </div>
          <select v-model="user.currency">
            <option>BRL (R$)</option>
            <option>USD ($)</option>
            <option>EUR (€)</option>
          </select>
        </div>
        
        <div class="setting-item">
          <div class="text">
            <span>Notificações Push</span>
            <small>Alertas de gastos e limites atingidos</small>
          </div>
          <label class="switch">
            <input type="checkbox" v-model="user.notifications">
            <span class="slider"></span>
          </label>
        </div>
      </section>

      <section class="settings-card security">
        <div class="card-header">
          <span class="icon">🔒</span>
          <h3>Segurança</h3>
        </div>
        <div class="setting-item">
          <div class="text">
            <span>Autenticação em Duas Etapas</span>
            <small>Proteja sua conta com um nível extra de segurança</small>
          </div>
          <label class="switch">
            <input type="checkbox" v-model="user.twoFactor">
            <span class="slider"></span>
          </label>
        </div>
        <button class="btn-outline">Alterar Senha</button>
      </section>
    </div>

    <footer class="settings-actions">
      <button class="btn-save" @click="saveSettings">Salvar Alterações</button>
      <button class="btn-danger">Excluir Conta</button>
    </footer>
  </main>
</template>

<style scoped>
.settings-page { padding: 20px; color: #f8fafc; }
.page-header { margin-bottom: 30px; }
.page-header h1 { font-size: 1.8rem; margin: 0; }
.page-header p { color: #94a3b8; margin-top: 5px; }

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}

.settings-card {
  background: #1e293b;
  border-radius: 24px;
  padding: 25px;
  border: 1px solid #334155;
}

.card-header { display: flex; align-items: center; gap: 15px; margin-bottom: 25px; }
.card-header .icon { font-size: 1.5rem; background: #0f172a; padding: 10px; border-radius: 12px; }
.card-header h3 { margin: 0; font-size: 1.1rem; }

/* Form Controls */
.form-group { margin-bottom: 20px; }
.form-group label { display: block; font-size: 0.85rem; color: #94a3b8; margin-bottom: 8px; }
input, select {
  width: 100%;
  background: #0f172a;
  border: 1px solid #334155;
  color: white;
  padding: 12px;
  border-radius: 12px;
  outline: none;
  transition: 0.3s;
}
input:focus { border-color: #22d3ee; box-shadow: 0 0 10px rgba(34, 211, 238, 0.2); }

/* Setting Items with Switches */
.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #334155;
}
.setting-item:last-child { border: none; }
.setting-item .text { display: flex; flex-direction: column; gap: 4px; }
.setting-item small { color: #64748b; font-size: 0.75rem; }

/* Switch Toggle UI */
.switch { position: relative; display: inline-block; width: 44px; height: 24px; }
.switch input { opacity: 0; width: 0; height: 0; }
.slider {
  position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
  background-color: #334155; transition: .4s; border-radius: 34px;
}
.slider:before {
  position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px;
  background-color: white; transition: .4s; border-radius: 50%;
}
input:checked + .slider { background-color: #22d3ee; }
input:checked + .slider:before { transform: translateX(20px); }

/* Buttons */
.settings-actions { margin-top: 40px; display: flex; gap: 15px; }
.btn-save {
  background: linear-gradient(to right, #22d3ee, #8b5cf6);
  border: none; color: white; padding: 12px 30px; border-radius: 12px; font-weight: bold; cursor: pointer;
}
.btn-outline {
  background: transparent; border: 1px solid #334155; color: white; 
  padding: 8px 15px; border-radius: 8px; cursor: pointer; margin-top: 15px;
}
.btn-danger { background: transparent; color: #ef4444; border: none; cursor: pointer; font-size: 0.9rem; }
</style>