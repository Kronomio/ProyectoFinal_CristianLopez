
package com.portfolio.CristianLopez.service;
import com.portfolio.CristianLopez.model.Experiencia;
import com.portfolio.CristianLopez.repository.ExperienciaRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImpExperienciaService implements IExperienciaService{

        @Autowired  ExperienciaRepository experienciaRepository;

    @Override
    public List<Experiencia> verExperiencia() {
       return experienciaRepository.findAll();
    }
    @Override
    public Experiencia guardarExperiencia(Experiencia experiencia) {
       return experienciaRepository.save(experiencia);
    }
    @Override
    public Experiencia buscarExperiencia(Long id) {
      return experienciaRepository.findById(id).orElse(null);     
    }

    @Override
    public void eliminarExperiencia(Long idExperiencia) {
        experienciaRepository.deleteById(idExperiencia);
    }
    
    public Experiencia updateExperiencia(Experiencia experiencia){
        return experienciaRepository.save(experiencia);
    }
    
}
