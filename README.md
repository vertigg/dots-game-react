## Тестовое задание

Задача: реализовать игру точки.

В качестве клиента использовать SPA приложение (React + Redux)
При реализации серверной части, необходимо использовать Django + PostgreSQL

Стек технологий:
* Front End: React + Redux
* Back End: Python, Django
* Databse: PostgreSQL

[Правила игры](https://ru.wikipedia.org/wiki/%D0%A2%D0%BE%D1%87%D0%BA%D0%B8_(%D0%B8%D0%B3%D1%80%D0%B0))

Также после каждого хода, необходимо подсчитывать занятую площадь.

Для получения доступа к приложению, необходима авторизация.
Результаты всех игр необходимо сохранять в базе.

## Установка

1. Установить pipenv - `pip install pipenv`
2. Установить python пакеты `pipenv install`
3. Установить npm пакеты `cd frontend && npm i`
4. Забилдить React `npm run build`
5. Создать PostgreSQL базу:
    * Name `wemyit-test`
    * User `admin`
    * Password `admin`
6. Сделать миграцию в Django `cd .. && pipenv run python manage.py migrate`
7. Запустить локально `pipenv run python manage.py runserver`
8. Перейти на http://localhost:8000