const STORES = {
  "executive-staff": () => useExecutiveStaffStore(),
  staff: () => useExecutiveStaffStore(),
  referee: () => useRefereeStore(),
  provider: () => useProviderStore(),
  document: () => useDocumentStore(),
  course: () => useCourseStore(),
};

export const useStore = (name) => STORES[name]();
