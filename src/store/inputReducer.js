const initialStore = {
    inputSearch: '',
};

export const CHANGE_INPUT_VALUE = 'CHANGE_INPUT_VALUE';

export const inputReducer = (state = initialStore, action) =>{
    switch (action.type) {
        case CHANGE_INPUT_VALUE:{
            return {...state, inputSearch: action.payload};
        }
        default: {return state};
    }
}

