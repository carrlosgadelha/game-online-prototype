console.log("Game Code")

function generateRandomNumber(size){
    let randomNumber = Math.round(Math.random() * size)

    return randomNumber
}

const canvas = document.getElementById("game-canvas")
const ctx = canvas.getContext("2d")

const mousePos = {
    x: 0,
    y: 0,
    lastClickX: null,
    lastClickY: null
}

const gunner = {
    x: 0,
    y: 0,
    width: 40,
    height: 40,
    color: "red",
    moveSpeedX: 4,
    moveSpeedY: 4,
    damage: 5,
    attackSpeed: 0.75,
    isPressW: false,
    isPressA: false,
    isPressS: false,
    isPressD: false,

    draw(){
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = this.color
        ctx.fillRect(
            this.x, this.y,
            this.width, this.height
        )
    },
    update(){
        /* MOVIMENTAÇAO USANDO WASD */
        if(this.isPressD && (this.x + this.width) < canvas.width){
            this.x += this.moveSpeedX
        }
        if(this.isPressA && (this.x) > 0){
            this.x -= this.moveSpeedX
        }
        if(this.isPressS && (this.y + this.height) < canvas.width){
            this.y += this.moveSpeedY
        }
        if(this.isPressW && this.y > 0){
            this.y -= this.moveSpeedY
        }
        /* ---------------------------------- */

        /* MOVIMENTAÇAO USANDO O CLICK DO MOUSE */
        if(mousePos.lastClickX && mousePos.lastClickY){
            if(this.x < mousePos.lastClickX){
                this.x = lerp(this.x, mousePos.lastClickX - 20, 0.03)
            }
            if(this.x > mousePos.lastClickX){
                this.x = lerp(this.x, mousePos.lastClickX - 40, 0.03)
            }
            if(this.y < mousePos.lastClickY){
                this.y = lerp(this.y, mousePos.lastClickY - 20, 0.03)
            }
            if(this.y > mousePos.lastClickY){
                this.y = lerp(this.y, mousePos.lastClickY - 0, 0.03)
            }
            if(Math.abs(this.x - mousePos.lastClickX) < 1){
                mousePos.lastClickX = null
            }
        }

        /* ------------------------------------ */
    }
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function gameLoop(){
    gunner.draw()
    gunner.update()

    requestAnimationFrame(gameLoop)
}

window.addEventListener("keydown", function(event){
    if(event.key == "w"){
        gunner.isPressW = true
    }
    if(event.key == "a"){
        gunner.isPressA = true
    }
    if(event.key == "s"){
        gunner.isPressS = true
    }
    if(event.key == "d"){
        gunner.isPressD = true
    }
})

window.addEventListener("keyup", function(event){
    if(event.key == "w"){
        gunner.isPressW = false
    }
    if(event.key == "a"){
        gunner.isPressA = false
    }
    if(event.key == "s"){
        gunner.isPressS = false
    }
    if(event.key == "d"){
        gunner.isPressD = false
    }
})

canvas.addEventListener("contextmenu", function(event){
    event.preventDefault()

    mousePos.lastClickX = mousePos.x
    mousePos.lastClickY = mousePos.y

    console.log("Mouse Pos X: " + mousePos.x)
    console.log("Mouse Pos Y: " + mousePos.y)
})

canvas.addEventListener("mousemove", function(event){
    mousePos.x = event.clientX - canvas.getBoundingClientRect().x
    mousePos.y = event.clientY - canvas.getBoundingClientRect().y
})

window.onload = () => {
    gameLoop()
}