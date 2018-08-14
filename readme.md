# BackLog2Git

Backlogとgitでお仕事する人のためのChromeExtensionです。
下記のような環境を想定しています。

- backlogでチケット発行、githubでコード管理をしている
- ブランチ名には、backlogチケットIDをつけている（ 例：b1234_fix_hoge ）
- slackも使っていて、チケットの更新やgitのPR依頼をしている
- git には staging & masterブランチがあり、stagingにPR & Mergeしてテスト、masterにRP & Mergeしてテストというデプロイ手順をとる


# インストール

- このリポジトリをダウンロードします
- cp actions/config.sample.js actions/config.js
- config.js を適切に定義します
- DLしたディレクトリを「パッケージ化されていない拡張機能を読み込む」してください。

# 利用方法

追加されたボタンをクリックすると、現在表示しているURLから自動判別して、下記の処理を行います。

## actions/backlog/act.js

- 対象URL： `backlog.jp/view/DEV-.+`
- 動作： 現在のチケットに対応するgitブランチとPRを表示します
![スクリーンショット 2018-08-03 12.22.31.png](https://gyazo.com/0a28980cc9fdeaf003c74a7e14483a8c.png)



## actions/backlog/act.list.js

- 対象URL： `backlog.jp/find/DEV`
- 動作： チケット一覧上に、各チケットの最新コメントを表示します
![スクリーンショット 2018-08-03 12.23.06.png](https://gyazo.com/a06d49972b1257dbe4d42d58b9d3025b.png)


## actions/github/act.makeComment.js

- 対象URL： `github.com/.+/pull/.+`
- 動作： PRをbacklogとslackに書き込むためのコメントを生成します
![スクリーンショット 2018-08-03 12.25.48.png](https://gyazo.com/919e612953e57056dcc187e3ac0b9776.png)

## actions/github/act.copyMaster.js

- 対象URL： `github.com/.+/pull/.+`
- 対象条件： stagingのPRがマージされている
- 動作： stagingのPRからmasterのPRを生成します
![スクリーンショット 2018-08-03 12.24.18.png](https://gyazo.com/0ddb5226bce8ac984522ab604ce02e0d.png)

## actions/github/act.copyStaging.js

- 対象URL： `github.com/.+/compare/staging`
- 動作： stagingのPRのタイトルとコメントに、backlogの情報をコピーします
![スクリーンショット 2018-08-03 12.25.15.png](https://gyazo.com/78bef82e09dd1c26f724547cf45d0a1e.png)


# 機能追加＆編集の方法

## 基本設定の編集
- actions/config.js で個別設定を行います。

## 機能の追加編集

- actons/provider.js に動作条件を記述してください
- actions/内に追加の処理を記述してください。
- ブラウザボタンを押せば、即動作確認できます。



