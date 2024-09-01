import { create } from 'zustand';

const toggleIsOpen = create((set, get) => ({
    isOpen: false,
    setIsOpen: (value) => set({ isOpen: value }),
}));


export default toggleIsOpen;
