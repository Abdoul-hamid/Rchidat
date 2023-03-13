// Deserialize Catalog
let deserializeCatalog = (object) => {
    let dtoCatalog = new catalog(object.idCatalog,object.name,object.state);
    return dtoCatalog;
}
// Deserialize List Catalog
let deserializeCatalogList = (jsonCatalogList) =>{
   let listCatalog = [];
   for(let item of jsonCatalogList)
   listCatalog.push(deserializeCatalog(item));
   return listCatalog;
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

const urlAPICatalog = "https://localhost:7107/api/Catalog";

/*******************************************    Asynchronous add catalog     ***********************************/

let addCatalogAsync = async (catalog) =>
{
    try{
        let response = await fetch(urlAPICatalog, {
            method: "POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:catalog,
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

/*******************************************    Synchronous add catalog     ***********************************/

let addCatalogSync = (catalog, callback) =>{
    try{
        fetch(urlAPICatalog,{
            method:"POST",
            headers:{
                "Content-Type":'application/json',
            },
            body:catalog,
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

/*******************************************    Asynchronous update catalog     ***********************************/

let updateCatalogAsync = async (id,catalog)=>{
    try{
        let response = await fetch(`${urlAPICatalog}/${id}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
            },
            body:catalog,
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

/*******************************************    Synchronous update catalog     ***********************************/

let updateCatalogSync = (id, catalog,callback) =>{
    try{
        fetch(`${urlAPICatalog}/${id}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
            },
            body:catalog,
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

/*******************************************    Asynchronous delete catalog     ***********************************/

let deleteCatalogAsync = async(id)=>{
    try{
        let response = await fetch(`${urlAPICatalog}/${id}`,{
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

/*******************************************    Synchronous delete catalog     ***********************************/

let deleteCatalogSync = (id, callback) =>{
    try{
        fetch(`${urlAPICatalog}/${id}`,{
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

/*******************************************    ASynchronous get all catalogs     ***********************************/

let getAllCatalogAsync = async() =>{
    try{
        let response = await fetch(urlAPICatalog,{
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

/*******************************************    Synchronous get all catalogs     ***********************************/

let getAllCatalogSync = (callback)=>{
    try{
        fetch(urlAPICatalog,{
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

let getByIdCatalog = async(id)=>{
    try{
        let response =await fetch(`${urlAPICatalog}/${id}`,{
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