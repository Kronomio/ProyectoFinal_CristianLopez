
package com.portfolio.CristianLopez.repository;

import com.portfolio.CristianLopez.model.Proyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProyectoRepository extends JpaRepository <Proyecto, Integer>{
    
}
