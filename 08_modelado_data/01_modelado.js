/*
MODELADO DE DATOS

El modelado de los datos es la parte mas importante en la que debemos de enfocar nuestra atención al pensar en una aplicación, para ello se suele seguir los siguientes pasos

1. Ver los diferentes tipos de relaciones entre datos
2. Referencing/Normalization VS embedding/denormalization
3. Saber si crear nuevos documentos o hacer referencia a otros documentos
4. Tipos de referencias

EXPLICACION

<<<<<<<<<#1 RELACIONES ENTRE DATOS >>>>>>>>>>>>>>

-- UNO A UNO
--- Se da cuando un campo puede tener UN SOLO VALOR: movie -> name (Una pelicula solo tienen un nombre)

-- UNO A MUCHOS (esta categorizada en tres:)
--- Uno a pocos: por ejemplo una pelicula puede ganar algunos premios: movie -> (Premio#1, Premio#2, Premio#3)
--- Uno a muchos: por ejemplo los comentarios sonre una pelicula: movie ->  (comentario#1,comentario#2, comentario#1 ...., comentario#17)
--- Uno a toneladas: los registros en un aplicación: app -> (data#1, data#2, data#1, ..... data#100000)

-- MUCHOS A MUCHOS
---  Es la relación que hay entre multiples entidades, por ejemplo una pelicula puede tener un actor y este a su vez puede estar en muchas peliculas

(La diferencia entre uno a muchos y muchos a muchos es que entre muchos a muchos la relación es en ambas direcciones, mientras que en uno a muchos es en una dirección, por ejemplo una reseña de una pelicula solo apunta a una pelicula en particular)

<<<<<<<<<#2 REFERENCING VS EMBEDDING >>>>>>>>>>>>>>

- REFERENCIA/NORMALIZADOS 
-- Se da cuando los datos hacen referencia a otra biblioteca de datos (video minuto 7:18)
-- Tiene como DESVENTAJA que debemos de realizar mas consultas para optener toda la información y por tal impacta en el rendimiento de la aplicación

- INCRUSTADOS/DESNORMALIZADOS (lo mas comun en bases de datos NO relacionales)
-- Se da cuando los datos están incrustados todo en la misma biblioteca (video minuto 7:18)
-- Tiene como VENTAJA que solo realizamos una consulta para traer toda la información

- ¿COMO ELEGIR SI NORMALIZAR O NO?

-- ver que relación existen entre los datos
--- NORMALIZAR
----- 1:POCOS
----- 1:ALGUNOS
----- Cuando alguno de los datos son muy pesados (como por ejemplo una imagen o un video)

--- NO NORMALIZAR
----- 1: MUCHOS
----- 1: TONELADAS
----- MUCHOS:MUCHOS


-- Analizar el patron de acceso
---- NORMALIZAR
----- Los datos son en su mayoria solo de lectura
----- Los datos no cambian rapidamente
----- High read/write ratio (Hay mucha mas lectura que escritura en los datos)

---- NO NORMALIZAR



-- Cercania de datos












*/
