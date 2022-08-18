/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.portfolio.CristianLopez.Security.Repository;

import com.portfolio.CristianLopez.Security.Entity.Usuario;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author krono
 */
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer>{
    Optional <Usuario> findByUsername(String username);
   
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    
   

}
