import { compData } from './../../../interface/comum';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from 'src/app/services/API/usuarios.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { MetricasService } from 'src/app/services/API/metricas.service';
import { stringify } from 'uuid';
import { ThisReceiver } from '@angular/compiler';

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

  columns = ['Usuário', 'ID-PC', 'Marca', 'Modelo', 'CPU', 'RAM', 'HDD', 'Ações']
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
          usuario: userData.nomeFuncionario,
          idPC: userData.idComputador,
          marca: userData.marca,
          modelo: userData.modelo,
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

      this.compData.sort((a, b) => Number(b.idPC) - Number(a.idPC))

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
          console.log(comp.cpu.alertaCriticoTempCPU)
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
    this.compData.map((data, index) => {
      console.log(data)
      console.log('btnReset' + data.idPC)
      console.log(document.getElementById('btnReset' + data.idPC))

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
            }

            // Somente para os alertas e Se houver alguma mudança nos alertas
            if ((innerKey.includes('alerta') || outerKey == 'alertasHDDs') && isChanged) {
              document.getElementById('btnApply' + data.idPC)['disabled'] = false
              document.getElementById('btnReset' + data.idPC)['disabled'] = false

              return
            } else if (innerKey.includes('alerta')) {
              document.getElementById('btnApply' + data.idPC)['disabled'] = true
              document.getElementById('btnReset' + data.idPC)['disabled'] = true
            }
          }
        }
      }
    })
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

  async applyChanges
    (idPC: string, tempCPUref: HTMLInputElement, usoCPUref: HTMLInputElement,
      usoRAMref: HTMLInputElement) {
    const comp = this.compDataClone.find(comp => comp.idPC == idPC)

    this.dashService.spinnerStateEmitter.emit({ card: 'alertas', state: true });

    // CPU
    let payload = {
      idComponente: comp.cpu.idComponente,
      alertaCriticoUso: Number(usoCPUref.value),
      alertaCriticoTemp: Number(tempCPUref.value),
    }
    await this.metricasService.putAlertaCritico(payload);

    // RAM
    payload = {
      idComponente: comp.ram.idComponente,
      alertaCriticoUso: Number(usoRAMref.value),
      alertaCriticoTemp: null
    }
    await this.metricasService.putAlertaCritico(payload);

    await Promise.all(comp.alertasHDDs.map(async hdd => {
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
  }

  resetChanges(idPC: string) {
    let compDataRef: compData = JSON.parse(JSON.stringify(this.compData.find(comp => comp.idPC == idPC)))
    let compDataCloneRef = this.compDataClone.find(comp => comp.idPC == idPC)

    compDataCloneRef.cpu.alertaCriticoTempCPU = compDataRef.cpu.alertaCriticoTempCPU
    compDataCloneRef.cpu.alertaCriticoUsoCPU = compDataRef.cpu.alertaCriticoUsoCPU
    compDataCloneRef.ram.alertaCriticoUsoRAM = compDataRef.ram.alertaCriticoUsoRAM

    compDataRef.alertasHDDs.map((hdd, index) => {
      compDataCloneRef.alertasHDDs[index].alertaCriticoUsoHDD = hdd.alertaCriticoUsoHDD;
    })

    this.checkButtons();
  }
}
