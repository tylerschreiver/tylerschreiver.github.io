function Leaderboard() {
    this.currentLeaderboard = {};
    this.isAddOpen = false;
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
        var array = []
        for (var key in snapshot.val()) array.push(snapshot.val()[key]);
        array.sort((a, b) => b.score - a.score);
        self.currentLeaderboard = array;
        self.createLeaderboard();
    });
}

Leaderboard.prototype.getLeaderboard = function () {
    return this.currentLeaderboard;
}

Leaderboard.prototype.addScoreToLeaderboard = function (name, score) {
    firebase.database().ref('/leaderboard').push({ name: name, score: score });
    this.closeAddToLeaderboardModal();
    this.openLeaderboardModal();
    document.getElementById("launch").style.display = "none";
}

Leaderboard.prototype.openAddToLeaderboardModal = function () {
    document.getElementById("add-to-leaderboard").style.display = "block";
    this.isAddOpen = true;
}

Leaderboard.prototype.closeAddToLeaderboardModal = function () {
    document.getElementById("add-to-leaderboard").style.display = "none";
    this.isAddOpen = false;
}

Leaderboard.prototype.openLeaderboardModal = function () {
    document.getElementById("leaderboard-modal").style.display = "block";
}

Leaderboard.prototype.closeLeaderboardModal = function () {
    document.getElementById("leaderboard-modal").style.display = "none";
}

Leaderboard.prototype.createLeaderboard = function () {
    var leaderboardHtml = document.getElementById("holder");
    while (leaderboardHtml.firstChild) leaderboardHtml.removeChild(leaderboardHtml.firstChild);

    var counter = 0;
    for (var i = 0; i < this.currentLeaderboard.length; i++) {
        counter++;
        var node = document.createElement("div");
        var countEl = document.createElement("span");
        var name = document.createElement("span");
        var score = document.createElement("span");

        countEl.innerText = counter + ") ";
        name.innerText = this.currentLeaderboard[i].name;
        score.innerText = this.currentLeaderboard[i].score;

        node.classList.add("leaderboard-entry");
        name.classList.add("high-score-name");
        score.style.cssFloat = "right";
        node.appendChild(countEl);
        node.appendChild(name);
        node.appendChild(score);
        leaderboardHtml.appendChild(node);

        if (counter == 10) break;
    }
}