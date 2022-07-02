package com.portfolio.CristianLopez.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity

public class Persona implements Serializable{
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
    
    
    
    private Date fecha_nac;
    
   @Size(min = 1, max = 250, message ="El teléfono no cumple con la longitud")
   private String telefono;

  @Size(min = 1, max = 500, message ="El acercaDe no cumple con la longitud")
  private String acerca_de;
    
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

@JsonIgnore
    @OneToMany(mappedBy="persona")
private List<Experiencia> experienciaList;

    @JsonIgnore
    @OneToMany(mappedBy="persona")
private List<Estudio> EstudioList;
    
    @JsonIgnore
    @OneToMany(mappedBy="persona")
private List<Habilidad> habilidadList;
    
    



}

