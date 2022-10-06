import Phaser from 'phaser'

import PongScene from './scenes/PongScene'

const config = {
    type: Phaser.CANVAS,
    parent: 'pongCanvas',
    width: 800,
    height: 600,
    transparent: true,
    canvas: document.getElementById('canvas'),
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
<<<<<<< HEAD
    scene: [PongScene]
=======
    scene: [PongScene],
>>>>>>> ea9582441f5a4f1627e2e7913bbd7d332672888a
        
}

export default new Phaser.Game(config)