import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/API/usuarios.service';

@Component({
  selector: 'app-arf-cadastro',
  templateUrl: './arf-cadastro.component.html',
  styleUrls: ['./arf-cadastro.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ArfCadastroComponent implements OnInit {
  nome: string;
  email: string;
  telefone: string;
  funcao: string;
  senha: string
  confirmSenha: string;
  errorNome: string;
  departamento: string;
  departamentos: string[];
  ID: number;
  constructor(private usuario: UsuariosService, private rota: Router) { }

  async ngOnInit(){
    this.departamentos = (await this.usuario.getNomeDepartamentosComFuncionarios()).map(item => item.nomeDepartamento)
  }

  cadastro(){
    this.usuario.cadastrar({
      nome: this.nome,
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
