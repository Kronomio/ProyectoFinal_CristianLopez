export class ChangePasswordUsuario{
    username:string;
    oldPassword:string;
    newPassword:string;

    constructor(username:string, oldPassword:string, newPassword:string){
        this.username=username;
        this.oldPassword=oldPassword;
        this.newPassword=newPassword;

    }

}