## Cluster Network Configuration

**In our senario, controller node has two interfaces, interface1 (eno1) is connected to the public network and interface2(eno2) is connected to local swtich that connects all the nodes in the cluster **

**Detial Configuration**

- Controller(compute1 and gateway)

  - Login with root username and password
  - Stop first network interface(eno1) from being managed by the NetworkManager deamon

  ```
  vi /etc/sysconfig/network-scripts/ifcfg-eno1
  #change follows:
  NM_CONROLLED=no
  #save and exit
  ```

  - Set a static private IP address for the controller(192.168.0.1 (tip:This must be in line with your actual network environment))

  ```
  vi /etc/sysconfig/network-scripts/ifcfg-eno2

  BOOTPROTO=static
  IPADDR=192.168.0.1
  NETMASK=255.255.255.0
  ONBOOT=yes
  NM_CONTROLLED=no

  #save and exit
  ```

  - Restart the network service

  ```
  systemctl restart network
  ```

  - Check if you have the internet connection is working!

  ```
  ping good.ncu.edu.cn
  ```

  - Update your repository and install opens-server openssh-clients vim and wget

  ```
  yum -y update
  yum install -y openssh-server openssh-clients vim wget net-tools
  ```

  - Change the state of SELINUX to disabled

  ```
  vim /etc/selinux/config
  SELINUX=disabled
  ```

  - Set the domain name for compute nodes. And comment the ipv6 address

  ```
  vim /etc/hosts
  192.168.0.1 controller compute1 gateway
  192.168.0.2 compute2
  192.168.0.3 compute3
  ...
  #::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
  ```

  - Disable Network Manager and firewall to avoid conflicts with OpenStack

  ```
  systemctl stop firewalld
  systemctl disable firewalld
  systemctl stop NetworkManager
  systemctl disable NetworkManager
  systemctl enable network
  systemctl restart network
  ```

- NAT Configuration on Controller Node:

  - **To provide Internet access to other machines in the cluster, you should enable NAT. If all machines in the cluster are getting public IPs by default you can skip thos step**

  - Enable the NAT forwarding from iptables to give Internet access to compute hosts by executing the

    following commands:

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

  - Check if I-tables has been properly configured:

  ```
  iptables -S
  ```

  the output should include these:

  ```
  -P INPUT ACCEPT
  -P FORWARD ACCEPT
  -P OUTPUT ACCEPT
  -A FORWARD -i eno2 -j ACCEPT
  -A FORWARD -o eno2 -j ACCEPT
  ```

  - To make sure you do not lose iptables configuration do the following:

  ```
  vi /etc/sysconfig/iptables-config

  IPTABLES_SAVE_ON_RESTART="yes"
  IPTABLES_SAVE_ON_STOP="yes"

  service iptables restart
  ```

  - Enable forwarding

  ```
  vim /etc/sysctl.conf

  net.ipv4.ip_forward=1
  ```

  - Reboot the controller machine and make sure the changes are persistent.

- Compute Nodes

  - Login with root username and password
  - Set a static private IP address for each node

  ```
  vi /etc/sysconfig/network-scripts/ifcfg-eno2

  NM_CONTROLLED=no
  BOOTPROTO=static
  IPADDR=192.168.0.2 (192.168.0.3) ...
  METMASK=255.255.255.0
  GATEWAY=192.168.0.1
  ONBOOT=yes
  ```

  - Define some nameservers for your compute nodes

  ```
  vi /etc/resolv.conf

  nameserver 222.204.2.20 #this is our first private DNS server (due to your real network env)
  nameserver 202.101.224.68 #this is our second private DNS server
  nameserver 8.8.8.8
  ```

  - Restart your network service

  ```
  service network restart
  ```

  - Update your repository and install openssh-server opens-clients vim and wget like controller node
  - Change the state os SELINUX to disabled like controller node
  - Set the domain name for compute nodes like controller node
  - Disable Network Manager and firewall to avoid conflicts with OpenStack Networking Service like controller node
  - Reboot all machines to make sure the changes are persistent.