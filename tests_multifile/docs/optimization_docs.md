Optimizing Kaplay Performance for Large Worlds
When a Kaplay game has thousands of sprites on a large map, performance suffers if every object is updated and drawn each frame. A key strategy is culling and batching. Kaplay provides an offscreen() component to automatically pause or hide objects out of view. For example:
// Hide and pause flowers when off-camera
k.add([
    k.sprite("flower"),
    k.pos(randX, randY),
    k.offscreen({ hide: true, pause: true }),
]);
This tells Kaplay not to draw or update the sprite when it’s outside the camera view
kaplayjs.com
. You can also use offscreen({destroy:true}) to remove one-off objects (like bullets) once they leave the screen, preventing buildup. In practice, attach offscreen({ hide: true, pause: true }) to any static or long-lived object (decorations, coins, etc.) so Kaplay skips them when off-camera
kaplayjs.com
.
Code tip: Use the offscreen component in your add() calls, e.g.
add([ k.sprite("block"), k.pos(x,y), k.offscreen({ hide:true, pause:true }) ]);
This ensures Kaplay culls and pauses the object when it’s not visible
kaplayjs.com
.
Minimize Per-Object Overhead
Kaplay game objects (with components) carry overhead. If your map has many static tiles or background sprites, consider drawing them manually instead of using full objects. Kaplay’s guide notes that creating objects for static images is expensive; you can use onDraw + drawSprite loops instead
kaplayjs.com
github.com
. For example, rather than k.add([ sprite("grass"), pos(x,y) ]) for each tile, you could do:
// In a scene setup:
k.onDraw(() => {
    for (let i = 0; i < levelTiles.length; i++) {
        const tile = levelTiles[i];
        k.drawSprite({ sprite: tile.spriteName, pos: tile.pos });
    }
});
This way, Kaplay issues one draw call per tile and you avoid per-object logic. The performance guide explicitly says drawing sprites in a loop (with drawSprite or drawUVQuad) is faster than using many Sprite components
github.com
. In fact, UVQuads (textured quads) are slightly faster than sprites, since they skip sprite-resolution overhead. For truly static tilemaps, you could even use a mesh or custom shader to batch all tiles in one GPU call (advanced).
Code example: Use k.drawSprite in your own loop instead of adding a game object:
k.onDraw(() => {
  tiles.forEach(t => {
    k.drawSprite({ sprite: t.type, pos: t.pos });
  });
});
This eliminates the object-component overhead
kaplayjs.com
github.com
.
Pre-render Static Content (Canvas/Texture)
You can pre-render large static layers into a single texture. Kaplay’s makeCanvas() lets you draw once off-screen and then reuse it every frame
v4000.kaplayjs.com
. For example:
const bgCanvas = k.makeCanvas(worldWidth, worldHeight);
bgCanvas.draw(() => {
  // Draw all static background tiles and shapes here
  tiles.forEach(t => {
    drawSprite({ sprite: t.spriteName, pos: t.pos });
  });
});
// In your onDraw or object draw:
k.onDraw(() => {
  drawCanvas({ canvas: bgCanvas, pos: k.vec2(0,0) });
});
This draws the entire background in one go at runtime. By rendering to a hidden texture first and then blitting it with a single draw, you greatly reduce the number of draw calls
stackoverflow.com
v4000.kaplayjs.com
. As one expert notes, “drawing to a visible canvas is very expensive… Do all of your individual piece drawings to a hidden canvas, then draw that hidden canvas to the visible canvas in a single step”
stackoverflow.com
. Use makeCanvas() or even loadSpriteAtlas to consolidate many images into one sprite sheet.
Code suggestion: Pre-draw static layers:
const worldCanvas = k.makeCanvas(mapWidth, mapHeight);
worldCanvas.draw(() => {
  // draw entire tile map once
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      const tile = map[x][y];
      if (tile) {
        k.drawSprite({ sprite: tile.id, pos: k.vec2(x*tileW, y*tileH) });
      }
    }
  }
});
// Then in the game loop:
k.onDraw(() => {
  k.drawCanvas({ canvas: worldCanvas, pos: k.vec2(0,0) });
});
This draws thousands of tiles with one GPU call
stackoverflow.com
v4000.kaplayjs.com
.
Physics and Spatial Partitioning
For collision and physics, use static bodies and spatial partitioning. Mark static environment objects (floors, walls) with body({ isStatic: true }) so they don’t incur dynamic updates
kaplayjs.com
. In Kaplay:
add([ sprite("floor"), area(), body({ isStatic: true }) ]);
Static bodies won’t move or respond to forces, which simplifies collision resolution
kaplayjs.com
. Kaplay’s physics already uses a spatial hash by default (see KAPLAYOpt.hashGridSize) to accelerate broad-phase collision detection
kaplayjs.com
. You can tune hashGridSize when initializing Kaplay based on map scale. Larger grid cells mean fewer buckets but more objects per cell; smaller cells mean tighter checks. For huge maps, you might increase hashGridSize to avoid many small buckets:
const k = kaplay({
  pixelDensity: 1,
  hashGridSize: 128,  // adjust based on your world size
});
Finally, if you implement your own update loop for game logic, consider only updating objects near the player. For example, divide the world into regions or chunks and only process those within the camera’s radius. This manual spatial partitioning (quadtrees, grid cells, etc.) reduces O(n²) checks down to O(n) or better
gameprogrammingpatterns.com
. In practice, maintain lists of enemies or items per region and skip far-away ones.
Batching and Texture Atlases
Rendering can also be sped up by batching similar sprites. Kaplay groups draw calls by texture; if you mix different sprite textures or shapes, the renderer has to flush the GPU between them, hurting performance
github.com
. To maximize batching:
Use sprite atlases: Pack many tiles or sprites into one image (via loadSpriteAtlas) so they share a texture.
Group by component type: For example, draw all sprite-based objects, then all polygon/shapes, to avoid flushes
github.com
.
Use layers: Kaplay supports layers (k.setLayers(["bg","obj","ui"], "obj")), so you can separate background tiles, game objects, and UI. This ensures you draw all background sprites together, then objects, which can improve batching.
Remember the performance tip: “If you mix sprite and polygon objects, batching will be disabled since each change of texture or blend mode means flushing to the GPU. To make best use of batching, draw sprites and other drawables grouped
github.com
.” In code, try to avoid interleaving different sprite sheets or draw modes in the same frame.
Engine Options and Miscellany
Finally, tune Kaplay’s settings. For high-resolution screens, set pixelDensity: 1 so Kaplay doesn’t render at retina scale (which can halve performance)
kaplayjs.com
:
const k = kaplay({
  pixelDensity: 1,
  hashGridSize: 64,
});
Also disable debug or verbose logging in production. Use Kaplay’s built-in optimizations: for example, Kaplay’s particle emitter (particle()) can replace manually spawning many small objects like sparks
kaplayjs.com
. Avoid creating/destroying thousands of game objects per frame; instead reuse objects or use Kaplay timers (obj.timer()) for explosion lifetimes, as recommended by Kaplay’s guides
kaplayjs.com
kaplayjs.com
. In summary, focus on culling off-screen objects, drawing static content in bulk (via onDraw or canvases), using static bodies and spatial hash for physics, and batching textures. These practical techniques – many built into Kaplay – will dramatically improve performance on large maps. Sources: Kaplay’s official optimization tips and docs
kaplayjs.com
kaplayjs.com
kaplayjs.com
github.com
github.com
kaplayjs.com
kaplayjs.com
, and general HTML5 canvas best practices
stackoverflow.com
.
Citations
Favicon
KAPLAY Guides, Optimization

https://kaplayjs.com/guides/optimization/
Favicon
KAPLAY Guides, Optimization

https://kaplayjs.com/guides/optimization/
Favicon
Performance guide · kaplayjs/kaplay Wiki · GitHub

https://github.com/kaplayjs/kaplay/wiki/Performance-guide
Favicon
KAPLAY Guides, Canvas

https://v4000.kaplayjs.com/guides/canvas/
Favicon
javascript - Canvas 2D context really slow to draw hundreds or thousands of images - Stack Overflow

https://stackoverflow.com/questions/72174310/canvas-2d-context-really-slow-to-draw-hundreds-or-thousands-of-images
Favicon
KAPLAY Docs, BodyComp

https://kaplayjs.com/doc/BodyComp/
Favicon
KAPLAY Docs, KAPLAYOpt

https://kaplayjs.com/doc/KAPLAYOpt/
Favicon
Spatial Partition · Optimization Patterns · Game Programming Patterns

https://gameprogrammingpatterns.com/spatial-partition.html
Favicon
Performance guide · kaplayjs/kaplay Wiki · GitHub

https://github.com/kaplayjs/kaplay/wiki/Performance-guide
Favicon
KAPLAY Docs, KAPLAYOpt

https://kaplayjs.com/doc/KAPLAYOpt/
Favicon
KAPLAY Guides, Optimization

https://kaplayjs.com/guides/optimization/
All Sources
Faviconkaplayjs
Favicongithub
Faviconv4000.kaplayjs
Faviconstackoverflow
Favicongameprog...gpatterns