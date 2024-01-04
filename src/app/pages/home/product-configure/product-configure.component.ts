import { DOCUMENT } from "@angular/common";
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { MatButtonToggleChange } from "@angular/material/button-toggle";
import { MatDialog } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { FeatureDialogNavComponent } from "src/app/shared/feature-dialog-nav/feature-dialog-nav.component";
import * as Stats from "stats.js";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import {
  LightsData,
  ScenePosition,
  SpoilerData,
} from "./service/product-configure.model";
import { ProductConfigureService } from "./service/product-configure.service";
import {
  BRAND_LOGOS,
  INTIAL_CAR_POSITION_DATA,
  LIGHTS_POSITION_DATA,
  SPOILER_DATA,
  WheelData,
  colorMenu,
  hotspots,
  rimMenu,
  spoilerMenu,
} from "./service/product.data";

// declare const Stats: any;

@Component({
  selector: "app-product-configure",
  templateUrl: "./product-configure.component.html",
  styleUrls: ["./product-configure.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ProductConfigureComponent implements OnInit, AfterViewInit {
  carBodyColor: string;
  selectedColor: any;

  @ViewChild("menuTrigger") menuTrigger: MatMenuTrigger;
  initialCarData: ScenePosition;
  mercedesCarModel: THREE.Object3D<THREE.Event>;
  lightsPosition: LightsData[];
  headLightON: boolean = false;
  spoilerData: SpoilerData[];
  CommonSpoiler: THREE.Mesh;
  selectedBodyColor: any;
  testSpoiler: string;
  stockWheelRim: THREE.Mesh;
  camera!: THREE.PerspectiveCamera;
  scene!: THREE.Scene;
  renderer!: THREE.WebGLRenderer;
  grid!: THREE.GridHelper;
  stats: Stats;
  controls!: OrbitControls;
  wheels: THREE.Object3D[] = [];
  @ViewChild("bodyColorInput") bodyColorInput!: ElementRef<HTMLInputElement>;
  @ViewChild("detailsColorInput")
  detailsColorInput!: ElementRef<HTMLInputElement>;
  @ViewChild("glassColorInput") glassColorInput!: ElementRef<HTMLInputElement>;
  @ViewChild("leatherColorInput")
  leatherColorInput!: ElementRef<HTMLInputElement>;
  wheelData = WheelData;
  bodyColor: any;
  detailColor: any;
  glassColor: any;
  checkSpoiler: boolean = true;
  carModelGlobal!: THREE.Object3D;
  leatherColor: any;
  carModelGlobalLexus!: any;
  bodyMaterial!: THREE.MeshStandardMaterial;
  detailsMaterial!: THREE.MeshStandardMaterial;
  glassMaterial!: THREE.MeshPhysicalMaterial;
  leatherMaterial!: THREE.MeshPhysicalMaterial;
  customizationsColorData: any = colorMenu;
  customizationsRimData: any = rimMenu;
  customizationsSpoilerData: any = spoilerMenu;
  hotspots: THREE.Object3D[] = [];
  hotspotPoint: THREE.Object3D<THREE.Event>;
  raycaster: THREE.Raycaster;
  currentIntersect: any;
  mouse: THREE.Vector2;
  pointer: THREE.Vector2;
  container: HTMLElement;
  hotspotList = hotspots;
  checkIfHit: boolean = false;
  projector: any;
  isLoading: boolean = false;
  view: string = "EXTERIOR";
  showStickyCTA: boolean = true;
  spoilerAdded: boolean = true;
  selectedDivIndex: any;
  selectedTypeId: any;
  toggleSidenav: boolean;
  interiorView: boolean;
  customizationType: any;
  brandData: {}[];
  showLoader: boolean = true;
  selectedSpoiler: any;
  selectedColorValue: any;
  selectedWheel: any;
  toggleLights: boolean;
  constructor(
    @Inject(DOCUMENT) private documentEL: Document,
    private productConfigureService: ProductConfigureService,
    public dialog: MatDialog
  ) {}
  //hotspot dialog popup
  dialogRef: any;
  openDialog(hotspotData): void {
    const dialogRef = this.dialog.open(FeatureDialogNavComponent, {
      data: hotspotData,
      width: "60%",
      // maxWidth: '50vw',
      height: "60%",
    });
    // dialogRef.afterClosed().subscribe(() => {
    // const dialogElement = dialogRef.componentInstance.elementRef.nativeElement;
    // const elementToFocus = dialogElement.querySelector('.container');
    // });
  }

  // -0.6890000000000001 0.852 0.30700000000000005
  ngOnInit(): void {
    this.stats = new Stats();
    this.loadInitialCarData();
  }
  loadInitialCarData() {
    this.initialCarData = INTIAL_CAR_POSITION_DATA;
    this.lightsPosition = LIGHTS_POSITION_DATA;
    this.spoilerData = SPOILER_DATA;
    this.brandData = BRAND_LOGOS;
  }
  ngAfterViewInit(): void {
    this.getSpoiler();
    this.getCarModelObject();
    this.basicSceneRendering();
    this.mouse = new THREE.Vector2();
    this.mouseEvents();
  }

  getCarModelObject() {
    this.productConfigureService
      .loadCarModel()
      .subscribe((carModel: THREE.Object3D) => {
        console.log("carModel: ", carModel);
        this.mercedesCarModel = carModel;
        this.carModelGlobal = JSON.parse(JSON.stringify(this.mercedesCarModel));
        carModel.rotation.y = this.initialCarData.initialCarPosition.y;
        const { x, y, z } = this.initialCarData.initialCameraPosition;
        this.camera.position.set(x, y, z);
        const shadow = new THREE.TextureLoader().load(
          "assets/models/ferrari/ferrari_ao.png"
        );
        this.customMaterialAssign();
        this.brandingRemoved();
        this.colorChangeInterior();
        let carMeshMaterial = new THREE.MeshStandardMaterial({
          map: shadow,
          blending: THREE.MultiplyBlending,
          toneMapped: false,
          transparent: true,
        });
        carMeshMaterial.metalness = 0.85;
        carMeshMaterial.roughness = 1;
        const mesh = new THREE.Mesh(
          new THREE.PlaneGeometry(0.655 * 4, 1.3 * 4),
          carMeshMaterial
        );
        mesh.position.set(0, 0.1, 0);
        mesh.scale.set(1.2, 1.2, 1.2);
        mesh.rotateX(-Math.PI / 2);
        this.mercedesCarModel.add(mesh);
        this.mercedesCarModel.receiveShadow = true;
        this.scene.add(this.mercedesCarModel);
        setTimeout(() => {
          this.showLoader = false;
        }, 500);
        // By default, car will not have any spoiler!!.
        this.removeSpoilerDefault(this.spoilerData);
        // It will remove all logos of mercedes
        this.removeSpoilerDefault(this.brandData);

        this.hotspotLink();
      });
  }

  customMaterialAssign() {
    const headLight = this.mercedesCarModel.getObjectByName("1") as THREE.Mesh;
    const tailLight = this.mercedesCarModel.getObjectByName(
      "Glass003"
    ) as THREE.Mesh;
    const windShield = this.mercedesCarModel.getObjectByName(
      "Glass001"
    ) as THREE.Mesh;
    const windowSecond = this.mercedesCarModel.getObjectByName(
      "Glass002"
    ) as THREE.Mesh;

    const DoorRF_Glass = this.mercedesCarModel.getObjectByName(
      "DoorRF_Glass"
    ) as THREE.Mesh;
    const DoorRF_GlassInside = this.mercedesCarModel.getObjectByName(
      "DoorRF_GlassInside"
    ) as THREE.Mesh;
    const Trunk_Glass = this.mercedesCarModel.getObjectByName(
      "Trunk_Glass"
    ) as THREE.Mesh;
    const Trunk_GlassInside = this.mercedesCarModel.getObjectByName(
      "Trunk_GlassInside"
    ) as THREE.Mesh;
    const DoorLF_Glass = this.mercedesCarModel.getObjectByName(
      "DoorLF_Glass"
    ) as THREE.Mesh;
    const DoorLF_GlassInside = this.mercedesCarModel.getObjectByName(
      "DoorLF_GlassInside"
    ) as THREE.Mesh;
    const DoorRF_sideMirror = this.mercedesCarModel.getObjectByName(
      "DoorRF_Coloured001"
    ) as THREE.Mesh;
    const DoorLF_sideMirror = this.mercedesCarModel.getObjectByName(
      "DoorLF_Coloured001"
    ) as THREE.Mesh;
    const interiorMirror = this.mercedesCarModel.getObjectByName(
      "Coloured001"
    ) as THREE.Mesh;

    let bodyLightMaterial = new THREE.MeshPhysicalMaterial({
      transparent: true,
      opacity: 0,
    });
    let windShieldMaterial = new THREE.MeshPhysicalMaterial({
      transparent: true,
      color: "black",
      opacity: 0.3,
      reflectivity: 10,
    });
    this.changeTyreTextures();

    // tyres.children.map((item: THREE.Mesh) => {
    //   item.material = tyreMaterial;
    // });
    headLight.material = bodyLightMaterial;
    tailLight.material = bodyLightMaterial;
    windShield.material = windShieldMaterial;
    DoorLF_Glass.material = windShieldMaterial;
    DoorLF_GlassInside.material = windShieldMaterial;
    DoorRF_Glass.material = windShieldMaterial;
    DoorRF_GlassInside.material = windShieldMaterial;
    windowSecond.material = windShieldMaterial;
    Trunk_Glass.material = windShieldMaterial;
    Trunk_GlassInside.material = windShieldMaterial;
    DoorRF_sideMirror.material = windShieldMaterial;
    DoorLF_sideMirror.material = windShieldMaterial;
    interiorMirror.material = windShieldMaterial;
  }
  changeTyreTextures() {
    let tyreThread = this.mercedesCarModel.getObjectByName(
      "Mesh079"
    ) as THREE.Mesh;
    let tyreSidewall = this.mercedesCarModel.getObjectByName(
      "Mesh079_1"
    ) as THREE.Mesh;
    let tyreThreadNM = new THREE.TextureLoader().load(
      "assets/textures/tyres/TYRE_THREAD_NM.jpeg"
    );
    let tyreThreadDM = new THREE.TextureLoader().load(
      "assets/textures/tyres/TYRE_THREAD_DM.jpeg"
    );
    let tyreThreadRM = new THREE.TextureLoader().load(
      "assets/textures/tyres/TYRE_THREAD_RM.jpeg"
    );
    let tyreOcclusionRM = new THREE.TextureLoader().load(
      "assets/textures/tyres/TYRE_THREAD_AO.jpeg"
    );
    let tyreThreadMaterial = new THREE.MeshPhysicalMaterial();
    tyreThreadMaterial.color.set("#000000");
    tyreThreadMaterial.map = tyreThreadRM;
    tyreThreadMaterial.aoMap = tyreOcclusionRM;
    tyreThreadMaterial.normalMap = tyreThreadNM;
    tyreThreadMaterial.displacementMap = tyreThreadDM;
    tyreThreadMaterial.displacementScale = 0.1;
    // tyreThreadMaterial.roughnessMap = tyreThreadRM;
    tyreThread.material = tyreThreadMaterial;

    let tyreSidewallNM = new THREE.TextureLoader().load(
      "assets/textures/tyres/TYRE_SIDEWALL_NM.jpeg"
    );
    let tyreSidewallDM = new THREE.TextureLoader().load(
      "assets/textures/tyres/TYRE_SIDEWALL_DM.jpeg"
    );
    let tyreSidewallRM = new THREE.TextureLoader().load(
      "assets/textures/tyres/TYRE_SIDEWALL_THREAD_RM.jpeg"
    );
    let tyreSidewallOcclusionRM = new THREE.TextureLoader().load(
      "assets/textures/tyres/TYRE_SIDEWALL_RM.jpeg"
    );

    let tyreSideWallMaterial = new THREE.MeshStandardMaterial();
    // tyreSideWallMaterial.color.set("#000000");
    tyreSideWallMaterial.aoMap = tyreSidewallOcclusionRM;
    tyreSideWallMaterial.normalMap = tyreSidewallNM;
    tyreSideWallMaterial.displacementMap = tyreSidewallDM;
    tyreSideWallMaterial.displacementScale = 0.08;
    tyreSideWallMaterial.roughnessMap = tyreSidewallRM;
    tyreSideWallMaterial.roughness = 0.2;
    tyreSidewall.material = tyreSideWallMaterial;
  }
  setColorforCarBody(selectedColor) {
    // const targetPosition = new THREE.Vector3(
    //   2.4121798264278107,
    //   0.7000695565674757,
    //   -3.184550306952238
    // );
    // this.transitionCameraAngle(targetPosition);
    this.getCameraPosition();
    const bodyObject = this.mercedesCarModel.getObjectByName(
      "Paint"
    ) as THREE.Mesh;

    const doorRight = this.mercedesCarModel.getObjectByName(
      "DoorRF_Paint"
    ) as THREE.Mesh;

    const doorLeft = this.mercedesCarModel.getObjectByName(
      "DoorLF_Paint"
    ) as THREE.Mesh;

    const carPaintNM = new THREE.TextureLoader().load(
      "assets/textures/CARPAINT_FLAKES_NM.jpeg"
    );

    this.bodyMaterial = new THREE.MeshStandardMaterial({
      roughness: 0.2,
      metalness: 0.4,
    });
    this.bodyMaterial.normalMap = carPaintNM;
    this.bodyMaterial.normalScale.set(0.04, 0.04);
    bodyObject.material = this.bodyMaterial;
    doorRight.material = this.bodyMaterial;
    doorLeft.material = this.bodyMaterial;
    this.bodyMaterial.color.set(selectedColor);
    // this.mercedesCarModel.add(bodyObject);
    this.mercedesCarModel.updateMatrixWorld(true);
  }
  setInitialCarPosition() {
    return { x: 0, y: 2, z: 0 };
  }

  addLights() {
    this.toggleLights = !this.toggleLights;
    this.getCameraPosition();
    const lightObject = this.mercedesCarModel.getObjectByName(
      "Light"
    ) as THREE.Mesh;
    const targetPosition = new THREE.Vector3(
      4.785752437038139,
      0.9806352932910816,
      -3.006646490916821
    );
    this.transitionCameraAngle(targetPosition);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    if (this.headLightON) {
      this.headLightON = !this.headLightON;
      this.lightsPosition.map((lightPosition: LightsData) => {
        let getLight = lightObject.getObjectByName(lightPosition.name);
        lightObject.remove(getLight);
        return;
      });
    } else {
      this.headLightON = !this.headLightON;
      this.lightsPosition.map((lightPosition: LightsData) => {
        let { x, y, z } = lightPosition.position;
        let headlights = new THREE.PointLight("#eedd82", 1000, 1, 20); // White light with intensity 1
        headlights.castShadow = true;
        headlights.name = lightPosition.name;
        headlights.position.set(x, y, z); // Set the position of the light source
        lightObject.add(headlights);
        // this.createCube(lightPosition.position);
        // const sphereSize = 1;
        // const pointLightHelper = new THREE.PointLightHelper(
        //   headlights,
        //   sphereSize
        // );
        // this.scene.add(pointLightHelper);
      });
    }
    this.mercedesCarModel.updateMatrixWorld(true);
  }

  basicSceneRendering() {
    //it will create a renderer and appends it to the container element
    this.container = this.documentEL.getElementById("container")!;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setAnimationLoop(() => {
      this.render();
    });
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.85;
    this.container.appendChild(this.renderer.domElement);

    window.addEventListener("resize", () => {
      this.onWindowResize();
    });
    // let stats = new Stats();
    // this.container.appendChild(stats.dom);

    // Camera positioning happens here
    this.camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      20000
    );
    // this.camera.position.set(4.25, 3, -10);

    //These are orbit Controls for camera movement
    this.controls = new OrbitControls(this.camera, this.container);
    this.controls.maxDistance =
      this.initialCarData.carZoomDistance.maximumDistance;
    this.controls.minDistance =
      this.initialCarData.carZoomDistance.minimumDistance;
    this.controls.maxPolarAngle = THREE.MathUtils.degToRad(90);
    // this.controls.minPolarAngle = THREE.MathUtils.degToRad(60);
    this.controls.target.set(0, 0.5, 0);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.update();

    this.scene = new THREE.Scene();

    // Set the scene environment map
    const envLoader = new RGBELoader();
    let textureCustom;
    envLoader.load("assets/textures/canary_wharf.hdr", (texture) => {
      // console.log("texture: ", texture);
      texture.mapping = THREE.EquirectangularReflectionMapping;
      textureCustom = texture;
      this.scene.background = texture;
      this.scene.environment = texture;
    });
    let concretColor = new THREE.TextureLoader().load(
      "assets/textures/Concrete_texture/Concrete_basecolor.jpg"
    );
    let concretTextureDM = new THREE.TextureLoader().load(
      "assets/textures/Concrete_texture/Concrete_height_DM.png"
    );
    let concretTextureNM = new THREE.TextureLoader().load(
      "assets/textures/Concrete_texture/Concrete_normal.jpg"
    );
    let concretRoughness = new THREE.TextureLoader().load(
      "assets/textures/Concrete_texture/Concrete_roughness.jpg"
    );
    let concretTextureAO = new THREE.TextureLoader().load(
      "assets/textures/Concrete_texture/Concrete_aO.jpg"
    );
    concretColor.repeat.x = 20;
    concretColor.repeat.y = 20;
    concretColor.wrapS = THREE.MirroredRepeatWrapping;
    concretColor.wrapT = THREE.MirroredRepeatWrapping;
    concretColor.generateMipmaps = false;
    concretColor.minFilter = THREE.NearestFilter;
    concretColor.magFilter = THREE.NearestFilter;
    let cylinderGeometry = new THREE.CylinderGeometry(50, 50, 4, 100);
    let platformMaterial = new THREE.MeshStandardMaterial({
      map: concretColor,
    });
    platformMaterial.displacementMap = concretTextureDM;
    platformMaterial.displacementScale = 0.085;
    platformMaterial.normalMap = concretTextureNM;
    platformMaterial.roughnessMap = concretRoughness;
    platformMaterial.aoMap = concretTextureAO;
    cylinderGeometry.rotateX(Math.PI / 2);
    const ground = new THREE.Mesh(cylinderGeometry, platformMaterial);
    ground.position.y = -2;
    ground.rotation.x = -Math.PI / 2; // rotates X/Y to X/Z
    // ground.receiveShadow = true;
    this.scene.add(ground);
    // this.scene.fog = new THREE.Fog("white", 10, 25);
    // this.grid = new THREE.GridHelper(500, 5);
    // this.grid.material = new THREE.MeshBasicMaterial({
    //   opacity: 100,
    // });
    // this.grid.material.depthWrite = true;
    // this.scene.add(this.grid);

    // Load and set the background texture
  }
  ngAfterContentInit() {}

  init() {
    // newcode

    //it will create a renderer and appends it to the container element
    this.container = this.documentEL.getElementById("container")!;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setAnimationLoop(() => {
      this.render();
    });
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.85;
    this.container.appendChild(this.renderer.domElement);

    window.addEventListener("resize", () => {
      this.onWindowResize();
    });
    let stats = new Stats();
    this.container.appendChild(stats.dom);

    // Camera positioning happens here
    this.camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      20000
    );
    this.camera.position.set(4.25, 3, -10);

    //These are orbit Controls for camera movement
    this.controls = new OrbitControls(this.camera, this.container);
    this.controls.maxDistance = 9;
    this.controls.maxPolarAngle = THREE.MathUtils.degToRad(90);
    this.controls.target.set(0, 0.5, 0);
    this.controls.update();

    //It will create a three Js scene and sets here its background and fog.
    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color(0x333333);
    this.scene.environment = new RGBELoader().load(
      "assets/textures/venice_sunset_1k.hdr"
    );
    this.scene.environment.mapping = THREE.EquirectangularReflectionMapping;
    this.scene.fog = new THREE.Fog(0x333333, 10, 15);
    const bgImage = new THREE.TextureLoader();
    bgImage.load("assets/textures/360_F.jpg", (texture) => {
      this.scene.background = texture;
      this.scene.background.mapping = THREE.EquirectangularReflectionMapping;
    });

    // this.raycaster = new THREE.Raycaster();
    // this.pointer = new THREE.Vector2();
    // const rayDirection = new THREE.Vector3(10, 10, 10);
    // rayDirection.normalize();
    //Creates a grid helper and adds it to the scene.
    // this.grid = new THREE.GridHelper(20, 40, 0xffffff, 0xffffff);
    // this.grid.material = new THREE.MeshBasicMaterial({
    //   opacity: 0.2,
    //   transparent: true,
    // });
    // this.grid.material.depthWrite = false;
    // this.scene.add(this.grid);

    // Creates material objects for the car body, details, and glass.
    this.bodyMaterial = new THREE.MeshPhysicalMaterial({
      // color: this.carBodyColor,
      color: this.selectedColor,
      metalness: 1.0,
      roughness: 0.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
    });

    this.detailsMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 1.0,
      roughness: 0.5,
    });

    this.glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.25,
      roughness: 0,
      transmission: 1.0,
    });

    this.leatherMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.25,
      roughness: 0,
      transmission: 1.0,
    });

    // Sets up event listeners for color inputs and updates the material colors accordingly.

    // this.bodyMaterial.color.set(this.carBodyColor);
    //  const datares =   this.bodyMaterial.color.set(this.selectedColor)
    //   console.log("datares", datares);
    // this.bodyColor.addEventListener("input", () => {
    // this.bodyMaterial.color.set(this.selectedColor.value);
    // console.log("result ",datares);
    // });

    // this.detailColor.addEventListener("input", () => {
    //   this.detailsMaterial.color.set(this.detailColor.value);
    // });

    // this.glassColor.addEventListener("input", () => {
    //   this.glassMaterial.color.set(this.glassColor.value);
    // });

    // this.leatherColor.addEventListener("input", () => {
    //   this.leatherMaterial.color.set(this.leatherColor.value);
    // });

    // Car
    // Loads a 3D model of a car using the GLTFLoader and applies the materials to the different parts of the car model.
    const shadow = new THREE.TextureLoader().load(
      "assets/models/ferrari/ferrari_ao.png"
    );

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("jsm/libs/draco/gltf/");

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    this.scene.add(new THREE.AxesHelper(5));

    loader.load("assets/models/ferrari/ferrari.glb", (gltf) => {
      this.carModelGlobal = gltf.scene.children[0];
      // console.log("this.carModelGlobal: ", this.carModelGlobal);
      // this.carModelGlobal.position.set(0, -5, 0);

      // this.geometryAddASpoiler(carModel);
      // this.addSpoilerExternal(carModel);

      const bodyObject = this.carModelGlobal.getObjectByName(
        "body"
      ) as THREE.Mesh;
      bodyObject.material = this.bodyMaterial;

      const carModelRimfl = this.carModelGlobal.getObjectByName(
        "rim_fl"
      ) as THREE.Mesh;
      carModelRimfl.material = this.detailsMaterial;

      const carModelRimfr = this.carModelGlobal.getObjectByName(
        "rim_fr"
      ) as THREE.Mesh;
      carModelRimfr.material = this.detailsMaterial;

      const carModelRimrr = this.carModelGlobal.getObjectByName(
        "rim_rr"
      ) as THREE.Mesh;
      carModelRimrr.material = this.detailsMaterial;

      const carModelRimrl = this.carModelGlobal.getObjectByName(
        "rim_rl"
      ) as THREE.Mesh;
      carModelRimrl.material = this.detailsMaterial;

      const trim = this.carModelGlobal.getObjectByName("trim") as THREE.Mesh;
      trim.material = this.detailsMaterial;

      const glass = this.carModelGlobal.getObjectByName("glass") as THREE.Mesh;
      glass.material = this.glassMaterial;

      const leather = this.carModelGlobal.getObjectByName(
        "leather"
      ) as THREE.Mesh;
      leather.material = this.leatherMaterial;

      this.wheels.push(
        this.carModelGlobal.getObjectByName("wheel_fl") as THREE.Mesh,
        this.carModelGlobal.getObjectByName("wheel_fr") as THREE.Mesh,
        this.carModelGlobal.getObjectByName("wheel_rl") as THREE.Mesh,
        this.carModelGlobal.getObjectByName("wheel_rr") as THREE.Mesh
      );

      // shadow
      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(0.655 * 4, 1.3 * 4),
        new THREE.MeshBasicMaterial({
          map: shadow,
          blending: THREE.MultiplyBlending,
          toneMapped: false,
          transparent: true,
        })
      );
      mesh.rotation.x = -Math.PI / 2;
      mesh.renderOrder = 2;
      this.carModelGlobal.add(mesh);
      this.scene.add(this.carModelGlobal);
    });
    this.hotspotLink();
  }

  removeSpoilerDefault(data) {
    let spoilerGroup = new THREE.Mesh();
    let spoilerArr = [];
    data.map((spoilerPart) => {
      let { id, name } = spoilerPart;
      let trunkPart = this.mercedesCarModel.getObjectByName(name) as THREE.Mesh;
      spoilerArr.push(trunkPart);
    });
    spoilerGroup.add(...spoilerArr);
    spoilerGroup.removeFromParent();
  }

  private hotspotLink() {
    this.hotspotList.map((hotspot) => {
      let hotSpotPoint = new THREE.Object3D();
      let { x, y, z } = hotspot.position;
      hotSpotPoint.name = hotspot.name;
      hotSpotPoint.userData.id = hotspot.id;
      hotSpotPoint.position.set(x, y, z);

      let plusTexture = new THREE.TextureLoader().load(
        "assets/images/hotspot.png"
      );
      const hotspotMaterial = new THREE.MeshBasicMaterial({
        map: plusTexture,
        transparent: true,
      });
      const hotspotPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(0.2, 0.2),
        hotspotMaterial
      );

      hotSpotPoint.add(hotspotPlane);
      if (hotSpotPoint.userData.id === 3 || hotSpotPoint.userData.id === 4) {
        hotSpotPoint.scale.set(0.5, 0.5, 0.5);
      }
      this.hotspots.push(hotSpotPoint);
    });
    this.scene.add(...this.hotspots);
  }

  wheelRimChange(rotation, offset, scale, value, modelPath) {
    let wheels = new THREE.Mesh();
    wheels.name = value;
    this.wheelData.map((wheel) => {
      let { x, y, z } = wheel.positionWheel;
      this.productConfigureService
        .loadWheelRim(modelPath)
        .subscribe((wheelRim: THREE.Object3D | THREE.Group | THREE.Mesh) => {
          wheelRim.scale.set(scale.x, scale.y, scale.z);
          wheelRim.rotation.set(
            wheel[rotation].x,
            wheel[rotation].y,
            wheel[rotation].z
          );
          wheelRim.position.set(
            x + wheel[offset].l,
            y + wheel[offset].m,
            z + wheel[offset].n
          );
          wheels.add(wheelRim);
        });
    });
    this.mercedesCarModel.add(wheels);
    // this.colorChangeSecondWheel();
    this.mercedesCarModel.updateMatrixWorld(true);
  }

  // colorChangeSecondWheel() {
  //   let wheelRimSecond = this.mercedesCarModel.getObjectByName(
  //     "Wheel2"
  //   ) as THREE.Mesh;
  //   console.log("wheelRimSecond: ", wheelRimSecond);
  //   let wheelMaterial = new THREE.MeshBasicMaterial({
  //     color: "grey",
  //   });
  //   let wheel1 = wheelRimSecond.children[0] as THREE.Mesh;
  //   wheel1.material = wheelMaterial;
  // }

  colorChangeInterior() {
    let interiorObject = this.mercedesCarModel.getObjectByName(
      "Interior001"
    ) as THREE.Mesh;
    let texture = new THREE.TextureLoader().load(
      "assets/textures/leather_texture.jpg"
    );

    let interiorMaterial = new THREE.MeshStandardMaterial({
      color: "grey",
      map: texture,
      blending: THREE.MultiplyBlending,
    });
    interiorObject.material = interiorMaterial;
  }

  replacewheelRims(value: string, modelPath) {
    const targetPosition = new THREE.Vector3(
      -1.1690294812283868,
      0.5000000000000003,
      -4.469731280932227
    );
    this.transitionCameraAngle(targetPosition);
    switch (value) {
      case "Wheel1":
        this.removeRim();
        let scaleW1 = {
          x: 0.0095,
          y: 0.0095,
          z: 0.0095,
        };
        this.wheelRimChange(
          "rotationWheel1",
          "offsetWheel1",
          scaleW1,
          value,
          modelPath
        );
        break;
      case "Wheel2":
        this.removeRim();
        let scaleW2 = {
          x: 0.24,
          y: 0.24,
          z: 0.24,
        };
        this.wheelRimChange(
          "rotationWheel2",
          "offsetWheel2",
          scaleW2,
          value,
          modelPath
        );
        break;
    }
  }

  removeRim() {
    this.stockWheelRim = this.mercedesCarModel.getObjectByName(
      "Object011"
    ) as THREE.Mesh;
    if (this.stockWheelRim) {
      this.stockWheelRim.removeFromParent();
    }

    let wheelOnerim = this.mercedesCarModel.getObjectByName(
      "Wheel1"
    ) as THREE.Mesh;
    if (wheelOnerim) {
      wheelOnerim.removeFromParent();
    }
    let wheelTworim = this.mercedesCarModel.getObjectByName(
      "Wheel2"
    ) as THREE.Mesh;
    if (wheelTworim) {
      wheelTworim.removeFromParent();
    }
  }

  getCameraPosition() {
    console.log(
      "Camera Position:",
      this.camera.position.x,
      this.camera.position.y,
      this.camera.position.z
    );
  }

  brandingRemoved() {
    let LogoFront = this.mercedesCarModel.getObjectByName(
      "Object003"
    ) as THREE.Mesh;
    if (LogoFront) {
      LogoFront.removeFromParent();
    }
  }

  createCube(position) {
    let { x, y, z } = position;
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    // mesh.rotation.x = -Math.PI / 2;
    // mesh.renderOrder = 2;
    mesh.name = "Spoiler";
    this.mercedesCarModel.add(mesh);
    this.scene.add(this.carModelGlobal);
  }

  transitionCameraAngle(targetPosition: THREE.Vector3) {
    const startPosition = this.camera.position.clone();
    const startTime = performance.now();
    const duration = 1500;
    const animateCamera = () => {
      const currentTime = performance.now();
      const elapsed = currentTime - startTime;
      const alpha = Math.min(elapsed / duration, 1);
      const interpolatedPosition = new THREE.Vector3().lerpVectors(
        startPosition,
        targetPosition,
        alpha
      );

      this.camera.position.copy(interpolatedPosition);

      if (alpha < 1) {
        requestAnimationFrame(animateCamera);
      }
    };

    animateCamera();
  }

  mouseEvents() {
    this.container.addEventListener("mousedown", (event) => {
      this.mouse.x = (event.offsetX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.offsetY / window.innerHeight) * 2 + 1;

      // let vector = new THREE.Vector3(this.mouse.x, this.mouse.y, -4);
      // vector.unproject(this.camera);

      let ray = new THREE.Raycaster();
      ray.setFromCamera(this.mouse, this.camera);

      let intersects = ray.intersectObjects(this.hotspots);
      if (intersects.length) {
        if (!this.currentIntersect) {
        }
        this.currentIntersect = intersects[0];
        // Apply hotspot class to the element representing the hotspot
        // this.currentIntersect.object.element.classList.add("hotspot");
        //hotspots dialog
        this.openDialog(this.currentIntersect);
        // this.currentIntersect.object.element.style.cursor = "pointer";
      } else {
        if (this.currentIntersect) {
          console.log("mouse leave");
        }
        this.currentIntersect = null;
      }
    });
  }

  getSpoiler() {
    this.productConfigureService
      .loadSpoilerCustom()
      .subscribe((spoiler: THREE.Mesh) => {
        console.log("spoiler: ", spoiler);
        this.CommonSpoiler = spoiler;
        this.CommonSpoiler.position.set(0, 0.2, 0.2);
      });
  }
  customSpoilerAddition(value) {
    this.mercedesCarModel.remove(this.CommonSpoiler);
    let spoilerBody1 = this.CommonSpoiler.getObjectByName(
      "Object_6"
    ) as THREE.Mesh;
    let spoilerBody2 = this.CommonSpoiler.getObjectByName(
      "Object_7"
    ) as THREE.Mesh;
    let spoilerPlate = this.CommonSpoiler.getObjectByName(
      "Object_2"
    ) as THREE.Mesh;
    let spoilerAngles = this.CommonSpoiler.getObjectByName(
      "Object_4"
    ) as THREE.Mesh;
    let spoilerCenter = this.CommonSpoiler.getObjectByName(
      "Object_3"
    ) as THREE.Mesh;
    if (this.spoilerAdded) {
      this.spoilerAdded = !this.spoilerAdded;
      this.testSpoiler = "Spoiler";
      let spoilerBodyMaterial = new THREE.MeshStandardMaterial({
        color: this.selectedColor,
      });
      spoilerPlate.material = spoilerBodyMaterial;
      spoilerAngles.material = spoilerBodyMaterial;
      spoilerBody1.material = spoilerBodyMaterial;
      spoilerBody2.material = spoilerBodyMaterial;
      spoilerCenter.material = spoilerBodyMaterial;
      this.mercedesCarModel.add(this.CommonSpoiler);
    } else {
      this.spoilerAdded = !this.spoilerAdded;
      if (this.CommonSpoiler) {
        this.CommonSpoiler.removeFromParent();
      }
    }

    const targetPosition = new THREE.Vector3(
      -5.549353154251844,
      1.6185080173856237,
      -0.3577417777600147
    );
    this.transitionCameraAngle(targetPosition);
  }

  spoilerBodyColor() {
    let spoilerBody1 = this.CommonSpoiler.getObjectByName(
      "Object_6"
    ) as THREE.Mesh;
    let spoilerBody2 = this.CommonSpoiler.getObjectByName(
      "Object_7"
    ) as THREE.Mesh;
    let spoilerPlate = this.CommonSpoiler.getObjectByName(
      "Object_2"
    ) as THREE.Mesh;
    let spoilerAngles = this.CommonSpoiler.getObjectByName(
      "Object_4"
    ) as THREE.Mesh;
    let spoilerCenter = this.CommonSpoiler.getObjectByName(
      "Object_3"
    ) as THREE.Mesh;
    if (this.CommonSpoiler) {
      let spoilerBodyMaterial = new THREE.MeshStandardMaterial({
        color: this.selectedColor,
      });
      spoilerPlate.material = spoilerBodyMaterial;
      spoilerAngles.material = spoilerBodyMaterial;
      spoilerBody1.material = spoilerBodyMaterial;
      spoilerBody2.material = spoilerBodyMaterial;
      spoilerCenter.material = spoilerBodyMaterial;
    }
  }

  toggleInteriorView() {
    this.showStickyCTA = false;
    this.controls.addEventListener("change", () => {
      // console.log(
      //   this.camera.position.x,
      //   this.camera.position.y,
      //   this.camera.position.z
      // );
    });
    this.isLoading = true;
    this.view = "INTERIOR";
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
    this.camera.fov = 90;
    this.camera.position.set(-0.689, 0.852, 0.307);
    this.controls.maxDistance = 0.9;
    this.controls.minDistance = 0.9;
    this.controls.minAzimuthAngle = THREE.MathUtils.degToRad(240);
    this.controls.maxAzimuthAngle = THREE.MathUtils.degToRad(330);
    this.controls.maxPolarAngle = THREE.MathUtils.degToRad(65);
    this.controls.minPolarAngle = THREE.MathUtils.degToRad(40);
    this.camera.updateProjectionMatrix();
  }

  toggleExteriorView() {
    this.isLoading = true;
    this.showStickyCTA = true;
    this.view = "EXTERIOR";
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);

    this.camera.position.set(4.25, 3, -10);

    this.controls.maxDistance =
      this.initialCarData.carZoomDistance.maximumDistance;
    this.controls.minDistance =
      this.initialCarData.carZoomDistance.minimumDistance;

    this.controls.minPolarAngle = 0;
    this.controls.maxPolarAngle = THREE.MathUtils.degToRad(90);

    this.controls.minAzimuthAngle = -Infinity;
    this.controls.maxAzimuthAngle = Infinity;
    this.camera.fov = 40;
    this.camera.updateProjectionMatrix();
    this.controls.target.set(0, 0.5, 0);
    this.controls.update();
  }

  // It updates the controls, rotates the wheels, moves the grid, renders the scene with the renderer, and updates the performance statistics.
  render() {
    this.controls.update();

    const time = -performance.now() / 1000;
    this.hotspots.map((hotspot) => {
      hotspot.lookAt(this.camera.position);
    });

    // for (let i = 0; i < this.wheels.length; i++) {
    //   this.wheels[i].rotation.x = time * Math.PI * 2;
    // }
    // this.grid.position.z = -time % 1;

    this.renderer.render(this.scene, this.camera);

    this.stats.update();
  }

  // It adjusts the camera aspect ratio, updates the projection matrix, and resizes the renderer accordingly.
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // onCustomizations(event, i) {
  //   this.selectedDivIndex = i;

  //   this.selectedTypeId = i;
  //   this.customizationType = event?.type;
  //   let { type, modelPath, value } = event;
  //   const me = this;
  //   me.selectedBodyColor = event.value;
  //   switch (type) {
  //     case "color":
  //       this.selectedColor = event.value;
  //       me.setColorforCarBody(event.value);
  //       me.spoilerBodyColor();
  //       break;
  //     case "wheels":
  //       me.replacewheelRims(value, modelPath);
  //       break;
  //     case "spoiler":
  //       me.customSpoilerAddition(value);
  //       break;
  //   }
  // }

  onCustomizationsColor(event, i) {
    const me = this;
    me.selectedColorValue = i;
    this.selectedTypeId = i;
    this.selectedColor = event.value;
    me.setColorforCarBody(event.value);
    me.spoilerBodyColor();
  }
  onCustomizationsWheels(event, i) {
    const me = this;

    me.selectedWheel = i;
    let { type, modelPath, value } = event;

    me.replacewheelRims(value, modelPath);
  }
  onCustomizationsSpoiler(event, i) {
    const me = this;
    me.selectedSpoiler = i;
    console.log(event);
    let { type, modelPath, value } = event;
    me.customSpoilerAddition(value);
  }

  onToggleView(event: MatButtonToggleChange) {
    const me = this;
    if (event.value === "exterior") {
      me.interiorView = false;
      me.toggleExteriorView();
    } else {
      me.interiorView = true;
      me.toggleInteriorView();
    }
  }

  onClickSidenav() {
    const me = this;
    me.toggleSidenav = true;
  }
}
