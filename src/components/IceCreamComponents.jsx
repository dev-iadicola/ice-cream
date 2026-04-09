import React, { useState } from 'react'
import { data } from '../data'
import Menu from './Menu';

const IceCreamComponents = () => {


  return (

    <div className="App">
      <section className=' section-center'>
        <h3>Nice Cream</h3>
        <Menu />
        <a className="btn" style={{background:'white'}} target='_blank' href='https://iadicola.netsons.org/contatti'>
          Crea il tuo menu online
        </a>
      </section>

      
    </div>
  )
}

export default IceCreamComponents