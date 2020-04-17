
CREATE TABLE "owners" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(100)
);


CREATE TABLE "pets" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(100) NOT NULL,
	"owner_id" INT REFERENCES "owners"
);


INSERT INTO "owners" ("name")
VALUES ('Dane'), ('Meyer'), ('Rachel'), ('Collin');

INSERT INTO "pets" ("name", "owner_id")
VALUES ('Ibis', 1), ('Felix', 2), ('Lily', 4), ('Atticus', 3);

SELECT "pets".name as pet_name, "owners".name as owner_name FROM "pets" 
  JOIN "owners" ON "pets".owner_id = "owners".id;