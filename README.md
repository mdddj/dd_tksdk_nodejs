sdk需要自己编译

下载此仓库源代码

需要安装nodejs


修改`src/utils/ServerUtil.ts`下面的`defaultHost`属性修改为服务器地址`https://itbug.shop`

在本项目根目录下运行

```bash
    npm install 
    npm run build
```

会在根目录下生成`apis`文件夹,将该目录复制到项目目录下即可使用