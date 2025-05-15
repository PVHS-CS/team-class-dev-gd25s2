# Game Project

A 2D game built with Kaboom.js.

## Project Structure

```
tests_multifile/
├── docs/                    # Documentation files
│   ├── multiplayer-guide.md
│   ├── optimization_docs.md
│   └── addLevel-docs.md
├── levels/                  # Game levels
├── objects/                 # Game objects and components
├── sprites/                 # Game sprites and assets
├── assets.js               # Asset management and loading
├── game.js                 # Main game initialization
├── helpers.js              # Utility functions
├── levelManager.js         # Level management
├── player.js               # Player implementation
└── index.html              # Entry point
```

## Setup

1. Make sure you have a local server running (e.g., using Python's `http.server` or Node's `http-server`)
2. Open `index.html` in your browser

## Development

- `assets.js`: Handles all asset loading and management
- `game.js`: Main game initialization and scene setup
- `helpers.js`: Utility functions for sprite drawing and optimization
- `levelManager.js`: Manages level transitions and loading
- `player.js`: Player character implementation

## Documentation

See the `docs/` directory for detailed documentation:
- `multiplayer-guide.md`: Multiplayer implementation guide
- `optimization_docs.md`: Performance optimization tips
- `addLevel-docs.md`: Level creation guide 