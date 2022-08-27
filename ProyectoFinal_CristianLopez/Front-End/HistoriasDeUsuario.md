# Historias de usuario y criterios de aceptación 

- *Historia de usuario 1*: Cómo usuario quiero encontrar los datos personales y redes sociales para poder comunicarme con el desarrollador.

- *Historia de usuario 2*: Cómo usuario quiero poder buscar la experiencia laboral para ver si se ajusta a mis requerimientos.

- *Historia de usuario 3*: Cómo usuario quiero tener acceso a proyectos elaborados por el desarrollador para poder evaluar su nivel de destreza y conocimiento. 

- *Historia de usuario 4*: Como usuario quiero poder loguearme con mis datos para poder hacer uso de los permisos concedidos. 
  * Criterios de aceptación:
      - El username ingresado debe coincidir con un usuario existente en la bd y no puede ser nulo. 
    - La contraseña ingresada debe coincidir con la que existe en la bd.
- *Historia de usuario 5*: Como administrador o usuario colaborador, quiero poder cargar nuevos proyectos, habilidades y formaciones realizadas o modificar las existentes para mantener actualizado el portfolio.
  * Criterios de aceptación:
    + Debo poseer el rol de “Administrador” o el rol “Colaborador” en la base de datos.
    + La contraseña ingresada debe coincidir con la que existe en la bd.
- *Historia de usuario 6*: Como administrador quiero registrar usuarios colaboradores para que puedan tener acceso a la edición de los elementos del sitio.
  * Criterios de aceptación:
    +	El username del nuevo colaborador debe ser único y el campo no puede estar vacío. 
    +	El mail debe ser válido y único. 
- *Historia de usuario 7*: Como usuario registrado quiero poder modificar mi contraseña de acceso para proteger la seguridad del sistema.
  * Criterios de aceptación:
    + El password ingresado debe coincidir con el registrado en la base de datos. 
    + El nuevo password debe ser diferente al actual y tener más de 4 caracteres. 
- *Historia de usuario 8*: Como administrador o colaborador quiero poder modificar la imagen de portada  para actualizar el aspecto del sitio.
  * Criterios de aceptación:
    + Debo estar logueado con el rol de “Administrador” o el rol “Colaborador” en la base de datos.
