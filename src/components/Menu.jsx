import React, { useEffect, useState } from 'react'
//import { data } from '../data';
import Gelato from './Gelato';
import useFetch from './UseFetch';




const Menu = () => {
    const url = import.meta.env.BASE_URL + "data.json";


    const { data, isLoading } = useFetch(url);
    const [prodotti, setProdotti] = useState([]);
    const [selected, setSelected] = useState();
    const [filteredProducts, setFilteredProducts] = useState(prodotti);

    
    
    
    useEffect(() => {
        if (data && data.data && data.data.length > 0) {
          setProdotti(data.data.filter(el => !el.nome.toLowerCase().includes('testicolo')));
          setFilteredProducts(data.data.filter(el => !el.nome.toLowerCase().includes('testicolo')));
          
        }
      }, [data.data]);

    


    const categorie = Array.from(new Set(prodotti.map((el) => {
        return el.categoria
    })));

    categorie.unshift('Tutti')

    const filtraProdotti = (categoria, index) => {
        setSelected(index)
        if (categoria === 'Tutti') {
            setFilteredProducts(data.data.filter(el => !el.nome.toLowerCase().includes('testicolo')));
        } else {
            setFilteredProducts(prodotti.filter(el => el.categoria === categoria ? el : ''))
        }
    }

   
    

   

    return (
        <div className='container'>
            <h4 style={{ textAlign: 'center' }}>Menu</h4>

            <div className="lista-categorie">
                {
                    categorie.map((categoria, index) => {
                        return (
                            <button
                                onClick={()=> filtraProdotti(categoria,index)}
                                key={index} className={`btn btn-selector ${index === selected && 'active'}`}>
                                {categoria}
                            </button>
                        )
                    })
                }
            </div>

            <div className="vetrina">
                {
                   !isLoading ? (
                    filteredProducts.map((el) => {
                        return <Gelato key={el.id} {...el} />
                    })
                   ) : (<h4>Loading...</h4>)
                }
            </div>
        </div>


    )
}

export default Menu