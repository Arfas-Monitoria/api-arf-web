import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { ARFHomepageComponent } from './components/arf-homepage/arf-homepage.component';
import { ARFHomeNavbarComponent } from './components/arf-homepage/arf-home-navbar/arf-home-navbar.component';
import { ARFHomeBannerComponent } from './components/arf-homepage/arf-home-banner/arf-home-banner.component';
import { ARFHomeSobreComponent } from './components/arf-homepage/arf-home-sobre/arf-home-sobre.component';
import { ARFHomeServicosComponent } from './components/arf-homepage/arf-home-servicos/arf-home-servicos.component';
import { ARFHomeDemoComponent } from './components/arf-homepage/arf-home-demo/arf-home-demo.component';
import { ARFHomeContatoComponent } from './components/arf-homepage/arf-home-contato/arf-home-contato.component';
import { ARFHomeFooterComponent } from './components/arf-homepage/arf-home-footer/arf-home-footer.component';
import { AppComponent } from './app.component';

import { UsuariosService } from './services/API/usuarios.service';
import { NodemailerService } from './services/nodemailer.service';
import { ArfOversightPageComponent } from './components/arf-oversight-page/arf-oversight-page.component';
import { DashboardComponent } from './components/arf-oversight-page/arf-dashboard/arf-dashboard.component';
import { ArfLoginComponent } from './components/arf-login/arf-login.component';
import { ArfCadastroComponent } from './components/arf-cadastro/arf-cadastro.component';
import { ArfFiltersComponent } from './components/arf-oversight-page/arf-dashboard/arf-filters/arf-filters.component';
import { ArfListaComponent } from './components/arf-oversight-page/arf-dashboard/arf-lista/arf-lista.component';
import { ArfDashCardComponent } from './components/arf-oversight-page/arf-dash-card/arf-dash-card.component';
import { ArfAlertasDashComponent } from './components/arf-oversight-page/arf-alertas-dash/arf-alertas-dash.component';
import { ArfOversightNavbarComponent } from './components/arf-oversight-page/arf-oversight-navbar/arf-oversight-navbar.component';
import { ArfChartComponent } from './components/arf-oversight-page/arf-dashboard/arf-chart/arf-chart.component';
import { NgChartsModule } from 'ng2-charts';

const HOMEPAGECOMMUNS = [
  ARFHomepageComponent,
  ARFHomeNavbarComponent,
  ARFHomeBannerComponent,
  ARFHomeSobreComponent,
  ARFHomeServicosComponent,
  ARFHomeDemoComponent,
  ARFHomeContatoComponent,
  ARFHomeFooterComponent,
];

const OVERSIGHTCOMMUNS = [
  ArfOversightPageComponent,
  ArfOversightNavbarComponent,
  DashboardComponent,
  ArfFiltersComponent,
  ArfListaComponent,
  ArfDashCardComponent,
  ArfAlertasDashComponent,
  ArfChartComponent
]

@NgModule({
  declarations: [
    AppComponent,
    ArfLoginComponent,
    ArfCadastroComponent,
    ...HOMEPAGECOMMUNS,
    ...OVERSIGHTCOMMUNS,
    ArfChartComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, NgChartsModule],
  bootstrap: [AppComponent],
})
export class AppModule { }
