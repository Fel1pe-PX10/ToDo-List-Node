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

    imprimirTareas( array, formaVisualizar ){
        /* 
        1-> muestra si esta completada
        2-> muestra fecha de completada
        */
            
        array.forEach( (tarea, i) => {
            const idx = `${i+1}`.green;
            const { desc, completadoEn } = tarea;
            let estado = '';
            if(formaVisualizar === 1)
                estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;
            else if(formaVisualizar === 2)
                estado = (completadoEn) ? completadoEn.green : 'Pendiente'.red;

            console.log(`${idx} ${desc} :: ${estado}`);
        });
    }
    
    
    constructor(  ){
        this._listado = {};
    }

    borrarTarea( id = '' ){
        
        if(this._listado[id]){
            delete this._listado[id];
            return 'Tarea borrada';
        }
        return 'Error, no se borró la tarea'
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

        // Solución del Profe Fernando -> lo cambié para un metodo que imprime y poderlo reutilizar
        this.imprimirTareas(this.listadoArr, 1);
        console.log();
        
    }

    listarPendientesCompletadas( completadas = true ){

        console.log(completadas);
        
        const pendientesCompletadas = this.listadoArr.filter( (completada, i) => {
            
            if(completadas)
                return completada.completadoEn  !== null;

            return completada.completadoEn  === null;
        });

        this.imprimirTareas(pendientesCompletadas, 2);
    }

    toggleCompletadas(ids = []){
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }

}

module.exports = Tareas;