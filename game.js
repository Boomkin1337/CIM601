document.addEventListener('DOMContentLoaded',()=>{
    const airplane=document.querySelector('.airplane')
    const grid=document.querySelector('.grid')
    const alert=document.getElementById('Score Report')
    const scoreDisplay=document.querySelector('#score')
    let isJumping=false
    let gravity=0.9
    let isGameOver=false
    let score=0

    function control(e){
        if(e.keyCode===32){
            if(!isJumping){
                isJumping=true
                jump()
                scoreDisplay.innerHTML=score
                score+=1
            }
        }
    }
    document.addEventListener('keyup',control)

    //Airplane Movement
    let position=0
    function jump(){
        let count=0
        let timerId= setInterval(function(){

            if(count===15){
                clearInterval(timerId)
                let downTimerId=setInterval(function(){
                    if(count===0){
                        clearInterval(downTimerId)
                        isJumping=false
                    }
                    position-=5
                    count--
                    position=position*gravity
                    airplane.style.bottom=position+'px'
                })
            }

            position+=30
            count++
            position=position*gravity
            airplane.style.bottom=position+'px'
        },20)
    }

    //Weather Generator
    function generateWeather(){
        let randomTime=Math.random()*4000
        let weatherPosition=1500
        const weather=document.createElement('div')
        if(!isGameOver) weather.classList.add('weather')
        grid.appendChild(weather)
        weather.style.left=weatherPosition+'px'

        let timerId=setInterval(function(){
            if(weatherPosition>0&&weatherPosition<60&&position<60){
                clearInterval(timerId)
                alert.innerHTML="Your score: "+score+"<br><a href='weather report.html' style='text-decoration:none'>Click here to see the weather report"
                isGameOver=true
                while(grid.firstChild){
                    grid.removeChild(grid.lastChild)
                }
            }

            weatherPosition-=10
            weather.style.left=weatherPosition+'px'
        },20)
        if(!isGameOver) setTimeout(generateWeather,randomTime)
    }
    generateWeather()
})