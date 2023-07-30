# Segunda Entrega Curso Programación Backend
## Coderhouse

##### Colección de REQUESTS de Postman para testear el programa:
[DESCARGAR](https://drive.google.com/file/d/1T11p3jczn7Ebh5-XfRajTp7Fk-QuXAbo/view?usp=sharing "DESCARGAR")
##### Documentación ONLINE de Postman para testear el programa:
[https://documenter.getpostman.com/view/19344400/2s93sdYrx8](https://documenter.getpostman.com/view/19344400/2s93eYUXPz)

#### PARA EJECUTAR EL PROGRAMA:
`npm start` (node ./dist/App.js)

------------

> ###### PD. Para este proyecto se está utilizando TypeScript con sus archivos .ts en la carpeta "src", y los archivos de JavaScript transpilados, por convención, son alojados en la carpeta "dist".

## Funciones

##### El programa permite crear, modificar, eliminar y ver productos. 
##### El programa permite crear carts (por defecto con array de productos vacío), ver los productos de un cart específico y agregar/eliminar un producto específico a un cart específico. Se puede vaciar el carrito o modificar la lista de productos de un carrito específico. También se puede modificar el quantity de un producto especifico en un carrito.

##### El programa se asegura de retornar un error (código 400) si se entregan IDs, params o queries inválidos.

> *PD2 Se instaló el package multer en el proyecto y se añadió el archivo utils.js para utilizarlo, pero actualmente no está implementado para esta entrega, lamentablemente.


