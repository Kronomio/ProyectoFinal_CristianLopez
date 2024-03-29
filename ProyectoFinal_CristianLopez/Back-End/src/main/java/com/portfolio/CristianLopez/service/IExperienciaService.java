
package com.portfolio.CristianLopez.service;


import com.portfolio.CristianLopez.model.Experiencia;
import java.util.List;


public interface IExperienciaService {
    
   public List<Experiencia> verExperiencia();
    
    public Experiencia guardarExperiencia(Experiencia experiencia);
    
    public Experiencia buscarExperiencia(Integer id);
            
    public void eliminarExperiencia(Integer idExperiencia);
    
    public Experiencia updateExperiencia(Experiencia experiencia);

}
