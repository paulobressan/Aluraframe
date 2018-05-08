//HERDANDO DA CLASSE VIEW
class MensagemView extends View{
    //PASSANDO OS CONSTRUTOR PARA A CLASSE PAI
    constructor(elemento){
        super(elemento);
    }
    template(model){
        return model.texto != '' ?`
            <p class="alert alert-info">${model.texto}</p>
        ` : ''
    }
}