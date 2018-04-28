## Openstack Firewalls and default ports

**Default ports that OpenStack components use **

| OpenStack service                                            | Default ports    | Port type              |
| ------------------------------------------------------------ | ---------------- | ---------------------- |
| Block Storage (`cinder`)                                     | 8776             | publicurl and adminurl |
| Compute (`nova`) endpoints                                   | 8774             | publicurl and adminurl |
| Compute API (`nova-api`)                                     | 8773, 8775       |                        |
| Compute ports for access to virtual machine consoles         | 5900-5999        |                        |
| Compute VNC proxy for browsers ( `openstack-nova-novncproxy`) | 6080             |                        |
| Compute VNC proxy for traditional VNC clients (`openstack-nova-xvpvncproxy`) | 6081             |                        |
| Proxy port for HTML5 console used by Compute service         | 6082             |                        |
| Data processing service (`sahara`) endpoint                  | 8386             | publicurl and adminurl |
| Identity service (`keystone`) administrative endpoint        | 35357            | adminurl               |
| Identity service public endpoint                             | 5000             | publicurl              |
| Image service (`glance`) API                                 | 9292             | publicurl and adminurl |
| Image service registry                                       | 9191             |                        |
| Networking (`neutron`)                                       | 9696             | publicurl and adminurl |
| Object Storage (`swift`)                                     | 6000, 6001, 6002 |                        |
| Orchestration (`heat`) endpoint                              | 8004             | publicurl and adminurl |
| Orchestration AWS CloudFormation-compatible API (`openstack-heat-api-cfn`) | 8000             |                        |
| Orchestration AWS CloudWatch-compatible API (`openstack-heat-api-cloudwatch`) | 8003             |                        |
| Telemetry (`ceilometer`)                                     | 8777             | publicurl and adminurl |

**Default ports that secondary services related to Openstack compents use**

| Service                       | Default port | Used by                                                      |
| ----------------------------- | ------------ | ------------------------------------------------------------ |
| HTTP                          | 80           | OpenStack dashboard (`Horizon`) when it is not configured to use secure access. |
| HTTP alternate                | 8080         | OpenStack Object Storage (`swift`) service.                  |
| HTTPS                         | 443          | Any OpenStack service that is enabled for SSL, especially secure-access dashboard. |
| rsync                         | 873          | OpenStack Object Storage. Required.                          |
| iSCSI target                  | 3260         | OpenStack Block Storage. Required.                           |
| MySQL database service        | 3306         | Most OpenStack components.                                   |
| Message Broker (AMQP traffic) | 5672         | OpenStack Block Storage, Networking, Orchestration, and Compute. |

