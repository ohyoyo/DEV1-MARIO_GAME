function loadgame (nb) {
    var game = new Phaser.Game(
        300, 500, Phaser.CANVAS, 'game', {
            /* load game, background, player */
            preload: preload,
            create: create,
            update: update,
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
        player = nb,
        text,
        style = {
            font: "16px Courier", fill: "#fff"
        };
    
    function preload() {
        randomBG = Math.floor((Math.random() * 4) + 1);
        if(randomBG === 1)
            this.load.image('background', 'asset/img/tiles/bg-1.png');
        else  if(randomBG === 2)
            this.load.image('background', 'asset/img/tiles/bg-3.png');
        else if(randomBG === 3)
            this.load.image('background', 'asset/img/tiles/bg-2.png');
        else
            this.load.image('background', 'asset/img/tiles/bg-1.png');
        this.load.image('ground', 'asset/img/tiles/tiles.png');
        this.load.spritesheet('obstacle', 'asset/img/tiles/tiles_b.png', 95, 33);
        this.load.spritesheet('mario', 'asset/img/mario/mario.png', 14, 19, 2);
        this.load.spritesheet('luigi', 'asset/img/mario/luigi.png', 14, 19, 2);
        this.load.spritesheet('goomba', 'asset/img/mario/goomba.gif', 17, 18);
    }

    function create() {
        this.stage.backgroundColor = 0x1a9efb;
        this.physics.arcade.gravity.y = 1000;
        this.background = this.game.add.tileSprite(0, 0, this.game.width, 624, 'background');
        this.background.tileScale.set(this.background.height / this.background.texture.frame.height);
        this.background.autoScroll(-30, 0);

        this.ground = this.game.add.tileSprite(0, 468, this.game.width, 32, 'ground');
        //this.ground.autoScroll(-150, 0);

        this.mario = this.add.sprite(220, 450, 'mario');
        this.mario.animations.add('run');
        this.mario.scale.x = -1;

        this.luigi = this.add.sprite(45, 450, 'luigi');
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
        if(pause === 0) {
            game.physics.arcade.isPaused = true
        }
        else if(pause === 1) {
            game.physics.arcade.isPaused = false;
        }
        
        $('#replay').click(function() {
            game.state.restart();
            $('#game').show('slow');
        });
        
        $('.player').click(function() {
            game.state.restart();
        })
        
        $('.stop').click(function() {
            game.destroy();
        })
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

    function createObstacles() {
        this.obstacles.createMultiple(1, 'obstacle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
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
            for(i=0;i<=10;i++){
                if(i == 0)
                    obs.bottom = y_origin-i;
                else if(i == 1)
                    obs.bottom = y_origin - 30;
                else if(i == 3)
                    obs.bottom = y_origin - 60;
                else if(i == 3)
                    obs.bottom = y_origin - 90;
                else if(i == 4)
                    obs.bottom = y_origin - 120;
                else if(i == 5)
                    obs.bottom = y_origin - 150;
                else if(i == 6)
                    obs.bottom = y_origin - 180;
                else if(i == 7)
                    obs.bottom = y_origin - 210;
                else if(i == 8)
                    obs.bottom = y_origin - 240;
                else if(i == 9)
                    obs.bottom = y_origin - 270;
                else if(i == 10)
                    obs.bottom = y_origin - 300;
            }
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
}