import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Users } from "./users";

@Injectable({ providedIn: 'root' })
export class AppService {
    constructor(private http: HttpClient){}

    // url:any = "http://localhost:3000/Users"
    url:any = "https://angular-task-manager-rose.vercel.app/Users"

    getUsers(){
        return this.http.get(this.url);
    }
}