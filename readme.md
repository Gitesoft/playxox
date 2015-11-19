# Play XOX

## Game Modes

+ CPU -> Player vs. Computer
+ Random -> Player vs. Random Player
+ Friend -> Player vs. Player

## Data Structures and Events

### Client -> API

**joinLobby**

	{
		type: "random" // other options: computer, friend
	}

### Redis Server -> Client

**joinGame**

	{
		"id": "34431", // game-id
		"players": [
			{
				id: "3", // user-id
				char: "X",
				nickname: "aozisik"
			},
			{
				id: "5", // user-id
				char: "O",
				nickname: "ilterocal"
			}			
		],
		turn: "3", // user-id
		state: [
			[null, null, "O"],
			[null, null, "O"],
			["X", "X", null]
		],
		winner: null // veya kazanan kullanıcının id'si
	}




## Components

### Front-End Game Engine

This is a single page Angular application.

* Listens to the socket (we should first mock this behavior) and reflect player moves on the UI. 
* Regulates the game by detecting the turns (whose turn is it?) and letting the player make a move. The move should not be directly reflected to the UI, but sent to the back-end layer, from where it will later arrive as a move through the socket (de-coupling of the UI and the game engine)
* Displays user score
* Effectively prevents cheating, hacking, etc. (security concerncs)

### Back-end Game Engine

* Regulates game channels (creating private game channels of two players)
* Regulates random match-making
* Enables custom match-making (waiting for a specific user to connect)
* Keep track of users and scores
* Effectively prevents cheating, hacking, etc. (security concerncs)
* Bridges the UI with AI Player
* Pushes user moves to the UI via redis

### AI Player (CPU)

* Minimax algorithm
* Uses a global interface so other AI implementations can be built
* Never loses :)


## Challenges

* Making an otherwise boring game actually fun to play (at least for a while).
* Should be playable on desktop and mobile.
* Attractive user interface
* Absolute team work :)