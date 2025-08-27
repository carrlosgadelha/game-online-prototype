console.log("Game Code")

function generateRandomNumber(size){
    let randomNumber = Math.round(Math.random() * size)

    return randomNumber
}

const canvas = document.getElementById("game-canvas")
const ctx = canvas.getContext("2d")

const adcarry = {
    x: 0,
    y: 0,
    width: 25,
    height: 25,
    color: "red",
    moveSpeedX: 8,
    moveSpeedY: 5,
    damage: 5,
    attackSpeed: 0.75,

    draw(){
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = this.color
        ctx.fillRect(
            this.x, this.y,
            this.width, this.height
        )
    },
    update(){

        this.x += this.moveSpeedX
        this.y += this.moveSpeedY

        if((this.x + this.width) >= canvas.width){
            this.moveSpeedX *= -1
        }

        if(this.x <= 0){
            this.moveSpeedX = generateRandomNumber(6)
        }

        if((this.y + this.height) >= canvas.height){
            this.moveSpeedY *= -1
        }

        if(this.y < 0){
            this.moveSpeedY = generateRandomNumber(6)
        }
    }
}

function gameLoop(){
    adcarry.draw()
    adcarry.update()

    requestAnimationFrame(gameLoop)
}

window.onload = () => {
    gameLoop()
}
