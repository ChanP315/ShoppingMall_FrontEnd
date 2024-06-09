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


