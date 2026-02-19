import { defineStore } from "pinia";
import {ref} from 'vue'

export const useSearchStore = defineStore('search', () => {

    const searchQuery = ref('')

    const setSearchQuery = (val)=> {
        searchQuery.value =val
    }

    return {searchQuery, setSearchQuery}
})