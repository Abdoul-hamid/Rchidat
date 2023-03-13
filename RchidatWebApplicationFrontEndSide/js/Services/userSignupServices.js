// Deserialize User
let deserialize = (object) => {
    let dtoUser = new user(object.idUser,object.firstName,object.lastName,object.email,object.password,object.phone,object.gender,object.city,object.country,object.imageUrl,object.createdAt,object.modifiedAt,object.fullAddress,object.role);
    return dtoUser;
}
// Deserialize List User
let deserializeList = (jsonUserList) =>{
   let listUser = [];
   for(let item of jsonUserList)
   listUser.push(deserialize(item));
   return listUser;
}

/*******************************************    Synchronous Signup User     ***********************************/

let UserSignupSync = (user, callback) =>{
    try{
        fetch("https://localhost:7107/api/Signup",{
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

/*******************************************    Asynchronous Signup User     ***********************************/

let UserSignupAsync = async (user) =>
{
    try{
        let response = await fetch("https://localhost:7107/api/Signup", {
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