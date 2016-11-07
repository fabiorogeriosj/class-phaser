var SideScroller = SideScroller || {};

var height = window.innerHeight;
var width = window.innerWidth;

var game = new Phaser.Game(width, height, Phaser.CANVAS, null,
  { preload:preload, create:create, update: update}
);

function preload() {

    game.load.tilemap('map', '../tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('kenny_platformer_64x64', 'assets/tilemaps/tiles/kenny_platformer_64x64.png');
    game.load.image('phaser', 'assets/sprites/phaser-dude.png');

}

var map;
var layer;
var cursors;
var sprite;

function create() {

    map = game.add.tilemap('map');

    map.addTilesetImage('kenny_platformer_64x64');

    layer = map.createLayer('Layer1');

    layer.resizeWorld();

    map.setCollisionBetween(0, 555);

    // layer.debug = true;

    sprite = game.add.sprite(260, 70, 'phaser');

    game.physics.enable(sprite);

    sprite.body.bounce.set(0.2);
    sprite.body.tilePadding.set(32);

    game.camera.follow(sprite);

    game.physics.arcade.gravity.y = 1000;

    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

    game.physics.arcade.collide(sprite, layer);

    // sprite.body.velocity.x = 0;
    // sprite.body.velocity.y = 0;

    if (cursors.up.isDown)
    {
        sprite.body.velocity.y = -200;
    }
    else if (cursors.down.isDown)
    {
        sprite.body.velocity.y = 200;
    }

    if (cursors.left.isDown)
    {
        sprite.body.velocity.x = -200;
    }
    else if (cursors.right.isDown)
    {
        sprite.body.velocity.x = 200;
    }

}

function render() {

    // game.debug.body(sprite);

}
