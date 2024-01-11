var coins = 0;
var cor_ans = "hi";
var apiUrl = 'https://opentdb.com/api.php?amount=1&category=9&difficulty=medium&type=multiple';

var quiz_div = $(".quiz-container");    // Store the quiz div by using JQuery to find it in HTML
quiz_div.css("display", "none"); 

$(".table-container").css("display","none");    // hide leaderboard

function update_coins() {

    var coin_element = $("#coin-value");
    coin_element.text(coins);

}

function decodeHTMLEntities(text) {                     // used to get rid of the unesseccary characters

    var textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
}

function adjustsize(quiz_list) {                // Adjust size of the quiz container according to length of question

    if((quiz_list.question).length <= 39)
        $(".quiz").css("height", "340px");

    if((quiz_list.question).length > 39)
        $(".quiz").css("height", "380px");

    if((quiz_list.question).length > 78)
        $(".quiz").css("height", "420px");
    
}

function show_quiz(quiz_list) { 

    var ques = $(".question");
    var buttons = $(".q");              // all 4 buttons are under the class name "q"

    let check = false;
    let randy = Math.floor((Math.random() * 3) + 1);        // Choose a random number between 3 and 0 ( 4 questions )

    ques.text(decodeHTMLEntities(quiz_list.question));      

    adjustsize(quiz_list);

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

function fetchQuizData() {

    fetch(apiUrl)

        .then(response => response.json())
        .then(data => {

            if (data.results && data.results.length > 0) {

                console.log(data.results[0]);
                show_quiz(data.results[0]);

            } else {

                console.error('API returned empty results.');
                setTimeout(fetchQuizData, 1000);
                // Handle the case where the API results are empty.
                
            }
        })
}

function quiz_generate() {

    $(".genre").css("display", "none");
    quiz_div.css("display", "flex");
    fetchQuizData();
}


$(".q").on("click", function() {                // all buttons are under the class name "q" are sensitive to this

    if ($(this).text() == cor_ans){

        // check to see if button clicked's text is correct or not
        $(this).css("box-shadow","0 0 10px rgba(0, 128, 0)");
        coins = coins + 1;
        update_coins();

    } 

    fetchQuizData();


});

$(".ld").on("click", function() {

    $(".genre").css("display", "none");
    $(".quiz-container").css("display","none");
    $(".table-container").css("display","flex");

    fetch('/display_leaderboard') 

        .then(response => response.json())

        .then(data => { 

            console.log(data);

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



    
    



  
  


