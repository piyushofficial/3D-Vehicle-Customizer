export const SHOWROOM_DATA: any = {
  scenes: [
    {
      id: "0-s1",
      name: "s1",
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
        {
          tileSize: 512,
          size: 1024,
        },
      ],
      faceSize: 1024,
      initialViewParameters: {
        yaw: -3.105974000623725,
        pitch: 0.11184557801684036,
        fov: 1.3863376160017342,
      },
      linkHotspots: [
        {
          yaw: 5.99993699,
          pitch: 0.4289213296650672,
          rotation: 0,
          target: "0-s1",
          destination: "product",
          title: "Configure",
          id: "product",
        },
      ],
      infoHotspots: [],
    },
  ],
  name: "Project Title",
  settings: {
    mouseViewMode: "drag",
    autorotateEnabled: true,
    fullscreenButton: false,
    viewControlButtons: false,
  },
};
