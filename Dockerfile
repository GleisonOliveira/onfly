FROM php:8.3-fpm-alpine AS base
ARG TZ
ENV PHP_OPCACHE_VALIDATE_TIMESTAMPS="0" \
    PHP_OPCACHE_MAX_ACCELERATED_FILES="10000" \
    PHP_OPCACHE_MEMORY_CONSUMPTION="192" \
    PHP_OPCACHE_MAX_WASTED_PERCENTAGE="10" \
    PHP_OPCACHE_JIT_BUFFER_SIZE="80M" 

COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer

RUN apk add --virtual build-dependencies ${PHPIZE_DEPS}
RUN apk add openssl ca-certificates librdkafka-dev libxml2-dev oniguruma-dev zip libzip-dev linux-headers tzdata libjpeg-turbo-dev libpng-dev libwebp-dev freetype-dev libpq-dev unzip libmcrypt-dev icu-dev supervisor
RUN cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime
RUN docker-php-ext-install -j$(nproc) bcmath ctype fileinfo mbstring pdo pdo_pgsql dom pcntl opcache gd zip intl \
    && pecl install excimer redis rdkafka apcu mcrypt \
    && docker-php-ext-enable excimer redis rdkafka mcrypt intl \
    && apk del build-dependencies \
    && docker-php-ext-configure gd --with-jpeg --with-webp --with-freetype

COPY api/docker/supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY api/docker/8.3/docker-php-ext-opcache.ini /usr/local/etc/php/conf.d/docker-php-ext-opcache.ini

RUN mkdir -p /opt/apps/www /opt/apps/www/bin

WORKDIR /opt/apps/www

RUN addgroup -S composer \
    && adduser -S composer -G composer \
    && chown -R composer /opt/apps/www

# FROM node:20-alpine AS frontend
# COPY --from=composer_base /opt/apps/www /opt/apps/www
# WORKDIR /opt/apps/www

# RUN npm install && \
#     npm run build

FROM base AS consumers
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]

FROM base AS fpm_server

ENTRYPOINT ["./docker/entrypoint.sh"]
CMD ["php-fpm"]


FROM nginx:alpine AS web_server
WORKDIR /opt/apps/www

COPY api/docker/nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY api/docker/nginx/nginx.conf /etc/nginx/nginx.conf
