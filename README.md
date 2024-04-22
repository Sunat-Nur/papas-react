PortFolio 프로잭트 소개
 ---------------

Open [http://localhost:3000](http://localhost.3000) to view it in the browser.


개발인원민 기간
---------------

6 인개발 (4 개월)


목적
---------------



https://github.com/Sunat-Nur/papay-react/assets/107460955/a824e19c-0f4a-423d-a910-067f6a029c49






구현 기능
---------------


. 사용자 인증 및 로그인 기능

. 장바구니에 항목 추가 및 결제

. 실시간 채팅 및 다른 사용자 탐색

. 다른 사용자 팔로우 및 언팔로우하기

. 음식이나 레스토랑에 대한 새 글 게시 기능

. 레스토랑에서 이벤트 추가 또는 삭제 기능

. 사용자가 글에 '좋아요' 클릭 기능

. 사용자가 자신의 정보를 수정하는 기능


적용 기술
---------------


React
---------------

. The Movie DB API   Axios

. Styled Component를 이용하여 Css처리

. useState, useEffect 등 리액트 휴사용

. React Router Dom , useNavigate, useParams, useLocation, useRoutes

. Firebase Authentication 유저정보기능 지원

. Body-parser  클라이언트에서 보는 바디를 파싱하기 위함

. react - bootstrapt

. Multer 파일업로드

. React-avatar

. React Custom Hooks

. localStorage에 Data 값 담기

. component ( component로 구역 분리)

. Filter 메소드를 사용해서 할 일 목록 지우기

. Map 메소드를 사용한 할 일 목록 나열

. 마무리 된 일 표시하기 ( 조건부 삼항 연산자)

. Swiper 모듈을 이용한 터치 스라이드

. Moment



Typescript
---------------

. object data에 타입을 체크하기 위해 interface 사용



docker
------
도커를 이용한 Postgres  실행



에러 사항
------

. cors 에로 3000번 포트에서 보내지만 5000번 포트에서 받아달라고 해야함 http-proxy-middle 라이브러리 사용하여 해걸

. 이미지업로드시 이미지가 나오지않았다 server에 이미지플더 경로를 static으로 알려주어 해결

. 글 수정시 component is changing an uncontrolled input to be controlled 네러가 나타났다  input의 value에 undefined가 들어갈수도 있다는 에러몄다  value={Title} 으로 수정하여 해결

















