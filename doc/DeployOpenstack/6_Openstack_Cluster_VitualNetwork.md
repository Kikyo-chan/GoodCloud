## OpenStack SDN dashboard操作，一个私网网段一个公网网段

![irtualNetwork1](../images/VirtualNetwork10.png)

**上图是整个网络的拓扑结构**

路由的详细配置
![irtualNetwork1](../images/VirtualNetwork11.png)

#### Create Step

- Step1:创建public网络

![irtualNetwork](../images/VirtualNetwork1.png)

- Step2:创建 public 网络

![irtualNetwork](../images/VirtualNetwork2.png)

- Step3:创建 public subnet

![irtualNetwork](../images/VirtualNetwork3.png)

- Step4:创建 pravite 网络

![irtualNetwork](../images/VirtualNetwork4.png)

![irtualNetwork](../images/VirtualNetwork5.png)

- Step5: 创建 private subnet

![irtualNetwork](../images/VirtualNetwork6.png)

![irtualNetwork](../images/VirtualNetwork7.png)

- Step6: 创建虚拟路由

![irtualNetwork](../images/VirtualNetwork8.png)

- Step7: 给private网络加一个端口

![irtualNetwork](../images/VirtualNetwork9.png)

# MTU配置

![irtualNetwork1](../images/VirtualNetwork12.png)

![irtualNetwork1](../images/VirtualNetwork13.png)

# 关于默认MTU为1450导致windows无法访问外网的解决办法，给windows网络配置中加入1450的MTU配置即可







