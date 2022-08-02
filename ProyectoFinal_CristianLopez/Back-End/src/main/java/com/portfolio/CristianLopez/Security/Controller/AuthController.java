/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.portfolio.CristianLopez.Security.Controller;
import com.portfolio.CristianLopez.Security.Dto.LoginUsuario;
import com.portfolio.CristianLopez.Security.Dto.JwtDto;
import com.portfolio.CristianLopez.Security.Dto.NuevoUsuario;
import com.portfolio.CristianLopez.Security.Dto.UpdatePassword;
import com.portfolio.CristianLopez.Security.Entity.Rol;
import com.portfolio.CristianLopez.Security.Entity.Usuario;
import com.portfolio.CristianLopez.Security.Enums.RolNombre;
import com.portfolio.CristianLopez.Security.Service.RolService;
import com.portfolio.CristianLopez.Security.Service.UsuarioService;
import com.portfolio.CristianLopez.Security.jwt.JwtProvider;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author krono
 */
@RestController
@RequestMapping("/auth")
@CrossOrigin("http://localhost:4200")

public class AuthController {

    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UsuarioService usuarioService;
    @Autowired
    RolService rolService;
    @Autowired
    JwtProvider jwtProvider;

    @PostMapping("/new")
    public ResponseEntity<?> nuevo(@Valid @RequestBody NuevoUsuario nuevoUsuario, BindingResult bindingResult) {
        System.out.print(nuevoUsuario);
        String mensaje = "";
        if (bindingResult.hasErrors() || usuarioService.existsByUsername(nuevoUsuario.getUsername()) || usuarioService.existsByEmail(nuevoUsuario.getEmail())) {
            if (bindingResult.hasErrors()) {

                mensaje = mensaje + "$ Campos mal puestos o email inválido";
                //return new ResponseEntity(new Mensaje("Campos mal puestos o email inválido"), HttpStatus.BAD_REQUEST);
            }

            if (usuarioService.existsByUsername(nuevoUsuario.getUsername())) {
                //return new ResponseEntity(new Mensaje("Nombre de usuario existente"), HttpStatus.BAD_REQUEST);
                mensaje = mensaje + "$ Nombre de usuario existente";

            }

            if (usuarioService.existsByEmail(nuevoUsuario.getEmail())) {
                mensaje = mensaje + "$ Dirección de correo electrónico ya existe";

                // return new ResponseEntity(new Mensaje("Dirección de correo electrónico ya existe"), HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity(new Mensaje(mensaje), HttpStatus.BAD_REQUEST);
        } else {
            Usuario usuario = new Usuario(nuevoUsuario.getNombre(), nuevoUsuario.getUsername(),
                    nuevoUsuario.getEmail(),
                    passwordEncoder.encode(nuevoUsuario.getPassword()));

            Set<Rol> roles = new HashSet<>();
            roles.add(rolService.getByRolNombre(RolNombre.ROLE_USER).get());

            if (nuevoUsuario.getRoles().contains("ADMIN")) {
                roles.add(rolService.getByRolNombre(RolNombre.ROLE_ADMIN).get());
            }
            if (nuevoUsuario.getRoles().contains("COLLABORATOR")) {
                roles.add(rolService.getByRolNombre(RolNombre.ROLE_COLLABORATOR).get());
            }
            usuario.setRoles(roles);
            usuarioService.save(usuario);
            return new ResponseEntity(new Mensaje("Usuario guardado"), HttpStatus.CREATED);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<JwtDto> login(@Valid @RequestBody LoginUsuario loginUsuario, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity(new Mensaje("Campos mal puestos"), HttpStatus.BAD_REQUEST);
        }
        if ("user".equals(loginUsuario.getUsername())) {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken("user", "user"));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtProvider.generetedToken(authentication);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            JwtDto jwtDto = new JwtDto(jwt, userDetails.getUsername(), userDetails.getAuthorities());
            return new ResponseEntity(jwtDto, HttpStatus.OK);
        } else {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginUsuario.getUsername(), loginUsuario.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtProvider.generetedToken(authentication);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            JwtDto jwtDto = new JwtDto(jwt, userDetails.getUsername(), userDetails.getAuthorities());
            return new ResponseEntity(jwtDto, HttpStatus.OK);
        }
    }

    @PostMapping("/updatePassword")
    public ResponseEntity  updatePassword (@Valid @RequestBody UpdatePassword userUpdatePassword, BindingResult bindingResult)
    {
        //System.out.print("Ingreso al update");
        Usuario user;
        Optional <Usuario> usuarioOptional=usuarioService.getByUsername(userUpdatePassword.getUsername());
        if(usuarioOptional.isPresent())
        {
            user=usuarioOptional.get();
                    
        }
        else
        {

            return new ResponseEntity(new Mensaje("Username no encontrado"), HttpStatus.BAD_REQUEST);
        }
         Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userUpdatePassword.getUsername(), userUpdatePassword.getOldPassword()));
             

                 
        if(authentication.isAuthenticated())
        {
          

            user.setPassword(passwordEncoder.encode(userUpdatePassword.getNewPassword()));
          Usuario newUsuario=  usuarioService.updateUsuario(user);
          return new ResponseEntity<>(newUsuario,HttpStatus.OK);
        }
        else
        {
                         return new ResponseEntity(new Mensaje("Contraseña incorrecta"), HttpStatus.BAD_REQUEST);

             
        }       
    }
    
    
    @GetMapping("/existEmail")
    public boolean existEmail(@RequestParam String email) {

        return usuarioService.existsByEmail(email);
    }

    @GetMapping("/existUsername")
    public boolean existUsername(@RequestParam String username) {

        return usuarioService.existsByUsername(username);
    }

    @GetMapping("/getUsuarios")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Usuario>> getUsuarios() {
        List<Usuario> usuarios = usuarioService.getUsuarios();
        return new ResponseEntity<>(usuarios, HttpStatus.OK);

    }

    @DeleteMapping("/deleteUsuario/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUsuario(@PathVariable("id") Long id) {
      
        usuarioService.deleteUsuario(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    
    @PutMapping("/updateUsuario")
      @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Usuario> updateUsuario(Usuario user) {
        Usuario usuario = usuarioService.updateUsuario(user);
        return new ResponseEntity<>(usuario, HttpStatus.OK);

    }
}