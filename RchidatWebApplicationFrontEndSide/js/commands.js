let boxContainer = document.getElementById("box-container");
let listCommand=[];
let content ="";
let bindCommandToDOM = (command) =>{
    content+=`<div class="box" id="command${command.idCommand}">   
    <h3 class="title">${command.name}</h3>`
    if(command.state){
        content +=`<p class="likes"><span class="active">&#183;${command.state}</span></p>`;
    }
    else{
        content +=`<p class="likes"><span class="disable">&#183;${command.state}</span></p>`;
    }
    content +=`<a href="#" class="inline-option-btn"  onclick="updateCommand(${command.idCommand})"><i class="fa fa-edit"></i>  Modifier</a>
    <a href="#" class="inline-delete-btn" onclick="deleteCommand(${command.idCommand})"><i class="fa fa-trash"></i>  Supprimer</a>
 </div>`;
 boxContainer.innerHTML +=content;
 content ="";
}

let bindDataCommandToDOM = (listCommand) =>{
    boxContainer.innerHTML = "";
    listCommand.forEach(command => {
        bindCommandToDOM(command);
    });
}

getAllCommandAsync().then(response =>{
    if(response.success){   
        listCommand = deserializeCommandList(response.data);
        bindDataCommandToDOM(listCommand);
        // alertify.success(response.message);
    }
    else{
        alertify.alert(response.message);
    }
}).catch(error=>{
    messageError(error);
});


const commandModal = new bootstrap.Modal('#modal-add-update-command',{
    keyboard:false
});
const modalTitle = document.querySelector(".modal-title");
let actionToDo = "";
MenuFrmCommand.onclick = () =>{
    modalTitle.innerHTML = "Ajouter une commande";
    actionToDo = "Ajout";
    commandModal.show();
}
let closeModal = document.querySelectorAll(".close-modal-command");
hideModal = ()=>{
    frmCommand.reset();
    commandModal.hide();
}
closeModal.forEach(item=>{
    item.addEventListener('click',()=>{
        hideModal();
    });
});