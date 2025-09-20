import { Country, State } from 'country-state-city'

export const getAllCountries = () => {
  return Country.getAllCountries().map(country => ({
    value: country.isoCode,
    label: country.name,
    phoneCode: `+${country.phonecode}`,
    flag: country.flag
  }))
}

export const getStatesByCountry = (countryCode) => {
  if (!countryCode) return []
  
  return State.getStatesOfCountry(countryCode).map(state => ({
    value: state.isoCode,
    label: state.name
  }))
}

export const getCountryByCode = (countryCode) => {
  const country = Country.getCountryByCode(countryCode)
  return country ? {
    value: country.isoCode,
    label: country.name,
    phoneCode: `+${country.phonecode}`,
    flag: country.flag
  } : null
}

export const getPhoneCodeByCountry = (countryCode) => {
  const country = Country.getCountryByCode(countryCode)
  return country ? `+${country.phonecode}` : ''
}