-- public.address definition

-- Drop table

-- DROP TABLE public.address;

CREATE TABLE public.address (
	"ID" serial NOT NULL,
	"WAY" varchar NULL,
	"MAIN" int4 NULL,
	"LETTER" bpchar(1) NULL,
	"SUB" int4 NULL,
	"POS" int4 NULL,
	"BIS" bool NULL,
	"SUR" bool NULL,
	"SHA" varchar NULL,
	"FIRST_PWD" varchar NULL
);