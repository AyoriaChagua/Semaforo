const $lucesDelCirculoVertical = document.querySelectorAll('.luces-circulo-vertical');
const $lucesDelCirculoHorizontal = document.querySelectorAll('.luces-circulo-horizontal');

//--Obtenemos los contenedores donde se insertarán los vehiculos--
const $contenedorVehiculosHD = document.getElementById('contenedor-vehiculos-h-d');
const $contenedorVehiculosHI = document.getElementById('contenedor-vehiculos-h-i');
const $contenedorVehiculosVAb = document.getElementById('contenedor-vehiculos-v-abajo');
const $contenedorVehiculosVAr = document.getElementById('contenedor-vehiculos-v-arriba');

const $velocidadPromedio = 60;

let tiempoSemVertical = 1000;
let tiempoSemHorizontal = 1000; 



//--Colocamos los vehiculos segun la direccion de la via (izquierda, derecha, arriba, abajo) uzando un for para cada uno--

const generarVehiculos = (cantidadHorizontal, cantidadVertical) =>{

    //--Creamos los elementos que se insertarán

    for(let i=0; i < Math.round(cantidadVertical*0.5); i++) {

        const div_autosVArriba = document.createElement('div');
        div_autosVArriba.setAttribute('arranqueVerticalArriba', 'arranque-hacia-arriba');
        div_autosVArriba.className = 'auto-vertical-abajo';

        const img_autoVArriba = document.createElement('img');
        img_autoVArriba.src = 'img/pngwing.com (4).png';
        img_autoVArriba.id = 'auto-hacia-abajo';
        div_autosVArriba.appendChild(img_autoVArriba);

        $contenedorVehiculosVAr.appendChild(div_autosVArriba);
    }

    for(let j=0; j < parseInt(cantidadVertical*0.5); j++){

        const div_autosVAbajo = document.createElement('div');
        div_autosVAbajo.setAttribute('arranqueVerticalAbajo', 'arranque-hacia-abajo')
        div_autosVAbajo.className = 'auto-vertical-arriba';

        const img_autoVAbajo = document.createElement('img');
        img_autoVAbajo.src = 'img/pngwing.com (4).png';
        img_autoVAbajo.id = 'auto-hacia-arriba';
        div_autosVAbajo.appendChild(img_autoVAbajo);

        $contenedorVehiculosVAb.appendChild(div_autosVAbajo);
    }



    for(let h=0; h < Math.round(cantidadHorizontal*0.5); h++){

        const div_autosHD = document.createElement('div');
        div_autosHD.setAttribute('arranqueHorizontalDerecha', 'arranque-hacia-derecha');
        div_autosHD.className = 'auto-horizontal-derecha';
        
        const img_autoHD = document.createElement('img');
        img_autoHD.src = 'img/pngwing.com (4).png';
        img_autoHD.id = 'auto-hacia-derecha';
        div_autosHD.appendChild(img_autoHD);
        $contenedorVehiculosHD.appendChild(div_autosHD);
    }

    for(let l =0; l<parseInt(cantidadHorizontal*0.5); l++){

        const div_autosHI = document.createElement('div');
        div_autosHI.setAttribute('arranqueHorizontalIzquierda', 'arranque-hacia-izquierda');
        div_autosHI.className = 'auto-horizontal-izquierda';

        const img_autoHI = document.createElement('img');
        img_autoHI.src = 'img/pngwing.com (4).png';
        img_autoHI.id = 'auto-hacia-izquierda';
        div_autosHI.appendChild(img_autoHI);
        $contenedorVehiculosHI.appendChild(div_autosHI);
    }
    
}

//--Esta función nos evalua que tan diferentes son las cantidades que se van a ingresar(cantidad de vehiculos y personas) y 
//segun eso adicionará tiempo a un semáforo

const compararCantidades = (datosHorizontal, datosVertical)=>{

    if (datosHorizontal <= datosVertical && datosHorizontal >=(datosVertical*0.75)) {
        tiempoSemVertical += 1000
    }else if(datosHorizontal <= (datosVertical*0.75) && datosHorizontal >=(datosVertical*0.5)) {
        tiempoSemVertical += 2000;
    }else if(datosHorizontal <= (datosVertical*0.5) && datosHorizontal >= (datosVertical*0.25)) {
        tiempoSemVertical += 3000;
    }else if(datosHorizontal <= (datosVertical*0.25)){
        tiempoSemVertical += 4000;
    }else{
        if (datosVertical <= datosHorizontal && datosVertical >=(datosHorizontal*0.75)) {
            tiempoSemHorizontal += 1000
        }else if(datosVertical <= (datosHorizontal*0.75) && datosVertical >=(datosHorizontal*0.5)) {
            tiempoSemHorizontal += 2000;
        }else if(datosVertical <= (datosHorizontal*0.5) && datosVertical >=(datosHorizontal*0.25)) {
            tiempoSemHorizontal += 3000;
        }else if(datosVertical <= (datosHorizontal*0.25)){
            tiempoSemHorizontal += 4000;
        }
    };
}


//--Esta función adicionará más tiempo al semáforo en verde para aquel carril que tenga vehiculos que superán la velocidad promedio

const compararVelocidadProm = (velocidadH, velocidadV) =>{

    if(velocidadH > $velocidadPromedio && velocidadV < $velocidadPromedio){
        tiempoSemVertical += 3000;
    }else{
        tiempoSemHorizontal += 3000;
    }
}

const moverVehiculos =(autoHorizontalDerecha, autoHorizontalIzquierda)=>{
    if($lucesDelCirculoHorizontal[0].getAttribute('colorH') == 'red'){
        for(let i in autoHorizontalDerecha){
            let autoDerecha = autoHorizontalDerecha[i];
            autoDerecha.classList.add(autoDerecha.getAttribute('arranqueHorizontalDerecha'));
            if (i==(autoHorizontalDerecha.length-1)) break;
        }
    
    
        for(let i in autoHorizontalIzquierda){
            let autoIzquierda = autoHorizontalIzquierda[i];
            autoIzquierda.classList.add(autoIzquierda.getAttribute('arranqueHorizontalIzquierda'));
            if (i==(autoHorizontalIzquierda.length-1)) break;
        }
    }
}

const moverVehiculosVertical =(autoVerticalAbajo, autoVerticalArriba)=>{
    if($lucesDelCirculoVertical[0].getAttribute('colorV') == 'red'){

        for(let i in autoVerticalAbajo){
            let autoAbajo = autoVerticalAbajo[i];
            autoAbajo.classList.add(autoAbajo.getAttribute('arranqueVerticalAbajo'));
            if (i==(autoVerticalAbajo.length-1)) break;
        }
    
        for(let i in autoVerticalArriba){
            let autoArriba = autoVerticalArriba[i];
            autoArriba.classList.add(autoArriba.getAttribute('arranqueVerticalArriba'));
            if (i==(autoVerticalArriba.length-1)) break;
            
        }
        
    }
}

//--
const getValues =()=>{

    //--Obtenemos la informacion de los inputs (variables)--
    let numAutosH = parseInt(document.getElementById('cantidad-horizontal').value);
    let numPersonasH = parseInt(document.getElementById('personas-horizontal').value);
    let velocidadPromH = parseFloat(document.getElementById('velocidad-horizontal').value);

    let numAutosV = parseInt(document.getElementById('cantidad-vertical').value);
    let numPersonasV = parseInt(document.getElementById('personas-vertical').value);
    let velocidadPromV= parseFloat(document.getElementById('velocidad-vertical').value);
//--Utilizamos las funciones para determinar cual será el tiempo determinante
    //mientras en un lado se muestra rojo(por ejemplo) en el otro será verde, así que el que tenga mayor tiempo mostrará el semaforo de su conveniencia en verde (en rojo menos tiempo), mientras que el otro mostraá el suyo en verde el tiempo que acumulo pero 1 segundo menos 

//verificamos que no haya ningun campo vacios

    if(isNaN(parseFloat(numAutosH)) || isNaN(parseFloat(numAutosV)) || isNaN(parseFloat(numPersonasH)) ||
        isNaN(parseFloat(numPersonasV)) || isNaN(parseFloat(velocidadPromV)) || isNaN(parseFloat(velocidadPromH))){
       alert('Completa todos los campos')
    }else{
        generarVehiculos(numAutosH, numAutosV)        
    }

    compararCantidades(numAutosH, numAutosV);
    compararCantidades(numPersonasH, numPersonasV);
    compararVelocidadProm(velocidadPromH, velocidadPromV);

    let tiempos = [tiempoSemHorizontal, tiempoSemVertical];

    //--Obtenemos los 4 nodos de las direcciones de los autos--

    let $autoVerticalAbajo = document.querySelectorAll('.auto-vertical-abajo'); 
    let $autoVerticalArriba = document.querySelectorAll('.auto-vertical-arriba'); 
    let $autoHorizontalDerecha = document.querySelectorAll('.auto-horizontal-derecha');
    let $autoHorizontalIzquierda = document.querySelectorAll('.auto-horizontal-izquierda');

    let contadorDeLuzV = 0;
    let contadorDeLuzH = 2;

    let contadorAutosVertical = 0;
    let contadorAutosHorizaontal = 0;

    const mostrarLuzVertical =()=>{

        $lucesDelCirculoVertical[contadorDeLuzV].className = 'luces-circulo-vertical';
        contadorDeLuzV++;

        if(contadorDeLuzV>2) contadorDeLuzV = 0;

        const luzActualV = $lucesDelCirculoVertical[contadorDeLuzV];
        luzActualV.classList.add(luzActualV.getAttribute('colorV'));

        moverVehiculosVertical($autoVerticalAbajo, $autoVerticalArriba)
    }; 

    setInterval(mostrarLuzVertical, 6000);

    const mostrarLuzHorizontal =()=>{
        $lucesDelCirculoHorizontal[contadorDeLuzH].className = 'luces-circulo-horizontal';
        contadorDeLuzH--;

        if(contadorDeLuzH<=-1) contadorDeLuzH = 2;

        const luzActualH = $lucesDelCirculoHorizontal[contadorDeLuzH];
        luzActualH.classList.add(luzActualH.getAttribute('colorH'));

        moverVehiculos($autoHorizontalDerecha, $autoHorizontalIzquierda)
    }; 

    setInterval(mostrarLuzHorizontal,6000);


        
   
    
    console.log($autoHorizontalDerecha)
}









