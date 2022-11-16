import { DashboardCommums } from 'src/app/constants/dashboardCommums';
import { IComponenteUser, IDepartamento, ISpinnerEvent, } from './../interface/comum';
import { IUserData, } from 'src/app/interface/comum';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { UsuariosService } from './API/usuarios.service';
import { MetricasService } from './API/metricas.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  @Output() chartStateEmitter = new EventEmitter<boolean>();
  @Output() datesEmitter = new EventEmitter<{ dataInicio: string, dataFim: string }>();
  @Output() spinnerStateEmitter = new EventEmitter<ISpinnerEvent>();
  @Output() buscarEvent = new EventEmitter<{chartRealTime: boolean, card: string}>();
  @Output() chartTypeEmitter = new EventEmitter<string>();

  constructor(
    private usuariosService: UsuariosService,
    private metricasService: MetricasService,
    private dashConstants: DashboardCommums
  ) { }

  pegarHorarioAtual(): string {
    return new Date().toLocaleTimeString();;
  }

  pegarDataHoje(formato: 'br' | 'us'): string {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    if (formato == 'br') {
      return dd + '/' + mm + '/' + yyyy;
    } else {
      return yyyy + '-' + mm + '-' + dd;
    }
  }

  converterDate(date: string): string {
    // 2022-10-09

    let splittedDate = date.split('-');
    let dd = splittedDate[2];
    let mm = splittedDate[1];
    let yyyy = splittedDate[0];

    return `${dd}/${mm}/${yyyy}`
  }

  async getUsersData(): Promise<IUserData[]> {
    const dadosFuncionarios = await this.usuariosService.getDadosFuncionarios();

    return await Promise.all(dadosFuncionarios.map(async dado => {
      let HDDs: IComponenteUser[] = [];
      let CPU: IComponenteUser;
      let RAM: IComponenteUser;

      const dadosComponentes = await this.metricasService.getDadosComponentes(dado.idComputador)

      dadosComponentes.map(componente => {
        let dadoComponente: IComponenteUser = {
          idComponente: componente.idComponente,
          alertaCriticoUso: componente.alertaCriticoUso
        }

        switch (componente.nomeComponente) {
          case 'HDD':
            HDDs.push(dadoComponente)
            break;
          case 'CPU':
            dadoComponente.alertaCriticoTemperatura = componente.alertaCriticoTemperatura;
            CPU = dadoComponente
            break;
          case 'RAM':
            RAM = dadoComponente
            break;
        }


      });

      for (let HDD of HDDs) {
        return {
          registro: dado.registro,
          nomeFuncionario: dado.nomeFuncionario,
          usuario: dado.usuario,
          email: dado.email,
          funcao: dado.funcao,
          telefone: dado.telefone,
          nomeDepartamento: dado.nomeDepartamento,
          idComputador: dado.idComputador,
          CPU: CPU,
          RAM: RAM,
          HDD: HDD,
        };
      }
    }))
  }

  async getDepartamentos(): Promise<IDepartamento[]> {
    const nomeDepartamentos = await this.usuariosService.getNomeDepartamentosComFuncionarios();

    let lista = nomeDepartamentos.map((obj, index) => {
      return {
        nome: obj.nomeDepartamento,
        cor: this.dashConstants.colors[index],
        checked: false
      }
    })
    return lista
  }
}
