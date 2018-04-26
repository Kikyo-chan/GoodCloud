## Openstack Cluster VitualNetwork Config

![irtualNetwork1](../images/VirtualNetwork10.png)

**The figure above is the topology of the entire network**

Router detail configure

![irtualNetwork1](../images/VirtualNetwork11.png)

#### Create Step

- Step1:Create public network

![irtualNetwork](../images/VirtualNetwork1.png)

- Step2:Create public subnet

![irtualNetwork](../images/VirtualNetwork2.png)

- Step3:Configure public subnet

![irtualNetwork](../images/VirtualNetwork3.png)

- Step4:Create private-net

![irtualNetwork](../images/VirtualNetwork4.png)

![irtualNetwork](../images/VirtualNetwork5.png)

- Step5: Create private subnet

![irtualNetwork](../images/VirtualNetwork6.png)

![irtualNetwork](../images/VirtualNetwork7.png)

- Step6: Create router

![irtualNetwork](../images/VirtualNetwork8.png)

- Step7: Add interface to private network

![irtualNetwork](../images/VirtualNetwork9.png)

# Important information (MTU)

![irtualNetwork1](../images/VirtualNetwork12.png)

![irtualNetwork1](../images/VirtualNetwork13.png)

**After the network is created, the MTU of the intranet is 1450, and the MTU of the extranet is 1500.**

- These will cause the windows visual machine can not connect to the public network normally


****

**The specific solution will be explained in the following documents***





