interface LetterPath {
  path: string;
  description: string;
  filename: string;
  extention: string;
}

export const letters: Record<string, LetterPath> = {
  TUTOR_APPROBAL: {
    path: '/pdfs/aprobacion_tutor.docx',
    description: 'Carta de aprobación de tutor',
    filename: 'carta_aprobacion_tutor',
    extention: 'docx',
  },
  TUTOR_ASSIGNMENT: {
    path: '/pdfs/carta_tutor.docx',
    description: 'Carta de designación de tutor',
    filename: 'carta_asignacion_tutor',
    extention: 'docx',
  },
  REVIEWER_APPROBAL: {
    path: '/pdfs/aprobacion_tutor.docx',
    description: 'Carta de aprobación de tutor',
    filename: 'carta_aprobacion_tutor',
    extention: 'docx',
  },
  REVIEWER_ASSIGNMENT: {
    path: '/pdfs/carta_nombramiento_revisor.docx',
    description: 'Carta de designación de revisor',
    filename: 'carta_asignacion_revisor',
    extention: 'docx',
  },
};
