import React from 'react'
import NavBarHome from '../Components/NavBarHome'
import Saida from '../Components/saida'
export default function SaidaPage({usuarioData}) {
  return (
    <div><NavBarHome usuarioData = {usuarioData} page={<Saida usuarioData={usuarioData}/>}></NavBarHome></div>
  )
}
