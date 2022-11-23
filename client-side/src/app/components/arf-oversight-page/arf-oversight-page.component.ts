import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'arf-oversight-page',
  templateUrl: './arf-oversight-page.component.html',
  styleUrls: ['./arf-oversight-page.component.scss'],
})
export class ArfOversightPageComponent implements OnInit {
  constructor(private cdRef: ChangeDetectorRef, private route: Router) { }

  ngOnInit(): void {
    if (sessionStorage.length == 0) {
      this.route.navigate(['/'])
    }
  }

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    this.cdRef.detectChanges()
  }
}
