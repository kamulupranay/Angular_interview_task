export class Users {
    id: string | undefined;
    userName: string | undefined;
    phoneNumber: string | undefined;
    email: string | undefined;


    constructor(id:string, userName:string, phoneNumber:string, email:string){
        this.id = id;
        this.userName = userName;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
}