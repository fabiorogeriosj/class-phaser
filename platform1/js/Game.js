var SideScroller = SideScroller || {};

SideScroller.Game = function(){};

SideScroller.Game.prototype = {

  preload: function() {

      this.game.time.advancedTiming = true;

    },

  create: function() {

    this.player = this.game.add.sprite(100, 300, 'player');
    this.map = this.game.add.tilemap('level1');

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset

    this.map.addTilesetImage('tiles_spritesheet', 'gameTiles');

    //create layers

    this.backgroundlayer = this.map.createLayer('backgroundLayer');

    this.blockedLayer = this.map.createLayer('blockedLayer');

    //collision on blockedLayer

    this.map.setCollisionBetween(1, 100000, true, 'blockedLayer');

    //resizes the game world to match the layer dimensions

    this.backgroundlayer.resizeWorld();

    //create player

    this.player = this.game.add.sprite(100, 300, 'player');

    //enable physics on the player

    this.game.physics.arcade.enable(this.player);

    //player gravity

    this.player.body.gravity.y = 1000;

    //the camera will follow the player in the world

    this.game.camera.follow(this.player);

    this.cursors = this.game.input.keyboard.createCursorKeys();
    //properties when the player is ducked and standing, so we can use in update()

    var playerDuckImg = this.game.cache.getImage('playerDuck');

    this.player.duckedDimensions = {width: playerDuckImg.width, height: playerDuckImg.height};

    this.player.standDimensions = {width: this.player.width, height: this.player.height};

    this.player.anchor.setTo(0.5, 1);

 },

 update: function() {

   //collision

   this.game.physics.arcade.collide(this.player, this.blockedLayer, this.playerHit, null, this);

   this.game.physics.arcade.overlap(this.player, this.coins, this.collect, null, this);

   //only respond to keys and keep the speed if the player is alive

   if(this.player.alive) {

     this.player.body.velocity.x = 300;

     if(this.cursors.up.isDown) {

       this.playerJump();

     }

     else if(this.cursors.down.isDown) {

       this.playerDuck();

     }

     if(!this.cursors.down.isDown && this.player.isDucked) {

       //change image and update the body size for the physics engine

       this.player.loadTexture('player');

       this.player.body.setSize(this.player.standDimensions.width, this.player.standDimensions.height);

       this.player.isDucked = false;

     }

     //restart the game if reaching the edge

     if(this.player.x >= this.game.world.width) {

       this.game.state.start('Game');

     }

   }

 },
  playerDuck: function() {

      //change image and update the body size for the physics engine

      this.player.loadTexture('playerDuck');

      this.player.body.setSize(this.player.duckedDimensions.width, this.player.duckedDimensions.height);

      //we use this to keep track whether it's ducked or not

      this.player.isDucked = true;

  },
  playerJump: function() {

    if(this.player.body.blocked.down) {

      this.player.body.velocity.y -= 700;

    }

  },

  render: function()

    {

        this.game.debug.text(this.game.time.fps || '--', 20, 70, "#00ff00", "40px Courier");

    },
    playerHit: function(player, blockedLayer) {

    //if hits on the right side, die

    if(player.body.blocked.right) {

      //set to dead (this doesn't affect rendering)

      this.player.alive = false;

      //stop moving to the right

      this.player.body.velocity.x = 0;

      //change sprite image

      this.player.loadTexture('playerDead');

      //go to gameover after a few miliseconds

      this.game.time.events.add(1500, this.gameOver, this);

    }

  },

};
