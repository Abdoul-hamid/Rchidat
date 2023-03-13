class userComment{

    idComment;

    idUser;

    description;

    star;

    commentDate;
    state;

    constructor(pIDComment, pIDUser, pDescription, pStar, pCommentDate,pState){

        this.idComment = pIDComment;

        this.idUser = pIDUser;

        this.description = pDescription;

        this.star = pStar;

        this.commentDate = dateFormat(pCommentDate);
        this.state = pState;

    }

}