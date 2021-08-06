# Jaranda-pentagon

## Installation

```
# Yarn 패키지 매니저 사용

$ yarn
$ yarn start
```

## 필수구현 사항

### 로그인/회원가입

```
회원정보 입력사항
- 이름
- 주소 (팝업을 이용해서 입력받음)
- 신용카드 정보 (팝업을 이용해서 입력받음)
- 나이
```

### 로그인 페이지(모든 권한)

- [ ] ID, PW 입력
- [ ] 회원가입 버튼
- [ ] 로그인 버튼

### 회원가입 페이지 
회원가입 통해서 가입시 기본적으로 '부모님' 권한으로 세팅됩니다

- [ ] 아이디, 비밀번호
- [ ] 이름
- [ ] 나이
- [ ] 팝업: 주소 입력 (다음 API)
- [ ] 팝업: 신용카드 입력 (포털 라이브러리)
- [ ] 회원 정보 저장 (저장을 어떻게 처리할지?)
- [ ] 가입 버튼 누르면 로그인 페이지로 redirect
- [ ] validation (아이디 중복, 비밀번호 몇 자리 이상?, 신용카드 4자리 누르면 다음자리로 이동 또는 숫자만 입력 가능하게? 이 외에도 입력값 정상인지 확인)

### 사용자 계정 페이지(로그인 후, 계정 별로 메뉴 다르게)

- [ ] 계정별로 들어갈수있는 메뉴 접속 시 일단 메뉴명만 출력되면 된다.


### 권한 및 계정관리 페이지(관리자)

- [x] 계정 임의생성
- [x] 전체 회원 목록 (부모님, 선생님 변경가능)
- [ ] 권한별로 메뉴 접근 설정
- [x] 데이터 테이블
  - 페이지네이션 : 한번에 전체 데이터 불러오는 걸로
  - 검색
- [x] 데이터 테이블에서 팝업으로 유저추가


## 개발 인원 및 기간

### 개발기간

- 2021/8/2 ~ 2021/8/6

### 개발 인원별 구현 리스트

- [김건우](https://github.com/kim-gunwoo)

  - 권한별 메뉴관리 페이지 구현

- [구남규](https://github.com/nain93)

- [박제인](https://github.com/pjainxido)

- [김명준](https://github.com/JOHNKIM-KK)
  - Nav 구현
  - 권한별 메뉴 생성 구현
  - 로그아웃 기능 구현
  - 다음 API를 사용하여 주소입력창 구현
  - 메뉴별 페이지 구현

- [이가은](https://github.com/salybu)

- [조성원](https://github.com/JSWww)

- [이지열](https://github.com/highspirit7)
  - 파이어베이스 DB 세팅 & api 제작
  - 파이어베이스 호스팅(배포)
  - 404(not found), 403(forbidden) 페이지용 컴포넌트 제작
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
