# Primera Entrega Curso Programación Backend
## Coderhouse

##### Colección de REQUESTS de Postman para testear el programa:
[DESCARGAR](https://drive.google.com/file/d/1tIjkPSiXppfhBKqVPk9caQpB4blnr5T0/view?usp=share_link "DESCARGAR")

#### PARA EJECUTAR EL PROGRAMA:
`node ./dist/App.js` o `npm start` (nodemon ./dist/App.js)

------------


> ###### PD. Para este proyecto se está utilizando TypeScript con sus archivos .ts en la carpeta "src", y los archivos de JavaScript transpilados, por convención, son alojados en la carpeta "dist".

## Funciones
##### Al ejecutarse por primera vez, se crean los archivos: 
- productos.json: almacena el último ID que se ha creado históricamente y el array con todos los productos creados (por defecto, vacío). 
- carrito.json: almacena el último ID que se ha creado históricamente y el array con todos los carts creados (por defecto, vacío). 

##### El programa permite crear, modificar, eliminar y ver productos. 
##### El programa permite crear carts (por defecto con array de productos vacío), ver los productos de un cart específico y agregar un producto específico a un cart específico.

##### El programa se asegura de mantener siempre inmutable el ID de products y carts ya creados y/o eliminados.
> Siempre se incrementará el ID al crearse un objeto nuevo, esto gracias a la persistencia de los datos en los archivos json generados por el programa.

##### El programa se asegura de retornar un error (código 400) si se entregan IDs inválidos.

> *PD2 Se instaló el package multer en el proyecto y se añadió el archivo utils.js para utilizarlo, pero actualmente no está implementado para esta entrega, lamentablemente.




