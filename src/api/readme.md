## api的封装思路

使用npm_axios进行请求发送响应。
所以对axios实例进行封装，`统一`拦截处理请求和响应。

### 一、拦截请求

比如：1、给请求头`headers`添加一个`Authorization 字段`对应的`用户cookie`<sup>[1]</sup>。

> [1]补充：虽然请求会带上全部的cookie，但是如果不传`Authorization 字段`，服务器需要明确的知道所需cookie值在浏览器中对应cookie的哪一个字段。

``` JS
instance.interceptors.request.use(
  (config) => {
      config.headers.Authorization = '用户的cookie'
      return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
```

### 二、封装axios实例
原本调用一个接口需要 axios.请求方法(请求地址，请求参数)
```js
const instance = axios.create()

instance.get('url地址', {params: '参数'})
instance.put('url地址', {param1: '参数'})
instance.post('url地址', {param2: '参数'})
instance.delete('url地址', {param3: '参数'})
```

可以将它method提取封装为 `instance[method](url, params)`。
且处理了调用get类型接口时，传参parmas无需再多包一层。
``` JS
const instance = axios.create() // [2]

const request = (config) => {
  const method = (config.method || '').toLowerCase() // 获得请求方法
  let params = config.params || {}

  // 为了兼容 get 请求，使参数无需{params: params}传入，依旧保持 params
  config.method === 'get' && (params = { params })

  // 禁止拦截器处理请求
  if (config.noHandle) { // [1]
    return instance(config)
  }

  return instance[method](url, params)
    .then((response) => Promise.resolve({ response, config }))
    .then(handleResponse) // 对response做统一处理，且为了获取到config自定义数据
    .catch((error) => {
      return Promise.reject(error)
    })
}

export default request
```
> [1]备注：`config.noHandle`是自定义属性，指示是否禁止拦截器处理请求
> [2]备注：为了能够使用拦截器，使用`create`。且同一个项目可以创建多个实例，使用不同的拦截器。

### 三、拦截响应

注意：本项目的拦截响应，本质用的不是axios的拦截器，而是在成功返回response后再次拦截，用`handleResponse`处理返回结果。

``` JS
instance.interceptors.response.use(
  (response) => {
    // 注意：虽然 response 中包含config，但不包含自定义的config（所以需要对response做处理）
    // 即.then(handleResponse)
    // 所以这里没有做任何处理
    return response
  },
  (error) => {
    showMessageError()
    return Promise.reject(error)
  }
)
```
为什么要拦截响应结果？可以做什么？
比如：1、当接口请求返回“登录信息过期”，可以统一做回到登录页的处理。

``` JS
  if ([1102, 1101].includes(response.data.code)) {
    that.$PDo.Cookies.remove(process.env.VUE_APP_COOKIE) // 移除cookie
    location.reload() // 刷新页面，跳转登录页
  }
```


比如：2、简化返回数据，去掉不必要的`code，status，headers`等信息<sup>[1]</sup>。只保留`res.data`的信息。
比如：3、控制台打印当前请求的响应结果，为了在控制台同时看到`页面报错`和`网络请求结果`等。
比如：4、接口报错<sup>[4]</sup>的统一处理，弹出toast提示等。

``` JS
  /* 当请求响应成功 */
  if (response.data.code === 0) { // [2] 判断是否成功
    console.log(
      '✅%c【%s】',
      'color: green',
      config.name || config.url, // name 是接口的中文名称，url是接口地址
      {response : response.data.data },
      { config }
    ) // 3 打印结果
    return Promise.resolve(response.data.data) // [1] 根据项目可以再进一步阉割，返回响应结果
  }

  /* 当请求响应失败 */
  const error = response.data.message // 报错信息

  config.showError !== false && that.$Message.error(error || '系统错误') // 4 报错处理 [3]

  console.log('❌%c【%s】', 'color: red', config.name || '-', error, { config }) // 3 打印结果

  return Promise.reject(response.data) // [1] 返回响应结果
```

> [1]解释：因为这信息主要用于判断接口是否调用成功，在具体的业务页面中不需要使用到，所以不返回。
> [2]备注：这里的code值需要`前后端进行统一`（有一个固定的标准）。如统一返回code为0时表示接口调用成功。其他code表示不同的错误。
> [3]备注：`config.showError`是自定义属性，指示当前请求是否显示报错toast。
> [4]备注：有3种接口报错。

#### 3.1、接口报错的3种可能

第一级错误：`网络错误`（请求没有发送成功、超时了、断网）（request阶段）
第二级错误：`远程服务错误`（接口没有找到，status的状态不是2xx）（response阶段）
第三级错误：`接口返回错误`（传参格式不对、没有权限等）（response阶段）

对于请求超时有两种情况
- 第一种request阶段，请求没有发出去。可以通过设置axios的`config.timeout`处理。
- 第二种response阶段，请求发出去了一直没有响应。需要手动处理处理（可以暂停原本的请求）（emm...这个暂停是必须的吗？）


#### 3.2、config 中添加自定义信息

为了对响应的统一处理，项目中用了很多自定义的config属性。

``` JS
   config: {
      // 原本就有的
      method: 'get',
      url: '接口地址',
      params: '接口参数', // 指示接口需要的参数，备注：get请求会再封装为{params}
      // 自定义的信息
      name: '接口描述', // 指示当前“打印的请求响应结果”属于哪一个接口
      noErrorArr: Array, // 不自动报错的code
      showError: Boolean, // 是否自动报错
      noCode: Boolean, // 是否根据code判断返回结果(七牛云的接口，没有返回code)
      noHandle: Boolean, // 是否使用handleResponse处理响应结果(下载表格时，不能处理，blob会被字符串化乱码～)
   }
```


注意：自定义的名称不要和axios中已有的属性名重复。
axios 的 Request Config（可以看看[官网](https://github.com/axios/axios)）
```js
  url
  method
  data 放入body的数据
  timeout 超时处理
  withCredentials 跨域是否需要证书
  adapter 适配器
  validateStatus 校验res.status返回成功失败
  // baseURL、transformRequest、transformResponse、headers、params、paramsSerializer、
  // auth、responseType、responseEncoding、xsrfCookieName、xsrfHeaderName、onUploadProgress、
  // onDownloadProgress、maxContentLength、maxBodyLength、maxRedirects、socketPath、
  // httpAgent、httpsAgent、proxy、cancelToken、decompress
```



### 四、动态生成请求接口函数

接口的配置信息，返回一个函数，因为url可能是动态的。


``` JS
// api-domain.js 接口的配置信息
export default {
  putApiDomainDisable(id, params) {
    return {
      method: 'put',
      name: '禁用API域名',
      url: `/api/sl/api_domains/${id}/disable/`,
      params
    }
  },

  getApiDomain(params) {
    return {
      method: 'get',
      name: '列出API域名',
      url: '/api/sl/api_domains/',
      params
    }
  }
}
```
> 这里为什么不直接引入reqeust，返回一个request？
> 因为想试一试动态生成(Proxy)，其次想让这个文件的职责只是配置（代码分离）。


动态生成全部`请求接口函数 request`。

``` JS
import ApiDomain0 from './modules2/api-domain' // 接口的配置信息
import request from './instance' // 为了只使用一个请求实例

// 第二种方法：动态代理获取接口
const ApiDomain = new Proxy(
  {},
  {
    get(target, apiName) {
      // 为了兼容传了两个参数的（id需要用在url中，动态url），返回request请求
      // param2 可能没有（有的时候param1是id）
      return request(ApiDomain0[apiName](param1, param2))
    }
  }
)

// 第一种方法：动态生成全部的对象
// Object.keys(ApiDomain0).reduce((pre, apiName) => {
//   // eslint-disable-next-line no-invalid-this
//   pre[apiName] = (param1, param2) =>
//     request(ApiDomain0[apiName](param1, param2))
//   return pre
// }, {})
export default ApiDomain
```


#### 4.1、请求接口按照功能分块

比如：一个项目有订单模块、商品模块、用户模块，可以将他们对应的接口放在三个js文件中。然后，使用一个js将集成。

``` JS
import Order from './modules/order'
import Production from './modules/production'
import Account from './modules/account'

export default {
  Order,
  Production,
  Account
}
```

### 五、总结

这么封装了带来了什么好处？？？？omg...
大概就体现了下面的一些代码思路吧。（好像也没有什么厉害的 <img src="https://uploader.shimo.im/f/iwvsxaXvRO0a1dX4.png!thumbnail" style="vertical-align: sub;display:inline-block;width: 20px;" /> ）

1、代码分离
- 所有接口按`功能模块`划分为多个js文件
- 每个文件只写入对应接口的请求信息（配置信息）（单一职责）

2、代码复用
- 利用`接口配置信息`生成各模块所有的`请求函数 request`(Proxy 代理生成)

3、axios的请求（成功、失败）统一处理
- 请求成功，阉割返回内容
- 请求失败，弹出报错toast
- 请求超时（请求没有发出、请求发出没有响应）
