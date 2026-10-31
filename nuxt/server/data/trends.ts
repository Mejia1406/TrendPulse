export type Trend = {
  id: string
  name: string
  category: string
  socialMedia: string
  description: string
}

export const trends: Trend[] = [
  {
    id: '1',
    name: '#TechNews',
    category: 'Tecnología',
    socialMedia: 'X',
    description:
      'Conversación sobre lanzamientos de productos y novedades del sector tecnológico que gana tracción en publicaciones cortas y en tiempo real.',
  },
  {
    id: '2',
    name: 'Receta en 60 segundos',
    category: 'Gastronomía',
    socialMedia: 'TikTok',
    description:
      'Formato de video corto donde se prepara una receta completa en menos de un minuto, impulsado por ediciones rápidas y música de fondo.',
  },
  {
    id: '3',
    name: 'Rutina de productividad',
    category: 'Estilo de vida',
    socialMedia: 'Instagram',
    description:
      'Publicaciones que muestran hábitos y rutinas diarias para mejorar la organización personal, apoyadas en imágenes y carruseles.',
  },
  {
    id: '4',
    name: 'Resumen de partido',
    category: 'Deportes',
    socialMedia: 'YouTube',
    description:
      'Videos que condensan los momentos clave de un evento deportivo, con un alto número de visualizaciones durante las horas posteriores al partido.',
  },
]
