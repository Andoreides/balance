import React from 'react';
import './SearchString.css';
import {useDispatch, useSelector} from "react-redux";
import {CHANGE_INPUT_VALUE} from "../../store/inputReducer";

const SearchString = () => {
    const {inputSearch} = useSelector((store) => store.inputState)
    const dispatch = useDispatch();

    const handleChangeInput = (value) => {
        dispatch({type: CHANGE_INPUT_VALUE, payload: value})
    };

    return (
        <div className={'search__container'}>
            <input type={'text'} className={'search__input'} placeholder={'Поиск'} value={inputSearch} onChange={(e)=>handleChangeInput(e.target.value)} />
        </div>
    );
};

export default SearchString;