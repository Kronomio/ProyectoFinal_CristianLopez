/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.portfolio.CristianLopez.service;

import com.portfolio.CristianLopez.model.Estudio;
import com.portfolio.CristianLopez.repository.EstudioRepository;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Service;

/**
 *
 * @author krono
 */
@Service
public class ImpEstudioService implements IEstudioService {

    @Autowired  EstudioRepository estudioRepository;
    @Override
    public List<Estudio> verEstudios() {
        return estudioRepository.findAll(Sort.by(Order.desc("fecha")));
        
    }

    @Override
    public Estudio guardarEstudio(Estudio estudio) {
      return estudioRepository.save(estudio);
      
    }

   
    
    @Override
    public Estudio editarEstudio(Estudio estudio){
        return estudioRepository.save(estudio);
    }
            
    @Override
    public void eliminarEstudio(Long id) {
        estudioRepository.deleteById(id);
    }
    
}
