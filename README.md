# [Zenithium](https://www.zenithium.info)

To Zenith, 어제보다 한걸음 더 나아간 개발자를 목표로 제작한 개인 블로그 서비스 입니다.

## 포스트 작성 가이드

- blog-content/{slug}/content.mdx 의 형태로 포스트 생성
- 정적 이미지는 public/postAssets/{slug}/{파일명}.jpg 에 추가
- 게시물 메타데이터인 Front Matter는 아래의 타입으로 작성

```ts
type FrontMatter = {
  title: string; // 제목
  description: string; // 설명
  date: string; // 작성 날짜
  series: string; // 시리즈
  tags: string[]; // 태그
  updated?: string; // 업데이트 날짜 (없으면 공백)
  image?: string; // 커버 이미지
};
```

- mdx snippet 추가

```json
"Post Matter": {
    "prefix": "post",
    "body": [
      "---",
      "title: \"$1\"",
      "description: \"$2\"",
      "date: $CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE $CURRENT_HOUR:$CURRENT_MINUTE:$CURRENT_SECOND",
      "updated: \"$3\"",
      "series: \"$4\"",
      "image: \"\"",
      "tags:",
      "  - $5",
      "---",
      "",
      "$0"
    ],
    "description": "Front Matter 작성"
  },
```

- `rehype-pretty-code`의 코드블록 규칙 따름 (highlight, caption, title...)
- `rehype-message-box` 커스텀 메시지 박스 규칙은 아래 코드와 같이 작성

```mdx
// blue
::: note 내용

// purple
::: important 내용

// yellow
::: warning 내용

// red
::: caution 내용

// green
::: tip 내용
```

## resume 작성 가이드

- resume-content/{slug}.mdx 의 형태로 생성
- `resume.ts`에 추가할 section을 객체에 추가

```ts
export const sections: ResumeSection[] = [
  {
    title: "Projects",
    description: "프로젝트",
    items: [
      ...
      {
        title: "Zenithium",
        subtitle: "제니시움",
        period: "2024.09 ~ 2024.10",
        content: contents.get("zenithium") as string,
        href: "https://github.com/cdm1263/Zenithium",
      },
      ...
    ],
  },
];
```
