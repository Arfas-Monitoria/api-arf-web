import { ArfTelaDeAcessosComponent } from './components/arf-tela-de-acessos/arf-tela-de-acessos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArfCadastroComponent } from './components/arf-cadastro/arf-cadastro.component';
import { ARFHomepageComponent } from './components/arf-homepage/arf-homepage.component';
import { ArfLoginComponent } from './components/arf-login/arf-login.component';
import { ArfOversightPageComponent } from './components/arf-oversight-page/arf-oversight-page.component';

const routes: Routes = [
  { path: '', component: ARFHomepageComponent },
  { path: 'login', component: ArfLoginComponent },
  { path: 'cadastro', component: ArfCadastroComponent },
  { path: 'oversight', component: ArfOversightPageComponent },
  { path: 'acessos', component: ArfTelaDeAcessosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
