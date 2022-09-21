# boss raid server

> 보스레이드 PVE 컨텐츠 서버 API

<br>

## 💬 서비스 개요 (요구사항 분석 및 구현 사항)

### 1. 유저 생성

- 중복되지 않는 userId를 생성
- score 는 default 값 0 으로 생성

### 2. 유저 보스레이드 기록 조회

- 유저의 보스레이드 총 점수와 참여기록 응답 (params로 user id를 전달받는다.)
  - user 테이블에서 해당하는 유저의 총 점수를 조회
  - raid_record 테이블에서 해당하는 유저의 보스레이드 참여 기록 조회

### 3. 보스레이드 상태 조회

- 보스레이드 현재 상태 응답
  - canEnter : 입장 가능한지
  - enteredUserId : 현재 진행 중인 유저가 있다면, 해당 유저의 id
- 입장 가능 조건
  - 한 번에 한 명의 유저만 보스레이드 진행 가능
  - 아무도 보스레이드를 시작한 기록이 없다면 시작 가능
  - 시작한 기록이 있다면 마지막으로 시작한 유저가 보스레이드를 종료했거나, 시작한 시간으로부터 레이드 제한시간만큼 경과되었어야 함

### 4. 보스레이드 시작

- 보스레이드 상태 조회 함수를 호출하여 시작 가능 상태라면
  중복되지 않는 raidRecordId를 생성하여 `isEntered:true` 와 함께 응답

- 레이드 시작이 불가하다면 `isEntered : false` 응답

### 5. 보스레이드 종료

- raidRecordId 종료 처리
- 레이드 level에 따른 score 반영
  - static data를 redis에 캐싱 하여 사용하도록 구현함
- 유효성 검사
  - 입력받은 raidRecordId 를 이용하여 해당 레이드에 참여한 사용자 아이디, 레벨, 입장 시간을 조회한다.
  - 조회한 사용자 아이디가 입력받은 사용자 아이디와 일치하지 않을 경우 예외 처리
  - static data에서 읽어온 제한 시간을 초과한 경우 예외 처리
  - raid_record에 end_time 값이 존재한다면 이미 종료된 레이드이기 때문에 중복되지 않도록 예외 처리

### 6. 보스레이드 랭킹 조회

- 유저 10명을 total_score 내림차순으로 조회
- 입력받은 userId로 나의 랭킹도 조회
- 랭킹 데이터는 redis에 캐싱 하여 구현함
  - 보스레이드 랭킹 조회 api 요청 시 먼저 redis에 랭킹 데이터가 있는지 조회하며, 있으면 redis에서 get 해오고 없으면 DB에서 조회하여 Redis에 캐싱 한다.

<br>

## 📃 API DOCS

**[🔗 PostMan API Document](https://documenter.getpostman.com/view/21288917/2s7Z7VKaQ7)**

<br>

## 📚 ERD

![image](https://i.imgur.com/f6bbo6B.png)

- **user** : 유저 정보 저장하는 테이블
  - total_score : 유저의 보스레이드 총 점수 저장
- **raid_record** : 보스레이드 기록을 저장하는 테이블
  - user_id : 해당 보스레이드에 참여한 유저 id
  - enter_time : 보스레이드를 시작한 시간
  - end_time : 보스레이드를 종료한 시간 (성공 or 실패했을 때 입력)
  - score : 해당 레이드에서 획득한 점수
  - level : 해당 레이드의 레벨
  - status : 해당 레이드의 상태 (성공 / 실패 / 진행 중)

<br>

### ⚒ 적용 기술

- 사용언어 : `Javascript`
- 런타임 환경 : `Node.js`
- 프레임워크 : `Express`
- 데이터베이스 : `MySQL` `Redis`
- ORM : `Sequelize`

<br>

### 📂 폴더 구조

```
├── 📁database
│     ├── 📁config
│     │    └── db.config.js
│     │    └── redisClient.js
│     └── 📁models
│          └── raid_record.js
│          └── user.js
│          └── index.js
│          └── init-models.js
├── 📁node_modules
├── 📁src
│     ├── 📁bossRaid
│     │    └── bossRaidController.js
│     │    └── bossRaidRepository.js
│     │    └── bossRaidRouter.js
│     │    └── bossRaidService.js
│     │    └── myRankingInfoDTO.js
│     │    └── rankingInfoDTO.js
│     └── 📁user
│     │    └── userController.js
│     │    └── userRepository.js
│     │    └── userRouter.js
│     │    └── userService.js
│     └── indexRouter.js
├── 📁utils
│     └── getStaticData.js
├── .env
├── .gitignore
├── .eslintrc
├── .prettierrc
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

### 🔐 환경 변수 설정

```
PORT=

DB_USER=
DB_PASSWORD=
DB_DATABASE=
DB_HOST=

REDIS_HOST=
REDIS_PORT=
REDIS_USERNAME=
REDIS_PASSWORD=

STATIC_DATA_URL=
```

<br>

## 💡 실행 방법

```
npm install
```

```
npm start
```

<br>

## 📝 커밋 컨벤션

- `Init:` 프로젝트 초기 세팅
- `Feat:` 새로운 기능 추가
- `Modify:` 코드 수정 (버그 x)
- `Fix:` 버그 수정 (올바르지 않은 동작을 고친 경우)
- `Docs:` 문서 작성, 수정
- `Style:` 코드 스타일 수정 (개행 등)
- `refactor:` 코드 리팩토링 (코드의 기능 변화 없이 수정)
- `Test:` 테스트 코드 추가
- `Chore:` 빌드 업무 수정, 패키지 매니저 수정, 그 외 자잘한 수정에 대한 커밋
