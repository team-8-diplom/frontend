export interface MockTopic {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  institute: string;
  teacher: string;
  email: string;
  skills: string[];
  author_type: 'teacher' | 'student';
}

export const MOCK_TOPICS_ALL: MockTopic[] = [
  {
    id: '1',
    title: 'Разработка системы управления учебным процессом',
    description: 'Веб-приложение для автоматизации учебного процесса в вузе',
    fullDescription:
      'Детальное описание проекта: разработка веб-приложения на React + FastAPI, интеграция с БД PostgreSQL, реализация ролевой модели доступа, система уведомлений.',
    institute: 'ИКТ',
    teacher: 'Иванов Иван Иванович',
    email: 'ivanov@example.com',
    skills: ['Стрессоустойчивость', 'C++', 'React', 'PostgreSQL'],
    author_type: 'teacher',
  },
  {
    id: '2',
    title: 'Анализ данных в образовательных системах',
    description: 'Методы ML для анализа успеваемости студентов',
    fullDescription:
      'Исследование и реализация моделей машинного обучения для прогнозирования успеваемости, кластеризации студентов и рекомендаций.',
    institute: 'ИНЭУ',
    teacher: 'Петрова Анна Сергеевна',
    email: 'petrova@example.com',
    skills: ['Python', 'scikit-learn', 'Pandas', 'SQL'],
    author_type: 'teacher',
  },
  {
    id: '3',
    title: 'Разработка мобильного приложения для студентов',
    description: 'Кроссплатформенное приложение для расписания и заданий',
    institute: 'ИКТ',
    teacher: 'Сидоров Алексей Петрович',
    email: 'sidorov@example.com',
    skills: ['Flutter', 'Dart', 'Firebase'],
    author_type: 'teacher',
  },
  {
    id: '4',
    title: 'Кибербезопасность в корпоративных сетях',
    description: 'Исследование угроз и методы защиты',
    institute: 'ИГС',
    teacher: 'Козлова Мария Дмитриевна',
    email: 'kozlova@example.com',
    skills: ['Сетевые протоколы', 'Wireshark', 'Python'],
    author_type: 'teacher',
  },
  {
    id: '5',
    title: 'Распознавание речи нейросетями',
    description: 'Создание системы ASR для образовательных целей',
    institute: 'ИПФКС',
    teacher: 'Новиков Дмитрий Александрович',
    email: 'novikov@example.com',
    skills: ['TensorFlow', 'Keras', 'Python'],
    author_type: 'teacher',
  },
  {
    id: '6',
    title: 'Оптимизация баз данных',
    description: 'Методы оптимизации реляционных БД при высоких нагрузках',
    institute: 'ИМО',
    teacher: 'Смирнова Елена Владимировна',
    email: 'smirnova@example.com',
    skills: ['PostgreSQL', 'Индексирование', 'PL/pgSQL'],
    author_type: 'teacher',
  },
  // темы от студентов
  {
    id: '7',
    title: 'ИИ в медицине',
    description: 'Применение нейросетей для диагностики',
    institute: 'ИМО',
    teacher: 'Студент А.А.',
    email: 'student_a@example.com',
    skills: ['PyTorch', 'CNN'],
    author_type: 'student',
  },
  {
    id: '8',
    title: 'Экологические ГИС',
    description: 'Геоинформационные системы для мониторинга',
    institute: 'ИГС',
    teacher: 'Студент Б.Б.',
    email: 'student_b@example.com',
    skills: ['QGIS', 'Python'],
    author_type: 'student',
  },
];
