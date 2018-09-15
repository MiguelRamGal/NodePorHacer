const fs = require('fs');//Importo la libreria de file sistem

let listadoPorHacer = [];//Defino mi arreglo

const guadarDB = () => {
    let data = JSON.stringify(listadoPorHacer)//El metodo stringify, convierte un objeto a un JSON

    //Escribo mi archivo con la información de mi JSON
    fs.writeFile('db/data.json',data,(error) =>{
        if(error){
            throw new Error ('No se pudo guardar su información',error);
        }else{
            //console.log("Se guardo exitosamente el registro")
        }
    })
}

//Creo una función para cargar mi base de datos
const cargarDB = () => {
    //Con este try valido, si en caso de que el data.json está vacio, este manda un error, por lo cual si pasa esto, porngo mi arreglo en vacio
    try {
        listadoPorHacer = require('../db/data.json');//Importo mi archivo JSON para ver su contenido y lo agrego a mi arreglo con el fin de hacer un tipo de APPEND a la información
    } catch (error) {
        listadoPorHacer = [];//En caso de error pongo mi arreglo en vacio
    }
}

//Función para obtener mi información del JSON
const getListado = () =>{
    cargarDB();//mando a llamar mi funcion la cual llena mi arreglo listadoPorHacer con la info
    return listadoPorHacer; //REgreso mi arreglo, ya que esta ya cuenta con toda la información de mis tareas por hacer
}

//Función para actualizar el estatus de la tarea
const actualizar = (descripcionBuscar,completadoNew=true)=>{
    cargarDB();//Cargo mi DB

    //Busco el valor dentro de mi objeto
    let index = listadoPorHacer.findIndex(tarea=>{
        return tarea.descripcion === descripcionBuscar;
    })

    //Comparo de que ecxiste el dato
    if(index => 0){
        listadoPorHacer[index].completado = completadoNew;//MOdifico el nuevo estatus de la tare
        guadarDB();//Guardo mi información en el JSON
        return true;
    }else{
        return false;
    }
}

//Funcion para eliminar un elemento
let borrar = (descripcion) => {
    cargarDB();//Cargo mi base de datos

    //El filter me ayuda a quitar o filtar algun elemento, y esto me regresa un nuevo arreglo sin ese elemento o solo con ese elemento
    let nuevoListado = listadoPorHacer.filter(tarea=>{
        return tarea.descripcion !== descripcion;
    })

    //Camparo si se borro un dato, esto lo hago mediante la comparación del largo de cada arreglo
    if(listadoPorHacer.length === nuevoListado.length){
        return false;
    }else{
        listadoPorHacer = nuevoListado;
        guadarDB();
        return true;
    }
}

//Creo una funcion de tipo const, en la cual recibo una descripción
const crear = (descripcion) =>{
    
    cargarDB();

    //Creo un objeto en el cual pongo una descripcion y un estatus
    let porHacer = {
        descripcion: descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer);//Agrego mi objeto a mi arreglo

    guadarDB();//Mando a llamar mi funcion guardarDB

    return porHacer;
}


module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}