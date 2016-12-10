var game = new Phaser.Game(
    300, 500, Phaser.CANVAS, 'canvas', {
        /* load game, background, player */
        preload: preload,
        create: create,
        update: update,
        shutdown: shutdown,
        /* load obstacles */
        createObstacles: createObstacles,
        nextObstacle: nextObstacle,
        resetNextObstacle: resetNextObstacle,
        updateObstacle: updateObstacle,
        /* load Goomba */
        createGoomba: createGoomba,
        nextGoomba: nextGoomba,
        resetNextGoomba: resetNextGoomba,
        updateGoomba: updateGoomba
    }
),
    player = 1,
    text,
    style = {
        font: "16px Courier", fill: "#fff"
    };

function preload() {
    this.load.image('background', 'asset/img/tiles/bg-beach-ocean.png');
    this.load.image('ground', 'asset/img/tiles/tiles.png');
    this.load.spritesheet('obstacle', 'asset/img/tiles/tiles.png', 64, 32);
    this.load.spritesheet('mario', 'asset/img/mario/mario.png', 14, 19, 2);
    this.load.spritesheet('luigi', 'asset/img/mario/luigi.png', 14, 19, 2);
    this.load.spritesheet('goomba', 'asset/img/mario/goomba.gif', 17, 18);
}

function create() {
    this.physics.arcade.gravity.y = 1000;
    this.background = this.game.add.tileSprite(0, 0, this.game.width, 624, 'background');
    this.background.tileScale.set(this.background.height / this.background.texture.frame.height);
    this.background.autoScroll(-30, 0);
    
    this.ground = this.game.add.tileSprite(0, 468, this.game.width, 32, 'ground');
    //this.ground.autoScroll(-150, 0);
    
    this.mario = this.add.sprite(245, 200, 'mario');
    this.mario.animations.add('run');
    this.mario.scale.x = -1;
    
    this.luigi = this.add.sprite(45, 200, 'luigi');
    this.luigi.animations.add('run');
    if(player === 1)
        this.luigi.visible = false;
    else if(player === 2)
        this.luigi.visible = true;
    else 
        this.luigi.visible = false;
        
    this.obstacles = this.game.add.group();
    this.obstacles.enableBody = true;

    this.goomba = this.game.add.group();
    this.goomba.enableBody = true;

    this.physics.arcade.enable([this.mario, this.luigi, this.ground, this.goomba]);
    this.ground.body.immovable = true;
    this.ground.body.allowGravity = false;
    this.mario.body.collideWorldBounds = true;
    this.luigi.body.collideWorldBounds = true;
    cursors = this.input.keyboard.createCursorKeys();
    this.jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.jumpButton2 = this.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.rightButton = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.leftButton = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    
    
    this.jump2Button = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.jump2Button2 = this.input.keyboard.addKey(Phaser.Keyboard.Z);
    this.right2Button = this.input.keyboard.addKey(Phaser.Keyboard.D);
    this.left2Button = this.input.keyboard.addKey(Phaser.Keyboard.Q);

    this.createObstacles();
    this.createGoomba();

    this.nextObstacle();
    this.nextGoomba();
}

function update() {
    this.physics.arcade.collide(this.mario, [this.ground, this.obstacles, this.goomba, this.luigi]);
    this.physics.arcade.collide(this.luigi, [this.ground, this.obstacles, this.goomba, this.mario]);
    this.physics.arcade.collide(this.obstacles, [this.obstacles]);
    
    if (this.jumpButton.isDown && (this.mario.body.touching.down) || this.jumpButton2.isDown && (this.mario.body.touching.down)) {
        this.mario.body.velocity.y = -400;
    }

    this.obstacles.forEachAlive(this.updateObstacle, this);
    this.goomba.forEachAlive(this.updateGoomba, this);

    if(this.rightButton.isDown) {
        this.mario.body.velocity.x = +150;
        this.mario.animations.play('run', 3, true);
        this.mario.scale.x = 1;
    }
    else if(this.leftButton.isDown) {
        this.mario.body.velocity.x = -150;
        this.mario.animations.play('run', 3, true);
        this.mario.scale.x = -1;
    }
    else {
        this.mario.body.velocity.x = 0;
        
    }
    
    if (this.jump2Button.isDown && (this.luigi.body.touching.down) || this.jump2Button2.isDown && (this.luigi.body.touching.down)) {
        this.luigi.body.velocity.y = -400;
    }
    
    if(this.right2Button.isDown) {
        this.luigi.body.velocity.x = +150;
        this.luigi.animations.play('run', 3, true);
        this.luigi.scale.x = 1;
    }
    else if(this.left2Button.isDown) {
        this.luigi.body.velocity.x = -150;
        this.luigi.animations.play('run', 3, true);
        this.luigi.scale.x = -1;
    }
    else {
        this.luigi.body.velocity.x = 0;
        
    }
    
}

function shutdown() {
    
}

function createObstacles() {
    this.obstacles.createMultiple(1, 'obstacle', [0, 1, 2, 3, 4, 5, 6]);
    this.obstacles.setAll('body.allowGravity', false);
    this.obstacles.setAll('body.immovable', true);
}

function createGoomba() {
    this.goomba.createMultiple(1, 'goomba', [0]);
    this.goomba.setAll('body.allowGravity', false);
    this.goomba.setAll('body.immovable', true);
}

function nextObstacle() {
    this.resetNextObstacle();
    this.time.events.add(this.rnd.between(20, 20), this.nextObstacle, this);
}

function nextGoomba() {
    this.resetNextGoomba();
    this.time.events.add(this.rnd.between(20, 20), this.nextGoomba, this);
}

var y_origin = 430;

function resetNextObstacle() {
    var obs = this.obstacles.getFirstDead(),
        obsRandom = Math.floor((Math.random() * 5) + 1);
    if (obs) {
        obs.reset();
        obs.right = this.world.bounds.right;
        obs.bottom = y_origin;
        obs.body.velocity.x = -200;
        o = 100;

        if(obsRandom === 1 || obsRandom === 2 || obsRandom === 5)
            y_origin = y_origin - 30;
        else if(obsRandom === 3 || obsRandom === 4)
            y_origin = y_origin + 30;

        if(obs.bottom >= 430)
            y_origin = y_origin - 30;
        else if(obs.bottom >= 40)
            y_origin = y_origin + 30;

        console.log(obs.lenght);
        //obs.right = this.world.bounds.right;
        //obs.bottom = this.ground.top;
       // obs.body.velocity.x = -150;
    }
}

function resetNextGoomba() {
    var gom = this.goomba.getFirstDead();
    if(gom) {
        gom.reset();
        gom.x = this.world.bounds.right;
        gom.bottom = 468;
        gom.body.velocity.x = -70;
    }
}

function updateObstacle(obs, gro) {
    if (obs.right < this.world.bounds.left) {
        obs.kill();
    }
}

function updateGoomba(gom) {
    if (gom.right < this.world.bounds.left) {
        gom.kill();
    }
}