class HttpService{
    get(url){
        return new Promise((resolve, reject)=>{
            //criando requisições em ajax
            let xhr = new XMLHttpRequest();
            //preparando para abri o endereço
            xhr.open("GET", url,true);
            //Toda vezs que o estado do xhr mudar é chamado uma função
            xhr.onreadystatechange = ()=>{
                    //estados possivel de requisição ajax, 
                    //0 = requisição iniciada
                    //1 = conexao com o servidor estabelecida
                    //2 = requisição recebida
                    //3 = processando requisição
                    //4 = requisição concluida e a resposta esta pronta
                if(xhr.readyState == 4){
                     //se o servidor retornar ok
                    if(xhr.status == 200){
                        //Captura o retorno
                        //xhr.responseText
                        resolve(JSON.parse(xhr.responseText));
                    }else{
                        reject(xhr.responseText);
                    }
                }
            }
            //executar o open preparado
            xhr.send();
        });
    }

    post(url, model){
        return new Promise((resolve,reject)=>{
            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.onreadystatechange = ()=>{
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.responseText));
                    }else{
                        reject(xhr.responseText);
                    }
                }
            }
            xhr.send(model);
        });
    }
}