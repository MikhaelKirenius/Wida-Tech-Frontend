import {configureStore} from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import invoicesSlice from './invoicesSlice';
import formReducer from './formSlice';
import revenueSlice from './revenueSlice';
import summarySlice from './summarySlice';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        invoices: invoicesSlice,
        form: formReducer,
        revenue: revenueSlice,
        summary: summarySlice,
    },
});