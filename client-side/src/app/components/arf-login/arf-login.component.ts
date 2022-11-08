import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/API/usuarios.service';

@Component({
  selector: 'app-arf-login',
  templateUrl: './arf-login.component.html',
  styleUrls: ['./arf-login.component.scss',],
  encapsulation: ViewEncapsulation.None,
})
export class ArfLoginComponent implements OnInit {
  email: string;
  senha: string;
  error: string;
  constructor(private usuario: UsuariosService, private route: Router) { }

  ngOnInit(): void{

  }

  autenticar(){
    this.error = ' '
    if(this.email == undefined && this.senha == undefined ||this.email.indexOf('@') == -1){
      this.error = `Preencha todos os campos`
    } else{
      this.usuario.autenticar({
        email: this.email,
        senha: this.senha
      }).subscribe({
        next: (response) => {
          this.route.navigate(['/oversight/dashboard'])
        },
        error: (response) => {
          this.error = `Usuário e/ou senha inválidos!`
        }
      });
    }
  }
}
