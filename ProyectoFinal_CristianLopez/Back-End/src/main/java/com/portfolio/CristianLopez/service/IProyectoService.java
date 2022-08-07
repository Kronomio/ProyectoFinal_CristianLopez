/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.portfolio.CristianLopez.service;

import com.portfolio.CristianLopez.model.Proyecto;
import java.util.List;

/**
 *
 * @author krono
 */
public interface IProyectoService {
    
    public List<Proyecto> verProyectos();
    
    public Proyecto guardarProyecto(Proyecto proyecto);
    
    public void eliminarProyecto(Integer id);
    
    public Proyecto editarProyecto(Proyecto proyecto);
    
    
}
