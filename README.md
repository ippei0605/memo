# Memo

## はじめに
 このアプリケーションは、私がIBM Bluemix、Node.js、Cloudant NoSQL DBのプログラミングを勉強するために作りました。次のサイトを参考に作成しています。
* Bluemix 上で稼動する Web アプリケーション開発方法 - Node.js 編  
http://www.ibm.com/developerworks/jp/cloud/library/j_cl-bluemix-nodejs-app/


## セットアップ
1. 本サイトから memoアプリをダウンロード (Download ZIP) して解凍してください。ディレクトリ名は memo-master から memo に変更してください。

1. Bluemix コンソールから CFアプリケーション (Node.js) を作成してください。  
アプリケーション名: memo-ippei (任意)  

    > 以降、memo-ippei で説明します。


1. CF コマンド・ライン・インターフェースをインストールしていない場合は、インストールしてください。

1. Cloudant NoSQL DB を作成し、memo-ippei にバインドしてください。  
サービス名: Cloudant NoSQL DB-cc (固定)  

    > 名前を変更したい場合は、 utils/context.js の CLOUDANT_SERVICE_NAME の設定値を変更してください。

1. 解凍したディレクトリ (memoアプリのホーム) に移動してください。

        > cd memo

1. Bluemixに接続してください。

        > cf api https://api.ng.bluemix.net
    

1. Bluemix にログインしてください。

        > cf login -u e87782@jp.ibm.com -o e87782@jp.ibm.com -s dev

1. アプリをデプロイしてください。

        > cf push memo-ippei

1. ご使用のブラウザーで以下の URL を入力して、アプリにアクセスしてください。

        memo-ippei.mybluemix.net


## ファイル構成
    memo
    │  .cfignore
    │  .gitignore
    │  app.js                 Memoアプリ
    │  package.json
    │  README.md
    │  
    ├─doc
    │      figure.png
    │      figure.pptx        モジュール関連図
    │  
    ├─install
    │      memo.map           Cloudant NoSQL DB のビューのマップファンクション
    │      postinstall.js     Memoアプリのインストール後処理
    │      
    ├─models
    │      memo.js            Memoアプリのモデル
    │      
    ├─public
    │      favicon.ico
    │      
    ├─routes
    │      index.js           Memoアプリのルーティング
    │      
    ├─utils
    │      context.js         Memoアプリのコンテキスト
    │      
    └─views
            dialog.ejs        新規登録・更新ダイアログ
            index.ejs         メモ一覧表示画面

## モジュール関連図
![モジュール関連図](docs/figure.png)

## オリジナルからの変更点
* メモリとデータベース2通りのストア方式を紹介されていたが、データベースのみを対象
* Cloudant NoSQL DB クライアントライブラリを Cradle から Cloudant Node.js Client に変更
* データベース、ビュー作成をインストール後処理 (package.json: scripts.postinstall) で実行
* メモのタイトル項目を削除して簡素化
* メモ保存の際の日時をサーバ日時からクライアント日時に変更
* データベースに新規作成する際の文書IDはUUIDによる採番から未指定 (Cloudant NoSQL DB任せ) に変更 
* 使用するライブラリの最新化など


## 開発方法
Bluemix で動く Node.js アプリのデプロイには次の2通りの方法があります。
* CFコマンド
* Bluemix DevOps Services

CFコマンドはOSのターミナル (コマンドプロンプト) から実行するコマンドで、プログラミングしたアプリをBluemix にデプロイするなど、ローカル環境からBluemix を操作するために使用します。  
Bluemix DevOps Services はブラウザからコーディング、Gitへのプッシュ、ビルド＆デプロイができるクラウドサービスです。ローカルに開発環境を準備する必要が無い反面、テストしながら実験的に開発していくような場合には向いていません。Gitへのプッシュ、Bluemixへのデプロイをせずとも、ローカルに実行環境があれば、次のコマンドで実行・テストできるからです。

    > node app

そして、環境変数 VCAP_SERVICES を設定すれば、ローカル環境のアプリから Bluemix のサービスに接続できます。  
1ページ程度のWebアプリでも新規開発する場合はローカル開発環境でテストしたアプリをCFコマンドでBluemixにプッシュする方法を、開発環境が無く軽微な修正の場合は Bluemix DevOps Services を使用するのが良いのではないかと思います。  

ローカルで開発する場合は、次のソフトウェアをインストールしてください。

|#|ソフトウェア|用途|補足説明|
|--:|-------|-------|-------|
|1|お好みのテキストエディタ|プログラミング|メモ帳、Atomなど何でも構いません。私はコードアシスト、デバッグ、ターミナル操作ができる Eclipse を使用しました。|
|2|Node.js|NPM、アプリ実行・テスト|私は本家のv5.3.0を使用しましたが、IBM SDK for Node.js などでも大丈夫です。|
|3|CFコマンド|Bluemixへのデプロイ|前述のセットアップでインストール済みです。|


### Eclipse 使用時の注意点
私は Windows 7 (64bit) に次のEclipseおよびプラグインをインストールして開発しました。

|#|ソフトウェア|用途|補足説明|
|--:|-----------|----|--------|
|1|Java 8 Update 73 (64bit)|#2 に必要です。||
|2|Pleiades-e4.5-java_20160228 (64bit)|*.ejs を HTML に関連付けて HTML Editor でプログラミングします。|ダイアログなど meta タグを記述しないファイルが文字化けするので、日本語化されている、Pleiades-e4.5-java_20160228 を使用します。|
|3|Nodeclipse 1.0.1|Eclipseの実行やデバッグに使用します。|IBM Node.js Tools for Eclipse というプラグインもありますが、現時点でBata リリースであり、デバッグの構成で環境変数を設定できませんでした。|


設定変更した項目を以下に示します。
* テキスト・ファイル・エンコードが「その他: UTF-8」になっていることを確認します。  
ウィンドウ → 設定 → 一般 → ワークスペース

* ローカル・ターミナルの Initial Working Directory を Eclipse Workspace に変更します。NPM や CF コマンドを発行するためです。  
ウィンドウ → 設定 → ターミナル → ローカル・ターミナル

* ターミナル・コンソール・フォントを Consolas に、文字セットを欧文に変更します。(サイズは任意) デフォルト設定だとローカル・ターミナルで和文フォントが切れて見にくいためです。  
ウィンドウ → 設定 → 一般 → 概観 → 色とフォント

* Eclipse マーケットプレースから、Nodeclipse をインストールします。インストール後に Eclipse を再起動します。(ダイアログ指示に従ってください。)  
ヘルプ → Eclipse マーケットプレース

* ファイル *.js に関連付けられたエディタのデフォルトを Nodeclipse JSDT-based Editor に変更します。デバッグでブレークポイントを使用するためです。JavaScript エディター、Nodeclipse Nodejs Editor では止まりません。  
ウィンドウ → 設定 → 一般 → エディター → ファイルの関連付け

* コンテンツ・タイプのHTMLのファイルの関連付けで、*.ejs を追加します。EJSファイルをHTML Editorで編集するためです。  
ウィンドウ → 設定 → 一般 → エディター → コンテンツ・タイプ

* HTMLバリデータの対象からファイル *.ejsを除外します。設定欄の「...」ボタンで除外グループを作り、拡張子ejsを設定します。<% などが検証のHTML構文にひっかかるためです。設定後にEclipseを終了、eclipse.exe -clean.cmdで起動します。  
ウィンドウ → 設定 → 一般 → 検証 

* pass all environment variables of Eclipse to launchd Node.js app を有効に(チェック) します。CFアプリはcfenv モジュールを使用して、環境変数を参照することが望ましいです。本項をチェックしておけば、Eclipseの実行コマンドやローカル・ターミナルでのnode コマンドでCFアプリを実行した際に cfenv が動作します。  
ウィンドウ → 設定 → Nodeclipse

* AnyEditツールのフィルタに*.md を追加します。マークダウンの末尾の空白を除去されないようにするためです。  
ウィンドウ → 設定 → 一般 → エディタ → AnyEditツール 

* Eclipse でアプリを実行する場合
 * 環境変数 VCAP_SERVICES を設定してください。  
実行 → 実行構成、ターミナルの場合はset コマンド (Windows)

            > $ set VCAP_SERVICES={    "cloudantNoSQLDB": [        {            "name": "Cloudant NoSQL DB-cc",            "label": "cloudantNoSQLDB",            "plan": "Shared",            "credentials": {                "username": "b03f6c1a-31ed-4d28-972c-a1ddef35f5d3-bluemix",                "password": "2f36b266f2ffc1cf0480364dca08cdc33704946cadeabd8d32c787b710f77eb7",                "host": "b03f6c1a-31ed-4d28-972c-a1ddef35f5d3-bluemix.cloudant.com",                "port": 443,                "url": "https://b03f6c1a-31ed-4d28-972c-a1ddef35f5d3-bluemix:2f36b266f2ffc1cf0480364dca08cdc33704946cadeabd8d32c787b710f77eb7@b03f6c1a-31ed-4d28-972c-a1ddef35f5d3-bluemix.cloudant.com"            }        }    ]}

 * NPMインストールを実行してください。

            > npm install
