export const WheelData = [
  {
    wheelNo: "wheel_3",
    wheelRim: "rim_fl",
    wheelName: "wheel_fl",
    positionWheel: {
      x: -0.0000351715098076966,
      y: -0.00000785827614890877,
      z: -0.000523223890922964,
    },
    offsetWheel1: {
      l: 0.79,
      m: 0.36,
      n: 1.33,
    },
    offsetWheel2: {
      l: 0.89,
      m: 0.34,
      n: 1.41,
    },
    rotationWheel1: {
      x: -1.5707962925663523,
      y: 0,
      z: 1.5707962925663523,
    },
    rotationWheel2: {
      x: 0,
      y: 1.55,
      z: 0,
    },
    positionRim: {
      x: 0.113856963813305,
      y: -0.00015441894356627,
      z: -0.000531616213265806,
    },
  },
  {
    wheelNo: "wheel_2",
    wheelRim: "rim_rr",
    wheelName: "wheel_rr",
    positionWheel: {
      x: 0.0000449371327704284,
      y: 0.000226593008846976,
      z: -0.000523376453202218,
    },
    rotationWheel1: {
      x: 1.5707962925663523,
      y: 0,
      z: -1.5707962925663523,
    },
    rotationWheel2: {
      x: 0,
      y: -1.55,
      z: 0,
    },
    offsetWheel1: {
      l: -0.81,
      m: 0.36,
      n: -1.25,
    },
    offsetWheel2: {
      l: -0.91,
      m: 0.34,
      n: -1.3,
    },
    positionRim: {
      x: -0.113866649568081,
      y: 0.000145492551382631,
      z: -0.000531616213265806,
    },
  },
  {
    wheelNo: "wheel_1",
    wheelRim: "rim_fr",
    wheelName: "wheel_fr",
    positionWheel: {
      x: 0.0000596618629060686,
      y: -0.00000778198227635585,
      z: -0.000523223890922964,
    },
    rotationWheel1: {
      x: 1.5707962925663523,
      y: 0,
      z: -1.5707962925663523,
    },
    rotationWheel2: {
      x: 0,
      y: -1.55,
      z: 0,
    },
    offsetWheel1: {
      l: -0.787,
      m: 0.36,
      n: 1.35,
    },
    offsetWheel2: {
      l: -0.89,
      m: 0.34,
      n: 1.28,
    },
    positionRim: {
      x: -0.125263676047325,
      y: -0.000154266352183186,
      z: -0.000531463592778891,
    },
  },
  {
    wheelNo: "wheel",
    wheelRim: "rim_rl",
    wheelName: "wheel_rl",
    positionWheel: {
      x: -0.0000509643541590776,
      y: 0.0000704956037225202,
      z: -0.000523376453202218,
    },
    rotationWheel1: {
      x: -1.5707962925663523,
      y: 0,
      z: 1.5707962925663523,
    },
    rotationWheel2: {
      x: 0,
      y: 1.55,
      z: 0,
    },
    offsetWheel1: {
      l: 0.81,
      m: 0.36,
      n: -1.25,
    },
    offsetWheel2: {
      l: 0.91,
      m: 0.34,
      n: -1.15,
    },
    positionRim: {
      x: 0.125254824757576,
      y: 0.0000123596191770048,
      z: -0.000531616213265806,
    },
  },
];


export const colorMenu: any = [
  {
    name: "",
    type: "color",
    icon: "assets/images/Ellipse 4.svg",
    value: "#C1C1C1",
  },
  {
    name: "",
    type: "color",
    icon: "assets/images/Ellipse 5.svg",
    value: "#001357",
  },
  {
    name: "",
    type: "color",
    icon: "assets/images/Ellipse 6.svg",
    value: "#000000",
  }
]

export const rimMenu: any = [
  {
    name: "",
    type: "wheels",
    icon: "assets/images/Group 8329.svg",
    value: "Wheel1",
    modelPath: "assets/models/custom-parts/wheels/Wheel_Rim.glb",
  },
  {
    name: "",
    type: "wheels",
    icon: "assets/images/Group 8335.svg",
    value: "Wheel2",
    modelPath: "assets/models/custom-parts/wheels/Wheel_Rim2.glb",
  }

]


export const spoilerMenu: any = [
  {
    name: "",
    type: "spoiler",
    icon: "assets/images/Spoiler 1.svg",
    value: "Spoiler2",
    modelPath: "",
  }

]

export const menu: any = [
  {
    displayName: "Color",
    displayIcon: "assets/images/Group 17.svg",
    children: [

    ]
  },
  {
    displayName: "Wheels",
    displayIcon: "assets/images/Group 16.svg",
    children: [
      {
        name: "",
        type: "wheels",
        icon: "assets/images/Group 8329.svg",
        value: "Wheel1",
        modelPath: "assets/models/custom-parts/wheels/Wheel_Rim.glb",
      },
      {
        name: "",
        type: "wheels",
        icon: "assets/images/Group 8330.svg",
        value: "Wheel2",
        modelPath: "assets/models/custom-parts/wheels/Wheel_Rim2.glb",
      },
      // {
      //   name: "",
      //   type: "wheels",
      //   icon: "assets/images/Group 8331.svg",
      //   value: "Wheel3",
      // },
    ],
  },
  {
    displayName: "Spoiler",
    displayIcon: "assets/images/Group 14.svg",
    children: [
      {
        name: "",
        type: "spoiler",
        icon: "assets/images/Spoiler 1.svg",
        value: "Spoiler2",
        modelPath: "",
      },
      // {
      //   name: "",
      //   type: "spoiler",
      //   icon: "assets/images/Group 8331.svg",
      //   value: "Spoiler1",
      //   modelPath: "",
      // },
      // {
      // name: "",
      // type: "spoiler",
      // icon: "assets/images/Group 8331.svg",
      // value: "Spoiler2",
      // modelPath: "",
      // },
      // {
      //   name: "",
      //   type: "spoiler",
      //   icon: "assets/images/Group 8331.svg",
      //   value: "Spoiler3",
      //   modelPath: "",
      // },
    ],
  },
];

export const hotspots = [
  {
    id: 0,
    name: "glass",
    position: {
      x: 1.6,
      y: 0.85,
      z: 0.05,
    },
  },
  {
    id: 1,
    name: "light",
    position: {
      x: 1.27,
      y: 0.65,
      z: -1.58,
    },
  },
  {
    id: 2,
    name: "wheel",
    position: {
      x: 0.77,
      y: 0.4,
      z: -1.51,
    },
  },
  {
    id: 3,
    name: "dashboard",
    position: {
      x: -0.09,
      y: 0.7,
      z: 0.07,
    },
  },
  {
    id: 4,
    name: "horn",
    position: {
      x: -0.32,
      y: 0.7,
      z: -0.30,
    },
  },
];

export const INTIAL_CAR_POSITION_DATA = {
  initialCarPosition: {
    x: 0,
    y: 2,
    z: 0,
  },
  initialCameraPosition: {
    x: 2.962212140016285,
    y: 1.455397118159249,
    z: -3.742032831947579,
  },
  carZoomDistance: {
    maximumDistance: 5,
    minimumDistance: 5,
  },
};

export const LIGHTS_POSITION_DATA = [
  {
    name: "lightRight",
    position: {
      x: -0.79,
      y: 0.6,
      z: 2,
    },
  },
  {
    name: "lightLeft",
    position: {
      x: 0.79,
      y: 0.6,
      z: 2,
    },
  },
];

export const BRAND_LOGOS = [
  {
    id: 1,
    name: "Object028",
  },
  {
    id: 2,
    name: "Object022",
  },
  {
    id: 3,
    name: "Object009",
  },
  {
    id: 4,
    name: "Object016",
  },
  {
    id: 5,
    name: "SteeringWheel_Coloured",
  },
  {
    id: 6,
    name: "Object003",
  },
  {
    id: 7,
    name: "Object021",
  },
  {
    id: 8,
    name: "Object027",
  },
  {
    id: 9,
    name: "Object015",
  },
  {
    id: 10,
    name: "Object008",
  },
];

export const SPOILER_DATA = [
  {
    id: 1,
    name: "Trunk_Carbon1",
  },
  {
    id: 2,
    name: "Spoiler_Carbon1",
  },
  {
    id: 3,
    name: "Trunk_Coloured",
  },
  {
    id: 4,
    name: "Spoiler_Arm1_Coloured",
  },
  {
    id: 5,
    name: "Spoiler_Arm2_Coloured",
  },
  {
    id: 6,
    name: "Spoiler_PistonLower_Coloured",
  },
  {
    id: 7,
    name: "Spoiler_PistonUpper_Coloured",
  },
  {
    id: 8,
    name: "Spoiler_Coloured",
  },
];
