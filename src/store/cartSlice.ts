import { createSlice } from "@reduxjs/toolkit";

interface ICartState {
    products: Array<any>
}

const initialState: ICartState = {
   products: []
};

export const cartSlice = createSlice({ 
    name: "auth",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.products = [...state.products, action.payload]
        },
        removeFromCart: (state, action) => {
            const filteredProducts = state.products.filter((product ) => {
                if (product?.selectedDate?.value) {
                    if (product.id === action.payload.productId ) {
                        if ( product.selectedDate.value === action.payload.eventDateId ) {
                            return false
                        }
                        return true
                    }
                    return true
                } else {
                    return product.id !== action.payload.productId
                }
                
            })

            state.products = [...filteredProducts]
        }
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;