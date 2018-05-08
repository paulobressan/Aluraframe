class ProxyFactory{

    static createProxy(objeto, props, acao){
        return new Proxy(objeto,{
            //Como o proxy não identifica o que é metodo, então os metodos é reconhecido como GET
            get(target, prop, receiver){
                //É feito uma validação verificando se as props passada é uma "propriedade do objeto"
                //Porem é feito uma validação verificando se é uma função("metodo")
                //Se for uma função ele processegue executando um apply
                if(props.includes(prop) && ProxyFactory._verificarFuncao(target[prop])){
                    //Como recebemos uma função, temos que executar uma função e devolver seus resultados.
                    return function(){
                        console.log(`Interceptando ${prop}`);
                        //O apply tem a função de executar uma função dentro de um escopo, no caso
                        //o nosso escopo é o target, e a nossa "função" que sera executada é o target[prop]
                        //porem temos que passar parametros, então é utilizado o arguments para passar o parametros
                        let retorno = Reflect.apply(target[prop], target, arguments);

                        //O ação é a "ARMADILHA" que queromos executar
                        //A nossa armadilha é dinamica, por quepodemos passar uma ação para ser executada
                        //Portando ela fica dinamica, todo o proxy é dinamico por receber objeto, propriedades, e ação       
                        acao(target);
                        return retorno;
                    };
                }
                //Se não for função é simplesmente uma consulta, então realizamos o get do reflect
                //Ele executa a função passada, dentro do escopo passado e devolve os valores.
                return  Reflect.get(target, prop, receiver);
            },

            //O set é quando queremos interceptar um preenchimento de uma variavel
            set(target, prop, value, receiver){
                //retorna um valor se entrar na condição ou não
                let retorno = Reflect.set(target, prop, value, receiver);
                //Se for uma propriedade do objeto, então executa a armadilha
                if(props.includes(prop)){
                    //É passado para o target[prop](objeto[propriedade]) o valor do set
                    //target[prop] = value;
                    //Execução da armadilha
                    acao(target);
                }
                return retorno;
            }
        });
    }

    static _verificarFuncao(func){
        return  typeof(func == typeof(Function));
    }
}