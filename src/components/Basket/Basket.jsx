import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import './Basket.css';
import {REMOVE_PRODUCT} from "../../store/reducer";

const Basket = () => {
    const {basketProductsList} = useSelector((store) => store.basketState)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [basketList, setBasketList] = useState([]);

    useEffect(()=>{
        setBasketList(basketProductsList)
    },[basketProductsList])

    const handleClickBack = () => {
        dispatch({type: REMOVE_PRODUCT, payload: []});
        navigate('/');
    };

    const handleDeleteProduct = (index) => {
        const updatedBasket = basketList.filter((_,i) => i !== index);
        setBasketList(updatedBasket);
    };

    const productsInBasket = basketList.map((item, index) => {
        return (
            <div className={'product'} key={index}>
                <img className={'product__image'} src={item.image} alt={item.title} />
                <div className={'product__text'}>
                    <p className={'product__title'}>{item.title}</p>
                    <p className={'product__price'}>Цена: {item.price} $</p>
                    <button className={'product__delete'} onClick={(e)=>handleDeleteProduct(index)} >Удалить</button>
                </div>
            </div>
        )
    });

    return (
        <div className={'basket__container'}>
            {basketList.length > 0 && (<button className={'basket__finish'}>Перейти к оформлению</button>) }
            <span className={'basket__amount'}>Товаров в корзине: {basketList.length}</span>
            <div className={'basket__grid'}>
             {basketList.length > 0 ? productsInBasket : (<div className={'basket__amount'}>В корзине пока ничего нет!</div>) }
            </div>
            <button className={'basket__back'} onClick={handleClickBack}>Назад</button>
        </div>
    );
};

export default Basket;