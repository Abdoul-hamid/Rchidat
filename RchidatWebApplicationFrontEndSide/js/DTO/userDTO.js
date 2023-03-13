class user{
    idUser;
    firstName;
    lastName;
    email;
    password;
    phone;
    gender;
    city;
    country;
    imageUser;
    createdAt;
    modifiedAt;
    fullAddress;
    role;
    state;
    status;
    constructor(idUser,firstName,lastName,email,password,phone,gender,city,country,imageUser,createdAt,modifiedAt,fullAddress,role,state,status){
        this.idUser=idUser;
        this.firstName=firstName;
        this.lastName=lastName;
        this.email=email;
        this.password=password;
        this.phone=phone;
        this.gender=gender;
        this.city=city;
        this.country=country;
        this.imageUser=imageUser;
        this.createdAt=dateFormat(createdAt);
        this.modifiedAt=dateFormat(modifiedAt);
        this.fullAddress=fullAddress;
        this.role=role;
        this.state = state;
        this.status =status;
    }
}