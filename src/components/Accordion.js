import React, { useState } from "react"
import { Card } from 'primereact/card'
import './Accordion.css'

const Accordion = ( {itens} ) => {
    const [indiceAtivo, setIndiceAtivo] = useState(null)
    /**obs: sem desestruturação ficaria parecido com isso
     * const estado = useState(null)
     * const indiceAtivo = estado[0]
     * const setIndiceAtivo = estato[1]
     */

    const itemClicado = (indice) => {
        setIndiceAtivo(indice)
    }

    const expressaoJSX = itens.map((item, indice) => {
        const classExibirConteudo = indice === indiceAtivo ? '' : 'hidden'
        const classExibirIcone = indice === indiceAtivo ? 'pi-angle-down' : 'pi-angle-right'
        return(
            <Card id="accordion" key={indice} className="border-1 border-400">
                <div onClick={() => itemClicado(indice)}>
                    <i className={`pi ${classExibirIcone}`}></i>
                    <h5 className="inline ml-3">{item.titulo}</h5>
                </div>
                <p className={classExibirConteudo}>{item.conteudo}</p>
            </Card>
        )
    })
    return (
        <div>
            {
                expressaoJSX
            }
        </div>
    )
}

export default Accordion