
var sprint = require('./sprint');
var board = require('./board');

module.exports = GreenHopper;

function GreenHopper(jiraClient) {

   this.sprint = new sprint(jiraClient);
   this.board = new board(jiraClient);
}
