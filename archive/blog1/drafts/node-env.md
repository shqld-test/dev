# ぼくたちの NODE_ENV --- NODE_ENV のベストプラクティスを考える

## はじめに

**NODE_ENV** というものをご存知でしょうか？NODE_ENV は **Node.js** のエコシステムにおいて広く使われている**環境変数**ですが、この有名な変数は

-   公式な仕様（に準ずるもの）が存在しない
    -   値は自由
    -   用途は自由
-   慣習で

といったように、**誰がどのように使うかがエコシステムの各実装に依存している**という点で他の言語のものとは一線を画していると考えています。

この記事ではこの不思議な NODE_ENV について詳しく説明をしつつ、運用のベストプラクティスを考えていこうと思います。

NODE_ENV を完全理解されている方は、この記事の内容の半分を飛ばして後半のベストプラクティスについての考察を読んでいただければと思います。

## NODE_ENV とは何か

最初に述べた通りですが、基本的には `npm` や `yarn` といったパッケージマネージャによって参照される変数ですが、皆さんもご存知の通り `webpack.config.js` のようなビルドツールのコンフィグでも利用される慣習があります。

基本的にはプロセスの実行する環境を示す `production` や `development` という値が使われます。

### npm/yarn ではインストールするパッケージを絞るために使う

npm/yarn では NODE_ENV の値が **`production`** のとき **のみ** `npm install`, `yarn add/install` 時に `devDependencies` はインストールされないようになっています。これだけです。

実装はこちら。 https://github.com/nodejs/node/blob/4b97c3addb246274cd7e8432edd537e0bdf60b63/deps/npm/lib/config/defaults.js#L199

> With the --production flag (or when the NODE_ENV environment variable is set to production), npm will not install modules listed in devDependencies.

https://docs.npmjs.com/cli/install

（ちなみに自分の知る限り、公式なドキュメントで NODE_ENV について言及されているのはこのページだけです。）

babel や webpack のように、実際のプロダクトでは依存していない import/require しないライブラリのインストールには `--save-dev`　を付けるのはこのためですね。

また、あくまで

-   ブラウザ向けのプロジェクト(e.g. SPA)ではこの挙動によって**バンドルサイズを減らせるわけではない**
-   CI 上でメリットがあるわけではない （いずれにせよ devDeps は必要なので）

のでお気をつけください。

とはいえ Node.js のプロジェクトでは、例えば Docker イメージを作成する際にはイメージサイズの縮小化といった点で大きな意味を持ちます。当たり前の話ですが、依存管理は大事です。

### Node.js では参照されない

`node` / `npm start` コマンドの前に `NODE_ENV=production` を指定することが慣習的ですが、ここで重要なのは、**`node` 自体が `NODE_ENV` を見ることはない** ため 本来は無用であるという点です。

ではなぜこのような慣習が生まれたのか、ここは興味深いポイントなのであとで解説します。

## 多様な用途

とはいうものの、実世界(?)では NODE_ENV は非常によく使われています。有名な npm パッケージの実装をみると大体使われていますし、プロダクト開発においても（上で述べたように）プロダクトコードやビルドコンフィグで利用していることも多いでしょう。

仕様や勧告などは存在しないため、あくまで私が個人的な観測範囲や経験を基にまとめると、

プロダクトコード

-   （データベースなどの）環境の切替
-   ログレベルの切替
-   コードパスの最適化
-   バンドルサイズの縮小化

ビルドの設定

## 多様な値

上で見た通り、

-   How NODE_ENV should be like?
-   production first vs. development first
    -   avoid accidents in production
    -   readability
-   Introducing `BUILD_ENV` for the build process
    -   babel, webpack
    -   split the usecases of environmental variables clearly
-   NODE_ENV in webpack
    -   does not specify `mode`
    -   overriding via `env` args
-   ## How NODE_ENV is considered in TreeShaking
-   How to optimize build with NODE_ENV

    -   e.g. invariant

-   -   use only isDev
    -   describe explicitly what's default for production
-   don't depend on minifier

-   testing with some NODE_ENV
    -   CI
    -   production/staging?
    -   テストは env-insensitive がよい？
