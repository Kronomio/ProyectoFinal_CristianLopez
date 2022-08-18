
package com.portfolio.CristianLopez.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;


@Getter @Setter
@Entity
public class Habilidad {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer idHab;
    private String nombre;
    private Long porcentaje;
    private String color1;
    private String color2;
    

    private String url_imagen;
   
    
    @ManyToOne()
    @JoinColumn(name="persona_id")
    private Persona persona;
}
