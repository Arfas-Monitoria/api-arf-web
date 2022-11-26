import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArfCadastroComponent } from './components/arf-cadastro/arf-cadastro.component';
import { ARFHomepageComponent } from './components/arf-homepage/arf-homepage.component';
import { ArfLoginComponent } from './components/arf-login/arf-login.component';
import { ArfAlterarDadosComponent } from './components/arf-oversight-page/arf-alterar-dados/arf-alterar-dados.component';
import { ArfAcessosComponent } from './components/arf-oversight-page/arf-acessos/arf-acessos.component';
import { ArfDashboardPageComponent } from './components/arf-oversight-page/arf-dashboard/arf-dashboard-page.component';
import { ArfInfraComponent } from './components/arf-oversight-page/arf-infra/arf-infra.component';
import { ArfOversightPageComponent } from './components/arf-oversight-page/arf-oversight-page.component';

const routes: Routes = [
  { path: '', component: ARFHomepageComponent },
  { path: 'login', component: ArfLoginComponent },
  { path: 'cadastro', component: ArfCadastroComponent },
  {
    path: 'oversight', component: ArfOversightPageComponent,
    children: [
      { path: 'dashboard', component: ArfDashboardPageComponent },
      { path: 'alterar-dados', component: ArfAlterarDadosComponent },
      { path: 'infra', component: ArfInfraComponent },
      { path: 'acessos', component: ArfAcessosComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
