# Java, Angular & Postgres

This is a starter project. It has alread configured the login and an TODO page.

## Dependencies


This project uses:

* Jakarta EE
* Thorntail
* Angular

### PostgreSQL

Start the database:

```bash
docker run --rm --name postgres-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=jap -p 5432:5432 -d postgres:13-alpine
```

Update the database schema:

```bash
mvn flyway:migrate
```


## Execute

```bash
mvn clean thorntail:run
```

## Creating dummy Users

```
insert into jap_users  (admin, email, first_name, last_name, hashed_password, username) 
select
	CAST((num % 2) as BOOLEAN) as admin,
	concat('user-', num, '@jap.com') as email,
	concat('User-', num) as first_name,
	concat('family') as last_name,
	'zzXGO/taDaQXGXRcT85fxQ==' as hashed_password,
	concat('user-', num) as username
from
	generate_series(1, 60) num;
```