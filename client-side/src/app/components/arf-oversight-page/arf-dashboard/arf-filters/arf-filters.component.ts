import {
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
  Input,
} from '@angular/core';
import { UsuariosService } from 'src/app/services/API/usuarios.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import {IDepartamento} from 'src/app/interface/comum'

@Component({
  selector: 'arf-filters',
  templateUrl: './arf-filters.component.html',
  styleUrls: ['./arf-filters.component.scss'],
})
export class ArfFiltersComponent implements OnInit {
  @ViewChild('exibicaoSelect', { static: false }) exibicao: ElementRef;
  @ViewChild('metricaSelect', { static: false }) metrica: ElementRef;
  @ViewChild('dateInput', { static: false }) date: ElementRef;
  @ViewChild('pesquisaInput', { static: false }) pesquisa: ElementRef;

  @Input() componente: string;

  mostrarCheckboxes: boolean = false;
  departamentos: IDepartamento[] = [
    {
      nome: 'Infraestrutura',
      checked: true,
    },
    {
      nome: 'T.I.',
      checked: true,
    },
  ];
  departamentosSelecionados: IDepartamento[] = this.departamentos.filter(dep => dep.checked);

  constructor(
    private dashServices: DashboardService,
    private usuariosAPI: UsuariosService
  ) {}

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

  toggleSelect() {
    this.mostrarCheckboxes = !this.mostrarCheckboxes;
  }

  enviarDadosFiltros() {
    this.dashServices.atualizarFiltros.emit({
      exibicao: this.exibicao.nativeElement.value,
      departamentosSelecionados: this.departamentosSelecionados,
      metrica: this.metrica ? this.metrica.nativeElement.value : null,
      date: this.date ? this.date.nativeElement.value : null,
      pesquisa: this.pesquisa ? this.pesquisa.nativeElement.value: null,
      componente: this.componente,
    }); // envia o valor dos filtros para os componentes

    // this.filtrarDashboard(); // filtra a dash logo em seguida
  }

  filtrarDashboard() {
    this.enviarDadosFiltros();
    // console.log(this.exibicao.nativeElement.value);
    // console.log(this.departamentos[0].nome);
    // console.log(this.metrica.nativeElement.value);
    // console.log(this.date.nativeElement.value);
    // console.log(this.pesquisa.nativeElement.value);
  }
}
