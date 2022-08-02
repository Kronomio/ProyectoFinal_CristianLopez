
package com.portfolio.CristianLopez.service;

import com.portfolio.CristianLopez.model.Persona;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.portfolio.CristianLopez.repository.PersonaRepository;
import java.util.Optional;

@Service
public class ImpPersonaService implements IPersonaService{
    
    @Autowired PersonaRepository ipersonaRepository;
    
    
    @Override
    public List<Persona> verPersonas() {
        List <Persona> pers=ipersonaRepository.findAll();
        return pers;
    }

    @Override
    public void guardarPersona(Persona pers) {
      
        ipersonaRepository.save(pers);
    }

    @Override
    public void borrarPersona(Integer id) {
       ipersonaRepository.deleteById(id);

    }

    @Override
    public Persona buscarPersona(Integer id) {
        Persona pers = ipersonaRepository.findById(id).orElse(null); //orElse(null) permite enviar null si no encuentra la persona
        return pers;
    }
    
    
}
