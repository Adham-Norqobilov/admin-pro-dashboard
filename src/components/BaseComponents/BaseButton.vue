<script setup>
defineProps({
    variant: { type: String, default: 'primary' },
    loading: { type: Boolean, default: false },
    type: { type: String, default: 'button'}
})
</script>

<template>
        <button :disabled="loading"
            :type="type"
            class="relative inline-flex items-center justify-center px-6 py-3 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
            :class="{
                'bg-emerald-500 text-slate-900 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20': variant === 'primary',
                'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700' : variant === 'secondary',
                'bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white border border-rose-500/20': variant === 'danger',
                'hover:bg-slate-800 text-slate-400 hover:text-slate-100': variant === 'ghost'
        }">
        
        <span v-if="loading" class="absolute inset-0 flex items-center justify-center bg-inherit">
            <span class="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
        </span>

        <div :class="{'opacity-0': loading}" class="flex items-center justify-center space-x-2 relative z-10">
            <slot name="icon"></slot>
            <slot></slot> 
            <slot name="append"></slot>
        </div>
    </button>
</template>