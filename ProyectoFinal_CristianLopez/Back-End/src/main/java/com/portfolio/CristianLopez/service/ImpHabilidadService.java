
package com.portfolio.CristianLopez.service;

import com.portfolio.CristianLopez.model.Habilidad;
import com.portfolio.CristianLopez.repository.HabilidadRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ImpHabilidadService implements IHabilidadService {

    @Autowired  HabilidadRepository habRepository;
    @Override
    public List<Habilidad> verHabilidades() {
            return habRepository.findAll();

    }

    @Override
    public void guardarHabilidad(Habilidad habilidad) {
              habRepository.save(habilidad);

    }

    @Override
    public Habilidad buscarHabilidad(Long id) {
         Habilidad hab= habRepository.findById(id).orElse(null);
       return hab;
    }

    @Override
    public void eliminarHabilidad(Long idHabilidad) {
               habRepository.deleteById(idHabilidad);
    }

    
}
