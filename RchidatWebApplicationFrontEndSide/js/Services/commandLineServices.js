// Deserialize CommandLine
let deserializeCommandLine = (object) => {
    let dtoCommandLine = new commandLine(object.idCommandLine,object.idArticle,object.quantity);
    return dtoCommandLine;
}
// Deserialize List CommandLine
let deserializeCommandLineList = (jsonCommandLineList) =>{
   let listCommandLine = [];
   for(let item of jsonCommandLineList)
   listCommandLine.push(deserializeCommandLine(item));
   return listCommandLine;
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

const urlAPICommandLine = "https://localhost:7107/api/CommandLine";

/*******************************************    Asynchronous add commandLine     ***********************************/

let addCommandLineAsync = async (commandLine) =>
{
    try{
        let response = await fetch(urlAPICommandLine, {
            method: "POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:commandLine,
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

/*******************************************    Synchronous add commandLine     ***********************************/

let addCommandLineSync = (commandLine, callback) =>{
    try{
        fetch(urlAPICommandLine,{
            method:"POST",
            headers:{
                "Content-Type":'application/json',
            },
            body:commandLine,
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

/*******************************************    Asynchronous update commandLine     ***********************************/

let updateCommandLineAsync = async (id1,id2,commandLine)=>{
    try{
        let response = await fetch(`${urlAPICommandLine}/${id1}/${id2}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
            },
            body:commandLine,
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

/*******************************************    Synchronous update commandLine     ***********************************/

let updateCommandLineSync = (id1,id2, commandLine,callback) =>{
    try{
        fetch(`${urlAPICommandLine}/${id1}/${id2}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
            },
            body:commandLine,
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

/*******************************************    Asynchronous delete commandLine     ***********************************/

let deleteCommandLineAsync = async(id1,id2)=>{
    try{
        let response = await fetch(`${urlAPICommandLine}/${id1}/${id2}`,{
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

/*******************************************    Synchronous delete commandLine     ***********************************/

let deleteCommandLineSync = (id1,id2, callback) =>{
    try{
        fetch(`${urlAPICommandLine}/${id1}/${id2}`,{
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

/*******************************************    ASynchronous get all commandLines     ***********************************/

let getAllCommandLineAsync = async() =>{
    try{
        let response = await fetch(urlAPICommandLine,{
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

/*******************************************    Synchronous get all commandLines     ***********************************/

let getAllCommandLineSync = (callback)=>{
    try{
        fetch(urlAPICommandLine,{
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

let getByIdCommandLine = async(id1,id2)=>{
    try{
        let response =await fetch(`${urlAPICommandLine}/${id1}/${id2}`,{
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