<script setup>
import { ref, computed } from 'vue'
import { useSearchStore } from '@/stores/search';
import { ChevronDown, ChevronUp, User } from 'lucide-vue-next';
import BaseChip from '@/components/BaseComponents/BaseChip.vue';

const searchStore = useSearchStore()

const transactions = [
    { id: 1, user: 'Adham Norqobilov', email: 'adhamnorqobilov2@gmail.com', date: '13-fev, 2026', amount: '$450', status: 'Muvaffaqiyatli', statusClass: 'text-emerald-400 bg-emerald-400/10' },
    { id: 2, user: 'Vladimir Putin', email: 'vladimirputin@gmail.com', date: '12-fev, 2026', amount: '$300', status: 'Kutilmoqda', statusClass: 'text-amber-400 bg-amber-400/10' },
    { id: 3, user: 'Donald Trump', email: 'donaldtrump@gmail.com', date: '10-fev, 2026', amount: '$250', status: 'Xatolik', statusClass: 'text-rose-400 bg-rose-400/10' },
    { id: 4, user: 'King Jon-un', email: 'kingjonun@gmail.com', date: '8-fev, 2026', amount: '$500', status: 'Muvaffaqiyatli', statusClass: 'text-emerald-400 bg-emerald-400/10' },
    { id: 5, user: 'Shavkat Mirziyoyev', email: 'shavkatmirziyoyev@gmail.com', date: '7-fev, 2026', amount: '$350', status: 'Muvaffaqiyatli', statusClass: 'text-emerald-400 bg-emerald-400/10' },
    { id: 6, user: 'Olaf Scholz', email: 'olafscholz@gmail.com', date: '4-fev, 2026', amount: '$200', status: 'Xatolik', statusClass: 'text-rose-400 bg-rose-400/10' },
]

const showAll = ref(false);

const displayedTransactions = computed(() => {

    const query = searchStore.searchQuery.toLowerCase()

    const filtered = transactions.filter(item =>
        item.user.toLowerCase().includes(query) || item.email.toLowerCase().includes(query)
    )
    return showAll.value ? filtered : filtered.slice(0, 3)
})

const toggleView = () => {
    showAll.value = !showAll.value
}
</script>


<template>
    <div class="bg-slate-900 dark:bg-slate-900/40 border border-slate-800 rounded-4xl overflow-hidden transtion-all duration-300">
        <div class="p-6 md:p-8 border-b border-slate-800/50 flex flex-col md:flex-row items-start justify-between gap-4">
            <div>
                <h3 class="text-white font-black text-xl tracking-tight">Oxirgi tranzaksiyalar</h3>
                <p class="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Haftalik hisobot</p>
            </div>
            <button @click="toggleView"
                class="w-full sm:w-auto flex items-center space-x-2 px-6 py-3 bg-slate-800/50 hover:bg-emerald-500/10 border border-slate-700 hover:border-emerald-500/50 rounded-xl text-slate-300 hover:text-emerald-400 transition-all duration-300 group active:scale-95">
                <span class=" text-xs font-bold uppercase tracking-widest"> {{ showAll ? 'Yashirish' : `Hammasini
                    ko'rish` }}</span>
                <component :is="showAll ? ChevronUp : ChevronDown" :size="16"
                    class=" inline-block duration-300 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>

        <div class="p-2">
            <div
                class="hidden md:grid grid-cols-[2.5fr_1.2fr_1fr_1.2fr] px-6 py-4 text-slate-500 text-[10px] uppercase font-black tracking-[0.2rem] opacity-60">
                <div>Foydalanuvchi</div>
                <div>Sana</div>
                <div>Miqdor</div>
                <div>Status</div>
            </div>

            <TransitionGroup name="list" tag="div" class="space-y-3 relative">

                <div v-for="item in displayedTransactions" :key="item.id"
                    class="grid grid-cols-1 md:grid-cols-[2.5fr_1.2fr_1fr_1fr] items-end xl:items-center justify-center px-4 md:px-6 py-5 rounded-2xl bg-slate-950/20 hover:bg-slate-800/40 border border-slate-800/50 hover:border-emerald-500/30 transition-all group cursor-pointer">
                    <div class="flex flex-col xl:flex-row items-start justify-between xl:items-center  xl:justify-start gap-4 space-x-4">
                        <div
                            class="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/50 transition-all sh">
                            <User :size="20" class="tex-slate-500 group-hover:text-emerald-400" />
                        </div>
                        <div class="flex flex-col">
                            <span
                                class="tex-white font-bold text-sm leading-tight group-hover:text-emerald-400 transition-colors">{{
                                    item.user }}</span>
                            <span class="text-slate-500 text-[11px] mt-0.5 tracking-wide">{{ item.email }}</span>
                        </div>
                    </div>
                    
                    <div class="hidden md:block  text-slate-400 text-xs font-medium">
                        {{ item.date }}
                    </div>

                    <div class="text-white font-black text-sm mt-1 md:mt-0">
                        {{ item.amount }}
                    </div>


                    <div class="mt-3 md:mt-0">
                        <BaseChip :status-class="item.statusClass" :status="item.status"/>
                        <!-- <span
                            :class="[item.statusClass, 'px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider inline-flex items-center border border-current/10 shadow-sm']">
                            <span class="w-1.5 h-1.5 rounded-full bg-current mr-2 animate-pulse"></span>
                            {{ item.status }}
                        </span> -->
                    </div>
                </div>

            </TransitionGroup>
        </div>
    </div>
</template>

<style scoped>
.list-enter-active {
    transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.list-leave-active {
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    position: absolute;
    width: 100%;
}


.list-enter-from {
    opacity: 0;
    filter: blur(8px);
    transform: translateX(-20px) scale(0.98);
}


.list-leave-to {
    opacity: 0;
    filter: blur(12px);
    transform: translateY(10px) scale(0.95);
}


.list-move {
    transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>