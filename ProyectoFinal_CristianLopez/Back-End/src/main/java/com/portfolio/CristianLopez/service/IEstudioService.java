
package com.portfolio.CristianLopez.service;

import com.portfolio.CristianLopez.model.Estudio;
import java.util.List;


public interface IEstudioService {
       public List<Estudio> verEstudios();
    
    public Estudio guardarEstudio(Estudio estudio);
    

    
    
    
            
    public void eliminarEstudio(Integer id);
    
    public Estudio editarEstudio(Estudio estudio);
}
