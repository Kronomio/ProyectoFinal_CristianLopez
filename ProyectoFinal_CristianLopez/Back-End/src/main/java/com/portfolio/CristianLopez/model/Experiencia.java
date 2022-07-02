
package com.portfolio.CristianLopez.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class Experiencia {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idExp;
    
    @NotNull 
    @Size(min = 1, max = 50, message ="El nombre no cumple con la longitud")
    private String descripcion;
    
    private Boolean esActual;
    
    private String fecha_inicio;
    
    private String fecha_fin;
    
    private String logo_empresa;
    
    private String nombre_empresa;
    
    @JsonIgnore
    @ManyToOne
    private Persona persona;
}
