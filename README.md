# Aikadm-Frontend

这时 [Aikadm](https://github.com/HumXC/aikadm) 的前端仓库，用于为 Aikadm 提供一个最基本的界面。该项目作为 Aikadm 前端的 Example 项目，为开发者提供参考。以下文档也会指导你如何开发 Aikadm 前端。

## 开始

Aikadm 的前端只是一个普通的前端项目，你可以使用任何你喜欢的前端框架或库来开发。但是为了使前端可以与 Aikadm 交互，你需要安装 `@aikadm/aikadm` npm 包。这个包提供了与 Aikadm 后端通信的接口。

```bash
npm install @aikadm/aikadm
```

由于 `@aikadm/aikadm` 使用了"顶层 await"，所以你需要在你的前端项目中开启相关功能。对于本项目使用的 Vite，需要在 `vite.config.js` 中添加以下内容：

```js
export default defineConfig({
    optimizeDeps: {
        esbuildOptions: {
            supported: {
                "top-level-await": true,
            },
        },
    },
    esbuild: {
        supported: {
            "top-level-await": true,
        },
    },
});
```

由于本项目还会部署到 github pages，所以我增加了 `base.js` 文件，用于设置部署的 path。这个文件会在部署时被 github action 修改。

## 调试

你可以在本地启动前端项目，然后在浏览器中来调试。也可以使用 aikadm 来调试，以下介绍如何在 aikadm 中调试。

首先，你需要获取 Aikadm 的可执行文件。对于本项目，你可以：

1. 启动前端项目

    ```bash
    npm run dev
    ```

    运行之后在控制台会打印出一个 http 地址，假设这个地址是 `http://localhost:3000`。

2. 启动 Aikadm
   在另一个终端启动 Aikadm，并使用 -a 参数指定前端项目的地址：

    ```bash
    ./aikadm -a http://localhost:3000
    ```

## Aikadm API

`@aikadm/aikadm` 包提供了与 Aikadm 后端通信的接口，用于做一些浏览器无法做到的事情，你可以查看 [源代码](https://github.com/HumXC/aikadm/blob/main/aikadm.go) 来了解具体实现。

```ts
import { Aikadm } from "@aikadm/aikadm";
Aikadm.GetUsers; // 获取系统中的用户
Aikadm.GetSessions; // 获取系统中的会话
Aikadm.Login; // 登录
Aikadm.GetUserAvatar; // 获取用户头像
Aikadm.Exec; // 执行命令
Aikadm.ExecOutput; // 执行命令并获取输出
Aikadm.KillProcess; // 杀死进程
Aikadm.ReadConfig; // 读取配置文件
Aikadm.SaveConfig; // 保存配置文件
Aikadm.Reboot; // 重启系统
Aikadm.Shutdown; // 关闭系统
Aikadm.TestDemoMode; // 测试演示模式
```

## 其他

### 读取和保存数据

浏览器中的 localStorage API 被禁用，你应该调用 `Aikadm.ReadConfig` 和 `Aikadm.SaveConfig` 来读取和保存数据。`ReadConfig` 会返回一个 Object，你需要自己确认数据结构是否正确。

### DemoMode

当前端运行在非 Aikadm 中或者找不到 `GREETD_SOCK` 环境变量时，会进入 DemoMode。

DemoMode 可以让你在浏览器中也能调用 Aikadm API，在 DemoMode 下，部分 API 请求会返回假数据。你可以在调用 `Aikadm.TestDemoMode` 来获取 DemoMode 的状态，如果 `TestDemoMode` 抛出错误，说明当前处于 DemoMode 下。

如果你不希望获取假数据，你可以直接导入并调用原始的后端绑定：

```ts
import { TestDemoMode, Login } from "@aikadm/aikadm/bindings/github.com/HumXC/aikadm/aikadm";
```
