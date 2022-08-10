# Учебный проект: Mesto (Frontend + Backend)
## Mesto - это интерактивная страница, где пользователи могут делиться фотографиями.

+ Репозиторий для приложения проекта `Mesto`, включающий фронтенд и бэкенд части приложения со следующими возможностями: авторизации и регистрации пользователей, операции с карточками и пользователями. Бэкенд в директории `backend/`, а фронтенд - в `frontend/`.
+ Frontend — часть приложения, написанная на React JS. Backend — часть приложения, написанная на Node.js, Express.js.
+ Создан облачный сервер и развёрнут API, установлено всё необходимое для работы приложения. Для создания облачного сервера использована платформа Яндекс.Облако, так как она предоставляет грант для студентов Я.Практикума.
***
## Frontend
+ Добавление и удаление фотографий, "лайк" для фотографии, редактирование профиля пользователя, данные хранятся на сервере и загружаются с сервера, сделаны Popup которые можно открыть и закрыть.
+ Использованые технологии построения сетки Flex и Grid.
+ При сжатии экрана элементы на странице меняют свое поведение и размер с помощью медиа запросов @media.
+ Используются семантические теги.
+ CSS классы по методологии БЭМ.
+ Файловая структура Nested БЭМ.
+ Вёрстка по макету в Figma.
***
## Backend
### REST API для проектной работы "Mesto", связанное с базой данных MongoDB. При запуске приложения подключается к mongo по адресу: mongodb://localhost:27017/mestodb. В приложении описана схема пользователя и схема карточки.

## Роуты для пользователей:
+ GET /users - возвращает всех пользователей.
+ GET /users/:userId - возвращает пользователя по переданному id.
+ GET /users/me - возвращает текущего пользователя.
+ PATCH /users/me - обновляет данные пользователя.
+ PATCH /users/me/avatar - обновляет аватар пользователя.

## Роуты для карточек:

+ GET /cards - возвращает все карточки из базы данных.
+ POST /cards - создаёт карточку.
+ DELETE /cards/:cardId - удаляет карточку по переданному id.

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
  
## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload    
`npm run lint` — проверка кода линтером    

Публичный IP-адрес сервера: 51.250.97.169    
Домен: http://konstantinskutin.nomoredomains.xyz/