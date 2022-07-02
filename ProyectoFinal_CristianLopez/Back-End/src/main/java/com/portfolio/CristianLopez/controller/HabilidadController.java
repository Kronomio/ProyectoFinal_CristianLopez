
package com.portfolio.CristianLopez.controller;

import com.portfolio.CristianLopez.model.Habilidad;

import com.portfolio.CristianLopez.service.IHabilidadService;
import com.portfolio.CristianLopez.service.IPersonaService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin (origins = "http://localhost:4200")
@RequestMapping("/habilidad")

public class HabilidadController {
    @Autowired
    
   public IHabilidadService ihabilidadService;
    public IPersonaService ipersonaService;
    
     @GetMapping ("/all")
    public ResponseEntity <List<Habilidad>> verHabilidad(){
        List<Habilidad> habilidades=ihabilidadService.verHabilidades();
        return new ResponseEntity<>(habilidades, HttpStatus.OK);
    }
    
    @PostMapping("/add")
    public ResponseEntity <Habilidad> crearHabilidad(@RequestBody Habilidad habilidad){
        Habilidad nuevoHabilidad=ihabilidadService.guardarHabilidad(habilidad);
          return new ResponseEntity<>(nuevoHabilidad, HttpStatus.CREATED);
    }
    
    @DeleteMapping ("/delete/{id}")
    public ResponseEntity <?> borrarHabilidad (@PathVariable("id") Long id){
        ihabilidadService.eliminarHabilidad(id);
        return new ResponseEntity<>(HttpStatus.OK);

    }
    
     @PutMapping("/update")
     public ResponseEntity <Habilidad> editarHabilidad(@RequestBody Habilidad habilidad){
         Habilidad updateHabilidad=ihabilidadService.editarHabilidad(habilidad);
         return new ResponseEntity <> (updateHabilidad, HttpStatus.OK);
     }
    
    
    
}
