<script setup>
import {Users, ShoppingBag, CreditCard, Activity} from 'lucide-vue-next';
import StatCard from '@/components/StatCard.vue';
import AreaChart from '@/components/AreaChart.vue';
import TransactionTable from '@/components/TransactionTable.vue';

const stats = [
    {title: 'Jami foydalanuvchilar', value: '24,512', change: 12, isUp: true, icon: Users, colorClass: 'bg-blue-500'},
    {title: 'Bugungi sotuvlar', value: '$3,240', change: 8, isUp: true, icon: ShoppingBag, colorClass: 'bg-emerald-500'},
    {title: 'Oylik daromad', value: '$45,200', change: 12, isUp: false, icon: CreditCard, colorClass: 'bg-purple-500'},
    {title: 'Aktivlik', value: '82%', change: 5, isUp: true, icon: Activity, colorClass: 'bg-rose-500'},
]
</script>

<template>
    <div class="space-y-6 md:space-y-10  transition-all">
        
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
            <StatCard v-for="stat in stats"
                :key="stat.title"
                v-bind="stat" 
            />
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div class="xl:col-span-2 min-w-0">
                <AreaChart/>
            </div>
            
            <div class="bg-linear-to-br from-indigo-600 to-purple-700 rounded-4xl p-6 md:p-8 text-white relative overflow-hidden flex flex-col justify-center xl:justify-start">
                <div class="relative z-10">
                    <h3 class="text-xl md:text-2xl font-black mb-2 tracking-tight">Yodol Pro</h3>
                    <p class="text-indigo-100 text-xs md:text-sm mb-6 opacity-80">Tizimni to'liq quvvatda ishlating.</p>
                    <button class="w-full sm:w-auto bg-white text-indigo-600 px-8 py-3 rounded-xl font-black text-xs md:text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-indigo-900/20">
                        Sotib olish
                    </button>
                </div>
                <Activity class="absolute -right-8 -bottom-8 opacity-10 rotate-12" :size="200" />
            </div>
        </div>

            <div class="mt-4 md:mt-8rounded-4xl min-w-0 ">
                    <TransactionTable/>
            </div>
        
    </div>
</template>

<style scoped>
/* Jadval scrollbari dizayni */
.custom-scrollbar::-webkit-scrollbar {
    height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #334155;
    border-radius: 10px;
}
</style>