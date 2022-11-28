import { IPayloadPutDadosMaquina } from './../../../interface/metricas';
import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { IResponseGetDadosMaquinas } from 'src/app/interface/metricas';
import { MetricasService } from 'src/app/services/API/metricas.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { IResponseGetAllFuncionariosAtivos } from 'src/app/interface/usuarios';
import { UsuariosService } from 'src/app/services/API/usuarios.service';

@Component({
  selector: 'arf-infra',
  templateUrl: './arf-infra.component.html',
  styleUrls: ['./arf-infra.component.scss']
})
export class ArfInfraComponent implements OnInit {

  constructor(
    private dashServices: DashboardService,
    private metricasServices: MetricasService,
    private usuariosServices: UsuariosService
  ) { }

  @ViewChildren('portadorRef') portadorRef: ElementRef
  dadosMaquinas: IResponseGetDadosMaquinas[]
  dadosMaquinasClone: IResponseGetDadosMaquinas[]
  maquinasModificadas: IResponseGetDadosMaquinas[]

  dadosFuncionarios: IResponseGetAllFuncionariosAtivos[]
  abrirModal = false;


  async ngOnInit() {
    this.dadosMaquinas = (await this.metricasServices.getDadosMaquinas()).
      sort((a, b) => (a.nomeFuncionario || 'zzzz').localeCompare((b.nomeFuncionario || 'zzzz')));

    this.dadosMaquinasClone = JSON.parse(JSON.stringify(this.dadosMaquinas));

    this.dadosFuncionarios = (await this.usuariosServices.getAllFuncionariosAtivos()).
      sort((a, b) => (a.nomeFuncionario).localeCompare((b.nomeFuncionario)));

    this.dashServices.spinnerStateEmitter.emit({ card: 'infra', state: false });
  }

  updateValues(idComputador: string, usuario: string, status: string, dtEntrega: string, dtDevolucao: string) {
    const dadosPC = this.dadosMaquinasClone.find(dado => dado.idComputador == idComputador);
    const dadosUser = this.dadosFuncionarios.find(dado => dado.usuario == usuario);

    // Deixa os selects na primeira opção
    this.portadorRef['_results'].map((ref: ElementRef) => {
      ref.nativeElement.selectedIndex = 0
    });

    dadosPC.idFuncionario = dadosUser?.idFuncionario || null
    dadosPC.nomeFuncionario = dadosUser?.nomeFuncionario || null
    dadosPC.usuario = dadosUser?.usuario || null
    dadosPC.statusComputador = status;
    dadosPC.dtEntrega = dtEntrega || null;
    dadosPC.dtDevolucao = dtDevolucao || null;

    this.checkButtons()
  }

  checkButtons() {
    let houveMudanca = false;
    this.maquinasModificadas = []

    this.dadosMaquinas.map((data, index) => {
      const mudouPortador = this.dadosMaquinasClone[index].usuario != data.usuario;
      const mudouDtEntrega = this.dadosMaquinasClone[index].dtEntrega != data.dtEntrega;
      const mudouDtDevolucao = this.dadosMaquinasClone[index].dtDevolucao != data.dtDevolucao;
      const mudouStatus = this.dadosMaquinasClone[index].statusComputador != data.statusComputador;

      if (mudouPortador || mudouDtEntrega || mudouDtDevolucao || mudouStatus) {
        houveMudanca = true
        this.maquinasModificadas.push(this.dadosMaquinasClone[index])

        document.getElementById('row' + index)['style'].backgroundColor = '#c4dbe5'

      } else {
        if (index % 2 == 0) {
          document.getElementById('row' + index)['style'].backgroundColor = "rgba(128, 128, 128, 0.5)"
        } else {
          document.getElementById('row' + index)['style'].backgroundColor = "#fff"
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

  resetChanges() {
    this.dadosMaquinasClone = JSON.parse(JSON.stringify(this.dadosMaquinas))

    this.checkButtons();
  }

  async applyChanges() {
    this.dashServices.spinnerStateEmitter.emit({ card: 'infra', state: true });

    await Promise.all(this.maquinasModificadas.map(async dado => {
      const payload: IPayloadPutDadosMaquina = {
        idFuncionario: dado.idFuncionario || null,
        idPC: dado.idComputador,
        statusPC: dado.statusComputador,
        dtEntrega: dado.dtEntrega || null,
        dtDevolucao: dado.dtDevolucao || null
      }

      const response = await this.metricasServices.putDadosMaquina(payload);
    }))

    this.dadosMaquinas = (await this.metricasServices.getDadosMaquinas()).
      sort((a, b) => (a.nomeFuncionario || 'zzzz').localeCompare((b.nomeFuncionario || 'zzzz')));

    this.dadosMaquinasClone = JSON.parse(JSON.stringify(this.dadosMaquinas));

    this.dashServices.spinnerStateEmitter.emit({ card: 'infra', state: false });

    this.abrirModal = true;

    setTimeout(() => {
      this.checkButtons()
    }, 200);
  }
}
