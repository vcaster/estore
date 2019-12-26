import {
    GET_PRODUCTS_BY_SELL,
    GET_PRODUCTS_BY_ARRIVAL,
    GET_BRANDS,
    ADD_BRAND,
    GET_TYPES,
    ADD_TYPE,
    GET_PRODUCTS_TO_SHOP,
    ADD_PRODUCTS,
    CLEAR_PRODUCTS,
    GET_PRODUCT_DETAIL,
    CLEAR_PRODUCT_DETAIL
} from '../actions/types';

export default function(state={}, action){
    switch(action.type){
        case GET_PRODUCTS_BY_SELL:
            return { ...state, bySell: action.payload}
        case GET_PRODUCTS_BY_ARRIVAL:
            return { ...state, byArrival: action.payload}
        case GET_BRANDS:
            return {...state, brands:action.payload}

        case ADD_BRAND:
            return {
                ...state,
                addBrand: action.payload.success,
                brands: action.payload.brands 
            }
        case GET_TYPES:
            return {...state, types:action.payload}
        case ADD_TYPE:
            return {
                ...state,
                addType: action.payload.success,
                types:action.payload.types}
        case GET_PRODUCTS_TO_SHOP:
            return {
                ...state,
                toShop: action.payload.articles,
                toShopSize: action.payload.size
            }
        case ADD_PRODUCTS:
            return {...state, addProduct:action.payload}
        case CLEAR_PRODUCTS:
                return {...state, addProduct:action.payload}
        case GET_PRODUCT_DETAIL:
                return {...state, productDetail:action.payload}
        case CLEAR_PRODUCT_DETAIL:
            return {...state, productDetail:action.payload}
        default:
            return state; 
    }
}