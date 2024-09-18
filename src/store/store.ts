import AsyncStorage from "@react-native-async-storage/async-storage";
import BeansData from "../data/BeansData";
import CoffeeData from "../data/CoffeeData";
import create from 'zustand'
import {produce} from 'immer'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useStore = create(
    persist((set, get) => ({
        CoffeeList: CoffeeData,
        BeanList: BeansData,
        CartPrice: 0,
        CartList: [],
        FavoriteList: [],
        OrderHistoryList: [],
        addToCart: (cartItem: any) => {
            set(produce(state => {
                let found: boolean = false;
                for (let i = 0; i < state.CartList.length; i++) {
                    if (state.CartList[i].id == cartItem.id) {
                        found = true;
                        let size = false;
                        for (let j = 0; j < state.CartList[i].prices.length; j++) {
                            if (state.CartList[i].prices[j].size == cartItem.size) {
                                size = true;
                                state.CartList[i].prices[j].quantity++;
                                break;
                            }
                        }

                        if (size == false) {
                            state.CartList[i].prices.push(cartItem.prices[0]);
                        }
                        state.CartList[i].price.sort((a: any, b: any) => {
                            if (a.size > b.size) {
                                return -1;
                            }

                            if (a.size < b.size) {
                                return 1;
                            }

                            return 0;
                        })
                    }
                }

                if (found == false) {
                    state.CartList.push(cartItem);
                }
            }))
        },
        calculateCartPrice: () => {
            set(produce(state => {
                let totalPrice = 0;
                for (let i = 0; i < state.CartList.length; i++) {
                    let tempPrice = 0;
                    for (let j = 0; j < state.CartList[i].prices.length; j++) {
                        tempPrice = tempPrice + parseFloat(state.CartList[i].prices[j])
                            * state.CartList[i].prices.quantity;
                    }
                    state.CartList.ItemPrice = tempPrice.toFixed(2).toString();
                    totalPrice = totalPrice + tempPrice;
                }
                state.CartList = totalPrice.toFixed(2).toString();
            }))
        },
        addToFavorites: ((type: string, id: string) => {
            set(produce(state => {
                if (type == 'Coffee') {
                    for (let i = 0; i < state.CoffeeList.length; i++) {
                        if (state.CoffeeList[i].id == id) {
                            if (state.CoffeeList[i].favourite == false) {
                                state.CoffeeList[i].favourite == true;
                                state.FavoriteList.unshift(state.CartList[i])
                            }
                        }
                        break;
                    }
                }

                if (type == 'Bean') {
                    for (let i = 0; i < state.BeanList.length; i++) {
                        if (state.BeanList[i].id == id) {
                            if (state.BeanList[i].favourite == false) {
                                state.BeanList[i].favourite == true;
                                state.BeanList.unshift(state.BeanList[i])
                            }
                        }
                        break;
                    }
                }
            }))
        }),
        deleteFromFavorites: ((type: String, id: string) => {
            set(produce(state => {
                if (type == 'Coffee') {
                    for (let i = 0; i < state.CoffeeList.length; i++) {
                        if (state.CoffeeList[i].id == id) {
                            if (state.CoffeeList[i].favourite == true) {
                                state.CoffeeList[i].favourite == false;
                            }
                        }
                        break;
                    }
                }

                if (type == 'Bean') {
                    for (let i = 0; i < state.BeanList.length; i++) {
                        if (state.BeanList[i].id == id) {
                            if (state.BeanList[i].favourite == true) {
                                state.BeanList[i].favourite == false;
                            }
                        }
                        break;
                    }
                }

                let spliceIndex = 0;
                for (let i = 0; i < state.FavoriteList.length; i++) {
                    if (state.FavoriteList[i].id = id) {
                        spliceIndex = i;
                    }
                }
                state.FavoriteList.splice(spliceIndex, 1);
            }))
        })
    }),
        {
            name: 'Coffee Shop',
            storage: createJSONStorage(() => AsyncStorage)
        }

    )
)