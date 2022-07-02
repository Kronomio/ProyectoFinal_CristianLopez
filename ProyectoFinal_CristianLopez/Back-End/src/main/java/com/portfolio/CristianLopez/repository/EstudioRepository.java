
package com.portfolio.CristianLopez.repository;

import com.portfolio.CristianLopez.model.Estudio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstudioRepository extends JpaRepository<Estudio, Long>{
    
    
}
