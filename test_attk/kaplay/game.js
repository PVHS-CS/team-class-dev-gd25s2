// Initialize Kaplay
const k = kaplay({
    width: 800,
    height: 600,
    background: [0, 0, 0],
    scale: 1,
    clearColor: [0, 0, 0],
    debug: true
});

// Create main scene
k.scene("main", () => {
    // Set gravity
    k.setGravity(1000);

    // Function to create health bar
    function createHealthBar(entity, isPlayer = true) {
        const barWidth = 50;
        const barHeight = 6;
        const padding = 2;
        
        // Create container for health bar
        const healthBar = k.add([
            k.pos(entity.pos.x, entity.pos.y - 20),
            k.rect(barWidth + padding * 2, barHeight + padding * 2),
            k.color(0, 0, 0),
            k.opacity(0.8),
            "healthBar"
        ]);

        // Create the actual health bar
        const healthFill = k.add([
            k.pos(entity.pos.x + padding, entity.pos.y - 20 + padding),
            k.rect(barWidth * (entity.hp() / entity.maxHealth()), barHeight),
            k.color(0, 255, 0),
            "healthFill"
        ]);

        // Fade out and destroy after 2 seconds
        k.wait(2, () => {
            k.destroy(healthBar);
            k.destroy(healthFill);
        });

        return { healthBar, healthFill };
    }

    function createhitbox(x, y, direction = 1) {
        const hitbox = k.add([
            k.rect(16, 16),
            k.pos(x + (50 * direction), y),
            k.color(255, 1, 1),
            k.area(),
            k.body({ isStatic: true }),
            k.opacity(1),
            k.lifespan(0.1), // Destroy after 0.1 seconds
            "hitbox"
        ]);

        hitbox.onCollide("player", (hitbox) => {
            player.hurt(1);
            createHealthBar(player, true);
            console.log("Player took damage! Health:", player.hp());
        });

        hitbox.onCollide("bot", (hitbox) => {
            bot.hurt(1);
            createHealthBar(bot, false);
            console.log("Bot took damage! Health:", bot.hp());
        });

        return hitbox;
    }

    // Add a player
    const player = k.add([
        k.pos(80, 40),
        k.rect(32, 32),
        k.area(),
        k.body(),
        k.color(255, 0, 0),
        k.health(4),
        "player",
        {
            moveDir: 1,  // Track player's movement direction
            attackCooldown: 0,
            canAttack: true,
            isDead: false,
            maxHealth: 4
        }
    ]);

    // Add bot with movement
    const bot = k.add([
        k.pos(180, 40),
        k.rect(32, 32),
        k.area(),
        k.body(),
        k.color(255, 0, 0),
        k.health(4),
        "bot",
        {
            moveDir: 1,  // 1 for right, -1 for left
            moveSpeed: 100,
            botJumpForce: 400,
            jumpTimer: 0,
            jumpInterval: 2,  // Jump every 2 seconds
            attackTimer: 0,
            attackInterval: 1,  // Attack every 1 second
            attackRange: 150,   // Attack range in pixels
            attackCooldown: 0,
            canAttack: true,
            isDead: false,
            maxHealth: 4
        }
    ]);

    // Handle player death
    player.on("death", () => {
        player.isDead = true;
        player.color = k.rgb(100, 100, 100); // Gray out the player
        console.log("Player died!");
    });

    // Handle bot death
    bot.on("death", () => {
        bot.isDead = true;
        bot.color = k.rgb(100, 100, 100); // Gray out the bot
        console.log("Bot died!");
    });

    // Bot movement update
    k.onUpdate(() => {
        if (!bot.isDead) {
            // Move side to side
            bot.move(bot.moveSpeed * bot.moveDir, 0);
            
            // Change direction if hitting platform edges
            if (bot.pos.x < 40 || bot.pos.x > 280) {
                bot.moveDir *= -1;
            }

            // Jump periodically
            bot.jumpTimer += k.dt();
            if (bot.jumpTimer >= bot.jumpInterval) {
                if (bot.isGrounded()) {
                    bot.jump(bot.botJumpForce);
                }
                bot.jumpTimer = 0;
            }

            // Handle attack cooldowns
            if (!bot.canAttack) {
                bot.attackCooldown += k.dt();
                if (bot.attackCooldown >= 1) {
                    bot.canAttack = true;
                    bot.attackCooldown = 0;
                }
            }

            // Attack when close to player
            bot.attackTimer += k.dt();
            if (bot.attackTimer >= bot.attackInterval && bot.canAttack) {
                const dx = bot.pos.x - player.pos.x;
                const dy = bot.pos.y - player.pos.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < bot.attackRange) {
                    createhitbox(bot.pos.x, bot.pos.y, bot.moveDir);
                    bot.canAttack = false;
                }
                bot.attackTimer = 0;
            }
        }

        if (!player.isDead) {
            // Handle player attack cooldown
            if (!player.canAttack) {
                player.attackCooldown += k.dt();
                if (player.attackCooldown >= 1) {
                    player.canAttack = true;
                    player.attackCooldown = 0;
                }
            }
        }
    });

    // Add some platforms
    k.add(["platform",
        k.pos(40, 100),
        k.rect(2000, 20),
        k.area(),
        k.body({ isStatic: true }),
        k.color(0, 0, 255),
    ]);

    k.add(["platform",
        k.pos(200, 100),
        k.rect(120, 20),
        k.area(),
        k.body({ isStatic: true }),
        k.color(0, 0, 255),
    ]);

    // Add some collectibles
    for (let i = 0; i < 3; i++) {
        k.add([
            k.pos(k.rand(40, 280), k.rand(40, 80)),
            k.circle(8),
            k.area(),
            k.color(0, 255, 0),
            "bean",
        ]);
    }

    // Player movement
    k.onKeyDown("left", () => {
        if (!player.isDead) {
            player.move(-200, 0);
            player.moveDir = -1;  // Update direction when moving left
        }
    });

    k.onKeyDown("right", () => {
        if (!player.isDead) {
            player.move(200, 0);
            player.moveDir = 1;   // Update direction when moving right
        }
    });

    k.onKeyDown("up", () => {
        if (!player.isDead && player.isGrounded()) {
            player.jump(400);
        }
    });

    // Collect beans
    player.onCollide("bean", (bean) => {
        //k.destroy(bean);
    });

    // Create hitbox on E key
    k.onKeyDown("e", () => {
        if (player.canAttack && !player.isDead) {
            createhitbox(player.pos.x, player.pos.y, player.moveDir);
            player.canAttack = false;
        }
    });
});

// Start the game
k.go("main"); 