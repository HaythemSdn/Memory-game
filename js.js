// starting game
let numbrOfheart=10;
document.querySelector('.control span').onclick=function(){
    let yourName=prompt('Enter your name please');
    if (yourName==null || yourName==""){
    document.querySelector('.name').textContent='Unknowen'

    }else
    {
        document.querySelector('.name').textContent=yourName
    }
    //show the cart for a sec
    ArrayGames.forEach((game)=>game.classList.add('isflipped'))
    setTimeout(()=>{
    ArrayGames.forEach((game)=>game.classList.remove('isflipped'))
    },2000)
   //start the flipping    
document.querySelector('.control').remove()
setTimeout(()=>{
    document.querySelector('.backMusic').play()
    timer()
},500)
}
let gameblocks=document.querySelector('.gameblocks')

let ArrayGames=Array.from(gameblocks.children)

let randomNumbrs=[...Array(ArrayGames.length).keys()]

//make random values in game's array
function shuffle (array){
    let current =array.length
    let random;
    let temp;
    
    while (current>0){
        random =Math.floor(Math.random()*current);
        current--
        temp =array[current]
        array[current]=array[random]
        array[random]=temp
    }
    return array
}
shuffle(randomNumbrs)

// when you flippe the cart
function isflipped(block){
   block.classList.add('isflipped')
}

//when you click on the cart
ArrayGames.forEach((block,index)=>{

    block.style.order=randomNumbrs[index]

    block.addEventListener('click',function(){
        isflipped(block) 

    let flippedBlocks=ArrayGames.filter((blocks)=>blocks.classList.contains('isflipped'))

      if (flippedBlocks.length===2){
        stopClicking();
        checkIfEqual(flippedBlocks[0],flippedBlocks[1])
      } 
    }) 

})

//stop clicking when you select two cart
function stopClicking(){
    gameblocks.classList.add('noClicking')
    setTimeout(()=>{
        gameblocks.classList.remove('noClicking')
    },1000);
}
//check if the two cart selected are equal and increment the tries value 
function checkIfEqual(firstCart,SecoundCart){
    if (firstCart.dataset.technology===SecoundCart.dataset.technology){
        //equal
        firstCart.classList.remove('isflipped')
        SecoundCart.classList.remove('isflipped')
        firstCart.classList.add('areEqual')
        SecoundCart.classList.add('areEqual')
        document.querySelector('.Succes').play()
    }else{
        //not equal
    setTimeout(()=>{
        firstCart.classList.remove('isflipped')
        SecoundCart.classList.remove('isflipped')
    }, 1000);
 
  let deletedImg=  document.querySelector('.coeurImgs img')

  numbrOfheart=numbrOfheart-1
  deletedImg.remove()
  document.querySelector('.fail').play()
  if (numbrOfheart==0){
      endGame()
      document.querySelector('.backMusic').pause()
  }

}
}

//game over 
function endGame(){


gameblocks.classList.add('noClicking');
let gameOverblock=document.querySelector('.gameOver');
gameOverblock.classList.remove('hidden');

}

//timer function
function timer(){
let timeSecond = 120;
const timeH = document.querySelector(".timer");
console.log(timeH)
displayTime(timeSecond);

const countDown = setInterval(() => {
  timeSecond--;
  displayTime(timeSecond);
  if (timeSecond == 0 || timeSecond < 1) {
    clearInterval(countDown);
    endGame()
  }
}, 1000);

function displayTime(second) {
  const min = Math.floor(second / 60);
  const sec = Math.floor(second % 60);
  timeH.innerHTML = `
  ${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}
  `;
}
}






