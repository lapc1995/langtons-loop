import React from 'react';
import { Stage, Layer, Rect } from "react-konva";

/*States
  0 - Dead space
  1 - Inside wire
  2 - Insulation
  3 -
  4 -
  5 -
  6 -
  7 -

*/

class LangtonsLoop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      start: false
    }
  }

  componentDidMount() {
    this.setState({
        map: this.generateMap(),
        start: true,
    });

    this.intervalID = setInterval(
        () => this.tick(),
        1/30
    );
  }

  componentWillUnmount() {
      clearInterval(this.intervalID);
  }

  tick() {
    var new_map = new Array(Number(this.props.height));
    for(var i = 0; i < this.props.height; i++) {
      new_map[i] = Array(Number(this.props.width))
    }

    for( i = 0; i < this.props.height; i++) {
        for(var j = 0; j < this.props.width; j++) {
          if(this.state.map[i][j] === 7) {
            var nextPositions = this.getNeighbors(i,j, this.state.map, 1);
            var backPositions = this.getNeighbors(i,j, this.state.map, 0);
            for(var h = 0; h < nextPositions.length; h++) 
              new_map[nextPositions[h].y][nextPositions[h].x] = 7;
            new_map[i][j] = 0;
            new_map[backPositions[0].y][backPositions[0].x] = 1;
          } else if(new_map[i][j] == null)
            new_map[i][j] = this.state.map[i][j];
        }
    }

   
    this.setState({
        map: new_map
    });
    
  }

  getNeighbors(i,j, map, type) {
    var results = [];
    if(map[i-1][j] === type)
      results.push({y: i-1, x: j})
    if(map[i+1][j] === type)
      results.push({y: i+1, x: j})
    if(map[i][j-1] === type)
      results.push({y: i, x: j-1})
    if(map[i][j+1] === type)
      results.push({y: i, x: j+1})
    return results;
  }

  render() {
    if(this.state.start) {
      return <div><RenderGame game={this.state.map}/></div>
    }
    return <div></div>
  }

  generateMap() {

    var center_x = Math.floor(this.props.width / 2);
    var center_y = Math.floor(this.props.height / 2);

    var new_map = new Array(Number(this.props.height));
    for(var i = 0; i < this.props.height; i++) {
        new_map[i] = Array(Number(this.props.width))
        for(var j = 0; j < this.props.width; j++) {
            new_map[i][j] = 0;
        }
    }

    //new_map[center_y][center_x] = 1;

    //Inner insulation
    new_map[center_y-2][center_x-2] = 2;
    new_map[center_y-1][center_x-2] = 2;
    new_map[center_y][center_x-2] = 2;
    new_map[center_y+1][center_x-2] = 2;
    new_map[center_y+2][center_x-2] = 2;

    new_map[center_y+2][center_x-1] = 2;
    new_map[center_y+2][center_x] = 2;
    new_map[center_y+2][center_x+1] = 2;
    new_map[center_y+2][center_x+2] = 2;
    new_map[center_y+2][center_x+3] = 2;

    new_map[center_y+1][center_x+3] = 2;
    new_map[center_y][center_x+3] = 2;
    new_map[center_y-1][center_x+3] = 2;
    new_map[center_y-2][center_x+3] = 2;
    new_map[center_y-3][center_x+3] = 2;

    new_map[center_y-3][center_x+2] = 2;
    new_map[center_y-3][center_x+1] = 2;
    new_map[center_y-3][center_x] = 2;
    new_map[center_y-3][center_x-1] = 2;
    new_map[center_y-3][center_x-2] = 2;

    //Outer insulation
    new_map[center_y-4][center_x-4] = 2;
    new_map[center_y-3][center_x-4] = 2;
    new_map[center_y-2][center_x-4] = 2;
    new_map[center_y-1][center_x-4] = 2;
    new_map[center_y][center_x-4] = 2;
    new_map[center_y+1][center_x-4] = 2;
    new_map[center_y+2][center_x-4] = 2;
    new_map[center_y+3][center_x-4] = 2;


    new_map[center_y+4][center_x-3] = 2;
    new_map[center_y+4][center_x-2] = 2;
    new_map[center_y+4][center_x-1] = 2;
    new_map[center_y+4][center_x] = 2;
    new_map[center_y+4][center_x+1] = 2;
    new_map[center_y+4][center_x+2] = 2;
    new_map[center_y+4][center_x+3] = 2;
    new_map[center_y+4][center_x+4] = 2;

    //arm
    new_map[center_y+2][center_x+5] = 2;
    new_map[center_y+2][center_x+6] = 2;
    new_map[center_y+2][center_x+7] = 2;
    new_map[center_y+2][center_x+8] = 2;
    new_map[center_y+2][center_x+9] = 2;
    new_map[center_y+4][center_x+5] = 2;
    new_map[center_y+4][center_x+6] = 2;
    new_map[center_y+4][center_x+7] = 2;
    new_map[center_y+4][center_x+8] = 2;
    new_map[center_y+4][center_x+9] = 2;
    new_map[center_y+3][center_x+10] = 2;


    new_map[center_y+1][center_x+5] = 2;
    new_map[center_y][center_x+5] = 2;
    new_map[center_y-1][center_x+5] = 2;
    new_map[center_y-2][center_x+5] = 2;
    new_map[center_y-3][center_x+5] = 2;
    new_map[center_y-4][center_x+5] = 2;

    new_map[center_y-5][center_x+4] = 2;
    new_map[center_y-5][center_x+3] = 2;
    new_map[center_y-5][center_x+2] = 2;
    new_map[center_y-5][center_x+1] = 2;
    new_map[center_y-5][center_x] = 2;
    new_map[center_y-5][center_x-1] = 2;
    new_map[center_y-5][center_x-2] = 2;
    new_map[center_y-5][center_x-3] = 2;

    //Inner wiring
    new_map[center_y-4][center_x-3] = 1;
    new_map[center_y-3][center_x-3] = 1;
    new_map[center_y-2][center_x-3] = 1;
    new_map[center_y-1][center_x-3] = 1;
    new_map[center_y][center_x-3] = 1;
    new_map[center_y+1][center_x-3] = 1;
    new_map[center_y+2][center_x-3] = 1;
    new_map[center_y+3][center_x-3] = 1;

    new_map[center_y+3][center_x-2] = 1;
    new_map[center_y+3][center_x-1] = 1;
    new_map[center_y+3][center_x] = 1;
    new_map[center_y+3][center_x+1] = 1;
    new_map[center_y+3][center_x+2] = 1;
    new_map[center_y+3][center_x+3] = 1;
    new_map[center_y+3][center_x+4] = 1;

    //arm
    new_map[center_y+3][center_x+5] = 1;
    new_map[center_y+3][center_x+6] = 1;
    new_map[center_y+3][center_x+7] = 1;
    new_map[center_y+3][center_x+8] = 1;
    new_map[center_y+3][center_x+9] = 1;

    new_map[center_y-4][center_x+4] = 1;
    new_map[center_y-3][center_x+4] = 1;
    new_map[center_y-2][center_x+4] = 1;
    new_map[center_y-1][center_x+4] = 1;
    new_map[center_y][center_x+4] = 1;
    new_map[center_y+1][center_x+4] = 1;
    new_map[center_y+2][center_x+4] = 1;

    new_map[center_y-4][center_x-2] = 1;
    new_map[center_y-4][center_x-1] = 1;
    new_map[center_y-4][center_x] = 1;
    new_map[center_y-4][center_x+1] = 1;
    new_map[center_y-4][center_x+2] = 1;
    new_map[center_y-4][center_x+3] = 1;

    //
    new_map[center_y-4][center_x+3] = 7;
    new_map[center_y-4][center_x+4] = 0;

    new_map[center_y-4][center_x] = 7;
    new_map[center_y-4][center_x+1] = 0;

    return new_map;
  }

  
}


function RenderGame(props) {
  var rectangles = []
  for(var i = 0; i < props.game.length; i++) { 
      for(var j = 0; j < props.game[i].length; j++) { 
          let color;
          if(props.game[i][j] === 0)
            color = "rgb(0,0,0)";
          else if (props.game[i][j] === 1)
            color = "rgb(0,0,255)";
          else if (props.game[i][j] === 2)
            color = "rgb(255,0,0)";
          else if (props.game[i][j] === 7)
            color = "rgb(0,255,255)";

          rectangles.push(
              <Rect
                  x={j * 10}
                  y={i * 10}
                  width={10}
                  height={10}
                  fill={color}
                  stroke={'black'}
                  strokeWidth={1}
              />
          );
      }
  }

  return(<Stage width={window.innerWidth} height={window.innerHeight}>
              <Layer>
                  {rectangles}
              </Layer>
          </Stage>)
}

export default LangtonsLoop;
