import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { Usuarios2 } from '../apps/interfaces/usuarios';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
export interface ExampleTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit{
  

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService

  ) {}

  

  editarForm = new FormGroup({
    id_usuario: new FormControl(''),
    usuario: new FormControl(''),
    correo: new FormControl('')
  });

  ngOnInit(): void {
    let usuarioid = this.activatedRoute.snapshot.paramMap.get('id');
    this.authService.getOne(usuarioid).subscribe(data => {
      //  this.datosProducto = data[0];
      console.log(data)
      this.editarForm.setValue({
        'usuario': data.usuario,
        'correo': data.correo,
        'id_usuario': data.id_usuario
      });
      console.log(this.editarForm.value);

    })
  }

  postForm(form: Usuarios2) {
    console.log(form);
    this.authService.putUsuarios(form).subscribe(data => {
      console.log(data);
      window.location.reload();
    })

  }

}