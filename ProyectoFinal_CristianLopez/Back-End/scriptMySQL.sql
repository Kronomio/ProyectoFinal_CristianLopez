-- MySQL Script generated by MySQL Workbench
-- Thu Aug 25 15:03:51 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema portfolio
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema portfolio
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `portfolio` DEFAULT CHARACTER SET utf8 ;
USE `portfolio` ;

-- -----------------------------------------------------
-- Table `portfolio`.`persona`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio`.`persona` (
  `id` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `fecha_nac` DATE NULL,
  `mail` VARCHAR(45) NULL,
  `telefono` VARCHAR(12) NULL,
  `acerca_de` VARCHAR(200) NULL,
  `url_foto` VARCHAR(45) NULL,
  `url_fondo` VARCHAR(45) NULL,
  `link_facebook` VARCHAR(45) NULL,
  `link_linkedin` VARCHAR(45) NULL,
  `link_github` VARCHAR(45) NULL,
  `link_twitter` VARCHAR(45) NULL,
  `link_instagram` VARCHAR(45) NULL,
  `link_google` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `portfolio`.`institucion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio`.`institucion` (
  `id` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `url_logo` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `portfolio`.`estudio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio`.`estudio` (
  `idEst` INT NOT NULL,
  `titulo` VARCHAR(45) NULL,
  `descripcion` VARCHAR(45) NULL,
  `url_certificado` VARCHAR(45) NULL,
  `institucion_id` INT NOT NULL,
  `url_imagen_estudio` VARCHAR(45) NULL,
  `color_fondo` VARCHAR(45) NULL,
  PRIMARY KEY (`idEst`),
  INDEX `fk_estudio_institucion_idx` (`institucion_id` ASC) VISIBLE,
  CONSTRAINT `fk_estudio_institucion`
    FOREIGN KEY (`institucion_id`)
    REFERENCES `portfolio`.`institucion` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `portfolio`.`estado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio`.`estado` (
  `id` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `portfolio`.`estudio_persona`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio`.`estudio_persona` (
  `persona_id` INT NOT NULL,
  `estudio_id` INT NOT NULL,
  `fecha` DATE NULL,
  `estado_id` INT NOT NULL,
  PRIMARY KEY (`persona_id`, `estudio_id`),
  INDEX `fk_estudio_persona_persona1_idx` (`persona_id` ASC) VISIBLE,
  INDEX `fk_estudio_persona_estudio1_idx` (`estudio_id` ASC) VISIBLE,
  INDEX `fk_estudio_persona_estado1_idx` (`estado_id` ASC) VISIBLE,
  CONSTRAINT `fk_estudio_persona_persona1`
    FOREIGN KEY (`persona_id`)
    REFERENCES `portfolio`.`persona` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_estudio_persona_estudio1`
    FOREIGN KEY (`estudio_id`)
    REFERENCES `portfolio`.`estudio` (`idEst`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_estudio_persona_estado1`
    FOREIGN KEY (`estado_id`)
    REFERENCES `portfolio`.`estado` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `portfolio`.`habilidad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio`.`habilidad` (
  `idHab` INT NOT NULL,
  `nombre` VARCHAR(45) NULL,
  `url_imagen` VARCHAR(45) NULL,
  `color1` VARCHAR(45) NULL,
  `color2` VARCHAR(45) NULL,
  PRIMARY KEY (`idHab`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `portfolio`.`habilidad_persona`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio`.`habilidad_persona` (
  `persona_id` INT NOT NULL,
  `tecnologia_id` INT NOT NULL,
  `porcentaje` VARCHAR(45) NULL,
  INDEX `fk_habilidad_persona_persona1_idx` (`persona_id` ASC) VISIBLE,
  INDEX `fk_habilidad_persona_habilidad1_idx` (`tecnologia_id` ASC) VISIBLE,
  CONSTRAINT `fk_habilidad_persona_persona1`
    FOREIGN KEY (`persona_id`)
    REFERENCES `portfolio`.`persona` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_habilidad_persona_habilidad1`
    FOREIGN KEY (`tecnologia_id`)
    REFERENCES `portfolio`.`habilidad` (`idHab`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `portfolio`.`rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio`.`rol` (
  `id` INT NOT NULL,
  `tipo` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `portfolio`.`experiencia_laboral`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio`.`experiencia_laboral` (
  `idExp` INT NOT NULL,
  `titulo` VARCHAR(45) NULL,
  `descripcion` VARCHAR(45) NULL,
  `fecha_realizacion` DATE NULL,
  `persona_id` INT NOT NULL,
  `url_imagen1` VARCHAR(45) NULL,
  `url_imagen2` VARCHAR(45) NULL,
  `url_imagen3` VARCHAR(45) NULL,
  `link` VARCHAR(45) NULL,
  PRIMARY KEY (`idExp`),
  INDEX `fk_experiencia_laboral_persona1_idx` (`persona_id` ASC) VISIBLE,
  CONSTRAINT `fk_experiencia_laboral_persona1`
    FOREIGN KEY (`persona_id`)
    REFERENCES `portfolio`.`persona` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `portfolio`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio`.`usuarios` (
  `id` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NULL,
  `nombre` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `portfolio`.`proyecto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio`.`proyecto` (
  `id` INT NOT NULL,
  `persona_id` INT NOT NULL,
  `url_image1` VARCHAR(200) NULL,
  `url_image2` VARCHAR(200) NULL,
  `url_image3` VARCHAR(200) NULL,
  `enlace_proyecto` VARCHAR(45) NULL,
  `titulo` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(45) NULL,
  `fecha_realizacion` DATE NULL,
  `link` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_proyecto_persona1_idx` (`persona_id` ASC) VISIBLE,
  CONSTRAINT `fk_proyecto_persona1`
    FOREIGN KEY (`persona_id`)
    REFERENCES `portfolio`.`persona` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `portfolio`.`provincia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio`.`provincia` (
  `id` INT NOT NULL,
  `nombre` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `portfolio`.`localidad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio`.`localidad` (
  `id` INT NOT NULL,
  `nombre` VARCHAR(45) NULL,
  `provincia_id` INT NOT NULL,
  PRIMARY KEY (`id`, `provincia_id`),
  INDEX `fk_localidad_provincia1_idx` (`provincia_id` ASC) VISIBLE,
  CONSTRAINT `fk_localidad_provincia1`
    FOREIGN KEY (`provincia_id`)
    REFERENCES `portfolio`.`provincia` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `portfolio`.`domicilio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio`.`domicilio` (
  `persona_id` INT NOT NULL,
  `localidad_id` INT NOT NULL,
  `direccion` VARCHAR(45) NULL,
  PRIMARY KEY (`persona_id`),
  INDEX `fk_domicilio_localidad1_idx` (`localidad_id` ASC) VISIBLE,
  CONSTRAINT `fk_domicilio_persona1`
    FOREIGN KEY (`persona_id`)
    REFERENCES `portfolio`.`persona` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_domicilio_localidad1`
    FOREIGN KEY (`localidad_id`)
    REFERENCES `portfolio`.`localidad` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `portfolio`.`usuarios_has_rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio`.`usuarios_has_rol` (
  `usuarios_id` VARCHAR(45) NOT NULL,
  `rol_id` INT NOT NULL,
  PRIMARY KEY (`usuarios_id`, `rol_id`),
  INDEX `fk_usuarios_has_rol_rol1_idx` (`rol_id` ASC) VISIBLE,
  INDEX `fk_usuarios_has_rol_usuarios1_idx` (`usuarios_id` ASC) VISIBLE,
  CONSTRAINT `fk_usuarios_has_rol_usuarios1`
    FOREIGN KEY (`usuarios_id`)
    REFERENCES `portfolio`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuarios_has_rol_rol1`
    FOREIGN KEY (`rol_id`)
    REFERENCES `portfolio`.`rol` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
