/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.portfolio.CristianLopez.controller;

import com.portfolio.CristianLopez.model.Estudio;
import com.portfolio.CristianLopez.service.IEstudioService;

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


@RestController
@CrossOrigin (origins = {"http://localhost:4200","https://acortar.link/"})


@RequestMapping("/estudio")
public class EstudioController {
    
    @Autowired
    private final IEstudioService iestudioService;
    
    
    public EstudioController(IEstudioService iestudioService){
        this.iestudioService=iestudioService;
    }
    
     @GetMapping ("/all")
    public ResponseEntity <List<Estudio>> verEstudios(){
        List<Estudio> estudios=iestudioService.verEstudios();
        return new ResponseEntity<>(estudios, HttpStatus.OK);
    }
    
    
    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity <Estudio> crearEstudio(@RequestBody Estudio estudio){
        Estudio nuevoEstudio=iestudioService.guardarEstudio(estudio);
          return new ResponseEntity<>(nuevoEstudio, HttpStatus.CREATED);
    }
    
    @DeleteMapping ("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity <?> borrarEstudio (@PathVariable("id") Integer id){
        iestudioService.eliminarEstudio(id);
        return new ResponseEntity<>(HttpStatus.OK);

    }
    
     @PutMapping("/update")
     @PreAuthorize("hasRole('ADMIN')")
     public ResponseEntity <Estudio> editarEstudio(@RequestBody Estudio estudio){
         Estudio updateEstudio=iestudioService.editarEstudio(estudio);
         return new ResponseEntity <> (updateEstudio, HttpStatus.OK);
     }
      
}
