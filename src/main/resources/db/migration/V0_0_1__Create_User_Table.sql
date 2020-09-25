CREATE TABLE public.jap_users (
	id              serial NOT NULL,
	username        varchar(100) NOT NULL,
	email           varchar(100) NOT NULL,
	first_name      varchar(25)  NOT NULL,
	last_name       varchar(25)  NOT NULL,
	hashed_password varchar(100) NOT NULL,
	admin           boolean      NOT NULL DEFAULT FALSE,
	enabled         boolean      NOT NULL DEFAULT TRUE,
	CONSTRAINT users_pk          PRIMARY KEY (id),
	CONSTRAINT users_un_id       UNIQUE (id),
	CONSTRAINT users_un_username UNIQUE (username),
	CONSTRAINT users_un_email    UNIQUE (email)
);
