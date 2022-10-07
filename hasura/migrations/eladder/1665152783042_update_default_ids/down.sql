
alter table "public"."teams" drop constraint "teams_game_id_fkey",
  add constraint "teams_game_id_foreign"
  foreign key ("game_id")
  references "public"."games"
  ("id") on update no action on delete cascade;

alter table "public"."teams" drop constraint "teams_player_id_fkey",
  add constraint "teams_player_id_foreign"
  foreign key ("player_id")
  references "public"."players"
  ("id") on update no action on delete no action;

ALTER TABLE "public"."games" ALTER COLUMN "id" drop default;

ALTER TABLE "public"."players" ALTER COLUMN "id" drop default;

ALTER TABLE "public"."leagues" ALTER COLUMN "id" drop default;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE EXTENSION IF NOT EXISTS pgcrypto;
