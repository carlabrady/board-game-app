CREATE TABLE "users" (
  "id" serial primary key,
  "username" varchar(80) not null UNIQUE,
  "password" varchar(240) not null
);

CREATE TABLE "games" (
	"id" serial primary key,
	"rank" Numeric,
	"bgg_url" text,
	"game_id" Numeric,
	"names" text,
	"min_players" Numeric,
	"max_players" Numeric,
	"avg_time" Numeric,
	"min_time" Numeric,
	"max_time" Numeric,
	"year" Numeric,
	"avg_rating" Numeric,
	"geek_rating" Numeric,
	"num_votes" Numeric,
	"image_url" text,
	"age" Numeric,
	"mechanic" text,
	"owned" Numeric,
	"category" text,
	"designer" text,
	"weight" Numeric
);

CREATE TABLE users_games (
    users_id integer NOT NULL REFERENCES users,
    games_id integer NOT NULL REFERENCES games,
    "owned" boolean,
    "wants"boolean,
    PRIMARY KEY (users_id, games_id)
);
