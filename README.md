## Todo List with MySQL database

這是一個讓使用者可以建立 Todo List 的網站
![Index](https://github.com/siang720/todo_list_mysql/blob/master/image/demo_index.png)

## Feature

- 使用者需要註冊帳號才能使用網站功能，註冊的資料包括：名字、email、密碼、確認密碼
- 使用者必須登入才能使用 Todo List
- 如果使用者已經註冊過、沒填寫必填欄位、或是密碼輸入錯誤，就註冊失敗
- 使用者也可以透過 Facebook Login 直接登入
- 使用者的密碼使用 bcrypt 來處理
- 登入後，使用者可以建立並管理專屬他的一個 Todo List
- 使用者註冊時，若有欄位未填寫或密碼填寫不一致，會跳出提示訊息

## MVC Framework

- Models -> MySQL
- View -> HTML / CSS / Javascript / express-handlebars
- Controller -> express

## Installing

- 下載這個資料夾

```
$ git clone https://github.com/siang720/todo_list_mysql.git
```

- 開啟 Command Line 並進入專案資料夾

  - 安裝所有 package.json 中的套件
    ```
    $ npm install "package name"
    ```

- 安裝 MySQL，MySQL Workbench，並使用 MySQL Workbench 建立資料庫
  - [MySQL 官網下載](https://www.mysql.com/downloads/)
  - [MySQL Workbench 官網下載](https://dev.mysql.com/downloads/workbench/)
  - 打開 MySQL Workbench，在一個新的 Query 頁面輸入以下的 SQL 指令去建立一個名為 todo-sequelize 的資料庫
    ```
    drop database if exists todo_sequelize;
    create database todo_sequelize;
    use todo_sequelize;
    ```
  - 修改 /config/config.json 內容
    - 修改下列內容
    ```
    "password": password of your MySQL database,
    "database": "todo_sequelize"
    ```
    - 刪除下列內容(若沒有這行可以跳過)
    ```
    "operatorsAliases": false
    ```
  - 用 Command Line 進入專案資料夾，執行 DB Migration
    ```
    $ npx sequelize db:migrate
    ```

* 加入環境變數 (若要使用 Facebook 登入功能才需要此步驟)

  - 至[Facebook Developer](https://developers.facebook.com/)登入，並設定一個應用程式並取得應用程式編號與密鑰
  - 在「有效的 OAuth 重新導向 URI」的地方，輸入 http://localhost:3000/auth/facebook/callback 這個網址
  - 在專案資料夾根目錄，加入一個名為 .env 的檔案，檔案文字內容如下
    ```
    // .env
    FACEBOOK_ID = <Your APP ID>
    FACEBOOK_SECRET = <Your App Secret>
    CALLBACK_DOMAIN = http://localhost:3000/auth/facebook/callback
    ```

- 開啟 Command Line

  - 啟動 Server

  ```
  $ npm run dev
  ```

- 環境設置完成，用瀏覽器登入 http://localhost:3000
