
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "public"."leagues" alter column "id" set default gen_random_uuid();

alter table "public"."players" alter column "id" set default gen_random_uuid();

alter table "public"."games" alter column "id" set default gen_random_uuid();

alter table "public"."teams" drop constraint "teams_player_id_foreign",
  add constraint "teams_player_id_fkey"
  foreign key ("player_id")
  references "public"."players"
  ("id") on update no action on delete cascade;

alter table "public"."teams" drop constraint "teams_game_id_foreign",
  add constraint "teams_game_id_fkey"
  foreign key ("game_id")
  references "public"."games"
  ("id") on update no action on delete cascade;
