import { Component, Input, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = '';
  senha = '';

  constructor(private usuarioService: UsuariosService) {}

  ngOnInit(): void {}

  enviarForm() {
    const data = {
      email: this.email,
      senha: this.senha,
    };

    console.log(data);

    this.usuarioService.cadastrar(data).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
