# Users List

Проект представляет собой веб-приложение для управления списком пользователей с функционалом аутентификации и отображения информации о пользователях.

## Технологии

- **Frontend:**
  - React 18
  - TypeScript
  - Redux Toolkit
  - React Router
  - Tailwind CSS
  - Axios

- **Backend:**
  - Node.js
  - Express
  - TypeScript
  - SQLite (TypeORM)
  - JWT для аутентификации

## Структура проекта

```
users-list/
├── client/                 # Frontend часть
│   ├── src/
│   │   ├── components/    # React компоненты
│   │   ├── store/        # Redux store
│   │   ├── api/          # API клиент
│   │   ├── models/       # TypeScript интерфейсы
│   │   └── utils/        # Вспомогательные функции
│   └── public/           # Статические файлы
└── server/               # Backend часть
    ├── src/
    │   ├── routes/      # Express маршруты
    │   ├── config/      # Конфигурация
    │   ├── models/      # TypeORM модели
    │   └── middleware/  # Middleware
    └── data/           # SQLite база данных
```

## Установка и запуск

1. Клонируйте репозиторий:
```bash
git clone https://github.com/yourusername/users-list.git
cd users-list
```

2. Установите зависимости для клиента:
```bash
cd client
npm install
```

3. Установите зависимости для сервера:
```bash
cd ../server
npm install
```

4. Создайте файл `.env` в директории `server`:
```env
PORT=3001
JWT_SECRET=your_jwt_secret
```

5. Запустите сервер:
```bash
cd server
npm run dev
```

6. В новом терминале запустите клиент:
```bash
cd client
npm run dev
```

## Функциональность

### Аутентификация
- Регистрация новых пользователей
- Вход в систему
- JWT аутентификация
- Защищенные маршруты

### Управление пользователями
- Просмотр списка пользователей
- Отображение информации о пользователе
- Возможность поставить лайк пользователю
- Адаптивный дизайн для мобильных устройств

### Безопасность
- Хеширование паролей
- JWT токены
- Защита от SQL-инъекций
- Валидация входных данных

## API Endpoints

### Аутентификация
- `POST /api/auth/register` - Регистрация нового пользователя
- `POST /api/auth/login` - Вход в систему

### Пользователи
- `GET /api/users` - Получение списка пользователей
- `GET /api/users/:id` - Получение информации о конкретном пользователе

## Разработка

### Структура базы данных
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Основные компоненты
- `UserCard` - Карточка пользователя с основной информацией
- `UsersPage` - Страница со списком пользователей
- `LoginPage` - Страница входа
- `RegistrationPage` - Страница регистрации

## Тестирование

Для запуска тестов:
```bash
cd client
npm test
```

## Лицензия

MIT
