


function randomInteger(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }
  
  function resultOnLoad() {
    document.getElementById("result").innerHTML = randomInteger(4, 8);
  }
  
resultOnLoad();