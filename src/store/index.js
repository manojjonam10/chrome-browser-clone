import {configureStore, createSlice} from "@reduxjs/toolkit";

const DataSlice = createSlice({
    name:'chromeModule',
    initialState: {
        currentTab:0,
        loading:false,
        currentURL:'',
        URLList:[],
        tabs:[{
            selectedIndex:0,
            url:[''],
        }]
    },
    reducers: {
        setURL (state,action){
            state.currentURL = action.payload
        },
        setTabList (state,action){
            state.tabs = action.payload
        },
        setTabIndex (state,action){
            state.currentTab = action.payload
        },
        setLoading (state,action){
            state.loading = action.payload
        },
        setURLList (state,action){
            state.URLList.push(action.payload)
        },
    },
    extraReducers: {
    }

})


const store = configureStore({
    reducer: {chromeData: DataSlice.reducer}
})
export const chromeActions = DataSlice.actions;

export default store
