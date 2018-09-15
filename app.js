const argv = require('./config/yargs').argv;//Importo mi archivo args, y obengo el valor de argv
const colors = require('colors');//Importo mi librería de colores
const porHacer = require('./por-hacer/por-hacer');//Importo mi archivo por hacer

let comando = argv._[0];//Obtengo en comando de lo que hará la aplicación

/*COMANDOS

CREAR
node app crear -d "Jugar XBOX"

ACTUALIZAR
node app actualizar -d "Jugar XBOX" -c true

*/
switch(comando){
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);//Mado a llamar mi funcion crear y le paso los parámetros
        console.log(tarea);//Imprimo mi respuesta
    break;

    case 'listar':
        let listado = porHacer.getListado();//Obtengo mi json con la info
        //Imprimo mi información
        for(let tarea of listado){
            console.log('==========Por Hacer==========='.green);
            console.log(tarea.descripcion);
            console.log(tarea.completado);
            console.log('=============================='.green);
        }

    break;

    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
    break;

    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado);
    break;

    default:
        console.log("Comando no conocido");
}