<script setup>
import { ref } from "vue"
import Sidebar from '@/components/Sidebar.vue';
import Navbar from '@/components/Navbar.vue';

const setQuery = ref('')

const isCollapsed =ref(false);
const isMobileOpen = ref(false)
const toggleSidebar = () => {
  if(window.innerWidth >= 1024){
    isCollapsed.value =! isCollapsed.value
  }
  else{
    isMobileOpen.value = !isMobileOpen.value
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#F5F7FA] dark:bg-slate-950 flex font-sans antialiased text-slate-200 overfow-x-hidden transition-all duration-200">
    <Sidebar 
    :is-collapsed="isCollapsed"
    :is-mobile-open="isMobileOpen"
    @close-mobile="isMobileOpen = false"
    class="fixed inset-y-0 left-0 z-50 transition-all duration-300 ease-in-out"
    :class="[isCollapsed ? 'lg:w-24' : 'lg:w-64',
      isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      
    ]"/>

    <div class=" min-w-0 flex flex-col flex-1 transition-all duration-300 ease-in-out"
    :class="[isCollapsed ? 'lg:ml-20' : 'lg:ml-64',
    isMobileOpen ? 'translate-x-0' : ' lg:translate-x-0'
    ]">

      <Navbar v-model:search="setQuery"
      @on-menu-click="toggleSidebar"/>

      <main class="p-4 md:p-8 xl:p-12 overflow-y-auto w-full">
        <div class="max-w-400 mx-auto w-full">
          <RouterView/>
        </div>
      </main>
    </div>

    <div 
      v-if="isMobileOpen" 
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
      @click="isMobileOpen = false"
    ></div>
  </div>
</template>