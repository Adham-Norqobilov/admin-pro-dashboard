<script setup>
// TrendingUp va TrendingDown ikonkalari trendni vizual ko'rsatish uchun qo'shildi
import { TrendingUp, TrendingDown } from 'lucide-vue-next';

defineProps(['title', 'value', 'change', 'isUp', 'icon', 'colorClass']);
</script>

<template>
    <div
        class="bg-slate-900 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-800/50 p-6 rounded-4xl hover:border-emerald-500/30 transition-all duration-500 group cursor-pointer relative overflow-hidden stat-card-entrance">

        <div
            class="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        </div>

        <div class="flex items-start justify-between mb-6 relative z-10">
            <div :class="[
                colorClass,
                'w-14 h-14 rounded-2xl grid place-items-center text-white shadow-2xl relative group-hover:scale-110 transition-transform duration-500'
            ]">
                <div class="absolute inset-0 rounded-2xl blur-lg opacity-40 bg-current"></div>
                <component :is="icon" :size="26" class="relative z-10" />
            </div>

            <span :class="[
                isUp ? 'text-emerald-400 bg-emerald-400/10' : 'text-rose-400 bg-rose-400/10',
                'inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-[11px] font-black tracking-tighter'
            ]">
                <component :is="isUp ? TrendingUp : TrendingDown" :size="14" />
                <span>{{ change }}%</span>
            </span>
        </div>

        <div class="relative z-10">
            <p
                class="text-slate-500 text-xs font-black uppercase tracking-[0.15em] mb-1 opacity-80 group-hover:text-slate-400 transition-colors">
                {{ title }}
            </p>
            <div class="flex items-baseline space-x-1">
                <h3 class="text-3xl font-black text-white tracking-tight group-hover:text-emerald-50 transition-colors">
                    {{ value }}
                </h3>
                <span
                    class="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-2.5"></span>
            </div>
        </div>

        <div
            class="absolute bottom-0 left-0 h-1 bg-linear-to-r from-transparent via-emerald-500/20 to-transparent w-full translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
        </div>
    </div>
</template>

<style scoped>
/* Kirib kelish animatsiyasi */
.stat-card-entrance {
    animation: cardAppear 0.8s cubic-bezier(0.16, 1, 0.3, 1) backwards;
}

@keyframes cardAppear {
    from {
        opacity: 0;
        transform: translateY(30px) scale(0.9);
        filter: blur(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
        filter: blur(0);
    }
}
</style>