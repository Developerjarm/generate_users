import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSitarService {

  private numberselected: number[] = [];
  private numberselectedsSecond: number[] = [];
  private partName: string[] = [];
  private characterSpecialseleted: string = '';
  constructor() { }

  generate(cedula:number[] = [], name:string, type:string) {
  //generate number first
  if (cedula.length >= 2) {
    let num1 = cedula[Math.floor(Math.random() * cedula.length)];
    let num2;
    do {
      num2 = cedula[Math.floor(Math.random() * cedula.length)];
    } while (num2 === num1);
    this.numberselected = [num1, num2];
  } 

  //generate name
  if (new Set(name).size >= 4) {
    const letrasSeleccionadas: string[] = [];
    while (letrasSeleccionadas.length < 4) {
      const letra = name[Math.floor(Math.random() * name.length)];
      if (!letrasSeleccionadas.includes(letra)) {
        letrasSeleccionadas.push(letra);
      }
    }
    this.partName = letrasSeleccionadas;
  }

  //generate number first
  if (cedula.length >= 2) {
    let num1 = cedula[Math.floor(Math.random() * cedula.length)];
    let num2;
    do {
      num2 = cedula[Math.floor(Math.random() * cedula.length)];
    } while (num2 === num1);
    this.numberselectedsSecond = [num1, num2];
  } 

//generate character special
  function seleccionarCaracterEspecialDeLista(lista: string[]): string {
    const indiceAleatorio = Math.floor(Math.random() * lista.length);
    return lista[indiceAleatorio];
  }
  const listaDeCaracteresEspeciales = [ '@', '#', '$', '%', '&', '*'];
  this.characterSpecialseleted = seleccionarCaracterEspecialDeLista(listaDeCaracteresEspeciales);

// return password
  return this.numberselected.join('') + this.partName.join('')+ this.characterSpecialseleted + this.numberselectedsSecond.join('');


  }
}
