# How to make a multiplayer game with Colyseus and KAPLAY

If you have ever dreamed about making a multiplayer game but had no idea where to start or found it too hard to give it a try, now it's great time to give it a shot! There are many options to implement multiplayer in your game, but this time we are going to do so with a particular one, that is very easy to work with!

## About Colyseus

**Colyseus** is a fully-featured open source multi-player framework. It's versatile and scalable for any game genre. The key features we are going to take an advantage of are automatic state synchronization and creating a game room on demand. Having this ready out-of-the-box is a great initial help so you can focus on your game itself, instead of doing (basically a lot of) boilerplate work.

## This guide will cover:

* How to **get started** with Colyseus
* Explanation and creation of **state schemas** your game will and might use
* Creating a **simple game** with concepts mentioned
* Some **tips and tricks**

### Prerequisites or good to know/have:

* Same as **KAPLAY**'s: Node.js, npm and Git installed ideally
* There will be some TypeScript here and there, but very understandable
* Terms like client and server are shuffled a lot - client is either the game part of our client/server setup or person connecting to the server, server is the room/Colyseus part or dev server running in your terminal for each of them

## How to get started with Colyseus

The easiest way to make a game with Colyseus is by using the official KAPLAY + Colyseus quickstart repository.

1. Navigate to your project folder and clone the starting repository
```bash
git clone https://github.com/colyseus/kaplay.git kaplay-colyseus
```

2. Make it your own repository
```bash
# Linux (Bash)
cd kaplay-colyseus; rm -rf .git; git init; git add .; git commit -m "Init commit"

# Windows (PowerShell)
cd kaplay-colyseus; rm -r -Force .git; git init; git add .; git commit -m "Init commit"

# Windows (CMD)
cd kaplay-colyseus && rmdir /s /q .git && git init && git add . && git commit -m "Init commit"
```

After doing so, created `kaplay-colyseus` folder should contain two folders, `client` and `server`. As you might already suspect, all KAPLAY code will reside in the former and Colyseus in the latter folder.

## How is KAPLAY (client) communicating with Colyseus (server)

First of all, alongside your regular KAPLAY setup, there is also a Colyseus npm package installed alongside. This is an SDK library that initiates connection and communicates with your Colyseus server running.

The connection itself is done in two parts:

1. Establishing the server connection with the endpoint of your server `/client/src/core/colyseus.ts`:
```typescript
import { Client } from "colyseus.js";
export const colyseusSDK = new Client(
    `${location.protocol}//${location.host}/colyseus`,
);
```

2. Connecting the client to it `/client/src/App.ts`:
```typescript
import { colyseusSDK } from "./core/colyseus";
const room = await colyseusSDK.joinOrCreate<MyRoomState>("my_room", {
    name: "Ka",
});
```

## What are rooms in Colyseus

Room is basically a connection instance that players connect to. You can have many rooms like lobby and then game modes, but a single room is enough as well. You also define max clients per room, so when you have a game for 2 players, each couple will have their own separate room.

## How does room state work

In Colyseus for room state to work, you need to define a schema with all the properties your objects will have. For example, your room state will include players and each player will have an id, name, avatar, etc.

Example of the room state in `/server/src/schema/MyRoomState.ts`:
```typescript
import { MapSchema, Schema, type } from "@colyseus/schema";

export class Player extends Schema {
    @type("string")
    public sessionId: string;
    @type("string")
    public userId: string;
    @type("string")
    public avatar: string;
    @type("string")
    public name: string;
    @type("number")
    public x: number = 0;
    @type("number")
    public y: number = 0;
}

export class MyRoomState extends Schema {
    @type({ map: Player })
    players = new MapSchema<Player>();
}
```

## Testing your game

You can test your game on multiple devices in the same network by simply passing `--host` before starting the client dev server:

```bash
cd client
# Linux
npm run start -- --host
# Windows
npm run start -- -- --host
```

## Publishing your game

This will be the two part section as you need to deploy your server and host your game (client) somewhere online.

### Deploying Colyseus server

You have two options how to deploy your Colyseus server:

1. **Self-hosting**
   * You are free to host your Colyseus server anywhere you want
   * Check guides at https://docs.colyseus.io/deployment

2. **Colyseus cloud, premium managed hosting**
   * This is the easiest option that would take you around 10 minutes to get your server up and ready for production
   * Learn more at https://docs.colyseus.io/deployment/cloud

### Publishing your game (client)

For the client, you need to update the server endpoint in `/client/src/core/colyseus.ts`:

```typescript
export const SERVER_URL = !import.meta.env.PROD
    ? `${location.protocol}//${location.host}/colyseus`
    : "https://<region-random-code>.colyseus.cloud";

export const colyseusSDK = new Client(SERVER_URL);
```

Then build your game:
```bash
cd client
npm run build
```

The game will be built in the `/client/dist` folder, ready to be uploaded to your hosting platform of choice.

## Resources

* [Colyseus Documentation](https://docs.colyseus.io/)
* [KAPLAY Documentation](https://kaplayjs.com/)
* [Colyseus Discord](https://discord.gg/RY8rRS7)
* [KAPLAY Discord](https://discord.gg/kaplay)

## KAPLAY Level System

### addLevel(map: string[], opt: LevelOpt): GameObj<PosComp | LevelComp>

The `addLevel` function allows you to construct a level based on symbols. This is particularly useful for creating game levels in a readable and maintainable way.

#### Parameters:
- `map`: An array of strings representing your level layout
- `opt`: Level options including tile dimensions and symbol definitions

#### Example:
```typescript
addLevel([
    "                          $",
    "                          $",
    "           $$         =   $",
    "  %      ====         =   $",
    "                      =    ",
    "       ^^      = >    =   &",
    "===========================",
], {
    // define the size of tile block
    tileWidth: 32,
    tileHeight: 32,
    // define what each symbol means, by a function returning a component list
    tiles: {
        "=": () => [
            sprite("floor"),
            area(),
            body({ isStatic: true }),
        ],
        "$": () => [
            sprite("coin"),
            area(),
            pos(0, -9),
        ],
        "^": () => [
            sprite("spike"),
            area(),
            "danger",
        ],
    }
})
```

#### Key Features:
- Each symbol in the map can be mapped to a set of components
- Components can include sprites, physics bodies, areas, and custom tags
- The level is created as a game object with position and level components
- Tile dimensions can be customized to fit your game's needs

This level system is particularly useful when creating multiplayer games as it provides a consistent way to define and share level layouts between clients. 