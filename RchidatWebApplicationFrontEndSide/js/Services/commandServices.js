// Deserialize Command
let deserializeCommand = (object) => {
    let dtoCommand = new command(object.idCommand,object.idUser,object.commandDate,object.state);
    return dtoCommand;
}
// Deserialize List Command
let deserializeCommandList = (jsonCommandList) =>{
   let listCommand = [];
   for(let item of jsonCommandList)
   listCommand.push(deserializeCommand(item));
   return listCommand;
}
/************************************************************************
 * **********************************************************************
 * 
 *         
 *          Consumption of Web API (Communication with the back)
 * 
 * 
 * **********************************************************************
 ***********************************************************************/

const urlAPICommand = "https://localhost:7107/api/Command";

/*******************************************    Asynchronous add command     ***********************************/

let addCommandAsync = async (command) =>
{
    try{
        let response = await fetch(urlAPICommand, {
            method: "POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:command,
        });
        if(!response.ok){
            throw new Error("Network response was not ok");
        }
        return response.json();
    }
    catch(e){
        alertify.alert(e.message);
    }
}

/*******************************************    Synchronous add command     ***********************************/

let addCommandSync = (command, callback) =>{
    try{
        fetch(urlAPICommand,{
            method:"POST",
            headers:{
                "Content-Type":'application/json',
            },
            body:command,
        }).then(response =>{
            if(!response.ok){
                throw new Error("Network response was not Ok");
            }
            return response.json();
        }).then((response)=>{
            if(response.success){
                callback(response);
            }
            else{
                callback(null,response.message);
            }
        }).catch(error =>{
            callback(null,error.statusText);
        });
    }
    catch(e){
        callback(null,e.message);
    }
}

/*******************************************    Asynchronous update command     ***********************************/

let updateCommandAsync = async (id,command)=>{
    try{
        let response = await fetch(`${urlAPICommand}/${id}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
            },
            body:command,
        });
        if(!response.ok){
            throw new Error('Networt response was not ok');
        }
        return response.json();
    }
    catch(e){
        alertify.alert(e.message);
    }
}

/*******************************************    Synchronous update command     ***********************************/

let updateCommandSync = (id, command,callback) =>{
    try{
        fetch(`${urlAPICommand}/${id}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
            },
            body:command,
        }).then(response =>{
            if(!response.ok){
                throw new Error('Network response was not Ok');
            }
            return response.json();
        }).then((response)=>{
            if(response.success){
                callback(response);
            }
            else{
                callback(null, response.message);
            }
        }).catch((error =>{
            callback(null,error.statusText);
        }))
    }
    catch(e){
       callback(null,e.message)
    }
}

/*******************************************    Asynchronous delete command     ***********************************/

let deleteCommandAsync = async(id)=>{
    try{
        let response = await fetch(`${urlAPICommand}/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
            },
        });
        if(!response.ok){
            throw new Error("Network response was not Ok");
        }
        return response.json();
    }
    catch(e){
        alertify.alert(e.message);
    }
}

/*******************************************    Synchronous delete command     ***********************************/

let deleteCommandSync = (id, callback) =>{
    try{
        fetch(`${urlAPICommand}/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
            }
        }).then(response=>{
            if(!response.ok){
                throw new Error("Network response was not Ok");
            }
            return response.json();
        }).then((response)=>{
            if(response.success){
                callback(response);
            }
            else{
                callback(null,response.message);
            }
        }).catch(error=>{
            callback(null,error.statusText);
        })
    }
    catch(e){
        callback(null,e.message);
    }
}

/*******************************************    ASynchronous get all commands     ***********************************/

let getAllCommandAsync = async() =>{
    try{
        let response = await fetch(urlAPICommand,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
            },
        });
        if(!response.ok){
            throw new Error("Network response was not Ok");
        }
        return response.json();
    }
    catch(e){
        alertify.alert(e.message);
    }
}

/*******************************************    Synchronous get all commands     ***********************************/

let getAllCommandSync = (callback)=>{
    try{
        fetch(urlAPICommand,{
            method:"GET",
            headers:{
                'Content-Type':'application/json',
            },
        }).then(response=>{
            if(!response.ok){
                throw new Error("Network response was not Ok");
            }
        }).then((response)=>{
            if(response.success){
                callback(response);
            }
            else{
                callback(null,response.message)
            }
        }).catch(error=>{
            callback(null,error.statusText);
        });
    }
    catch(e){
        callback(null, e.message);
    }
}

let getByIdCommand = async(id)=>{
    try{
        let response =await fetch(`${urlAPICommand}/${id}`,{
            method:"GET",
            headers:{
                'Content-Type':'application/json',
            },
        });
        if(!response.ok){
            throw new Error("Network response was not Ok");
        }
        return response.json();
    }
    catch(e){
        alertify.alert(e.message);
    }
}