## Cluster Network Configuration

**在我们设计的集群网路架构中，所有节点的网卡二用来做API_NET，网卡一作为EXT_NET**

**详细配置**

- 控制节点(充当compute1 和 gateway)
  - 以root身份登录
  - 关闭控制节点网卡一的NetworkManager控制
  - 修改配置文件ifcfg-eno1配置，此网卡用来提供neutron网络的物理接口

  ```
  vi /etc/sysconfig/network-scripts/ifcfg-eno1
  #change follows:
  NM_CONROLLED=no
  #save and exit
  ```

  - 配置网卡二

  ```
  vi /etc/sysconfig/network-scripts/ifcfg-eno2

  BOOTPROTO=static
  IPADDR=192.168.0.1
  NETMASK=255.255.255.0
  ONBOOT=yes
  NM_CONTROLLED=no

  ```

  - 重启控制节点网络服务

  ```
  systemctl restart network
  ```

  - 检查一下你的网络是否工作正常

  ```
  ping good.ncu.edu.cn
  ```

  - 安装一些工具

  ```
  yum -y update
  yum install -y openssh-server openssh-clients vim wget net-tools
  ```

  - 把selinux服务设置为disabled

  ```
  vim /etc/selinux/config
  SELINUX=disabled
  ```

  - 配置所有节点的hosts文件

  ```
  vim /etc/hosts
  192.168.0.1 controller compute1 gateway
  192.168.0.2 compute2
  192.168.0.3 compute3
  ...
  #::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
  ```

  - 关闭每个节点的防火墙, NetworkManager进程

  ```
  systemctl stop firewalld
  systemctl disable firewalld
  systemctl stop NetworkManager
  systemctl disable NetworkManager
  systemctl enable network
  systemctl restart network
  ```

- 端口流量转发配置:

  - **配置集群内网机器的外网访问**

  - 在登录节点

  ```
  yum install -y iptables-services

  chkconfig iptables on

  iptables -F
  iptables -t nat -F
  iptables -t mangle -F
  iptables -t nat -A POSTROUTING -o eno1 -j MASQUERADE
  iptables -A FORWARD -i eno2 -j ACCEPT
  iptables -A FORWARD -o eno2 -j ACCEPT
  service iptables save
  service iptables restart
  ```

  - 查看iptables配置是否生效

  ```
  iptables -S
  ```

- 配置正确的输出

  ```
  -P INPUT ACCEPT
  -P FORWARD ACCEPT
  -P OUTPUT ACCEPT
  -A FORWARD -i eno2 -j ACCEPT
  -A FORWARD -o eno2 -j ACCEPT
  ```

  - 让iptables配置永久生效:

  ```
  vi /etc/sysconfig/iptables-config

  IPTABLES_SAVE_ON_RESTART="yes"
  IPTABLES_SAVE_ON_STOP="yes"

  service iptables restart
  ```

  - 启用转发

  ```
  vim /etc/sysctl.conf

  net.ipv4.ip_forward=1
  ```

  - 重启机器让配置生效

- 计算节点

  - 为每个节点配置一个与控制节点管理网卡一个网段的地址

  ```
  vi /etc/sysconfig/network-scripts/ifcfg-eno2

  NM_CONTROLLED=no
  BOOTPROTO=static
  IPADDR=192.168.0.2 (192.168.0.3) ...
  METMASK=255.255.255.0
  GATEWAY=192.168.0.1
  ONBOOT=yes
  ```

  - 配置计算节点的nameserver

  ```
  vi /etc/resolv.conf

  nameserver 222.204.2.20 #this is our first private DNS server (due to your real network env)
  nameserver 202.101.224.68 #this is our second private DNS server
  nameserver 8.8.8.8
  ```

  - 重启网络服务

  ```
  service network restart
  ```

  - 关闭selinux配置
  - 设置计算节点的主机名
  - 关闭NetworkManager和防火墙配置
  - 重启所有机器让配置生效
