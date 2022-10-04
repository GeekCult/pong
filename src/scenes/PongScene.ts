import Phaser from 'phaser'
import { pongManager } from "../game/PongManager";
import * as Game from '../consts/Game'

export default class PongScene extends Phaser.Scene
{
    
    constructor(){
        
        super('pong')
    
    }

    preload() : void {
        
        this.load.image('background', 'assets/soccer.jpg')
        this.load.image('border_h', 'assets/bar_h.png')
        this.load.image('border_v', 'assets/bar_v.png')
        this.load.image('bar', 'assets/bar.png')
        this.load.image('shine', 'assets/red.png')
        this.load.image('ball', 'assets/ball.png')
        
    }

    create() : void {
            
        let background = this.add.image(400, 300, 'background') as any
        
        this.keys = this.input.keyboard.addKeys({
            w: 'W', s: 'S', up: 'UP', down: 'DOWN', space: 'SPACE'
        });
        
        //Set Physics to some elements
        this.stripeUp = pongManager.addPhysics({ game: this, y: 400, x: 0, item: 'border_h'  });
        this.stripeDown = pongManager.addPhysics({ game: this, y: 400, x: 600, item: 'border_h'  });
        this.borderLeft = pongManager.addPhysics({ game: this, y: 0, x: 300, item: 'border_v'  });
        this.borderRight = pongManager.addPhysics({ game: this, y: 800, x: 300, item: 'border_v'  }); 
        this.playerLeft = pongManager.addPhysics({ game: this, y: 30, x: 300, item: 'bar'  });
        this.playerRight = pongManager.addPhysics({ game: this, y: 770, x: 300, item: 'bar'  });
        this.ball = pongManager.addPhysics({ game: this, y: 400, x: 300, item: 'ball'  });
        
        //Set particles to ball just for fun
        const setParticles = pongManager.addParticle(this);
        
        //Add Colliders for elements
        pongManager.addCollider({game: this, item1: this.ball, item2: this.playerLeft, action: 'right'});
        pongManager.addCollider({game: this, item1: this.ball, item2: this.playerRight, action: 'left'});
        pongManager.addCollider({game: this, item1: this.ball, item2: this.stripeUp, action: 'down'});
        pongManager.addCollider({game: this, item1: this.ball, item2: this.stripeDown, action: 'up'});
        
        pongManager.addCollider({game: this, item1: this.ball, item2: this.borderLeft, action: 'player1'});
        pongManager.addCollider({game: this, item1: this.ball, item2: this.borderRight, action: 'player2'});
        /*
        this.physics.add.collider(
            this.ball,
            this.playerLeft,
            () => {           
                this.sideH = 'right';
            }
        ); 

        this.physics.add.collider(
            this.ball,
            this.playerRight,
            () => {           
                this.sideH = 'left';
            }
        ); 

        this.physics.add.collider(
            this.ball,
            this.stripeUp,
            () => {           
                this.sideV = 'down';
            }
        );

        this.physics.add.collider(
            this.ball,
            this.stripeDown,
            () => {           
                this.sideV = 'up';
            }
        ); 
        
        this.physics.add.collider(
            this.ball,
            this.borderLeft,
            () => { 
                this.scene.pause();
                this.goal = 'player1'; 
                pongManager.scoreBoard(this);
            }
        );
        
        this.physics.add.collider(
            this.ball,
            this.borderRight,
            () => { 
                this.scene.pause();
                this.goal = 'player2'; 
                pongManager.scoreBoard(this);
            }
        );*/
        
    }
    
    update() : void {
        
        if(this.sideV == 'down'){  this.ball.y += this.sideM; }
        if(this.sideV == 'up'){    this.ball.y -= this.sideM; }
        if(this.sideH == 'right'){ this.ball.x += this.sideN; } 
        if(this.sideH == 'left'){  this.ball.x -= this.sideN; }       
         
        if (this.keys.w.isDown){
            if(this.playerLeft.y > Game.PLAYER_TOP){ this.playerLeft.y -= Game.PLAYER_SPEED; }
        }
        
        if (this.keys.s.isDown){  
            if(this.playerLeft.y < Game.PLAYER_BOTTOM){ this.playerLeft.y += Game.PLAYER_SPEED; }
        }
        
        if (this.keys.up.isDown){  
            if(this.playerRight.y > Game.PLAYER_TOP){ this.playerRight.y -= Game.PLAYER_SPEED; }
        }
        
        if (this.keys.down.isDown){   
            if(this.playerRight.y < Game.PLAYER_BOTTOM){ this.playerRight.y += Game.PLAYER_SPEED; }
        }
        
        //Reset game
        if (this.keys.space.isDown){
            this.scene.resume();
            pongManager.reset(this);
            pongManager.initialValues(this);
        }
    }
}
