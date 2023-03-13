// let boxContainer = document.getElementById("box-container");
let listArticle = [];
let listCatalog = [];
// let content="";


// let bindArticleToDOM = (article) =>{
//     content+=`<div class="box" id="article${article.idArticle}">   
//     <h3 class="title">Désignation : ${article.designation}</h3>
//     <img src="../images/pic-1.png"/>
//     <p class="likes">Description : <span>${article.description}</span></p>
//     <p class="likes">Prix : <span>${article.price}</span></p>
//     <p class="likes">Image : <span>${article.imageArticle}</span></p>
//     <p class="likes">Min-Stock : <span>${article.minStock}</span></p>
//     <p class="likes">Max-Stock complète : <span>${article.maxStock}</span></p>
//     <p class="likes">Quantité : <span>${article.quantity}</span></p>
//     <p class="likes">Expire le : <span>${article.expireDate}</span></p>
//     <p class="likes">Taux de reduction : <span>${article.reductionRate}</span></p>
//     <p class="likes">Ancien prix : <span>${article.lastPrice}</span></p>`
//     if(article.state){
//         content +=`<p class="likes"><span class="active">&#183; activé</span></p>`;
//     }
//     else{
//         content +=`<p class="likes"><span class="disable">&#183; désactivé</span></p>`;
//     }
//     content +=`<a href="#" class="inline-option-btn" onclick="updateArticle(${article.idArticle})"><i class="fa fa-edit"></i>  Modifier</a>
//     <a href="#" class="inline-delete-btn" onclick="deleteArticle(${article.idArticle})"><i class="fa fa-trash"></i>  Supprimer</a>
//  </div>`;
//  boxContainer.innerHTML +=content;
//  content="";
// }



// let bindDataArticleToDOM = (listArticle) =>{
//     boxContainer.innerHTML = "";
//     listArticle.forEach(article => {
//         bindArticleToDOM(article);
//     });
// }
let tableBoxLeft = document.getElementById("table-box-left"),
    tableBoxRight = document.getElementById("table-box-right"),
    tableRightBody = document.getElementById("table-right-body"),
    headingContent = document.getElementById("heading-content"),
    tableLeftBody = document.getElementById("table-left-body");
tableBoxRight.style.display = "none";
let content = "";
let bindCatalogToTableCatalog = (catalog, i) => {
    content = `<tr onclick="ShowArticlesByCatalog(${catalog.idCatalog},'${catalog.name}')">
    <td>${i}</td>
    <td>${catalog.name}</td>
    </tr>`;
    tableLeftBody.innerHTML += content;
    content = "";

}
let bindDataCatalogToTableCatalog = (listCatalog) => {
    tableLeftBody.innerHTML = "";
    let i = 1;
    listCatalog.forEach(catalog => {
        bindCatalogToTableCatalog(catalog, i++);
    });
}
getAllCatalogAsync().then(response => {
    if (response.success) {
        listCatalog = deserializeCatalogList(response.data);
        bindDataCatalogToTableCatalog(listCatalog);
        // alertify.success(response.message);
    }
    else {
        alertify.alert(response.message);
    }
}).catch(error => {
    messageError(error);
});

let bindArticleToTableArticle = (article) => {
    content = `<tr id="article${article.idArticle}">
    <td>${article.designation}</td>
    <td>${article.price}</td>
    <td>${article.quantity}</td>
    <td>${article.expireDate}</td>`;
    if (article.state) {
        //&#183; 
        content += `<td><p class="activeState">activée</p></td>`;
    }
    else {
        //&#183; 
        content += `<td><p class="disableState">désactivée</p></td>`;
    }
    content += `<td>
        <a href="#" class="inline-check-btn" onclick="ShowArticle(${article.idArticle})"><i class="fa fa-eye"></i></a>
        <a href="#" class="inline-option-btn" onclick="EditArticle(${article.idArticle})"><i class="fa fa-edit"></i></a>
        <a href="#" class="inline-delete-btn" onclick="DeleteArticle(${article.idArticle})"><i class="fa fa-trash"></i></a>
    </td>
    </tr>`;
    tableRightBody.innerHTML += content;
    content = "";
}
let bindDataArticleToTableArticle = (listArticle, name) => {
    headingContent.innerHTML = name;
    tableRightBody.innerHTML = "";
    listArticle.forEach(article => {
        bindArticleToTableArticle(article);
    });
    tableBoxRight.style.display = "block";
}

let ShowArticlesByCatalog = (idCatalog, name) => {
    frmArticle["IdCatalog"].value = idCatalog;
    getArticlesByCatalogAsync(idCatalog).then(response => {
        if (response.success) {
            listArticle = deserializeArticleList(response.data);
            bindDataArticleToTableArticle(listArticle, name);
            // alertify.success(response.message);
        }
        else {
            alertify.alert(response.message);
        }
    }).catch(error => {
        messageError(error);
    });
}
// getAllArticleAsync().then(response =>{
//     if(response.success){   
//         listArticle = deserializeArticleList(response.data);
//         bindDataArticleToDOM(listArticle);

//         // alertify.success(response.message);
//     }
//     else{
//         alertify.alert(response.message);
//     }
// }).catch(error=>{
//     messageError(error);
// });


let ShowArticle = (id) => {
    getByIdArticle(id).then(response=>{
        if(response.success){
            let article =deserializeArticle(response.data);
            showArticleModalContent.innerHTML="";
            content+=`<div class="showArticleContent">   
                    <h3 class="title">Désignation : ${article.designation}</h3>
                    <img src="../images/pic-1.png"/>
                    <p class="likes">Description : <span>${article.description}</span></p>
                    <p class="likes">Prix : <span>${article.price}</span></p>
                    <p class="likes">Image : <span>${article.imageArticle}</span></p>
                    <p class="likes">Min-Stock : <span>${article.minStock}</span></p>
                    <p class="likes">Max-Stock complète : <span>${article.maxStock}</span></p>
                    <p class="likes">Quantité : <span>${article.quantity}</span></p>
                    <p class="likes">Expire le : <span>${article.expireDate}</span></p>
                    <p class="likes">Taux de reduction : <span>${article.reductionRate}</span></p>
                    <p class="likes">Ancien prix : <span>${article.lastPrice}</span></p>`;
    if(article.state){
        content +=`<p class="likes"><span class="active">&#183; activé</span></p>`;
    }
    else{
        content +=`<p class="likes"><span class="disable">&#183; désactivé</span></p>`;
    }
//     content +=`<a href="#" class="inline-option-btn" onclick="updateArticle(${article.idArticle})"><i class="fa fa-edit"></i>  Modifier</a>
//     <a href="#" class="inline-delete-btn" onclick="deleteArticle(${article.idArticle})"><i class="fa fa-trash"></i>  Supprimer</a>
//  </div>`;
showArticleModalContent.innerHTML +=content;
 content="";   
            showArticleModal.show();
        }else{
            alertify.error(response.message);
        }
    }).catch(e=>{messageError(e);});
}
let EditArticle = (id) => {
    getByIdArticle(id).then(response=>{
        if(response.success){
            let article =deserializeArticle(response.data);        
            frmArticle["IdArticle"].value=article.idArticle;
            frmArticle["IdCatalog"].value=article.idCatalog;
            frmArticle["Designation"].value=article.designation;
            frmArticle["Description"].value=article.description;
            frmArticle["Price"].value=article.price;
            frmArticle["MinStock"].value=article.minStock;
            frmArticle["MaxStock"].value=article.maxStock;
            frmArticle["Quantity"].value=article.quantity;
            frmArticle["ReductionRate"].value=article.reductionRate;
            frmArticle["ExpireDate"].value=(article.expireDate);
            // dateFormat(article.expireDate).toISOString().substring(0, 10);
            // dateFormat(article.expireDate)
            frmArticle["LastPrice"].value=article.lastPrice;
            frmArticle["ImageArticle"].value=article.imageArticle;
            frmArticle["State"].value=article.state ===true? "1":"0";
            modalTitle.innerHTML = "Modifier un article";
            actionToDo = "modify";
            articleModal.show();
        }else{
            alertify.error(response.message);
        }
    }).catch(e=>{messageError(e);});
}
let DeleteArticle = (id) => {
    if (id) {
        alertify.set({
            labels: {
                ok: "Supprimer",
                cancel: "Annuler"
            }
        });
        alertify.confirm("Voulez-vous vraiment supprimer ce produit ?", function (e) {
            if (e) {
                deleteArticleSync(id, function (response, error) {
                    if (response == null) {
                        alertify.error(error);
                    }
                    else {
                        document.getElementById(`article${id}`).remove();
                        alertify.success(response.message);
                    }
                })
            }
        });
    }
}

const articleModal = new bootstrap.Modal('#modal-add-update-article', {
    keyboard: false
});
const modalTitle = document.querySelector(".modal-title");
let actionToDo = "";
MenuFrmArticle.onclick = () => {
    modalTitle.innerHTML = "Ajouter un article";
    actionToDo = "add";
    articleModal.show();
}
let closeModal = document.querySelectorAll(".close-modal-article");
hideModal = () => {
    frmArticle.reset();
    articleModal.hide();
}
closeModal.forEach(item => {
    item.addEventListener('click', () => {
        hideModal();
    });
});
frmArticle.onsubmit = (event) => {
    event.preventDefault();
    var article = frmArticle.serialize(frmArticle.querySelectorAll("input"));
    article["State"] = frmArticle["State"].value === "1" ? true : false;
    article["ImageArticle"]="../images/pic-1.png";
    article = serialize(article);
    if (actionToDo === "add") {
        addArticleAsync(article).then(response => {
            if (response.success) {
                bindArticleToTableArticle(deserializeArticle(response.data));
                hideModal();
                alertify.success(response.message);
            } else {
                alertify.error(response.message);
            }
        }).catch(e => { messageError(e); });
    }
    else {
        let id = frmArticle["IdArticle"].value;
        if (id) {
            updateArticleAsync(id, article).then(response => {
                if (response.success) {
                    let box = document.getElementById(`article${id}`);
                    box.innerHTML = "";
                    article = deserializeArticle(response.data);
                    content = "";
                    content = `<td>${article.designation}</td>
                                <td>${article.price}</td>
                                <td>${article.quantity}</td>
                                <td>${article.expireDate}</td>`;
                    if (article.state) {
                        //&#183; 
                        content += `<td><p class="activeState">activée</p></td>`;
                    }
                    else {
                        //&#183; 
                        content += `<td><p class="disableState">désactivée</p></td>`;
                    }
                    content += `<td>
        <a href="#" class="inline-check-btn" onclick="ShowArticle(${article.idArticle})"><i class="fa fa-eye"></i></a>
        <a href="#" class="inline-option-btn" onclick="EditArticle(${article.idArticle})"><i class="fa fa-edit"></i></a>
        <a href="#" class="inline-delete-btn" onclick="DeleteArticle(${article.idArticle})"><i class="fa fa-trash"></i></a>
    </td>`;
                    box.innerHTML = content;
                    content = "";
                    //bindCatalogToDOM(deserializeCatalog(response.data));
                    hideModal();
                    alertify.success(response.message);
                } else {
                    alertify.error(response.message);
                }
            }).catch(e => { messageError(e); });
        }
        else {
            alertify.error("Identifiant non reconnu");
        }
    }
}
const showArticleModal = new bootstrap.Modal('#showArticleModal', {
    keyboard: false
});