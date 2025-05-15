# addLevel

## Function Signature
```typescript
addLevel(map: string[], opt: LevelOpt): GameObj<PosComp | LevelComp>
```

## Description
Constructs a level based on symbols. This function allows you to create game levels using a simple text-based representation where each character in the map corresponds to a specific game object or tile.

## Parameters

### map: string[]
An array of strings representing your level layout. Each string represents a row in your level, and each character in the string represents a tile or game object.

### opt: LevelOpt
Level options object containing:
- `tileWidth`: number - Width of each tile in pixels
- `tileHeight`: number - Height of each tile in pixels
- `tiles`: object - Mapping of symbols to component lists

## Returns
A game object with position and level components.

## Example
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

## Usage Notes
- Each symbol in the map can be mapped to a set of components
- Components can include sprites, physics bodies, areas, and custom tags
- The level is created as a game object with position and level components
- Tile dimensions can be customized to fit your game's needs
- Empty spaces in the map (spaces) are ignored
- The map is read from top to bottom, left to right

## Version
Available since v2000.0 