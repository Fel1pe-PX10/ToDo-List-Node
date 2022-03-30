require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { 
    inquireMenu, 
    pausaMenu,
    leerInput,
    listarTareasBorrar,
    confirmar,
    mostrarListadoChecklist } = require('./helpers/inquirer');

const Tareas = require('./models/tareas');




const main = async() => {

    let opt        = '';
    const tareas   = new Tareas();
    const tareasDB = leerDB();

    if(tareasDB){
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
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                const id = await listarTareasBorrar(tareas.listadoArr); 
                if(id !== '0'){
                    const ok = await confirmar('¿Está seguro de borrar?');
                    if(ok){
                        const res = tareas.borrarTarea(id);
                        console.log(res);
                    }
                }
                break;
        }

        guardarDB(tareas.listadoArr);

        await pausaMenu();

    } while (opt != '0');
}

main();