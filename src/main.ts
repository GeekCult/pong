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
    scene: [PongScene],
        
}

export default new Phaser.Game(config)