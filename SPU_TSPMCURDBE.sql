CREATE OR REPLACE FUNCTION dbo."SPU_TSPMCURDBE" (
    "PS_CODSPM" character varying,
    "PS_CURR" character varying,
    "PS_TXTRATE" character varying,
    "PS_CODUSR" integer,
    "PS_COMCUR" bytea,
    "PS_CF_LEVEL" character varying,
    "PS_CODSTATUS" integer
)
RETURNS void AS
$BODY$
DECLARE
    -- existing variables
BEGIN
    -- existing code

    IF "PS_CODSTATUS" = 25 OR "PS_CODSTATUS" = 26 THEN
        -- existing code for 25 and 26
    ELSIF "PS_CODSTATUS" = 27 THEN
        -- new code for 27
        UPDATE "dbo"."TSPMDBE" SET "CODCUR" = "PS_CURR" WHERE "CODSPM" = "PS_CODSPM" AND "CODLEVEL" = "PS_CF_LEVEL" AND "FLAG" = 'Y';
        UPDATE "dbo"."TCDTFILEDBE" SET "CODCUR" = "PS_CURR" WHERE "CODSPM" = "PS_CODSPM" AND "CODSTATUS" = "PS_CODSTATUS" AND "FLAG" = 'Y';
    END IF;
END;
$BODY$
LANGUAGE plpgsql VOLATILE
COST 100;
ALTER FUNCTION dbo."SPU_TSPMCURDBE"(
    "PS_CODSPM" character varying,
    "PS_CURR" character varying,
    "PS_TXTRATE" character varying,
    "PS_CODUSR" integer,
    "PS_COMCUR" bytea,
    "PS_CF_LEVEL" character varying,
    "PS_CODSTATUS" integer
)
OWNER TO postgres;
