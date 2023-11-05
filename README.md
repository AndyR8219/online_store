Определить таблицы БД и их схемы:

Пользователи (users): id / login / password / role_id

Роли (roles): id / name

Товары (products): id / title / image_url / category / price / quantity

Комментарии (comments): id / author_id / post_id / content

Определить схему состояния на BFF.
сессия текущего пользователя: login / password / role

Определить схему для Redux Store.

user:
id
login
roleId
posts: массив post:
id
title
imageUrl
publishedAt
commentsCount
post:
id
title
imageUrl
content
publishedAt
comments: массив comment:
id
author
content
publishedAt
users: массив user:
id
login
registeredAt
role
