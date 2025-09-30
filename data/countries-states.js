import { Country, State } from 'country-state-city'

export function getAllCountries() {
  return Country.getAllCountries().map(country => ({
    value: country.isoCode,
    label: country.name,
    phoneCode: `+${country.phonecode}`,
    flag: country.flag,
  }))
}

export function getStatesByCountry(countryCode) {
  if (!countryCode)
    return []

  return State.getStatesOfCountry(countryCode).map(state => ({
    value: state.isoCode,
    label: state.name,
  }))
}

export function getCountryByCode(countryCode) {
  const country = Country.getCountryByCode(countryCode)
  return country
    ? {
        value: country.isoCode,
        label: country.name,
        phoneCode: `+${country.phonecode}`,
        flag: country.flag,
      }
    : null
}

export function getPhoneCodeByCountry(countryCode) {
  const country = Country.getCountryByCode(countryCode)
  return country ? `+${country.phonecode}` : ''
}
