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

export default class PessoaLista extends React.Component {

    setPagina(numero) {
        this.props.mudaPagina(numero);
    }

    botoesPessoa(pessoa) {
        let botoes = [];
        if (this.props.editar) {
            let botao = <IconButton onClick={(evento) => {
                this.props.editar(pessoa);
            }} color="primary">
                <Icon>create</Icon>
            </IconButton>;
            botoes.push(botao);
        }

        if (this.props.apagar) {
            let botao =
                <IconButton onClick={(evento) => {
                    this.props.apagar(pessoa);
                }} color="accent">
                    <Icon>delete</Icon>
                </IconButton>;
            botoes.push(botao);
        }
        return botoes;
    }

    render() {

        if (!this.props.pagina.content) {
            return <div>Não há pessoas cadastradas.<br/><br/><br/></div>;
        } else {

            return <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>id</TableCell>
                        <TableCell>Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.pagina.content.map((pessoa) => {
                        return <TableRow hover="true" key={pessoa.id}>
                            <TableCell>{pessoa.nome}</TableCell>
                            <TableCell>{pessoa.email}</TableCell>
                            <TableCell>{pessoa.id}</TableCell>
                            <TableCell>
                                {this.botoesPessoa(pessoa)}</TableCell>
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
