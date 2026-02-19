<script setup>
import { Moon, Sun, Search, Bell, Command, Menu } from 'lucide-vue-next';
import { useSearchStore } from '@/stores/search';
import { useUserStore } from '@/stores/users';
import { useUIStore } from '@/stores/UIStores';
import { ref } from 'vue';
import NotificationDropDown from './NotificationDropDown.vue';

const emit = defineEmits(['on-menu-click'])

const handleButtonClick = () => {

  emit('on-menu-click');
}

const searchStore = useSearchStore()
const userStore = useUserStore();
const uiStore = useUIStore();

const isNotificationsOpen = ref(false)

const toggleNotifications = () => {
    isNotificationsOpen.value = !isNotificationsOpen.value
}
</script>

<template>
    <header
        class="animate-nav-entrance h-20 md:h-24 border-b border-slate-800/50 bg-slate-900 dark:bg-slate-900/40 backdrop-blur-xl sticky  top-0 z-40 px-4 md:px-10 flex items-center justify-between transition-all duration-300">

        <div class="flex items-center flex-1">
             <button @click.stop="handleButtonClick"
             class="p-2 hover:bg-slate-800 rounded-lg mr-2 md:mr-4">
                <Menu :size="24" class="text-emerald-500"/>
            </button> 
            <div class="w-full max-w-xs flex border border-slate-700/50 rounded-2xl gap-1 py-2.5 px-2.5 text-slate-200 text-sm items-center md:max-w-md group sm:flex">
                
                <Search
                    class="left-4 top-3 text-slate-500 group-focus-within:text-emerald-400 transition-all duration-300"
                    :size="20" />
                <input v-model="searchStore.searchQuery" type="text" placeholder="Qidiruv"
                    class="w-full flex-1   focus:outline-none focus:border-emerald-500/50 transition-all" />
                <div
                    class=" right-4 top-3 hidden md:flex items-center space-x-1 px-2 py-0.5 border border-slate-700 rounded-lg text-[10px] text-slate-500 font-mono">
                    <Command :size="10" /> <span>K</span>
                </div>
            </div>
        </div>

        <div class="flex items-center space-x-2 lg:space-x-4 ml-4">

            <button @click="uiStore.toggleTheme"
                class="p-2 lg:p-3 text-slate-400 hover:bg-slate-800 rounded-2xl transition-all group active:scale-90 shrink-0">
                <component 
                :is="uiStore.isDark ? Sun : Moon"
                :size="24"
                :class="uiStore.isDark ? 'text-yellow-400' : 'text-blue-400'"/>
            </button>

            <div class="relative shrink-0">
                <button @click="toggleNotifications" :class="{ 'bg-slate-800 text-emerald-400': isNotificationsOpen }"
                    class="relative p-2 md:p-3 text-slate-400 hover:bg-slate-800 rounded-2xl transition-all group">
                    <Bell :size="24" class="group-hover:rotate-12 transition-transform" />
                    <span
                        class="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
                </button>

                <NotificationDropDown :is-open="isNotificationsOpen" />
            </div>

            <div class="h-8 w-px bg-slate-800 sm:block"></div>

            <div class="flex items-center space-x-3 cursor-pointer group">
                <div class="text-right hidden lg:block">
                    <p class="text-sm font-black text-slate-100 group-hover:text-emerald-400 transition-colors">
                        {{ userStore.currentUser.name }} {{ userStore.currentUser.surname }}
                    </p>
                    <p class="text-[10px] text-emerald-500/70 font-black uppercase tracking-tighter">{{ userStore.currentUser.role }}</p>
                </div>
                <div
                    class="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-linear-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-900 font-black shadow-lg shadow-emerald-500/20 shrink-0">
                    {{ userStore.currentUser.avatar }}
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped>
.animate-nav-entrance {
    animation: nav-slide-down 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes nav-slide-down {
    from {
        opacity: 0;
        transform: translateY(-20px);
        filter: blur(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
        filter: blur(0);
    }
}
</style>