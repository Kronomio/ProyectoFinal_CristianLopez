/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.portfolio.CristianLopez.controller;

import com.portfolio.CristianLopez.model.Proyecto;
import com.portfolio.CristianLopez.service.IProyectoService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author krono
 */
@RestController
@CrossOrigin (origins = {"http://localhost:4200","https://portfoliowebcl.web.app/"})
@RequestMapping("/proyecto")
public class ProyectoController {
    @Autowired
    private final IProyectoService iproyectoService;
    
    public ProyectoController(IProyectoService iproyectoService){
        this.iproyectoService=iproyectoService;
    }
    
    @GetMapping ("/all")
    public ResponseEntity <List<Proyecto>> verProyectos(){
        List<Proyecto> proyecto=iproyectoService.verProyectos();
        return new ResponseEntity<>(proyecto, HttpStatus.OK);
    }
    
    
    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')"+"||hasRole('COLLABORATOR')")
    public ResponseEntity <Proyecto> crearProyecto(@RequestBody Proyecto proyecto){
        Proyecto nuevoProyecto=iproyectoService.guardarProyecto(proyecto);
          return new ResponseEntity<>(nuevoProyecto, HttpStatus.CREATED);
    }
    
    @DeleteMapping ("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')"+"||hasRole('COLLABORATOR')")
    public ResponseEntity <?> borrarProyecto (@PathVariable("id") Integer id){
        iproyectoService.eliminarProyecto(id);
        return new ResponseEntity<>(HttpStatus.OK);

    }
    
     @PutMapping("/update")
     @PreAuthorize("hasRole('ADMIN')"+"||hasRole('COLLABORATOR')")
     public ResponseEntity <Proyecto> editarProyecto(@RequestBody Proyecto proyecto){
         Proyecto updateProyecto=iproyectoService.editarProyecto(proyecto);
         return new ResponseEntity <> (updateProyecto, HttpStatus.OK);
     }
      
    
}
