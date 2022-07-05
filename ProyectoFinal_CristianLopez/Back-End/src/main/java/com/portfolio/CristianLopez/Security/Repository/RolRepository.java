/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.portfolio.CristianLopez.Security.Repository;

import com.portfolio.CristianLopez.Security.Entity.Rol;
import com.portfolio.CristianLopez.Security.Enums.RolNombre;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author krono
 */
@Repository
public interface RolRepository extends JpaRepository<Rol, Integer>{
    Optional <Rol> findByRolNombre(RolNombre rolNombre);
    
}
