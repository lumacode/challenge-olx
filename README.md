# MICROSERVICIO DE TIPO REST – NODE (express) y MONGOOSE (MONGODB - MONGO ATLAS)

_Descripción: Microservicio de tipo REST para challenge, no es una versión productiva._ 

_Se realizaron las consignas asignadas, siguiendo un desarrollo ordenado y manteniendo estructuras de programación básicas y estables. También utilice tanto objetos literales como clases a fines demostrativos. Todos los campos son validados rigurosamente con utilidades desarrolladas para el caso en concreto y gracias a las expresiones regulares. También podría haber utilizado algúna libreria para validar como validator o hapi/joi pero en este caso opte por realizar validaciones customizadas teniendo especial cuidado en respetar la lógica del CUIT Argentino y utilizando la validación facilitada para el RUT de Chile. También se dejo preparada una función de traducción para facilitar posibles traducciones i18n o similares._

Otras utilidades:
* [x] Generación de logs.
* [x] Validación de CUIT, RUT, nombres (stringText) y fechas (para string y fecha se utilizaron expresiones regulares)._

_Se deja preparado el modulo de Swagger para documentar {baseUrl}/docs_

## Comenzando 🚀

### Pre-requisitos 📋

_Estas instrucciones te permitirán obtener una copia del proyecto y ponerlo en funcionamiento con nodemon como "demonio" de desarrollo._

_Comandos para desplegar el proyecto:_

```
git clone https://github.com/lumacode/challenge-olx.git 
cd challenge-olx 
npm install 
npm start
```
_Para iniciar el proyecto deberás crear un archivo **.env** en el directorio raíz del proyecto, el mismo deberá contener las siguientes variables de entorno (según los datos que correspondan). No obstante no se ignoro el .env que use para el desarrollo con los datos necesarios para conectarse al cluster de mongo Atlas que uso para test y las demás variables de entorno. Por lo tanto con clonar el repositorio ya encontrarás el archivo listo._

_También podrás usar mongodb de forma local debido a que la app está configurada para que pueda utilizarse con cualquiera de las dos formas, si no existe conección para mongo Atlas se conecta a mongodb localhostn (teniendo condigurado este motor de base de datos)._

_Como se solicito en la consigna la API utiliza mongodb por lo que deberás establecer la conexión con este motor de base de datos dentro del fichero index.js (27:45) encontrarás lo que necesitas. Si se utiliza otra conexión de mongo Atlas necesitarás cambiar la constante que contiene mongoAtlasUri con tu configuración y las variables de entorno APP_MONGO_USER - APP_MONGO_PWD. De todas formas el cluster que use está activo y podés probar el microservicio sin necesidad de cambiarlo._

## Archivo .env
```
## APP CFG ##
APP_BASE_URL = "http://localhost"
APP_MULTILANG = false
APP_PORT = 3900
APP_API_KEY = "2252JHJJJnjjhUY7^%$275.7YHJKLL9*FGDGHTrtes33!.0098NNB#@"

## MONGO DB CFG ##
APP_MONGO_USER = 
APP_MONGO_PWD = 

```

## Recursos de la API REST 🔧

_A continuación se listarán todos los endpoints de la API REST con el json de ejemplo tanto para peticiones como de respuesta. Y como pasar la autorización simple que tiene la API a través del middleware de autorización._

_Es importante destacar que solamente se permiten peticiones que contengan el Content-Type de tipo json, caso contrario se devuelve el siguiente error en formato json:_ 

```

{
    "status": "error",
    "message": "Invalid Content-Type."
}


```

 ## Autorización 🔑 

 El microservicio tiene una validación de tipo middleware simple a través de un API KEY, para poder utilizar el servicio es necesario que en los headers enviamos dentro de la KEY Authorization el API KEY como VALUE.

 AKI KEY POR DEFECTO* = 2252JHJJJnjjhUY7^%$275.7YHJKLL9*FGDGHTrtes33!.0098NNB#@

 *Este API KEY se encuentra dentro del .env como una variable de entorno APP_API_KEY

 Ejemplo:

{"Authorization" : "2252JHJJJnjjhUY7^%$275.7YHJKLL9*FGDGHTrtes33!.0098NNB#@"}

## Dar de alta un nuevo cliente

Endpoint único de tipo POST: 

```

 /{countryCode}/onboarding


```

_Ejemplo de petición por método **POST** para Argentina:_

 /ar/onboarding


```
 { 
     "firstName": "Juan",
     "lastName": "Perez", 
     "gender": "M", 
     "nacionalId": "20-18353203-1", 
     "birthDate": "1993/10/10"
 }
```

_Ejemplo de petición por método **POST** para Chile:_

 /cl/onboarding


```
 { 
     "firstName": "Miguel",
     "lastName": "Perez", 
     "gender": "M", 
     "nacionalId": "15371275-1", 
     "birthDate": "1993/01/20", 
     "father":{
         "firstName": "Roberto",
         "lastName": "Perez" 
     }
 }

```

_Respuesta de ejemplo:_

```
STATUS CODE: 200

{
    "status": "ok",
    "message": "The client was created successfully.",
    "clientId": "60c56c795eebea3cd080b40d"
}

```
_*Si el CUIT o RUT (nacionalId) ya existe devuelve un error 422 informando la situación._

_Respuesta de ejemplo:_

```
STATUS CODE: 422

{
    "status": "error",
    "message": "The client already registered."
}

```

_*Si alguno de los campos es incorrecto por ejemplo el firstName contiene números o signos que no sean letras devuelve un error 422 informando la situación._

_*Tambien se incluyo dentro de utils/helpers una función para calcular la edad de los clientes y que si no essuperior a 17(18) o menor a 80(79), se detiene la ejecución del programa y se devuelve una respuesta en formato json haciendo saber dicho impedimento._

_*Ante errores propios del servicio o de la base de datos el mismo es capturado por el catch del controlador y se genera un error.log en la carpeta logs y también devuelve un error en formato json con un status code 500._

**Para facilitar la prueba del microservicio se deja en el repositorio una carpeta llamada postman con archivo generado por el cliente REST para ser importado facilmente.**

## Construido con 🛠️

* [Node](https://nodejs.org/es/) 
* [Express](https://expressjs.com/es/)
* [MongoDB](https://www.mongodb.com/es)
* [Mongoose](https://mongoosejs.com/)
* [Mongo Atlas](https://cloud.mongodb.com/)

## Versionado 📌

* 1.0.0

## Autores ✒️

* **Luis Albanese** - *Desarrollo y documentación* - [lumacode](https://github.com/lumacode)

