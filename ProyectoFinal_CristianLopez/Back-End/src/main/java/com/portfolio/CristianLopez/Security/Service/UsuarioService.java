
package com.portfolio.CristianLopez.Security.Service;

import com.portfolio.CristianLopez.Security.Entity.Usuario;
import com.portfolio.CristianLopez.Security.Repository.UsuarioRepository;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service @Transactional
public class UsuarioService {
    @Autowired
    UsuarioRepository usuarioRepository;
    
    public Optional <Usuario> getByUsername (String username){
        return usuarioRepository.findByUsername(username);
    }
    
    public List<Usuario> getUsuarios(){
        return usuarioRepository.findAll();
        
    }
    
    public Usuario updateUsuario(Usuario user ){
        return usuarioRepository.save(user);
    }
    
   
    public void deleteUsuario(Long id){
        usuarioRepository.deleteById(id);
    }
    
    public boolean existsByUsername (String username){
        return usuarioRepository.existsByUsername(username);
    }
    
    public boolean existsByEmail (String email){
        return usuarioRepository.existsByEmail(email);
    }
    
    public void save(Usuario usuario){
        usuarioRepository.save(usuario);
    }
}
