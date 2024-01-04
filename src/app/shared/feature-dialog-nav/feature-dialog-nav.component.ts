import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-feature-dialog-nav",
  templateUrl: "./feature-dialog-nav.component.html",
  styleUrls: ["./feature-dialog-nav.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class FeatureDialogNavComponent implements OnInit {
  selectedHotspotId: any;
  imgSrc: any;
  description: any;
  descriptionTitle: any;
  constructor(
    public dialogRef: MatDialogRef<FeatureDialogNavComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
  }

  hotSpotInfo = [
    {
      imgSrc: "../../../assets/images/Engine.jpg",
      descriptionTitle: "Powerful V Engine",
      description:
        'Powered by a 4.0-litre M178 twin-turbocharged V8 engine, the engine is in "hot inside V" giving the vehicle exceptional speed',
    },
    {
      imgSrc: "../../../assets/images/HeadLight.jpg",
      descriptionTitle: "AMG - Smart Headlight",
      description:
        "Each smart HD quality headlamp has over one million pixels and can control where and how much light is thrown in front of the car",
    },
    {
      imgSrc: "../../../assets/images/Wheels.jpg",
      descriptionTitle: "AMG multi-spoke light-alloy wheels",
      description:
        "50.8 cm (20-inch) AMG multi-spoke light-alloy wheels aerodynamically optimised, painted in matt black with a high-sheen finish",
    },
    {
      imgSrc: "../../../assets/images/Dashboard.jpg",
      descriptionTitle: "Stylish Dashboard",
      description:
        "Stylish Dashboard provides finished leather look and advanced climate control features",
    },
    {
      imgSrc: "../../../assets/images/Steering_Wheel.jpg",
      descriptionTitle: "Smart Steering Wheel",
      description:
        "Smart Steering Wheels provides additional controls from Bluetooth connectivity to phone contols, from volume controls to Navigation.",
    },
  ];

  onImageLoad() { }

  ngOnInit(): void {
    this.selectedHotspotId = this.data.object.parent.userData.id;
    this.imgSrc = this.hotSpotInfo[this.selectedHotspotId].imgSrc;
    this.descriptionTitle =
      this.hotSpotInfo[this.selectedHotspotId].descriptionTitle;
    this.description = this.hotSpotInfo[this.selectedHotspotId].description;
  }
}
