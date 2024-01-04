import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-common-dialog',
  templateUrl: './common-dialog.component.html',
  styleUrls: ['./common-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CommonDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CommonDialogComponent>,) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }
  closeDialog() {
    const me = this;
    this.dialogRef.close(false);
  }
}
