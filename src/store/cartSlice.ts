import { ProductTypes } from "@/app/utils/api/ProductApi";
import { createSlice, current } from "@reduxjs/toolkit";

export interface CartItem {
    quantity: number; 
    product: any;
}

interface ICartState {
    products: Array<CartItem>
    isCartNotificationOpen: boolean,
}

const initialState: ICartState = {
   products: [],
   isCartNotificationOpen: false 
};

export const cartSlice = createSlice({ 
    name: "auth",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const currentState = current(state);
            let foundIndex:number;
            if ( product.type === ProductTypes.webinar ) {
                foundIndex = currentState.products.findIndex((item) => item.product.type === action.payload.type && item.product.id === action.payload.id && item.product.selectedDate.value === action.payload.selectedDate.value)
            } else {
                foundIndex = currentState.products.findIndex((item) => item.product.type === action.payload.type && item.product.id === action.payload.id)
            }

            if ( foundIndex !== -1 ) {
                state.isCartNotificationOpen = true;
             } else {
                state.products = [...currentState.products, { quantity: 1, product: action.payload}];
             }
         
        },
        updateCart: (state, action) => {
            state.products = action.payload
        },
        removeFromCart: (state, action) => {
            const product = action.payload;
            const currentState = current(state);
            const tmpItems = [...currentState.products]
            let foundIndex:number;

            if ( product.productType === ProductTypes.webinar ) {
                foundIndex = currentState.products.findIndex((item) => item.product.type === action.payload.productType && item.product.id === action.payload.productId && item.product.selectedDate.value === action.payload.eventDateId)
            } else {
                foundIndex = currentState.products.findIndex((item) => item.product.type === action.payload.productType && item.product.id === action.payload.productId)
            }
            
            if ( foundIndex !== -1 && tmpItems[foundIndex].quantity !== 1 ) {
                tmpItems[foundIndex] = { ...tmpItems[foundIndex], quantity: tmpItems[foundIndex].quantity - 1 }
                state.products = tmpItems;
             } else {   
           
                if ( action.payload.productType === ProductTypes.webinar ) {
                    state.products = tmpItems.filter((item) => !(item.product.type === action.payload.productType && item.product.id === action.payload.productId && item.product.selectedDate.value === action.payload.eventDateId))
                } else {
                    state.products = tmpItems.filter((item) => !(item.product.type === action.payload.productType && item.product.id === action.payload.productId))
                }
             }
        },
        openCloseAlreadyInCartNotification: (state, action) => {
            state.isCartNotificationOpen = !state.isCartNotificationOpen
        }
    }
})

export const { addToCart, removeFromCart, openCloseAlreadyInCartNotification, updateCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;