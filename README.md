# Hubble's quest

<img src="/images/game-screen.png">

## Description

After Hubble telescope was launched in 1990, alien populations have started being attacked by some alien monster. Aspart of the Independant Wizards Mission (IWM), you player is charged with a mission: go to planet BetaX-2 and kill the enemies to allow friendly and nice aliens to live in peace.

## User stories MVP

Minimum user stories:

- User can see a start screen with instructions and controls, a loosing screen and also an end game screen.
- User can see a board with player and enemies/friends appearing from the right and a score and bullets at the left.
- User can shoot enemies to kill them and win points.
- User can recharge bullets.
- User can loose if a friendly NPC is killed of if a non-friendly NPC collisions with him.

## User stories Backlog

- Trying to shoot with no bullet plays a sound effect.
- Trying to recharge with bullets left also plays a sound effect.
- Messages are displayed when user levels up, recharges with bullets or shoots with no bullets.
- Level increases as the game goes.
- NPCs go faster as level goes up.
- User can see level showing at the bottom left of the screen.

## File structure

- <code>index.html</code>: contains the game basic HTML structure
- <code>game.js</code>: contains all the elements for the game to work.
- <code>scripts.js</code>: contains all the DOM/canvas manipulation code to start the game
- <code>assets.js</code>: contains all the media needed for the game (images, sounds, etc)
- <code>player.js</code>: contains the player class and methods
- <code>npc.js</code>: contains the npcs class and methods
- <code>ovni.js</code>: contains the ovni class
- <code>bullet.js</code>: contains the bullet class and methods
- <code>images folder</code>: contains all the game images
- <code>musics folder</code>: contains all the game sound effects and music
- <code>style.css</code>: contains the game visual design elements

## Useful links

- [Presentation slides](https://slides.com/patriciacostadacruz/deck)
- [Deployed game](https://github.com/patriciacostadacruz/Hubble-s-quest/settings/pages)
