import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/API/usuarios.service';

@Component({
  selector: 'app-arf-alterar-dados',
  templateUrl: './arf-alterar-dados.component.html',
  styleUrls: ['./arf-alterar-dados.component.scss']
})
export class ArfAlterarDadosComponent implements OnInit {
  error: string = '';
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
      this.usuario.alterarDados({
        idFuncionario: this.id,
        senha: this.password,
        telefone: this.tel
      }).subscribe({
        next: (response) => {
        }
      })}
    }

  
