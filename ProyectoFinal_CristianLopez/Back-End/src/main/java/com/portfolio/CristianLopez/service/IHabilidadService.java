/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.portfolio.CristianLopez.service;

import com.portfolio.CristianLopez.model.Habilidad;

import java.util.List;



public interface IHabilidadService {
    
      
    
    
    
    public List<Habilidad> verHabilidades();
    
    public Habilidad guardarHabilidad(Habilidad habilidad);
    
    public Habilidad buscarHabilidad(Long id);
            
    public void eliminarHabilidad(Long idHabilidad);
   
    public Habilidad editarHabilidad(Habilidad habilidad);

    
    
    
}
