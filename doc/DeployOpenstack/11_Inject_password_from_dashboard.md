#从dashboard设置openstack镜像初始密码的办法

- 登录openstack所有节点
sed -i 's/inject_password=False/inject_password=True/g'

在控制节点


- 之后在dashboard中注入初始密码,并开启ssh密码验证服务

```
#!/bin/sh
passwd centos<<EOF
yourpassword
yourpassword
EOF
sed -i 's/PasswordAuthentication no/PasswordAuthentication yes/g' /etc/ssh/sshd_config
service sshd restart
```