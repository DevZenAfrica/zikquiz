import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  key: string;
  name?: string;
}

@Component({
  selector: 'app-modal-whats-app',
  templateUrl: './modal-whats-app.component.html',
  styleUrls: ['./modal-whats-app.component.scss']
})
export class ModalWhatsAppComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalWhatsAppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

}
