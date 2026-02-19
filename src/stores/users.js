import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUserStore = defineStore('user', () => {
    // --- STATE ---

    const currentUser = ref({
        id: 1,
        name: 'Adham',
        surname: 'Norqobilov',
        email: 'adhamnorqobilov2@gmail.com',
        role: 'Super Admin',
        avatar: 'AN'
    })

    const users = ref([
        { id: 1, name: 'Adham Norqobilov', email: 'adhamnorqobilov2@gmail.com', role: 'Super Admin', status: 'active', avatar: 'AN' },
        { id: 2, name: 'Sardor Olimov', email: 'sardor@dev.uz', role: 'Developer', status: 'inactive', avatar: 'SO' },
        { id: 3, name: 'Laylo Karimova', email: 'laylo@hr.uz', role: 'Manager', status: 'inactive', avatar: 'LK' },
        { id: 4, name: 'Javohir Toirov', email: 'java@support.uz', role: 'Support', status: 'active', avatar: 'JT' },
    ]);

    const searchQuery = ref('');
    const loading = ref(false);


    const filteredUsers = computed(() => {
        if (!searchQuery.value) return users.value;

        const query = searchQuery.value.toLowerCase();

        return users.value.filter((user) =>
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query)
        );
    });

    const totalUsers = computed(() => users.value.length);
    const activeUsers = computed(() => users.value.filter(u => u.status === 'active').length);



    const updateProfile = (newData) => {
        currentUser.value.name = newData.name;
        currentUser.value.surname = newData.surname;
        currentUser.value.role = newData.role;

        const fullName = `${newData.name} ${newData.surname}`;
        const initials = newData.name[0] +(newData.surname ? newData.surname[0] : '');
        currentUser.value.avatar = initials.toUpperCase()

        const myIndex = users.value.findIndex(u => u.id === currentUser.value.id);
        if(myIndex !== -1) {
            users.value[myIndex].name = fullName;
            users.value[myIndex].avatar = currentUser.value.avatar;
        }
    }

    const addUser = async (user) => {
        loading.value = true;

        await new Promise(resolve => setTimeout(resolve, 800));

        const newId = Date.now();

        const initials = user.name
            .split(' ')
            .map(n => n ? n[0] : '')
            .join('')
            .toUpperCase();

        users.value.unshift({
            id: newId,
            ...user,
            avatar: initials || '?'
        });

        loading.value = false;
    };

    const deleteUser = (id) => {
        users.value = users.value.filter(user => user.id !== id);
    };

    const updateUser = (id, updatedData) => {
        const index = users.value.findIndex(u => u.id === id);
        if (index !== -1) {
            users.value[index] = { ...users.value[index], ...updatedData };
        }

        if(id === currentUser.value.id){
            const names =updatedData.name.split(' ');
            currentUser.value.name = names[0];
            currentUser.value.surname = names.slice(1).join(' ')
        }
    };

    return {
        currentUser,
        users,
        searchQuery,
        loading,
        filteredUsers,
        totalUsers,
        activeUsers,
        updateProfile,
        addUser,
        deleteUser,
        updateUser
    };
});