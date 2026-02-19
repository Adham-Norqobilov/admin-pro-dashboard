
   export const  required =  v => !!v || 'Ushbu maydonni to\'ldirish shart!';
    export const email = v => /.+@.+\..+/.test(v) || 'Email formati noto\'g\'ri!';
    export const min = (v, len) => (v && v.length >= len) || `Kamida ${len} ta belgi bo'lishi kerak!`;