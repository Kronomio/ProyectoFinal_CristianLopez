
package com.portfolio.CristianLopez.model;



import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity

public class Persona{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @NotNull 
    @Size(min = 1, max = 50, message ="El nombre no cumple con la longitud")
    private String nombre;
    
    @NotNull 
    @Size(min = 1, max = 50, message ="El apellido no cumple con la longitud")
    private String apellido;
   
    
    @Size(min = 1, max = 250, message ="El url de imágen no cumple con la longitud")
    private String url_foto;
    
    @Size(min = 1, max = 250, message ="La fecha de Nacimiento no cumple con la longitud")
    private String fechaNac;
    
   @Size(min = 1, max = 250, message ="El teléfono no cumple con la longitud")
   private String telefono;

  @Size(min = 1, max = 250, message ="El acercaDe no cumple con la longitud")
  private String acercaDe;
    
  @Size(min = 1, max = 250, message ="El link a Facebook no cumple con la longitud")
  private String link_facebook;
    
  @Size(min = 1, max = 250, message ="El link a LinkedIn no cumple con la longitud")
  private String link_linkedin;
    
  @Size(min = 1, max = 250, message ="El link a Twitter no cumple con la longitud")
  private String link_twitter;
  
@Size(min = 1, max = 250, message ="El link a Whatsaap no cumple con la longitud")
private String link_whatsaap;
    
@Size(min = 1, max = 250, message ="El link a Instagram no cumple con la longitud")
private String link_instagram;
   
@Size(min = 1, max = 250, message ="La dirección de mail no cumple con la longitud")
private String mail;

    
    



}

