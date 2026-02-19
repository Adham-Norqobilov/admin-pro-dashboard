<script setup>
import { ref, inject, defineProps, onMounted, onUnmounted,watch, defineExpose, defineEmits } from 'vue'
const props = defineProps({
    modelValue: [String, Number],
    label: String,
    type: { type: String, default: 'text' },
    placeholder: String,
    // error: String,
    icon: [Object, Function],
    rules: {
        type: Array,
        default: []
    }
});

const error =ref("")

const validate = () => {
    for (const rule of props.rules) {
        const result = rule(props.modelValue);
        if (result !== true) {
            error.value = result; // Birinchi xatoni ushlaymiz
            return false;
        }
    }
    error.value = ''; // Xato yo'q
    return true;
};

const formContext = inject('formContext', null);

const resetValidation = () => {
    error.value = '';
};

onMounted(() => {
    if (formContext) {
        formContext.registerInput({ validate, resetValidation });
    }
});

onUnmounted(() => {
    if (formContext) {
        formContext.unregisterInput({ validate, resetValidation });
    }
});

watch(() => props.modelValue, () => {
    if (error.value) validate(); 
});

defineExpose({ validate, resetValidation });

defineEmits(['update:modelValue'])
</script>

<template>
    <div class="space-y-2 w-full">
        <label v-if="label" class="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
            {{ label }}<span v-if="required" class="text-rose-500">*</span>
        </label>
        <div class="relative group">
            <div v-if="icon || $slots.icon" class="absolute text-slate-500 left-4 top-1/2 -translate-y-1/2 ...">
                <slot name="icon">
                    <component :is="icon" :size="18" />
                </slot>
            </div>
            <input 
                    :type="type"
                    :value="modelValue"
                    @input="$emit('update:modelValue', $event.target.value)"
                    :placeholder="placeholder"
                    class="w-full bg-slate-800/40 border border-slate-700/50 rounded-2xl py-3.5 px-4 text-slate-200 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all placeholder:text-slate-600"
                    :class="[icon ? 'pl-12' : '', error ? 'border-rose-500/50 focus:border-rose-500' : ''

                    ]">
        </div>
        <p v-if="error" class="text-[10px] text-rose-500 font-bold ml-1 uppercase tracking-tight">{{ error }}</p>
    </div>
</template>