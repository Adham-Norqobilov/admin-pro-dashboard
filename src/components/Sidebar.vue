<script setup>
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  ChevronRight,
  X
} from 'lucide-vue-next';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/users';

defineProps({
  isCollapsed: Boolean,
  isMobileOpen: Boolean,
});

defineEmits(['close-mobile'])

const userStore = useUserStore();

const route = useRoute();
const router = useRouter();

const currentPath = computed(() => route.path);
const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, to: '/' },
  { name: 'Foydalanuvchilar', icon: Users, to: '/users' },
  { name: 'Sozlamalar', icon: Settings, to: '/settings' },
];
</script>

<template>
  <aside
    class="fixed left-0 top-0 h-screen bg-slate-900 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-800/50 flex flex-col z-50 sidebar-entrance transition-all duration-300 ease-in-out overflow-hidden"
    :class="[
      isCollapsed ? 'lg:w-20' : 'lg:w-64',
      isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]">

    <button
    @click="$emit('close-mobile')"
      class="lg:hidden absolute top-5 right-0 md:top-7  p-2 text-slate-400 hover:text-white">
      <X :size="24"/>
    </button>

    <div class="h-20 md:h-24 flex items-center px-6 border-b border-slate-800/50 group cursor-pointer">
      <div class="relative shrink-0">
        <div
          class="absolute -inset-1 bg-emerald-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition-opacity">
        </div>
        <div
          class="relative w-9 h-9 bg-emerald-500 rounded-lg flex items-center justify-center mr-3 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
          <span class="text-slate-900 font-black text-xl">A</span>
        </div>
      </div>
      <span v-show="!isCollapsed" class="text-white font-black text-lg tracking-widest group-hover:text-emerald-400 transition-colors ml-1">ADMIN
        PRO</span>
    </div>

    <nav class="flex-1 overflow-y-auto py-8 px-4 space-y-1 custom-scrollbar">
      <p v-show="!isCollapsed" class="text-slate-500 text-[10px] uppercase font-black tracking-[0.2em] px-4 mb-6 opacity-60 whitespace-nowrap">Asosiy menyu</p>

      <div @click="router.push(item.to)" v-for="(item, index) in menuItems" :key="item.name"
        :style="{ animationDelay: `${index * 100}ms` }" :class="['group flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all duration-300 menu-item-fade active:scale-95',
          item.to == currentPath
            ? 'bg-emerald-500/10 text-emerald-400 shadow-[inset_0_0_10px_rgba(16,185,129,0.05)]'
            : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'
        ]">
        <div class="flex items-center space-x-3.5 relative">
          <div v-if="item.to == currentPath"
            class="absolute -left-3.5 w-1 h-6 bg-emerald-500 rounded-r-full shadow-[0_0_12px_#10b981]"></div>

          <component :is="item.icon" :size="20"
            :class="[item.to == currentPath ? 'text-emerald-400' : 'group-hover:scale-110 transition-transform duration-300']" />
          <span v-show="!isCollapsed" class="font-bold text-sm tracking-wide">
            {{ item.name }}
          </span>
        </div>

        <ChevronRight v-if="item.to == currentPath" :size="16"
          class="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
      </div>
    </nav>

    <div class="p-4 border-t border-slate-800/50 bg-slate-900/40">
  <div class="flex items-center justify-between px-2 py-3 hover:bg-slate-800/60 cursor-pointer transition-all duration-300 group relative overflow-hidden">
    
    <div class="absolute inset-0 bg-linear-to-r from-emerald-500/0 via-emerald-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

    <div class="flex items-center relative z-10">
      
      <div class="relative">
        <div class="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center text-white font-black border border-slate-600 group-hover:border-emerald-500/50 transition-colors">
          {{ userStore.currentUser.avatar }}
        </div>
        <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></div>
      </div>

      <div v-show="!isCollapsed" class="ml-3 overflow-hidden  ">
        <p class="text-[12px] font-bold text-slate-200 truncate group-hover:text-emerald-400 transition-colors  w-28">
          {{ userStore.currentUser.name }} {{ userStore.currentUser.surname }}
        </p>
        <p class="text-[9px] text-slate-500 uppercase font-bold tracking-tighter">
          {{ userStore.currentUser.role }}
        </p>
      </div>
    </div>

    <LogOut v-show="!isCollapsed" :size="20" class="text-slate-500 ml-2 md:ml-4 group-hover:text-rose-500 group-hover:rotate-12 transition-all relative z-10 " />
  </div>
</div>
  </aside>
</template>

<style scoped>
/* Sidebar umumiy kirib kelishi */
.sidebar-entrance {
  animation: slideRight 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Menyu elementlarining birin-ketin chiqishi */
.menu-item-fade {
  opacity: 0;
  transform: translateX(-10px);
  animation: fadeInRight 0.5s ease forwards;
}

@keyframes slideRight {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Scrollbar dizayni */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 10px;
}
</style>