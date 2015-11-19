## API Docs

### POST - /api/register (nickname)

** Success Response **

	  {
	   "id": 1,
	   "nickname": "aozisik",
	   "country": "United States",
	   "ip_address": "127.0.0.0",
	   "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdFwvYXBpXC9yZWdpc3RlciIsImlhdCI6IjE0NDc5MzQ2OTkiLCJleHAiOiIxNDQ3OTM4Mjk5IiwibmJmIjoiMTQ0NzkzNDY5OSIsImp0aSI6IjI5ZTcwYjczNDI4MjM3ZTk0MWQzNjg2ODI3NGRhMzFiIn0.iT9VsNdo7w8kl2eyIewKTtGihT303wMOY-PdxYj81aI",
	   "created_at": "2015-11-19 12:04:59",
	   "updated_at": "2015-11-19 12:04:59"
	  }

** Error Response **

	{
		"error": "This nickname is already acquired"
	}
	
	
### GET - /api/scores/top_players

** Success Response **

	[
		{"nickname": "aozisik", "total_score": 5 },
		{"nickname": "ilterocal", "total_score": 4 },
		{"nickname": "samet", "total_score": 3 }
	]
	
### GET - /api/scores/top_countries

** Success Response **

	[
		{"name": "Turkey", "score": 232 },
		{"name": "England", "score": 120 },
		{"name": "Germany", "score": 50 }
	]