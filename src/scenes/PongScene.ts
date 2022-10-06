import Phaser from 'phaser'
import { pongManager } from "../game/PongManager";
import * as C from '../consts/Game'
import * as Images from '../resources/Images'

export default class PongScene extends Phaser.Scene
{
    
    constructor(){
        
        super('pong')
    
    }

    preload() : void {
        
        //Images buffer
        this.load.image('background', Images.field)
        this.load.image('border_h', Images.bar_h)
        this.load.image('border_v', Images.bar_v)
        this.load.image('bar', Images.bar)
        this.load.image('shine', Images.shine)
        this.load.image('ball', Images.ball)

    }

    create() : void {
            
        let background = this.add.image(C.FIELD_CENTER_X, C.FIELD_CENTER_Y, 'background') as any
        
        this.keys = this.input.keyboard.addKeys({
            w: 'W', s: 'S', up: 'UP', down: 'DOWN', space: 'SPACE'
        });
        
        //Set Physics to some elements
        this.stripeUp = pongManager.addPhysics({ game: this, y: C.FIELD_CENTER_X, x: C.FIELD_INITIAL, item: 'border_h' });
        this.stripeDown = pongManager.addPhysics({ game: this, y: C.FIELD_CENTER_X, x: C.FIELD_HEIGH, item: 'border_h' });
        this.borderLeft = pongManager.addPhysics({ game: this, y: C.FIELD_INITIAL, x: C.FIELD_CENTER_Y, item: 'border_v' });
        this.borderRight = pongManager.addPhysics({ game: this, y: C.FIELD_WIDTH, x: C.FIELD_CENTER_Y, item: 'border_v' }); 
        this.playerLeft = pongManager.addPhysics({ game: this, y: C.FIELD_PLAYER1_X, x: C.FIELD_CENTER_Y, item: 'bar'  });
        this.playerRight = pongManager.addPhysics({ game: this, y: C.FIELD_PLAYER2_X, x: C.FIELD_CENTER_Y, item: 'bar' });
        this.ball = pongManager.addPhysics({ game: this, y: C.FIELD_CENTER_X, x: C.FIELD_CENTER_Y, item: 'ball' });
        
        //Set particles to ball just for fun
        const setParticles = pongManager.addParticle(this);
        
        //Add Colliders for elements
        pongManager.addCollider({ game: this, item1: this.ball, item2: this.playerLeft, action: C.RIGHT });
        pongManager.addCollider({ game: this, item1: this.ball, item2: this.playerRight, action: C.LEFT });
        pongManager.addCollider({ game: this, item1: this.ball, item2: this.stripeUp, action: C.DOWN });
        pongManager.addCollider({ game: this, item1: this.ball, item2: this.stripeDown, action: C.UP });
        
        pongManager.addCollider({ game: this, item1: this.ball, item2: this.borderRight, action: C.PLAYER1 });
        pongManager.addCollider({ game: this, item1: this.ball, item2: this.borderLeft, action: C.PLAYER2 });
                
    }
    
    update() : void {
        
        if(this.sideV == C.DOWN){  this.ball.y += this.sideM; }
        if(this.sideV == C.UP){    this.ball.y -= this.sideM; }
        if(this.sideH == C.RIGHT){ this.ball.x += this.sideN; } 
        if(this.sideH == C.LEFT){  this.ball.x -= this.sideN; }       
         
        if (this.keys.w.isDown){
            if(this.playerLeft.y > C.PLAYER_TOP){ this.playerLeft.y -= C.PLAYER_SPEED; }
        }
        
        if (this.keys.s.isDown){  
            if(this.playerLeft.y < C.PLAYER_BOTTOM){ this.playerLeft.y += C.PLAYER_SPEED; }
        }
        
        if (this.keys.up.isDown){  
            if(this.playerRight.y > C.PLAYER_TOP){ this.playerRight.y -= C.PLAYER_SPEED; }
        }
        
        if (this.keys.down.isDown){   
            if(this.playerRight.y < C.PLAYER_BOTTOM){ this.playerRight.y += C.PLAYER_SPEED; }
        }
        
        //Reset game
        if (this.keys.space.isDown){
            this.scene.resume();
            pongManager.reset(this);
            pongManager.initialValues(this);
        }
    }
}
