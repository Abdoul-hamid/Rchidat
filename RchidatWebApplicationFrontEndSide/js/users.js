let boxContainer = document.getElementById("box-container");
//let listUser=[];
let content ="";
let bindUserToDOM = (user) =>{
    content+=`<div class="box" id="user${user.idUser}">   
    <h3 class="title">${user.lastName} ${user.firstName}</h3>
    <img src="../images/pic-1.png"/>
    <p class="likes">Email : <span>${user.email}</span></p>
    <p class="likes">Tel : <span>${user.phone}</span></p>
    <p class="likes">Genre : <span>${user.gender}</span></p>
    <p class="likes">Ville : <span>${user.city}</span></p>
    <p class="likes">Pays : <span>${user.country}</span></p>
    <p class="likes">Adresse complète : <span>${user.fullAddress}</span></p>
    <p class="likes">Rôle : <span>${user.role}</span></p>
    <p class="likes">Créer à : <span>${user.createdAt}</span></p>
    <p class="likes">Modifier à : <span>${user.modifiedAt}</span></p>
    <p class="likes">Image : <span>${user.imageUser}</span></p>`;
    if(user.state){
        content +=`<p class="likes"><span class="active">&#183; actif</span></p>`;
    }
    else{
        content +=`<p class="likes"><span class="disable">&#183; inactif</span></p>`;
    }
    if(user.status){
        content +=`<p class="likes"><span class="active">&#183; connecté</span></p>`;
    }
    else{
        content +=`<p class="likes"><span class="disable">&#183; déconnecté</span></p>`;
    }
    content+=`<a href="#" class="inline-option-btn" onclick="updateUser(${user.idUser})"><i class="fa fa-edit"></i>  Modifier</a>
    <a href="#" class="inline-delete-btn" onclick="deleteUser(${user.idUser})"><i class="fa fa-trash"></i>  Supprimer</a>
 </div>`;
 boxContainer.innerHTML +=content;
 content="";
}
// &#183;
let bindDataUserToDOM = (listUser) =>{
    boxContainer.innerHTML = "";
    listUser.forEach(user => {
        bindUserToDOM(user);
    });
}

getAllUserAsync().then(response =>{
    if(response.success){   
        listUser = deserializeUserList(response.data);
        bindDataUserToDOM(listUser);
        // alertify.success(response.message);
    }
    else{
        alertify.alert(response.message);
    }
}).catch(error=>{
    messageError(error);
});

let deleteUser = (id)=>{
    if(id){
        alertify.set({
            labels:{
                ok:"Supprimer",
                cancel:"Annuler"
            }
        });
        alertify.confirm("Voulez-vous vraiment supprimer ce compte utilisateur ?",function(e){
            if(e){
                deleteUserSync(id,function(response,error){
                    if(response==null){
                        alertify.error(error);
                    }
                    else{
                        document.getElementById(`user${id}`).remove();
                        alertify.success(response.message);
                    }
                })
            }
        });
    }
}
let updateUser=(id)=>{
    getByIdUser(id).then(response=>{
        if(response.success){
            let user =deserializeUser(response.data);        
            frmUser["IdUser"].value=user.idUser;
            frmUser["FirstName"].value=user.firstName;
            frmUser["LastName"].value=user.lastName;
            frmUser["Email"].value=user.email;
            frmUser["Password"].value=user.password;
            frmUser["Phone"].value=user.phone;
            frmUser["Gender"].value=user.gender;
            frmUser["City"].value=user.city;
            frmUser["Country"].value=user.country;
            frmUser["State"].value=user.state ===true? "1":"0";
            frmUser["Gender"].value=user.gender ==="Femme"? "Femme":"Homme";
            if(user.role==="Administrator"){
                frmUser["Role"].value="Administrator";
            }
            else if(user.role==="Seller"){
                frmUser["Role"].value="Seller";
            }
            else{
                frmUser["Role"].value="Client";
            }
            modalTitle.innerHTML = "Modifier un user";
            actionToDo = "modify";
            readOnlyFrmUserInputs(true);
            userModal.show();
        }else{
            alertify.error(response.message);
        }
    }).catch(e=>{messageError(e);});
}

const userModal = new bootstrap.Modal('#modal-add-update-user',{
    keyboard:false
});
const modalTitle = document.querySelector(".modal-title");
let actionToDo = "";
MenuFrmUser.onclick = () =>{
    modalTitle.innerHTML = "Ajouter un utilisateur";
    actionToDo = "add";
    readOnlyFrmUserInputs(false);
    userModal.show();
}
let closeModal = document.querySelectorAll(".close-modal-user");
hideModal = ()=>{
    frmUser.reset();
    userModal.hide();
}
closeModal.forEach(item=>{
    item.addEventListener('click',()=>{
        hideModal();
    });
});
frmUser.onsubmit=(event)=>{
    event.preventDefault();
    var user = frmUser.serialize(frmUser.querySelectorAll("input"));
    user["State"] = frmUser["State"].value === "1" ? true : false;
    user["Gender"] = frmUser["Gender"].value ==="Femme" ? "Femme":"Homme";
    if(frmUser["Role"].value==="Administrator"){
        user["Role"]="Administrator";
    }
    else if(frmUser["Role"].value==="Seller"){
        user["Role"]="Seller";
    }
    else{
        user["Role"]="Client";
    }
    //user["ImageUser"]="../images/pic-1.png";
    user = serialize(user);
    if (actionToDo === "add") {
        addUserAsync(user).then(response => {
            if (response.success) {
                bindUserToDOM(deserializeUser(response.data));
                hideModal();
                alertify.success(response.message);
            } else {
                alertify.error(response.message);
            }
        }).catch(e => { messageError(e); });
    }
    else {
        let id = frmUser["IdUser"].value;
        if (id) {
            updateUserAsync(id, user).then(response => {
                if (response.success) {
                    let box = document.getElementById(`user${id}`);
                    box.innerHTML = "";
                    user = deserializeUser(response.data);
                    content = "";
                    content+=`<h3 class="title">${user.lastName} ${user.firstName}</h3>
                    <img src="../images/pic-1.png"/>
                    <p class="likes">Email : <span>${user.email}</span></p>
                    <p class="likes">Tel : <span>${user.phone}</span></p>
                    <p class="likes">Genre : <span>${user.gender}</span></p>
                    <p class="likes">Ville : <span>${user.city}</span></p>
                    <p class="likes">Pays : <span>${user.country}</span></p>
                    <p class="likes">Adresse complète : <span>${user.fullAddress}</span></p>
                    <p class="likes">Rôle : <span>${user.role}</span></p>
                    <p class="likes">Créer à : <span>${user.createdAt}</span></p>
                    <p class="likes">Modifier à : <span>${user.modifiedAt}</span></p>
                    <p class="likes">Image : <span>${user.imageUser}</span></p>`;
                    if(user.state){
                        content +=`<p class="likes"><span class="active">&#183; actif</span></p>`;
                    }
                    else{
                        content +=`<p class="likes"><span class="disable">&#183; inactif</span></p>`;
                    }
                    if(user.status){
                        content +=`<p class="likes"><span class="active">&#183; connecté</span></p>`;
                    }
                    else{
                        content +=`<p class="likes"><span class="disable">&#183; déconnecté</span></p>`;
                    }
                    content+=`<a href="#" class="inline-option-btn" onclick="updateUser(${user.idUser})"><i class="fa fa-edit"></i>  Modifier</a>
                    <a href="#" class="inline-delete-btn" onclick="deleteUser(${user.idUser})"><i class="fa fa-trash"></i>  Supprimer</a>`;
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
let readOnlyFrmUserInputs = (bool) =>{
    var inputs = frmUser.querySelectorAll("input");
    inputs.forEach(elt=>{
        elt.disabled=bool;
    });
    Gender.disabled=bool;
}