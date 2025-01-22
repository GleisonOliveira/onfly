#!/bin/sh

chmod 777 -R storage bootstrap/cache
find ./storage/ -type f -iname "*.gitignore" -exec chmod 644 {} \;
find ./bootstrap/ -type f -iname "*.gitignore" -exec chmod 644 {} \;

php artisan migrate

exec "$@"
