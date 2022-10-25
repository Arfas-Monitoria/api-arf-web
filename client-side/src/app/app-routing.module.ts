import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArfCadastroComponent } from './components/arf-cadastro/arf-cadastro.component';
import { ARFHomepageComponent } from './components/arf-homepage/arf-homepage.component';
import { ArfLoginComponent } from './components/arf-login/arf-login.component';
import { ArfAlertasComponent } from './components/arf-oversight-page/arf-alertas/arf-alertas.component';
import { ArfDashboardPageComponent } from './components/arf-oversight-page/arf-dashboard/arf-dashboard-page.component';
import { ArfEditarDadosComponent } from './components/arf-oversight-page/arf-editar-dados/arf-editar-dados.component';
import { ArfOversightPageComponent } from './components/arf-oversight-page/arf-oversight-page.component';

const routes: Routes = [
  { path: '', component: ARFHomepageComponent },
  { path: 'login', component: ArfLoginComponent },
  { path: 'cadastro', component: ArfCadastroComponent },
  {
    path: 'oversight', component: ArfOversightPageComponent,
    children: [
      { path: 'dashboard', component: ArfDashboardPageComponent },
      { path: 'alertas', component: ArfAlertasComponent },
      { path: 'editar-dados', component: ArfEditarDadosComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
