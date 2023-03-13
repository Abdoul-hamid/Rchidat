let boxContainer = document.getElementById("box-container");
let listComment=[];
let content ="";
let bindCommentToDOM = (comment,userMakedComment) =>{
    
    content+=`<div class="box" id="comment${comment.idComment}">   
    <h3 class="title">${userMakedComment.lastName} ${userMakedComment.firstName}</h3>
    <img src="../images/pic-1.png"/>
    <p class="likes">Description : <span>${comment.description}</span></p>
    <p class="likes">Fait le : <span>${comment.commentDate}</span></p>`;
    content+= `<div class="likes">Etoile :<span>`;
    for (let i = 0; i < comment.star; i++) {
        content+= `<i class="fas fa-star"></i>`;
    }
    content+=`</span></div>`;

    if(comment.state){
        content +=`<p class="likes"><span class="active">&#183; activé</span></p>`;
    }
    else{
        content +=`<p class="likes"><span class="disable">&#183; désactivé</span></p>`;
    }
    content +=`<a href="#" class="inline-option-btn"  onclick="updateComment(${comment.idComment})"><i class="fa fa-edit"></i>  Modifier</a>
    <a href="#" class="inline-delete-btn" onclick="deleteComment(${comment.idComment})"><i class="fa fa-trash"></i>  Supprimer</a>
 </div>`;
 boxContainer.innerHTML +=content;
 content="";
}

let bindDataCommentToDOM = (listComment) =>{
    boxContainer.innerHTML = "";
    let userMakedComment;
    listComment.forEach(comment => {
        getByIdUser(comment.idUser).then(response=>{
            if(response.success){
                userMakedComment = deserializeUser(response.data) ;
                bindCommentToDOM(comment,userMakedComment);
            }
            else{
                alertify.alert(response.message);
            }
        }).catch(error=>{
            messageError(error);
        });
        
    });
}

getAllUserCommentAsync().then(response =>{
    if(response.success){   
        listComment =deserializeUserCommentList(response.data);
        bindDataCommentToDOM(listComment);
        // alertify.success(response.message);
    }
    else{
        alertify.alert(response.message);
    }
}).catch(error=>{
    messageError(error);
});

let updateComment=(id)=>{
    getByIdUserComment(id).then(response=>{
        if(response.success){
            let comment =deserializeUserComment(response.data);
            frmComment["IdUser"].value=comment.idUser;
            frmComment["IdComment"].value=comment.idComment;
            frmComment["Description"].value=comment.description;
            frmComment["Star"].value=comment.star;
            frmComment["State"].value=comment.state ===true? "1":"0";
            modalTitle.innerHTML = "Modifier un article";
            actionToDo = "modify";
            readOnlyFrmCommentInputs(true);
            commentModal.show();
        }else{
            alertify.error(response.message);
        }
    }).catch(e=>{messageError(e);});
}

let deleteComment = (id)=>{
    if(id){
        alertify.set({
            labels:{
                ok:"Supprimer",
                cancel:"Annuler"
            }
        });
        alertify.confirm("Voulez-vous vraiment supprimer ce commentaire ?",function(e){
            if(e){
                deleteUserCommentSync(id,function(response,error){
                    if(response==null){
                        alertify.error(error);
                    }
                    else{
                        document.getElementById(`comment${id}`).remove();
                        alertify.success(response.message);
                    }
                })
            }
        });
    }
}


const commentModal = new bootstrap.Modal('#modal-add-update-comment',{
    keyboard:false
});
const modalTitle = document.querySelector(".modal-title");
let actionToDo = "";
// MenuFrmComment.onclick = () =>{
//     modalTitle.innerHTML = "Ajouter un commantaire";
//     actionToDo = "add";
//     readOnlyFrmCommentInputs(false);
//     commentModal.show();
// }
let closeModal = document.querySelectorAll(".close-modal-comment");
hideModal = ()=>{
    frmComment.reset();
    commentModal.hide();
}
closeModal.forEach(item=>{
    item.addEventListener('click',()=>{
        hideModal();
    });
});

frmComment.onsubmit = (event) => {
    event.preventDefault();
    var comment = frmComment.serialize(frmComment.querySelectorAll("input"));
    comment["State"] = frmComment["State"].value === "1" ? true : false;
    comment = serialize(comment);
    if (actionToDo === "add") {
        // addUserCommentAsync(comment).then(response => {
        //     if (response.success) {
        //         bindArticleToTableArticle(deserializeUserComment(response.data));
        //         hideModal();
        //         alertify.success(response.message);
        //     } else {
        //         alertify.error(response.message);
        //     }
        // }).catch(e => { messageError(e); });
    }
    else {
        let id = frmComment["IdComment"].value;
        let idUser=frmComment["IdUser"].value;
        if (id) {
        updateUserCommentAsync(id, comment).then(response => {
                if (response.success) {
                    let box = document.getElementById(`comment${id}`);
                    box.innerHTML = "";
                    comment = deserializeUserComment(response.data);
                    getByIdUser(idUser).then(response=>{
                        if(response.success){
                            let userMakedComment=deserializeUser(response.data);
                            content = "";
                    content+=`<h3 class="title">${userMakedComment.lastName} ${userMakedComment.firstName}</h3>
                        <img src="../images/pic-1.png"/>
                        <p class="likes">Description : <span>${comment.description}</span></p>
                        <p class="likes">Fait le : <span>${comment.commentDate}</span></p>`;
                        content+= `<div class="likes">Etoile :<span>`;
                        for (let i = 0; i < comment.star; i++) {
                            content+= `<i class="fas fa-star"></i>`;
                        }
                        content+=`</span></div>`;

                        if(comment.state){
                            content +=`<p class="likes"><span class="active">&#183; activé</span></p>`;
                        }
                        else{
                            content +=`<p class="likes"><span class="disable">&#183; désactivé</span></p>`;
                        }
                        content +=`<a href="#" class="inline-option-btn"  onclick="updateComment(${comment.idComment})"><i class="fa fa-edit"></i>  Modifier</a>
                        <a href="#" class="inline-delete-btn" onclick="deleteComment(${comment.idComment})"><i class="fa fa-trash"></i>  Supprimer</a>`;
                    box.innerHTML = content;
                    content = "";
                        }
                        else{
                            alertify.error(response.message)
                        }
                    }).catch(error=>{messageError(error);});
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
let readOnlyFrmCommentInputs = (bool) =>{
    var inputs = frmComment.querySelectorAll("input");
    inputs.forEach(elt=>{
        elt.disabled=bool;
    });
}