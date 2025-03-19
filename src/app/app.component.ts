interface Usuario {
  cedula: number;
  nombre: string;
  password: string;
  tipoDeUsuario: string;
  POS: string;
  celular: string;
}
import { Component, HostListener } from '@angular/core';
import Swal from 'sweetalert2';
// services
import { UserSitarService } from './services/user-sitar.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public cedula!: number;
  public name: string = '';
  public type: string = '';
  public password: any;
  public POS: string = '';
  public celular: string = '';
  public cedulas: Usuario[] = [];
  public colorModeDark: boolean = false;

  constructor(private userSitarService: UserSitarService) { }
  cambiosPendientes: boolean = true; // Simula que hay cambios sin guardar

  // @HostListener('window:beforeunload', ['$event'])
  // onBeforeUnload(event: BeforeUnloadEvent): void {
  //   if (this.cambiosPendientes) {
  //     event.preventDefault();
  //     event.returnValue = ''; 
  //   }
  // }

  generate() {
    //validate campos empty
    if (this.cedula - length === 0 || this.name === '' || this.type === '' || this.POS === '' || this.celular === '') {
      Swal.fire({
        title: "Error",
        text: "Debe completar todos los campos",
        icon: "error",
        confirmButtonText: "Aceptar",
        timer: 10000
      });
      return;
    }

    //validate create spt
    if (this.type === 'SPT') {
      if (this.verication(this.type, this.cedula)) {
        Swal.fire({
          title: "Error",
          text: "Ya existe un usuario con ese tipo",
          icon: "error",
          confirmButtonText: "Aceptar",
          timer: 10000
        });
        return;
      }
      const arrayDeNumeros: number[] = Array.from(String(this.cedula), num => Number(num));
      this.password = this.userSitarService.generate(arrayDeNumeros, this.name, this.type);
      let passwordNotEspacio = this.password.replace(/\s+/g, '');
      this.cedulas.push({
        cedula: this.cedula,
        nombre: this.name.toUpperCase(),
        password: passwordNotEspacio,
        tipoDeUsuario: this.type,
        POS: this.POS.toUpperCase(),
        celular: this.celular
      });
      sessionStorage.setItem('cedulas', JSON.stringify(this.cedulas));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "password generada " + this.type,
        showConfirmButton: false,
        timer: 1500
      });
      this, this.type = ''
      return;
    }
    //validate create sitar
    if (this.type === 'SITAR') {
      if (this.verication(this.type, this.cedula)) {
        Swal.fire({
          title: "Error",
          text: "Ya existe un usuario con ese tipo",
          icon: "error",
          confirmButtonText: "Aceptar",
          timer: 10000
        });
        return;
      }
      const arrayDeNumeros: number[] = Array.from(String(this.cedula), num => Number(num));
      this.password = this.userSitarService.generate(arrayDeNumeros, this.name, this.type);
      let passwordNotEspacio = this.password.replace(/\s+/g, '');
      this.cedulas.push({
        cedula: this.cedula,
        nombre: this.name.toUpperCase(),
        password: passwordNotEspacio,
        tipoDeUsuario: this.type,
        POS: this.POS.toUpperCase(),
        celular: this.celular
      });
      sessionStorage.setItem('cedulas', JSON.stringify(this.cedulas));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "password generada " + this.type,
        showConfirmButton: false,
        timer: 1500
      });
      this, this.type = ''
      return;
    }
  }
//verification type type exist
  verication(tipo: string, cedula: number): boolean {
    return this.cedulas.some(usuario => usuario.tipoDeUsuario === tipo && usuario.cedula === cedula);
    // return this.cedulas.some(usuario => usuario.tipoDeUsuario === tipo);
  }

    // Función para copiar los datos al portapapeles
  copiarAlPortapapeles() {
    // Encabezado para las columnas (puedes ajustarlo según tus necesidades)
    let textoParaCopiar = 'CEDULA\tNOMBRE\tPASSWORD\tPOS\tCELULAR\tTIPO DE USUARIO\n';

    // Añadir cada fila de datos
    this.cedulas.forEach(cedula => {
      textoParaCopiar += `${cedula.cedula}\t${cedula.nombre}\t${cedula.password}\t${cedula.POS}\t${cedula.celular}\t${cedula.tipoDeUsuario}\n`;
    });

    // Usar la API del portapapeles para copiar
    if(this.cedulas.length === 0) {
      Swal.fire({
        title: "Error",
        text: "No hay ningún usuario generado",
        icon: "error",
        confirmButtonText: "Aceptar",
        timer: 2500,
      });
      return;
    }else{
      navigator.clipboard.writeText(textoParaCopiar).then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Datos copiados al portapapeles. " ,
          showConfirmButton: false,
          timer: 1500
        });
      }).catch(err => {
        Swal.fire({
          title: "Error",
          text: "Error al copiar al portapapeles: " + err,
          icon: "error",
          confirmButtonText: "Aceptar",
          timer: 10000
        });
        return;
      });
    }
  }

  //obtener datos de la session storage
  getData() {
    if(sessionStorage.getItem('cedulas') === null || sessionStorage.getItem('cedulas') === '[]'){
      Swal.fire({
        position: "center",
        icon: "error",
        title: "No hay datos guardados",
        showConfirmButton: false,
        timer: 1500
      });
    }else{
      
    this.cedulas = JSON.parse(sessionStorage.getItem('cedulas') || '[]');
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Datos recuperados",
      showConfirmButton: false,
      timer: 1500
    });
    }
  }

  //eliminar datos de la session storage
  deleteData() {
    if(sessionStorage.getItem('cedulas') === null || sessionStorage.getItem('cedulas') === '[]'){
      Swal.fire({
        position: "center",
        icon: "error",
        title: "No hay datos guardados",
        showConfirmButton: false,
        timer: 1500
      });
    }else{
      sessionStorage.removeItem('cedulas');
      this.cedulas = [];
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Datos eliminados",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  //cambiar modo de color
  cambiarModoColor() {
    if( this.colorModeDark === true){
      this.colorModeDark = false;
    }else{
      this.colorModeDark = true;
    }
  }

}
