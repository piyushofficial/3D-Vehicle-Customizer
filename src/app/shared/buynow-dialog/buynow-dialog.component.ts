import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-buynow-dialog',
  templateUrl: './buynow-dialog.component.html',
  styleUrls: ['./buynow-dialog.component.scss']
})
export class BuynowDialogComponent implements OnInit {

  registrationForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<BuynowDialogComponent>
    , private formBuilder: FormBuilder) {
    dialogRef.disableClose = true;
  }
  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      state: ['', Validators.required],
      city: ['', Validators.required]
    });
  }
  closeDialog() {
    const me = this;
    this.dialogRef.close(false);
  }
  onSubmit() {
    this.closeDialog();
  }
}
