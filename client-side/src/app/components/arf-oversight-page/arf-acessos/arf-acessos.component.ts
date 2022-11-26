import { Component, OnInit } from '@angular/core';
import { IPayloadPutDadosFuncionario, IResponseGetDepartamentos, IResponseGetPerfilFuncionarios } from 'src/app/interface/usuarios';
import { UsuariosService } from 'src/app/services/API/usuarios.service';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-arf-acessos',
  templateUrl: './arf-acessos.component.html',
  styleUrls: ['./arf-acessos.component.scss']
})
export class ArfAcessosComponent implements OnInit {

  constructor(
    private dashServices: DashboardService,
    private userServices: UsuariosService
  ) { }

  dadosFuncionarios: IResponseGetPerfilFuncionarios[];
  dadosFuncionariosClone: IResponseGetPerfilFuncionarios[];
  funcionariosModificados: IResponseGetPerfilFuncionarios[];
  departamentos: IResponseGetDepartamentos[];


  async ngOnInit() {
    this.dashServices.spinnerStateEmitter.emit({ card: 'acessos', state: true });

    this.dadosFuncionarios = (await this.userServices.getAllFuncionarios()).
      sort((a, b) => (a.nomeFuncionario).localeCompare((b.nomeFuncionario)));

    this.dadosFuncionariosClone = JSON.parse(JSON.stringify(this.dadosFuncionarios))

    this.departamentos = await this.userServices.getDepartamentos();

    this.dashServices.spinnerStateEmitter.emit({ card: 'acessos', state: false });
  }

  checkValues
    (idFuncionario: string, departamento: string, funcao: string, isStatusAtivo: boolean, isAcessconceived: boolean) {
    const dadosFunc = this.dadosFuncionariosClone.find(dado => dado.idFuncionario == idFuncionario)
    const dadosDep = this.departamentos.find(dep => dep.nomeDepartamento == departamento)

    dadosFunc.fkDepartamento = dadosDep.idDepartamento
    dadosFunc.funcao = funcao
    dadosFunc.statusFuncionario = isStatusAtivo ? 'ativo' : 'desligado';

    if (funcao == 'outros' || !isStatusAtivo) {
      dadosFunc.acesso = 'negado'
    } else {
      dadosFunc.acesso = isAcessconceived ? 'concedido' : 'negado'
    }

    this.checkButtons()
  }

  checkButtons() {
    let houveMudanca = false;
    this.funcionariosModificados = []

    this.dadosFuncionarios.map((data, index) => {
      const mudouDepartamento = this.dadosFuncionariosClone[index].fkDepartamento != data.fkDepartamento;
      const mudouFuncao = this.dadosFuncionariosClone[index].funcao != data.funcao;
      const mudouStatus = this.dadosFuncionariosClone[index].statusFuncionario != data.statusFuncionario;
      const mudouAcesso = this.dadosFuncionariosClone[index].acesso != data.acesso;

      if (mudouDepartamento || mudouFuncao || mudouStatus || mudouAcesso) {
        houveMudanca = true
        this.funcionariosModificados.push(this.dadosFuncionariosClone[index])

        document.getElementById('row' + index)['style'].backgroundColor = '#c4dbe5'

      } else {
        if (index % 2 == 0) {
          document.getElementById('row' + index)['style'].backgroundColor = "#fff"
        } else {
          document.getElementById('row' + index)['style'].backgroundColor = "rgba(128, 128, 128, 0.5)"
        }
      }
    })

    if (houveMudanca) {
      document.getElementById('btnApply')['disabled'] = false
      document.getElementById('btnReset')['disabled'] = false

    } else {
      document.getElementById('btnApply')['disabled'] = true
      document.getElementById('btnReset')['disabled'] = true
    }
  }

  async applyChanges() {
    this.dashServices.spinnerStateEmitter.emit({ card: 'acessos', state: true });

    await Promise.all(this.funcionariosModificados.map(async dado => {
      const payload: IPayloadPutDadosFuncionario = {
        idFuncionario: dado.idFuncionario,
        fkDepartamento: dado.fkDepartamento,
        funcao: dado.funcao,
        statusFuncionario: dado.statusFuncionario,
        acesso: dado.acesso
      }

      await this.userServices.putDadosFuncionario(payload);
    }))

    this.dadosFuncionarios = (await this.userServices.getAllFuncionarios()).
      sort((a, b) => (a.nomeFuncionario).localeCompare((b.nomeFuncionario)));

    this.dadosFuncionariosClone = JSON.parse(JSON.stringify(this.dadosFuncionarios))

    this.dashServices.spinnerStateEmitter.emit({ card: 'acessos', state: false });

    setTimeout(() => {
      this.checkButtons()
    }, 200);
  }

  resetChanges() {
    this.dadosFuncionariosClone = JSON.parse(JSON.stringify(this.dadosFuncionarios))

    this.checkButtons();
  }
}
