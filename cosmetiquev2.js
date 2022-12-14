let nom, marque, AdType, prix, date, resultat;
let submit = document.getElementById('submit');

if(localStorage.product != null){
    data = JSON.parse(localStorage.product);
}else{
    data = [];
}

console.log(data)

addToTable()

// Create product
submit.onclick = function(){
    nom = document.getElementById('nom');
    marque = document.getElementById('marque');
    AdType = document.getElementById('AdType');
    prix = document.getElementById('prix');
    date = document.getElementById('date');
    resultat = document.getElementById('cate');

    output6= document.getElementById("error-6");
    
    console.log(nom, marque, AdType, prix, date, resultat)
    // nom
    if (nom.value == ""){
    
        document.getElementById("nom").style.border = "1px solid #DE0068";
        ctr1=false;
    }
    else if(nom.value.length < 30 && nom.value.length > 3){
    
        document.getElementById("nom").style.border = "2px solid #59CE8F";
        ctr1=true;
    }
    else{

        document.getElementById("nom" ).style.border = "1px solid #DE0068";
        ctr1=false;
    }

    // marque
    if (marque.value == ""){

        document.getElementById("marque").style.border = "1px solid #DE0068";
        ctr2=false;
    }   
    else{

        document.getElementById("marque").style.border = "2px solid #59CE8F";
        ctr2=true;
    }

    //  Type
    if (AdType.value == ""){

        document.getElementById("AdType").style.border = "1px solid #DE0068";
        ctr4=false;
    } 
    else{

        document.getElementById("AdType").style.border = "2px solid #59CE8F";
        ctr4=true;
    }
        
    //  prix   
    if (prix.value.match(/^[1-9]{1,9}$/g)){

        document.getElementById("prix").style.border = "2px solid #59CE8F";
        ctr3=true;
    }
        
    else{

        document.getElementById("prix").style.border = "1px solid #DE0068";
        ctr3=false;
    }

    // promotion input radio
    var rd1 = document.getElementById("radio-promotion-1");
    var rd2 = document.getElementById("radio-promotion-2");
    
    if(rd1.checked==true ){
        resultat.innerHTML= `${rd1.value}` ;

        Promo = 'Oui' ;
        ctr6=true;
        
    }else if(rd2.checked==true){
    
        resultat.innerHTML= `${rd2.value}` ;
        Promo = 'Non' ;
        ctr6=true;
    }else{

        ctr6=false;
    }

    // date
    if (date.value == ""){

        document.getElementById("date").style.border = "1px solid #DE0068";
        ctr5=false;
    }
    else{

        document.getElementById("date").style.border = "2px solid #59CE8F";
        ctr5=true;
    }

    // ctr 
    if (ctr1 == false || ctr2 == false || ctr3 == false || ctr4 == false  ||  ctr5 == false || ctr6 == false){
        preventDefault();
    }
    
    else{       
        addToLocalStorage();
        addToTable();
        clear();
    }   
}

// fonction pour ajouter le nouveau produit dans le localStorage
function addToLocalStorage(){
    let newPro = {
        nom: nom.value,
        marque: marque.value,
        prix: prix.value,
        AdType: AdType.value,
        date: date.value,
        Promo: Promo,
    }

        data.push(newPro);
        

    localStorage.setItem('product', JSON.stringify(data));
}

// fonction pour alimenter le tableau HTML depuis le localStorage
function addToTable(){
    document.getElementById('tbody').innerHTML = "";
    let table = '';
    for( let i = 0 ; i < data.length ; i++){
        table += `
        <tr>
            <td>${data[i].nom}</td>
            <td>${data[i].marque}</td>
            <td>${data[i].prix}</td>
            <td>${data[i].AdType}</td>
            <td>${data[i].date}</td>
            <td>${data[i].Promo}</td>
            <td><input type='button' onclick="UpdateData(${i})" id="update" value='🖍️'></td>
            <td><input type='button' onclick="deleteData(${i})" id="deletee" value='❌'></td>
            </tr>
            `;
    }  
    document.getElementById('tbody').innerHTML = table;

}



// fonction qui efface la ligne (tr) désirée 
function deleteData(i){
    data.splice(i,1);
    localStorage.product = JSON.stringify(data);
    addToTable();

}  

// fonction qui efface tous les champs du formulaire
function clear(){
    nom.value = '';
    marque.value = '';
    prix.value = '';
    AdType.value = '';
    date.value = '';
    Promo.value = '';
    
}

// update
function UpdateData(i) {
    nom.value = data[i].nom;
    marque.value = data[i].marque;
    prix.value = data[i].prix;
    AdType.value = data[i].AdType;
    date.value = data[i].date;
    Promo.value = data[i].Promo;
    submit.innerHTML= 'Update';
    
}
