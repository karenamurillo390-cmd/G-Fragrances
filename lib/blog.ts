export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  keywords: string[];
  paragraphs: string[];
  faqs: Array<{ question: string; answer: string }>;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'mejores-perfumes-hombre', title: 'Los mejores perfumes para hombre: guía para elegir', description: 'Una guía práctica para elegir perfumes para hombre según ocasión, concentración y estilo.', date: '2026-07-26', keywords: ['mejores perfumes para hombre', 'perfumes masculinos originales', 'men fragrances'],
    paragraphs: ['El mejor perfume para hombre es el que acompaña su estilo y el momento en que lo usa. Para diario, las composiciones frescas con cítricos, maderas limpias y notas aromáticas suelen ser versátiles.', 'Para noches o eventos especiales, un eau de parfum con ámbar, especias, cuero u oud ofrece más presencia. Probar un sample o decant permite descubrir cómo evoluciona la fragancia en la piel antes de elegir una botella completa.'],
    faqs: [{ question: '¿Qué concentración dura más?', answer: 'En general, parfum y eau de parfum tienen una concentración mayor que eau de toilette, aunque la duración final depende de la fórmula y de la piel.' }, { question: '¿Cómo elegir un perfume para uso diario?', answer: 'Busca una fragancia equilibrada, con buena proyección sin ser invasiva, y pruébala durante varias horas antes de comprar.' }],
  },
  {
    slug: 'que-es-un-decant', title: '¿Qué es un decant de perfume y por qué probarlo?', description: 'Aprende qué es un decant, cómo elegir su tamaño y cómo descubrir perfumes originales antes de comprar una botella.', date: '2026-07-26', keywords: ['qué es un decant', 'perfume decants', 'decants Colombia', 'decants USA'],
    paragraphs: ['Un decant es una porción de una fragancia original transferida cuidadosamente a un atomizador de menor tamaño. Es una forma práctica de probar perfumes de diseñador, nicho o árabes sin comprar una botella completa.', 'Los tamaños de 3 ml, 5 ml y 10 ml permiten explorar una fragancia en diferentes contextos. Para una prueba inicial, úsala varios días: el clima, la piel y la ocasión cambian notablemente su percepción.'],
    faqs: [{ question: '¿Un decant es un perfume original?', answer: 'Un decant debe provenir de una fragancia original y conservarse en un atomizador limpio y correctamente identificado.' }, { question: '¿Qué tamaño de decant elegir?', answer: '3 ml es ideal para conocer una fragancia; 5 ml y 10 ml ofrecen más usos para evaluar su versatilidad.' }],
  },
  {
    slug: 'perfumes-originales-vs-imitaciones', title: 'Perfumes originales vs. imitaciones: cómo comprar con confianza', description: 'Claves para identificar una compra de perfumes originales y elegir tiendas confiables.', date: '2026-07-26', keywords: ['perfumes originales vs imitaciones', 'comprar perfumes originales', 'original perfumes'],
    paragraphs: ['Comprar perfumes originales implica revisar la procedencia, la presentación, la política de servicio y la información clara del vendedor. Un precio inusualmente bajo, detalles de empaque incoherentes o ausencia de soporte son señales para investigar antes de comprar.', 'La autenticidad no se define solo por un código o una foto. Una tienda especializada debe ofrecer información completa del producto y atención para resolver dudas sobre concentración, tamaño y envío.'],
    faqs: [{ question: '¿El empaque por sí solo confirma autenticidad?', answer: 'No. El empaque puede aportar señales, pero la trazabilidad y la reputación del vendedor son igual de importantes.' }, { question: '¿Por qué cambian los precios de un perfume?', answer: 'Varían por tamaño, concentración, disponibilidad, impuestos, origen y condiciones de distribución.' }],
  },
];
