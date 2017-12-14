import React from "react";
import Card from "../../node_modules/material-ui/Card/Card";
import CardContent from "material-ui/es/Card/CardContent";
import CardActions from "material-ui/es/Card/CardActions";
import Button from "material-ui/es/Button/Button";
import Typography from "material-ui/es/Typography/Typography";
import {withStyles} from "material-ui";
import PropTypes from 'prop-types';

import servicoLogin from "../login/ServicoLogin";  

const styles = theme => ({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    tagAreas: {
        marginBottom: 16,
        fontSize: 14,
        color: theme.palette.text.secondary,
    },
    title: {
        fontSize: 24,
    },
    subtitle: {
        fontSize: 20,
    },
    pos: {
        marginBottom: 12,
        color: theme.palette.text.secondary,
    },
    button: {
        background: '#51B0FF', 
        color: '#ffffff',
    }
});

class ProjetoDetalhe extends React.Component {

    constructor(props) {
        super(props);
    }
        
    solicitarPart(id, idu) {

         fetch("/api/projetos/" + id + "/" + idu, {
            method: "PUT",

            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization()

            }),
        }).then((resultado) => {
            
        
        if (resultado.ok) {
           console.log("Mudou!");               

        } else {
            resultado.json().then(
                    (resultadoErro) => console.log(resultadoErro)
            )
        }

        });

    }
    
     
    render() {
        const {classes} = this.props;
        const projeto = this.props.projeto;
        const idUsuario = this.props.id;
        let participar =  null;
        
        function reformatDate(dateStr) {
            var dArr = dateStr.split("-");  // ex input "2010-01-18"
            return dArr[2]+ "/" +dArr[1]+ "/" +dArr[0]; //ex out: "18/01/10"
        }    
        // ja tem o id do usuario autenticado, falta comparar com os do projeto para saber se e integrante ou coordenador
        function pedidoPart(arr, idu) {
            
            if (arr === null){
                return false;
            }
        
            for (var i = 0; i < arr.length; i++) {
                
                console.log(arr[i].id + " usuario "+ idu);
                if (arr[i].id === idu) {
                    return true;
                }
            }
            return false;
        }


        if (!projeto) {
            return <div>Projeto não encontrado.<br/><br/><br/></div>;
        } else {
            
            if (projeto.coordenadorProjeto.id !== idUsuario && 
                    !pedidoPart(projeto.solicitantesProjeto, idUsuario) &&
                    !pedidoPart(projeto.integrantesProjeto, idUsuario) ) {  
                
                participar =

                <Button className={classes.button} onClick={(event) => {
                    event.preventDefault();
                    this.solicitarPart(projeto.id, idUsuario);
                }}>
                    Solicitar Participação
                </Button>
            }
        
            return <div>
                <div>
                    <Card>
                        <CardContent>

                            {projeto.area.map((area) => {
                                return <Typography className={classes.tagAreas}>{area.nome}</Typography>
                            })}
                            <br/>
                            <Typography type="headline" component="h2">
                                {projeto.nome}
                            </Typography>
                            <br/>
                            <Typography className={classes.pos}>{reformatDate(projeto.dataInicio)}</Typography>
                            <br/>
                            <Typography className={classes.title}>Coordenador</Typography>
                            <Typography component="p">{projeto.coordenadorProjeto.nome}</Typography>
                            <br/>
                            <Typography className={classes.title}>Integrantes do Projeto</Typography>
                            {projeto.integrantesProjeto.map((integrantes) => {
                                return <Typography component="p">{integrantes.nome}</Typography>
                            })}
                            <br/>
                            <Typography
                                className={classes.title}>Resumo</Typography>
                            <Typography component="p">{projeto.resumo}</Typography>
                            <br/>
                            <Typography className={classes.title}>Descrição Detalhada</Typography>
                            <Typography component="p">
                                {projeto.descricao}
                            </Typography>
                            
                            <br/><br/><br/>
                            
                            {participar}
                      
                            <br/><br/><br/>
     
                        </CardContent>

                        {/*<CardActions>*/}
                        {/*<Button dense>Mais Detalhes</Button>*/}
                        {/*</CardActions>*/}
                    </Card>
                    <br/>
                </div>
            </div>;
        }
    }
}

ProjetoDetalhe.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjetoDetalhe);