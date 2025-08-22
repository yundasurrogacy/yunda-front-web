<template>
  <div class="w-full">
    <label v-if="label" class="block mb-2.5">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="flex gap-2">
      <!-- Country Code Selector -->
      <div class="relative w-30">
        <button
          type="button"
          @click="showDropdown = !showDropdown"
          class="w-full h-15 px-3 flex items-center justify-between text-4 bg-[rgba(234.35,232.57,208.37,0.20)] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] bg-blend-overlay rounded-2.5 backdrop-blur-5 border-none outline-none focus:ring-2 focus:ring-[var(--grayish-green)] transition-all cursor-pointer"
        >
          <div class="flex items-center gap-2">
            <span class="text-5">{{ selectedCountry.flag }}</span>
            <span class="font-semibold">{{ selectedCountry.phoneCode }}</span>
          </div>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" :class="{ 'rotate-180': showDropdown }">
            <path d="M4 6L8 10L12 6" stroke="#1E1E1E" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        
        <!-- Dropdown -->
        <div v-if="showDropdown" class="absolute top-full mt-1 w-60 max-h-80 overflow-y-auto bg-[#FFFCF6] border border-[rgba(132,133,112,0.2)] rounded-2.5 shadow-xl z-50">
          <!-- Search Box -->
          <div class="p-3 border-b border-[rgba(132,133,112,0.2)]">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search country..."
              class="w-full h-8 px-3 text-3.5 bg-[rgba(234.35,232.57,208.37,0.20)] rounded-2 border-none outline-none focus:ring-2 focus:ring-[var(--grayish-green)]"
              @click.stop
            />
          </div>
          
          <!-- Country List -->
          <div class="py-1">
            <button
              v-for="country in filteredCountries"
              :key="country.value"
              type="button"
              @click="selectCountry(country)"
              class="w-full px-3 py-2 flex items-center gap-3 hover:bg-[rgba(132,133,112,0.1)] transition-colors text-left"
            >
              <span class="text-4">{{ country.flag }}</span>
              <span class="font-semibold text-3.5">{{ country.phoneCode }}</span>
              <span class="text-3.5 text-gray-600">{{ country.value }}</span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Phone Number Input -->
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        type="tel"
        :placeholder="placeholder"
        :required="required"
        class="flex-1 h-15 px-4 bg-[rgba(234.35,232.57,208.37,0.20)] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] bg-blend-overlay rounded-2.5 backdrop-blur-5 border-none outline-none focus:ring-2 focus:ring-[var(--grayish-green)] transition-all placeholder:text-black/60"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { getAllCountries, getCountryByCode } from '~/data/countries-states'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  countryCode: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  defaultCountry: {
    type: String,
    default: 'US'
  }
})

const emit = defineEmits(['update:modelValue', 'update:countryCode'])

const showDropdown = ref(false)
const searchQuery = ref('')
const countries = getAllCountries()

const selectedCountry = ref(
  getCountryByCode(props.defaultCountry) || countries[0]
)

const filteredCountries = computed(() => {
  if (!searchQuery.value) return countries
  
  const query = searchQuery.value.toLowerCase()
  return countries.filter(country => 
    country.label.toLowerCase().includes(query) ||
    country.value.toLowerCase().includes(query) ||
    country.phoneCode.includes(query)
  )
})

const selectCountry = (country) => {
  selectedCountry.value = country
  emit('update:countryCode', country.phoneCode)
  showDropdown.value = false
  searchQuery.value = ''
}

// Initialize with default country
if (props.defaultCountry) {
  const defaultCountryData = getCountryByCode(props.defaultCountry)
  if (defaultCountryData) {
    selectedCountry.value = defaultCountryData
    emit('update:countryCode', defaultCountryData.phoneCode)
  }
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    showDropdown.value = false
  }
}

watch(showDropdown, (isOpen) => {
  if (isOpen) {
    document.addEventListener('click', handleClickOutside)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
})

// Update selected country when default country prop changes
watch(() => props.defaultCountry, (newCountry) => {
  const country = getCountryByCode(newCountry)
  if (country) {
    selectedCountry.value = country
    emit('update:countryCode', country.phoneCode)
  }
})
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
  transition: transform 0.2s;
}
</style>