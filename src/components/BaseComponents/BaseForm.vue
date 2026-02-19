<script setup>
import { ref, provide } from 'vue';

const inputs = ref([]); // Ichki inputlar ro'yxati

const registerInput = (input) => {
    inputs.value.push(input);
};

const unregisterInput = (input) => {
    inputs.value = inputs.value.filter(i => i !== input);
};

const validate = async () => {
    let isAllValid = true;
    
    // Barcha ro'yxatga olingan inputlarning validate funksiyasini chaqiramiz
    for (const input of inputs.value) {
        const isValid = await input.validate();
        if (!isValid) isAllValid = false;
    }
    
    return isAllValid;
};

const resetValidation = () => {
    inputs.value.forEach(input => input.resetValidation());
};

provide('formContext', { registerInput, unregisterInput });

defineExpose({ validate, resetValidation });

</script>

<template>
    <form @submit.prevent>
        <slot />
    </form>
</template>