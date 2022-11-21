import { identifierName } from '@angular/compiler';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { IDepartamentoCadastro } from 'src/app/interface/comum';
import { UsuariosService } from 'src/app/services/API/usuarios.service';

@Component({
  selector: 'app-arf-cadastro',
  templateUrl: './arf-cadastro.component.html',
  styleUrls: ['./arf-cadastro.component.scss'],
})
export class ArfCadastroComponent implements OnInit {
  nome: string;
  user: string;
  email: string;
  telefone: string;
  funcao: string;
  senha: string
  confirmSenha: string;
  errorNome: string;
  departamentos: IDepartamentoCadastro[];
  departamento: number;
  
  constructor(private usuario: UsuariosService, private rota: Router) { }

  async ngOnInit(){
     const response = (await this.usuario.getDepartamentos())
     this.departamentos = response.map<IDepartamentoCadastro>(item => {
      return {
        id: item.idDepartamento,
        nome: item.nomeDepartamento
      }
     })
   
  }
  cadastro(){
    console.log(this.departamento);
    this.usuario.cadastrar({
      nome: this.nome,
      usuario: this.user,
      email: this.email,
      telefone: this.telefone,
      funcao: this.funcao,
      departamento: this.departamento,
      senha: this.senha
    }).subscribe({
      next: (response) => {
        this.rota.navigate(['/login'])
      }
    })
  }
}
