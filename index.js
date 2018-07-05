new Vue({
  el: '#app',
  data: {
    playerHP: 100,
    monsterHP: 100,
    gameOver: false,
    round: 0,
    log: []
  },
  watch: {
    playerHP: function(e) {
      if (e <= 0) {
        this.gameOver = true;
        if (confirm('You lose! Play again?')) {
          this.reset();
        }
      } else if (e > 100) {
        this.playerHP = 100;
      }
    },
    monsterHP: function(e) {
      if (e <= 0) {
        this.gameOver = true;
        if (confirm('You win! Play again?')) {
          this.reset();
        }
      }
    }
  },
  methods: {
    playerAttack: function() {
      var points = getRandomInt(1, 10);
      this.monsterHP -= points;
      this.log[this.round] = {};
      this.log[this.round].playerAction = 'Player hit monster for ' + points + ' damage';
      this.monsterAttack();
      this.round++;
    },
    specialAttack: function() {
      var points = getRandomInt(10, 20);
      this.monsterHP -= points;
      this.log[this.round] = {};
      this.log[this.round].playerAction = 'Player devastated monster with ' + points + ' damage';
      this.monsterAttack();
      this.round++;
    },
    monsterAttack: function() {
      var points = getRandomInt(1, 10);
      this.playerHP -= points;
      this.log[this.round].monsterAction = 'Monster hit player for ' + points + ' damage';
    },
    heal: function() {
      var points = getRandomInt(1, 10);
      this.log[this.round] = {};
      if (this.playerHP >= 100) {
        this.log[this.round].playerAction = 'Player tried to heal above full health';
      } else {
        this.playerHP += points;
        this.log[this.round].playerAction = 'Player healed ' + points + ' HP';
      }
      this.monsterAttack();
      this.round++;
    },
    healthState: function(hp) {
      var color;
      switch (true) {
        case hp < 25: color = 'red'; break;
        case hp < 60: color = 'goldenrod'; break;
        default: color = 'green';
      }
      return color;
    },
    quit: function() {
      this.playerHP = 0;
      this.round = 0;
      this.log = [];
    },
    reset: function() {
      this.gameOver = false;
      this.round = 0;
      this.log = [];
      this.playerHP = 100;
      this.monsterHP = 100;
    }
  }
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}