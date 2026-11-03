# Docker и Railway

Версия dev2 с глобусом: ветка `codex/alliance-global-dev2-globe`.

## Локальный Docker

```sh
docker build -t alliance-global:dev2 .
docker run --rm -p 3000:3000 alliance-global:dev2
```

Откройте http://localhost:3000. Для другого внутреннего порта задайте
`-e PORT=8080 -p 8080:8080`.

Образ собирает Next.js в режиме standalone и запускает Node.js от отдельного
пользователя без root. Статические файлы и фотографии включены в образ.
Секреты, локальные настройки и node_modules исключены из контекста.

## Railway

Подключите репозиторий и ветку `codex/alliance-global-dev2-globe`.
Railway использует Dockerfile и railway.toml. Команды build/start вручную
не задавайте. Сервер слушает 0.0.0.0 и PORT, предоставленный Railway.
Проверка готовности обращается к `/`. Создайте публичный Railway domain.

`NEXT_PUBLIC_SITE_URL` задаётся перед сборкой как build argument; при
необходимости установите его в Railway равным публичному HTTPS-адресу и
пересоберите сервис. Это значение попадает в metadataBase на этапе сборки.

Форма консультации остаётся прототипом: отправка в CRM не подключена.
