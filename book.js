
/*navbar work in small screen*/

const bar = document.getElementById('bar');
    const close = document.getElementById('close');
    const nav = document.getElementById('navbar');

    if (bar) {
        bar.onclick = () => {
            nav.classList.add('active');
        };
    }

    if (close) {
        close.onclick = () => {
            nav.classList.remove('active');
        };
    }

    /*email work*/

    fetch("https://formspree.io/f/mblgpoez", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: "user@example.com",
          
        })
      })
      .then(response => response.json())
      .then(data => console.log(data));


      /*card activate*/

      
    
        /*sproduct*/ 

    document.addEventListener("DOMContentLoaded", function() {
      var MainImage = document.getElementById("MainImage");
      var smallImg = document.getElementsByClassName("small-img");
  
      for (let i = 0; i < smallImg.length; i++) {
          smallImg[i].onclick = function() {
              MainImage.src = smallImg[i].src;
          };
      }
  });