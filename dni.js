"use strict";
{
  /**
   * 1. Dado un vector de objetos literales con el siguiente formato:
   * {nombreCompleto:”Ana Pérez Soler”, DNI: “21147465T”, edad: 21}:
   *
   * a. Crea una función que reciba como parámetro el array original y devuelva un array
   * con los identificadores de los usuarios. Para ello debes coger la primera letra
   * (minúsculas y sin tildes) del nombre, las tres primeras letras del primer apellido
   * (minúsculas y sin tildes), las tres primeras del segundo apellido (minúsculas y sin tildes)
   * y los tres últimos dígitos del DNI. Usa la función map.(3p)
   * NOTA: Se entiende que los nombres y los apellidos no son compuestos y todos tienen tres o más caracteres.
   *
   * b. Crea una función que reciba como parámetro el array original y devuelva un array
   * con los DNI que sean válidos. NOTA: Los DNI pueden tener la letra en mayúscula o
   * minúscula pero no tienen un separador entre número y letra. Usa la función filter y map. (3p)
   *
   * c. Crea una función que reciba como parámetro el array original y devuelva un array
   * con los objetos ordenados por edad de mayor a menor. NOTA: Usar la función sort.(2p)
   *
   * d. Crea una función que reciba como parámetro el array original y devuelva un array
   * con las edades que sean números casi primos (es un número que solo es divisible
   * por sí mismo, la unidad y por un solo número que no sea ni la unidad ni si mismo).
   * Usa la función filter y map. (2p)
   */

  let personas = [
    { nombreCompleto: "Ana Pérez Soler", DNI: "21147465T", edad: 4 },
    { nombreCompleto: "Álvaro García Castro", DNI: "24545535G", edad: 32 },
    { nombreCompleto: "Paloma González Máxim", DNI: "45678912L", edad: 9 },
    { nombreCompleto: "Alberto Alguacil Alcalde", DNI: "79753330W", edad: 17 },
  ];

  // Apartado a

  function obtenerIdentificadores(personas) {
    //Este return devuelve un array con los identificadores de las personas
    return personas.map(function (persona) {
      // Obtener la primera letra del nombre en minúsculas y sin tildes
      const primeraLetraNombre = persona.nombreCompleto
        // Normalizar el string para eliminar las tildes, se pone NFD para que se separen los caracteres acentuados en dos caracteres simples
        .normalize("NFD")
        // Replace se usa para reemplazar los caracteres que no sean ASCII por una cadena vacía (ASCII son los caracteres que se usan en el alfabeto inglés)
        //La expresión regular [\u0300-\u036f] se usa para encontrar los caracteres que no sean ASCII
        .replace(/[\u0300-\u036f]/g, "")
        // Convertir el string a minúsculas
        .toLowerCase()
        // Obtener el primer carácter del string
        .charAt(0);

      // Obtener las tres primeras letras del primer apellido en minúsculas y sin tildes
      const tresLetrasPrimerApellido = persona.nombreCompleto
        .split(" ")[1]
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        //Slice se usa para obtener una parte del string, en este caso se obtienen los tres primeros caracteres
        .slice(0, 3);

      // Obtener las tres primeras letras del segundo apellido en minúsculas y sin tildes
      const tresLetrasSegundoApellido = persona.nombreCompleto
        .split(" ")[2]
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .slice(0, 3);

      // Obtener los tres últimos dígitos del DNI
      const tresUltimosDigitosDNI = persona.DNI.slice(-3);

      // Combinar los resultados en un único identificador
      const identificador = `${primeraLetraNombre}${tresLetrasPrimerApellido}${tresLetrasSegundoApellido}${tresUltimosDigitosDNI}`;

      return identificador;
    });
  }

  // Apartado b

    //Esta función comprueba si un DNI es válido
  function esDNIValido(DNI) {
    //Esta variable se usa para almacenar las letras que se usan para comprobar si el DNI es válido
    const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
    //Esta variable se usa para almacenar el número del DNI
    const numero = DNI.substring(0, DNI.length - 1);
    //Esta variable se usa para almacenar la letra del DNI
    const letra = DNI.substring(DNI.length - 1);

    //Si el número del DNI no es un número no es válido
    //Si la letra del DNI no es una letra no es válido
    //Si la letra del DNI no coincide con la letra que se obtiene de la variable letras no es válido
    if (letras.charAt(numero % 23) === letra.toUpperCase()) {
      return true;
    } else {
      return false;
    }
  }

    //Esta función devuelve un array con los DNI que sean válidos
  function obtenerDNIValidos(usuarios) {
    //Primero se usa filter para obtener un array con los usuarios que tengan un DNI válido
    //Después se usa map para obtener un array con los DNI de los usuarios
    const DNIsValidos = usuarios
      .filter((usuario) => esDNIValido(usuario.DNI))
      .map((usuario) => usuario.DNI);

    return DNIsValidos;
  }

  // Apartado c

  //Esta función devuelve un array con los objetos ordenados por edad de mayor a menor
  function ordenarPorEdad(personas) {
    //Se usa sort para ordenar el array de mayor a menor
    return personas.sort((persona1, persona2) => persona2.edad - persona1.edad);
  }

  // Apartado d

  //Esta función comprueba si un número es casi primo
  function esCasiPrimo(numero) {
    //Si el número es menor o igual que 1 no es primo
    if (numero <= 1) {
      return false;
    }
    //Esta variable se usa para contar los divisores del número
    let divisores = 0;

    //Este for se usa para comprobar si el número es primo, si es primo divisores será igual a 1
    for (let i = 2; i < numero; i++) {
      if (numero % i === 0) {
        divisores++;
      }
        //Si el número tiene más de un divisor no es primo
      if (divisores > 1) {
        return false;
      }
    }

    return divisores === 1;
  }

  //Esta función devuelve un array con las edades casi primas
  //Primero se usa map para obtener un array con las edades de las personas
  //Después se usa filter para obtener un array con las edades casi primas
  function edadesCasiPrimas(personas) {
    const edadesCasiPrimas = personas
      .map((persona) => persona.edad)
      .filter((edad) => esCasiPrimo(edad));

    return edadesCasiPrimas;
  }

  console.log(obtenerIdentificadores(personas));
  console.log(obtenerDNIValidos(personas));
  console.log(ordenarPorEdad(personas));
  console.log(edadesCasiPrimas(personas));
}
