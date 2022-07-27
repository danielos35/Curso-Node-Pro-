/*
API Application Programming Interface
- Interface de aplicación programable 
- Es una pieza de software que puede ser usada por otra pieza de software 

API de NODO
- "Pequeñas API" usadas por la api principal para realizar ciertas tareas, como por ejemplo el S
- Otros ejemplos de API's de nodos
-- DOM 
-- Clases publicas de JAVA 




REST
- Representational states transfer.
- Es una forma de construir un API de manera logica, haciendolas facil de consumir 


API REST

- Para construir una API Rest necesitamos seguir los siguientes principios 
-- #1 Separar nuestra API en recursos logicos 

-- #2 Exponer los recursos en URL estructurada y basadas en estos recursos
--- Permitiendo realizar diferentes acciones en los datos, como crear, leer o eliminar 
--- El final de la URL es llamado endPoint (www.api.com/endPoint)
--- EJEMPLOS
---- /addNewTour --> POST (create)
---- /getTout --> GET (Red)
---- /updateTour --> PUT (Actualizarm el usuario envia todo el objeto a actualizar)
---- /updateTour --> PATCH (Actualizarm el usuario envia una parte del objeto a actualizar)
---- /deleteTour --> DELETE (Eliminar los datos)


-- #3 La API debe usar los metodos HTTP correctos y no la URL 

-- #4 los datos enviados y recibidos deben de usar el formato JSON, aplicando algún estandar de formatos

-- #5 LA API debe validar el estado
--- El estado cambia cuando se realiza una modificación en la solicitud


*/
