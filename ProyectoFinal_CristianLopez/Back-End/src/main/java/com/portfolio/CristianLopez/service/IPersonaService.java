
package com.portfolio.CristianLopez.service;

import com.portfolio.CristianLopez.model.Persona;

import java.util.List;

public interface IPersonaService {
    //traer una lista de personas
    public List <Persona> verPersonas();
    
    //Guardat un objto del tipo Persona
    public void guardarPersona (Persona pers);
    
    //Eliminar una persona por id
    
    public void borrarPersona (Integer id);
    
    //Buscar Persona por id
    
    public Persona buscarPersona(Integer id);
}
