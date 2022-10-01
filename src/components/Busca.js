import React, { useEffect, useState } from "react"
import { InputText } from 'primereact/inputtext'
import axios from 'axios'

const Busca = () => {
    const [termoDeBusca, setTermoDeBusca] = useState('React')
    const [resultados, setResultados] = useState([])
    console.log(resultados)

    useEffect(() => {
        //definimos a funcao
        const fazBusca = async() => {
            const { data } = await axios.get('https://en.wikipedia.org/w/api.php',{
                params: {
                    action: 'query',
                    list: 'search',
                    format: 'json',
                    //instruir o navegador a permitir conteúdo de qualquer origem
                    origin: '*',
                    srsearch: termoDeBusca
                }
            }
        )
        setResultados(data.query.search)
    }
    //e chamamos a seguir
    if (termoDeBusca){
        fazBusca()
    }
    }, [termoDeBusca])
    return (
        <div>
            <span className="p-input-icon-left">
                <i className="pi pi-search"></i>
                <InputText 
                    onChange={(e) => setTermoDeBusca(e.target.value)}/>
            </span>
            {
                resultados.map((resultado) => (
                    <div
                        key={resultado.pageid}
                        //margem e borda
                        className="my-2 border border-1 border-400">
                        <div
                            className="border bottom border border-1 border-400 p2 text-center front-bold">
                                {resultado.title}
                        </div>
                        {/** padding */}
                        <div className="p-2">
                            {resultado.snippet}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Busca