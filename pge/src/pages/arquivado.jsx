import React from 'react'
import NavBarHome from '../Components/NavBarHome'
import Arquivado from '../Components/arquivado'

export default function ArquivadoPage({usuarioData}) {
  return (
    <div><NavBarHome usuarioData = {usuarioData} page={<Arquivado/>}></NavBarHome></div>
  )
}
