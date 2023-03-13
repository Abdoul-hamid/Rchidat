class command{

    idCommand;

    idUser;

    commandDate;
    state;

    constructor(pIDCommand, pIDUser, pCommandDate,pState){

    this.idCommand = pIDCommand;

    this.idUser = pIDUser;

    this.commandDate = dateFormat(pCommandDate);
    this.state=pState;

    }

}