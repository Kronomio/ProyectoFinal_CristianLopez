/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.portfolio.CristianLopez.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

/**
 *
 * @author krono
 */
@Entity @Getter @Setter
public class Proyecto {
    @Id @GeneratedValue(strategy = GenerationType.AUTO )
    private Integer id;
    
    private String descripcion;
    
    @NotNull
    private String titulo;
    
    private String link;
    
    private String url_image1;
    private String url_image2;
    private String url_image3;
    
    private String fecha_realizacion;
    
     
    @ManyToOne()
    @JoinColumn(name="persona_id")
    private Persona persona;
    
    
}
