
package com.portfolio.CristianLopez.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;

import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Entity @Getter @Setter
public class Estudio {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idEst;
    
     
    @Size(min = 1, max = 50, message ="El nombre no cumple con la longitud")
    private String titulo;
    
    
    private String descripcion;
    
    private String url_imagen_estudio;
    
    private String url_certificado;
    
    private String color_fondo;
    private int fecha;
    
   
    @ManyToOne()
    @JoinColumn(name="persona_id")
    private Persona persona;
}
