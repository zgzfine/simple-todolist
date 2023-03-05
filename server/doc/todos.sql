-- ----------------------------
-- Table structure for todos
-- ----------------------------
DROP TABLE IF EXISTS "public"."todos";
CREATE TABLE "public"."todos" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "content" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "status" bool NOT NULL DEFAULT false,
  "userid" int4
)
;

-- ----------------------------
-- Primary Key structure for table todos
-- ----------------------------
ALTER TABLE "public"."todos" ADD CONSTRAINT "todos_pkey" PRIMARY KEY ("id");




