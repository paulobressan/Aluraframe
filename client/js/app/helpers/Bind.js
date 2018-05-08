//Os data bind são classes que interligam dados com views.
class Bind{
    //O javascript pode devolver valores no seu construtor, então sera devolvido uma instancia do 
    //Proxy ja configurado. O construtor espera o modelo, a view e as propriedade que serão acessada

    constructor(model, view, ...props){
        let proxy = ProxyFactory.createProxy(model, props, (model)=>view.update(model));
        //chamar update pela primeira vez quando instanciado.
        view.update(model);

        //retorna o proxy para a classe que chamou o bind, assim quando instanciamos um bind
        //não recebemos um bind e sim um proxy por que esta configurado no construtor
        return proxy;
    }
}