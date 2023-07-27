import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import './Card.css';

const Card = () => {
    const params = useParams();
    const {initialProducts} = useSelector((store) => store.basketState)
    const id = Number(params.id);
    const cardToShow = initialProducts.find((item) => item.id === id);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };

    return (
        <div className={'zoom__container'}>
            <h2 className={'zoom__title'}>{cardToShow.title}</h2>
            <p className={'zoom__price'}>Цена: {cardToShow.price}</p>
            <p className={'zoom__description'}>{cardToShow.description}</p>
            <img src={cardToShow.image} alt={'картинка'} className={'zoom__image'} />
            <button onClick={handleClick} className={'zoom__button-back'}>Назад</button>
        </div>
    );
};

export default Card;