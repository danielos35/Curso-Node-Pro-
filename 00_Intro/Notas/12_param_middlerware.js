/*
PARAM MIDDLERWARE

- Es middleweare que se ejecuta solo para ciertos parametros en especifico


ARGUMENTOS 

- #1 req
- #2 res
- #3 next
- #4 value



NOTAS 


-  Los middleware también puden ser encadenados, dependiendo la necesidad, y se reciben como otro argumento dentro de la petición

  .post(tourController.checkBody, tourController.createTour);
*/
