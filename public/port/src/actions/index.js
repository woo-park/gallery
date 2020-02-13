const mockProjects = [
  {
    id: 1,
    title: 'Wave Generator',
    description: 'wave descrip',
    link: '/whatever',
    videoURL: './vids/wavegenerator_0x_540p.mp4',
    counts: 0,
  },
  {
    id: 2,
    title: 'Alt Tage Generator',
    description: 'temp',
    link: '/whatever',
    videoURL:'./vids/altgenerator_0x.mp4',
    counts: 0,
  },
  {
    id: 3,
    title: 'Wave Generator',
    description: 'wave descrip',
    link: '/whatever',
    videoURL: './vids/wavegenerator_0x_540p.mp4',
    counts: 0,
  },
  {
    id: 4,
    title: 'Alt Tage Generator',
    description: 'temp',
    link: '/whatever',
    videoURL:'./vids/altgenerator_0x.mp4',
  },
  {
    id: 5,
    title: 'Wave Generator',
    description: 'wave descrip',
    link: '/whatever',
    videoURL: './vids/wavegenerator_0x_540p.mp4',
  },
  {
    id: 6,
    title: 'Alt Tage Generator',
    description: 'temp',
    link: '/whatever',
    videoURL:'./vids/altgenerator_0x.mp4',
  },
  {
    id: 7,
    title: 'Wave Generator',
    description: 'wave descrip',
    link: '/whatever',
    videoURL: './vids/wavegenerator_0x_540p.mp4',
  },
  {
    id: 8,
    title: 'Alt Tage Generator',
    description: 'temp',
    link: '/whatever',
    videoURL:'./vids/altgenerator_0x.mp4',
  },
  {
    id: 9,
    title: 'Wave Generator',
    description: 'wave descrip',
    link: '/whatever',
    videoURL: './vids/wavegenerator_0x_540p.mp4',
  },
  {
    id: 10,
    title: 'Alt Tage Generator',
    description: 'temp',
    link: '/whatever',
    videoURL:'./vids/altgenerator_0x.mp4',
  },
  {
    id: 11,
    title: 'Wave Generator',
    description: 'wave descrip',
    link: '/whatever',
    videoURL: './vids/wavegenerator_0x_540p.mp4',
  },
  {
    id: 12,
    title: 'Alt Tage Generator',
    description: 'temp',
    link: '/whatever',
    videoURL:'./vids/altgenerator_0x.mp4',
  },
  {
    id: 13,
    title: 'Wave Generator',
    description: 'wave descrip',
    link: '/whatever',
    videoURL: './vids/wavegenerator_0x_540p.mp4',
  },
  {
    id: 14,
    title: 'Alt Tage Generator',
    description: 'temp',
    link: '/whatever',
    videoURL:'./vids/altgenerator_0x.mp4',
  },
]

export function fetchProjects() {
  return {
    type: 'RECEIVE_ENTITIES',
    payload: {
      projects: mockProjects
    }
  }
}

export function thumbsUp(projectId) {
  return {
    type: 'COUNT_UP',
    payload: {
      projectId: projectId
    }
  }
}
