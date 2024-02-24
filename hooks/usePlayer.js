import { create } from 'zustand'

const usePlayer = create((set) => ({
    ids: [],
    activeId: 0,
    setId: (id) => set({ activeId: id }),
    setIds: (ids) => set({ ids: ids }),
    reset: () => set({ ids: [], activeId: undefined })
}));

export default usePlayer;