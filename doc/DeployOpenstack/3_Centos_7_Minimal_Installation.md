## Centos7 Installation

1. Install Centos7 with the following configuration on the controller node of our cluster:

   We need a minimal version of CentOS (download url. http://isoredirect.centos.org/centos/7/isos/x86_64/CentOS-7-x86_64-Minimal-1708.iso)

2. Install Configuration:

- Prepare in advance
  - To Bios, Enable Virtualizatin


- Controller node
  - Hostname: controller password: your password
  - Select all the disk on your node, choose "manually configure partition", delete all the existing partitions, and then click "automatically generate partitions". Adjust the amount of capacity assigned to the root and make it as large as possible. You can remove /home partition if you are not going to use it at all and allocate it's space to /root
- Do the same for all other nodes in the cluster and set the hostnames as follows:
  - Hostname: compute2, compute3, …...
  - Password: yourpassword
  - do same disk operating as controller node 
  
  
  