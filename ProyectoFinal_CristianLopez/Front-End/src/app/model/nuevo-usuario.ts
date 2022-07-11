export class NuevoUsuario {
    nombre!: string;
    username!: string;
    email!: string;
    password!: string;
    roles!: string[];

    constructor(nombre:string, username:string, email:string, password:string, roles:string[] ){
        this.nombre=nombre;
        this.username=username;
        this.email=email;
        this.password=password;
        this.roles=roles;
    }

}

