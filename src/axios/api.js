import {instance} from "./axios";
import axios from "axios";

const instanceProducts = axios.create({
    baseURL: 'https://fakestoreapi.com/products',
})

const  Service =  {
    getProducts: ()=>{
        return instance.get('products')
            .then(res => res.data)
    },
    getCategories: ()=>{
        return instanceProducts.get('/categories')
            .then(res => res.data)
    },
}
export default Service;