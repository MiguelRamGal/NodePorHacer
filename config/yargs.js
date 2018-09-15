//Defino la libreria YARGS, para en caso de escribir algo en la terminal darle procesamiento a esta información
const descripcion = {
    demand:true,
    alias: 'd',
    desc:"Descripción de la tarea por hacer"
}

const completado = {
    alias: 'c',
    default: true,
    dec: 'Marca como completado o pendiente la tarea'
}


const argv = require('yargs')
            .command('crear','Crear un elemento por hacer',{//Creo el comando crear y solicito una descripción y lo hago obligatorio, adicional pido una descripción
                descripcion
            })
            //Creo l opción actualizar, aquí pido una descripción y otra llamado completado
            .command('actualizar','Actualiza el estado completado de una tarea',{
                descripcion,
                completado
            })
            .command('borrar','Borrar una fila de la base de datos',{
                descripcion
            })
            .help()
            .argv;
//Cabe mencionar que aquí solo defino las acciones crear y actualizar, pero si alguien escribe eliminar, si lo reconoce, pero como no defino parametros obligatios,
//este lo deja pasar sin mandar ningún tipo de require o error
module.exports = {
    argv:argv
}