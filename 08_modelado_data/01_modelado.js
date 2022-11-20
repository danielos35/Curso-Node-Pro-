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

<<<<<<<<<#1 RELACIONES ENTRE DATOS >>>>>>>>>>>>>>







*/
