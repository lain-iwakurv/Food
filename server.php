<?php
$_POST = json_decode(file_get_contents('php://input'), true); // чтобы в php коде получать JSON данные и работать с ними. потому что php не умеет работать с форматом JSON
echo var_dump($_POST); // берет те данные который пришли с клиента превращают в строку и обратно показывают на клиенте

// этот файл мы создали чтобы видеть что бэкенд нормально принимает данные /Users/kroxa/Downloads/Food_dist/server.php  

// $_POST:

// Это суперглобальный массив в PHP, который содержит данные, отправленные на сервер через HTTP-запрос методом POST (например, из HTML-формы).
// Ключами массива являются имена полей формы, а значениями — данные, введённые пользователем.
// var_dump():

// Это встроенная функция PHP, которая выводит информацию о переменной, включая её тип данных и структуру.
// echo:

// Используется для вывода результата функции var_dump() в ответе сервера.