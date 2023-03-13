// Deserialize User
let deserialize = (object) => {
    let dtoUserLogin = new userLogin(object.email,object.password);
    return dtoUserLogin;
}
// Deserialize List User
let deserializeList = (jsonUserLoginList) =>{
   let listUserLogin = [];
   for(let item of jsonUserLoginList)
   listUserLogin.push(deserialize(item));
   return listUserLogin;
}

/*******************************************    Asynchronous Login User     ***********************************/
let UserLoginAsync = async (userLogin) =>
{
    try{
        let response = await fetch("https://localhost:7107/api/Login", {
            method: "POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:userLogin,
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