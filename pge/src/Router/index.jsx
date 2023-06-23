import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Inicio from '../pages/inicio';
import NavBarHome from '../Components/NavBarHome';
import SaidaPage from '../pages/saida';
import ArquivadoPage from '../pages/arquivado';
export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Inicio/>} />
                <Route path='/home' element={<NavBarHome/>} />
                <Route path='/home/saida' element={<SaidaPage/>} />
                <Route path='/home/arquivado' element={<ArquivadoPage/>} />
            </Routes>
        </BrowserRouter>
    )
}
