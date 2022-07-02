
package com.portfolio.CristianLopez.controller;

import com.portfolio.CristianLopez.model.Experiencia;
import com.portfolio.CristianLopez.service.IExperienciaService;
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
public class ExperienciaController {
    
     @Autowired
    
   public IExperienciaService iexperienciaService;
    
     @GetMapping ("/ver/experiencia")
    public List <Experiencia> verExperiencia(){
        return iexperienciaService.verExperiencia();
    }
    @PostMapping("new/experiencia")
    public String crearExperiencia(@RequestBody Experiencia estudio){
        iexperienciaService.guardarExperiencia(estudio);
        return "El estudio fue creado correctamente";
    }
    @DeleteMapping ("/delete/experiencia/{id}")
    public String borrarExperiencia (@PathVariable Long id){
        iexperienciaService.eliminarExperiencia(id);
        return "La estudio fue eliminado correctamente";
    }
    @PutMapping("/edit/experiencia/{id}")
    public Experiencia editarExperiencia(@PathVariable Long id,
                               @RequestParam ("descripcion") String nuevaDescripcion,
                               @RequestParam ("esActual") Boolean nuevoEsActual,
                               @RequestParam ("fecha_inicio") String nuevaFechaInicio,
                               @RequestParam ("fecha_fin") String nuevaFechaFin,
                               @RequestParam ("logo_empresa") String nuevoLogoEmpresa,
                               @RequestParam ("nombre_empresa") String nuevoNombreEmpresa)


                               {
        Experiencia experiencia=iexperienciaService.buscarExperiencia(id);
        
        experiencia.setDescripcion(nuevaDescripcion);
        experiencia.setEsActual(nuevoEsActual);
        experiencia.setFecha_fin(nuevaFechaFin);
        experiencia.setFecha_inicio(nuevaFechaInicio);
        experiencia.setLogo_empresa(nuevoLogoEmpresa);
        experiencia.setNombre_empresa(nuevoNombreEmpresa);
                                   
                                   
                                   
                                   

        iexperienciaService.guardarExperiencia(experiencia);
        return experiencia;
    }
}

