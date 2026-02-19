<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    statusClass: {
        
    },
    status: {
        
    }
})
</script>
<template>
    <span
        :class="[props.statusClass, 'px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider inline-flex items-center border border-current/10 shadow-sm']">
        <span class="w-1.5 h-1.5 rounded-full bg-current mr-2 animate-pulse"></span>
        {{ status }}
    </span>
</template>