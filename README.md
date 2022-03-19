# inglang 잉랭

우정잉님과 관련된 언어를 만들었습니다.

[어쩔랭](https://github.com/assertive-lang/asserlang) 의 구조를 많이 참조 하였습니다.

재미삼아 만들어본 언어여서 굉장히 허술하고 이상할 수 있습니다. 이상할 경우 PR 해주시면 감사하겠습니다.(수정안될 가능성 농후)

한국어의 문법을 최대한 따라가려고 노력했습니다.

인터프리터를 js로 구현했습니다. 예시 인터프리터는 [호스팅 페이지](https://inglang.github.io/inglang/nodejs/view/index.html)에서 테스트해보실 수 있습니다.

## 문법

코드의 시작과 끝은 각각

"짤녀 누구?"

"그래도 우정잉 짱~"

이어야만 합니다.

코드에 금지어가 포함되어 있습니다. 금지어를 사용하는 경우 에러가 발생됩니다.

## 예약어

| 예약어 | 기능 | 구현 |
|--|--|--|
| 짤녀 누구? | 시작구문 |
| 그래도 우정잉 짱~ | 종료구문 |
| 사실 | 변수 선언 및 할당 |
| 잘봐 내 | 숫자 출력 시작 |
| 똑바로봐 내 | 유니코드 출력 시작 |
| 다 니가 만든거잖아 | 출력 종료 |
| 어디 바뀐거없어? | 조건문 조건이 만족(0) 할 경우 실행 | X |
| 전 그렇게 생각안해요 | 조건문이 불만족할 경우 해당 위치까지 건너뜀 | X |
| 잉친아 | 현재 실행중인 줄을 기준으로 x 줄 이동 | X |

## 연산자

| 연산자 | 기능 |
|--|--|
| 비제잉 | 0 |
| 예민하네 | +1 |
| 화났네 | -1 |
| 복수연 | +2 |
| 독구타련 | +4 |
| 텐련 | +10 |
| 장난인데왜그래 | * |

'''text
예) 예민하네 화났네 = 0
예) 텐련 장난인데왜그래 복수연 = 20
'''

----

## 변수 할당

- 문법 :

```text
사실 {a} 은/는 {b} (이)걸랑
```

{a}에 {b}를 할당합니다.

- 예시 :

```text
사실 트위치 는 비제잉 이걸랑
사실 우정잉 은 독구타련 장난인데왜그래 화났네 걸랑
사실 트수 는 우정잉 예민하네 걸랑
```

변수 "트위치" 에 0 을 할당합니다

변수 "우정잉" 에 +4 * -1 을 할당합니다(결과 = -4)

변수 "트수" 에 "우정잉(-4)" +1 을 할당합니다(결과 = -3)

한국어의 문법에 맞추기 위해 은/는 은 혼용 하여 사용할수 있게하였고
같은 이유로 "이걸랑" 의 "이" 도 생략가능합니다.

----

## 출력

- 문법 :

```text
잘봐 내
{1}
{2}
...
다 니가 만든거잖아
```

{1}{2}... 를 숫자로 출력합니다.

```text
똑바로봐 내
{1}
{2}
...
다 니가 만든거잖아
```

{1}{2}... 를 유니코드로 출력합니다.

- 예시 :

```text
잘봐 내
예민하네 화났네
텐련 텐련 텐련
다 니가 만든거잖아
```

030을 출력합니다.(0 과 30을 공백없이 출력합니다)

"똑바로봐" 의 경우 해당 숫자에 맞는 유니코드를 출력합니다.

## 에러

- 너 잉친이 아니지
  - 코드의 시작과 끝이 "짤녀 누구?", "그래도 우정잉 짱~" 가 아닌 경우
- 너 밴
  - 금지어를 사용한 경우
- 나 다운게 뭔데?
  - 문법 에러
- 아직도 모르겠어?
  - 출력문 에러
- 이래서 유입은 안된다니까
  - 선언 에러
