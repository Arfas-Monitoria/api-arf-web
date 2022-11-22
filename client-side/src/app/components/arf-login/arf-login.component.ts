import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/API/usuarios.service';

@Component({
  selector: 'app-arf-login',
  templateUrl: './arf-login.component.html',
  styleUrls: ['./arf-login.component.scss',],
})
export class ArfLoginComponent implements OnInit {
  email: string;
  senha: string;
  error: string;
  dadosFunc: string[];
  constructor(private usuario: UsuariosService, private route: Router) { }

  ngOnInit(): void{
  }

  autenticar(){
    let key1 = 'id';
    let key2 = 'Nome';
    let key3 ='Email';
    this.error = ' '
    if(this.email == undefined && this.senha == undefined ||this.email.indexOf('@') == -1){
      this.error = `Preencha todos os campos`
    } else{
      this.usuario.autenticar({
        email: this.email,
        senha: this.senha
      }).then((response) => {
        const res = response[0];

        this.route.navigate(['/oversight/dashboard'])
        sessionStorage.setItem('idUsuario', res.idFuncionario);
        sessionStorage.setItem('nomeFuncionario', res.nomeFuncionario);
        sessionStorage.setItem('profileImgPath', res.profileImgPath);
      }).catch(err => {

        this.error = `Usuário e/ou senha inválidos!`
      })
    }
  }
}
