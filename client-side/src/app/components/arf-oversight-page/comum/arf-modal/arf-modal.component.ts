import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'arf-modal',
  templateUrl: './arf-modal.component.html',
  styleUrls: ['./arf-modal.component.scss']
})
export class ArfModalComponent implements OnInit {

  constructor() { }

  @Input() autoHidden = true;
  isLoading = true;
  @Output() fadedOut = new EventEmitter();

  ngOnInit(): void {
    if (this.autoHidden) {
      setTimeout(() => {
        this.isLoading = false
        this.fadedOut.emit()

      }, 1500);
    }
  }

}
