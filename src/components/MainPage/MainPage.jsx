import '../../App.css';
import SearchString from '../SearchString/SearchString'
import React, {useEffect, useState} from "react";
import Service from "../../axios/api";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {ADD_PRODUCT, getCategoriesThunk, LOAD_PRODUCT} from "../../store/reducer";

function MainPage() {
    const {inputSearch} = useSelector((store) => store.inputState)
    const {categories} = useSelector((store) => store.basketState)
    const [productsApi, setProductsApi] = useState([])
    const [products, setProducts] = useState([])
    const [basketProducts, setBasketProducts] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        Service.getProducts()
            .then(res => {
                setProductsApi(res)
                setProducts(res)
                dispatch({type: LOAD_PRODUCT, payload: res})
            })
        dispatch(getCategoriesThunk());
    }, [])

    const handleButtonNext = (item) => {
        navigate(`/${item}`)
    }

    const handleAddProduct = (item) => {
        setBasketProducts([...basketProducts, item])
        dispatch({type: ADD_PRODUCT, payload: item});
    }

    const fullList = productsApi.map((item)=>{
        return (
            <div id={item.id} key={item.id} className={'card'} category={item.category} >
                <h3 className={'card__title'} >{item.title}</h3>
                <div className={'card__add'}>
                    <p className={'card__price'}>Price: {item.price} $</p>
                    <button onClick={(e)=>handleAddProduct(item)} className={'card__button-add'}>В корзину</button>
                </div>
                <button className={'card__zoom'} onClick={()=>handleButtonNext(item.id)}><img className={'card__image'} src={item.image} /></button>
            </div>
        )
    });

    const searchedFullList = products?.filter((item)=>{
        return item.title.toLowerCase().includes(inputSearch.toLowerCase());
    });

    const searchedListMaped = searchedFullList.map((item)=>{
        return (
            <div id={item.id} key={item.id} className={'card'} category={item.category} >
                <h3 className={'card__title'} >{item.title}</h3>
                <div className={'card__add'}>
                    <p className={'card__price'}>Price: {item.price} $</p>
                    <button onClick={(e)=>handleAddProduct(item)} className={'card__button-add'}>В корзину</button>
                </div>
                <button className={'card__zoom'} onClick={()=>handleButtonNext(item.id)}><img className={'card__image'} src={item.image} /></button>
            </div>
        )
    });

    const sortByCategory = (category) => {
        if (category === 'electronics') {
            const sortedByElectronic = products.filter(product =>product.category === 'electronics')
            setProductsApi(sortedByElectronic)
        }
        if (category === 'jewelery') {
            const sortedByJewerely = products.filter(product =>product.category === 'jewelery')
            setProductsApi(sortedByJewerely)
        }
        if (category === 'men\'s clothing') {
            const sortedByMens = products.filter(product =>product.category === 'men\'s clothing')
            setProductsApi(sortedByMens)
        }
        if (category === 'women\'s clothing') {
            const sortedByWomen = products.filter(product =>product.category === 'women\'s clothing')
            setProductsApi(sortedByWomen)
        }
    }

    const returnFullList = () => {
        setProductsApi(products)
    };

    const filterPriceDescending = () => {
        setProductsApi([...productsApi].sort(function (a, b) {
            return b.price - a.price;
        }))    };

    const filterPriceAscending = () => {
        setProductsApi([...productsApi].sort(function (a, b) {
            return a.price - b.price;
        }))
    };

    return (
            <div className="App-header">
                <SearchString />
                <div className="basket__link">
                    <Link to={'/basket'}><img className={'basket__image'} src={'https://img.icons8.com/?size=512&id=nugKO6X85KMJ&format=png'} alt={'корзина'} /></Link>
                </div>
                <div className="products">
                    <div className="products__category">
                        <button className="products__button" onClick={returnFullList} >Весь ассортимент</button>
                        {categories.map((category, index) =>{
                            return <button className="products__button" onClick={()=>sortByCategory(category)} key={index} >{category}</button>
                        })}
                    </div>
                    <div className="products__filter">
                        <button className="products__button margin-right" onClick={filterPriceDescending} >Цена по убыванию</button>
                        <button className="products__button" onClick={filterPriceAscending}>Цена по возрастанию</button>
                    </div>
                    <div className="products__cards">
                        {inputSearch ? searchedListMaped : fullList}
                    </div>
                </div>
           </div>
    );
}

export default MainPage;
