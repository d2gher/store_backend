# Storefront Backend Project

## Database set up

**Create user**

CREATE USER backend_user WITH PASSWORD "123456";
full_stack_user
**Create databases**

CREATE DATABASE store;
CREATE DATABASE store_test;

**Grant the user access to the databases**

GRANT ALL PRIVILEGES ON DATABASE store TO full_stack_user;
GRANT ALL PRIVILEGES ON DATABASE store_test TO full_stack_user;
GRANT pg_write_all_data TO full_stack_user;
GRANT pg_read_all_data TO full_stack_user;

## .env and databases and backend ports

### .env

POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store
POSTGRES_DB_TEST=store_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=123456
ENV=dev
BCRYPT_PASSWORD=shut_up_and_dance
SALT_ROUNDS=10
TOKEN_SECRET=when_dust_comes_west

### Databases and backend ports

Databases port: 5432
backend port: 3000
