<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    bgAndTextColors: {},
    title: {
        default: ""
    },
    description: {
        default: ""
    },
    time: {
        default: Date.now()
    }

});

</script>
<template>
    <div class="flex items-center space-x-4 py-2 px-3">

        <div
            :class="[props.bgAndTextColors ?? props.bgAndTextColors, 'w-10 h-10 rounded-xl flex items-center justify-center  shrink-0 group-hover:scale-110 transition-transform shadow-lg']">
            <slot name="icon">

            </slot>

        </div>
        <!-- <slot></slot> -->
        <slot name="body" :data="{...props}">
            <div class="flex-1 min-w-0">
                <p class="text-slate-100 font-bold text-[13px] leading-snug group-hover:text-emerald-400 transition-colors">
                    {{ props.title }}</p>
                <p class="text-slate-500 text-[11px] truncate mt-0.5 leading-relaxed">{{ props.description }}</p>
                <span class="text-slate-600 text-[9px] font-medium mt-1 inline-block uppercase tracking-wider">{{
                    props.time }}</span>
            </div>
        </slot>
    </div>
</template>