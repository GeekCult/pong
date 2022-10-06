import * as C from '../consts/Game'

export class PongManager {
    
    /*
     * Set the initial values
     */
    public initialValues(props: any) : void {
        
        props.player1 = C.SCORE_INITIAL;
        props.player2 = C.SCORE_INITIAL;
        
        props.ball.x = C.FIELD_CENTER_X;
        props.ball.y = C.FIELD_CENTER_Y;
        
        const scoreA = document.getElementById(C.PLAYER1);
        const scoreB = document.getElementById(C.PLAYER2);
        
        scoreA.value = props.player1
        scoreB.value = props.player2
        
        this.reset(props);
    }
    
    /*
     * Reset the ball position to center
     */
    public reset(props: any) : void {
        
        this.randomPosition(props);
        
        props.ball.x = C.FIELD_CENTER_X;
        props.ball.y = C.FIELD_CENTER_Y;
        
        props.scene.resume();
        
    }
    
    /*
     * Add Physics to elements
     */
    public addPhysics(props: any) : any {
        
        let item = props.game.physics.add.image(props.y, props.x, props.item) as any;
        item.setImmovable(true);
        item.body.allowGravity = false;
        
        if(props.item == C.BALL){
            item.setCollideWorldBounds(true);
        }
        
        return item;
    }
    
    /*
     * Set particle effect
     */
    public addParticle(props: any) : void {
        
        const particles = props.add.particles(C.SHINE)
        const emitter = particles.createEmitter({
            speed: C.SHINE_SPEED,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        })
        emitter.startFollow(props.ball)
    }
    
    public addCollider(props: any) : void {
        
        props.game.physics.add.collider(
            props.item1,
            props.item2,
            () => {           
                if(props.action == C.RIGHT){ props.game.sideH = C.RIGHT; }
                if(props.action == C.LEFT){ props.game.sideH = C.LEFT; }
                if(props.action == C.DOWN){ props.game.sideV = C.DOWN; }
                if(props.action == C.UP){ props.game.sideV = C.UP; }
                //When we have a goal
                if(props.action == C.PLAYER1 || props.action == C.PLAYER2){
                    props.game.scene.pause();
                    props.game.goal = props.action; 
                    this.scoreBoard(props.game);
                }
                
            }
        );
    }
    
    /*
     * Handle with the scoreboard
     */
    public scoreBoard(props: any){
        
        const box = document.getElementById(props.goal);
        let score: number = C.SCORE_INITIAL;
            
        try {

            if(props.goal === C.PLAYER1){
                props.player1 = props.player1 + C.GOAL;
                score = props.player1;
            }

            if(props.goal === C.PLAYER2){
                props.player2 = props.player2 + C.GOAL;
                score = props.player2;
            }
            
            props.score = score
            box.value = score

            this.rules(props);
            
            
        } catch (error: any) {
            throw new Error(error);
        }
    }
    
    /*
     * Get a random moviment and position
     */
    public randomPosition(props: any) : void{

        try {
        
            props.sideV = this.getRandomWords([C.UP, C.DOWN]);
            props.sideH = this.getRandomWords([C.LEFT, C.RIGHT]);    
            props.sideM = this.getRandomNumber(C.BALL_MOVE_X, C.BALL_MOVE_Y);   
            props.sideN = this.getRandomNumber(C.BALL_MOVE_X, C.BALL_MOVE_Y);     
            
        } catch (error: any) {
            throw new Error(error);
        }
    }
    
    /* 
     * Check the rules
     */
    public rules(props: any){
        
        if(props.score < C.SCORE){
            
            setTimeout(() => { 
                this.reset(props);
            }, 2000 );
            
        }else{
        
            //Show modal with winner
            const title = document.getElementById("winner");
            title.textContent = props.goal + " wins";
            
            const subtitle = document.getElementById("message");
            message.textContent = C.EASTER_EGG;
            
            document.getElementById("modal").style.display = "block";
            
            const btn_start = document.getElementById("bt_play");
            btn_start.addEventListener("click", () => { 
                
                document.getElementById("modal").style.display = "none";
                
                setTimeout(() => { 
                    this.reset(props);
                    this.initialValues(props);
                    props.scene.resume() 
                }, 1000 );
            });
        }
    } 
    
    /*
     * Return a random word
     */
    public getRandomWords(words){
        return words[Math.floor(Math.random() * words.length)];
    }
    
    /*
     * Return a random number between 2 params
     */
    public getRandomNumber(min: number, max: number) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
};

export const pongManager = new PongManager();