/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Img from 'react-image';


const styles = theme => ({
    img: {
        maxWidth: '25%',
        maxheight: '25%',
        minWidth: 10,
        minheight: 10,

    },
    h1: {
        Width: '50%',
    },
});

class Home extends React.Component {
    render() {
        const {classes, theme} = this.props;
        return (

            <div className={classes.h1}>
                <h1>Torne seus projetos visiveis e gerenciaveis... ProjetCE</h1>
                <img src="logo.png" alt="Logotipo" className={classes.img}>
                </img>
            </div>
        );
    }


}
Home.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(Home);
    
    
    
    
    
    
    
    
    
     
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    