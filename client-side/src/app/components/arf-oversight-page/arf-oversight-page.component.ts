import { Component, OnInit, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router, UrlSegment } from '@angular/router';

@Component({
  selector: 'arf-oversight-page',
  templateUrl: './arf-oversight-page.component.html',
  styleUrls: ['./arf-oversight-page.component.scss'],
})
export class ArfOversightPageComponent implements OnInit {
  constructor(private cdRef: ChangeDetectorRef, private route: Router) {
  }

  ngOnInit(): void {
    if (sessionStorage.length == 0) {
      this.route.navigate(['/'])
    }
    // else if (sessionStorage.getItem('pagina') != this.route.url.split('/')) {
    //   this.route.navigate([sessionStorage.getItem('pagina')])
    // }

    this.route.events.subscribe(data => {
      if (data instanceof NavigationEnd) {
        const URLs = data.url.split('/')
        const permittedRoutes = ['alterar-dados', sessionStorage.getItem('pagina')]

        if (sessionStorage.getItem('funcao') == 'analista') {
          permittedRoutes.push('alertas')
        }

        console.log(URLs)
        console.log(!URLs[2])

        if (URLs[1] == 'oversight' && !permittedRoutes.includes(URLs[2])) {
          this.route.navigate(['oversight/' + sessionStorage.getItem('pagina')])
        }
      }
    })
  }

  ngOnDestroy() {
    sessionStorage.clear()
  }

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    this.cdRef.detectChanges()
  }
}
