# Plataforma 5 - Co-Work - (BACK-END)

## Descripcion

<p>
P5 Co-work es una aplicación la cual surge como un proyecto propuesto por <a href="https://www.plataforma5.la/" target="blank">Plataforma 5 - Coding Bootcamp.</a> 
La aplicación ofrece un servicio al staff de P5 y a los alumnos de BC, la cual les permite la reserva de turnos para ir a trabajar/estudiar a las oficinas de P5
</p>

## Inicializacion

### Para empezar:

- Primero forkeamos (en el caso de ser necesario) y/o clonamos este repositorio.
- Abrimos una nueva terminal, nos paramos sobre la carpeta del repositorio y ejecutamos el comando `code .` para abrirlo en **Visual Studio Code** o tu editor de texto de preferencia.
- Una vez abierto en nuestro editor de texto, en la raiz del proyecto vamos a crear un archivo nuevo que se llame ".env", para poder crear nuestras variables de entorno. Para guiarnos sobre que valores debe tener este nuevo archivo, revisaremos el que posee el nombre ".env.example" el cual tiene las indicaciones de que deben poseer las variables de entorno de nuestro archivo ".env"
- Una vez hecho todo esto, abrimos nuevamente la terminal (siempre parados sobre la carpeta del repositorio) y ejecutamos los siguientes comandos:

```bash
`npm i`
```
Para instalar las dependencias.

```bash
`npm run seed`
```
Seteamos los roles del usuario, dos usuarios (un admin y un staff), una serie de oficinas y algunas mesas de trabajo en la base de datos para poder interactuar con la misma.

```bash
`npm start`
```
Para levantar el servidor.

## Metodologia de Trabajo

- Antes de arrancar a trabajar, tener en cuenta las siguientes pautas cada vez que se vaya a crear una nueva funcion en el proyecto:
  - En la terminal, parados sobre la carpeta del repositorio, movernos a la rama de produccion "develop" ejecutando `git checkout develop`.
  - Desde ahi, ejecutar `git pull` para obtener los cambios mas recientes.
  - Luego, ejecutar `git checkout -b "feature/(nombreDeLaFuncion)"` para crear una nueva rama de trabajo o `git checkout -b "bugfix/(nombreDeLaFuncion)` para crear una rama en la que arreglaras algun bug.
- Para guardar los cambios:
  - `git add .`
  - `git commit -m "(especificarCambios)"`
  - `git push`
  - Realizar el merge de la rama teniendo como base la develop.



## Finalmente

###### TE SUGERIMOS IR Y SEGUIR LOS PASOS DEL ARCHIVO "README.MD" DEL REPOSITORIO QUE PERTENECE AL FRONT-END DE ESTE PROYECTO: <a href="https://github.com/darioberatti/Co-Work-P5-FRONTEND">Co-Work-P5-FRONTEND</a>

## Autores

```javascript
const autores = [
  "Mateo Navarro",
  "Agustin Torroja",
  " Dario Beratti",
  " Gastón Rabinovich",
];
autores.join(","); // "Mateo Navarro, Agustin Torroja, Dario Beratti, Gastón Rabinovich"
```
