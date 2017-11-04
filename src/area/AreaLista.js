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

    botoesArea(area) {
        let botoes = [];
        if (this.props.editar) {
            let botao = <IconButton onClick={(evento) => {
                                this.props.editar(area);
            }} color="secondary">
        <Icon>create</Icon>
      </IconButton>
                            /*
                            <button onClick={(evento) => {
                                this.props.editar(area);
            }}>
                Editar</button>;*/;
                botoes.push(botao);
        }

        if (this.props.apagar) {
            let botao = 
                    <IconButton onClick={(evento) => {
                                this.props.apagar(area);
            }} color="primary">
        <Icon>delete</Icon>
      </IconButton>;
                    /*            
                                
                                <button onClick={(evento) => {
                                this.props.apagar(area);
            }}>
                Apagar</button>;*/
                botoes.push(botao);
        }
        return botoes;
    }

    render() {

        if (!this.props.pagina.content) {
            return <div>Vazio!</div>;
        } else {

            return <Table >
    <TableHead>
        <TableRow>
            <TableCell>Nome</TableCell>
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
                  onChangePage={(evento,pagina)=>{this.setPagina(pagina);}}
                  onChangeRowsPerPage={()=>{}}
                  rowsPerPageOptions={[this.props.pagina.size]}
                  labelRowsPerPage=""
                />
        </TableRow>                        
    </TableFooter>
</Table>;
        }
    }
}
