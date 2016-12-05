
var game = new Phaser.Game(300, 500, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, shutdown: shutdown, createObstacles: createObstacles, nextObstacle: nextObstacle, resetNextObstacle: resetNextObstacle, updateObstacle: updateObstacle });

function preload() {
    this.load.image('background', 'asset/img/tiles/bg-beach-ocean.png');
    this.load.image('ground', 'asset/img/tiles/tiles.png');
    this.load.spritesheet('obstacle', 'asset/img/tiles/tiles.png', 64, 32);
    this.load.spritesheet('player', 'asset/img/mario/_mario.png', 14, 19, 2);
}

function create() {
    this.physics.arcade.gravity.y = 1000;
    this.background = this.game.add.tileSprite(0, 0, this.game.width, 624, 'background');
    this.background.tileScale.set(this.background.height / this.background.texture.frame.height);
    this.background.autoScroll(-30, 0);
    
    this.ground = this.game.add.tileSprite(0, 468, this.game.width, 32, 'ground');
    //this.ground.autoScroll(-150, 0);
    
    this.player = this.add.sprite(45, 200, 'player');
    this.player.animations.add('run');

    this.obstacles = this.game.add.group();
    this.obstacles.enableBody = true;

    this.physics.arcade.enable([this.player, this.ground]);
    this.ground.body.immovable = true;
    this.ground.body.allowGravity = false;
    this.player.body.collideWorldBounds = true;

    cursors = this.input.keyboard.createCursorKeys();
    this.jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.rightButton = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.leftButton = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);

    this.createObstacles();
    this.nextObstacle();
}

function update() {
    this.physics.arcade.collide(this.player, [this.ground, this.obstacles]);

    if (this.jumpButton.isDown && (this.player.body.touching.down)) {
        this.player.body.velocity.y = -400;
    }

    this.obstacles.forEachAlive(this.updateObstacle, this);

    if(this.rightButton.isDown){
        this.player.body.velocity.x = 150;
        this.player.animations.play('run', 3, true);
    }
    if(this.leftButton.isDown){
        this.player.body.velocity.x = -150;
        this.player.animations.play('run', 3, true);
    }
}

function shutdown() {
    
}

function createObstacles() {
    this.obstacles.createMultiple(7, 'obstacle', [1]);
    this.obstacles.setAll('body.allowGravity', false);
    this.obstacles.setAll('body.immovable', true);
}

function nextObstacle() {
    this.resetNextObstacle();
    this.time.events.add(this.rnd.between(20, 20), this.nextObstacle, this);
}

function resetNextObstacle() {
    var obs = this.obstacles.getFirstDead();
    if (obs) {
            obs.reset();
            obs.right = this.world.bounds.right;
            obs.bottom = 430;
            obs.body.velocity.x = -140;
        
        //obs.right = this.world.bounds.right;
        //obs.bottom = this.ground.top;
       // obs.body.velocity.x = -150;
    }
}

function updateObstacle(obs) {
    if (obs.right < this.world.bounds.left) {
        obs.kill();
    }
}