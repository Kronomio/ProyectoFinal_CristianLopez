import { Rol } from "./rol.model";

export interface Usuario{
    id:number; 
    nombre:string;
    username:string;
    email:string;
    roles:Rol[];
}