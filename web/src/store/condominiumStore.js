import { create } from 'zustand'

export const useCondominiumStore = create((set) => ({
  condominiums: [],
  selectedCondominium: null,
  setCondominiums: (condominiums) => set({ condominiums }),
  setSelectedCondominium: (condominium) => set({ selectedCondominium: condominium }),
}))
