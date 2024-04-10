import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../interfaces/user.interface';
import { CreedentialsService } from '../../services/creedentials.service';
import { ReCaptcha2Component } from 'ngx-captcha';

const regexdui = /^[0-9]{8}-[0-9]$/;
const regexnit = /^[0-9]{4}-[0-9]{6}-[0-9]{3}-[0-9]$/;

@Component({
  selector: 'shared-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit{

  //* Parametro local donde se almacenaran los emails de los usuarios
  public getEmails: User[] = [];
  //* Listado de documentos para reestablecer contraseña
  documentList: string[] = ['DUI', 'NIT'];
  //* Documento seleccionado por el usuario que habilita opciones del input
  documentSeleted: string = "";

  //* Inicializando FormGroup para el Login
  protected mFormGroup: FormGroup = new FormGroup({});

  //* Inyeccion de Servicios
  constructor( 
    private formBuilder: FormBuilder,
    private creedentialService: CreedentialsService,
  ){}

  //* Codigo que se inicializa junto al componentes
  ngOnInit(): void {
    //? Se le asigna un valor por defecto para que el input no sea accesible desde el inicios
    this.documentSeleted = "DUI/NIT";

    //? Conjunto de componentes del FormGroup con validaciones y almacenamiento de datos del form
    //! Propiedades temporales para almacenar inputs del form Modal
    this.mFormGroup = this.formBuilder.group({
      userEmail: new FormControl('', [Validators.required, Validators.email]),
      documentDUI: new FormControl('', [Validators.pattern(regexdui), Validators.minLength(9), Validators.maxLength(10)]),
      documentNIT: new FormControl('', [Validators.pattern(regexnit), Validators.minLength(14), Validators.maxLength(17)])
    })

    //? Subscripcion al Observable para que mande la peticion a la API y obtener todos los usuarios almacenados
    
  }

  //* Controles del fomulario
  public formSubmitted: boolean = false;
  getUserEmail(): any{ return this.mFormGroup.get('userEmail'); }
  getDocumentDUI(): any{ return this.mFormGroup.get('documentDUI'); }
  getDocumentNIT(): any{ return this.mFormGroup.get('documentNIT'); }

  //* Funcion dinamica segun la seleccion del documento a ingresar al input
  onSelected(document: string){
    this.documentSeleted = document;
  }

  onSubmit():void{
    //! TEMPORAL (SOLO PARA EVALUAR STATUS DEL FORM)
    console.log('FORM: ',this.mFormGroup.status);
    console.log('EMAIL:',this.mFormGroup.get('userEmail')?.status);
    console.log('DUI:',this.mFormGroup.get('documentDUI')?.status);
    console.log('NIT:',this.mFormGroup.get('documentNIT')?.status);

    //? Codigo de busqueda y validacion de inputs del modal
    const {userEmail, documentDUI, documentNIT} = this.mFormGroup.value;
    this.formSubmitted = true;
    this.forgotPasswordInputValidation(userEmail, documentDUI, documentNIT);
  }

  //* Variable de validacion de credenciales y formulario
  public inputError: string = "";

  forgotPasswordInputValidation(userEmail:string, documentDUI?:string, documentNIT?: string){
    const emailAuth = this.getEmails.filter(_creedentials => userEmail == _creedentials.userEmail);
    let documentAuth;

    //? Filtrando segun DUI o NIT ingresado
    if(documentDUI !== ""){
      this.mFormGroup.get('documentDUI')?.setValidators(Validators.required);
      documentAuth = emailAuth.filter(_creedentials => documentDUI == _creedentials.documentDUI);
      console.log(documentAuth);
    }
    else if(documentNIT !== "" && documentDUI ==""){
      documentAuth = emailAuth.filter(_creedentials => documentNIT == _creedentials.documentNIT);
      console.log(documentAuth);
    }
    else{
      return documentAuth;
    }

    //? Validacion de datos proporcionados
    if(documentAuth.length == 1){
      this.formSubmitted = false;
      this.mFormGroup.reset();
      this.inputError = "VALID";
      return;
    }
    //? Invalidacion de datos proporcionados
    else{
      this.mFormGroup.reset();
      this.inputError = "INVALID";
      return console.log("Email o Documento de Identificacion Invalido");
    }
  }
}
