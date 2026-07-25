import './globals.css';import {StoreProvider} from '@/components/Store';import SiteHeader from '@/components/SiteHeader';import Footer from '@/components/Footer';
export const metadata={title:'G Fragrances | Exclusive Scents',description:'Fragancias originales, nicho y árabes de lujo.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body><StoreProvider><SiteHeader/>{children}<Footer/></StoreProvider></body></html>}
