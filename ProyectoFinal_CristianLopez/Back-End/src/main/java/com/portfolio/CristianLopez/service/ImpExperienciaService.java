
package com.portfolio.CristianLopez.service;

import com.portfolio.CristianLopez.model.Estudio;
import com.portfolio.CristianLopez.model.Experiencia;
import com.portfolio.CristianLopez.repository.ExperienciaRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author krono
 */
@Service
public class ImpExperienciaService implements IExperienciaService{

        @Autowired  ExperienciaRepository experienciaRepository;

    @Override
    public List<Experiencia> verExperiencia() {
       return experienciaRepository.findAll();
    }

    @Override
    public void guardarExperiencia(Experiencia experiencia) {
       experienciaRepository.save(experiencia);
    }

    @Override
    public Experiencia buscarExperiencia(Long id) {
       Experiencia exp= experienciaRepository.findById(id).orElse(null);
       return exp;
    }

    @Override
    public void eliminarExperiencia(Long idExperiencia) {
        experienciaRepository.deleteById(idExperiencia);
    }
    
}
