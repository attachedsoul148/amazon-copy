import { BasketType } from '@/typed'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const basketSlice = createSlice({
    name: 'basketSlice',
    initialState: {
        items: [] as BasketType[],
        totalPrice: 0,
        totalCount: 0,
    },
    reducers: {
        addToBasket: (state, action: PayloadAction<BasketType>) => {
            const index = state.items.findIndex(el => el.id === action.payload.id)
            if (index >= 0) {
                state.items = [...state.items].map((el, i) => i === index ? { ...el, count: el.count + 1 } : el)
            } else {
                state.items = [...state.items, action.payload]
            }
            state.totalPrice = state.items.reduce((acc, el) => acc + (el.count * el.price), 0)
            state.totalCount = state.items.reduce((acc, el) => acc + el.count, 0)
        },
        removeFromBasket: (state, action: PayloadAction<number>) => {
            const findEl = state.items.find((el) => el.id === action.payload)
            if (findEl) {
                if (findEl.count > 1) {
                    state.items = [...state.items].map((el, i) => el.id === findEl.id ? { ...el, count: el.count - 1 } : el)
                } else {
                    state.items = state.items.filter((el) => el.id !== action.payload)
                }
            }
            state.totalPrice = state.items.reduce((acc, el) => acc + (el.count * el.price), 0)
            state.totalCount = state.items.reduce((acc, el) => acc + el.count, 0)
        },
    }
})

export const { addToBasket, removeFromBasket } = basketSlice.actions
export default basketSlice.reducer


