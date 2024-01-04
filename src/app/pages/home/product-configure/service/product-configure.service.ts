import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

@Injectable({
  providedIn: "root",
})
export class ProductConfigureService {
  loadWheelRim(modelPath: string) {
    const output = new Subject<any>();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("jsm/libs/draco/gltf/");

    // Create a new instance of GLTFLoader
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load(modelPath, (gltf) => {
      output.next(gltf.scene.children[0]);
    });
    return output;
  }

  loadCarModel() {
    const output = new Subject<any>();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("jsm/libs/draco/gltf/");

    // Create a new instance of GLTFLoader
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load("assets/models/mercedes/MERCEDES_AMG_GT.glb", (gltf) => {
      console.log("gltf: ", gltf);
      output.next(gltf.scene.children[0]);
    });
    return output;
  }

  loadSpoilerCustom() {
    const output = new Subject<any>();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("jsm/libs/draco/gltf/");

    // Create a new instance of GLTFLoader
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      "assets/models/custom-parts/spoilers/car_spoiler.glb",
      (gltf) => {
        console.log("gltf: ", gltf);
        output.next(gltf.scene.children[0]);
      }
    );

    return output;
  }
}
