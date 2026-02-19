import { defineStore } from "pinia";
import {ref} from 'vue'

export const useUIStore =defineStore('ui', () => {
    const isDark = ref(localStorage.getItem('theme') === 'dark')

    const toggleTheme =() => {
        isDark.value =! isDark.value

        localStorage.setItem("theme", isDark.value ? 'light' : 'dark')
        applyTheme()
    }

    const applyTheme = () => {
        if(isDark.value){
            document.documentElement.classList.remove('dark')
        }else{
            document.documentElement.classList.add('dark')
        }
    }

    return {isDark, toggleTheme, applyTheme}
})