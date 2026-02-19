<script setup>
import { ref, watch } from 'vue';

const selectedTime = ref('7');

const chartOptions = ref({
  chart: { type: 'area', toolbar: { show: false }, background: 'transparent' },
  colors: ['#10b981'], 
  stroke: { curve: 'smooth', width: 3 },
  xaxis: {
    categories: ['Du', 'Se', 'Chor', 'Pay', 'Ju', 'Sha', 'Yak'],
    labels: { style: { colors: '#94a3b8' } },
    axisBorder: { show: false },
    axisTicks: { show: false }
  },
  grid: { borderColor: '#334155', strokeDashArray: 4 },
  fill: { type: 'gradient', gradient: { opacityFrom: 0.4, opacityTo: 0 } },
  dataLabels: { enabled: false },
  tooltip: { theme: 'dark' }
});

const dataSets = {
  '7': [31, 40, 28, 51, 42, 109, 100],
  '30': [45, 52, 38, 24, 33, 100, 21, 20, 15, 10, 40, 60, 80, 50, 100, 120, 160, 140, 110, 120, 130, 140, 150, 120, 110, 90, 70, 60, 100, 120]
};

const series = ref([{
  name: 'Sotuvlar',
  data: dataSets['7']
}]);


watch(selectedTime, (newValue) => {
  
  series.value = [{
    name: 'Sotuvlar',
    data: dataSets[newValue]
  }];

  
  if (newValue === '30') {
    chartOptions.value = { 
      ...chartOptions.value, 
      xaxis: { ...chartOptions.value.xaxis, categories: Array.from({length: 30}, (_, i) => i + 1) } 
    };
  } else {
    chartOptions.value = { 
      ...chartOptions.value, 
      xaxis: { ...chartOptions.value.xaxis, categories: ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sha', 'Yak'] } 
    };
  }
});
</script>

<template>
  <div class="bg-slate-900 border border-slate-800 p-6 rounded-3xl h-full">
    <div class="flex items-center justify-between mb-6">
      <h4 class="text-white font-bold text-lg">Statistika</h4>
      
      <select 
        v-model="selectedTime" 
        class="bg-slate-800 text-slate-400 text-xs border-none rounded-lg px-3 py-1.5 outline-none cursor-pointer"
      >
        <option value="7">Oxirgi 7 kun</option>
        <option value="30">Oxirgi 30 kun</option>
      </select>
    </div>
    
    <div class="relative h-75">
      <Transition name="fade-slide" mode="out-in">
        <apexchart :key="selectedTime" type="area" height="300" :options="chartOptions" :series="series"></apexchart>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active{
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); 
}
.fade-slide-enter-from{
  opacity: 0;
  transform: translateY(20px) scale(0.98);
  filter: blur(10px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(1.02);
  filter: blur(10px);
}

</style>
