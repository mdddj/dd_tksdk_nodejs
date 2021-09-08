### 安装
```bash 
npm i dd_server_api
```

### 使用
创建一个全局方法
```ts
export const taokeApi = () :TaokeApi=> {
 const api = TaokeApi.getInstance()
  api.host = 'http://localhost'
  return api
}
```
在页面中使用,例子
```ts

import React, {useState} from "react";
import {useMount} from "@umijs/hooks";
import {taokeApi} from "@/util/request";
import {TMeituanData} from "dd_server_api/apis/model/tk/MeituanData";

let api = taokeApi()  /// 引入api接口

/**
 * 首页美团领券广告
 * @constructor
 */
const MeituanCoupon: React.FC = () => {
  const [mtData, setMtData] = useState<TMeituanData>()
  useMount(async () => {
    const response = await api.getMeituanCoupon({actId: '2', linkType: '1', miniCode: '1'})
    console.log(response)
    setMtData(response)
  })
  return <>
    {
      mtData && <a href={mtData.data}>美团领券</a>
    }
  </>
}
export default MeituanCoupon

```