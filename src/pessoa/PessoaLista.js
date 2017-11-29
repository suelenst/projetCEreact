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
            }}>
                <Icon style={{color: '#51B0FF'}}>create</Icon>
            </IconButton>;
            botoes.push(botao);
        }

        if (this.props.apagar) {
            let botao =
                <IconButton onClick={(evento) => {
                    this.props.apagar(pessoa);
                }} color="accent">
                    <Icon style={{color: '#51B0FF'}}>delete</Icon>
                </IconButton>;
            botoes.push(botao);
        }
        return botoes;
    }

    render() {

        if (!this.props.user.content || !this.props.admin.content) {
            return <div>Não há pessoas cadastradas.<br/><br/><br/></div>;
        } else {

            return <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.user.content.map((pessoa) => {
                        return <TableRow hover="true" key={pessoa.id}>
                            <TableCell>{pessoa.nome}</TableCell>
                            <TableCell>{pessoa.email + "@restinga.ifrs.edu.br"}</TableCell>
                            <TableCell><Icon>person</Icon></TableCell>
                            <TableCell>
                                {this.botoesPessoa(pessoa)}
                            </TableCell>
                        </TableRow>;
                    })}
                    {this.props.admin.content.map((pessoa) => {
                        return <TableRow hover="true" key={pessoa.id}>
                            <TableCell>{pessoa.nome}</TableCell>
                            <TableCell>{pessoa.email + "@restinga.ifrs.edu.br"}</TableCell>
                            <TableCell><Icon st>vpn_key</Icon></TableCell>
                            <TableCell>
                                {this.botoesPessoa(pessoa)}
                            </TableCell>
                        </TableRow>;
                    })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            count={this.props.admin.totalElements + this.props.user.totalElements}
                            rowsPerPage={this.props.admin.size}
                            page={this.props.admin.number}
                            onChangePage={(evento, user) => {
                                this.setPagina(user);
                            }}
                            onChangeRowsPerPage={() => {
                            }}
                            rowsPerPageOptions={[this.props.admin.size]}
                            labelRowsPerPage=""
                        />
                    </TableRow>
                </TableFooter>
            </Table>;
        }
    }
}
