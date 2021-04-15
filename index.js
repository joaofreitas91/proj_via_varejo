var produtos = JSON.parse(localStorage.getItem("produtos"));
if (produtos == null){
    produtos = [];
}

function clearErrors(){
    [...document.querySelectorAll(".form-input em")].forEach((m) => {
        m.classList.add("hidden")

    })
}

function applyMask(evt) {
    evt.preventDefault()
    if(["0","1","2","3","4","5","6","7","8","9"].indexOf(evt.key) == -1) {
        // console.log("letra")
    } else { 
        // console.log("1",evt.target.value)
        let value = evt.target.value.replace(/^0,/, "").replace(",","").replace(/\./g, "") + evt.key
        if(value.length <= 2) {
            evt.target.value = "0," +value
            // console.log("2",evt.target.value, value.length, value)
        } else {
            evt.target.value = value.slice(0,-2) + ',' + value.slice(value.length-2,value.length) 
            // console.log("3",evt.target.value, value.length, value, value.slice(0,value.length-2), value.slice(value.length-2,value.length))
        }
        lastIndex = -1
        value = evt.target.value.replace(/^0,[0-9]+/, "").replace(/,[0-9]+$/,"").replace(/\./g, "")
        // console.log(value)
        if (value.length >= 4) {
            valuefinal = [];
            for (let i = value.length; i>=0; i--) {
                if ((value.length-i)%3 == 0 && value.slice(i-3, i)) {
                    valuefinal.push(value.slice(i-3, i))
                    lastIndex=i
                }gl
            }
            // console.log(valuefinal)
            valufinalstring = valuefinal.reverse().join(".")
            evt.target.value = valufinalstring + "," + evt.target.value.replace(/^[0-9.]+,/, "")
            if (value.slice(0,lastIndex-3)) {
                evt.target.value = value.slice(0,lastIndex-3) + '.' + evt.target.value
            }
            
        }
    }
}

reescreveLista()

document.getElementById('nameTransaction').addEventListener('keyup', (ev) => {
	const input = ev.target;
	input.value = input.value.toUpperCase();
});

function trataFormulario(e){
    e.preventDefault()
    console.log(e.target.elements)
    
    
    if (e.target.elements.typeTransaction.value == ""){
        e.target.elements.typeTransaction.parentElement.querySelector("em").classList.remove("hidden")
        
        return false;
    }
    
    if (e.target.elements.nameTransaction.value == ""){
        e.target.elements.nameTransaction.parentElement.querySelector("em").classList.remove("hidden")
        
        return false;
    }

    if (e.target.elements.valueTransaction.value <= 0){
        e.target.elements.valueTransaction.parentElement.querySelector("em").classList.remove("hidden")
        
        return false;
    }
    
    let novoProduto = {
        nome : e.target.elements.nameTransaction.value,
        valor : e.target.elements.valueTransaction.value,
        tipo : e.target.elements.typeTransaction.value
    }

    produtos.push(novoProduto)

    reescreveLista()

    localStorage.setItem("produtos", JSON.stringify(produtos))

    console.log(produtos)

    document.querySelector("form").reset()
    

    return false;
    
}

function openMenu(){

    var menu = document.querySelector(".list-menu").classList

    if ([...menu].indexOf("opened") == -1){
        menu.add("opened")
    } else{
        menu.remove("opened")
    }
}

function somaExtrato () {
    var total = 0
    
    for (let index = 0; index < produtos.length; index ++) {
        let valorASomar = parseFloat(produtos[index].valor.replace(/\./g,"").replace(/,/g,"."))
        
        console.log(valorASomar)
        
        if (produtos[index].tipo != 1){
            valorASomar *= -1
        }

        total += valorASomar

    }
    
    return total
}

function removeItem(evtn, index){
    console.log(evtn)
    console.log(index)

    produtos.splice(index, 1)

    localStorage.setItem("produtos", JSON.stringify(produtos))
    reescreveLista()
}

function reescreveLista() {

    document.querySelector("table").innerHTML = ""

    for (let i = 0; i < produtos.length; i ++){
    var typeTransaction = "-"
        if ( produtos[i].tipo == "1"){
            typeTransaction = "+"
        }
    
        document.querySelector("table").innerHTML += `
        <tr onclick="removeItem(event, `+ i +`)">
            <td class="signal-left">`+ typeTransaction +`</td>
            <td class="text-left">`+ produtos[i].nome +` </td>
            <td class="text-right">`+ 'R$ ' +produtos[i].valor +`</td>
        </tr>
        `
    }

    if (produtos.length == 0) {
        document.querySelector("table").innerHTML = `
        <tr class="line-tbody">
            <td class="text-center">Por favor, adicione uma transação!</td>
        </tr>
        `
    }

    total = somaExtrato()
    lucroOuPrejuizo = "[LUCRO]"
    
    totalEscrito = "R$ "
    totalEscrito += total

    if (total <0){
        lucroOuPrejuizo = "[PREJUÍZO]"
    }

    if (total == 0){
        lucroOuPrejuizo = ""
    }
    
    document.getElementById("totalTransaction").innerHTML = totalEscrito.replace("-" , "")
    document.getElementById("profit").innerHTML = lucroOuPrejuizo
    
}

document.getElementById("meuForm").addEventListener('submit', trataFormulario)