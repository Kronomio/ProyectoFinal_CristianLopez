
package com.portfolio.CristianLopez.service;
import com.portfolio.CristianLopez.model.Experiencia;
import com.portfolio.CristianLopez.model.Persona;
import com.portfolio.CristianLopez.repository.ExperienciaRepository;
import com.portfolio.CristianLopez.repository.PersonaRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImpExperienciaService implements IExperienciaService{

        @Autowired  ExperienciaRepository experienciaRepository;
        @Autowired PersonaRepository personaRepository;

    @Override
    public List<Experiencia> verExperiencia() {
       return experienciaRepository.findAll();
    }
    @Override
    public Experiencia guardarExperiencia(Experiencia experiencia) {
        Optional <Persona> persona = personaRepository.findById(1);
       if(  !persona.isPresent())
       {
       } else {
           experiencia.setPersona(persona.get());
            }
       return experienciaRepository.save(experiencia);
    }
    @Override
    public Experiencia buscarExperiencia(Integer id) {
      return experienciaRepository.findById(id).orElse(null);     
    }

    @Override
    public void eliminarExperiencia(Integer idExperiencia) {
        experienciaRepository.deleteById(idExperiencia);
    }
    
    public Experiencia updateExperiencia(Experiencia experiencia){
         Optional <Persona> persona = personaRepository.findById(1);
       if(  !persona.isPresent())
       {
       } else {
           experiencia.setPersona(persona.get());
            }
        return experienciaRepository.save(experiencia);
    }
    
}
