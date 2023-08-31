import create from 'zustand';

interface IBook{
    id:number;
    name:string;
}

interface IBooksStore{
    books:IBook[]
    increaseBook:(book:IBook)=>void
}
export const useBookStore = create<IBooksStore>((set)=>{
    return {
        books:[
            {id:1,name:"纸崩"},
            {id:2,name:"柑橘啊柠檬"},
            {id:3,name:"怪物来敲门"},
            {id:4,name:"橘子不是唯一的水果"},
            {id:5,name:"俗女养成记"},
            {id:6,name:"成夏方程式"},
            {id:7,name:"房思琪的初恋乐园"},
        ],

        increaseBook:(book)=>{
            return set((state:any)=>{
                return {
                    books:state.books.concat(book)
                }
            })
        },
    }
})