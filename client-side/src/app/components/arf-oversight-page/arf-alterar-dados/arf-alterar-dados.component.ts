import { Component, OnInit } from '@angular/core';
import { IResponseGetPerfilFuncionarios } from 'src/app/interface/usuarios';
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
  telefone: string;
  // dadosFunc: IResponseGetPerfilFuncionarios[];
  img: any; // Tipei apenas para não dar erro!!!
  atualTel: string;

  constructor(private usuario: UsuariosService) { }

    ngOnInit(): void {
        
    }
  // async ngOnInit(){  !!!!!!!!!Comentado para futura referencia
  //   const response = (await this.usuario.getDadosFuncionarios())
  //    this.dadosFunc = response.map<IResponseGetPerfilFuncionarios>(item => {
  //     return {
  //         idFuncionario: null,
  //         nomeFuncionario: item.nomeFuncionario,
  //         usuario: item.usuario,
  //         email: null,
  //         funcao: null,
  //         telefone: item.telefone,
  //         nomeDepartamento: null,
  //         status: null,
  //         profileImgPath: null,
  //         acessoDashboard: null,
  //         fkDepartamento: null,
  //         idComputador: null
  //     }
  //    })
  //    this.atualTel = this.telefone;
  // }

}
