import React from "react";

export default class ProdutoLista extends React.Component {

    setPagina(numero) {
        this.props.mudaPagina(numero);
    }

    botoesPagina() {
        let botoes = [<button>&lt;&lt;</button>, <button>&lt;</button>];
        for (let x = 0; x < this.props.pagina.totalPages; x++) {
            let botao = <button 
                onClick={(evento) => {
                                this.setPagina(x);
            }}
                disabled={x == this.props.pagina.number}>{x + 1}</button>;
                botoes.push(botao);
        }
        return botoes;
    }

    botoesProduto(produto) {
        let botoes = [];
        if (this.props.editar) {
            let botao = <button onClick={(evento) => {
                                this.props.editar(produto);
            }}>
                Editar</button>;
                botoes.push(botao);
        }

        if (this.props.apagar) {
            let botao = <button onClick={(evento) => {
                                this.props.apagar(produto);
            }}>
                Apagar</button>;
                botoes.push(botao);
        }
        return botoes;
    }

    render() {

        if (!this.props.pagina.content) {
            return <div>Vazio!</div>;
        } else {

            return <table >
    <thead>
        <tr>
            <th>Nome</th><th>Valor</th>
        </tr>
    </thead>
    <tbody>
        {this.props.pagina.content.map((produto) => {
                                return <tr key={produto.id}>
                            <td>{produto.nome}</td>
                            <td>{produto.valor}</td>
                            <td>
                                {this.botoesProduto(produto)}</td>
                        </tr>;
        })}        
    </tbody>
    <tfoot>
        <tr><td colSpan='3'>{this.botoesPagina()}</td></tr>
    </tfoot>
</table>;
        }
    }
}