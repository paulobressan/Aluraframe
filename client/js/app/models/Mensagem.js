//toda mensagem que for exibida para o usuario, utliza a classe Mensagem
class Mensagem{
    //inicializando o constructor com um valor
    constructor(texto=''){
        this._texto = texto;
    }

    get texto(){
        return this._texto;
    }

    set texto(texto){
        this._texto = texto;
    }
}