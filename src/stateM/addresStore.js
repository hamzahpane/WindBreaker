import { create } from 'zustand';

export const useAddressStore = create((set) => ({
    address: {
    kecamatan: '',
    kelurahan: '',
    kabupaten: '',
    alamat :''
},

setAddress: (newAddress) => set({ address: newAddress }),
updateAddressField: (field, value) => set((state) => ({
    address: {
    ...state.address,
    [field]: value
    }
    })),
    clearAddress: () => set({
    address: {
    kecamatan: '',
    kelurahan: '',
    kabupaten: '',
    alamat :''
    }
})
}));
