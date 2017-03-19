# React & Axios & bootstrap을 이용한 헬스케어 test 프로젝트
## Producer Introduce 
### name :  Dongjoonlee 
### nation : south korea
### date of birth : 1993.04.06
### univ : gachon university
### email : ehdwns46@naver.com
<br/><br/>

# 프로젝트 진행 원리.
### FHIR 의료정보 데이터(JSON 규격)을 AJAX를 이용해 서버로 부터 가져오고 이 데이터를 React View로 변환
### test용 의료 데이터 : http://hitlab.gachon.ac.kr:8888/gachon-fhir-server/baseDstu2/Observation/
### ![사진](https://github.com/leedongjoon121/Reactjs_Project/blob/master/react_axios_dongjoon_test/img/%EC%9B%90%EB%A6%AC1.JPG?raw=true)
<br/>

### 프로젝트 구조
### FHIR 서버로 부터 가져온 데이터를 효율적으로 표현하기 위해 Google-chart 라이브러리 도입.
### 전체 4개의 컴포넌트로 하였으며, 1개의 ajax(이 프로젝트에서는 Axios) 컴포넌트와 3개의 Google-chart 컴포넌트로 구성된다.
### ![사진](https://github.com/leedongjoon121/Reactjs_Project/blob/master/react_axios_dongjoon_test/img/noname01.jpg?raw=true)
