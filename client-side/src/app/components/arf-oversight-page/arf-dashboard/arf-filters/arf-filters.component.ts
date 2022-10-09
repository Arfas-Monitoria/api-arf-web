import { SimuladorService } from 'src/app/services/simulador.service';
import { DashboardCommums } from './../../../../constants/dashboardCommums';
import {
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
  Input,
  ChangeDetectorRef,
  SimpleChanges,
} from '@angular/core';
import { UsuariosService } from 'src/app/services/API/usuarios.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { IDepartamento } from 'src/app/interface/comum'

@Component({
  selector: 'arf-filters',
  templateUrl: './arf-filters.component.html',
  styleUrls: ['./arf-filters.component.scss'],
})
export class ArfFiltersComponent implements OnInit {
  constructor(
    private dashServices: DashboardService,
    private usuariosAPI: UsuariosService,
    private dashConstants: DashboardCommums,
  ) { }

  @Input() componente: string;

  exibicao: string = "listada";
  metrica: string = "uso_relativo";
  date: string = this.dashServices.pegarDataHoje('us');
  pesquisa: string;

  mostrarCheckboxes: boolean = false;
  departamentos: IDepartamento[] = this.dashConstants.departamentos;
  departamentosSelecionados: IDepartamento[] = this.departamentos.filter(dep => dep.checked);


  ngOnInit(): void {
    // this.usuariosAPI.getDepartamentos().subscribe({
    //   next: (nomes) => {
    //     for (let nome of nomes) {
    //       this.departamentos.push({
    //         nome: nome,
    //         checked: false,
    //       });
    //     }
    //   },
    //   error(err) {
    //     console.log(err);
    //   },
    // });
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    // console.log("date filter: ", this.date)
  }

  ngAfterViewInit(): void {
    // console.log(this.date)
    this.enviarDadosFiltros();
  }

  toggleSelect() {
    this.mostrarCheckboxes = !this.mostrarCheckboxes;
  }

  enviarDadosFiltros() {
    this.departamentosSelecionados = this.departamentos.filter(dep => dep.checked);

    this.dashServices.atualizarFiltros.emit({
      exibicao: this.exibicao,
      departamentosSelecionados: this.departamentosSelecionados,
      metrica: this.metrica ? this.metrica : null,
      date: this.date,
      pesquisa: this.pesquisa ? this.pesquisa : null,
      componente: this.componente,
    }); // envia o valor dos filtros para os componentes

    // this.filtrarDashboard(); // filtra a dash logo em seguida
  }

  filtrarDashboard() {
    this.enviarDadosFiltros();
  }
}
