import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'arf-oversight-page',
  templateUrl: './arf-oversight-page.component.html',
  styleUrls: ['./arf-oversight-page.component.scss'],
})
export class ArfOversightPageComponent implements OnInit {
  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void { }

  validarSecao(){
    alert(sessionStorage.key(1));
  }
  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    this.cdRef.detectChanges()
  }
}
