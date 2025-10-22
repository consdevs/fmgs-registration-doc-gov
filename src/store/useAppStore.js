import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Global App Store
 * Manages application-wide state like active sheet, search query, etc.
 */
const useAppStore = create(
  persist(
    (set, get) => ({
      // Active sheet
      activeSheet: 'ทะเบียนหลัก',
      setActiveSheet: (sheetName) => set({ activeSheet: sheetName }),

      // Search
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),

      // Filters
      filters: {
        status: null,
        department: null,
        registrationType: null,
        dateRange: null,
      },
      setFilter: (filterName, value) =>
        set((state) => ({
          filters: {
            ...state.filters,
            [filterName]: value,
          },
        })),
      clearFilters: () =>
        set({
          filters: {
            status: null,
            department: null,
            registrationType: null,
            dateRange: null,
          },
        }),

      // Pagination
      currentPage: 1,
      itemsPerPage: 20,
      setCurrentPage: (page) => set({ currentPage: page }),
      setItemsPerPage: (items) => set({ itemsPerPage: items, currentPage: 1 }),

      // View mode
      viewMode: 'table', // 'table' or 'grid'
      setViewMode: (mode) => set({ viewMode: mode }),

      // Column visibility (per sheet)
      columnVisibility: {},
      setColumnVisibility: (sheetName, columns) =>
        set((state) => ({
          columnVisibility: {
            ...state.columnVisibility,
            [sheetName]: columns,
          },
        })),

      // Sorting
      sortBy: null,
      sortDirection: 'asc', // 'asc' or 'desc'
      setSorting: (field, direction) =>
        set({
          sortBy: field,
          sortDirection: direction,
        }),

      // Loading states
      isLoading: false,
      setIsLoading: (loading) => set({ isLoading: loading }),

      // Error state
      error: null,
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'fmgs-app-storage',
      partialize: (state) => ({
        activeSheet: state.activeSheet,
        itemsPerPage: state.itemsPerPage,
        viewMode: state.viewMode,
        columnVisibility: state.columnVisibility,
      }),
    }
  )
);

export default useAppStore;
