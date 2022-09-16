import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'arf-home-banner',
  templateUrl: './arf-home-banner.component.html',
  styleUrls: [
    './arf-home-banner.desktop.scss',
    './arf-home-banner.mobile.scss',
  ],
})
export class ARFHomeBannerComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  irCadastro() {
    setTimeout(() => {
      this.router.navigate(['/cadastro']);
    }, 110);
  }
}
