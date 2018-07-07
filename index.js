new Vue({
  el: '#app',
  data: {
    gameOver: false,
    player: {
      hp: 100,
      messages: {
        attack: 'Player hit monster for <points> damage',
        special: 'Player devastated monster with <points> damage',
        heal: {
          success: 'Player healed <points> HP',
          fail: 'Player tried to heal above full health'
        },
        win: 'You win! Play again?',
        quit: {
          prompt: 'Run away to fight another day?',
          cancel: 'Player hesitated'
        }
      }
    },
    monster: {
      hp: 100,
      messages: {
        attack: 'Monster hit player for <points> damage',
        win: 'You lose! Play again?'
      }
    },
    round: 0,
    log: []
  },
  methods: {
    playerTurn: function(action) {
      var outcome;
      var playerRoll = getRandomInt(1, 10);
      var monsterRoll = getRandomInt(1, 10);
      var specialAttackBonus = 10;
      var playerActionMessage;
      var monsterActionMessage = this.monster.messages.attack.replace('<points>', monsterRoll);
      switch (true) {
        case action == 'attack':
          this.monster.hp -= playerRoll;
          break;
        case action == 'special':
          this.monster.hp -= playerRoll += specialAttackBonus;
          break;
        case action == 'heal':
          if (this.player.hp < 100) {
            this.player.hp += playerRoll;
            outcome = 'success';
          } else {
            outcome = 'fail';
          }
          break;
        case action == 'quit':
          if (confirm(this.player.messages[action].prompt)) {
            this.player.hp = 0;
            this.gameOver = true;
            return;
          } else {
            outcome = 'cancel';
            break;
          }
      }
      if (this.monster.hp > 0) {
        this.player.hp -= monsterRoll;
        if (this.player.hp <= 0) {
          if (confirm(this.monster.messages.win)) {
            this.reset();
          } else {
            this.player.hp = 0;
            this.gameOver = true;
          }
        }
        this.log[this.round] = {};
        if (outcome) {
          playerActionMessage = this.player.messages[action][outcome].replace('<points>', playerRoll);
        } else {
          playerActionMessage = this.player.messages[action].replace('<points>', playerRoll);
        }
        this.log[this.round].playerAction = playerActionMessage;
        this.log[this.round].monsterAction = monsterActionMessage;
        this.round++;
      } else {
        if (confirm(this.player.messages.win)) {
          this.reset();
        } else {
          this.monster.hp = 0;
          this.gameOver = true;
        }
      }
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
    reset: function() {
      this.gameOver = false;
      this.round = 0;
      this.log = [];
      this.player.hp = 100;
      this.monster.hp = 100;
    }
  }
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}