import Service from "../axios/api";

const SET_CATEGORY = 'SET_CATEGORY';

const initialState = {
    basketProductsList: [],
    initialProducts: [],
    categories: [],
};

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const LOAD_PRODUCT = 'LOAD_PRODUCT';

export const reducer = (state= initialState, action) => {
    switch (action.type){
        case ADD_PRODUCT: {
            return {...state, basketProductsList: [...state.basketProductsList, action.payload]}
        }
        case REMOVE_PRODUCT: {
            return {...state, basketProductsList: action.payload}
        }
        case LOAD_PRODUCT : {
            return {...state, initialProducts: action.payload}
        }
        case SET_CATEGORY: {
            return {
                ...state,
                categories: [...action.payload]
            }
        }
        default: {return state}
    }
}

export const getCategoriesAC = (categories) => ({type: SET_CATEGORY, payload: categories})

export const getCategoriesThunk = () => {
    return (dispatch) => {
        Service.getCategories()
            .then((res)=>{
                dispatch(getCategoriesAC(res));
            })
            .catch((err)=>console.log("get_categories_error",err))
    }
}