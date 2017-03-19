import React  from 'react';
import {Chart} from 'react-google-charts'
var axios = require('axios');

var num = 300;
var startTime;
var totalTime;
var valueQuantity_array = new [].constructor();
var chartArray =[
  ["id","valueQuantity"]
];


export default class App extends React.Component {

  sendDataToChart(finishFunction){ // 파라미터로 콜백 함수를 넘긴다.
    finishFunction(); // 콜백 함수 실행 -> 어레이에 넣은걸 실행
  }

  componentWillMount(){
      var num = 300;
      this.setState({
        num : num
      });
  }


  componentDidMount(){
    var _this = this;
    startTime = window.performance.now();
    this.fetchData('http://hitlab.gachon.ac.kr:8888/gachon-fhir-server/baseDstu2/Observation/',num,valueQuantity_array).then(()=>{console.log('최초 호출')});
  }


  fetchData(url,num,valueQuantity_array) { // 사용자 정의 함수
         var realURL = "";
         this.state.num++;
         realURL = url + this.state.num;

         var _this = this;

         return axios.get(realURL).then(
            response => {

              var id = "";
                id = (response.data.id);

              var valueQuantity = "";
                valueQuantity = (response.data.valueQuantity.value);

              this.sendDataToChart(function(){
                chartArray.push([id,valueQuantity]);
              }
            );

                valueQuantity_array.push(response.data.valueQuantity.value);

              _this.setState({
                 id: id,
                 valueQuantity: valueQuantity,
                  valueQuantity_array : valueQuantity_array,
                 totalTime : totalTime
              });  // 전달 받은 데이터를 state 에 넣음

                if(id >=300 && id<= 400){
                  totalTime = window.performance.now() - startTime;
                  return _this.fetchData(url,num,valueQuantity_array); // 다음 데이터가 존재 할 때 까지 반복하자.....

                }
                else{
                  console.log("데이터 없음");

                }

            }
       )
  }

  render() {



    return (
      <div className="App">
         <div className={"my-pretty-chart-container"}>
               <Chart
                 chartType="ScatterChart"
                 data={
                   chartArray
               }
                 options={
                   {title: 'Heartrate',
                 hAxis: {title: 'temp_value', minValue: 300, maxValue: 400},
                 vAxis: {title: 'Heartrate', minValue: 0, maxValue: 120},
                 legend: 'none'}
               }
                 graph_id="LineChart"
                 width="300px"
                 height="300px"
                 legend_toggle
                />
             </div>
      </div>
    );
  }
}
