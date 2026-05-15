<script setup>
import { computed, ref, watch } from 'vue'
import { getAllCountries, getCountryByCode } from '~/data/countries-states'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  countryCode: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  defaultCountry: {
    type: String,
    default: 'US',
  },
})

const emit = defineEmits(['update:modelValue', 'update:countryCode'])

const showDropdown = ref(false)
const searchQuery = ref('')
const countries = getAllCountries()

const selectedCountry = ref(
  getCountryByCode(props.defaultCountry) || countries[0],
)

const filteredCountries = computed(() => {
  if (!searchQuery.value)
    return countries

  const query = searchQuery.value.toLowerCase()
  return countries.filter(country =>
    country.label.toLowerCase().includes(query)
    || country.value.toLowerCase().includes(query)
    || country.phoneCode.includes(query),
  )
})

function selectCountry(country) {
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
function handleClickOutside(event) {
  if (!event.target.closest('.relative')) {
    showDropdown.value = false
  }
}

watch(showDropdown, (isOpen) => {
  if (isOpen) {
    document.addEventListener('click', handleClickOutside)
  }
  else {
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

<template>
  <div class="w-full">
    <label v-if="label" class="mb-2.5 block">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="flex gap-2">
      <!-- Country Code Selector -->
      <div class="relative w-30">
        <button
          type="button"
          class="h-15 w-full flex cursor-pointer items-center justify-between rounded-2.5 border-none bg-[rgba(234.35,232.57,208.37,0.20)] px-3 text-4 bg-blend-overlay shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] outline-none backdrop-blur-5 transition-all focus:ring-2 focus:ring-[var(--yunda-bark)]"
          @click="showDropdown = !showDropdown"
        >
          <div class="flex items-center gap-2">
            <span class="text-5">{{ selectedCountry.flag }}</span>
            <span class="font-semibold">{{ selectedCountry.phoneCode }}</span>
          </div>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" :class="{ 'rotate-180': showDropdown }">
            <path d="M4 6L8 10L12 6" stroke="#1E1E1E" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <!-- Dropdown -->
        <div v-if="showDropdown" class="absolute top-full z-50 mt-1 max-h-80 w-60 overflow-y-auto border border-[rgba(132,133,112,0.2)] rounded-2.5 bg-[#FFFCF6] shadow-xl">
          <!-- Search Box -->
          <div class="border-b border-[rgba(132,133,112,0.2)] p-3">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search country..."
              class="h-8 w-full rounded-2 border-none bg-[rgba(234.35,232.57,208.37,0.20)] px-3 text-3.5 outline-none focus:ring-2 focus:ring-[var(--yunda-bark)]"
              @click.stop
            >
          </div>

          <!-- Country List -->
          <div class="py-1">
            <button
              v-for="country in filteredCountries"
              :key="country.value"
              type="button"
              class="w-full flex items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-[rgba(132,133,112,0.1)]"
              @click="selectCountry(country)"
            >
              <span class="text-4">{{ country.flag }}</span>
              <span class="text-3.5 font-semibold">{{ country.phoneCode }}</span>
              <span class="text-3.5 text-gray-600">{{ country.value }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Phone Number Input -->
      <input
        :value="modelValue"
        type="tel"
        :placeholder="placeholder"
        :required="required"
        class="h-15 flex-1 rounded-2.5 border-none bg-[rgba(234.35,232.57,208.37,0.20)] px-4 bg-blend-overlay shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] outline-none backdrop-blur-5 transition-all placeholder:text-[var(--yunda-bark)]/60 focus:ring-2 focus:ring-[var(--yunda-bark)]"
        @input="$emit('update:modelValue', $event.target.value)"
      >
    </div>
  </div>
</template>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
  transition: transform 0.2s;
}
</style>
