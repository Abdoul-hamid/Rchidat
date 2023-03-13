// Deserialize User
let deserializeUser = (object) => {
    let dtoUser = new user(object.idUser,object.firstName,object.lastName,object.email,object.password,object.phone,object.gender,object.city,object.country,object.imageUser,object.createdAt,object.modifiedAt,object.fullAddress,object.role,object.state,object.status);
    return dtoUser;
}
// Deserialize List User
let deserializeUserList = (jsonUserList) =>{
   let listUser = [];
   for(let item of jsonUserList)
   listUser.push(deserializeUser(item));
   return listUser;
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

const urlAPIUser = "https://localhost:7107/api/User";

/*******************************************    Asynchronous add user     ***********************************/

let addUserAsync = async (user) =>
{
    try{
        let response = await fetch(urlAPIUser, {
            method: "POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:user,
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

/*******************************************    Synchronous add user     ***********************************/

let addUserSync = (user, callback) =>{
    try{
        fetch(urlAPIUser,{
            method:"POST",
            headers:{
                "Content-Type":'application/json',
            },
            body:user,
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

/*******************************************    Asynchronous update user     ***********************************/

let updateUserAsync = async (id,user)=>{
    try{
        let response = await fetch(`${urlAPIUser}/${id}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
            },
            body:user,
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

/*******************************************    Synchronous update user     ***********************************/

let updateUserSync = (id, user,callback) =>{
    try{
        fetch(`${urlAPIUser}/${id}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
            },
            body:user,
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

/*******************************************    Asynchronous delete user     ***********************************/

let deleteUserAsync = async(id)=>{
    try{
        let response = await fetch(`${urlAPIUser}/${id}`,{
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

/*******************************************    Synchronous delete user     ***********************************/

let deleteUserSync = (id, callback) =>{
    try{
        fetch(`${urlAPIUser}/${id}`,{
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

/*******************************************    ASynchronous get all users     ***********************************/

let getAllUserAsync = async() =>{
    try{
        let response = await fetch(urlAPIUser,{
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

/*******************************************    Synchronous get all users     ***********************************/

let getAllUserSync = (callback)=>{
    try{
        fetch(urlAPIUser,{
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

let getByIdUser = async(id)=>{
    try{
        let response =await fetch(`${urlAPIUser}/${id}`,{
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