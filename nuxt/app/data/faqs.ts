// Sara Hurtado
export type Faq = {
  id: number
  question: string
  answer: string
}

export const faqs: Faq[] = [
  {
    id: 1,
    question: '¿Qué es TrendPulse?',
    answer:
      'Es una plataforma que permite consultar y comparar tendencias en redes sociales a partir de las estadísticas de sus publicaciones.',
  },
  {
    id: 2,
    question: '¿Qué métricas puedo consultar?',
    answer:
      'Puedes consultar las visualizaciones, los me gusta, los comentarios y las veces que se comparte una publicación.',
  },
  {
    id: 3,
    question: '¿Para qué sirve comparar tendencias?',
    answer:
      'Permite analizar las diferencias entre sus métricas e identificar cuáles publicaciones reciben más atención e interacciones.',
  },
  {
    id: 4,
    question: '¿Más visualizaciones significa más interacción?',
    answer:
      'No necesariamente. Una publicación puede tener muchas visualizaciones y pocos me gusta, comentarios o compartidos. Por eso es útil revisar las métricas en conjunto.',
  },
]