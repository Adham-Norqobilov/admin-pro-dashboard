<script setup>
import { ref, reactive } from 'vue';
import { email, required } from '@/utils/rules'
import {
    UserPlus, Search, Users, Trash2, Edit3, 
    ShieldCheck, Mail, User, AlertTriangle, Settings2
} from 'lucide-vue-next';
import { useUserStore } from '@/stores/users';
import { useToast } from 'vue-toastification';

import BaseInput from '@/components/BaseComponents/BaseInput.vue';
import BaseButton from '@/components/BaseComponents/BaseButton.vue';
import BaseModal from '@/components/BaseComponents/BaseModal.vue';
import BaseForm from '@/components/BaseComponents/BaseForm.vue';

const toast = useToast();
const userStore = useUserStore();


const isFormModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const isRolesModalOpen = ref(false); 
const isEditMode = ref(false);
const selectedUserId = ref(null);
const userToDelete = ref(null);


const userForm = reactive({
    name: '',
    email: '',
    role: 'Developer',
    status: 'active' 
});


const openAddModal = () => {
    isEditMode.value = false;
    userForm.name = '';
    userForm.email = '';
    userForm.role = 'Developer';
    userForm.status = 'active';
    isFormModalOpen.value = true;
};

const openEditModal = (user) => {
    isEditMode.value = true;
    selectedUserId.value = user.id;
    userForm.name = user.name;
    userForm.email = user.email;
    userForm.role = user.role;
    userForm.status = user.status; 
    isFormModalOpen.value = true;
};
const formRef = ref(null); 
const handleSaveUser = async () => {

    const isValid = await formRef.value.validate();

    if (!isValid) {
        return ;

    } 

    if (isEditMode.value) {
        userStore.updateUser(selectedUserId.value, { ...userForm });
        toast.success("Ma'lumotlar muvaffaqiyatli yangilandi!")
    } else {
        await userStore.addUser({ ...userForm });
        toast.success("Yangi foydalanuvchi muvaffaqiyatli qo'shildi!")
    }
    isFormModalOpen.value = false;
};

const resetForm = () => {
    formRef.value.resetValidation();
}


const openDeleteModal = (user) => {
    userToDelete.value = user;
    isDeleteModalOpen.value = true;
};

const confirmDelete = () => {
    if (userToDelete.value) {
        userStore.deleteUser(userToDelete.value.id);
        toast.error(`${userToDelete.value.name} tizimdan muvaffaqiyatli o'chirildi!`)
        isDeleteModalOpen.value = false;
        userToDelete.value = null;
    }
};

const rules = {
    required: v => !!v || 'Ushbu maydonni to\'ldirish shart!',
    email: v => /.+@.+\..+/.test(v) || 'Email formati noto\'g\'ri!',
    min: (v, len) => (v && v.length >= len) || `Kamida ${len} ta belgi bo'lishi kerak!`,
};
</script>

<template>
    <div class="space-y-8 animate-page-fade">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
                <div class="flex items-center space-x-3 mb-2">
                    <div class="p-2.5 bg-emerald-500 dark:bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                        <Users class="text-white dark:text-emerald-400" :size="28" />
                    </div>
                    <h1 class="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Foydalanuvchilar</h1>
                </div>
                <p class="text-slate-500 font-medium ml-1">Tizim a'zolari va ruxsatnomalar boshqaruvi</p>
            </div>

            <div class="flex items-center justify-center space-x-4 bg-slate-900 dark:bg-slate-900/50 p-2 rounded-4xl border border-slate-800/50">
                <div class="px-6 py-2 text-center border-r border-slate-800">
                    <span class="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] block">Jami</span>
                    <span class="text-2xl font-black text-white">{{ userStore.totalUsers }}</span>
                </div>
                <div class="px-6 py-2 text-center">
                    <span class="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] block">Faol</span>
                    <span class="text-2xl font-black text-emerald-400">{{ userStore.activeUsers }}</span>
                </div>
            </div>
        </div>

        <div class="flex flex-col lg:flex-row items-center justify-between gap-4 p-4 bg-slate-900 dark:bg-slate-900/40 border border-slate-800/40 rounded-[2.5rem] backdrop-blur-xl shadow-2xl">
            <div class="w-full lg:w-1/3">
                <BaseInput v-model="userStore.searchQuery" placeholder="Ism yoki email..." :icon="Search" />
            </div>
            <div class="flex items-center space-x-3 w-full lg:w-auto">
                <BaseButton @click="isRolesModalOpen = true" variant="secondary" class="flex-1 lg:flex-none">
                    <template #icon><ShieldCheck :size="18" /></template>
                    Rollar
                </BaseButton>
                
                <BaseButton @click="openAddModal" class="flex-1 lg:flex-none">
                    <template #icon><UserPlus :size="18" /></template>
                    Qo'shish
                </BaseButton>
            </div>
        </div>

        <div class="space-y-4 bg-slate-900 dark:bg-slate-950 py-10 rounded-4xl">
            <div class="hidden md:grid grid-cols-[2fr_1fr_1fr_120px] px-10 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                <div>Foydalanuvchi</div>
                <div>Roli</div>
                <div>Status</div>
                <div class="text-right">Amallar</div>
            </div>

            <div class="space-y-3">
                <div v-for="user in userStore.filteredUsers" :key="user.id"
                    class="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_120px] items-center bg-slate-900/40 border border-slate-800/50 p-4 md:px-10 md:py-5 rounded-4xl hover:bg-slate-800/40 hover:border-emerald-500/30 transition-all duration-300 group relative overflow-hidden shadow-lg">

                    <div class="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    <div class="flex items-center space-x-4">
                        <div class="user-avatar-box w-12 h-12 rounded-2xl flex items-center justify-center text-emerald-400 font-black border border-slate-700/50 shadow-xl group-hover:scale-110 transition-transform">
                            {{ user.avatar }}
                        </div>
                        <div class="min-w-0">
                            <p class="text-white font-bold truncate group-hover:text-emerald-400 transition-colors">{{ user.name }}</p>
                            <p class="text-xs text-slate-500 truncate font-medium">{{ user.email }}</p>
                        </div>
                    </div>

                    <div class="mt-4 md:mt-0">
                        <span class="inline-flex items-center px-3 py-1 bg-slate-950/50 text-slate-400 rounded-xl text-[11px] font-bold border border-slate-800 group-hover:border-emerald-500/20 group-hover:text-slate-200 transition-all">
                            {{ user.role }}
                        </span>
                    </div>

                    <div class="mt-2 md:mt-0 flex items-center space-x-2">
                        <span :class="['w-2.5 h-2.5 rounded-full ring-4', user.status === 'active' ? 'bg-emerald-500 ring-emerald-500/10' : 'bg-slate-600 ring-slate-600/10']"></span>
                        <span :class="['text-[11px] font-black uppercase tracking-widest', user.status === 'active' ? 'text-emerald-500' : 'text-slate-500']">
                            {{ user.status }}
                        </span>
                    </div>

                    <div class="mt-4 md:mt-0 flex items-center justify-end space-x-2">
                        <button @click="openDeleteModal(user)"
                            class="p-2.5 bg-slate-800/50 hover:bg-rose-500/10 rounded-xl text-slate-500 hover:text-rose-500 transition-all border border-transparent hover:border-rose-500/20">
                            <Trash2 :size="18" />
                        </button>
                        <button @click="openEditModal(user)"
                            class="p-2.5 bg-slate-800/50 hover:bg-emerald-500/10 rounded-xl text-slate-500 hover:text-emerald-400 transition-all border border-transparent hover:border-emerald-500/20">
                            <Edit3 :size="18" />
                        </button>
                    </div>
                </div>

                <div v-if="userStore.filteredUsers.length === 0"
                    class="py-20 text-center bg-slate-900/20 rounded-[2.5rem] border border-dashed border-slate-800">
                    <Search class="text-slate-600 mx-auto mb-4 opacity-50" :size="48" />
                    <p class="text-slate-500 font-bold">Hech qanday natija topilmadi...</p>
                </div>
            </div>
        </div>

        <BaseModal :is-open="isFormModalOpen" :title="isEditMode ? 'Foydalanuvchini tahrirlash' : 'Yangi foydalanuvchi'" @close="isFormModalOpen = false">
            <BaseForm ref="formRef" class="space-y-6 p-1" @submit.prevent="handleSaveUser()">
                <BaseInput v-model="userForm.name" label="Ism-sharifi" placeholder="Ali Valiyev" :icon="User" :rules="[required]"/>
                <BaseInput v-model="userForm.email" label="Elektron pochta" type="email" placeholder="ali@mail.com" :icon="Mail" :rules="[required, email]" />
                
                <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Rolni tanlang</label>
                        <select v-model="userForm.role" class="w-full bg-slate-800/40 border border-slate-700/50 rounded-2xl py-3.5 px-4 text-slate-200 focus:outline-none focus:border-emerald-500/50 transition-all appearance-none cursor-pointer">
                            <option value="Super Admin">Super Admin</option>
                            <option value="Developer">Developer</option>
                            <option value="Manager">Manager</option>
                            <option value="Support">Support</option>
                        </select>
                    </div>
                    <div class="space-y-2">
                        <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Status</label>
                        <select v-model="userForm.status" class="w-full bg-slate-800/40 border border-slate-700/50 rounded-2xl py-3.5 px-4 text-slate-200 focus:outline-none focus:border-emerald-500/50 transition-all appearance-none cursor-pointer">
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                <div class="flex space-x-4 md:pt-4">
                    <BaseButton variant="secondary" class="flex-1" @click="isFormModalOpen = false">Bekor qilish</BaseButton>
                    <BaseButton :loading="userStore.loading" class="flex-1" type="submit" @click="handleSaveUser">

                        {{ isEditMode ? 'O\'zgarishlarni saqlash' : "Qo'shish" }}
                        
                    </BaseButton>
                </div>
            </BaseForm>
        </BaseModal>

        <BaseModal :is-open="isRolesModalOpen" title="Tizim rollarini boshqarish" @close="isRolesModalOpen = false">
            <div class="space-y-6">
                <div class="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-2xl flex items-start space-x-3">
                    <ShieldCheck class="text-emerald-400 mt-1" :size="20" />
                    <p class="text-xs text-slate-400 leading-relaxed">
                        Bu yerda siz tizimdagi global rollarni va ularning ruxsatnomalarini (permissions) boshqarishingiz mumkin.
                    </p>
                </div>
                
                <div class="space-y-3">
                    <div v-for="role in ['Super Admin', 'Developer', 'Manager', 'Support']" :key="role" 
                        class="flex items-center justify-between p-4 bg-slate-800/30 border border-slate-700/50 rounded-2xl hover:bg-slate-800/50 transition-colors group">
                        <span class="text-slate-200 font-bold">{{ role }}</span>
                        <button class="text-slate-500 group-hover:text-emerald-400 p-2 transition-colors">
                            <Settings2 :size="18" />
                        </button>
                    </div>
                </div>

                <BaseButton variant="secondary" class="w-full" @click="isRolesModalOpen = false">Yopish</BaseButton>
            </div>
        </BaseModal>

        <BaseModal :is-open="isDeleteModalOpen" title="O'chirishni tasdiqlash" @close="isDeleteModalOpen = false">
            <div class="space-y-6 text-center">
                <div class="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto border border-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.1)]">
                    <AlertTriangle class="text-rose-500" :size="30" />
                </div>
                <div>
                    <h3 class="text-white font-bold text-lg">Haqiqatdan ham o'chirmoqchimisiz?</h3>
                    <p class="text-slate-500 text-sm mt-2 leading-relaxed">
                        Foydalanuvchi: <span class="text-slate-200 font-bold">{{ userToDelete?.name }}</span><br>
                        Bu amalni ortga qaytarib bo'lmaydi.
                    </p>
                </div>
                <div class="flex space-x-4">
                    <BaseButton variant="secondary" class="flex-1" @click="isDeleteModalOpen = false">Yo'q, qolsin</BaseButton>
                    <BaseButton class="flex-1 bg-rose-600 hover:bg-rose-500 border-none shadow-lg shadow-rose-600/20" @click="confirmDelete">Ha, o'chirilsin</BaseButton>
                </div>
            </div>
        </BaseModal>
    </div>
</template>

<style scoped>

.user-avatar-box {
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
}
.animate-page-fade {
    animation: fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Select elementidagi o'q belgisini chiroyli qilish uchun */
select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1.25rem;
}
</style>