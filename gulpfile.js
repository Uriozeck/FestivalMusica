//Archivo de configuración de gulp, aquí se configuran las tareas que se van a aejecutar automaticamente
//Cada tarea en gulp debe llevar una función

// function tarea(callback) {
//     console.log('mi primer tarea');
    
//     callback();
// }
// //Forma de llamar a una función en gulp
// exports.tarea = tarea;

//COMPILAR CÓDIGO DE SASSS

// dentro de la variable se importan las funciones src(identificar archivos) y dest(almacena algo en una carpeta destino) | la parte de require("gulp") indica que se manda a llamar el archivo gulp que tiene las funcionalidades para crear tareas
const {src, dest, watch, parallel} = require("gulp");
// const sass = require("sass"); //Llamamos a la variable sass e importamos el archivo de sass

//CSS
const sass = require("gulp-sass")(require("sass")) //Se manda a llamar la nueva dependencia creada de gulp-sass y se llama tambien el archivo sass
const plumber = require('gulp-plumber');

//IMAGENES
const webp = require("webp");

function css(done) {
    //src('src/scss/app.scss') //1. identificar archivo de SASS
    src('src/scss/**/*.scss') // Los asteriscos hacen una recursividad entre todas las carpetas y se cada que se recarga un archivo se compila
        .pipe( plumber()) //Nos ayuda a que el cada que se cometa un error no se pare la ejecución del código y nos muestre detalles del error
        .pipe( sass()) //2. compilar archivo de sass:
        .pipe(dest("build/css"));////3. almacernala en el disco duro:


    done(); //callback que avisa a gulp cuando llegamos al final de la tarea
}

exports.css = css; //Llamamos a la función
//NOTA: al ejecutar se muestra un error y se tiene que descargar un plugin para que se pueda ejecutar sass en gulp

function versionWebp(done) {
    const opciones = {
        quality: 50
    };
    //Busca dos formatos entonces se ponen entre llaves
    src('src/img/**/*.{png,jpg}').pipe( webp(opciones)).pipe( dest('build/img'))
    done()
}

function dev(cb) {
   watch('src/scss/**/*.scss', css) //Se agrega la funcion watch en esta se agrega la ruta del archivo y se indica que ese archivo es el que se encuentra en la funcion css

    cb();
}

exports.versionWebp = versionWebp;
// exports.dev = parallel (versionwebp, dev); //parallel indica que se van a ejecutar diferentes tareas al mismo tiempo y posteriormente se indican que tareas son las que se estarán ejecutando
exports.dev = dev; 