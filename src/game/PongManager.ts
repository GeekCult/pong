

export class PongManager {
    
    /*
     * Set the initial values
     */
    public initialValues(props: any) : void {
        
        props.player1 = 0;
        props.player2 = 0;
        
        props.ball.x = 400;
        props.ball.y = 300;
        
        const scoreA = document.getElementById("player2");
        const scoreB = document.getElementById("player1");
        
        scoreA.value = props.player1
        scoreB.value = props.player2
        
        this.reset(props);
    }
    
    /*
     * Reset the ball position to center
     */
    public reset(props: any) : void {
        
        this.randomPosition(props);
        
        props.ball.x = 400;
        props.ball.y = 300;
        
        props.scene.resume();
        
    }
    
    /*
     * Add Physics to elements
     */
    public addPhysics(props: any) : any {
        
        let item = props.game.physics.add.image(props.y, props.x, props.item) as any;
        item.setImmovable(true);
        item.body.allowGravity = false;
        
        if(props.item == 'ball'){
            item.setCollideWorldBounds(true);
        }
        
        return item;
    }
    
    /*
     * Set particle effect
     */
    public addParticle(props: any) : void {
        
        const particles = props.add.particles('shine')
        const emitter = particles.createEmitter({
            speed: 50,
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
                if(props.action == 'right'){ props.game.sideH = 'right'; }
                if(props.action == 'left'){ props.game.sideH = 'left'; }
                if(props.action == 'down'){ props.game.sideV = 'down'; }
                if(props.action == 'up'){ props.game.sideV = 'up'; }
                //When we have a goal
                if(props.action == 'player1' || props.action == 'player2'){
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
        let score: number = 0;
            
        try {

            if(props.goal === 'player1'){
                props.player1 = props.player1 + 1;
                score = props.player1;
            }

            if(props.goal === 'player2'){
                props.player2 = props.player2 + 1;
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
        
            props.sideV = this.getRandomWords(['up', 'down']);
            props.sideH = this.getRandomWords(['left', 'right']);    
            props.sideM = this.getRandomNumber(4, 8);   
            props.sideN = this.getRandomNumber(4, 8);     
            
        } catch (error: any) {
            throw new Error(error);
        }
    }
    
    /* 
     * Check the rules
     */
    public rules(props: any){
        
        if(props.score < 7){
            
            setTimeout(() => { 
                this.reset(props);
            }, 2000);
            
        }else{
        
            //Show modal with winner
            const title = document.getElementById("winner");
            title.textContent = props.goal + " wins";
            
            const subtitle = document.getElementById("message");
            message.textContent = "Carlos Garcia now works on JogoGlobal";
            
            document.getElementById("modal").style.display = "block";
            
            const btn_start = document.getElementById("bt_play");
            btn_start.addEventListener("click", () => { 
                
                document.getElementById("modal").style.display = "none";
                
                setTimeout(() => { 
                    this.reset(props);
                    this.initialValues(props);
                    props.scene.resume() 
                },1000 );
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