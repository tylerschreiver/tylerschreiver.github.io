function Leaderboard() {
    this.currentLeaderboard = {};
    this.hasUpdated = false;
    var config = {
        apiKey: "AIzaSyBlOg2jUiMC7xCEH4NlhVVtZEop9knMfjE",
        authDomain: "high-score-47752.firebaseapp.com",
        databaseURL: "https://high-score-47752.firebaseio.com",
        projectId: "high-score-47752",
        storageBucket: "high-score-47752.appspot.com",
        messagingSenderId: "400234420370"
    };
    this.app = firebase.initializeApp(config);
    var data = firebase.database().ref('/leaderboard/');
    var self = this;
    data.on("value", function (snapshot) {
        this.hasUpdated = false;
        self.currentLeaderboard = snapshot.val();
    });
}

Leaderboard.prototype.getLeaderboard = function () {
    return this.currentLeaderboard;
}

Leaderboard.prototype.createLeaderboard = function () {
    var leaderboardHtml = document.getElementById("leaderboard-modal");
    leaderboardHtml.style.display = "block";
    if (!this.hasUpdated) {
        leaderboardHtml.innerHtml = "";
        var counter = 0;
        for (var key in this.currentLeaderboard) {
            counter++;
            var node = document.createElement("div");
            node.innerText = counter.toString() + ")" + this.currentLeaderboard[key].name + ": " + this.currentLeaderboard[key].score;
            node.classList.add("leaderboard-entry");
            document.getElementById("leaderboard-modal-content").appendChild(node);

            if (counter == 10) break;
        }
    }

    this.hasUpdated = true;
}