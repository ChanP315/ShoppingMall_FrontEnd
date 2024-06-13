# 쇼핑몰 강의 프로젝트 프론트엔드 파트 
배포시 주의 사항
    1. public/_redirects 에 다음과 같이 추가
        + /api/* {배포된 Back AWS 주소}/api/:splat 200
        + /* /index.html 200


react-toastify : ToastMessage - 회원가입할떄 사용함.
react-paginate : page 관리 , 디자인도 따로 완료.
react-credit-card : 멋있는 결제 카드 모양 컴포넌트
https://cloudinary.com/ : 이미지 및 비디오 업로드를 도와주는 사이트.
    git log 475f742 는 상관 없었음, 배포 할때 환경 변수 설정 안해줘서 그랬던거 뿐.
        + 배포시 cloudinary error: index.html 에 cloudinary 관련 코드 추가

1. 구글 로그인 버튼 가져오기
2. Oauth 로그인을 위해서 google api 사이트에 가입하고 클라이언트키, 시크릿 키 받아오기
3. 로그인
4. 백엔드에서 로그인
    4-a. 이미 로그인을 한 적이 있는 유저 =>
        로그인을 허락하고 토큰 값을 주면 끝.
    4-b. 처음 로그인 시도를 한 유저 =>
        유저 정보를 생성한 뒤, 토큰 값을 준다.