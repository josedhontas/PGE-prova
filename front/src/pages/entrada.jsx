import React from 'react'
import NavBarHome from '../Components/NavBarHome'
import Entrada from '../Components/entrada'

export default function EntradaPage({usuarioData}) {
  return (
    <div><NavBarHome usuarioData = {usuarioData} page={<Entrada usuarioData={usuarioData}/>}></NavBarHome></div>
  )
}
