frmLogin.onsubmit = (event)=>{
    event.preventDefault();
    var userLogin = serialize(frmLogin.serialize(frmLogin.querySelectorAll("input")));
    var myMessageError = document.getElementById("message-error");
    userLogin = JSON.parse(userLogin);
    if(!userLogin.email){
        myMessageError.innerHTML="Veuillez saisir votre email";
        myMessageError.style="display:block";
    }
    else{
        if(!userLogin.password){
            myMessageError.innerHTML="Veuillez saisir votre password";
            myMessageError.style="display:block";
        }else{
            userLogin = JSON.stringify(userLogin);
            UserLoginAsync(userLogin).then(response =>{
                if(response.success){
                    frmLogin["email"].value="";
                    frmLogin["password"].value="";          
                    var userLoggedIn= response.data;  
                    var token =response.token;
                    sessionStorage.setItem("userLoggedIn",JSON.stringify(userLoggedIn));
                    sessionStorage.setItem("token",token);
                    console.log(userLoggedIn.role)
                    if(userLoggedIn.role=="Administrator")
                    location.replace("index.html");
                    else
                    location.replace("index.html");
                }
                else{
                    //alertify.alert(response.message);
                    myMessageError.innerHTML=response.message;
                    myMessageError.style="display:block";
                }
            }).catch(error=>{
                messageError(error);
            });
        }
    }
}