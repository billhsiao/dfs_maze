var request = require ('request');
var mazeGuid = '';
var maze = {};
var x = [];
var y = [];

request ({
  url: 'http://www.epdeveloperchallenge.com/api/init',
  method: 'POST',
}, function (error, response, body) {
  if(error) {
    console.log(error);
    console.log(response);
  } else {
    maze = JSON.parse(body);
    mazeGuid = maze.currentCell.mazeGuid;
      console.log(maze);

      var directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
      var direction = [];
      var bins = 0;
      var north = maze.currentCell.north;
      var east = maze.currentCell.east;
      var south = maze.currentCell.south;
      var west = maze.currentCell.west;
      var map = [north, east, south, west];
      console.log(map);
      function ArrayChecker(element, index, array) {
          if (element === 'UNEXPLORED') {

            direction.unshift(directions[index]);
          }
        }
      function tripleBlock(element, index, array) {
        if (element === 'BLOCKED') {
          bins++;
        }
      }
      function tripleVisit(element, index, array) {
        if (element === 'VISITED') {
          vins++;
        }
      }
      map.forEach(ArrayChecker);
      console.log(direction[0]);

        moves(maze, request);

    function jump(maze, request) {
      var stringX = x[0];
      var stringY = y[0];
      request ({
        url: 'http://www.epdeveloperchallenge.com/api/jump?mazeGuid=' + mazeGuid + '&x=' + stringX + '&y=' + stringY,
        method: 'POST',
      }, function (error, response, body) {
        if(error) {
          console.log(error);
          console.log(response);
        } else {
          maze = JSON.parse(body);
          console.log('JUMPED!!!')
          console.log('http://www.epdeveloperchallenge.com/api/jump?mazeGuid=' + mazeGuid + '&x=' + stringX + '&y=' + stringY);
          x.shift();
          y.shift();
          console.log(maze);
          console.log(x, y);
          var north = maze.currentCell.north;
          var east = maze.currentCell.east;
          var south = maze.currentCell.south;
          var west = maze.currentCell.west;
          var map = [north, east, south, west];
          map.forEach(ArrayChecker);
          moves(maze, request);
          return;
        }
      })
      }


    function moves(maze, request) {
      if (direction.length < 1) {

      }
      request ({
        url: 'http://www.epdeveloperchallenge.com/api/move?mazeGuid=' + mazeGuid + '&direction=' + direction[0],
        method: 'POST',
      }, function (error, response, body) {
        if(error) {
          console.log(error);
          console.log(response);
        } else {
          bins = 0;
          if (direction.length >= 2) {
            direction.pop();
            direction.pop();
            x.push(maze.currentCell.x);
            y.push(maze.currentCell.y);
            console.log('PUSHED FORK' + x[x.length] + y[y.length]);
          }
          direction.pop();
          maze = JSON.parse(body);
          var north = maze.currentCell.north;
          var east = maze.currentCell.east;
          var south = maze.currentCell.south;
          var west = maze.currentCell.west;
          var map = [north, east, south, west];
          console.log(maze);
          console.log(direction, mazeGuid);
          map.forEach(ArrayChecker);
          console.log(map[1]);
          console.log(direction[0]);
          console.log(x, y);
          map.forEach(tripleBlock);
          if (bins === 3) {
            jump(maze, request);
            return;

          }
        }
        moves(maze, request);
      });
    }

      }
    }

);
