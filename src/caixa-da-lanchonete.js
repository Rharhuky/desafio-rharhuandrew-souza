class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        
        let valorDeRetorno = mensagemErro["pagtInvalido"];

        if(!verificarPagamento(metodoDePagamento)) {
            
            return valorDeRetorno;
            
        }
        
        let pagamento = formaDePagamentoPossivel[metodoDePagamento];
        let preco = calcularPrecoCompra(itens);
    
        if(isNumber(preco)){
            
            valorDeRetorno = `R$ ${(pagamento * preco).toFixed(2).replace(".", ",")}`;
    
        }
        else {
    
            valorDeRetorno = preco;
        
        }
        return valorDeRetorno;
        
    }

}

export { CaixaDaLanchonete };



/**
 * Objeto que possui como atributos as formas possíveis de pagamento.
 */
const formaDePagamentoPossivel = {

    "dinheiro": 0.95,
    "credito": 1.03,
    "debito": 1

};

/**
 * Objeto que possui como atributos os itens válidos para compra;
 */
const produtoPrincipalExistente = {

    "cafe": 3.00,
    "chantily" : 1.50, 
    "suco": 6.20,
    "sanduiche": 6.50,
    "queijo": 2.00,
    "salgado": 7.25,
    "combo1": 9.50,
    "combo2": 7.50

};

/**
 * Objeto que possui como atributos os itens complementares de itens principais.
 * O valor de cada objeto representa o Produto Principal ao qual possui relação.
 */

const produtoComplementarExistente = {

    "chantily" : "cafe",
    "queijo": "sanduiche"

};
 
/**
 * Objeto que possui como atributos mensagens de erro.
 */
const mensagemErro = {

    "itemInvalido" : "Item inválido!",
    "carrinhoVazio" : "Não há itens no carrinho de compra!",
    "qtdInvalidaItens" : "Quantidade inválida!",
    "pagtInvalido" : "Forma de pagamento inválida!",
    "itemExtraSemPedidoPrincipal" : "Item extra não pode ser pedido sem o principal"

};

/**
 * Essa função serve para calcular o preço total de vários produtos e suas respectivas quantidades.
 * @param {string[]} itens 
 * @returns o valor total de itens. Caso ocorra algum erro retorna uma string que simboliza uma mensagem de erro pertencente ao objeto mensagemErro.
 */
function calcularPrecoCompra(itens){

    if(itens.length == 0){
        return mensagemErro["carrinhoVazio"];
    }

    let valorTotal = 0;
    
    const produtos = new Set();

    for(let itemBruto of itens) {

        if(itemBruto.trim() == ""){
            return mensagemErro["itemInvalido"];
        }

        let item =  itemBruto.trim().split(",");
        let nomeItem = item[0];
        let qtdItem =  parseInt(item[1]);
        
       if(!verificarProduto(nomeItem)){
        return mensagemErro["itemInvalido"];
       }

        if(!isNumber(qtdItem) || qtdItem <= 0){
            return mensagemErro["qtdInvalidaItens"];
        }

        produtos.add(nomeItem);
        let valorItem = produtoPrincipalExistente[nomeItem] * qtdItem;
        valorTotal += valorItem;
        
    }
    if(!verificarProdutos(produtos)){

        return mensagemErro["itemExtraSemPedidoPrincipal"];

    }

    return valorTotal;

};

/**
 * Essa função serve para determinar se a forma de pagamento passada existe ou não no objeto formaDePagamentoPossivel.
 * @param {*} metodoDePagamento 
 * @returns true se a forma de pagamento é valida. Caso contrário false.
 */
const verificarPagamento = (metodoDePagamento) => {

    return formaDePagamentoPossivel[metodoDePagamento] ? true : false;

};

/**
 * Essa função serve para identificar se um certo produto existe, ou seja, foi definido.
 * @param {String} produto 
 * @returns true se existe no objeto produtoExistente. Caso contrário false.
 */
const verificarProduto = (produto) => {

    return produtoPrincipalExistente[produto] ? true : false;

};

/**
 * 
 * @param {string} produto 
 * @returns 
 */
const verificarProdutoExtra = (produto) => {

    return produtoComplementarExistente[produto] ? true : false;

};

/**
 * Essa função serve para verificar se, para um determinado produto extra (caso exista), existe o seu produto principal correspondente no conjunto de produtos passado.
 * @param {String[]} produtos 
 * @returns true se sim, caso contrário, false.
 */
const verificarProdutos = (produtos) => {

    for( let produto of produtos ){

        if(verificarProdutoExtra(produto) &&  (! produtos.has(produtoComplementarExistente[produto]) )  ){
            return false;
        }
    
    }

    return true;

};

/**
 * Essa função serve para identificar se o parâmetro passado é um número.
 * @param {number} valor 
 * @returns true se o valor passado for um numero.
 */
const isNumber = (valor) => {

    return  ( !isNaN(valor) );

};