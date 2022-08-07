
package com.portfolio.CristianLopez.service;

import com.portfolio.CristianLopez.model.Habilidad;
import com.portfolio.CristianLopez.model.Persona;
import com.portfolio.CristianLopez.repository.HabilidadRepository;
import com.portfolio.CristianLopez.repository.PersonaRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ImpHabilidadService implements IHabilidadService {

    @Autowired  HabilidadRepository habRepository;
    @Autowired PersonaRepository personaRepository;
    @Override
    public List<Habilidad> verHabilidades() {
            return habRepository.findAll();

    }

    @Override
    public Habilidad guardarHabilidad(Habilidad habilidad) {
        Optional <Persona> persona = personaRepository.findById(1);
       if(  !persona.isPresent())
       {
       } else {
           habilidad.setPersona(persona.get());
            }
        return habRepository.save(habilidad);
    }

    @Override
    public Habilidad buscarHabilidad(Integer id) {
        return  habRepository.findById(id).orElse(null);
    }

    @Override
    public void eliminarHabilidad(Integer idHabilidad) {
              habRepository.deleteById(idHabilidad);
    }
    
    public Habilidad editarHabilidad(Habilidad habilidad){
        Optional <Persona> persona = personaRepository.findById(1);
       if(  !persona.isPresent())
       {
       } else {
           habilidad.setPersona(persona.get());
            }
        return habRepository.save(habilidad);
    }

    
}
