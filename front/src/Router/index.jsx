import React from 'react'
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Inicio from '../pages/inicio';
import SaidaPage from '../pages/saida';
import ArquivadoPage from '../pages/arquivado';
import EntradaPage from '../pages/entrada';
export default function Router() {
    const [usuarioData, setUsuarioData] = useState();
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Inicio setUsuarioData={setUsuarioData}/>} />
                <Route path='/entrada' element={<EntradaPage usuarioData = {usuarioData}/>} />
                <Route path='/saida' element={<SaidaPage usuarioData = {usuarioData}/>} />
                <Route path='/arquivado' element={<ArquivadoPage usuarioData = {usuarioData}/>} />
            </Routes>
        </BrowserRouter>
    )
}
