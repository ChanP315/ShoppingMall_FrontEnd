# 쇼핑몰 강의 프로젝트 프론트엔드 파트 
배포시 주의 사항
    1. public/_redirects 에 다음과 같이 추가
        + /api/* {배포된 Back AWS 주소}/api/:splat 200
        + /* /index.html 200


react-toastify : ToastMessage - 회원가입할떄 사용함.
