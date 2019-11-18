import axios from 'axios';
import {
    GET_PRODUCTS_BY_SELL,
    GET_PRODUCTS_BY_ARRIVAL,
    GET_BRANDS,
    GET_TYPES
} from './types';
import { PRODUCT_SERVER } from '../components/utils/misc';

export function getProductBySell(){
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
        .then(response => response.data);

        return {
            type: GET_PRODUCTS_BY_SELL,
            payload:request
        }

}

export function getProductByArrival(){
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=createdat&order=desc&limit=4`)
        .then(response => response.data);

        return {
            type: GET_PRODUCTS_BY_ARRIVAL,
            payload:request
        }
}   

// Categories

export function getBrands(){

    const request = axios.get(`${PRODUCT_SERVER}/brands`)
        .then(response => response.data);

        return {
            type: GET_BRANDS,
            payload:request
        }

}

export function getTypes(){
    const request = axios.get(`${PRODUCT_SERVER}/types`)
        .then(response => response.data);

        return {
            type: GET_TYPES,
            payload:request
        }
}