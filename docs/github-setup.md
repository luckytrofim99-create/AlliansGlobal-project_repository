# Настройка GitHub

Репозиторий: https://github.com/luckytrofim99-create/AlliansGlobal-project_repository

## Защита main и dev вручную

Открыть Settings → Branches → Add branch protection rule. Создать отдельное правило для `main`, затем для `dev`.

В каждом правиле включить:

- Require a pull request before merging.
- Require approvals → Required number of approvals before merging: **1**.
- Dismiss stale pull request approvals when new commits are pushed.
- Require status checks to pass before merging → добавить check **ci** (job ci из workflow CI).
- Require branches to be up to date before merging.
- Require conversation resolution before merging.
- Do not allow bypassing the above settings (применять также к администратору/владельцу).
- Allow force pushes и Allow deletions оставить выключенными; список обхода требований PR оставить пустым.

Проверка `ci` появится в поиске после первого PR с workflow. Создать feature-ветку с содержательным изменением, открыть PR в dev, дождаться CI и выбрать `ci` в обоих правилах. Не путать название workflow CI с названием check ci.

### Ограничение push только владельцу

Репозиторий принадлежит личному аккаунту. Classic branch protection поддерживает настройку Restrict who can push to matching branches только для репозиториев организаций. Если поле доступно в вашей конфигурации, включить его и выбрать только `luckytrofim99-create`, без команд и приложений. Если поля нет, не считать это правило настроенным: для буквального ограничения по actor потребуется поддерживаемый ruleset/репозиторий организации. Удаление доступа других соавторов — отдельное решение владельца, оно автоматически не выполняется.

Официальная документация: https://docs.github.com/en/rest/branches/branch-protection#update-branch-protection

При требовании одного approval автор PR не может одобрить собственный PR: для работы нужен другой пользователь с правом рецензирования. Правила не следует обходить ради первого merge.

## Secrets и variables

Текущий CI выполняет только проверки и не требует добавлять secrets. `GITHUB_TOKEN` выдаётся GitHub автоматически; в workflow ему оставлено только contents: read.

Следующие имена — предложение для **будущих** сценариев, которые сейчас не реализованы. Ничего добавлять заранее без выбранной схемы развёртывания не требуется.

| Назначение | Secrets | Variables (несекретные параметры) |
| --- | --- | --- |
| FTP/FTPS | FTP_USERNAME, FTP_PASSWORD | FTP_HOST, FTP_PORT, FTP_REMOTE_DIR |
| VPS по SSH | VPS_USER, VPS_SSH_KEY, VPS_SSH_PASSPHRASE (если нужна) | VPS_HOST, VPS_PORT, VPS_DEPLOY_PATH, VPS_KNOWN_HOSTS (проверенный публичный ключ хоста) |
| Telegram-уведомления | TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID | — |
| Публичный URL сайта | — | NEXT_PUBLIC_SITE_URL |

Добавление: Settings → Secrets and variables → Actions → Secrets → New repository secret. Ввести имя и значение в интерфейсе GitHub, затем Add secret. Для несекретных параметров открыть вкладку Variables → New repository variable. Значения не помещать в чат, README, workflow или Git.

Локальные `.env*`, `api/config.php`, приватные ключи, `.npmrc`, `.netrc` и папки инструментов исключены через .gitignore. Секреты в уже отслеживаемом файле .gitignore не скрывает: до коммита проверять staged diff. Обнаруженный опубликованный секрет нужно отозвать/заменить и отдельно очистить историю.
