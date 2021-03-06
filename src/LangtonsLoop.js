import React from 'react';
import { Stage, Layer, Rect } from "react-konva";

class LangtonsLoop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      start: false,
      rectangles: [],
    }
    this.table = this.setTable();
    this.map1 = this.generateMap();
    this.map2 = this.generateMap();
    this.c = 1;

  }

  componentDidMount() {
    this.setState({
        map: this.map1,
        start: true,
        rectangles: [],
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
    var new_rectangles = []
    let new_map;
    if(this.c === 1) {
      new_map = this.map2;
      this.c = 2
    } else {
      new_map = this.map1;
      this.c = 1;
    }

    for(var i = 0; i < this.props.height; i++) {
      for(var j = 0; j < this.props.width; j++) {
        
        var s = this.table.get(this.getNeighbors(i, j, this.state.map));
        if(isNaN(s)|| s === null) {
          new_map[i][j] = 2;
        } else {
          new_map[i][j] = s;
        }

        if(new_map[i][j] !== 0) {
          new_rectangles.push(
            <Rect
                x={j * 10}
                y={i * 10}
                width={10}
                height={10}
                fill={this.getColor(new_map[i][j])}
                stroke={'black'}
                strokeWidth={1}
            />
        );
        }
      }
    }
    this.setState({
        map: new_map,
        rectangles: new_rectangles
    });
  }

  render() {
    if(this.state.start) {
      return <div><RenderGame game={this.state.rectangles}/></div>
    }
    return <div></div>
  }

  setTable() {
    var newTable = new Map();
    var stringTable= `00000->0 02527->1 11322->1 20242->2 30102->1
                      00001->2 10001->1 12224->4 20245->2 30122->0
                      00002->0 10006->1 12227->7 20252->0 30251->1
                      00003->0 10007->7 12243->4 20255->2 40112->0
                      00005->0 10011->1 12254->7 20262->2 40122->0
                      00006->3 10012->1 12324->4 20272->2 40125->0
                      00007->1 10021->1 12327->7 20312->2 40212->0
                      00011->2 10024->4 12425->5 20321->6 40222->1
                      00012->2 10027->7 12426->7 20322->6 40232->6
                      00013->2 10051->1 12527->5 20342->2 40252->0
                      00021->2 10101->1 20001->2 20422->2 40322->1
                      00022->0 10111->1 20002->2 20512->2 50002->2
                      00023->0 10124->4 20004->2 20521->2 50021->5
                      00026->2 10127->7 20007->1 20522->2 50022->5
                      00027->2 10202->6 20012->2 20552->1 50023->2
                      00032->0 10212->1 20015->2 20572->5 50027->2
                      00052->5 10221->1 20021->2 20622->2 50052->0
                      00062->2 10224->4 20022->2 20672->2 50202->2
                      00072->2 10226->3 20023->2 20712->2 50212->2
                      00102->2 10227->7 20024->2 20722->2 50215->2
                      00112->0 10232->7 20025->0 20742->2 50222->0
                      00202->0 10242->4 20026->2 20772->2 50224->4
                      00203->0 10262->6 20027->2 21122->2 50272->2
                      00205->0 10264->4 20032->6 21126->1 51212->2
                      00212->5 10267->7 20042->3 21222->2 51222->0
                      00222->0 10271->0 20051->7 21224->2 51242->2
                      00232->2 10272->7 20052->2 21226->2 51272->2
                      00522->2 10542->7 20057->5 21227->2 60001->1
                      01232->1 11112->1 20072->2 21422->2 60002->1
                      01242->1 11122->1 20102->2 21522->2 60212->0
                      01252->5 11124->4 20112->2 21622->2 61212->5
                      01262->1 11125->1 20122->2 21722->2 61213->1
                      01272->1 11126->1 20142->2 22227->2 61222->5
                      01275->1 11127->7 20172->2 22244->2 70007->7
                      01422->1 11152->2 20202->2 22246->2 70112->0
                      01432->1 11212->1 20203->2 22276->2 70122->0
                      01442->1 11222->1 20205->2 22277->2 70125->0
                      01472->1 11224->4 20207->3 30001->3 70212->0
                      01625->1 11225->1 20212->2 30002->2 70222->1
                      01722->1 11227->7 20215->2 30004->1 70225->1
                      01725->5 11232->1 20221->2 30007->6 70232->1
                      01752->1 11242->4 20222->2 30012->3 70252->5
                      01762->1 11262->1 20227->2 30042->1 70272->0
                      01772->1 11272->7 20232->1 30062->2`
    var res = stringTable.split(" ");
    for(var i = 0; i < res.length; i++) {
      if(res[i] !== "") {
        var result = res[i].split("->");
        var sequence = result[0].split("");

        //TRBL
        newTable.set(result[0], Number(result[1]));

        //RBLT
        var a = `${sequence[0].toString()}${sequence[2].toString()}${sequence[3].toString()}${sequence[4].toString()}${sequence[1].toString()}`;
        newTable.set(a, Number(result[1]));

        //BLTR
        var b = `${sequence[0].toString()}${sequence[3].toString()}${sequence[4].toString()}${sequence[1].toString()}${sequence[2].toString()}`;
        newTable.set(b, Number(result[1]));

        //LTRB
        var c = `${sequence[0].toString()}${sequence[4].toString()}${sequence[1].toString()}${sequence[2].toString()}${sequence[3].toString()}`;
        newTable.set(c, Number(result[1]));

      }
    }
    return newTable;
  }

  /*
  CTRBL

     T
  L  C  R
     B

  */
  getNeighbors(i,j, map) {
    var result = [];
    result.push(map[i][j]);
   
    if(i-1 >= 0)
      result.push(map[i-1][j]);
    else
      result.push(0);

    if(j+1 < map[i].length)
      result.push(map[i][j+1]);
    else
      result.push(0);

    if(i+1 < map.length)
      result.push(map[i+1][j]);
    else
      result.push(0);

    if(j-1 >= 0)
      result.push(map[i][j-1]);
    else
      result.push(0);

    return result.join('');
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

    
    new_map[center_y+3][center_x+4] = 7;
    new_map[center_y+3][center_x+3] = 0;

    new_map[center_y+3][center_x+1] = 7;
    new_map[center_y+3][center_x] = 0;

    new_map[center_y+3][center_x-2] = 7;
    new_map[center_y+3][center_x-3] = 0;

    new_map[center_y+1][center_x-3] = 7;
    new_map[center_y][center_x-3] = 0;

    new_map[center_y-2][center_x-3] = 7;
    new_map[center_y-3][center_x-3] = 0;

    new_map[center_y-4][center_x-2] = 7;
    new_map[center_y-4][center_x-1] = 0;
   
    new_map[center_y-4][center_x+1] = 4;
    new_map[center_y-4][center_x+2] = 0;

    new_map[center_y-4][center_x+4] = 4;
    new_map[center_y-3][center_x+4] = 0;

    return new_map;
  }

  getColor(value) {
    let color;
    if(value === 0)
      color = "rgb(0,0,0)";
    else if (value === 1)
      color = "rgb(0,0,255)";
    else if (value === 2)
      color = "rgb(255,0,0)";
    else if (value === 3)
      color = "rgb(0,255,0)";
    else if (value === 4)
      color = "rgb(255,255,0)";
    else if (value === 5)
      color = "rgb(255,0,255)";
    else if (value === 6)
      color = "rgb(255,255,255)";
    else if (value === 7)
      color = "rgb(0,255,255)";
    return color;
  }
}


function RenderGame(props) {
  return(<Stage width={window.innerWidth} height={window.innerHeight} >
              <Layer>
                  {props.game}
              </Layer>
          </Stage>)
}

export default LangtonsLoop;
