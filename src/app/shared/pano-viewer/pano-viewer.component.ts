import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-pano-viewer',
  templateUrl: './pano-viewer.component.html',
  styleUrls: ['./pano-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PanoViewerComponent implements OnInit {
  @Input() panoramaId: string;
  constructor() { }

  ngOnInit(): void {
  }
  public load(data): void {
    const me = this;
    window['initMarzipano'](data, me.panoramaId);
    console.log("data ", data);
  }
}
