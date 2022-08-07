package com.portfolio.CristianLopez.controller;

import com.portfolio.CristianLopez.model.Persona;
import com.portfolio.CristianLopez.service.IPersonaService;
import java.util.Date;

//import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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
public class PersonaController {

    @Autowired
    public IPersonaService ipersonaService;

    @GetMapping("/ver/personas")
    public List<Persona> verPersonas() {
        return ipersonaService.verPersonas();
    }

    @GetMapping("/ver/persona/{id}")
    public Persona verPersona(@PathVariable Integer id) {
        return ipersonaService.buscarPersona(id);
    }

    //Le añado preauthorize para indicarle que sólo los administradores van a poder hacer esto
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("new/persona")
    public String crearPersona(@RequestBody Persona pers) {
        ipersonaService.guardarPersona(pers);
        return "La persona fue creada correctamente";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/persona/{id}")
    public String borrarPersona(@PathVariable Integer id) {
        ipersonaService.borrarPersona(id);
        return "La persona fue eliminada correctamente";
    }

    //URL puerto/personas/editar/(Id)/nommbre & apellido & url_img
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/edit/personas/{id}")
    public Persona editarPersona(@PathVariable Integer id,
            @RequestParam("nombre") String nuevoNombre,
            @RequestParam("apellido") String nuevoApellido,
            @RequestParam("url_foto") String nuevoUrlFoto,
            @RequestParam("fecha_nac") Date nuevaFecha_nac,
            @RequestParam("telefono") String nuevoTelefono,
            @RequestParam("acerca_de") String nuevoAcerca_de,
            @RequestParam("link_facebook") String nuevoLinkFacebook,
            @RequestParam("link_linkedin") String nuevolinkLinkein,
            @RequestParam("link_whatsaap") String nuevoLinkWhatsaap,
            @RequestParam("link_twitter") String nuevoLinkTwitter,
            @RequestParam("link_instagram") String nuevoLinkInstagram,
            @RequestParam("mail") String nuevoMail) {
        Persona persona = ipersonaService.buscarPersona(id);

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

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/edit/persona/{id}")
    public Persona editarPersona(@PathVariable Integer id, @RequestBody Persona pers) {

        Persona persona = ipersonaService.buscarPersona(id);

        persona.setNombre(pers.getNombre());
        persona.setApellido(pers.getApellido());
        persona.setUrl_foto(pers.getUrl_foto());
        persona.setFecha_nac(pers.getFecha_nac());
        persona.setTelefono(pers.getTelefono());
        persona.setAcerca_de(pers.getAcerca_de());
        persona.setLink_facebook(pers.getLink_facebook());
        persona.setLink_linkedin(pers.getLink_linkedin());
        persona.setLink_whatsaap(pers.getLink_whatsaap());
        persona.setLink_twitter(pers.getLink_twitter());
        persona.setLink_instagram(pers.getLink_instagram());
        persona.setMail(pers.getMail());
        ipersonaService.guardarPersona(persona);
        return persona;

    }

}
