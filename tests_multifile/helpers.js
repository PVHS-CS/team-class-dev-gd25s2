// 1. Pre-draw static layers into a canvas from an array of sprite objects
function makeStaticCanvasLayer(spriteArray, { width, height }) {
    const canvas = k.makeCanvas(width, height);
    canvas.draw(() => {
        spriteArray.forEach(obj => {
            k.drawSprite({ sprite: obj.sprite, pos: obj.pos, flipX: obj.flipX, flipY: obj.flipY });
        });
    });
    return canvas;
}

// Utility to check if an object is on screen (basic culling)
function isOnScreen(pos, spriteSize = 32, buffer = 64) {
    const cam = k.getCamPos();
    const screenSize = k.vec2(k.width(), k.height());
    const min = cam.sub(buffer);
    const max = cam.add(screenSize).add(buffer);
    return pos.x + spriteSize > min.x && pos.x < max.x &&
           pos.y + spriteSize > min.y && pos.y < max.y;
}

// 2. onDraw helper to draw a sprite array every frame (for dynamic or animated)
function drawSpriteArray(spriteArray) {
    k.onDraw(() => {
        spriteArray.forEach(obj => {
            k.drawSprite({ sprite: obj.sprite, pos: obj.pos, flipX: obj.flipX, flipY: obj.flipY });
        });
    });
}

// 3. onDraw helper that applies camera offset (for camera-based movement)
function drawSpriteArrayWithCam(spriteArray) {
    k.onDraw(() => {
        const cam = k.getCamPos();
        spriteArray.forEach(obj => {
            const screenPos = obj.pos.sub(cam); // world-to-screen
            k.drawSprite({ sprite: obj.sprite, pos: screenPos, flipX: obj.flipX, flipY: obj.flipY });
        });
    });
}

// 4. Composite helper to draw multiple layers efficiently
function setupLayeredDraw({
    bgStatic = [],
    bgDynamic = [],
    fgStatic = [],
    fgDynamic = [],
    cameraAware = true,
    dimensions = { width: 4000, height: 1000 },
}) {
    const bgCanvas = bgStatic.length > 0 ? makeStaticCanvasLayer(bgStatic, dimensions) : null;
    const fgCanvas = fgStatic.length > 0 ? makeStaticCanvasLayer(fgStatic, dimensions) : null;

    k.onDraw(() => {
        const cam = k.getCamPos();
        const drawPos = cameraAware ? k.vec2(0, 0).sub(cam) : k.vec2(0, 0);

        if (bgCanvas) {
            k.drawCanvas({ canvas: bgCanvas, pos: drawPos });
        }

        if (bgDynamic.length > 0) {
            bgDynamic.forEach(obj => {
                if (isOnScreen(obj.pos)) {
                    const pos = cameraAware ? obj.pos.sub(cam) : obj.pos;
                    k.drawSprite({ sprite: obj.sprite, pos, flipX: obj.flipX, flipY: obj.flipY });
                }
            });
        }

        if (fgCanvas) {
            k.drawCanvas({ canvas: fgCanvas, pos: drawPos });
        }

        if (fgDynamic.length > 0) {
            fgDynamic.forEach(obj => {
                if (isOnScreen(obj.pos)) {
                    const pos = cameraAware ? obj.pos.sub(cam) : obj.pos;
                    k.drawSprite({ sprite: obj.sprite, pos, flipX: obj.flipX, flipY: obj.flipY });
                }
            });
        }
    });
}

// NEW: Packed format helper with internal caching
const __packedSpriteCache = new WeakMap();

function drawPackedSpriteArrayWithCam(spriteArray, clearCache = false) {
    if (clearCache || !__packedSpriteCache.has(spriteArray)) {
        const flat = [];
        const spriteRefs = [];
        const refMap = new Map();

        spriteArray.forEach(obj => {
            if (!refMap.has(obj.sprite)) {
                refMap.set(obj.sprite, spriteRefs.length);
                spriteRefs.push(obj.sprite);
            }
            const spriteIndex = refMap.get(obj.sprite);
            flat.push(spriteIndex, obj.pos.x, obj.pos.y, obj.flipX ? 1 : 0, obj.flipY ? 1 : 0);
        });

        __packedSpriteCache.set(spriteArray, {
            data: new Float32Array(flat),
            sprites: spriteRefs
        });
    }

    const { data, sprites } = __packedSpriteCache.get(spriteArray);
    k.onDraw(() => {
        const cam = k.getCamPos();
        for (let i = 0; i < data.length; i += 5) {
            const sprite = sprites[data[i]];
            const pos = k.vec2(data[i + 1], data[i + 2]);
            if (!isOnScreen(pos)) continue;
            const screenPos = pos.sub(cam);
            k.drawSprite({
                sprite,
                pos: screenPos,
                flipX: !!data[i + 3],
                flipY: !!data[i + 4],
            });
        }
    });
}

function makePackedStaticCanvasLayer(spriteArray, { width, height }, clearCache = false) {
    if (clearCache || !__packedSpriteCache.has(spriteArray)) {
        const flat = [];
        const spriteRefs = [];
        const refMap = new Map();

        spriteArray.forEach(obj => {
            if (!refMap.has(obj.sprite)) {
                refMap.set(obj.sprite, spriteRefs.length);
                spriteRefs.push(obj.sprite);
            }
            const spriteIndex = refMap.get(obj.sprite);
            flat.push(spriteIndex, obj.pos.x, obj.pos.y, obj.flipX ? 1 : 0, obj.flipY ? 1 : 0);
        });

        __packedSpriteCache.set(spriteArray, {
            data: new Float32Array(flat),
            sprites: spriteRefs
        });
    }

    const { data, sprites } = __packedSpriteCache.get(spriteArray);
    const canvas = k.makeCanvas(width, height);
    canvas.draw(() => {
        for (let i = 0; i < data.length; i += 5) {
            k.drawSprite({
                sprite: sprites[data[i]],
                pos: k.vec2(data[i + 1], data[i + 2]),
                flipX: !!data[i + 3],
                flipY: !!data[i + 4],
            });
        }
    });
    return canvas;
}

// === USAGE EXAMPLES ===

// // Sample sprite data
// const grassTile = { sprite: "grass", pos: k.vec2(100, 200) };
// const tree = { sprite: "tree", pos: k.vec2(300, 180) };
// const cloud = { sprite: "cloud", pos: k.vec2(500, 80) };
// const player = { sprite: "player", pos: k.vec2(250, 180), flipX: false };

// // 1. Pre-render a static background layer
// const bgCanvas = makeStaticCanvasLayer([grassTile, tree], { width: 4000, height: 1000 });
// k.onDraw(() => {
//     k.drawCanvas({ canvas: bgCanvas, pos: k.vec2(0, 0).sub(k.getCamPos()) });
// });

// // 1. Optimized pre-render with packed format
// const packedBgCanvas = makePackedStaticCanvasLayer([grassTile, tree], { width: 4000, height: 1000 });
// k.onDraw(() => {
//     k.drawCanvas({ canvas: packedBgCanvas, pos: k.vec2(0, 0).sub(k.getCamPos()) });
// });

// // 2. Draw a dynamic cloud layer every frame
// const dynamicClouds = [cloud];
// drawSpriteArrayWithCam(dynamicClouds);

// // 3. Use setupLayeredDraw to manage entire scene
// setupLayeredDraw({
//     bgStatic: [grassTile],
//     bgDynamic: [cloud],
//     fgStatic: [tree],
//     fgDynamic: [player],
//     cameraAware: true,
//     dimensions: { width: 4000, height: 1000 },
// });

// // 4. Optimized draw using packed format
// const packedLayer = [cloud, player];
// drawPackedSpriteArrayWithCam(packedLayer);

// Sprite utilities
const spriteUtils = {
    // Get sprite dimensions safely
    getSpriteDimensions: (k, spriteName) => {
        return new Promise((resolve) => {
            const sprite = k.getSprite(spriteName);
            if (sprite && sprite.loaded) {
                resolve({
                    width: sprite.data.tex.width,
                    height: sprite.data.tex.height
                });
            } else {
                // Wait for the sprite to be loaded through the asset manager
                window.assetManager.preloadAssets(k).then(() => {
                    const loadedSprite = k.getSprite(spriteName);
                    resolve({
                        width: loadedSprite.data.tex.width,
                        height: loadedSprite.data.tex.height
                    });
                });
            }
        });
    },

    // Get sprite data safely
    getSpriteData: (k, spriteName) => {
        return new Promise((resolve) => {
            const sprite = k.getSprite(spriteName);
            if (sprite && sprite.loaded) {
                resolve(sprite.data);
            } else {
                // Wait for the sprite to be loaded through the asset manager
                window.assetManager.preloadAssets(k).then(() => {
                    const loadedSprite = k.getSprite(spriteName);
                    resolve(loadedSprite.data);
                });
            }
        });
    },

    // Wait for sprite to be loaded
    waitForSprite: (k, spriteName) => {
        return new Promise((resolve) => {
            const sprite = k.getSprite(spriteName);
            if (sprite && sprite.loaded) {
                resolve(sprite);
            } else {
                // Wait for the sprite to be loaded through the asset manager
                window.assetManager.preloadAssets(k).then(() => {
                    resolve(k.getSprite(spriteName));
                });
            }
        });
    }
};

// Export the utilities
window.spriteUtils = spriteUtils;
