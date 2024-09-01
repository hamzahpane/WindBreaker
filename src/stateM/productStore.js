// File Store.js
import { create } from 'zustand';

export const useStoreproduct = create((set) => ({
    selectedProducts: [],
    addSelectedProduct: (product) => { 
        set((state) => {
            const existingProduct = state.selectedProducts.find(p => p._id === product._id);
            if (existingProduct) {
                return {
                    selectedProducts: state.selectedProducts.map(p =>
                        p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
                    ),
                };
            }
            return {
                selectedProducts: [...state.selectedProducts, { ...product, quantity: 1 }],
            };
        });
    },
    removeSelectedProduct: (productId) => {
        set((state) => ({
            selectedProducts: state.selectedProducts.filter(product => product._id !== productId),
        }));
    },
    incrementProductQuantity: (productId) => {
        set((state) => ({
            selectedProducts: state.selectedProducts.map(p =>
                p._id === productId ? { ...p, quantity: p.quantity + 1 } : p
            ),
        }));
    },
    decrementProductQuantity: (productId) => {
        set((state) => ({
            selectedProducts: state.selectedProducts.map(p =>
                p._id === productId ? { ...p, quantity: Math.max(p.quantity - 1, 1) } : p
            ),
        }));
    },
    clearAllSelectedProducts: () => {
        set({ selectedProducts: [] });
    },
    getProductCount: () => {
        return useStoreproduct.getState().selectedProducts.reduce((total, product) => total + product.quantity, 0);
    },
}));
