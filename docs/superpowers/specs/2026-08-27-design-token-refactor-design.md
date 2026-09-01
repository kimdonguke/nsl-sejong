# 디자인 리팩터링 설계 — 컬러 · 레이아웃 · 곡률

- 날짜: 2026-08-27
- 브랜치: `redesign`
- 대상: `themes/gnsslab/static/css/style.css`, `themes/gnsslab/layouts/**`, `hugo.toml`

## 배경

사이트가 "AI가 만든 티"가 난다는 문제 제기. 랜딩페이지 구조와 애니메이션은 유지하고,
**컬러 · 레이아웃 배치 · 곡률** 세 축만 개선한다.

## 진단

### 컬러
화면의 대부분이 색상환 210° 한 구역에 몰려 있다. 네이비(210°)와 중성 회색
(`#f8f9fa`, `#dee2e8` — 모두 파란기)이 겹쳐 뭉개지고, 골드(45°)만 혼자 튄다.

또한 같은 역할의 색이 여러 값으로 흩어져 있다.

| 계열 | 서로 다른 값 |
|---|---|
| 네이비 | 11종 — `#0a1220` `#0a1628` `#0d1e34` `#0d2440` `#0f2236` `#0f2744` `#1a3a5c` `#1e4570` `#1e4a7a` `#22487a` `#2a5080` |
| 골드 | 6종 — `#9a7e2e` `#a8893a` `#c8a951` `#e0bb60` `#e0c472` `#e8c96a` |

### 하드코딩 감사 (총 189곳)

| 분류 | 개수 |
|---|---:|
| 골드 계열 | 30 |
| 네이비 계열 | 36 |
| 흰색 알파 `rgba(255,255,255,*)` | 68 |
| 검정 알파 `rgba(0,0,0,*)` | 11 |
| 태그·배지 색 | 9 |
| `border-radius: 9999px` | 5 |
| `font-size` 스케일 밖 값 | 14 |
| 토큰 미사용 `box-shadow` | 4 |
| HTML 템플릿 내 색상 (SVG `fill` 9, favicon 2) | 11 |
| 미세 `padding/gap` px — 토큰화 대상 아님 | 12 |

### 레이아웃
- 모든 섹션이 `padding-block: 5rem` 동일 → 강약 없음
- `.section-header`가 전부 `text-align: center; max-width: 640px`
- 컨테이너가 `1200px` 하나 → 논문 목록과 멤버 그리드가 같은 폭
- `grid-template-columns` 36곳 제각각
- 브레이크포인트 4개(1024/768/640/480) 혼용

### 곡률
- 토큰 6개 중 실사용 3개, `--radius-full`이 있는데 `9999px` 하드코딩 5곳
- 버튼이 `8px` 곡률 + `2px` 테두리 → 뭉툭
- `section-tag`가 알약 모양(`radius-full`)

## 설계

### 1. 팔레트 (A안: 네이비 유지 + 골드 제거)

```
/* 구조 — 채도 56% -> 45% */
--color-primary        #1a3a5c -> #1F3651
--color-primary-dark   #0f2236 -> #14243A
--color-primary-light  #2a5080 -> #2C4A6B

/* 액센트 — 골드 전면 대체, 링크·CTA·활성상태 전용 */
--color-accent         #9E4A34   (muted brick)
--color-accent-dark    #7E3826
--color-accent-light   #C56A50

/* 중성 — 파란기 제거 -> 웜그레이 */
--color-bg             #f8f9fa -> #FAF9F7
--color-bg-alt         #eef1f5 -> #F2F0EC
--color-border         #dee2e8 -> #E0DCD5
--color-border-light   #eceff4 -> #EDEAE4

/* 텍스트 — 파란기 제거 */
--color-text           #2c3e50 -> #22262B
--color-text-light     #5a6a7a -> #5C6169
--color-text-muted     #8a9ab0 -> #6E737B  (대비 3.0:1 -> 4.5:1 교정)
```

토큰 **이름은 유지**한다. 60곳 넘는 참조를 건드리지 않아 위험이 줄어든다.

### 2. 곡률

```
--radius-sm     4px  →  2px    /* 배지·태그 */
--radius-md     8px  →  4px    /* 버튼·입력·카드 */
--radius-lg    12px  →  8px    /* 이미지·큰 패널 */
--radius-xl    16px  →  삭제
--radius-2xl   24px  →  삭제
--radius-full          유지    /* 프로필 원형 전용 */

.btn { border: 2px → 1px }
```

### 3. 레이아웃

| 문제 | 조치 |
|---|---|
| 섹션 리듬 균일 | `--section-py-sm: 3rem` / `--section-py: 4.5rem` / `--section-py-lg: 7rem` |
| 컨테이너 1종 | `--container-wide: 1200px` / `--container: 1040px` / `--container-text: 720px` |
| 헤더 전부 가운데 정렬 | 홈 히어로만 가운데, 나머지는 좌측 정렬 + 하단 규칙선 |
| 그리드 36곳 제각각 | `gap`만 통일. 컬럼 정의는 유지 (반응형 회귀 위험) |
| 브레이크포인트 혼용 | 이번 범위 제외 |

## 실행 순서

| 단계 | 내용 | 검증 |
|---|---|---|
| 1 | 하드코딩 189곳 → 토큰 회수 | **시각적 diff 0** |
| 2 | 팔레트 교체 (토큰 값만) | 육안 + 대비비 |
| 3 | 곡률 정리 | 육안 |
| 4 | 레이아웃 리듬 · 컨테이너 · 헤더 정렬 | 육안 + 반응형 |

1단계가 안전망이다. 색을 바꾸지 않고 회수만 하므로 화면이 그대로여야 하며,
달라진 게 보이면 회수 과정의 실수다.

## 범위 제외

- 히어로/애니메이션 구조 변경 (사용자가 유지 요청)
- 그리드 컬럼 정의 전면 리팩터
- 브레이크포인트 통합
- 카피 문구 수정
