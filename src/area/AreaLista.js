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

export default class AreaLista extends React.Component {
        
    setPagina(numero) {
        this.props.mudaPagina(numero);
    }

    botoesArea(area) {
        let botoes = [];
        if (this.props.editar) {
            let botao = <IconButton onClick={(evento) => {
                this.props.editar(area);
            }} >
                <Icon style={{color: '#51B0FF'}}>create</Icon>
            </IconButton>;
            botoes.push(botao);
        }

        if (this.props.apagar) {
            let botao =
                <IconButton onClick={(evento) => {
                    this.props.apagar(area);
                }}>
                    <Icon style={{color: '#51B0FF'}}>delete</Icon>
                </IconButton>;
            botoes.push(botao);
        }
        return botoes;
    }

    render() {

        if (!this.props.pagina.content) {
            return <div>Não há nenhuma área de interesse cadastrada no sistema.<br/><br/><br/></div>;
        } else {

            return <Table >
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.pagina.content.map((area) => {
                        return <TableRow hover="true" key={area.id}>
                            <TableCell>{area.nome}</TableCell>

                            <TableCell>
                                {this.botoesArea(area)}</TableCell>
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