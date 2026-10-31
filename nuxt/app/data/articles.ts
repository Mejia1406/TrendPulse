export type Article = {
  id: string
  title: string
  summary: string
  content: string
}

export const articles: Article[] = [
  {
    id: '1',
    title: '¿Qué es una tendencia en redes sociales?',
    summary:
      'Una introducción a las tendencias y su difusión en plataformas digitales.',
    content:
      'Una tendencia en redes sociales es un tema, formato o contenido que recibe una gran cantidad de atención durante un periodo determinado. Las tendencias pueden surgir de conversaciones, noticias, videos, canciones o retos compartidos por los usuarios.',
  },
  {
    id: '2',
    title: 'Métricas para analizar una tendencia',
    summary:
      'Conoce algunas métricas para entender el alcance de una publicación.',
    content:
      'Las visualizaciones, los me gusta, los comentarios y las veces que se comparte una publicación ayudan a entender cómo interactúa el público con un contenido. Analizar estas métricas en conjunto permite obtener una visión más completa de una tendencia.',
  },
  {
    id: '3',
    title: '¿Por qué comparar tendencias entre redes sociales?',
    summary:
      'Descubre por qué un mismo tema puede comportarse diferente en cada plataforma.',
    content:
      'Cada red social tiene una audiencia y formas de interacción diferentes. Por eso, comparar el comportamiento de una tendencia entre plataformas puede ayudar a identificar dónde recibe más atención y cómo participa el público.',
  },
]
