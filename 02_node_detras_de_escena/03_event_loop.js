/*
EVENT LOOP

-  Es el centro de la arquitectura de Node JS.
-  En el se ejecuta todo el codigo de la aplicación.




ORDEN DE EJECUCUCIÓN 

- Incio de la ejecución 
- Ejecución de los timers callbacks 
-- Lectura de archivos o peticiones 
- Node analiza si hay tareas asincronas en ejecución, y en caso tal sigue ejecutando el progama, si no lo finaliza



NOTAS 
- Node usa una arquitectura basada en eventos
- Recibe los callback de las solicitudes



*/ 