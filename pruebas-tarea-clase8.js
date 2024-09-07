function probarValidarCantIntegrantesMayorACero(){
    console.assert (
        validarCantIntegrantesMayorACero(0)==='La cantidad de integrantes debe ser mayor a 0',
        'Validar cantidad de integrantes mayor a cero no funcionó asignandole el valor de 0')
}

function probarValidarCantIntegrantesEsEntero(){
    console.assert (
        validarCantIntegrantesEsEntero(1.1111)==='La cantidad de integrantes no puede tener decimales',
        'Validar cantidad de integrantes es numero entero no funcionó asignandole el valor 1.1111'
    )
}

function probarValidarCantIntegrantesMenorACien(){
    console.assert (
        validarCantIntegrantesMenorACien(110)==='La cantidad de integrantes no puede ser mayor a 100',
        'Validar cantidad de integrantes no funcionó asignandole un valor de 110'
    )
}
  
const arrayPruebaEdades=[10,1.2,-1]
function probarValidarEdadesEnteras(){
    console.assert(
        validarEdadesEnteras(arrayPruebaEdades)==='Las edades ingresadas no pueden contener decimales',
        'Validar edades enteras no funcionó asignandole un valor de 1.2'
    )
}

function probarValidarEdadesNoNegativas(){
    console.assert(
        validarEdadesNoNegativas(arrayPruebaEdades)==='Las edades ingresadas no pueden ser negativas',
        'Validar edades no negativas no funcionó asignandole un valor de -10'
    )
}

probarValidarCantIntegrantesMayorACero();
probarValidarCantIntegrantesEsEntero();
probarValidarCantIntegrantesMenorACien();
probarValidarEdadesEnteras();
probarValidarEdadesNoNegativas();