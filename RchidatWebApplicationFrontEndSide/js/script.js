let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () => {
  searchForm.classList.toggle('active');
  loginForm.classList.remove('active');
  navbar.classList.remove('active');
}

let loginForm = document.querySelector('.login-form');

document.querySelector('#login-btn').onclick = () => {
  loginForm.classList.toggle('active');
  searchForm.classList.remove('active');
  navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () => {
  navbar.classList.toggle('active');
  searchForm.classList.remove('active');
  loginForm.classList.remove('active');
}

window.onscroll = () => {
  searchForm.classList.remove('active');
  loginForm.classList.remove('active');
  navbar.classList.remove('active');
}

var swiper = new Swiper(".product-slider", {
  loop: true,
  spaceBetween: 20,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  centeredSlides: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1020: {
      slidesPerView: 3,
    },
  },
});


let connection = document.getElementById("connection");
let deconnection = document.getElementById("deconnection");
let profil = document.getElementById("profil");
deconnection.style = "display:none";
profil.style = "display:none";
let loginBtn = document.getElementById("login-btn");
deconnection.onclick = () => {
  sessionStorage.clear();
  window.location.reload();
  loginBtn.classList.remove("active");
}
if (sessionStorage.length != 0 && (JSON.parse(sessionStorage.getItem("userLoggedIn"))).idUser) {

  loginBtn.classList.add("active")
  var userLoggedIn = (JSON.parse(sessionStorage.getItem("userLoggedIn")))
  loginBtn.innerHTML = "  " + (userLoggedIn.firstName)[0] + (userLoggedIn.lastName)[0];
  deconnection.style = "display:block";
  profil.style = "display:block";
  connection.style = "display:none";
}

let swiperWarpper = document.querySelector(".swiper-wrapper");
let content ="";
let bindUserCommentToCustomerReview =(comment,currentUser)=>{
  if(comment.state){
    content +=`<div class="swiper-slide box">
            <img src="images/pic-1.png" alt="">
            <p>${comment.description}</p>
            <h3>${currentUser.lastName} ${currentUser.firstName}</h3>
            <div class="stars">`;
            for (let j = 0; j < comment.star; j++) {
              content += '<i class="fas fa-star"></i>';
            }
            content += `</div>
            </div>`;
            swiperWarpper.innerHTML += content;
            content="";
  }
  
}
let bindUsersCommentsToCustomerReview = (listComment) => {
  swiperWarpper.innerHTML ="";
  let currentUser;

listComment.forEach(comment => {
        getByIdUser(comment.idUser).then(response=>{
            if(response.success){
                currentUser = deserializeUser(response.data) ;
                bindUserCommentToCustomerReview(comment,currentUser);
                var swiper = new Swiper(".review-slider", {
                              loop: true,
                              spaceBetween: 20,
                              autoplay: {
                                delay: 7500,
                                disableOnInteraction: false,
                              },
                              centeredSlides: true,
                              breakpoints: {
                                0: {
                                  slidesPerView: 1,
                                },
                                768: {
                                  slidesPerView: 2,
                                },
                                1020: {
                                  slidesPerView: 3,
                                },
                              },
                            });
            }
            else{
                alertify.alert(response.message);
            }
        }).catch(error=>{
            messageError(error);
        });
        
    });

}
let listAllComments=[];
getAllUserCommentAsync().then(response => {
  if (response.success) {
    listAllComments=deserializeUserCommentList(response.data);
    bindUsersCommentsToCustomerReview(listAllComments);
  }
  else {
    alertify.alert(response.message);
  }
}).catch(e => { messageError(e); });


let boxContainer = document.getElementById("catalogs");
//let listCatalog=[];
content="";
let bindCatalogToDOM = (catalog) =>{
  if(catalog.state){

    content+=`<div class="box" id="catalogBox${catalog.idCatalog}">
    <!-- <img src="images/cat-1.png" alt=""> -->
    <h3>${catalog.name}</h3>
    <p>Jusqu'à 45% de réduction</p>
    <a href="#catalog${catalog.idCatalog}" class="btn">Voir</a>
</div>`;
//     content +=`<div class="box" id="catalog${catalog.idCatalog}">   
//     <h3 class="title">${catalog.name}</h3>`
//     if(catalog.state){
//         content +=`<p class="likes"><span class="active">&#183; activée</span></p>`;
//     }
//     else{
//         content +=`<p class="likes"><span class="disable">&#183; désactivée</span></p>`;
//     }
//     content +=`<a href="#" class="inline-option-btn" onclick="updateCatalog(${catalog.idCatalog})"><i class="fa fa-edit"></i>  Modifier</a>
//     <a href="#" class="inline-delete-btn" onclick="deleteCatalog(${catalog.idCatalog})"><i class="fa fa-trash"></i>  Supprimer</a>
//  </div>`;
 boxContainer.innerHTML+=content;
 content="";
  }
}

let bindDataCatalogToDOM = (listCatalog) =>{
    boxContainer.innerHTML = "";
    listCatalog.forEach(catalog => {
        bindCatalogToDOM(catalog);
    });
}

// getAllCatalogAsync().then(response =>{
//     if(response.success){   
//         listCatalog = deserializeCatalogList(response.data);
//         bindDataCatalogToDOM(listCatalog);
//         // alertify.success(response.message);
//     }
//     else{
//         alertify.alert(response.message);
//     }
// }).catch(error=>{
//     messageError(error);
// });







// content="";
// let bindCatalogToProductCatalog = (catalog, i) => {
//     content = `<tr onclick="ShowArticlesByCatalog(${catalog.idCatalog},'${catalog.name}')">
//     <td>${i}</td>
//     <td>${catalog.name}</td>
//     </tr>`;
//     tableLeftBody.innerHTML += content;
//     content = "";

// }



let bindDataCatalogToProductCatalogSection = (listArticle,catalog) => {
    // tableLeftBody.innerHTML = "";
    if(listArticle.length>0){
      let countStatTrue=0;
      listArticle.forEach(elt=>{
          if(elt.state){
            countStatTrue+=1;
          }
      });
      if(countStatTrue>0){
        content="";
        content+=`<h1 class="large-heading" id="catalog${catalog.idCatalog}"><span>Catégorie </span>${catalog.name}</h1>`;
        content+=`<div class="box-container">`;
        listArticle.forEach(article=>{
          if(article.state){
            content+=`<div class="box">
              <span class="discount">-${article.reductionRate}%</span>
              <div class="image">
                  <img src="images/img-2.jpg" alt="">
                  <div class="icons">
                      <a href="#" class="fas fa-heart"></a>
                      <a href="#" class="cart-btn">Ajouter au panier</a>
                      <a href="#" class="fas fa-share"></a>
                  </div>
              </div>
              <div class="content">
                  <h3>${article.designation}</h3>
                  <div class="price"> ${article.price}fcfa <span>${article.lastPrice}fcfa</span> </div>
              </div>
          </div>`;
          }
          
        });
      }
      
      content+="</div>";
      productsSection.innerHTML+=content;
      content="";
    }
    
    
}

let productsSection = document.getElementById("products");
getAllCatalogAsync().then(response => {
    if (response.success) {
        listCatalog = deserializeCatalogList(response.data);
        bindDataCatalogToDOM(listCatalog);
        productsSection.innerHTML="";
        productsSection.innerHTML+=`<h1 class="heading"><span></span> Nos produits<span></span></h1>`;
        listCatalog.forEach(catalog => {
          if(catalog.state){
            getArticlesByCatalogAsync(catalog.idCatalog).then(response => {
              if (response.success) {
                  listArticle = deserializeArticleList(response.data);
                  bindDataCatalogToProductCatalogSection(listArticle, catalog);
                  // alertify.success(response.message);
              }
              else {
                  alertify.alert(response.message);
              }
          }).catch(error => {
              messageError(error);
          });
              // bindCatalogToProductCatalog(catalog, i++);
          }
        });




        // bindDataCatalogToProductCatalogSection(listCatalog);
        // alertify.success(response.message);
    }
    else {
        alertify.alert(response.message);
    }
}).catch(error => {
    messageError(error);
});












// let bindArticleToProductArticle = (article) => {
//     content = `<tr id="article${article.idArticle}">
//     <td>${article.designation}</td>
//     <td>${article.price}</td>
//     <td>${article.quantity}</td>
//     <td>${article.expireDate}</td>`;
//     if (article.state) {
//         //&#183; 
//         content += `<td><p class="activeState">activée</p></td>`;
//     }
//     else {
//         //&#183; 
//         content += `<td><p class="disableState">désactivée</p></td>`;
//     }
//     content += `<td>
//         <a href="#" class="inline-check-btn" onclick="ShowArticle(${article.idArticle})"><i class="fa fa-eye"></i></a>
//         <a href="#" class="inline-option-btn" onclick="EditArticle(${article.idArticle})"><i class="fa fa-edit"></i></a>
//         <a href="#" class="inline-delete-btn" onclick="DeleteArticle(${article.idArticle})"><i class="fa fa-trash"></i></a>
//     </td>
//     </tr>`;
//     tableRightBody.innerHTML += content;
//     content = "";
// }
// let bindDataArticleToTableArticle = (listArticle, name) => {
//     headingContent.innerHTML = name;
//     tableRightBody.innerHTML = "";
//     listArticle.forEach(article => {
//         bindArticleToTableArticle(article);
//     });
//     tableBoxRight.style.display = "block";
// }

// let ShowArticlesByCatalog = (idCatalog, name) => {
//     frmArticle["IdCatalog"].value = idCatalog;
//     getArticlesByCatalogAsync(idCatalog).then(response => {
//         if (response.success) {
//             listArticle = deserializeArticleList(response.data);
//             bindDataArticleToTableArticle(listArticle, name);
//             // alertify.success(response.message);
//         }
//         else {
//             alertify.alert(response.message);
//         }
//     }).catch(error => {
//         messageError(error);
//     });
// }