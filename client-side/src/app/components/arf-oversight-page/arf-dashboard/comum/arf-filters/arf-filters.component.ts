import { SimuladorService } from 'src/app/services/simulador.service';
import { DashboardCommums } from '../../../../../constants/dashboardCommums';
import {
  Component,
  OnInit,
  Input,
  ViewChildren,
  EventEmitter,
  Output,
  ElementRef,
} from '@angular/core';
import { UsuariosService } from 'src/app/services/API/usuarios.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { IDadosFiltro, IDepartamento } from 'src/app/interface/comum'

@Component({
  selector: 'arf-filters',
  templateUrl: './arf-filters.component.html',
  styleUrls: ['./arf-filters.component.scss'],
})
export class ArfFiltersComponent implements OnInit {
  constructor(
    private dashServices: DashboardService,
    private dashConstants: DashboardCommums,
  ) { }

  @Output() atualizarFiltros = new EventEmitter<IDadosFiltro>();
  @Input() card: 'lista' | 'chart';
  @Input() isCPU = false;
  @ViewChildren('checkboxesDep') checkboxesDep: ElementRef[];
  @ViewChildren('checkboxesComp') checkboxesComp: ElementRef[];

  componentes = {
    cpu: { nome: 'CPU', checked: true },
    ram: { nome: 'RAM', checked: true },
    hdd: { nome: 'HDD', checked: true }
  }

  objectKeys = Object.keys;
  metrica = "uso_relativo";
  date = this.dashServices.pegarDataHoje('us');
  pesquisa: string;

  showChkDepartamentos = false
  showChkComponentes = false
  departamentos: IDepartamento[];
  departamentosSelecionados: IDepartamento[];

  chkClass = "fa-solid fa-square-check"
  notChkClass = "fa-regular fa-square"


  ngOnInit(): void {
    this.departamentos = this.dashConstants.departamentos;
  }

  ngAfterViewInit(): void {
    this.enviarDadosFiltros();
  }

  // Mostra/esconde o select dos departamentos
  toggleSelect(checkbox: string) {
    if (checkbox == 'componentes') {
      this.showChkComponentes = !this.showChkComponentes
    } else {
      this.showChkDepartamentos = !this.showChkDepartamentos
    }
  }

  // Envia os dados atualizados aos outros componentes
  enviarDadosFiltros() {
    this.filtrarSelects();

    // Pega somente os selecionados
    this.departamentosSelecionados = this.departamentos.filter(dep => dep.checked);

    // envia o valor dos filtros para os componentes
    this.atualizarFiltros.emit({
      card: this.card,
      departamentosSelecionados: this.departamentosSelecionados,
      componentesSelecionados: this.componentes,
      departamentos: this.departamentos,
      metrica: this.metrica ? this.metrica : null,
      date: this.date,
      pesquisa: this.pesquisa ? this.pesquisa : null,
    });

    console.log("emitido")
  }

  // Filtra o estado dos departamentos de acordo com o estado dos checkboxes (famosa gambeta)
  filtrarSelects() {
    this.departamentos.map((dep, index) => {
      if (this.checkboxesDep['_results'][index].nativeElement.className == this.chkClass) {
        dep.checked = true
      } else {
        dep.checked = false
      }
    })

    let i = 0;

    for (const prop in this.componentes) {
      if (this.checkboxesComp['_results'][i].nativeElement.className == this.chkClass) {
        this.componentes[prop].checked = true;
      } else {
        this.componentes[prop].checked = false;
      }
      i++
    }
  }

  filtrarLista(chkBoxId: string, card: string) {
    if (card == this.card) {
      // Pega o checkbox clicado
      let chkBoxRef = document.getElementById(`${chkBoxId}`);

      // Pega o estado do checkbox (checado ou não)
      let isChecked = chkBoxRef.className == this.chkClass;

      // Troca o estado do checkbox
      document.getElementById(`${chkBoxId}`).className = isChecked ? this.notChkClass : this.chkClass;

      this.enviarDadosFiltros();
    }
  }
}