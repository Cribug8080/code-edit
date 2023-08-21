## s1

react 组件为什么只返回一个元素
react性能优化
react的事件系统
宏任务与微任务

### [retry](https://github.com/tim-kos/node-retry/tree/master)


[retry Number](http://dthain.blogspot.com/2009/02/exponential-backoff-in-distributed.html)
Let's assume that they delay chosen at any point is based on an initial timeout (T), an exponential factor (F), the number of retries so far (N), a random number (R), and a maximum timeout (M). Then:

delay = MIN( R * T * F ^ N , M )

R should be a random number in the range [1-2], so that its effect is to spread out the load over time, but always more conservative than plain backoff.
T is the initial timeout, and should be set at the outer limits of expected response time for the service. For example, if your service responds in 1ms on average but in 10ms for 99% of requests, then set t=10ms.
F doesn't matter much, so choose 2 as a nice round number. (It's the exponential nature that counts.)
M should be as low as possible to keep your customers happy, but high enough that the system can definitely handle requests from all clients at that sustained rate.




