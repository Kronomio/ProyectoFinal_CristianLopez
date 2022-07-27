
package com.portfolio.CristianLopez.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;


@Getter @Setter
@Entity
public class Habilidad {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idHab;
    private String nombre;
    private Long porcentaje;
    private String color1;
    private String color2;
    

    private String url_imagen;
   
    @JsonIgnore
    @ManyToOne
    private Persona persona;
}
