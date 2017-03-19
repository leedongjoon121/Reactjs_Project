import React  from 'react';
import {Chart} from 'react-google-charts'
import Reactable, { Table, Tr, Td, Thead, Th } from 'reactable';

var axios = require('axios');

var num = 300;
var startTime;
var totalTime;
var valueQuantity_array = new [].constructor();
var chartArray =[
  ["id","valueQuantity"]
];

var dt,month,day,year,Hours,Minutes,getUTCSeconds;
var flag = true;


export default class App5 extends React.Component {

  sendDataToChart(finishFunction){ // 파라미터로 콜백 함수를 넘긴다.
    finishFunction(); // 콜백 함수 실행 -> 어레이에 넣은걸 실행
  }

  componentWillMount(){
      var num = 800;
      this.setState({
        num : num
      });
  }

  componentWillUnmount(){
    var finish_text = "컴포넌트가 DOM에서 사라 졌습니다!!";
      this.setState({
        finish_text : finish_text
      });
      console.log("컴포넌트 사라짐");
  }


  shouldComponentUpdate(nextProps, nextState){

      if(flag==true){
      return true;
    }else{
      return false;
    }
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

         dt = new Date();
         month = dt.getMonth()+1;
         day = dt.getDate();
         year = dt.getFullYear();
         Hours = dt.getHours();
         Minutes = dt.getMinutes();
         getUTCSeconds = dt.getUTCSeconds();

         return axios.get(realURL).then(
            response => {

              var issued = "";
              issued = (response.data.issued);
              var id = "";
                id = (response.data.id);
              var lastUpdated = "";
              lastUpdated = (response.data.meta.lastUpdated);
              var valueQuantity = "";
                valueQuantity = (response.data.valueQuantity.value);

              this.sendDataToChart(function(){
                chartArray.push([id,valueQuantity]);
              }
            );

                valueQuantity_array.push(response.data.valueQuantity.value);

              _this.setState({

                 id: id,
                 lastUpdated : lastUpdated,
                 valueQuantity: valueQuantity,
                  valueQuantity_array : valueQuantity_array,
                 totalTime : totalTime,
                 month : month,
                 day : day,
                 year : year,
                 Hours : Hours,
                 Minutes : Minutes,
                 getUTCSeconds : getUTCSeconds,
                 issued : issued
              });  // 전달 받은 데이터를 state 에 넣음

                if(id >=800 && id<= 900){
                  totalTime = window.performance.now() - startTime;
                  return _this.fetchData(url,num,valueQuantity_array); // 다음 데이터가 존재 할 때 까지 반복하자.....

                }
                else{
                  console.log("데이터 없음");

                }

            }
       )
  }

  onStartBtnClick(event) {
          flag = true;
          this.setState({
              flag : flag
          });
  }

    onStopBtnClick(event) {
            flag = false;
            this.setState({
                flag : flag
            });
    }




  render() {



    return (
      <div className="App">
        <div>
          <h4>구간 실험</h4> <br/>
            {this.state.finish_text}
            <button onClick={this.onStopBtnClick}>리렌더링 중지</button>
            <button onClick={this.onStartBtnClick}>리렌더링 재개</button>

        </div>

        <Table className="table table-inverse table-striped" sortable={true}>
          <Thead>
          	<Th column="year">year</Th>
          	<Th column="month">month</Th>
          	<Th column="day">day</Th>
            <Th column="Hours">Hours</Th>
            <Th column="Minutes">Minutes</Th>
            <Th column="lastUpdated">lastUpdated</Th>
            <Th column="issued">issued</Th>
            <Th column="valueQuantity">valueQuantity</Th>
          </Thead>



        <Tr >
				<Td column="year" data= {this.state.year} />
				<Td column="month"  data={this.state.month} />
				<Td column="day"  data= {this.state.day} />
        <Td column="Hours"  data= {this.state.Hours} />
        <Td column="Minutes"  data= {this.state.Minutes} />
        <Td column="getUTCSeconds"  data= {this.state.getUTCSeconds} />
        <Td column="lastUpdated"  data= {this.state.lastUpdated} />
        <Td column="issued"  data= {this.state.issued} />
        <Td column="valueQuantity"  data= {this.state.valueQuantity} />
       </Tr>

      	</Table>

      </div>
    );
  }
}
