Сущности приложения:

-   пользователь: БД (список пользователей), BFF (сессия текущего), стор (отображение в браузере)
-   роль пользователя: БД (список ролей), BFF (сессия пользователя), стор (использование на клиенте)
-   товар: БД (список товаров), стор (отображение в браузере)

Определить таблицы БД и их схемы:

-   пользователи (users): id / login / password / registed_at / role_id
-   роли (roles): id / name
-   товары (products): id / title / price / quantity / description / category / image_url /

Определить схему состояния на BFF:

-   сессия текущего пользователя: login / password / role

Определить схему для Redux Store:

-   users: массив user: id / login / registeredAt / role
-   user: id / login / roleId
-   products: массив product: id / title / imageUrl / category / price / quantity
-   product: id / title / imageUrl / category / price
