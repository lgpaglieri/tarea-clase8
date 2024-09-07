/*# Tarea clase 8

A las 2 tareas de la clase 6, ponerles las validaciones que consideren
necesarias.

TIP: Las edades no pueden tener decimales.
*/

const $botonConfirmarPaso1 = document.querySelector(
  "#confirmar-nro-integrantes"
);
const $cantidadIntegrantes = document.querySelector("#tamanio-grupo-familiar");
const $botonCalcularEstadisticas = document.querySelector(
  "#calcular-estadisticas"
);

const $botonAgregarSalarios = document.querySelector("#agregar-salarios");

$botonAgregarSalarios.onclick = function (event) {
  const cantidadIntegrantes = Number($cantidadIntegrantes.value);
  borrarSalariosIntegrantesAnteriores();
  agregarSalarios(cantidadIntegrantes);
  ocultarBotonAgregarSalario();
  event.preventDefault();
};

const $botonReiniciar = document.querySelector("#reiniciar");
$botonReiniciar.onclick = reiniciar();

$botonConfirmarPaso1.onclick = function (event) {
  validarPaso1();
  event.preventDefault();
};

function validarPaso1() {
  const cantidadIntegrantes = Number($cantidadIntegrantes.value);
  const erroresPaso1 = {
    cantIntegrantesEsEntero:
      validarCantIntegrantesEsEntero(cantidadIntegrantes),
    cantIntegrantesMayorACero:
      validarCantIntegrantesMayorACero(cantidadIntegrantes),
    cantIntegrantesMenorACien:
      validarCantIntegrantesMenorACien(cantidadIntegrantes),
  };
  borrarIntegrantesAnteriores();
  if (manejarErrores(erroresPaso1) === 0) {
    $cantidadIntegrantes.className = "";
    crearIntegrante(cantidadIntegrantes);
    avanzarAPaso2();
    mostrarBotonAgregarSalario();
    limpiarErrores();
  } else {
    $cantidadIntegrantes.className = "error";
  }
  event.preventDefault();
}

$botonCalcularEstadisticas.onclick = function (event) {
  validarPaso2();
  event.preventDefault();
};

function validarPaso2() {
  const $edades = document.querySelectorAll(".edad-integrante");
  const $salarios = document.querySelectorAll(".salario-integrante");

  const erroresPaso2 = {
    edadesEnteras: validarEdadesEnteras($edades),
    edadesNoNegativas: validarEdadesNoNegativas($edades),
    salariosNoNegativos: validarSalariosNoNegativos($salarios),
  };

  if (manejarErrores(erroresPaso2) === 0) {
    manejarErroresEdadesySalarios($edades, $salarios);
    calcularYMostrarEdades();
    calcularYMostrarSalarios();
    ocultarBotonCalculo();
    ocultarBotonAgregarSalario();
  } else {
    manejarErroresEdadesySalarios($edades, $salarios);
  }
}

function manejarErrores(errores) {
  const keysErrores = Object.keys(errores);
  const $errores = document.querySelector("#errores");
  limpiarErrores();
  let cantidadErrores = 0;
  keysErrores.forEach(function (key) {
    const error = errores[key];
    if (error !== "") {
      cantidadErrores++;

      const $error = document.createElement("li");
      $error.className = "mensaje-error";
      $error.innerText = error;
      $errores.appendChild($error);
    }
  });

  return cantidadErrores;
}

function calcularYMostrarSalarios() {
  const listaSalarios = obtenerSalarios();
  const $resultadosSalarios = document.querySelector("#resultados-salarios");
  const $mayorSalario = document.querySelector("#label-mayor-salario");
  const $menorSalario = document.querySelector("#label-menor-salario");
  const $promedioSalarios = document.querySelector("#label-promedio-salarios");
  if (listaSalarios.length > 0) {
    const mayorSalario = calcularMayor(listaSalarios);
    const menorSalario = calcularMenor(listaSalarios);
    const promedioSalarios = calcularPromedio(listaSalarios);
    $resultadosSalarios.className = "";
    $mayorSalario.textContent = `Mayor salario de la familia: $${mayorSalario}.`;
    $menorSalario.textContent = `Menor salario de la familia: $${menorSalario}.`;
    $promedioSalarios.textContent = `Salario promedio de la familia: $${promedioSalarios}.`;
  }
}

function calcularYMostrarEdades() {
  const listaEdades = obtenerEdades();
  const mayorEdad = calcularMayor(listaEdades);
  const menorEdad = calcularMenor(listaEdades);
  const promedioEdades = calcularPromedio(listaEdades);
  const $resultadosEdades = document.querySelector("#resultados-edades");
  const $mayorEdad = document.querySelector("#label-mayor-edad");
  const $menorEdad = document.querySelector("#label-menor-edad");
  const $promedioEdades = document.querySelector("#label-promedio-edades");
  $resultadosEdades.className = "";
  $mayorEdad.textContent = `Edad integrante de mayor edad: ${mayorEdad} años.`;
  $menorEdad.textContent = `Edad integrante de menor edad: ${menorEdad} años.`;
  $promedioEdades.textContent = `Edad promedio de la familia: ${promedioEdades} años.`;
}

function borrarIntegrantesAnteriores() {
  const $integrantesAnteriores = document.querySelectorAll(".integrante");
  for (let i = 0; i < $integrantesAnteriores.length; i++) {
    $integrantesAnteriores[i].remove();
  }
}

function borrarSalariosIntegrantesAnteriores() {
  const $salariosIntegrantesAnteriores = document.querySelectorAll(
    ".salario-integrante"
  );
  for (let i = 0; i < $salariosIntegrantesAnteriores.length; i++) {
    $salariosIntegrantesAnteriores[i].remove();
  }
}

function crearIntegrante(cantidadIntegrantes) {
  for (let i = 1; i < cantidadIntegrantes + 1; i++) {
    const $divIntegrante = document.createElement("div");
    $divIntegrante.className = "integrante";
    const $labelEdadIntegrante = document.createElement("label");
    $labelEdadIntegrante.textContent = `Edad integrante # ${i}: `;
    $labelEdadIntegrante.className = "label-integrante";
    const $inputEdadIntegrante = document.createElement("input");
    $inputEdadIntegrante.type = "number";
    $inputEdadIntegrante.className = "edad-integrante";

    $divIntegrante.appendChild($labelEdadIntegrante);
    $divIntegrante.appendChild($inputEdadIntegrante);

    const $divIntegrantes = document.querySelector("#integrantes");
    $divIntegrantes.appendChild($divIntegrante);
  }
}

function agregarSalarios(cantidadIntegrantes) {
  for (let i = 1; i < cantidadIntegrantes + 1; i++) {
    const $divSalarioIntegrante = document.createElement("div");
    $divSalarioIntegrante.className = "salario-integrante";
    const $labelSalarioIntegrante = document.createElement("label");
    $labelSalarioIntegrante.textContent = `Salario integrante # ${i}`;
    $labelSalarioIntegrante.className = "label-salario-integrante";
    const $inputSalarioIntegrante = document.createElement("input");
    $inputSalarioIntegrante.type = "number";
    $inputSalarioIntegrante.className = "salario-integrante";

    $divSalarioIntegrante.appendChild($labelSalarioIntegrante);
    $divSalarioIntegrante.appendChild($inputSalarioIntegrante);
    const $divSalariosIntegrantes = document.querySelector(
      "#salarios-integrantes"
    );
    $divSalariosIntegrantes.appendChild($divSalarioIntegrante);
  }
}

function avanzarAPaso2() {
  cambiarConsignaPaso1a2();
  mostrarBotonCalculo();
  ocultarBotonConfirma();
}

function obtenerEdades() {
  const $edades = document.querySelectorAll(".edad-integrante");
  const edades = [];
  for (let i = 0; i < $edades.length; i++) {
    edades.push(Number($edades[i].value));
  }
  return edades;
}

function obtenerSalarios() {
  const $edades = document.querySelectorAll(".salario-integrante input");
  const edades = [];
  for (let i = 0; i < $edades.length; i++) {
    if (Number($edades[i].value) > 0) {
      edades.push(Number($edades[i].value));
    } else {
      continue;
    }
  }
  return edades;
}

function calcularMayor(numeros) {
  let mayor = numeros[0];
  for (let i = 1; i <= numeros.length; i++) {
    if (numeros[i] > mayor) {
      mayor = numeros[i];
    }
  }
  return mayor;
}

function calcularMenor(numeros) {
  let menor = numeros[0];
  for (let i = 1; i <= numeros.length; i++) {
    if (numeros[i] < menor) {
      menor = numeros[i];
    }
  }
  return menor;
}

function calcularPromedio(numeros) {
  let suma = 0;
  for (let i = 0; i < numeros.length; i++) {
    suma += numeros[i];
  }
  promedio = suma / numeros.length;
  return promedio;
}

function reiniciar() {
  borrarIntegrantesAnteriores();
  ocultarBotonCalculo();
  cambiarConsignaPaso2a1();
  ocultarBotonAgregarSalario();
}

function cambiarConsignaPaso2a1() {
  const $consignaPaso = document.querySelector("#consigna-paso");
  $consignaPaso.textContent =
    "Paso 1: Ingrese la cantidad de integrantes en su grupo familiar";
  $labelCantidadIntegrantes = document.querySelector(
    "#label-cantidad-integrantes"
  );
  $labelCantidadIntegrantes.className = "oculto";
}

function cambiarConsignaPaso1a2() {
  const $consignaPaso = document.querySelector("#consigna-paso");
  $consignaPaso.textContent = "Paso 2: Complete la edad de cada integrante";
  $labelCantidadIntegrantes = document.querySelector(
    "#label-cantidad-integrantes"
  );
  $labelCantidadIntegrantes.className = "";
  $botonCalcularEstadisticas.className = "";
  $cantidadIntegrantes.disabled = true;
}

function ocultarBotonConfirma() {
  $botonConfirmarPaso1.className = "oculto";
}

function ocultarBotonCalculo() {
  $botonCalcularEstadisticas.className = "oculto";
}

function mostrarBotonCalculo() {
  $botonCalcularEstadisticas.className = "";
}

function ocultarBotonAgregarSalario() {
  document.querySelector("#agregar-salarios").className = "oculto";
}

function mostrarBotonAgregarSalario() {
  document.querySelector("#agregar-salarios").className = "";
}

const cantidadIntegrantes = document.querySelector(
  "#formulario-integrantes-familia"
)["input-cantidad-integrantes"].value;

function validarCantIntegrantesMayorACero(cantidadIntegrantes) {
  if (cantidadIntegrantes <= 0) {
    return "La cantidad de integrantes debe ser mayor a 0";
  } else {
    return "";
  }
}

function validarCantIntegrantesEsEntero(cantidadIntegrantes) {
  if (!Number.isInteger(cantidadIntegrantes)) {
    return "La cantidad de integrantes no puede tener decimales";
  } else {
    return "";
  }
}

function validarCantIntegrantesMenorACien(cantidadIntegrantes) {
  if (cantidadIntegrantes > 99) {
    return "La cantidad de integrantes no puede ser mayor a 100";
  } else {
    return "";
  }
}

function manejarErroresEdadesySalarios($edades, $salarios) {
  $edades.forEach(function (edad) {
    if (!Number.isInteger(Number(edad.value))) {
      edad.classList.add("error");
    } else if (Number(edad.value) < 0) {
      edad.classList.add("error");
    } else {
      edad.className = "edad-integrante";
    }
  });

  $salarios.forEach(function (salario) {
    if (Number(salario.value) < 0) {
      salario.classList.add("error");
    } else {
      salario.className = "salario-integrante";
    }
  });
}

function validarEdadesEnteras($edades) {
  let contadorErrores = 0;
  $edades.forEach(function (edad) {
    if (!Number.isInteger(Number(edad.value))) {
      contadorErrores++;
    }
  });
  if (contadorErrores !== 0) {
    return "Las edades ingresadas no pueden contener decimales";
  } else {
    return "";
  }
}

function validarEdadesNoNegativas($edades) {
  let contadorErrores = 0;
  $edades.forEach(function (edad) {
    if (Number(edad.value) < 0) {
      contadorErrores++;
    }
  });
  if (contadorErrores !== 0) {
    return "Las edades ingresadas no pueden ser negativas";
  } else {
    return "";
  }
}

function validarSalariosNoNegativos($salarios) {
  let contadorErrores = 0;
  $salarios.forEach(function (salario) {
    if (Number(salario.value) < 0) {
      contadorErrores++;
    }
  });
  if (contadorErrores !== 0) {
    return "Los salarios ingresadas no pueden ser negativos";
  } else {
    return "";
  }
}

function limpiarErrores() {
  const $errores = document.querySelectorAll(".mensaje-error");
  $errores.forEach(function (error) {
    error.remove();
  });
}