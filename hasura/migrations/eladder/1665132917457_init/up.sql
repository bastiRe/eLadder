SET check_function_bodies = false;
CREATE TABLE public.games (
    id character varying(255) NOT NULL,
    scores jsonb NOT NULL,
    league_id character varying(255) NOT NULL,
    date timestamp with time zone NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE public.knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);
CREATE SEQUENCE public.knex_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.knex_migrations_id_seq OWNED BY public.knex_migrations.id;
CREATE TABLE public.knex_migrations_lock (
    is_locked integer
);
CREATE TABLE public.leagues (
    id character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE public.players (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    league_id character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE public.teams (
    id integer NOT NULL,
    player_id character varying(255) NOT NULL,
    game_id character varying(255) NOT NULL,
    team_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE SEQUENCE public.teams_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.teams_id_seq OWNED BY public.teams.id;
ALTER TABLE ONLY public.knex_migrations ALTER COLUMN id SET DEFAULT nextval('public.knex_migrations_id_seq'::regclass);
ALTER TABLE ONLY public.teams ALTER COLUMN id SET DEFAULT nextval('public.teams_id_seq'::regclass);
ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.leagues
    ADD CONSTRAINT leagues_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.players
    ADD CONSTRAINT players_name_league_id_unique UNIQUE (name, league_id);
ALTER TABLE ONLY public.players
    ADD CONSTRAINT players_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_pkey PRIMARY KEY (id);
CREATE INDEX games_league_id_index ON public.games USING btree (league_id);
CREATE INDEX players_league_id_index ON public.players USING btree (league_id);
ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_league_id_foreign FOREIGN KEY (league_id) REFERENCES public.leagues(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.players
    ADD CONSTRAINT players_league_id_foreign FOREIGN KEY (league_id) REFERENCES public.leagues(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_game_id_foreign FOREIGN KEY (game_id) REFERENCES public.games(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_player_id_foreign FOREIGN KEY (player_id) REFERENCES public.players(id);
