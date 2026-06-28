import { create } from 'zustand'

export const useServiceCallStore = create((set) => ({
  serviceCalls: [],
  selectedServiceCall: null,
  setServiceCalls: (serviceCalls) => set({ serviceCalls }),
  setSelectedServiceCall: (serviceCall) => set({ selectedServiceCall: serviceCall }),
}))
