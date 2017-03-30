# dataplay2
Please refer to my blog(Chinese) for a simple introduction http://my.oschina.net/taogang/blog/630632

Add docker build @ https://github.com/gangtao/dataplay2/tree/master/docker in case you have trouble to run it.

```
cd dataplay2/docker
docker build -t dataplay:latest .
docker run -p 5000:5000 dataplay
```

or you can direcly run
```
docker run -p 5000:5000 naughtytao/dataplay
```
