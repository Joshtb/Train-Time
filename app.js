$(document).ready(function () {
    var nextTrain = '';
    var nextTrainFormatted = '';
    var minutesAway = '';
    var firstTimeConverted = '';
    var currentTime = '';
    var diffTime = '';
    var tRemainder = '';
    var minutesTillTrain = '';

  


    var button = $("#add-train");
    var config = {
        apiKey: "AIzaSyDUmyT2vw7XipVgTJ0vmTscn84ODbiqb1o",
        authDomain: "trains-85ce6.firebaseapp.com",
        databaseURL: "https://trains-85ce6.firebaseio.com/",
        projectId: "trains-85ce6",
        storageBucket: "trains-85ce6.appspot.com",
        messagingSenderId: "319999716920"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    $(".bottomform").on("submit", function (event) {
        event.preventDefault();

        console.log("clicked");
        var name = $("#train-name-imput").val();
        var desT = $("#destination-imput").val();
        var freQ = $("#frequency-imput").val();
        var arriVal = $("#arrival-imput").val();


        // firstTimeConverted = moment(arriVal, "hh:mm").subtract(1, "years");
        // currentTime = moment();
        // diffTime = currentTime.diff(moment(firstTimeConverted), "minutes");
        // tRemainder = diffTime % freQ;
        // minutesTillTrain = freQ - tRemainder;
        // nextTrain = moment().add(minutesTillTrain, "minutes");
        // nextTrainFormatted = moment(nextTrain).format("hh:mm");
     
       
        
    



        var newTrain = {
            name: name,
            destination: desT,
            frequency: freQ,
            arrival: arriVal,
            
        }
        database.ref().push(newTrain);
        console.log("minutestiltrain"+minutesTillTrain);
        console.log("nexttrain"+nextTrain);
        console.log("nexttrainformatted"+nextTrainFormatted);
      
        console.log("tremainder"+tRemainder)






        // console.log(newTrain.name);
        // console.log(newTrain.destination);
        // console.log(newTrain.frequency);
        // console.log(newTrain.arrival);
        // console.log(newTrain.minutes);
        $("#train-name-imput").val("");
        $("#destination-imput").val("");
        $("#frequency-imput").val("");
        $("#arrival-imput").val("");
       

    });

    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        // Store everything into a variable.
        var name = childSnapshot.val().name;
        var desT = childSnapshot.val().destination;
        var freQ = childSnapshot.val().frequency;
        var arriVal = childSnapshot.val().arrival;

        //MOMENT.Js MATH -----------------
        // when you first put in the time, format to hours and mins and subtract one year because you cant work in present
        firstTimeConverted = moment(arriVal, "hh:mm").subtract(1, "years");
        //displays current date and time
        currentTime = moment();
        
        diffTime = currentTime.diff(moment(firstTimeConverted), "minutes");
        
        tRemainder = diffTime % freQ;
        //remaining time until next train
        minutesTillTrain = freQ - tRemainder;
        //next train after first train time has passed
        nextTrain = moment().add(minutesTillTrain, "minutes");
        //formatting the next train to hours and mins
        nextTrainFormatted = moment(nextTrain).format("hh:mm");

        // Train Info
        console.log("Child Snapshot--------------")
        console.log("Train Name " + name);
        console.log("Train Destination " + desT);
        console.log("Train Frequency " + freQ);
        console.log("Mins til next Train " + minutesTillTrain);
        console.log("Next Train " +nextTrainFormatted);
   

        var newRow = $("<tr>").append(
            $("<td>").text(name),
            $("<td>").text(desT),
            $("<td>").text(freQ),
            $("<td>").text(nextTrainFormatted),
            $("<td>").text(minutesTillTrain)

        );

        $("#trainz > tbody").append(newRow);
    });
});