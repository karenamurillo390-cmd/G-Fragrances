'use client';
import {createContext,useContext,useEffect,useMemo,useState} from 'react';
import type {Product} from '@/lib/catalog';
type Line={product:Product;quantity:number};
type Store={lines:Line[];add:(p:Product)=>void;update:(id:string,n:number)=>void;remove:(id:string)=>void;count:number;total:number};
const C=createContext<Store|null>(null);
export function StoreProvider({children}:{children:React.ReactNode}){const [lines,setLines]=useState<Line[]>([]);useEffect(()=>{const raw=localStorage.getItem('g-fragrances-cart');if(raw)setLines(JSON.parse(raw))},[]);useEffect(()=>localStorage.setItem('g-fragrances-cart',JSON.stringify(lines)),[lines]);const value=useMemo(()=>({lines,add:(p:Product)=>setLines(l=>{const found=l.find(x=>x.product.id===p.id);return found?l.map(x=>x.product.id===p.id?{...x,quantity:Math.min(x.quantity+1,p.stock)}:x):[...l,{product:p,quantity:1}]}),update:(id:string,n:number)=>setLines(l=>n<1?l.filter(x=>x.product.id!==id):l.map(x=>x.product.id===id?{...x,quantity:Math.min(n,x.product.stock)}:x)),remove:(id:string)=>setLines(l=>l.filter(x=>x.product.id!==id)),count:lines.reduce((a,x)=>a+x.quantity,0),total:lines.reduce((a,x)=>a+x.product.price*x.quantity,0)}),[lines]);return <C.Provider value={value}>{children}</C.Provider>}
export const useStore=()=>{const s=useContext(C);if(!s)throw new Error('StoreProvider missing');return s};
