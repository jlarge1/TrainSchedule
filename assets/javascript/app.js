$(document).ready(function () {


    var config = {
        apiKey: "AIzaSyDcjxo5AuQUvgRL5Z1IpX1m7PrQ5JHxwxw",
        authDomain: "trainschedule-7e833.firebaseapp.com",
        databaseURL: "https://trainschedule-7e833.firebaseio.com",
        projectId: "trainschedule-7e833",
        storageBucket: "trainschedule-7e833.appspot.com",
        messagingSenderId: "743808562765"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    var trainName = "";
    var trainDestination = "";
    var trainFirstArrivalTime ="";
    var trainFrequency = 0;


    $("#newTrainSubmit").on("click", function () {
        trainName = $("#newTrainName").val().trim();
        trainDestination = $("#newTrainDestination").val().trim();
        trainFirstArrivalTime = $("#newTrainFirst").val().trim();
        trainFrequency = $("#newTrainFrequency").val().trim();

        database.ref().push({
            trainName: trainName,
            trainDestination: trainDestination,
            trainFirstArrivalTime: trainFirstArrivalTime,
            trainFrequency: trainFrequency
        });

        $("input").trigger("reset");

    });

    database.ref().on("child_added", function (snapshot) {

        var newTr = $("<tr>");
        var newTrainName = $("<td>").text(snapshot.val().trainName);
        var newTrainDestination = $("<td>").text(snapshot.val().trainDestination);
        var newTrainFirst = snapshot.val().trainFirstArrivalTime;
        var newTrainFrequency = $("<td>").text(snapshot.val().trainFrequency);

        var firstTimeConverted = moment(newTrainFirst, "HH:mm").subtract(1, "years");
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var tRemainder = diffTime % snapshot.val().trainFrequency;
        var tMinutesTillTrain = snapshot.val().trainFrequency - tRemainder;
        var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("MMM DD YYYY hh:mm a");

        var nextArrival = $("<td>").text(nextTrain);

        var minutesAway = $("<td>").text(tMinutesTillTrain);

        newTr.append(newTrainName)
            .append(newTrainDestination)
            .append(newTrainFrequency)
            .append(nextArrival)
            .append(minutesAway)

        $(".table").append(newTr);
    });


});