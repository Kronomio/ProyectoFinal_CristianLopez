package com.portfolio.CristianLopez.controller;
import com.portfolio.CristianLopez.model.Experiencia;
import com.portfolio.CristianLopez.service.IExperienciaService;
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
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/experiencia")
public class ExperienciaController {
    @Autowired
    
    public IExperienciaService iexperienciaService;
    
    @GetMapping("/all")
    public ResponseEntity<List<Experiencia>> verExperiencia() {
        List<Experiencia> experiencias = iexperienciaService.verExperiencia();
        return new ResponseEntity<>(experiencias, HttpStatus.OK);    }
    @PostMapping("/add")
    public ResponseEntity<Experiencia> crearExperiencia(@RequestBody Experiencia experiencia) {
        Experiencia nuevoExperiencia = iexperienciaService.guardarExperiencia(experiencia);
        return new ResponseEntity<>(nuevoExperiencia, HttpStatus.CREATED);    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> borrarExperiencia(@PathVariable("id") Long id) {
        iexperienciaService.eliminarExperiencia(id); return new ResponseEntity<>(HttpStatus.OK);    }
    @PutMapping("/update")
    public ResponseEntity<Experiencia> editarExperiencia(@RequestBody Experiencia experiencia) {
        Experiencia updateExperiencia = iexperienciaService.updateExperiencia(experiencia);
        return new ResponseEntity<>(updateExperiencia, HttpStatus.OK);
    }}

