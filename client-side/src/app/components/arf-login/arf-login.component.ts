import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  isLoading = false;

  constructor(private usuario: UsuariosService, private route: Router) { }

  ngOnInit(): void {
  }

  autenticar() {

    this.error = ' '
    if (this.email == undefined && this.senha == undefined || this.email.indexOf('@') == -1) {
      this.error = `Preencha todos os campos`
    } else {
      this.isLoading = true;

      setTimeout(() => {
        this.usuario.autenticar({
          email: this.email,
          senha: this.senha
        }).then((response) => {
          const res = response;

          if (!res.acesso || res.acesso != 'concedido') {
            alert('Acesso negado!')
            return
          }

          let pagina = '';

          switch (res.funcao) {
            case 'analista':
              this.route.navigate(['/oversight/dashboard'])
              pagina = 'dashboard'
              break;
            case 'infra':
              this.route.navigate(['/oversight/infra'])
              pagina = 'infra'
              break;
            case 'superintendente':
              this.route.navigate(['/oversight/acessos'])
              pagina = 'acessos'
          }

          sessionStorage.setItem('idUsuario', res.idFuncionario);
          sessionStorage.setItem('nomeFuncionario', res.nomeFuncionario);
          sessionStorage.setItem('profileImgPath', res.profileImgPath);
          sessionStorage.setItem('funcao', res.funcao);
          sessionStorage.setItem('pagina', pagina);
          sessionStorage.setItem('telefone', res.telefone);
        }).catch(err => {
          this.error = `Usuário e/ou senha inválidos!`
          console.error(err)
        }).finally(() => {
          this.isLoading = false;
        })
      }, 500);
    }
  }

}
