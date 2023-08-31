
//如果想要有作用yu也可以
import { createContext, useContext } from 'react'
import { createStore, useStore } from 'zustand'

import { useBookStore } from './slice/books'


const store = createStore(()=>{
    return {
        useBookStore
    }
})