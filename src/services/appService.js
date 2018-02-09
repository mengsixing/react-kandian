//延迟1s执行函数
export function delay(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}
