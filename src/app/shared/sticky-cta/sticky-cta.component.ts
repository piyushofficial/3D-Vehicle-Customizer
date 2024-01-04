import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogComponent } from '../dialog/common-dialog/common-dialog.component';
import { BuynowDialogComponent } from '../buynow-dialog/buynow-dialog.component';

@Component({
  selector: 'app-sticky-cta',
  templateUrl: './sticky-cta.component.html',
  styleUrls: ['./sticky-cta.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StickyCtaComponent implements OnInit {
  actionButtonContent = [{
    title: 'Buy Now',
    redirectTo: ''
  },
  {
    title: 'Book Test Ride',
    redirectTo: 'https://dealer-name.edealer.live/'
  }
  ]
  footerActionContent = [{
    title: 'Specifications'
  }]
  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const me = this;
  }
  openDialog(index) {
    const me = this;
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      height: "95%",
      width: "100%"
    });
  }
  openBuynowDialog(): void {
    const dialogRef = this.dialog.open(BuynowDialogComponent, {
      width: '650px',
      height: '380px'
    });
  }


  onClickCTA(index) {

    if (index === 0) {
      this.openBuynowDialog();
    }
    else if (index === 1) {
      const url = 'https://dealer-name.edealer.live/';
      window.open(url, '_blank');
    }

  }
}

