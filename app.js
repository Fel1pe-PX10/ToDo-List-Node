require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { 
    inquireMenu, 
    pausaMenu,
    leerInput } = require('./helpers/inquirer');

const Tareas = require('./models/tareas');




const main = async() => {

    let opt      = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if( tareasDB ){
        tareas.cargarTareasFromArray(tareasDB);
    }


    do {
        // Imprimir el menu 
        opt = await inquireMenu();

        switch (opt) {
            case '1':
                // Crear opcion
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea( desc );
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                
                break;
            case '4':
                
                break;
            case '5':
                
                break;
            case '6':
                
                break;
        }

        guardarDB( tareas.listadoArr );

        await pausaMenu();

    } while (opt != '0');
}

main();