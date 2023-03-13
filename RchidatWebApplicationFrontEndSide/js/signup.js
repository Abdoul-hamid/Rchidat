frmSignup.onsubmit = (event) =>{
    event.preventDefault();
    var myMessageError = document.getElementById("message-error");
    var user = serialize(frmSignup.serialize(frmSignup.querySelectorAll("input")));
    user = JSON.parse(user);
    //             user.Gender = "";
    //             user.City = "";
    //             user.Country = "";
    //             user.Role = "";
    // console.log(user);
    if(!user.FirstName){
        myMessageError.innerHTML="Veuillez saisir votre prénom";
        myMessageError.style="display:block";
    }
    else{
        if(!user.LastName){
            myMessageError.innerHTML="Veuillez saisir votre nom";
            myMessageError.style="display:block";
        }
        else{
            if(!user.Email){
                myMessageError.innerHTML="Veuillez saisir votre email";
                myMessageError.style="display:block";
            }
            else{
                if(!user.Phone){
                    myMessageError.innerHTML="Veuillez saisir votre numéro de telephone";
                    myMessageError.style="display:block";
                }
                else{
                    if(!user.Password){
                        myMessageError.innerHTML="Veuillez saisir votre mot de passe";
                        myMessageError.style="display:block";
                    }
                    else{
                        if(!user.CPassword){
                            myMessageError.innerHTML="Veuillez confirmer votre mot de passe";
                            myMessageError.style="display:block";
                        }
                        else{
                            if(user.Password!=user.CPassword){
                                myMessageError.innerHTML="Le mot de passe est different du mot de passe de confirmation";
                                myMessageError.style="display:block";
                            }
                            else{


                                let maxLength = 20;
                                let minLength = 8;
                                let lowerMinCount = 1;
                                const LOWER_REGEX = /([a-z])/g;
                                let upperMinCount = 1;
                                const UPPER_REGEX = /([A-Z])/g;
                                let numMinCount = 1;
                                const NUM_REGEX = /([\d])/g;
                                //let specialMinCount = 2;
                                //const SPECIAL_REGEX = /([$&+,:;=?@#|'<>.^*()%!-])/g;
                                // btnCheck.addEventListener('click', () => {
                                //     let password = input.value;
                                //     if(password.length > maxLength){
                                //         result.innerText = "Password should be less than 20 characters";
                                //         return;        
                                //     }
                                //     result.innerText = isStrongPassword(password) ? 'STRONG' : 'WEAK';
                                // });
                                function isStrongPassword(password) {
                                    let upperMatch = password.match(UPPER_REGEX) ?? [];
                                    let lowerMatch = password.match(LOWER_REGEX) ?? [];
                                    let numMatch = password.match(NUM_REGEX) ?? [];
                                    // let specialMatch = password.match(SPECIAL_REGEX) ?? [];
                                    return password.length >= minLength &&
                                    upperMatch.length >= upperMinCount &&
                                    lowerMatch.length >= lowerMinCount &&
                                    numMatch.length >= numMinCount 
                                    //&&
                                    //specialMatch.length >= specialMinCount
                                }

                                //if(user.Password.length<8){
                                if(!isStrongPassword(user.Password)){
                                    myMessageError.innerHTML="Votre mot de passe doit être au moins 8 caratères de longueur et il doit comporté au moins une lettre majuscule, une minuscule, d'un chiffre";
                                    myMessageError.style="display:block";
                                }else{
                                    user = JSON.stringify(user);
                                    UserSignupSync(user,function(response,error){
                                        if(response == null){
                                            myMessageError.innerHTML=error;
                                            myMessageError.style="display:block";
                                        }
                                        else{
                                                alertify.alert(response.message,function(){
                                                let user = response.data;
                                                console.log(user);
                                                alertify.success(response.message);
                                                location.replace("login.html");
                                                });
                                            }
                                    });
                                }
                                 
                            }
                        }
                        
                    }
                    
                }
                
            }
           
        }
    }
    
    
    
}


// let getDataFromFrmNomFormulaire =(user)=>{
//     document.getElementById("IdUser").value = user.idUser;
//     document.getElementById("FirstName").value = user.firstName;
//     document.getElementById("LastName").value = user.lastName;
//     document.getElementById("Email").value = user.email;
//     document.getElementById("Password").value = user.password;
//     document.getElementById("Phone").value = user.phone;
//     document.getElementById("Gender").value = user.gender;
//     document.getElementById("City").value = user.city;
//     document.getElementById("Country").value = user.country;
//     document.getElementById("ImageUrl").value = user.imageUrl;
//     document.getElementById("Role").value = user.role;
//     document.getElementById("CreatedAt").value = user.createdAt;
//     document.getElementById("ModifiedAt").value = user.modifiedAt;
//     document.getElementById("FullAddress").value = user.fullAddress;
// }