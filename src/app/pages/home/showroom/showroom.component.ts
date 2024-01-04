import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { PanoViewerComponent } from 'src/app/shared/pano-viewer/pano-viewer.component';
import { SHOWROOM_DATA } from './service/showroom.data';



@Component({
  selector: "app-showroom",
  templateUrl: "./showroom.component.html",
  styleUrls: ["./showroom.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ShowroomComponent implements OnInit {
  @ViewChild(PanoViewerComponent) panoramaViewer: PanoViewerComponent;

  ngOnInit(): void {}
  getActiveIndex(event) {
    // this.activeIndex = event;
  }
  ngAfterViewInit() {
    const me = this;
    me.panoramaViewer.load(SHOWROOM_DATA)
  }

  // navigateDetails() {
  //   this.router.navigate(["product"], {
  //     queryParams: {
  //       id: this.activeIndex,
  //     },
  //   });
  // }
}
