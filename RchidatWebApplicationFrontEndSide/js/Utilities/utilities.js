HTMLElement.prototype.serialize = function(elements){
    var obj = {};
    for(var i=0;i<elements.length; ++i){
        var element = elements[i];
        var id = element.id;
        var value = element.value;
        if(id && value){
            obj[id] = value;
        }
        // else if(id){
        //     obj[id]="";
        // }
    }
    return obj;
}

function dateFormat(inputFormat){
    if(inputFormat){
        function pad(s){return (s<10)? '0' + s : s;}
        var d = new Date(inputFormat);
        return [pad(d.getDate()),pad(d.getMonth()+1),d.getFullYear()].join('/');
    }
}
// Serialize
let serialize = (object) => {
    return JSON.stringify(object);
}
// Serialize List
let serializeList = (objectList) => {
    return JSON.stringify(objectList);
}

let messageError = (error)=>{
    if(error.statusText === undefined)
        alertify.alert(error);
    else
        alertify.error(error.message);
}