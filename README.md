
# 댓글 기능이 있는 익명 게시판 및 키워드 알림 기능 구현.

## 환경
```text
nodejs 18.3.0
Mysql 8.0.29 
```
## 설치 방법

```bash
$ npm install

# typeorm 버전문제로 설치 안될 시
$ npm i typeorm@0.2.41 @nestjs/typeorm@8.0.2 mysql2
```

## 실행 방법

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## 구현 기능

```yml
# 게시글 목록 API
@GET 
localhost:3000/board?take=&page=&title=&userName=
Query 
- take : 불러올 게시물 수
- page : 불러올 페이지 번호
- title : 조건에 담을 게시물 제목 (옵션)
- userName : 조건에 담을 유저이름 (옵션)

# 게시글 작성 API
@POST
localhost:3000/board
Body
- title : 게시물 제목
- userName : 유저 이름
- content : 게시물 내용
- password : 게시물 암호

# 게시글 수정 API
@PATCH
localhost:3000/board/:id
Param
- id : 게시물 ID
Body
- title : 게시물 제목
- userName : 유저 이름
- content : 게시물 내용
- password : 게시물 암호(해당 암호를 통해 게시물 수정)

# 게시글 삭제 API
@DELETE
localhost:3000/board/:id?password=
Param
- id : 게시물 ID
Query
- password : 게시물 암호(해당 암호를 통해 게시물 수정)

# 댓글 목록 API
@GET
localhost:3000/comment?take=&page=
Query 
- take : 불러올 게시물 수
- page : 불러올 페이지 번호

# 댓글 작성 API
@POST
localhost:3000/comment
Body
- comment : 댓글 내용
- userName : 유저 이름
- boardId : 게시물 번호
- password : 댓글 작성 암호
- groupId : 댓글 ID

# 키워드 알림 기능
게시물 생성 API / 댓글 생성 API 작성시 Keyword Service 호출.

```
## 테이블 생성 스크립트
```sql
-- Board 데이터베이스 생성 ( charset = utf8mb4 )
CREATE DATABASE `board` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

-- Board 테이블
CREATE TABLE `Board` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userName` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `idx_title` (`title`),
  KEY `idx_userName` (`userName`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Comment 테이블
CREATE TABLE `Comment` (
                           `id` int NOT NULL AUTO_INCREMENT,
                           `comment` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
                           `userName` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
                           `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                           `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                           `boardId` int NOT NULL,
                           `depth` int NOT NULL DEFAULT '0',
                           `groupId` int NOT NULL DEFAULT '0',
                           `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
                           PRIMARY KEY (`id`),
                           KEY `idx_groupId` (`groupId`),
                           KEY `idx_boardId` (`boardId`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Keyword 톄이블
CREATE TABLE `Keyword` (
                           `id` int NOT NULL AUTO_INCREMENT,
                           `userId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
                           `keyword` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
                           `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                           `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                           PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

```