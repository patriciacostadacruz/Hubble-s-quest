# Jerry's rules

<img src="/images/gameScreen.png">

## Description

After years of fighting crime, this time you'll find Jerry in our lovely Barcelona. He only has one goal: ban robberies and allow Barcelona to find its tranquility once again.
Jerry once was this mellow and calm husband we all knew in Rick & Morty, but after his divorce with Bet, Jerry found his true vocation: saving the world.
He has been traveling around the globe and didn't leave a city until crime was completely eradicated.
With Jerry in Barcelona, carteritas (robbers) won't last long.

## User stories MVP

Minimum user stories:

- User can see a start screen with instructions and controls, a loosing screen and also an end game screen.
- User can see a board with player and enemies/friends appearing from the right and a score and bullets left.
- User can shoot enemies to kill them and win points.
- User can recharge bullets.
- User can loose if a friendly NPC is killed of if a non-friendly NPC collisions with him.

## User stories Backlog

- Collision between a bullet and an enemy plays a sound effect.
- Trying to shoot with no bullet plays a sound effect.
- Trying to recharge with bullets left also plays a sound effect.
- Messages are displayed when user levels up, recharges with bullets or shoots with no bullets.
- Level increases as the game goes.
- NPCs go faster as level goes up.
- User can see level showing at the bottom right of the screen.

## File structure

- <code>index.html</code>: contains the game basic HTML structure
- <code>game.js</code>: contains all the elements for the game to work.
- <code>scripts.js</code>: contains all the DOM/canvas manipulation code to start the game
- <code>assets.js</code>: contains all the media needed for the game (images, sounds, etc)
- <code>player.js</code>: contains the player class and methods
- <code>npc.js</code>: contains the npcs class and methods
- <code>bullet.js</code>: contains the bullet class and methods
- <code>images folder</code>: contains all the game images
- <code>musics folder</code>: contains all the game sound effects and music
- <code>style.css</code>: contains the game visual design elements

## Useful links

- [Presentation slides](https://slides.com/d/i2gY3oE/live) 
- [Deployed game](https://patriciacostadacruz.github.io/Jerry-s-rules/) 
