import React from "react";
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';


import Table, {
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow
} from 'material-ui/Table';

export default class ProjetoLista extends React.Component {

    setPagina(numero) {
        this.props.mudaPagina(numero);
    }

    botoesProjeto(projeto) {
        let botoes = [];
        if (this.props.editar) {
            let botao = <IconButton onClick={(evento) => {
                this.props.editar(projeto);
            }}>
                <Icon style={{color: '#51B0FF'}}>create</Icon>
            </IconButton>;
            botoes.push(botao);
        }

        if (this.props.apagar) {
            let botao =
                <IconButton onClick={(evento) => {
                    this.props.apagar(projeto);
                }}>
                    <Icon style={{color: '#51B0FF'}}>delete</Icon>
                </IconButton>;
            botoes.push(botao);
        }
        return botoes;
    }

    render() {

        if (!this.props.pagina.content) {
            return <div>Não há nenhum projeto cadastrado no sistema.<br/><br/><br/></div>;
        } else {

            return <Table >
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.pagina.content.map((projeto) => {
                        return <TableRow hover="true" key={projeto.id}>
                            <TableCell>{projeto.nome}</TableCell>

                            <TableCell>
                                {this.botoesProjeto(projeto)}</TableCell>
                        </TableRow>;
                    })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            count={this.props.pagina.totalElements}
                            rowsPerPage={this.props.pagina.size}
                            page={this.props.pagina.number}
                            onChangePage={(evento, pagina) => {
                                this.setPagina(pagina);
                            }}
                            onChangeRowsPerPage={() => {
                            }}
                            rowsPerPageOptions={[this.props.pagina.size]}
                            labelRowsPerPage=""
                        />
                    </TableRow>
                </TableFooter>
            </Table>;
        }
    }
}