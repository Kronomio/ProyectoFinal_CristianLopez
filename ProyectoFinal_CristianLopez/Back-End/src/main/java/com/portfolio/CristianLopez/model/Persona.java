package com.portfolio.CristianLopez.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity

public class Persona implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    
    @NotNull 
    @Size(min = 1, max = 50, message ="El nombre no cumple con la longitud")
    private String nombre;
    
    @NotNull 
    @Size(min = 1, max = 50, message ="El apellido no cumple con la longitud")
    private String apellido;
   
    
    @Size(min = 1, max = 250, message ="El url de imágen no cumple con la longitud")
    private String url_foto;
    
    @Size(min = 1, max = 250, message ="El url de imágen no cumple con la longitud")
    private String url_fondo;
    
    private Date fecha_nac;
    
   
   private String telefono;

  @Size(min = 1, max = 500, message ="El acercaDe no cumple con la longitud")
  private String acerca_de;
    
  @Size(min = 0, max = 250, message ="El link a Facebook no cumple con la longitud")
  private String link_facebook;
    
  @Size(min = 0, max = 250, message ="El link a LinkedIn no cumple con la longitud")
  private String link_linkedin;
    
  @Size(min = 0, max = 250, message ="El link a Twitter no cumple con la longitud")
  private String link_twitter;
  
@Size(min = 0, max = 250, message ="El link a Whatsaap no cumple con la longitud")
private String link_google;

@Size(min = 0, max = 250, message ="El link a Whatsaap no cumple con la longitud")
private String link_github;
    
@Size(min = 0, max = 250, message ="El link a Instagram no cumple con la longitud")
private String link_instagram;
   
@Size(min = 0, max = 250, message ="La dirección de mail no cumple con la longitud")
private String mail;

@Size(min = 0, max = 50, message ="La ciudad no cumple con la longitud")
private String ciudad;
    
@Size(min = 0, max = 50, message ="El país no cumple con la longitud")
    private String pais;

    @JsonIgnore
    @OneToMany(mappedBy="persona")
   private List<Experiencia> experienciaList;

    @JsonIgnore
    @OneToMany(mappedBy="persona")
private List<Estudio> EstudioList;
    
   @JsonIgnore
    @OneToMany(mappedBy="persona")
private List<Habilidad> habilidadList;
    
    @JsonIgnore
    @OneToMany(mappedBy="persona")
    private List<Proyecto> proyectoList;
    
    



}

