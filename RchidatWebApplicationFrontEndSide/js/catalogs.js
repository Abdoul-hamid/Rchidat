let boxContainer = document.getElementById("box-container");
//let listCatalog=[];
let content="";
let bindCatalogToDOM = (catalog) =>{
    content +=`<div class="box" id="catalog${catalog.idCatalog}">   
    <h3 class="title">${catalog.name}</h3>`
    if(catalog.state){
        content +=`<p class="likes"><span class="active">&#183; activée</span></p>`;
    }
    else{
        content +=`<p class="likes"><span class="disable">&#183; désactivée</span></p>`;
    }
    content +=`<a href="#" class="inline-option-btn" onclick="updateCatalog(${catalog.idCatalog})"><i class="fa fa-edit"></i>  Modifier</a>
    <a href="#" class="inline-delete-btn" onclick="deleteCatalog(${catalog.idCatalog})"><i class="fa fa-trash"></i>  Supprimer</a>
 </div>`;
 boxContainer.innerHTML+=content;
 content="";
}

let bindDataCatalogToDOM = (listCatalog) =>{
    boxContainer.innerHTML = "";
    listCatalog.forEach(catalog => {
        bindCatalogToDOM(catalog);
    });
}

getAllCatalogAsync().then(response =>{
    if(response.success){   
        listCatalog = deserializeCatalogList(response.data);
        bindDataCatalogToDOM(listCatalog);
        // alertify.success(response.message);
    }
    else{
        alertify.alert(response.message);
    }
}).catch(error=>{
    messageError(error);
});

let deleteCatalog = (id)=>{
    if(id){
        alertify.set({
            labels:{
                ok:"Supprimer",
                cancel:"Annuler"
            }
        });
        alertify.confirm("Voulez-vous vraiment supprimer ce catalogue ?",function(e){
            if(e){
                deleteCatalogSync(id,function(response,error){
                    if(response==null){
                        alertify.error(error);
                    }
                    else{
                        document.getElementById(`catalog${id}`).remove();
                        alertify.success(response.message);
                    }
                })
            }
        });
    }
}
let updateCatalog=(idCatalog)=>{
    getByIdCatalog(idCatalog).then(response=>{
        if(response.success){
            let catalog =deserializeCatalog(response.data);        
            frmCatalog["IdCatalog"].value=catalog.idCatalog;
            frmCatalog["Name"].value=catalog.name;
            frmCatalog["State"].value=catalog.state ===true? "1":"0";
            // if(catalog.state){
            //     frmCatalog["State"].value="1";
            // }
            // else{
            //     frmCatalog["State"].value="0";
            // }
            modalTitle.innerHTML = "Modifier un catalogue";
            actionToDo = "modify";
            catalogModal.show();
        }else{
            alertify.error(response.message);
        }
    }).catch(e=>{messageError(e);});
}
const catalogModal = new bootstrap.Modal('#modal-add-update-catalog',{
    keyboard:false
});
const modalTitle = document.querySelector(".modal-title");
let actionToDo = "";
MenuFrmCatalog.onclick = () =>{
    modalTitle.innerHTML = "Ajouter un catalogue";
    actionToDo = "add";
    catalogModal.show();
}
let closeModal = document.querySelectorAll(".close-modal-catalog");
hideModal = ()=>{
    frmCatalog.reset();
    catalogModal.hide();
}
closeModal.forEach(item=>{
    item.addEventListener('click',()=>{
        hideModal();
    });
});
frmCatalog.onsubmit= (event) =>{
    event.preventDefault();
    var catalog = frmCatalog.serialize(frmCatalog.querySelectorAll("input"));
    catalog["State"]=frmCatalog["State"].value ==="1"? true:false;
    catalog=serialize(catalog);
    if(actionToDo==="add"){
        addCatalogAsync(catalog).then(response=>{
            if(response.success){
                bindCatalogToDOM(deserializeCatalog(response.data));
                hideModal();
                alertify.success(response.message);
            }else{
                alertify.error(response.message);
            }
        }).catch(e=>{messageError(e);});
    }
    else{
        let id =frmCatalog["IdCatalog"].value;
        if(id){
            updateCatalogAsync(id,catalog).then(response=>{
                if(response.success){
                    let box = document.getElementById(`catalog${id}`);
                    box.innerHTML="";
                    catalog =deserializeCatalog(response.data);
                    content ="";
                    content +=`<h3 class="title">${catalog.name}</h3>`
                        if(catalog.state){
                            content +=`<p class="likes"><span class="active">&#183; activée</span></p>`;
                        }
                        else{
                            content +=`<p class="likes"><span class="disable">&#183; désactivée</span></p>`;
                        }
                        content +=`<a href="#" class="inline-option-btn" onclick="updateCatalog(${catalog.idCatalog})"><i class="fa fa-edit"></i>  Modifier</a>
                        <a href="#" class="inline-delete-btn" onclick="deleteCatalog(${catalog.idCatalog})"><i class="fa fa-trash"></i>  Supprimer</a>`;
                        box.innerHTML=content;
                        content="";
                    //bindCatalogToDOM(deserializeCatalog(response.data));
                    hideModal();
                    alertify.success(response.message);
                }else{
                    alertify.error(response.message);
                }
            }).catch(e=>{messageError(e);});
        }
        else{
            alertify.error("Identifiant non reconnu");
        }
    }
}