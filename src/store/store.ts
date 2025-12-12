
import type { PayloadAction } from "@reduxjs/toolkit";
import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

/**
 * Sample counter slice
 */
type CounterState = { value: number };
const initialCounterState: CounterState = { value: 0 };

export const counterSlice = createSlice({
    name: "counter",
    initialState: initialCounterState,
    reducers: {
        increment(state) {
            state.value += 1;
        },
        decrement(state) {
            state.value -= 1;
        },
        incrementByAmount(state, action: PayloadAction<number>) {
            state.value += action.payload;
        },
    },
});

/**
 * Sample async thunk + user slice
 */
type User = {
    id: number;
    name: string;
    email?: string;
};

type UserState = {
    data?: User;
    status: "idle" | "loading" | "succeeded" | "failed";
    error?: string;
};

const initialUserState: UserState = {
    data: undefined,
    status: "idle",
    error: undefined,
};

// Example async thunk that fetches a user from a public API
export const fetchUserById = createAsyncThunk<User, number, { rejectValue: string }>(
    "user/fetchById",
    async (userId, { rejectWithValue }) => {
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
            if (!res.ok) {
                return rejectWithValue(`Failed to fetch user: ${res.statusText}`);
            }
            const json = (await res.json()) as User;
            return json;
        } catch (err) {
            return rejectWithValue(String(err));
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        clearUser(state) {
            state.data = undefined;
            state.status = "idle";
            state.error = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserById.pending, (state) => {
                state.status = "loading";
                state.error = undefined;
            })
            .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<User>) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload ?? action.error.message;
            });
    },
});

/**
 * Configure store
 */
export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        user: userSlice.reducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // default
});

/**
 * Types for usage throughout the app
 */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/**
 * Typed hooks (if using React + react-redux)
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Exports for components
 */
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const { clearUser } = userSlice.actions;
export default store;