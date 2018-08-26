## Cluster Architecture

![rchitectur](../images/Architecture.png)

### Introduction

第一版的集群有一个控制节点和多个计算节点，同时控制节点也承担的计算节点的角色。

控制节点的网卡一(eno1)接入外网，提供neutron网络的物理接口,网卡二(eno2)作为内网的管理网卡。

整个结构充分的利用了物理资源，实现了一个简单的OpenStack集群。

为了使内网的机器可以访问外网，我们将控制节点网卡二(eno2)的流量转发到网卡一(eno1)

以网卡二的地址作为内部机器的网关
