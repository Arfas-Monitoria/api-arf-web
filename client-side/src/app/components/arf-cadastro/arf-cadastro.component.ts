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
  ramal: string;
  senha: string;
  confirmSenha: string;
  errorNome: string;
  departamentos: string[]

  constructor(private usuario: UsuariosService, private rota: Router) { }

  async ngOnInit(){
    this.departamentos = (await this.usuario.getNomeDepartamentosComFuncionarios()).map(item => item.nomeDepartamento)
  }

  cadastro(){
    this.usuario.cadastrar({
      email: this.email,
      senha: this.senha
    }).subscribe({
      next: (response) => {
        this.rota.navigate(['/login'])
      }
    })
  }
}
