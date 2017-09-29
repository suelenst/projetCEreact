/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

export default class ServicoRest {

    constructor(url) {
        this.url = url;
    }

    listarPaginado(pagina, sucesso, erro) {
        /* 
         this.listarPaginado(2,
         (resultado)=>{
         console.log(resultado);
         }, (erro)=>{
         console.log("Deu M!");
         console.log(erro);
         
         }  
         
         );    
         ((teste)=>{console.log(teste)})(
         "carlos"); 
         
         log("carlos ");
         */
      
        let trataFetch=(resultado) => {
            this.url;
            if (resultado.ok) {
                resultado.json().then(sucesso)
            } else {
                resultado.json().then(
                        (resultadoErro) => erro(resultadoErro)
                ) 
            }
        };
        
        fetch(this.url + "?pagina=" + pagina, {
            method: "GET"
        }).then(trataFetch);

    }

}
