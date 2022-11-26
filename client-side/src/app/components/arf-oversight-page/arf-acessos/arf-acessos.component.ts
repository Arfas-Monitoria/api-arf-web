import { Component, OnInit } from '@angular/core';
import { IResponseGetDepartamentos, IResponseGetPerfilFuncionarios } from 'src/app/interface/usuarios';
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
  departamentos: IResponseGetDepartamentos[];

  async ngOnInit() {
    this.dashServices.spinnerStateEmitter.emit({ card: 'acessos', state: true });

    this.dadosFuncionarios = (await this.userServices.getAllFuncionarios()).
      sort((a, b) => (a.nomeFuncionario).localeCompare((b.nomeFuncionario)));
    this.departamentos = await this.userServices.getDepartamentos();

    console.log(this.dadosFuncionarios)
    console.log(this.departamentos)

    this.dashServices.spinnerStateEmitter.emit({ card: 'acessos', state: false });
  }

  ngAfterViewInit(): void {

  }


}
