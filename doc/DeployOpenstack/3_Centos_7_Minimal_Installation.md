## Centos7 Installation

1. 安装Centos7 mini版镜像:
 镜像地址（http://isoredirect.centos.org/centos/7/isos/x86_64/CentOS-7-x86_64-Minimal-1708.iso)

2. 安装配置:

- 准备配置
  - 在Bios里面开启硬件虚拟化

- 控制节点
  - 主机名 controller
  - 选中安装界面监测到的所有硬盘, 选择 "manually configure partition", 删除所有已经存在的硬盘分区, 选择 "automatically generate partitions". 把 home 分区删了，并把所有空间划分给root。

- 在所有的节点做通信阿哥的硬盘操作，并下列方法配置主机名:
  - 主机名 compute2, compute3, ...

  
  