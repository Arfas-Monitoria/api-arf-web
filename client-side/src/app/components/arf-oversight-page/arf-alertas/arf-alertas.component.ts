import { compData } from './../../../interface/comum';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from 'src/app/services/API/usuarios.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { MetricasService } from 'src/app/services/API/metricas.service';
@Component({
  selector: 'arf-alertas',
  templateUrl: './arf-alertas.component.html',
  styleUrls: ['./arf-alertas.component.scss']
})
export class ArfAlertasComponent implements OnInit {
  constructor(
    private userService: UsuariosService,
    private dashService: DashboardService,
    private metricasService: MetricasService
  ) { }

  stringfy = (data) => JSON.stringify(data);
  parse = (data) => JSON.parse(data);

  @ViewChild('ref') ref: ElementRef;

  inputsData: { nome: string, label: string, ref: string }[] = [
    {
      nome: 'cpu',
      label: 'Temp. Crítica',
      ref: 'cpu_temp_ref'
    },
    {
      nome: 'cpu',
      label: 'Uso Crítico',
      ref: 'cpu_uso_ref'
    },
    {
      nome: 'ram',
      label: 'Uso Crítico',
      ref: 'ram_uso_ref'
    },
    {
      nome: 'hdd',
      label: 'Uso Crítico',
      ref: 'hdd_uso_ref'
    },
  ]
  compData: compData[] = [];
  compDataClone: compData[] = [];
  alertasModificados: compData[] = []

  async ngOnInit() {
    this.dashService.spinnerStateEmitter.emit({ card: 'alertas', state: true });
    await this.refreshValues();

    this.compDataClone = JSON.parse(JSON.stringify(this.compData))
    this.dashService.spinnerStateEmitter.emit({ card: 'alertas', state: false });
  }

  async refreshValues() {
    this.compData = []

    return this.userService.getDadosFuncionarios().then(async (response) => {
      await Promise.all(response.map(async (userData) => {
        let compObjData: compData = {
          nomeFuncionario: userData.nomeFuncionario,
          usuario: userData.usuario,
          idPC: userData.idComputador,
          marca: userData.marca,
          modelo: userData.modelo,
          idDispositivo: userData.idDispositivo,
          cpu: {
            alertaCriticoTempCPU: 0,
            alertaCriticoUsoCPU: 0,
            idComponente: ''
          },
          ram: {
            alertaCriticoUsoRAM: 0,
            idComponente: ''
          },
          alertasHDDs: [],
        };
        let index = 0;

        const dadosComponentes = await this.metricasService.getDadosComponentes(userData.idComputador)

        dadosComponentes.map(comp => {
          switch (comp.nomeComponente) {
            case 'CPU':
              compObjData.cpu.alertaCriticoTempCPU = comp.alertaCriticoTemperatura;
              compObjData.cpu.alertaCriticoUsoCPU = comp.alertaCriticoUso;
              compObjData.cpu.idComponente = comp.idComponente;
              break;
            case 'RAM':
              compObjData.ram.alertaCriticoUsoRAM = comp.alertaCriticoUso;
              compObjData.ram.idComponente = comp.idComponente;
              break;
            case 'HDD':
              index++;
              compObjData.alertasHDDs.push(
                {
                  nome: comp.nomeComponente + ' ' + index,
                  alertaCriticoUsoHDD: comp.alertaCriticoUso,
                  idComponente: comp.idComponente
                }
              );
              break;
          }
        })

        this.compData.push(compObjData)
      }))

      this.compData.sort((a, b) => (a.nomeFuncionario).localeCompare((b.nomeFuncionario)))

      return new Promise((resolve) => resolve(null));
    })
  }

  updateValues(idComponente: string, nomeComp: 'ram' | 'cpu', metrica: 'uso' | 'temp', value: string) {
    const comp = this.compDataClone.
      find(compData => compData[nomeComp].idComponente == idComponente)

    switch (nomeComp) {
      case 'cpu':
        if (metrica == 'temp') {
          comp.cpu.alertaCriticoTempCPU = Number(value)
        } else {
          comp.cpu.alertaCriticoUsoCPU = Number(value)
        }
        break;
      case 'ram':
        comp.ram.alertaCriticoUsoRAM = Number(value)
    }

    this.checkButtons()
  }

  // Muda o estado dos botões
  // idComponente: string, nomeComp: string
  checkButtons() {
    let houveMudanca = false;
    this.alertasModificados = []

    this.compData.map((data, index) => {
      for (let outerKey in data) {
        // Iteração somente nos itens do componente
        if (outerKey == 'ram' || outerKey == 'cpu' || outerKey == 'alertasHDDs') {

          // For nas keys dos componentes
          for (let innerKey in data[outerKey]) {
            let isChanged: boolean;

            if (outerKey == 'alertasHDDs') {
              isChanged = Number(this.compDataClone[index][outerKey][innerKey].alertaCriticoUsoHDD) !=
                Number(this.compData[index][outerKey][innerKey].alertaCriticoUsoHDD)
            } else {
              isChanged = Number(this.compData[index][outerKey][innerKey]) !=
                Number(this.compDataClone[index][outerKey][innerKey])
              console.log(isChanged)
            }

            // Somente para os alertas e Se houver alguma mudança nos alertas
            if ((innerKey.includes('alerta') || outerKey == 'alertasHDDs') && isChanged) {
              houveMudanca = true
              this.alertasModificados.push(this.compDataClone[index])

              document.getElementById('row' + index)['style'].backgroundColor = '#c4dbe5'

              return
            } else if (innerKey.includes('alerta')) {
              if (index % 2 == 0) {
                document.getElementById('row' + index)['style'].backgroundColor = "#fff"
              } else {
                document.getElementById('row' + index)['style'].backgroundColor = "rgba(128, 128, 128, 0.5)"
              }
            }
          }
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

  changeHDDvalue
    (value: string, idHDD: string) {
    const compDataRef = this.compDataClone.
      find(compData => compData.alertasHDDs.
        find(hdd => hdd.idComponente == idHDD))

    compDataRef.alertasHDDs.find(hdd => hdd.idComponente == idHDD).alertaCriticoUsoHDD = Number(value)

    this.checkButtons()
  }

  changeInputValue(inputRef: HTMLInputElement, selectRef: HTMLSelectElement) {
    const hddValue = JSON.parse(selectRef.value).alertaCriticoUsoHDD;

    inputRef.value = hddValue
  }

  async applyChanges() {
    this.dashService.spinnerStateEmitter.emit({ card: 'alertas', state: true });

    this.alertasModificados.map(async data => {
      // CPU
      let payload = {
        idComponente: data.cpu.idComponente,
        alertaCriticoUso: data.cpu.alertaCriticoUsoCPU,
        alertaCriticoTemp: data.cpu.alertaCriticoTempCPU,
      }
      await this.metricasService.putAlertaCritico(payload);

      // RAM
      payload = {
        idComponente: data.ram.idComponente,
        alertaCriticoUso: data.ram.alertaCriticoUsoRAM,
        alertaCriticoTemp: null
      }
      await this.metricasService.putAlertaCritico(payload);

      await Promise.all(data.alertasHDDs.map(async hdd => {
        // HDD
        payload = {
          idComponente: hdd.idComponente,
          alertaCriticoUso: hdd.alertaCriticoUsoHDD,
          alertaCriticoTemp: null
        }

        await this.metricasService.putAlertaCritico(payload);
      }))

      await this.refreshValues();
      this.dashService.spinnerStateEmitter.emit({ card: 'alertas', state: false });

      setTimeout(() => {
        this.checkButtons()
      }, 100);
    })
  }

  resetChanges() {
    // let compDataRef: compData = JSON.parse(JSON.stringify(this.compData.find(comp => comp.idPC == idPC)))
    // let compDataCloneRef = this.compDataClone.find(comp => comp.idPC == idPC)

    // compDataCloneRef.cpu.alertaCriticoTempCPU = compDataRef.cpu.alertaCriticoTempCPU
    // compDataCloneRef.cpu.alertaCriticoUsoCPU = compDataRef.cpu.alertaCriticoUsoCPU
    // compDataCloneRef.ram.alertaCriticoUsoRAM = compDataRef.ram.alertaCriticoUsoRAM

    // compDataRef.alertasHDDs.map((hdd, index) => {
    //   compDataCloneRef.alertasHDDs[index].alertaCriticoUsoHDD = hdd.alertaCriticoUsoHDD;
    // })

    this.compDataClone = JSON.parse(JSON.stringify(this.compData))

    this.checkButtons();
  }

  // zerar(idPC: string) {
  //   let compDataRef: compData = JSON.parse(JSON.stringify(this.compData.find(comp => comp.idPC == idPC)))
  //   let compDataCloneRef = this.compDataClone.find(comp => comp.idPC == idPC)

  //   compDataCloneRef.cpu.alertaCriticoTempCPU = null
  //   compDataCloneRef.cpu.alertaCriticoUsoCPU = null
  //   compDataCloneRef.ram.alertaCriticoUsoRAM = null

  //   compDataRef.alertasHDDs.map((hdd, index) => {
  //     compDataCloneRef.alertasHDDs[index].alertaCriticoUsoHDD = null;
  //   })

  //   this.checkButtons();
  // }
}
