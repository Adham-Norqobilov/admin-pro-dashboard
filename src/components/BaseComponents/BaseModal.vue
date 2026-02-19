<script setup>
import { X } from 'lucide-vue-next';
defineProps({ isOpen: Boolean, title: String });
defineEmits(['close']);
</script>

<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" @click="$emit('close')"></div>

                <div
                    class="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden animate-modal-pop">
                    <div class="p-8">
                        <div class="flex justify-between items-center mb-8">
                            <h3 class="text-xl font-black text-white tracking-tight">{{ title }}</h3>
                            <button @click="$emit('close')"
                                class="p-2 hover:bg-slate-800 rounded-xl text-slate-500 transition-colors">
                                <X :size="20" />
                            </button>
                        </div>
                        <slot></slot>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
@keyframes modal-pop {
  from { opacity: 0; transform: scale(0.95) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
.animate-modal-pop { animation: modal-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
</style>