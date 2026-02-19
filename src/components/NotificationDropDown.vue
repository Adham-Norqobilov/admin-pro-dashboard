<script setup>
import { ref } from 'vue'
import { Check, ShoppingBag, MessageSquare, AlertCircle } from 'lucide-vue-next';
import BaseListItem from './BaseComponents/BaseListItem.vue';

const props = defineProps(['isOpen'])

const notifications = [
    { id: 1, title: 'Yangi xabar', desc: 'Donald Trump sizga xabar yubordi.', time: '1 soat avval', icon: MessageSquare, color: 'bg-blue-500/20 text-blue-400' },
    { id: 2, title: 'Yangi buyurtma!', desc: 'Shavkat Mirziyoyex 350$ lik xarid qildi.', time: '1 hafta avval', icon: ShoppingBag, color: 'bg-emerald-500/20 text-emerald-400' },
    { id: 3, title: 'Tizim xatosi', desc: 'Server yuklamasi 90% dan oshdi.', time: '3 soat avval', icon: AlertCircle, color: 'bg-rose-500/20 text-rose-400' },
];
</script>

<template>
    <Transition name="dropdown">
        <div v-if="isOpen"
            class="absolute right-0 mt-4 w-80 bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-4xl shadow-2xl z-50 overflow-hidden">
            <div class="p-5 border-b border-slate-800/50 flex justify-between items-center bg-slate-800/30">
                <h4 class="text-white font-bold text-sm tracking-tight">Bildirishnomalar</h4>
                <span
                    class="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">3
                    yangi</span>
            </div>

            <div class="max-h-80 overflow-y-auto custom-scrollbar">
                <div v-for="note in notifications" :key="note.id"
                    class="hover:bg-slate-800/50 transition-all cursor-pointer group">
                    <base-list-item :bg-and-text-colors="note.color" :time="note.time" :description="note.desc" :title="note.title">
                        <template #icon>
                            <component :is="note.icon" size="18"/>
                        </template>
                    </base-list-item>
                </div>
            </div>
            <button
                class="w-full py-4 text-center text-slate-400 hover:text-emerald-400 text-[11px] font-black uppercase tracking-[0.2em] bg-slate-800/20 transition-all border-t border-slate-800/50">
                Hammasini ko'rish
            </button>
        </div>
    </Transition>
</template>