<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/users';
import { useUIStore } from '@/stores/UIStores';


import BaseInput from '@/components/BaseComponents/BaseInput.vue';
import BaseButton from '@/components/BaseComponents/BaseButton.vue';
import BaseForm from '@/components/BaseComponents/BaseForm.vue';


import { User, Save, Moon, Sun, Palette, Briefcase, Check } from 'lucide-vue-next';

const userStore = useUserStore();
const uiStore = useUIStore();
const formRef = ref(null);
const isSaving = ref(false);

const roles = ['Super Admin', 'Developer', 'Manager', 'Support'];

const profileForm = reactive({
    name: '', 
    surname: '',
    role: userStore.currentUser.role
});


const handleUpdate = async () => {
    isSaving.value = true;
    const isValid = await formRef.value.validate();

    if (isValid) {
        userStore.updateProfile({
            name: profileForm.name || userStore.currentUser.name,
            surname: profileForm.surname || userStore.currentUser.surname,
            role: profileForm.role
        });

        setTimeout(() => {
            isSaving.value = false;
            profileForm.name = ''; 
            profileForm.surname = '';
        }, 600);
    } else {
        isSaving.value = false;
    }
};

onMounted(() => {
    uiStore.applyTheme();
});
</script>

<template>
  <div class=" max-w-6xl mx-auto space-y-10 animate-fade-in text-slate-200">

    <div class="border-b border-slate-800/60 pb-8">
      <h1 class="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Sozlamalar</h1>
      <p class="text-slate-500 font-bold text-sm mt-2 uppercase tracking-widest">Profilingizni boshqaring</p>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-10">

      <div class="xl:col-span-4">
        <div class="dark:bg-slate-900/60 bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 backdrop-blur-xl sticky top-32 shadow-2xl">
          <div class="flex flex-col items-center text-center">
            
            <div class="w-32 h-32 rounded-3xl bg-linear-to-tr from-emerald-500 to-teal-400 p-1 mb-6 shadow-lg shadow-emerald-500/20">
              <div class="w-full h-full rounded-[1.4rem] bg-slate-900 flex items-center justify-center text-4xl font-black text-emerald-400">
                {{ userStore.currentUser.avatar }}
              </div>
            </div>

            <h2 class="text-2xl font-black   tracking-tight truncate w-full">
              {{ userStore.currentUser.name }} {{ userStore.currentUser.surname }} salom
            </h2>
            
            <p class="text-[10px] text-emerald-500 font-black uppercase tracking-[0.2em] mt-3 px-4 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
              {{ userStore.currentUser.role }}
            </p>
          </div>
        </div>
      </div>

      <div class="xl:col-span-8 space-y-8">
        
        <div class="dark:bg-slate-900/40 bg-slate-900 border border-slate-800 rounded-[3rem] p-10 backdrop-blur-md">
          <div class="flex items-center space-x-4 mb-10 text-slate-500">
            <User :size="22" />
            <h3 class="text-xl font-bold text-slate-200 tracking-tight">Shaxsiy ma'lumotlar</h3>
          </div>

          <BaseForm ref="formRef" class="space-y-10">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <BaseInput 
                v-model="profileForm.name" 
                label="Ism"
                :placeholder="userStore.currentUser.name" 
              />
              <BaseInput 
                v-model="profileForm.surname" 
                label="Familiya"
                :placeholder="userStore.currentUser.surname" 
              />
              
              <div class="md:col-span-2 space-y-4">
                <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Lavozimni tanlang</label>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div 
                    v-for="role in roles" 
                    :key="role"
                    @click="profileForm.role = role"
                    :class="[
                      'p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center space-y-2',
                      profileForm.role === role 
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-500/5' 
                        : 'bg-slate-800/40 border-slate-700 text-slate-500 hover:border-slate-500'
                    ]"
                  >
                    <Check v-if="profileForm.role === role" :size="16" />
                    <Briefcase v-else :size="16" />
                    <span class="text-[10px] font-black uppercase tracking-tight">{{ role }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex justify-end pt-8 border-t border-slate-800">
              <BaseButton @click="handleUpdate" :loading="isSaving" class="w-full md:w-auto px-12 h-14 rounded-2xl font-black">
                <Save v-if="!isSaving" class="mr-2" :size="20" />
                Saqlash
              </BaseButton>
            </div>
          </BaseForm>
        </div>

        <div class="dark:bg-slate-900/40 bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] flex items-center justify-between group shadow-sm">
          <div class="flex items-center space-x-4">
            <div class="p-3 bg-slate-800 rounded-2xl">
              <Palette class="text-emerald-500" :size="22" />
            </div>
            <div>
              <p class="text-sm font-bold text-white">Interfeys ko'rinishi</p>
              <p class="text-[10px] text-slate-500 uppercase font-black">
                {{ uiStore.isDark ? 'Dark Mode' : 'Light Mode' }}
              </p>
            </div>
          </div>

          <button @click="uiStore.toggleTheme()"
            class="relative w-16 h-8 rounded-full bg-slate-800 border border-slate-700 p-1 transition-all duration-500">
            <div class="h-full aspect-square rounded-full transition-all duration-200 flex items-center justify-center shadow-lg"
              :class="uiStore.isDark ? 'ml-8 bg-emerald-500' : 'ml-0 bg-slate-500'">
              <Moon v-if="uiStore.isDark" :size="12" class="text-white" />
              <Sun v-else :size="12" class="text-white" />
            </div>
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: entrance 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes entrance {
  from { opacity: 0; transform: translateY(20px); filter: blur(10px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
}
</style>