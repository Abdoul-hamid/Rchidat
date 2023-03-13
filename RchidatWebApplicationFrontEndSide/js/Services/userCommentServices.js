// Deserialize UserComment
let deserializeUserComment = (object) => {
    let dtoUserComment = new userComment(object.idComment,object.idUser,object.description,object.star,object.commentDate,object.state);
    return dtoUserComment;
}
// Deserialize List UserComment
let deserializeUserCommentList = (jsonUserCommentList) =>{
   let listUserComment = [];
   for(let item of jsonUserCommentList)
   listUserComment.push(deserializeUserComment(item));
   return listUserComment;
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
//const urlAPIUserComment="http://127.0.0.1:5500/api/UserComment";
const urlAPIUserComment = "https://localhost:7107/api/UserComment";

/*******************************************    Asynchronous add userComment     ***********************************/

let addUserCommentAsync = async (userComment) =>
{
    try{
        let response = await fetch(urlAPIUserComment, {
            method: "POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:userComment,
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

/*******************************************    Synchronous add userComment     ***********************************/

let addUserCommentSync = (userComment, callback) =>{
    try{
        fetch(urlAPIUserComment,{
            method:"POST",
            headers:{
                "Content-Type":'application/json',
            },
            body:userComment,
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

/*******************************************    Asynchronous update userComment     ***********************************/

let updateUserCommentAsync = async (id,userComment)=>{
    try{
        let response = await fetch(`${urlAPIUserComment}/${id}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
            },
            body:userComment,
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

/*******************************************    Synchronous update userComment     ***********************************/

let updateUserCommentSync = (id, userComment,callback) =>{
    try{
        fetch(`${urlAPIUserComment}/${id}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
            },
            body:userComment,
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

/*******************************************    Asynchronous delete userComment     ***********************************/

let deleteUserCommentAsync = async(id)=>{
    try{
        let response = await fetch(`${urlAPIUserComment}/${id}`,{
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

/*******************************************    Synchronous delete userComment     ***********************************/

let deleteUserCommentSync = (id, callback) =>{
    try{
        fetch(`${urlAPIUserComment}/${id}`,{
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

/*******************************************    ASynchronous get all userComments     ***********************************/

let getAllUserCommentAsync = async() =>{
    try{
        let response = await fetch(urlAPIUserComment,{
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

/*******************************************    Synchronous get all userComments     ***********************************/

let getAllUserCommentSync = (callback)=>{
    try{
        fetch(urlAPIUserComment,{
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

let getByIdUserComment = async(id)=>{
    try{
        let response =await fetch(`${urlAPIUserComment}/${id}`,{
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


/*******************************************    ASynchronous get all userComments     ***********************************/