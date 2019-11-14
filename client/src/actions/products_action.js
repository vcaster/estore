import axios from 'axios';
import {
    GET_PRODUCTS_BY_SELL,
    GET_PRODUCTS_BY_ARRIVAL
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