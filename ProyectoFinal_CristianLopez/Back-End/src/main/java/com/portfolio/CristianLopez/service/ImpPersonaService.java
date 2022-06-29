
package com.portfolio.CristianLopez.service;

import com.portfolio.CristianLopez.model.Persona;
import com.portfolio.CristianLopez.repository.IPersonaRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImpPersonaService implements IPersonaService{
    
    @Autowired 
    public IPersonaRepository ipersonaRepository;
    @Override
    
    public List<Persona> verPersonas() {
        List <Persona> persona=ipersonaRepository.findAll();
        return persona;
    }

    @Override
    public void guardarPersona(Persona persona) {
        ipersonaRepository.save(persona);
    }

    @Override
    public void borrarPersona(Long id) {
       ipersonaRepository.deleteById(id);

    }

    @Override
    public Persona buscarPersona(Long id) {
        Persona persona = ipersonaRepository.findById(id).orElse(null); //orElse(null) permite enviar null si no encuentra la persona
        return persona;
    }
    
    
}
