#!/usr/bin/env bash

# Valores padrão
DB1=${POSTGRES_DB:-api}
DB2=${POSTGRES_DB_TEST:-api_test}

# Função para verificar se um banco de dados existe
database_exists() {
psql -U "$POSTGRES_USER" -lqt | cut -d \| -f 1 | grep -qw "$1"
}

# Criar o banco de dados e as tabelas se não existirem
if ! database_exists "$DB1"; then
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE $DB1;
EOSQL
fi

if ! database_exists "$DB2"; then
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE $DB2;
EOSQL
fi
