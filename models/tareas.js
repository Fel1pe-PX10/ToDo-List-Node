const Tarea = require('./tarea');
const colors = require('colors');

class Tareas {

    _listado = {};

    get listadoArr(){
        const listado = [];

        Object.keys(this._listado).forEach((k) => {
            const tarea = this._listado[k];
            listado.push(tarea);
        })

        return listado;
    }
    
    
    constructor(  ){
        this._listado = {};
    }

    cargarTareasFromArray( tareas = [] ){

        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });

    }

    crearTarea( desc = '' ){
        const tarea = new Tarea( desc );

        this._listado[tarea.id] = tarea;
    }

    listadoCompleto (){

        // Solucion de Felipe
        /* let contador = 1;
        Object.keys(this._listado).forEach( llave => {
            
            console.log(`${ colors.green(contador+'.') } :: ${this._listado[llave].desc} ${ (this._listado[llave].completadoEn !== null) ? colors.green('Completada') : colors.red('Pendiente')}`);
            contador += 1;
        }); */

        // Solución del Profe Fernando
        console.log();
        this.listadoArr.forEach( (tarea, i) => {
            const idx = `${i+1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;

            console.log(`${idx} ${desc} :: ${estado}`);
            
        });
    }

}

module.exports = Tareas;