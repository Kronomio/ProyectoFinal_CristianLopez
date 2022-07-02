
package com.portfolio.CristianLopez.controller;

import com.portfolio.CristianLopez.model.Habilidad;

import com.portfolio.CristianLopez.service.IHabilidadService;
import com.portfolio.CristianLopez.service.IPersonaService;
import java.util.Calendar;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin (origins = "http://localhost:4200")
public class HabilidadController {
    @Autowired
    
   public IHabilidadService ihabilidadService;
    public IPersonaService ipersonaService;
    
     @GetMapping ("/ver/habilidad")
    public List <Habilidad> verHabilidad(){
        return ihabilidadService.verHabilidades();
    }
    @PostMapping("new/habilidad")
    public String crearHabilidad(@RequestBody Habilidad habilidad){
        
        
        ihabilidadService.guardarHabilidad(habilidad);
        return "El estudio fue creado correctamente";
    }
    @DeleteMapping ("/delete/habilidad/{id}")
    public String borrarHabilidad (@PathVariable Long id){
        ihabilidadService.eliminarHabilidad(id);
        return "La estudio fue eliminado correctamente";
    }
    @PutMapping("/edit/habilidad/{id}")
    public Habilidad editarHabilidad(@PathVariable Long id,
                               @RequestParam ("nombre") String nuevoNombre,
                               @RequestParam ("porcentaje") Long nuevoPorcentaje,
                               @RequestParam ("fecha_actualizacion") Calendar nuevaFechaActualizacion,
                               @RequestParam ("url_imagen") String nuevoUrlImagen)


                               {
        Habilidad habilidad=ihabilidadService.buscarHabilidad(id);
        
        habilidad.setFecha_actualizacion(nuevaFechaActualizacion);
        habilidad.setNombre(nuevoNombre);
        habilidad.setPorcentaje(nuevoPorcentaje);
        habilidad.setUrl_imagen(nuevoUrlImagen);
        
                                                                        
                                  
                         

        ihabilidadService.guardarHabilidad(habilidad);
        return habilidad;
    }
}
