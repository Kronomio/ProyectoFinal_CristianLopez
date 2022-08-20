package com.portfolio.CristianLopez.controller;

import com.portfolio.CristianLopez.model.Habilidad;

import com.portfolio.CristianLopez.service.IHabilidadService;
import com.portfolio.CristianLopez.service.IPersonaService;
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
@CrossOrigin (origins = {"http://localhost:4200","https://portfoliowebcl.web.app/"})
@RequestMapping("/habilidad")

public class HabilidadController {

    @Autowired

    public IHabilidadService ihabilidadService;
    public IPersonaService ipersonaService;

    @GetMapping("/all")
    public ResponseEntity<List<Habilidad>> verHabilidad() {
        List<Habilidad> habilidades = ihabilidadService.verHabilidades();
        return new ResponseEntity<>(habilidades, HttpStatus.OK);
    }

    
    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')"+"||hasRole('COLLABORATOR')")
    public ResponseEntity<Habilidad> crearHabilidad(@RequestBody Habilidad habilidad) {
        Habilidad nuevoHabilidad = ihabilidadService.guardarHabilidad(habilidad);
        return new ResponseEntity<>(nuevoHabilidad, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')"+"||hasRole('COLLABORATOR')")
    public ResponseEntity<?> borrarHabilidad(@PathVariable("id") Integer id) {
        ihabilidadService.eliminarHabilidad(id);
        return new ResponseEntity<>(HttpStatus.OK);

    }

    @PutMapping("/update")
    @PreAuthorize("hasRole('ADMIN')"+"||hasRole('COLLABORATOR')")
    public ResponseEntity<Habilidad> editarHabilidad(@RequestBody Habilidad habilidad) {
        Habilidad updateHabilidad = ihabilidadService.editarHabilidad(habilidad);
        return new ResponseEntity<>(updateHabilidad, HttpStatus.OK);
    }

}
