
package com.portfolio.CristianLopez.controller;

import com.portfolio.CristianLopez.model.Persona;
import com.portfolio.CristianLopez.service.IPersonaService;

//import java.util.Date;
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
public class PersonaController  {
    @Autowired 
    public IPersonaService ipersonaService;

    @GetMapping ("/ver/personas")
    public List <Persona> verPersonas(){
        return ipersonaService.verPersonas();
    }
    
    @PostMapping("new/persona")
    public String crearPersona(@RequestBody Persona persona){
        ipersonaService.guardarPersona(persona);
        return "La persona fue creada correctamente";
    }
    
    @DeleteMapping ("/delete/persona/{id}")
    public String borrarPersona(@PathVariable Long id){
        ipersonaService.borrarPersona(id);
        return "La persona fue eliminada correctamente";
    }
    
    //URL puerto/personas/editar/(Id)/nommbre & apellido & url_img
    @PutMapping("/edit/persona/{id}")
    public Persona editarPersona(@PathVariable Long id,
                               @RequestParam ("nombre") String nuevoNombre,
                               @RequestParam ("apellido") String nuevoApellido,
                               @RequestParam ("url_foto") String nuevoUrlFoto,
                               @RequestParam ("fecha_nac") String nuevaFecha_nac,
                               @RequestParam ("telefono") String nuevoTelefono,
                               @RequestParam ("acerca_de") String nuevoAcerca_de,
                               @RequestParam ("link_facebook") String nuevoLinkFacebook,
                               @RequestParam ("link_linkedin") String nuevolinkLinkein,
                               @RequestParam ("link_whatsaap") String nuevoLinkWhatsaap,
                               @RequestParam ("link_twitter") String nuevoLinkTwitter,
                               @RequestParam ("link_instagram") String nuevoLinkInstagram,
                               @RequestParam ("mail") String nuevoMail)


                               {
        Persona persona=ipersonaService.buscarPersona(id);
        
        persona.setNombre(nuevoNombre);
        persona.setApellido(nuevoApellido);
        persona.setUrl_foto(nuevoUrlFoto);
        persona.setFecha_nac(nuevaFecha_nac);
        persona.setTelefono(nuevoTelefono);
        persona.setAcerca_de(nuevoAcerca_de);
        persona.setLink_facebook(nuevoLinkFacebook);
        persona.setLink_linkedin(nuevolinkLinkein);
        persona.setLink_whatsaap(nuevoLinkWhatsaap);
        persona.setLink_twitter(nuevoLinkTwitter);
        persona.setLink_instagram(nuevoLinkInstagram);
        persona.setMail(nuevoMail);

        ipersonaService.guardarPersona(persona);
        return persona;
    }
                              
            
}
