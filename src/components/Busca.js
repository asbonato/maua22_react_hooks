import React, { useEffect, useState } from "react"
import { InputText } from 'primereact/inputtext'
import axios from 'axios'
import { Button } from "primereact/button"

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
    if (termoDeBusca && !resultados.length){
        fazBusca()
    } else {
        const timeoutID =   setTimeout(() => {
            //e chamamos a seguir
            if (termoDeBusca){
                fazBusca()
            }
        }, 1000)
        return () => {
            clearTimeout(timeoutID)
        }
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
                                <span>
                                    <Button icon="pi pi-send"
                                    className="ml-2 p-button-rounded p-button-secondary"
                                    onClick={() => window.open(
                                        `https://en.wikipedia.org?curid=${resultado.pageid}`
                                    )}/>
                                </span>
                        </div>
                        {/** padding */}
                        <div className="p-2">
                            <spam dangerouslySetInnerHTML={{__html: resultado.snippet}}></spam>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Busca