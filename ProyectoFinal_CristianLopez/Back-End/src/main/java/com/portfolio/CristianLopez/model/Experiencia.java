
package com.portfolio.CristianLopez.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class Experiencia {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer idExp;
    
    @NotNull 
    @Size(min = 1, max = 50, message ="El nombre no cumple con la longitud")
    private String titulo;
    
     
    @Size(min = 1, max = 250, message ="El nombre no cumple con la longitud")
    private String descripcion;
   
    
    private Long fecha_inicio;
    
    private Long fecha_fin;
    
    private String logo_empresa;
    
    private String nombre_empresa;
    
    
    @ManyToOne()
    @JoinColumn(name="persona_id")
    private Persona persona;
}
