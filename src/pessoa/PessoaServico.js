import ServicoRest from "../ServicoRest";

export default class PessoaServico extends  ServicoRest {
        constructor(){
            super("api/pessoas/");
        }
        
}