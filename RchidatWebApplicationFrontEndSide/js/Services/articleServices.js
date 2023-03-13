// Deserialize Article
let deserializeArticle = (object) => {
    let dtoArticle = new article(object.idArticle,object.idCatalog,object.designation,object.description,object.price, object.imageArticle,object.minStock,object.maxStock,object.quantity,object.expireDate,object.reductionRate,object.lastPrice,object.state);
    return dtoArticle;
}
// Deserialize List Article
let deserializeArticleList = (jsonArticleList) =>{
   let listArticle = [];
   for(let item of jsonArticleList)
   listArticle.push(deserializeArticle(item));
   return listArticle;
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

const urlAPIArticle = "https://localhost:7107/api/Article";

/*******************************************    Asynchronous add article     ***********************************/

let addArticleAsync = async (article) =>
{
    try{
        let response = await fetch(urlAPIArticle, {
            method: "POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:article,
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
/*******************************************    Synchronous add article     ***********************************/

let addArticleSync = (article, callback) =>{
    try{
        fetch(urlAPIArticle,{
            method:"POST",
            headers:{
                "Content-Type":'application/json',
            },
            body:article,
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
/*******************************************    Asynchronous update article     ***********************************/

let updateArticleAsync = async (id,article)=>{
    try{
        let response = await fetch(`${urlAPIArticle}/${id}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
            },
            body:article,
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

/*******************************************    Synchronous update article     ***********************************/

let updateArticleSync = (id, article,callback) =>{
    try{
        fetch(`${urlAPIArticle}/${id}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
            },
            body:article,
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

/*******************************************    Asynchronous delete article     ***********************************/

let deleteArticleAsync = async(id)=>{
    try{
        let response = await fetch(`${urlAPIArticle}/${id}`,{
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

/*******************************************    Synchronous delete article     ***********************************/

let deleteArticleSync = (id, callback) =>{
    try{
        fetch(`${urlAPIArticle}/${id}`,{
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

/*******************************************    ASynchronous get all articles     ***********************************/

let getAllArticleAsync = async() =>{
    try{
        let response = await fetch(urlAPIArticle,{
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

/*******************************************    Synchronous get all articles     ***********************************/

let getAllArticleSync = (callback)=>{
    try{
        fetch(urlAPIArticle,{
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

let getByIdArticle = async(id)=>{
    try{
        let response =await fetch(`${urlAPIArticle}/${id}`,{
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

/*******************************************    ASynchronous get all articles     ***********************************/

let getArticlesByCatalogAsync = async(id) =>{
    try{
        let response = await fetch(`${urlAPIArticle}/ArticlesByCatalog/${id}`,{
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