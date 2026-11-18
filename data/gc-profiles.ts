export interface GcProfile {
  image: string
  age: number
  state: string
  previousBirths: number
  partnered: number
  status: string
}

export const gcProfiles: GcProfile[] = [
  {
    image: '/images/pages/be-surrogate/gc-profiles/gc-01.png',
    age: 28,
    state: 'CA',
    previousBirths: 1,
    partnered: 2026,
    status: 'Complete embryo transfer',
  },
  {
    image: '/images/pages/be-surrogate/gc-profiles/gc-02.png',
    age: 31,
    state: 'AR',
    previousBirths: 3,
    partnered: 2024,
    status: 'Finish the journey',
  },
  {
    image: '/images/pages/be-surrogate/gc-profiles/gc-03.png',
    age: 27,
    state: 'PA',
    previousBirths: 2,
    partnered: 2025,
    status: 'Finish the journey',
  },
  {
    image: '/images/pages/be-surrogate/gc-profiles/gc-04.png',
    age: 30,
    state: 'CA',
    previousBirths: 3,
    partnered: 2026,
    status: 'Confirmed pregnancy',
  },
]
