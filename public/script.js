var coins = 0;
var cor_ans = "hi";
let apiUrl;
var userthere = "no"
let globaltype;

var quiz_div = $(".quiz-container");    // Store the quiz div by using JQuery to find it in HTML
quiz_div.css("display", "none"); 

$(".table-container").css("display","none");    // hide leaderboard

function update_coins() {

    var coin_element = $("#coin-value");
    coin_element.text(coins);

}

function updateText(){

    var ldtext =  $(".ld")
    
    if(window.innerWidth <= 480){

        ldtext.text("Lbd")

    }
    else{

        ldtext.text("Leaderboard")

    }


}

window.addEventListener('resize', updateText);
window.addEventListener('load', updateText);

function decodeHTMLEntities(text) {                     // used to get rid of the unesseccary characters

    var textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
}

function show_quiz(quiz_list) { 

    var ques = $(".question");
    var buttons = $(".q");              // all 4 buttons are under the class name "q"

    let check = false;
    let randy = Math.floor((Math.random() * 3) + 1);        // Choose a random number between 3 and 0 ( 4 questions )

    ques.text(decodeHTMLEntities(quiz_list.question));      

    for (var i = 0; i < buttons.length; i++) {

        if (i === randy && check == false) {            // When iterating through the buttons during creating, if index = random, make sure that button is the correct answer

            $(buttons[i]).text(decodeHTMLEntities(quiz_list.correct_answer));   // Set text in the box as the correct answer

            cor_ans = $(buttons[i]).text();     // Store the correct answer from the created correct answer button

            check = true;   // To signal that the correct answer has been set for adjusting index of inocorrect answer, you will understand reading commends below
            continue;
        }

        $(buttons[i]).css("box-shadow","none");
            
        if(check == true)
            $(buttons[i]).text(decodeHTMLEntities(quiz_list.incorrect_answers[i - 1])); // Since we are using i variable here, and there are only 3 incorrect answers, we use i - 1, 
        else                                                                             //since i has already been iterated once while setting the correct answer
            $(buttons[i]).text(decodeHTMLEntities(quiz_list.incorrect_answers[i]));
            // correct answer not set, so buttons[i] and incorrect_answers[i] can be same
                        
    }
}

function fetchQuizData(type) {

    const apiUrl = `https://opentdb.com/api.php?amount=1&category=${type}&difficulty=medium&type=multiple`;

    // gk - 9
    // vg - 15
    // cs - 18

    fetch(apiUrl)

        .then(response => response.json())
        .then(data => {

            if (data.results && data.results.length > 0) 
                show_quiz(data.results[0]);
            else {

                console.error('API returned empty results.');
                setTimeout(fetchQuizData(type), 1000);
                // Handle the case where the API results are empty.
                
            }
        })
}

function quiz_generate(type) {

    globaltype = type
    $(".genre").css("display", "none");
    quiz_div.css("display", "flex");
    fetchQuizData(type);
}


$(".q").on("click", function() {                // all buttons are under the class name "q" are sensitive to this

    if ($(this).text() == cor_ans){

        // check to see if button clicked's text is correct or not
        $(this).css("box-shadow","0 0 10px rgba(0, 128, 0)");
        coins = coins + 1;

        if(userthere == "yes"){
            
            try{
                fetch('/updatecoins')
            }
            catch(error){
                console.log(error)
            }
        }
        
        update_coins();

    } 

    fetchQuizData(globaltype);


});

$(".ld").on("click", function() {

    $(".genre").css("display", "none");
    $(".quiz-container").css("display","none");
    $(".table-container").css("display","flex");

    fetch('/display_leaderboard') 

        .then(response => response.json())

        .then(data => { 

            console.log(data);
            $("table tbody").empty();

            let ranker = 0;
            
            data.forEach(item => {      // .forEach method is used to iterate over every element in the array. <array>.forEach(<customname>)

                var row = $("<tr>");

                ranker++;
                    
                var rank = $("<td>").text(ranker);
                var name = $("<td>").text(item.username);
                var country = $("<td>").text(item.country);
                var score = $("<td>").text(item.coins);
            
                row.append(rank);
                row.append(name);
                row.append(country);
                row.append(score);
            
                $("table").append(row);
          });
    });
})

function loginorsignin() {                  // WHEN CLICK ON USER PROFILE ICON TO REGISTER NEW ACCOUNT OR LOGIN

    window.location.href = '/redirect';
    
}

function checkifsigned(){

    fetch('/ac_coins') 

        .then(response => response.json())
        .then(data => { 

            if(data.user == "notloggedin"){

                console.log("Hi")
            }
            else{

                coins = data.coin;
                userthere = "yes"
                update_coins();

            }
        })

}   

checkifsigned()






    
    



  
  


