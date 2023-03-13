class article{

    idArticle;

    idCatalog;

    designation;

    description;

    price;

    imageArticle;

    minStock;

    maxStock;

    quantity;

    expireDate;

    reductionRate;

    lastPrice;
    state;

    constructor(pIDArticle, pIDCatalog, pDesignation, pDescription, pPrice, pImageArticle, pMinStock, pMaxStock, pQuantity, pExpireDate, pReductionRate, pLastPrice,pState){

    this.idArticle = pIDArticle;

    this.idCatalog = pIDCatalog;

    this.designation = pDesignation;

    this.description = pDescription;

    this.price = pPrice;

    this.imageArticle = pImageArticle;

    this.minStock = pMinStock;

    this.maxStock = pMaxStock;

    this.quantity = pQuantity;

    this.expireDate = pExpireDate;
    // this.expireDate = dateFormat(pExpireDate);

    this.reductionRate = pReductionRate;

    this.lastPrice = pLastPrice;
    this.state = pState;

    }

 

}