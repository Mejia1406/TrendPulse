export type Metric = {
  id: number
  title: string
  description: string
}

export const metrics: Metric[] = [
  {
    id: 1,
    title: 'Visualizaciones',
    description:
      'Indican cuántas veces se ha visto una publicación. Permiten observar la atención que recibe un contenido.',
  },
  {
    id: 2,
    title: 'Me gusta',
    description:
      'Indican cuántas reacciones de me gusta recibe una publicación. Ayudan a identificar el interés del público por un contenido.',
  },
  {
    id: 3,
    title: 'Comentarios',
    description:
      'Indican cuántos comentarios recibe una publicación. Permiten observar la participación del público en la conversación.',
  },
  {
    id: 4,
    title: 'Compartidos',
    description:
      'Indican cuántas veces se comparte una publicación. Ayudan a entender cómo los usuarios difunden un contenido.',
  },
]