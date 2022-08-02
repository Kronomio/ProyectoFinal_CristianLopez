/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.portfolio.CristianLopez.service;

import com.portfolio.CristianLopez.model.Persona;
import com.portfolio.CristianLopez.model.Proyecto;
import com.portfolio.CristianLopez.repository.PersonaRepository;
import com.portfolio.CristianLopez.repository.ProyectoRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

/**
 *
 * @author krono
 */
@Service
public class ImpProyectoService implements IProyectoService{
    
    @Autowired  ProyectoRepository proyectoRepository;
    @Autowired PersonaRepository personaRepository;
    @Override
    public List<Proyecto> verProyectos() {
      return proyectoRepository.findAll();

    }

    @Override
    public Proyecto guardarProyecto(Proyecto proyecto) {
         Optional <Persona> persona = personaRepository.findById(1);
       if(  !persona.isPresent())
       {
       } else {
          proyecto.setPersona(persona.get());
            }
        return proyectoRepository.save(proyecto);
     }

    @Override
    public void eliminarProyecto(Integer id) {
        proyectoRepository.deleteById(id);
    }

    @Override
    public Proyecto editarProyecto(Proyecto proyecto) {
         Optional <Persona> persona = personaRepository.findById(1);
       if(  !persona.isPresent())
       {
       } else {
          proyecto.setPersona(persona.get());
            }
       return proyectoRepository.save(proyecto);
    }
    
}
