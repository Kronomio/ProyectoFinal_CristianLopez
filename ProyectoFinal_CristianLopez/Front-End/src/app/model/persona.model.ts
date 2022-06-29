export class persona{
    id?: number;
    nombre:String;
    apellido:String;
    url_foto:String;
    fecha_nac:String;
    telefono:String;
    acerca_de:String;
    link_facebook:String;
    link_whatsaap:String;
    link_instagram:String;
    link_linkedin:String;
    link_twitter:String;
    mail:String;

    constructor(nombre:String, 
                apellido:String,
                url_foto:String, 
                fecha_nac:String, 
                telefono:String,  
                acerca_de:String,
                link_facebook:String,
                link_whatsaap:String,
                link_instagram:String,
                link_linkedin:String,
                link_twitter:String,
                mail:String)
                {
                    this.nombre=nombre;
                    this.apellido=apellido;
                    this.url_foto=url_foto;
                    this.acerca_de=acerca_de;
                    this.fecha_nac=fecha_nac;
                    this.telefono=telefono;
                    this.link_facebook=link_facebook;
                    this.link_instagram=link_instagram;
                    this.link_linkedin=link_linkedin;
                    this.link_twitter=link_twitter;
                    this.link_whatsaap=link_whatsaap;
                    this.mail=mail;
                }
    
    
}