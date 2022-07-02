
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
    public Habilidad guardarHabilidad(Habilidad habilidad) {
        return habRepository.save(habilidad);
    }

    @Override
    public Habilidad buscarHabilidad(Long id) {
        return  habRepository.findById(id).orElse(null);
    }

    @Override
    public void eliminarHabilidad(Long idHabilidad) {
              habRepository.deleteById(idHabilidad);
    }
    
    public Habilidad editarHabilidad(Habilidad habilidad){
        return habRepository.save(habilidad);
    }

    
}
