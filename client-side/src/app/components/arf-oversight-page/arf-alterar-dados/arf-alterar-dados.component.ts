import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/API/usuarios.service';

@Component({
  selector: 'app-arf-alterar-dados',
  templateUrl: './arf-alterar-dados.component.html',
  styleUrls: ['./arf-alterar-dados.component.scss']
})
export class ArfAlterarDadosComponent implements OnInit {
  error: string = '';
  pass: string = '';
  password: string;
  confirmPassword: string;
  tel: string;
  id: string = sessionStorage.getItem('idUsuario')
  atualTel: string = sessionStorage.getItem('telefone')
  img: any; // Tipei apenas para não dar erro!!!

  constructor(private usuario: UsuariosService) { }

  async ngOnInit() {

  }
  alterarDados() {
    this.error = '';
    this.pass = '';
    if (this.password != undefined && this.confirmPassword != undefined && this.tel != undefined) {
      if (this.tel.length == 11) {
        if (this.password == this.confirmPassword) {
          this.usuario.alterarDados({
            idFuncionario: this.id,
            senha: this.password,
            telefone: this.tel
          }).subscribe({
            next: (response) => {
              this.pass = 'Dados alterados com sucesso!'
            },
            error: (error) => {
              this.error = 'Erro ao alterar os dados!'
            }
          })
        } else {
          this.error = 'As senhas precisam ser identicas!'
        }
      } else {
        this.error = 'O Telefone está incorreto!'
      }
    }else {
      this.error = 'Preencha todos os campos!'
    }
  }
}


