# Jaranda-pentagon

### 배포주소
[https://jaranda-f17b8.web.app/](https://jaranda-f17b8.web.app/)

## Installation

```
# Yarn 패키지 매니저 사용

$ yarn
$ yarn start
```

## TEST 계정 ID / PW
- admin 계정: admin / admin
- parent 계정: parent / parent
- teacher 계정: teacher / teacher

## 필수구현 사항

### 로그인 페이지(모든 권한)

- [x] ID, PW 입력 및 검증
- [x] 회원가입, 로그인 버튼

### 회원가입 페이지

회원가입 통해서 가입 시 기본적으로 '부모님' 권한으로 세팅됩니다

- [x] 아이디, 비밀번호, 이름, 나이
- [x] 팝업: 주소 입력 (다음 API)
- [x] 팝업: 신용카드 입력 (포털 라이브러리)
- [x] 회원 정보 저장, 및 로그인 화면으로 redirect
- [x] validation
  - 아이디 중복확인
  - 비밀번호 몇 자리 이상 초과
  - 신용카드 4자리 누르면 다음 자리로 이동
  - 숫자 입력창에서는 숫자만 입력 가능
  - 자리 수에 맞게 입력 제한

### 사용자 계정 페이지(로그인 후, 계정 별로 메뉴 다르게)

- [x] 계정별로 들어갈 수 있는 메뉴 생성
- [x] 계정별 메뉴 접속 시 메뉴명 출력

### 권한 및 계정관리 페이지(관리자)

- [x] 계정 임의 생성
- [x] 전체 회원 목록 (부모님, 선생님 변경가능)
- [x] 권한별로 메뉴 접근 설정
- [x] 데이터 테이블
  - 페이지네이션 : 한 번에 전체 데이터 불러와서 처리
  - 검색
- [x] 데이터 테이블에서 팝업으로 유저 추가

## 개발 인원 및 기간

### 개발기간

- 2021/08/02 ~ 2021/08/06

### 개발 인원별 구현 리스트

- [김건우](https://github.com/kim-gunwoo)

  - 권한별 메뉴관리 페이지 구현

- [구남규](https://github.com/nain93)

  - 데이터 테이블 (목업, 페이지네이션, 계정 생성) 구현

- [박제인](https://github.com/pjainxido)
  - ToastPortal 컴포넌트 작성
  - login 페이지 내부 redirect시 알람 이벤트 처리

- [김명준](https://github.com/JOHNKIM-KK)

  - Nav 구현
  - 권한별 메뉴 생성 구현
  - 로그아웃 기능 구현
  - 다음 API를 사용하여 주소입력창 구현
  - 메뉴별 페이지 구현

- [이가은](https://github.com/salybu)
  - 회원가입 컴포넌트 구현
  - 로그인 컴포넌트 구현

- [조성원](https://github.com/JSWww)
  - 권한별로 메뉴 접근할 수 있게 라우팅 설정
  - 팝업: 신용카드 입력

- [이지열](https://github.com/highspirit7)
  - 파이어베이스 DB 세팅 & api 제작
  - 파이어베이스 호스팅(배포)
  - 404(Not found), 403(Forbidden) 페이지용 컴포넌트 제작

- [허지윤](https://github.com/jiyoon1156)
  - 데이터 테이블 검색 구현
  - 전체 회원 목록 role 변경 구현
  - 계정 임의생성 구현

### 적용기술

- Front : React, Hook, Styled-Components
- Back : Firebase Cloud Firestore
- Deploy : Firebase Hosting
- Etc : Git, GitHub

### 배포주소

[https://jaranda-f17b8.web.app/](https://jaranda-f17b8.web.app/)
