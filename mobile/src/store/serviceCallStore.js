import { create } from 'zustand';

export const useServiceCallStore = create((set) => ({
  serviceCalls: [],
  selectedServiceCall: null,
  categories: [],
  setServiceCalls: (serviceCalls) => set({ serviceCalls }),
  setSelectedServiceCall: (serviceCall) => set({ selectedServiceCall: serviceCall }),
  setCategories: (categories) => set({ categories }),
}));
