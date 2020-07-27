-- public.address definition

-- Drop table

-- DROP TABLE public.address;

CREATE TABLE public.address (
	"id" serial NOT NULL,
	"way" varchar NULL,
	"main" int4 NULL,
	"letter" bpchar(1) NULL,
	"sub" int4 NULL,
	"pos" int4 NULL,
	"bis" bool NULL,
	"sur" bool NULL,
	"sha" varchar NULL,
	"first_pwd" varchar NULL
);