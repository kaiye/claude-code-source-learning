# 2026-04-01 Buddy Pets And Animations

基于源码自动抽取：
- [`recovered/claude-code-original/src/buddy/sprites.ts`](../recovered/claude-code-original/src/buddy/sprites.ts)
- [`recovered/claude-code-original/src/buddy/CompanionSprite.tsx`](../recovered/claude-code-original/src/buddy/CompanionSprite.tsx)
- [`recovered/claude-code-original/src/buddy/types.ts`](../recovered/claude-code-original/src/buddy/types.ts)

## 本地预览器（HTML）

- 入口：[`claude-code-routing-research/buddy-assets/preview.html`](./buddy-assets/preview.html)
- 数据：[`claude-code-routing-research/buddy-assets/all-buddy-sprites.json`](./buddy-assets/all-buddy-sprites.json)
- 使用方式：直接双击 `preview.html`（`file://`）即可，无需启动 HTTP 服务（页面已内嵌 JSON）。

### 已实现能力
- 宠物与帧动画预览：`idle / excited / manual`。
- `/buddy pet` 爱心 burst 预览。
- 稀有度切换与加权抽取：`common (60%)`、`uncommon (25%)`、`rare (10%)`、`epic (4%)`、`legendary (1%)`。
- 稀有度星级展示：`★` 到 `★★★★★`。
- 稀有度颜色映射按源码语义对齐：
  - 权重与星级：[`recovered/claude-code-original/src/buddy/types.ts`](../recovered/claude-code-original/src/buddy/types.ts)
  - 抽取逻辑：[`recovered/claude-code-original/src/buddy/companion.ts`](../recovered/claude-code-original/src/buddy/companion.ts)
  - UI 着色语义（`inactive/success/permission/autoAccept/warning`）：[`recovered/claude-code-original/src/buddy/types.ts`](../recovered/claude-code-original/src/buddy/types.ts)

## 动画规则（源码）
- Tick 间隔：`500ms`，闲置循环序列：`[0,0,0,0,1,0,0,0,-1,0,0,2,0,0,0]`（`-1` 代表 blink）。
- 宠物被抚摸（`/buddy pet`）爱心持续：`2500ms`。
- 气泡显示：`20` ticks，尾段渐隐窗口：`6` ticks。

## Hats（头饰顶行）

- `none`: `(blank)`
- `crown`: `   \\^^^/    `
- `tophat`: `   [___]    `
- `propeller`: `    -+-     `
- `halo`: `   (   )    `
- `wizard`: `    /^\\     `
- `beanie`: `   (___)    `
- `tinyduck`: `    ,>      `

## Pet Hearts 动画帧

### Heart Frame 0
```text
   ♥    ♥   
```

### Heart Frame 1
```text
  ♥  ♥   ♥  
```

### Heart Frame 2
```text
 ♥   ♥  ♥   
```

### Heart Frame 3
```text
♥  ♥      ♥ 
```

### Heart Frame 4
```text
·    ·   ·  
```

## 全部宠物形象（每种 3 帧）

共 `18` 个 species，默认用眼睛字符 `·` 渲染（源码里是 `{E}` 占位符）。

### Duck (`duck`)

#### Frame 0
```text
            
    __      
  <(· )___  
   (  ._>   
    `--´    
```

#### Frame 1
```text
            
    __      
  <(· )___  
   (  ._>   
    `--´~   
```

#### Frame 2
```text
            
    __      
  <(· )___  
   (  .__>  
    `--´    
```

### Goose (`goose`)

#### Frame 0
```text
            
     (·>    
     ||     
   _(__)_   
    ^^^^    
```

#### Frame 1
```text
            
    (·>     
     ||     
   _(__)_   
    ^^^^    
```

#### Frame 2
```text
            
     (·>>   
     ||     
   _(__)_   
    ^^^^    
```

### Blob (`blob`)

#### Frame 0
```text
            
   .----.   
  ( ·  · )  
  (      )  
   `----´   
```

#### Frame 1
```text
            
  .------.  
 (  ·  ·  ) 
 (        ) 
  `------´  
```

#### Frame 2
```text
            
    .--.    
   (·  ·)   
   (    )   
    `--´    
```

### Cat (`cat`)

#### Frame 0
```text
            
   /\\_/\\    
  ( ·   ·)  
  (  ω  )   
  (")_(")   
```

#### Frame 1
```text
            
   /\\_/\\    
  ( ·   ·)  
  (  ω  )   
  (")_(")~  
```

#### Frame 2
```text
            
   /\\-/\\    
  ( ·   ·)  
  (  ω  )   
  (")_(")   
```

### Dragon (`dragon`)

#### Frame 0
```text
            
  /^\\  /^\\  
 <  ·  ·  > 
 (   ~~   ) 
  `-vvvv-´  
```

#### Frame 1
```text
            
  /^\\  /^\\  
 <  ·  ·  > 
 (        ) 
  `-vvvv-´  
```

#### Frame 2
```text
   ~    ~   
  /^\\  /^\\  
 <  ·  ·  > 
 (   ~~   ) 
  `-vvvv-´  
```

### Octopus (`octopus`)

#### Frame 0
```text
            
   .----.   
  ( ·  · )  
  (______)  
  /\\/\\/\\/\\  
```

#### Frame 1
```text
            
   .----.   
  ( ·  · )  
  (______)  
  \\/\\/\\/\\/  
```

#### Frame 2
```text
     o      
   .----.   
  ( ·  · )  
  (______)  
  /\\/\\/\\/\\  
```

### Owl (`owl`)

#### Frame 0
```text
            
   /\\  /\\   
  ((·)(·))  
  (  ><  )  
   `----´   
```

#### Frame 1
```text
            
   /\\  /\\   
  ((·)(·))  
  (  ><  )  
   .----.   
```

#### Frame 2
```text
            
   /\\  /\\   
  ((·)(-))  
  (  ><  )  
   `----´   
```

### Penguin (`penguin`)

#### Frame 0
```text
            
  .---.     
  (·>·)     
 /(   )\\    
  `---´     
```

#### Frame 1
```text
            
  .---.     
  (·>·)     
 |(   )|    
  `---´     
```

#### Frame 2
```text
  .---.     
  (·>·)     
 /(   )\\    
  `---´     
   ~ ~      
```

### Turtle (`turtle`)

#### Frame 0
```text
            
   _,--._   
  ( ·  · )  
 /[______]\\ 
  ``    ``  
```

#### Frame 1
```text
            
   _,--._   
  ( ·  · )  
 /[______]\\ 
   ``  ``   
```

#### Frame 2
```text
            
   _,--._   
  ( ·  · )  
 /[======]\\ 
  ``    ``  
```

### Snail (`snail`)

#### Frame 0
```text
            
 ·    .--.  
  \\  ( @ )  
   \\_`--´   
  ~~~~~~~   
```

#### Frame 1
```text
            
  ·   .--.  
  |  ( @ )  
   \\_`--´   
  ~~~~~~~   
```

#### Frame 2
```text
            
 ·    .--.  
  \\  ( @  ) 
   \\_`--´   
   ~~~~~~   
```

### Ghost (`ghost`)

#### Frame 0
```text
            
   .----.   
  / ·  · \\  
  |      |  
  ~`~``~`~  
```

#### Frame 1
```text
            
   .----.   
  / ·  · \\  
  |      |  
  `~`~~`~`  
```

#### Frame 2
```text
    ~  ~    
   .----.   
  / ·  · \\  
  |      |  
  ~~`~~`~~  
```

### Axolotl (`axolotl`)

#### Frame 0
```text
            
}~(______)~{
}~(· .. ·)~{
  ( .--. )  
  (_/  \\_)  
```

#### Frame 1
```text
            
~}(______){~
~}(· .. ·){~
  ( .--. )  
  (_/  \\_)  
```

#### Frame 2
```text
            
}~(______)~{
}~(· .. ·)~{
  (  --  )  
  ~_/  \\_~  
```

### Capybara (`capybara`)

#### Frame 0
```text
            
  n______n  
 ( ·    · ) 
 (   oo   ) 
  `------´  
```

#### Frame 1
```text
            
  n______n  
 ( ·    · ) 
 (   Oo   ) 
  `------´  
```

#### Frame 2
```text
    ~  ~    
  u______n  
 ( ·    · ) 
 (   oo   ) 
  `------´  
```

### Cactus (`cactus`)

#### Frame 0
```text
            
 n  ____  n 
 | |·  ·| | 
 |_|    |_| 
   |    |   
```

#### Frame 1
```text
            
    ____    
 n |·  ·| n 
 |_|    |_| 
   |    |   
```

#### Frame 2
```text
 n        n 
 |  ____  | 
 | |·  ·| | 
 |_|    |_| 
   |    |   
```

### Robot (`robot`)

#### Frame 0
```text
            
   .[||].   
  [ ·  · ]  
  [ ==== ]  
  `------´  
```

#### Frame 1
```text
            
   .[||].   
  [ ·  · ]  
  [ -==- ]  
  `------´  
```

#### Frame 2
```text
     *      
   .[||].   
  [ ·  · ]  
  [ ==== ]  
  `------´  
```

### Rabbit (`rabbit`)

#### Frame 0
```text
            
   (\\__/)   
  ( ·  · )  
 =(  ..  )= 
  (")__(")  
```

#### Frame 1
```text
            
   (|__/)   
  ( ·  · )  
 =(  ..  )= 
  (")__(")  
```

#### Frame 2
```text
            
   (\\__/)   
  ( ·  · )  
 =( .  . )= 
  (")__(")  
```

### Mushroom (`mushroom`)

#### Frame 0
```text
            
 .-o-OO-o-. 
(__________)
   |·  ·|   
   |____|   
```

#### Frame 1
```text
            
 .-O-oo-O-. 
(__________)
   |·  ·|   
   |____|   
```

#### Frame 2
```text
   . o  .   
 .-o-OO-o-. 
(__________)
   |·  ·|   
   |____|   
```

### Chonk (`chonk`)

#### Frame 0
```text
            
  /\\    /\\  
 ( ·    · ) 
 (   ..   ) 
  `------´  
```

#### Frame 1
```text
            
  /\\    /|  
 ( ·    · ) 
 (   ..   ) 
  `------´  
```

#### Frame 2
```text
            
  /\\    /\\  
 ( ·    · ) 
 (   ..   ) 
  `------´~ 
```

