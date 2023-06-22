import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Inicio from '../pages/inicio';
import NavBarHome from '../Components/NavBarHome';
import Saida from '../Components/saida';
export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Inicio/>} />
                <Route path='/home' element={<NavBarHome/>} />
                <Route path='/home/saida' element={<Saida/>} />
                <Route path='/home/arquivada' element={<NavBarHome/>} />
            </Routes>
        </BrowserRouter>
    )
}
