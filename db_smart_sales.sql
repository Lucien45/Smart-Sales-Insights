--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Ubuntu 16.4-1.pgdg22.04+2)
-- Dumped by pg_dump version 16.4 (Ubuntu 16.4-1.pgdg22.04+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: utilisateurs_type_enum; Type: TYPE; Schema: public; Owner: toavina
--

CREATE TYPE public.utilisateurs_type_enum AS ENUM (
    'user',
    'superuser'
);


ALTER TYPE public.utilisateurs_type_enum OWNER TO toavina;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: toavina
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    nom character varying NOT NULL
);


ALTER TABLE public.categories OWNER TO toavina;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: toavina
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO toavina;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: toavina
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: clients; Type: TABLE; Schema: public; Owner: toavina
--

CREATE TABLE public.clients (
    id integer NOT NULL,
    nom character varying NOT NULL,
    prenom character varying NOT NULL,
    "idUtilisateurId" integer NOT NULL,
    "numeroPhone" character varying DEFAULT '12356'::character varying NOT NULL,
    email character varying DEFAULT '12356'::character varying NOT NULL
);


ALTER TABLE public.clients OWNER TO toavina;

--
-- Name: clients_id_seq; Type: SEQUENCE; Schema: public; Owner: toavina
--

CREATE SEQUENCE public.clients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.clients_id_seq OWNER TO toavina;

--
-- Name: clients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: toavina
--

ALTER SEQUENCE public.clients_id_seq OWNED BY public.clients.id;


--
-- Name: produits; Type: TABLE; Schema: public; Owner: toavina
--

CREATE TABLE public.produits (
    id integer NOT NULL,
    nom character varying NOT NULL,
    prix numeric NOT NULL,
    stock integer NOT NULL,
    "idCategorie" integer
);


ALTER TABLE public.produits OWNER TO toavina;

--
-- Name: produits_id_seq; Type: SEQUENCE; Schema: public; Owner: toavina
--

CREATE SEQUENCE public.produits_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.produits_id_seq OWNER TO toavina;

--
-- Name: produits_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: toavina
--

ALTER SEQUENCE public.produits_id_seq OWNED BY public.produits.id;


--
-- Name: utilisateurs; Type: TABLE; Schema: public; Owner: toavina
--

CREATE TABLE public.utilisateurs (
    id integer NOT NULL,
    username character varying NOT NULL,
    mail character varying NOT NULL,
    password character varying NOT NULL,
    type public.utilisateurs_type_enum DEFAULT 'user'::public.utilisateurs_type_enum NOT NULL,
    date_creation timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.utilisateurs OWNER TO toavina;

--
-- Name: utilisateurs_id_seq; Type: SEQUENCE; Schema: public; Owner: toavina
--

CREATE SEQUENCE public.utilisateurs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.utilisateurs_id_seq OWNER TO toavina;

--
-- Name: utilisateurs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: toavina
--

ALTER SEQUENCE public.utilisateurs_id_seq OWNED BY public.utilisateurs.id;


--
-- Name: ventes; Type: TABLE; Schema: public; Owner: toavina
--

CREATE TABLE public.ventes (
    id integer NOT NULL,
    nombre integer NOT NULL,
    date_achat timestamp without time zone DEFAULT now() NOT NULL,
    "idClientId" integer,
    "idProduitId" integer
);


ALTER TABLE public.ventes OWNER TO toavina;

--
-- Name: ventes_id_seq; Type: SEQUENCE; Schema: public; Owner: toavina
--

CREATE SEQUENCE public.ventes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ventes_id_seq OWNER TO toavina;

--
-- Name: ventes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: toavina
--

ALTER SEQUENCE public.ventes_id_seq OWNED BY public.ventes.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: toavina
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: clients id; Type: DEFAULT; Schema: public; Owner: toavina
--

ALTER TABLE ONLY public.clients ALTER COLUMN id SET DEFAULT nextval('public.clients_id_seq'::regclass);


--
-- Name: produits id; Type: DEFAULT; Schema: public; Owner: toavina
--

ALTER TABLE ONLY public.produits ALTER COLUMN id SET DEFAULT nextval('public.produits_id_seq'::regclass);


--
-- Name: utilisateurs id; Type: DEFAULT; Schema: public; Owner: toavina
--

ALTER TABLE ONLY public.utilisateurs ALTER COLUMN id SET DEFAULT nextval('public.utilisateurs_id_seq'::regclass);


--
-- Name: ventes id; Type: DEFAULT; Schema: public; Owner: toavina
--

ALTER TABLE ONLY public.ventes ALTER COLUMN id SET DEFAULT nextval('public.ventes_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: toavina
--

COPY public.categories (id, nom) FROM stdin;
1	Kiraro
2	AKANJO
3	POKETRA
4	FIRAVAKA
5	Electronique
6	instrument
\.


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: toavina
--

COPY public.clients (id, nom, prenom, "idUtilisateurId", "numeroPhone", email) FROM stdin;
1	Toavina	Sylvianno	2	12356	12356
2	RAKKOTO	Maditra	2	12356	12356
3	Ralaimongo	Zanany	2	12356	12356
4	Gasy	Mijaly	2	12356	12356
5	Ralaimongo	Zanany	3	12356	12356
6	Gasy	Mijaly	3	12356	12356
7	Toavina	Sylvianno	3	12356	12356
8	RAKKOTO	Maditra	3	12356	12356
\.


--
-- Data for Name: produits; Type: TABLE DATA; Schema: public; Owner: toavina
--

COPY public.produits (id, nom, prix, stock, "idCategorie") FROM stdin;
1	Air Jord 23	40000	10	1
2	Mocassin	50000	5	1
3	Timberland	80000	2	1
4	Kappa Kito	30000	20	1
5	Aigle d or	40000	20	1
6	Maillot Real	60000	30	2
7	RObe enfant	30000	16	2
8	Polo Nike	40000	23	2
9	Lobaka Mihaja	44000	29	2
10	Nike pour femme	60000	30	3
11	Pour homme	30000	16	3
12	Pour enfant Nike	40000	23	3
13	Harona Mihaja	44000	29	3
14	Kavina	60000	30	4
15	Bracelet	30000	16	4
16	Rojo	40000	23	4
17	Vakana	44000	29	4
18	Collier	100000	15	4
19	Television	60000	30	5
20	Radio	30000	16	5
21	Telephone	40000	23	5
22	Baffle	44000	29	5
23	Mixer	100000	15	5
24	Guitare	60000	30	6
25	Piano	30000	16	6
26	Batterie	40000	23	6
27	Sodina	44000	29	6
28	Aponga	100000	15	6
\.


--
-- Data for Name: utilisateurs; Type: TABLE DATA; Schema: public; Owner: toavina
--

COPY public.utilisateurs (id, username, mail, password, type, date_creation) FROM stdin;
2	test	test@test.com	$2b$10$12VABR2Mf1qa0xbQJspE.eAxCDfI/14l4QgT2Sz6fC2QawYT5ykfi	superuser	2024-12-03 09:14:24.901
3	user	user@test.com	$2b$10$UE1KheqtYU7CHMWVuYbWZumGs0Wx/225Ofmrdl6sbc1z3Uc54zBiK	user	2024-12-03 09:51:39.001
\.


--
-- Data for Name: ventes; Type: TABLE DATA; Schema: public; Owner: toavina
--

COPY public.ventes (id, nombre, date_achat, "idClientId", "idProduitId") FROM stdin;
4	4	2024-12-03 10:24:37.855405	2	1
5	6	2024-12-03 10:24:37.855405	3	1
6	4	2024-12-03 10:25:20.68041	2	2
7	1	2024-12-03 10:25:20.68041	3	2
8	1	2024-12-03 10:25:49.224931	2	3
9	4	2024-12-03 10:27:23.946448	6	7
10	6	2024-12-03 10:27:23.946448	5	12
11	4	2024-12-03 10:27:40.171067	6	7
12	6	2024-12-03 10:27:40.171067	5	12
13	5	2024-12-03 10:27:40.171067	5	5
14	6	2024-12-03 10:27:40.171067	6	6
15	4	2024-12-03 10:27:58.930975	8	7
16	3	2024-12-03 10:27:58.930975	3	12
17	4	2024-12-03 10:29:52.492019	8	7
18	3	2024-12-03 10:29:52.492019	3	16
19	4	2024-12-03 10:29:58.572875	8	7
20	3	2024-12-03 10:29:58.572875	3	24
21	4	2024-12-03 10:30:04.50098	8	7
22	3	2024-12-03 10:30:04.50098	8	23
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: toavina
--

SELECT pg_catalog.setval('public.categories_id_seq', 6, true);


--
-- Name: clients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: toavina
--

SELECT pg_catalog.setval('public.clients_id_seq', 8, true);


--
-- Name: produits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: toavina
--

SELECT pg_catalog.setval('public.produits_id_seq', 28, true);


--
-- Name: utilisateurs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: toavina
--

SELECT pg_catalog.setval('public.utilisateurs_id_seq', 3, true);


--
-- Name: ventes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: toavina
--

SELECT pg_catalog.setval('public.ventes_id_seq', 22, true);


--
-- Name: categories PK_24dbc6126a28ff948da33e97d3b; Type: CONSTRAINT; Schema: public; Owner: toavina
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY (id);


--
-- Name: produits PK_738095029a8d184b11939537702; Type: CONSTRAINT; Schema: public; Owner: toavina
--

ALTER TABLE ONLY public.produits
    ADD CONSTRAINT "PK_738095029a8d184b11939537702" PRIMARY KEY (id);


--
-- Name: utilisateurs PK_d3c39b551c51a0bdc76e07b9197; Type: CONSTRAINT; Schema: public; Owner: toavina
--

ALTER TABLE ONLY public.utilisateurs
    ADD CONSTRAINT "PK_d3c39b551c51a0bdc76e07b9197" PRIMARY KEY (id);


--
-- Name: clients PK_f1ab7cf3a5714dbc6bb4e1c28a4; Type: CONSTRAINT; Schema: public; Owner: toavina
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY (id);


--
-- Name: ventes PK_f2ab45fd7d5872486d54499501d; Type: CONSTRAINT; Schema: public; Owner: toavina
--

ALTER TABLE ONLY public.ventes
    ADD CONSTRAINT "PK_f2ab45fd7d5872486d54499501d" PRIMARY KEY (id);


--
-- Name: utilisateurs UQ_202e0806bbcbef48ecb4cb73435; Type: CONSTRAINT; Schema: public; Owner: toavina
--

ALTER TABLE ONLY public.utilisateurs
    ADD CONSTRAINT "UQ_202e0806bbcbef48ecb4cb73435" UNIQUE (username);


--
-- Name: utilisateurs UQ_69813a01d3f155ad62f3b4a694d; Type: CONSTRAINT; Schema: public; Owner: toavina
--

ALTER TABLE ONLY public.utilisateurs
    ADD CONSTRAINT "UQ_69813a01d3f155ad62f3b4a694d" UNIQUE (mail);


--
-- Name: clients FK_0dee8dde30338ab7cd547b5eb48; Type: FK CONSTRAINT; Schema: public; Owner: toavina
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT "FK_0dee8dde30338ab7cd547b5eb48" FOREIGN KEY ("idUtilisateurId") REFERENCES public.utilisateurs(id);


--
-- Name: ventes FK_2dd15252289dc26320cb0b1244a; Type: FK CONSTRAINT; Schema: public; Owner: toavina
--

ALTER TABLE ONLY public.ventes
    ADD CONSTRAINT "FK_2dd15252289dc26320cb0b1244a" FOREIGN KEY ("idClientId") REFERENCES public.clients(id);


--
-- Name: ventes FK_73bf64daf5419d3078669b9d5ec; Type: FK CONSTRAINT; Schema: public; Owner: toavina
--

ALTER TABLE ONLY public.ventes
    ADD CONSTRAINT "FK_73bf64daf5419d3078669b9d5ec" FOREIGN KEY ("idProduitId") REFERENCES public.produits(id);


--
-- Name: produits FK_d64b42090432efdceb9f9aed44d; Type: FK CONSTRAINT; Schema: public; Owner: toavina
--

ALTER TABLE ONLY public.produits
    ADD CONSTRAINT "FK_d64b42090432efdceb9f9aed44d" FOREIGN KEY ("idCategorie") REFERENCES public.categories(id);


--
-- PostgreSQL database dump complete
--

