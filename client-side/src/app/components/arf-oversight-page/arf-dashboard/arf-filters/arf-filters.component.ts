import { DashboardCommums } from './../../../../constants/dashboardCommums';
import {
  Component,
  OnInit,
  Input,
  ViewChildren,
} from '@angular/core';
import { UsuariosService } from 'src/app/services/API/usuarios.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { IDepartamento } from 'src/app/interface/usuarios';

@Component({
  selector: 'arf-filters',
  templateUrl: './arf-filters.component.html',
  styleUrls: ['./arf-filters.component.scss'],
})
export class ArfFiltersComponent implements OnInit {
  constructor(
    private dashServices: DashboardService,
  ) { }

  @Input() componente: string;
  @ViewChildren('checkboxesI') checkboxes: HTMLElement[];

  exibicao: string = "grafica";
  metrica: string = "uso_relativo";
  date: string = this.dashServices.pegarDataHoje('us');
  pesquisa: string;

  mostrarCheckboxes: boolean = false;
  departamentos: IDepartamento[];

  chkClass = "fa-solid fa-square-check"
  notChkClass = "fa-regular fa-square"


  ngOnInit(): void {
    this.departamentos = this.dashServices.criarDepartamentos();
  }

  ngAfterViewInit(): void {
    this.enviarDadosFiltros();
  }

  // Mostra/esconde o select dos departamentos
  toggleSelect() {
    this.mostrarCheckboxes = !this.mostrarCheckboxes;
  }

  // Envia os dados atualizados aos outros componentes
  enviarDadosFiltros() {
    this.filtrarListaDepartamentos();

    // Pega somente os departamentos selecionados
    const departamentosSelecionados = this.departamentos.filter(dep => dep.checked);

    // envia o valor dos filtros para os componentes
    this.dashServices.atualizarFiltros.emit({
      exibicao: this.exibicao,
      departamentosSelecionados: departamentosSelecionados,
      departamentos: this.departamentos,
      metrica: this.metrica ? this.metrica : null,
      date: this.date,
      pesquisa: this.pesquisa ? this.pesquisa : null,
      componente: this.componente,
    });
  }

  filtrarDashboard(chkBoxId: string, componente: string) {
    if (!(componente == this.componente)) {
      console.warn("função filtrarDashboard é útil (excluir esse log)")
    }
    if (componente == this.componente) {
      // Pega o checkbox clicado
      let chkBoxRef = document.getElementById(`${chkBoxId}`);

      // Pega o estado do checkbox (checado ou não)
      let isChecked: boolean = chkBoxRef.className == this.chkClass;

      // Troca o estado do checkbox
      document.getElementById(`${chkBoxId}`).className = isChecked ? this.notChkClass : this.chkClass;

      this.enviarDadosFiltros();
    }
  }

  // Filtra o estado dos departamentos de acordo com o estado dos checkboxes (famosa gambeta)
  filtrarListaDepartamentos() {
    this.departamentos.map((dep, index) => {
      if (this.checkboxes['_results'][index].nativeElement.className == this.chkClass) {
        dep.checked = true
      } else {
        dep.checked = false
      }
    })
  }
}
