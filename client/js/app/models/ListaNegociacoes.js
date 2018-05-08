class ListaNegociacoes{
    constructor(armadilha){
        this._negociacoes = [];
    }

    adiciona(negociacao){
        this._negociacoes.push(negociacao);
        //ao passarmos o this para a _armadilha, passamos para ele a instancia atual, assim é atualizado os dados atual
        //this._armadilha(this);

        //executar a função armadinha dentro do controller, no construtor é criado o contexto do controller que em seguida é usado na classe
        //Reflect.apply(this._armadilha, this._contexto, [this]);
    }

    get negociacoes (){
        return this._negociacoes;
    }

    esvazia(){
        this._negociacoes = [];
        //this._armadilha(this);

        //executar a função armadinha dentro do controller, no construtor é criado o contexto do controller que em seguida é usado na classe
        //Reflect.apply(this._armadilha, this._contexto, [this]);
    }
}