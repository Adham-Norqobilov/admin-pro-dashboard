import { defineStore } from "pinia";
import {ref} from 'vue'

export const useUIStore =defineStore('ui', () => {
    const isDark = ref(localStorage.getItem('theme') === 'dark')

    
    const toggleTheme =() => {
        isDark.value =! isDark.value
        
        localStorage.setItem("theme", isDark.value ? 'dark' : 'light')
        applyTheme()
    }
    
    const applyTheme = () => {
        if(isDark.value){
            document.documentElement.classList.add('dark')
        }else{
            document.documentElement.classList.remove('dark')
        }
    }
    
    applyTheme();
    return {isDark, toggleTheme, applyTheme}
})