select * from movies


INSERT INTO GENEROS(NAME) VALUES('Drama'),('Crime'),('Action'),('Biography'),('History'),('Adventure'),('Romance'),('Sci-Fi'),('Mystery'),('Thriller')
/*
DO $$
DECLARE
    pel JSONB;
	p text;
BEGIN
pel := '{
    "id": 2,
    "title": "The Godfather",
    "year": 1972,
    "director": "Francis Ford Coppola",
    "duration": 175,
    "poster": "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    "genre": ["Crime", "Drama"],
    "rate": 9.2
  }
';
FOR p IN 
        SELECT * FROM jsonb_array_elements_text(pel->'genre')
    LOOP
        RAISE NOTICE 'Género encontrado: %', p;
    END LOOP;
END $$;

*/
CREATE OR REPLACE PROCEDURE PROCESAR_PELI(MOVIE JSONB,INOUT m_id UUID DEFAULT NULL)
LANGUAGE plpgsql
AS $$
DECLARE
 m_gen text;
 BEGIN
	m_id := coalesce((movie->>'id')::UUID, gen_random_uuid());
 	insert into movies (id,title,year,director,duration,poster,rate) values 
	 (m_id,movie->>'title',(movie->>'year')::int,movie->>'director',(movie->>'duration')::int,movie->>'poster',(movie->>'rate')::decimal);
	for m_gen in 
		select *  from jsonb_array_elements_text(movie->'genre')
		LOOP 
			insert into movie_genero (id_movie,genero_id)values(m_id,(select id from generos where name =  m_gen));
		end loop;
	commit;
end $$



/*
-- Le pasamos NULL en el segundo parámetro para que regrese el UUID generado
CALL PROCESAR_PELI('{
    "title": "Inception",
    "year": 2010,
    "director": "Christopher Nolan",
    "duration": 148,
    "poster": "https://...",
    "genre": ["Action", "Sci-Fi"],
    "rate": 8.8
}', NULL);

*/

 
select m.id,m.title,m.yearmm.director,m.duration,m.poster,m.rate from movies m 
inner join movie_genero mg on mg.id_movie = m.id
inner join generos g on g.id = mg.genero_id
where g.name = 'Action'



SELECT 
    m.id, 
    m.title, 
    m.year, 
    m.director, 
    m.duration, 
    m.poster, 
    m.rate,
    jsonb_agg(g.name) AS genres 
FROM movies m
LEFT JOIN movie_genero mg ON mg.id_movie = m.id
LEFT JOIN generos g ON g.id = mg.genero_id
GROUP BY m.id;

update movies set year = year-1  where year<=2000 


