# 瞬間英作文トレーナー

和文を見てすぐ英訳するための静的Webアプリです。ライティング練習、スピーキング練習、模範解答の読み上げ、苦手優先の復習、ローカル保存の学習履歴に対応しています。

## ローカルで開く

`index.html` をブラウザで開くだけで動きます。

ただし、マイク入力はブラウザの仕様上、`file://` では毎回許可が必要になったり、音声認識が動かないことがあります。安定して使うなら、`https://` の公開URLか `localhost` で開いてください。

## Cloudflare Pagesで公開

### GitHub連携で公開

1. このフォルダをGitHubリポジトリにpushします。
2. Cloudflare Dashboardで `Workers & Pages` → `Create application` → `Pages` を選びます。
3. GitHubリポジトリを接続します。
4. Framework presetは `None`、Build commandは空、Build output directoryは `/` にします。
5. Deployします。

### Wrangler CLIで公開

```bash
npm install
npm run deploy
```

初回はCloudflareログインやプロジェクト作成の確認が表示されます。

## GitHubに上げる

```bash
git init
git add .
git commit -m "Add instant English composition trainer"
git branch -M main
git remote add origin https://github.com/<your-name>/<repo-name>.git
git push -u origin main
```

GitHub CLIを使う場合:

```bash
gh repo create <repo-name> --public --source . --remote origin --push
```

## マイク許可について

ブラウザは安全のため、マイクをサイト単位で許可します。Cloudflare PagesなどのHTTPS URLで一度許可すると、多くのブラウザでは次回以降そのサイト設定が保持されます。ブロックしてしまった場合は、アドレスバー左側のサイト設定からマイクを許可に戻してください。
