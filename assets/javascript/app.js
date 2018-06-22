//This quiz object contains all the questions and answers for the trivia game
        quiz = {
            questions: [{
                problem: "Which one is not a powerpuff girl?",
                answer: [{
                  name: "Bread",
                  correct: true  
                }, {
                  name: "Blossom",
                  correct: false
                }, {
                  name: "Buttercup",
                  correct: false
                }, {
                  name: "Bubbles",
                  correct: false
                }],
                picture: "assets/images/bread.png"
            },{
                problem: "Which one is not an insect?",
                answer: [{
                  name: "Spider",
                  correct: true  
                }, {
                  name: "Fly",
                  correct: false
                }, {
                  name: "Caterpillar",
                  correct: false
                }, {
                  name: "Centipede",
                  correct: false
                }],
                picture: "assets/images/spider.png"
            },{
                problem: "Which one of these birds can't fly?",
                answer: [{
                  name: "Chicken",
                  correct: true  
                }, {
                  name: "Sparrow",
                  correct: false
                }, {
                  name: "Eagle",
                  correct: false
                }, {
                  name: "Finch",
                  correct: false
                }],
                picture: "assets/images/chicken.jpg"
            },{
                problem: "Which one of these HTML tags are fake?",
                answer: [{
                  name: "every",
                  correct: true  
                }, {
                  name: "while",
                  correct: false
                }, {
                  name: "for",
                  correct: false
                }, {
                  name: "forEach",
                  correct: false
                }],
                picture: "assets/images/every.png"
            }]
        }


        $(document).ready(function(){
            var timer;
            var countdown;
            var indexNum;
            var invalidIndex = [];
            var questionNum = -1;
            var clockRunning = false;
            var correctNum = 0;
            var wrongNum = 0;

            //This function makes sure that the order of the answers are randomized each time.
            //An answer is given a random position (indexNum), but it is checked against the invalidIndex array to ensure
            //that the position given by indexNum isn't already occupied already
            var uniqueNumFinder = function(uniqueNum) {
                while (!uniqueNum){
                    indexNum = Math.floor(Math.random()*4);
                    uniqueNum = true;
                    for (var i = 0; i < invalidIndex.length; i++){
                        if (indexNum == invalidIndex[i]){
                            uniqueNum = false;
                        }
                    }
                }
                return indexNum;
            }


            //The function that runs when the user runs out of time on the clock
            var dropTime = function(){
              timer --;
              $(".timerR").html(timer);
              if (timer == 0){

                    wrongNum ++;

                    //All the onclick event handlers are removed, and the buttons are hidden temporarily
                    $(".answer1").off("click");
                    $(".answer2").off("click");
                    $(".answer3").off("click");
                    $(".answer4").off("click");
                    $(".answer1").hide();
                    $(".answer2").hide();
                    $(".answer3").hide();
                    $(".answer4").hide();
                    $(".question").html("Time ran out! You lose! The answer was " + quiz.questions[questionNum].answer[0].name + ".");
                    $(".answer1").removeClass("wrongAnswer");
                    $(".answer1").removeClass("correctAnswer");
                    $(".answer2").removeClass("wrongAnswer");
                    $(".answer2").removeClass("correctAnswer");
                    $(".answer3").removeClass("wrongAnswer");
                    $(".answer3").removeClass("correctAnswer");
                    $(".answer4").removeClass("wrongAnswer");
                    $(".answer4").removeClass("correctAnswer");
                    $(".question").append("<div class=\"row\"></div>");
                    $(".question").append("<div class=\"row newRow\"></div>");
                    $(".newRow").append("<br> <img src=" + quiz.questions[questionNum].picture + " class=\"col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-8 offset-sm-2 col-xs-8 offset-xs-2 image\" style=\"margin-bottom:80px\"/>");

                    clearInterval(countdown);

                    if (questionNum<quiz.questions.length){
                        setTimeout(function(){
                            timer= 11;
                            clockRunning = false;
                            if (!clockRunning) {
                                countdown = setInterval(dropTime, 1000);
                                clockRunning = true;
                            }
                            invalidIndex = [];
                            questionSetup(); 
                        }, 2000);
                    } else {
                        setTimeout(function(){
                            $(".newRow").append("<p class=\"col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-8 offset-sm-2 col-xs-8 offset-xs-2 image\" style=\"margin-bottom:80px\"> Number of correct answers is: " + correctNum + "</p><p class=\"col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-8 offset-sm-2 col-xs-8 offset-xs-2 image\" style=\"margin-bottom:80px\"> Number of wrong answers is: " + wrongNum + "</p>");
                        }, 2000);
                    }
              }
            }

            timer = 10;
            if (!clockRunning) {
                    countdown = setInterval(dropTime, 1000);
                    clockRunning = true;
            }
            
            //This function sets up the question being displayed. It picks a random question out of the question object and displays it
            //Each button is assigned a correctAnswer or wrongAnswer class respectively for the sake of the onclick event handler
            
            var questionSetup = function(){

                $(".answer1").show();
                $(".answer2").show();
                $(".answer3").show();
                $(".answer4").show();
                $(".question").show();

                questionNum ++;

                $(".question").html(quiz.questions[questionNum].problem);

                $(".answer1").html(quiz.questions[questionNum].answer[uniqueNumFinder(false)].name);
                if (quiz.questions[questionNum].answer[indexNum].correct == true){
                    $(".answer1").addClass("correctAnswer");
                } else {
                    $(".answer1").addClass("wrongAnswer");
                }

                invalidIndex.push(indexNum);
                uniqueNumFinder(false);

                $(".answer2").html(quiz.questions[questionNum].answer[uniqueNumFinder(false)].name);
                if (quiz.questions[questionNum].answer[indexNum].correct == true){
                    $(".answer2").addClass("correctAnswer");
                } else {
                    $(".answer2").addClass("wrongAnswer");
                }

                invalidIndex.push(indexNum);
                uniqueNumFinder(false);

                $(".answer3").html(quiz.questions[questionNum].answer[uniqueNumFinder(false)].name);
                if (quiz.questions[questionNum].answer[indexNum].correct == true){
                    $(".answer3").addClass("correctAnswer");
                } else {
                    $(".answer3").addClass("wrongAnswer");
                }

                invalidIndex.push(indexNum);
                uniqueNumFinder(false);

                $(".answer4").html(quiz.questions[questionNum].answer[uniqueNumFinder(false)].name);
                if (quiz.questions[questionNum].answer[indexNum].correct == true){
                    $(".answer4").addClass("correctAnswer");
                } else {
                    $(".answer4").addClass("wrongAnswer");
                }

                $(".wrongAnswer").on("click", function(){
                    
                    wrongNum ++;

                    //All the onclick event handlers are removed, and the buttons are hidden temporarily
                    $(".answer1").off("click");
                    $(".answer2").off("click");
                    $(".answer3").off("click");
                    $(".answer4").off("click");
                    $(".answer1").hide();
                    $(".answer2").hide();
                    $(".answer3").hide();
                    $(".answer4").hide();
                    $(".question").html("Your answer was wrong! The answer was " + quiz.questions[questionNum].answer[0].name + ".");
                    $(".answer1").removeClass("wrongAnswer");
                    $(".answer1").removeClass("correctAnswer");
                    $(".answer2").removeClass("wrongAnswer");
                    $(".answer2").removeClass("correctAnswer");
                    $(".answer3").removeClass("wrongAnswer");
                    $(".answer3").removeClass("correctAnswer");
                    $(".answer4").removeClass("wrongAnswer");
                    $(".answer4").removeClass("correctAnswer");
                    $(".question").append("<div class=\"row\"></div>");
                    $(".question").append("<div class=\"row newRow\"></div>");
                    $(".newRow").append("<br> <img src=" + quiz.questions[questionNum].picture + " class=\"col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-8 offset-sm-2 col-xs-8 offset-xs-2 image\" style=\"margin-bottom:80px\"/>");

                    clearInterval(countdown);
                    
                    if (questionNum<quiz.questions.length){
                        setTimeout(function(){
                            timer= 11;
                            clockRunning = false;
                            if (!clockRunning) {
                                countdown = setInterval(dropTime, 1000);
                                clockRunning = true;
                            }
                            invalidIndex = [];
                            questionSetup(); 
                        }, 2000);
                    } else {
                        $(".newRow").append("<p class=\"col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-8 offset-sm-2 col-xs-8 offset-xs-2 image\" style=\"margin-bottom:80px\"> Number of correct answers is: " + correctNum + "</p><p class=\"col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-8 offset-sm-2 col-xs-8 offset-xs-2 image\" style=\"margin-bottom:80px\"> Number of wrong answers is: " + wrongNum + "</p>");
                    }
                });

                //Re-assigning the on-click event handlers to each button so that pressing the right button gives either Correct or Wrong as it should be 
                $(".correctAnswer").on("click", function(){

                    correctNum ++;

                    //All the onclick event handlers are removed, and the buttons are hidden temporarily
                    $(".answer1").off("click");
                    $(".answer2").off("click");
                    $(".answer3").off("click");
                    $(".answer4").off("click");
                    $(".answer1").hide();
                    $(".answer2").hide();
                    $(".answer3").hide();
                    $(".answer4").hide();
                    $(".question").html("Your answer was correct! The answer is indeed " + quiz.questions[questionNum].answer[0].name + ".");
                    $(".answer1").removeClass("wrongAnswer");
                    $(".answer1").removeClass("correctAnswer");
                    $(".answer2").removeClass("wrongAnswer");
                    $(".answer2").removeClass("correctAnswer");
                    $(".answer3").removeClass("wrongAnswer");
                    $(".answer3").removeClass("correctAnswer");
                    $(".answer4").removeClass("wrongAnswer");
                    $(".answer4").removeClass("correctAnswer");
                    $(".question").append("<div class=\"row\"></div>");
                    $(".question").append("<div class=\"row newRow\"></div>");
                    $(".newRow").append("<br> <img src=" + quiz.questions[questionNum].picture + " class=\"col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-8 offset-sm-2 col-xs-8 offset-xs-2 image\" style=\"margin-bottom:80px\"/>");

                    clearInterval(countdown);

                    if (questionNum<quiz.questions.length){
                        setTimeout(function(){
                            timer= 11;
                            clockRunning = false;
                            if (!clockRunning) {
                                countdown = setInterval(dropTime, 1000);
                                clockRunning = true;
                            }
                            invalidIndex = [];
                            questionSetup(); 
                        }, 2000);
                    } else {
                        $(".newRow").append("<p class=\"col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-8 offset-sm-2 col-xs-8 offset-xs-2 image\" style=\"margin-bottom:80px\"> Number of correct answers is: " + correctNum + "</p><p class=\"col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-8 offset-sm-2 col-xs-8 offset-xs-2 image\" style=\"margin-bottom:80px\"> Number of wrong answers is: " + wrongNum + "</p>");
                    }
   
                });

                
            };
            
            //Initializing the game
            questionSetup();

            //Fun-looking CSS so that the buttons pop out when hovered over
            $(".answer1").mouseover(function(){
                 $(".answer1").animate({
                    fontSize: '1.5em', 
                    height: "50px"
                 }, "slow");
                
            })
            $(".answer1").mouseout(function(){
                 $(".answer1").animate({
                    fontSize: '1em',
                    height: "35px" 
                 }, "fast");
                
            })

            
            $(".answer2").mouseover(function(){
                 $(".answer2").animate({
                    fontSize: '1.5em',
                    height: "50px" 
                 }, "slow");
                
            })

            $(".answer2").mouseout(function(){
                 $(".answer2").animate({
                    fontSize: '1em', 
                    height: "35px" 
                 }, "fast");
                
            })

            $(".answer3").mouseover(function(){
                 $(".answer3").animate({
                    fontSize: '1.5em', 
                    height: "50px" 
                 }, "slow");
                
            })
            $(".answer3").mouseout(function(){
                 $(".answer3").animate({
                    fontSize: '1em', 
                    height: "35px" 
                 }, "fast");
                
            })

            
            $(".answer4").mouseover(function(){
                 $(".answer4").animate({
                    fontSize: '1.5em', 
                    height: "50px" 
                 }, "slow");
                
            })
            $(".answer4").mouseout(function(){
                 $(".answer4").animate({
                    fontSize: '1em', 
                    height: "35px" 
                 }, "fast");
                
            })
      
     });