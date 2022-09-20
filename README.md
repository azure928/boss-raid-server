# boss raid server

> 원티드 프리온보딩 백엔드 코스 - 기업 과제를 위한 레포지토리

<br>

## 📢 서비스 개요 (요구사항 분석)

**보스레이드 PVE 컨텐츠 서버 API**

-

<br>

## 💬 요구사항 구현 내용

### 1.

-

- **Method** :
- **URI** :

---

### 📚 ERD

![image](https://i.imgur.com/9UJMLG6.png)

<br>

### ⚒ 적용 기술

- 사용언어 : `Javascript`
- 런타임 환경 : `Node.js`
- 프레임워크 : `Express`
- 데이터베이스 : `MySQL` `Redis`
- ORM : `Sequelize`

### 📂 폴더 구조

```
├── 📁database
│     ├── 📁config
│     │    └── db.config.js
│     │    └── redisClient.js
│     └── 📁models
│          └── boss_raid_history.js
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

## 📃 API DOCS

**[🔗 PostMan API Document](https://github.com/azure928/boss-raid-server)**

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
