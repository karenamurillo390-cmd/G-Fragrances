'use client';
import {createContext,useContext,useEffect,useMemo,useState} from 'react';
import type {Product} from '@/lib/catalog';
export type EditableProduct=Product & {active:boolean;shortDescription:string;images:string[];createdAt:string};
type Catalog={products:EditableProduct[];ready:boolean;save:(product:EditableProduct)=>void;remove:(id:string)=>void};
const C=createContext<Catalog|null>(null);const KEY='g-fragrances-products';
export function ProductCatalogProvider({children}:{children:React.ReactNode}){const [products,setProducts]=useState<EditableProduct[]>([]);const [ready,setReady]=useState(false);useEffect(()=>{const read=()=>{try{setProducts(JSON.parse(localStorage.getItem(KEY)||'[]'))}catch{setProducts([])}};read();setReady(true);const sync=(event:StorageEvent)=>{if(event.key===KEY)read()};window.addEventListener('storage',sync);return()=>window.removeEventListener('storage',sync)},[]);useEffect(()=>{if(ready)localStorage.setItem(KEY,JSON.stringify(products))},[products,ready]);const value=useMemo(()=>({products,ready,save:(product:EditableProduct)=>setProducts(all=>all.some(p=>p.id===product.id)?all.map(p=>p.id===product.id?product:p):[...all,product]),remove:(id:string)=>setProducts(all=>all.filter(p=>p.id!==id))}),[products,ready]);return <C.Provider value={value}>{children}</C.Provider>}
export const useProducts=()=>{const context=useContext(C);if(!context)throw new Error('ProductCatalogProvider missing');return context};
