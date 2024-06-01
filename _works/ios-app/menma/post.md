---
date: '2024-06-01T22:00:00+09:00'
---

# Menma の使い方

## Menma とは？

`Menma`は、シンプルで使いやすい暗記アプリです。

## 機能と特徴

- 機能は、4 択の選択肢の問題と記述式の暗記のテストを行うことができます。

- 余計な機能の排除
  - シンプルに保つことを重要視しています。使う機能だけに絞っています。
  - 問題の編集などは現時点でできません。今後追加するかもしれません。

## テストの作り方

問題は Google スプレッドシートで作り、tsv で出力します。
（tsv で出力できれば Google スプレッドシートでなくても良いです）

### 1. Google スプレッドシートを開きます

### 2. 列には以下を作り、上から順番に問題を作成してください

- 選択肢の問題の場合
  | 列 | 内容 |
  |--------|--------|
  | statement | 問題文 |
  | type | `selection` |
  | answer | 問題の答えの選択肢の番号（1,2,3,4 のいずれか） |
  | option1 | 1 番目の選択肢の内容 |
  | option2 | 2 番目の選択肢の内容 |
  | option3 | 3 番目の選択肢の内容 |
  | option4 | 4 番目の選択肢の内容 |

![menma](/menma/2.png 'menma-2')

- 記述式の問題の場合
  | 列 | 内容 |
  |--------|--------|
  | statement | 問題文 |
  | type | `text` |
  | answer | 問題の答え |

![menma](/menma/1.png 'menma-1')

### 3. tsv （ファイル > ダウンロード > tsv） でエクスポートします

### 4. iPhone の Files に保存してください。（Menma フォルダに入れてもいいし場所はどこでも大丈夫です）

### 5. ホーム画面のプラスボタンを押して、import TSV File をタップしてインポートして、QuestionSet（テスト）の名前を入力してください