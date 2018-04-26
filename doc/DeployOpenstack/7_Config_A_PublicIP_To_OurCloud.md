## Config a public ip to our cloud

###Public network card config

- example

```
TYPE=Ethernet

PROXY_METHOD=none

BROWSER_ONLY=no

BOOTPROTO=static

DEFROUTE=yes

IPV4_FAILURE_FATAL=no

IPV6INIT=yes

IPV6_AUTOCONF=yes

IPV6_DEFROUTE=yes

IPV6_FAILURE_FATAL=no

IPV6_ADDR_GEN_MODE=stable-privacy

NAME=eno1

UUID=a97f912a-2a6d-42d7-83fe-87730f6ae9ea

DEVICE=eno1

ONBOOT=yes

IPADDR=222.204.*.*

NETMASK=255.255.255.0

GATEWAY=222.204.*.*

DNS1=222.204.*.*

DNS2=202.101.*.*
```

***This network card is used to receive access request from public network users***

### Config dashboard to public access

- (/etc/httpd/conf.d/15-horizon_vhost.conf)

```
vim /etc/httpd/conf.d/15-horizon_vhost.conf
```

- Config detail

```
# ************************************
# Vhost template in module puppetlabs-apache
# Managed by Puppet
# ************************************

<VirtualHost *:80>
  ServerName controller

  ## Vhost docroot
  DocumentRoot "/var/www/"
  ## Alias declarations for resources outside the DocumentRoot
  Alias /dashboard/static "/usr/share/openstack-dashboard/static"
  	

  ## Directories, there should at least be a declaration for /var/www/

  <Directory "/var/www/">
    Options Indexes FollowSymLinks MultiViews
    AllowOverride None
    Require all granted
    
  </Directory>

  ## Logging
  ErrorLog "/var/log/httpd/horizon_error.log"
  ServerSignature Off
  CustomLog "/var/log/httpd/horizon_access.log" combined 

  ## RedirectMatch rules
  RedirectMatch permanent  ^/$ /dashboard

  ## Server aliases
  ServerAlias 222.204.*.* (Your public address, It\ not convenient to expose our school's 	IP)
  
  ServerAlias 192.168.6.1
  ServerAlias controller
  ServerAlias localhost
  WSGIApplicationGroup %{GLOBAL}
  WSGIDaemonProcess apache display-name=horizon group=apache processes=3 threads=10 user=apache
  WSGIProcessGroup apache
  WSGIScriptAlias /dashboard "/usr/share/openstack-dashboard/openstack_dashboard/wsgi/django.wsgi"
</VirtualHost>
```

### noVNC Proxy config detail

- Controller node

```
  9000	[vnc]
  9001	#
  9002	# Virtual Network Computer (VNC) can be used to provide remote desktop
  9003	# console access to instances for tenants and/or administrators.
       
  9004	#
  9005	# From nova.conf
  9006	#
       
  9007	#
  9008	# Enable VNC related features.
  9009	#
  9010	# Guests will get created with graphical devices to support this. Clients
  9011	# (for example Horizon) can then establish a VNC connection to the guest.
  9012	#  (boolean value)
  9013	# Deprecated group;name - DEFAULT;vnc_enabled
  9014	#enabled=true
  9015	enabled=True
       
  9016	#
  9017	# Keymap for VNC.
  9018	#
  9019	# The keyboard mapping (keymap) determines which keyboard layout a VNC
  9020	# session should use by default.
  9021	#
  9022	# Possible values:
  9023	#
  9024	# * A keyboard layout which is supported by the underlying hypervisor on
  9025	#   this node. This is usually an 'IETF language tag' (for example
  9026	#   'en-us').  If you use QEMU as hypervisor, you should find the  list
  9027	#   of supported keyboard layouts at ``/usr/share/qemu/keymaps``.
  9028	#  (string value)
  9029	# Deprecated group;name - DEFAULT;vnc_keymap
  9030	#keymap=en-us
  9031	keymap=en-us
       
  9032	#
  9033	# The IP address or hostname on which an instance should listen to for
  9034	# incoming VNC connection requests on this node.
  9035	#  (unknown value)
  9036	# Deprecated group;name - DEFAULT;vncserver_listen
  9037	# Deprecated group;name - [vnc]/vncserver_listen
  9038	server_listen=0.0.0.0
       
  9039	#
  9040	# Private, internal IP address or hostname of VNC console proxy.
  9041	#
  9042	# The VNC proxy is an OpenStack component that enables compute service
  9043	# users to access their instances through VNC clients.
  9044	#
  9045	# This option sets the private address to which proxy clients, such as
  9046	# ``nova-xvpvncproxy``, should connect to.
  9047	#  (unknown value)
  9048	# Deprecated group;name - DEFAULT;vncserver_proxyclient_address
  9049	# Deprecated group;name - [vnc]/vncserver_proxyclient_address
  9050	server_proxyclient_address=127.0.0.1
       
  9051	#
  9052	# Public address of noVNC VNC console proxy.
  9053	#
  9054	# The VNC proxy is an OpenStack component that enables compute service
  9055	# users to access their instances through VNC clients. noVNC provides
  9056	# VNC support through a websocket-based client.
  9057	#
  9058	# This option sets the public base URL to which client systems will
  9059	# connect. noVNC clients can use this address to connect to the noVNC
  9060	# instance and, by extension, the VNC sessions.
  9061	#
  9062	# Related options:
  9063	#
  9064	# * novncproxy_host
  9065	# * novncproxy_port
  9066	#  (uri value)
  9067	novncproxy_base_url=http://222.204.6.193:8080/vnc_auto.html
       
  9068	#
  9069	# IP address or hostname that the XVP VNC console proxy should bind to.
  9070	#
  9071	# The VNC proxy is an OpenStack component that enables compute service
  9072	# users to access their instances through VNC clients. Xen provides
  9073	# the Xenserver VNC Proxy, or XVP, as an alternative to the
  9074	# websocket-based noVNC proxy used by Libvirt. In contrast to noVNC,
  9075	# XVP clients are Java-based.
  9076	#
  9077	# This option sets the private address to which the XVP VNC console proxy
  9078	# service should bind to.
  9079	#
  9080	# Related options:
  9081	#
  9082	# * xvpvncproxy_port
  9083	# * xvpvncproxy_base_url
  9084	#  (unknown value)
  9085	#xvpvncproxy_host=0.0.0.0
       
  9086	#
  9087	# Port that the XVP VNC console proxy should bind to.
  9088	#
  9089	# The VNC proxy is an OpenStack component that enables compute service
  9090	# users to access their instances through VNC clients. Xen provides
  9091	# the Xenserver VNC Proxy, or XVP, as an alternative to the
  9092	# websocket-based noVNC proxy used by Libvirt. In contrast to noVNC,
  9093	# XVP clients are Java-based.
  9094	#
  9095	# This option sets the private port to which the XVP VNC console proxy
  9096	# service should bind to.
  9097	#
  9098	# Related options:
  9099	#
  9100	# * xvpvncproxy_host
  9101	# * xvpvncproxy_base_url
  9102	#  (port value)
  9103	# Minimum value: 0
  9104	# Maximum value: 65535
  9105	#xvpvncproxy_port=6081
       
  9106	#
  9107	# Public URL address of XVP VNC console proxy.
  9108	#
  9109	# The VNC proxy is an OpenStack component that enables compute service
  9110	# users to access their instances through VNC clients. Xen provides
  9111	# the Xenserver VNC Proxy, or XVP, as an alternative to the
  9112	# websocket-based noVNC proxy used by Libvirt. In contrast to noVNC,
  9113	# XVP clients are Java-based.
  9114	#
  9115	# This option sets the public base URL to which client systems will
  9116	# connect. XVP clients can use this address to connect to the XVP
  9117	# instance and, by extension, the VNC sessions.
  9118	#
  9119	# Related options:
  9120	#
  9121	# * xvpvncproxy_host
  9122	# * xvpvncproxy_port
  9123	#  (uri value)
  9124	#xvpvncproxy_base_url=http://127.0.0.1:6081/console
       
  9125	#
  9126	# IP address that the noVNC console proxy should bind to.
  9127	#
  9128	# The VNC proxy is an OpenStack component that enables compute service
  9129	# users to access their instances through VNC clients. noVNC provides
  9130	# VNC support through a websocket-based client.
  9131	#
  9132	# This option sets the private address to which the noVNC console proxy
  9133	# service should bind to.
  9134	#
  9135	# Related options:
  9136	#
  9137	# * novncproxy_port
  9138	# * novncproxy_base_url
  9139	#  (string value)
  9140	#novncproxy_host=0.0.0.0
  9141	novncproxy_host=0.0.0.0
       
  9142	#
  9143	# Port that the noVNC console proxy should bind to.
  9144	#
  9145	# The VNC proxy is an OpenStack component that enables compute service
  9146	# users to access their instances through VNC clients. noVNC provides
  9147	# VNC support through a websocket-based client.
  9148	#
  9149	# This option sets the private port to which the noVNC console proxy
  9150	# service should bind to.
  9151	#
  9152	# Related options:
  9153	#
  9154	# * novncproxy_host
  9155	# * novncproxy_base_url
  9156	#  (port value)
  9157	# Minimum value: 0
  9158	# Maximum value: 65535
  9159	#novncproxy_port=6080
  9160	novncproxy_port=8080
       
  9161	#
  9162	# The authentication schemes to use with the compute node.
  9163	#
  9164	# Control what RFB authentication schemes are permitted for connections between
  9165	# the proxy and the compute host. If multiple schemes are enabled, the first
  9166	# matching scheme will be used, thus the strongest schemes should be listed
  9167	# first.
  9168	#
  9169	# Possible values:
  9170	#
  9171	# * ``none``: allow connection without authentication
  9172	# * ``vencrypt``: use VeNCrypt authentication scheme
  9173	#
  9174	# Related options:
  9175	#
  9176	# * ``[vnc]vencrypt_client_key``, ``[vnc]vencrypt_client_cert``: must also be
  9177	# set
  9178	#  (list value)
  9179	#auth_schemes=none
  9180	auth_schemes=none
       
  9181	# The path to the client certificate PEM file (for x509)
  9182	#
  9183	# The fully qualified path to a PEM file containing the private key which the
  9184	# VNC
  9185	# proxy server presents to the compute node during VNC authentication.
  9186	#
  9187	# Related options:
  9188	#
  9189	# * ``vnc.auth_schemes``: must include ``vencrypt``
  9190	# * ``vnc.vencrypt_client_cert``: must also be set
  9191	#  (string value)
  9192	#vencrypt_client_key=<None>
       
  9193	# The path to the client key file (for x509)
  9194	#
  9195	# The fully qualified path to a PEM file containing the x509 certificate which
  9196	# the VNC proxy server presents to the compute node during VNC authentication.
  9197	#
  9198	# Realted options:
  9199	#
  9200	# * ``vnc.auth_schemes``: must include ``vencrypt``
  9201	# * ``vnc.vencrypt_client_key``: must also be set
  9202	#  (string value)
  9203	#vencrypt_client_cert=<None>
       
  9204	# The path to the CA certificate PEM file
  9205	#
  9206	# The fully qualified path to a PEM file containing one or more x509
  9207	# certificates
  9208	# for the certificate authorities used by the compute node VNC server.
  9209	#
  9210	# Related options:
  9211	#
  9212	# * ``vnc.auth_schemes``: must include ``vencrypt``
  9213	#  (string value)
  9214	#vencrypt_ca_certs=<None>
       
       
  9215	vncserver_proxyclient_address=192.168.6.1
  9216	vncserver_listen=0.0.0.0
  9217	[workarounds]
  9218	#
  9219	# A collection of workarounds used to mitigate bugs or issues found in system
  9220	# tools (e.g. Libvirt or QEMU) or Nova itself under certain conditions. These
  9221	# should only be enabled in exceptional circumstances. All options are linked
  9222	# against bug IDs, where more information on the issue can be found.
       
  9223	#
  9224	# From nova.conf
  9225	#
       
  9226	#
  9227	# Use sudo instead of rootwrap.
  9228	#
  9229	# Allow fallback to sudo for performance reasons.
  9230	#
  9231	# For more information, refer to the bug report:
  9232	#
  9233	#   https://bugs.launchpad.net/nova/+bug/1415106
  9234	#
  9235	# Possible values:
  9236	#
  9237	# * True: Use sudo instead of rootwrap
  9238	# * False: Use rootwrap as usual
  9239	#
  9240	# Interdependencies to other options:
  9241	#
  9242	# * Any options that affect 'rootwrap' will be ignored.
  9243	#  (boolean value)
  9244	#disable_rootwrap=false
       
  9245	#
  9246	# Disable live snapshots when using the libvirt driver.
  9247	#
  9248	# Live snapshots allow the snapshot of the disk to happen without an
  9249	# interruption to the guest, using coordination with a guest agent to
  9250	# quiesce the filesystem.
  9251	#
  9252	# When using libvirt 1.2.2 live snapshots fail intermittently under load
  9253	# (likely related to concurrent libvirt/qemu operations). This config
  9254	# option provides a mechanism to disable live snapshot, in favor of cold
  9255	# snapshot, while this is resolved. Cold snapshot causes an instance
  9256	# outage while the guest is going through the snapshotting process.
  9257	#
  9258	# For more information, refer to the bug report:
  9259	#
  9260	#   https://bugs.launchpad.net/nova/+bug/1334398
  9261	#
  9262	# Possible values:
  9263	#
  9264	# * True: Live snapshot is disabled when using libvirt
  9265	# * False: Live snapshots are always used when snapshotting (as long as
  9266	#   there is a new enough libvirt and the backend storage supports it)
  9267	#  (boolean value)
  9268	#disable_libvirt_livesnapshot=false
       
  9269	#
  9270	# Enable handling of events emitted from compute drivers.
  9271	#
  9272	# Many compute drivers emit lifecycle events, which are events that occur when,
  9273	# for example, an instance is starting or stopping. If the instance is going
  9274	# through task state changes due to an API operation, like resize, the events
  9275	# are ignored.
  9276	#
  9277	# This is an advanced feature which allows the hypervisor to signal to the
  9278	# compute service that an unexpected state change has occurred in an instance
  9279	# and that the instance can be shutdown automatically. Unfortunately, this can
  9280	# race in some conditions, for example in reboot operations or when the compute
  9281	# service or when host is rebooted (planned or due to an outage). If such races
  9282	# are common, then it is advisable to disable this feature.
  9283	#
  9284	# Care should be taken when this feature is disabled and
  9285	# 'sync_power_state_interval' is set to a negative value. In this case, any
  9286	# instances that get out of sync between the hypervisor and the Nova database
  9287	# will have to be synchronized manually.
  9288	#
  9289	# For more information, refer to the bug report:
  9290	#
  9291	#   https://bugs.launchpad.net/bugs/1444630
  9292	#
  9293	# Interdependencies to other options:
  9294	#
  9295	# * If ``sync_power_state_interval`` is negative and this feature is disabled,
  9296	#   then instances that get out of sync between the hypervisor and the Nova
  9297	#   database will have to be synchronized manually.
  9298	#  (boolean value)
  9299	#handle_virt_lifecycle_events=true
       
  9300	#
  9301	# Disable the server group policy check upcall in compute.
  9302	#
  9303	# In order to detect races with server group affinity policy, the compute
  9304	# service attempts to validate that the policy was not violated by the
  9305	# scheduler. It does this by making an upcall to the API database to list
  9306	# the instances in the server group for one that it is booting, which violates
  9307	# our api/cell isolation goals. Eventually this will be solved by proper
  9308	# affinity
  9309	# guarantees in the scheduler and placement service, but until then, this late
  9310	# check is needed to ensure proper affinity policy.
  9311	#
  9312	# Operators that desire api/cell isolation over this check should
  9313	# enable this flag, which will avoid making that upcall from compute.
  9314	#
  9315	# Related options:
  9316	#
  9317	# * [filter_scheduler]/track_instance_changes also relies on upcalls from the
  9318	#   compute service to the scheduler service.
  9319	#  (boolean value)
  9320	#disable_group_policy_check_upcall=false
```

- Compute2 node

```
  8966	[vnc]
  8967	#
  8968	# Virtual Network Computer (VNC) can be used to provide remote desktop
  8969	# console access to instances for tenants and/or administrators.
       
  8970	#
  8971	# From nova.conf
  8972	#
       
  8973	#
  8974	# Enable VNC related features.
  8975	#
  8976	# Guests will get created with graphical devices to support this. Clients
  8977	# (for example Horizon) can then establish a VNC connection to the guest.
  8978	#  (boolean value)
  8979	# Deprecated group;name - DEFAULT;vnc_enabled
  8980	#enabled=true
  8981	enabled=True
       
  8982	#
  8983	# Keymap for VNC.
  8984	#
  8985	# The keyboard mapping (keymap) determines which keyboard layout a VNC
  8986	# session should use by default.
  8987	#
  8988	# Possible values:
  8989	#
  8990	# * A keyboard layout which is supported by the underlying hypervisor on
  8991	#   this node. This is usually an 'IETF language tag' (for example
  8992	#   'en-us').  If you use QEMU as hypervisor, you should find the  list
  8993	#   of supported keyboard layouts at ``/usr/share/qemu/keymaps``.
  8994	#  (string value)
  8995	# Deprecated group;name - DEFAULT;vnc_keymap
  8996	#keymap=en-us
  8997	keymap=en-us
       
  8998	#
  8999	# The IP address or hostname on which an instance should listen to for
  9000	# incoming VNC connection requests on this node.
  9001	#  (unknown value)
  9002	# Deprecated group;name - DEFAULT;vncserver_listen
  9003	# Deprecated group;name - [vnc]/vncserver_listen
  9004	#server_listen=127.0.0.1
       
  9005	#
  9006	# Private, internal IP address or hostname of VNC console proxy.
  9007	#
  9008	# The VNC proxy is an OpenStack component that enables compute service
  9009	# users to access their instances through VNC clients.
  9010	#
  9011	# This option sets the private address to which proxy clients, such as
  9012	# ``nova-xvpvncproxy``, should connect to.
  9013	#  (unknown value)
  9014	# Deprecated group;name - DEFAULT;vncserver_proxyclient_address
  9015	# Deprecated group;name - [vnc]/vncserver_proxyclient_address
  9016	#server_proxyclient_address=127.0.0.1
       
  9017	#
  9018	# Public address of noVNC VNC console proxy.
  9019	#
  9020	# The VNC proxy is an OpenStack component that enables compute service
  9021	# users to access their instances through VNC clients. noVNC provides
  9022	# VNC support through a websocket-based client.
  9023	#
  9024	# This option sets the public base URL to which client systems will
  9025	# connect. noVNC clients can use this address to connect to the noVNC
  9026	# instance and, by extension, the VNC sessions.
  9027	#
  9028	# Related options:
  9029	#
  9030	# * novncproxy_host
  9031	# * novncproxy_port
  9032	#  (uri value)
  9033	#novncproxy_base_url=http://127.0.0.1:6080/vnc_auto.html
  9034	novncproxy_base_url=http://222.204.6.193:8080/vnc_auto.html
       
  9035	#
  9036	# IP address or hostname that the XVP VNC console proxy should bind to.
  9037	#
  9038	# The VNC proxy is an OpenStack component that enables compute service
  9039	# users to access their instances through VNC clients. Xen provides
  9040	# the Xenserver VNC Proxy, or XVP, as an alternative to the
  9041	# websocket-based noVNC proxy used by Libvirt. In contrast to noVNC,
  9042	# XVP clients are Java-based.
  9043	#
  9044	# This option sets the private address to which the XVP VNC console proxy
  9045	# service should bind to.
  9046	#
  9047	# Related options:
  9048	#
  9049	# * xvpvncproxy_port
  9050	# * xvpvncproxy_base_url
  9051	#  (unknown value)
  9052	#xvpvncproxy_host=0.0.0.0
       
  9053	#
  9054	# Port that the XVP VNC console proxy should bind to.
  9055	#
  9056	# The VNC proxy is an OpenStack component that enables compute service
  9057	# users to access their instances through VNC clients. Xen provides
  9058	# the Xenserver VNC Proxy, or XVP, as an alternative to the
  9059	# websocket-based noVNC proxy used by Libvirt. In contrast to noVNC,
  9060	# XVP clients are Java-based.
  9061	#
  9062	# This option sets the private port to which the XVP VNC console proxy
  9063	# service should bind to.
  9064	#
  9065	# Related options:
  9066	#
  9067	# * xvpvncproxy_host
  9068	# * xvpvncproxy_base_url
  9069	#  (port value)
  9070	# Minimum value: 0
  9071	# Maximum value: 65535
  9072	#xvpvncproxy_port=6081
       
  9073	#
  9074	# Public URL address of XVP VNC console proxy.
  9075	#
  9076	# The VNC proxy is an OpenStack component that enables compute service
  9077	# users to access their instances through VNC clients. Xen provides
  9078	# the Xenserver VNC Proxy, or XVP, as an alternative to the
  9079	# websocket-based noVNC proxy used by Libvirt. In contrast to noVNC,
  9080	# XVP clients are Java-based.
  9081	#
  9082	# This option sets the public base URL to which client systems will
  9083	# connect. XVP clients can use this address to connect to the XVP
  9084	# instance and, by extension, the VNC sessions.
  9085	#
  9086	# Related options:
  9087	#
  9088	# * xvpvncproxy_host
  9089	# * xvpvncproxy_port
  9090	#  (uri value)
  9091	#xvpvncproxy_base_url=http://127.0.0.1:6081/console
       
  9092	#
  9093	# IP address that the noVNC console proxy should bind to.
  9094	#
  9095	# The VNC proxy is an OpenStack component that enables compute service
  9096	# users to access their instances through VNC clients. noVNC provides
  9097	# VNC support through a websocket-based client.
  9098	#
  9099	# This option sets the private address to which the noVNC console proxy
  9100	# service should bind to.
  9101	#
  9102	# Related options:
  9103	#
  9104	# * novncproxy_port
  9105	# * novncproxy_base_url
  9106	#  (string value)
  9107	#novncproxy_host=0.0.0.0
       
  9108	#
  9109	# Port that the noVNC console proxy should bind to.
  9110	#
  9111	# The VNC proxy is an OpenStack component that enables compute service
  9112	# users to access their instances through VNC clients. noVNC provides
  9113	# VNC support through a websocket-based client.
  9114	#
  9115	# This option sets the private port to which the noVNC console proxy
  9116	# service should bind to.
  9117	#
  9118	# Related options:
  9119	#
  9120	# * novncproxy_host
  9121	# * novncproxy_base_url
  9122	#  (port value)
  9123	# Minimum value: 0
  9124	# Maximum value: 65535
  9125	novncproxy_port=8080
       
  9126	#
  9127	# The authentication schemes to use with the compute node.
  9128	#
  9129	# Control what RFB authentication schemes are permitted for connections between
  9130	# the proxy and the compute host. If multiple schemes are enabled, the first
  9131	# matching scheme will be used, thus the strongest schemes should be listed
  9132	# first.
  9133	#
  9134	# Possible values:
  9135	#
  9136	# * ``none``: allow connection without authentication
  9137	# * ``vencrypt``: use VeNCrypt authentication scheme
  9138	#
  9139	# Related options:
  9140	#
  9141	# * ``[vnc]vencrypt_client_key``, ``[vnc]vencrypt_client_cert``: must also be
  9142	# set
  9143	#  (list value)
  9144	#auth_schemes=none
       
  9145	# The path to the client certificate PEM file (for x509)
  9146	#
  9147	# The fully qualified path to a PEM file containing the private key which the
  9148	# VNC
  9149	# proxy server presents to the compute node during VNC authentication.
  9150	#
  9151	# Related options:
  9152	#
  9153	# * ``vnc.auth_schemes``: must include ``vencrypt``
  9154	# * ``vnc.vencrypt_client_cert``: must also be set
  9155	#  (string value)
  9156	#vencrypt_client_key=<None>
       
  9157	# The path to the client key file (for x509)
  9158	#
  9159	# The fully qualified path to a PEM file containing the x509 certificate which
  9160	# the VNC proxy server presents to the compute node during VNC authentication.
  9161	#
  9162	# Realted options:
  9163	#
  9164	# * ``vnc.auth_schemes``: must include ``vencrypt``
  9165	# * ``vnc.vencrypt_client_key``: must also be set
  9166	#  (string value)
  9167	#vencrypt_client_cert=<None>
       
  9168	# The path to the CA certificate PEM file
  9169	#
  9170	# The fully qualified path to a PEM file containing one or more x509
  9171	# certificates
  9172	# for the certificate authorities used by the compute node VNC server.
  9173	#
  9174	# Related options:
  9175	#
  9176	# * ``vnc.auth_schemes``: must include ``vencrypt``
  9177	#  (string value)
  9178	#vencrypt_ca_certs=<None>
       
       
  9179	vncserver_proxyclient_address=compute2
  9180	vncserver_listen=0.0.0.0
  9181	[workarounds]
  9182	#
  9183	# A collection of workarounds used to mitigate bugs or issues found in system
  9184	# tools (e.g. Libvirt or QEMU) or Nova itself under certain conditions. These
  9185	# should only be enabled in exceptional circumstances. All options are linked
  9186	# against bug IDs, where more information on the issue can be found.
       
  9187	#
  9188	# From nova.conf
  9189	#
       
  9190	#
  9191	# Use sudo instead of rootwrap.
  9192	#
  9193	# Allow fallback to sudo for performance reasons.
  9194	#
  9195	# For more information, refer to the bug report:
  9196	#
  9197	#   https://bugs.launchpad.net/nova/+bug/1415106
  9198	#
  9199	# Possible values:
  9200	#
  9201	# * True: Use sudo instead of rootwrap
  9202	# * False: Use rootwrap as usual
  9203	#
  9204	# Interdependencies to other options:
  9205	#
  9206	# * Any options that affect 'rootwrap' will be ignored.
  9207	#  (boolean value)
  9208	#disable_rootwrap=false
       
  9209	#
  9210	# Disable live snapshots when using the libvirt driver.
  9211	#
  9212	# Live snapshots allow the snapshot of the disk to happen without an
  9213	# interruption to the guest, using coordination with a guest agent to
  9214	# quiesce the filesystem.
  9215	#
  9216	# When using libvirt 1.2.2 live snapshots fail intermittently under load
  9217	# (likely related to concurrent libvirt/qemu operations). This config
  9218	# option provides a mechanism to disable live snapshot, in favor of cold
  9219	# snapshot, while this is resolved. Cold snapshot causes an instance
  9220	# outage while the guest is going through the snapshotting process.
  9221	#
  9222	# For more information, refer to the bug report:
  9223	#
  9224	#   https://bugs.launchpad.net/nova/+bug/1334398
  9225	#
  9226	# Possible values:
  9227	#
  9228	# * True: Live snapshot is disabled when using libvirt
  9229	# * False: Live snapshots are always used when snapshotting (as long as
  9230	#   there is a new enough libvirt and the backend storage supports it)
  9231	#  (boolean value)
  9232	#disable_libvirt_livesnapshot=false
       
  9233	#
  9234	# Enable handling of events emitted from compute drivers.
  9235	#
  9236	# Many compute drivers emit lifecycle events, which are events that occur when,
  9237	# for example, an instance is starting or stopping. If the instance is going
  9238	# through task state changes due to an API operation, like resize, the events
  9239	# are ignored.
  9240	#
  9241	# This is an advanced feature which allows the hypervisor to signal to the
  9242	# compute service that an unexpected state change has occurred in an instance
  9243	# and that the instance can be shutdown automatically. Unfortunately, this can
  9244	# race in some conditions, for example in reboot operations or when the compute
  9245	# service or when host is rebooted (planned or due to an outage). If such races
  9246	# are common, then it is advisable to disable this feature.
  9247	#
  9248	# Care should be taken when this feature is disabled and
  9249	# 'sync_power_state_interval' is set to a negative value. In this case, any
  9250	# instances that get out of sync between the hypervisor and the Nova database
  9251	# will have to be synchronized manually.
  9252	#
  9253	# For more information, refer to the bug report:
  9254	#
  9255	#   https://bugs.launchpad.net/bugs/1444630
  9256	#
  9257	# Interdependencies to other options:
  9258	#
  9259	# * If ``sync_power_state_interval`` is negative and this feature is disabled,
  9260	#   then instances that get out of sync between the hypervisor and the Nova
  9261	#   database will have to be synchronized manually.
  9262	#  (boolean value)
  9263	#handle_virt_lifecycle_events=true
       
  9264	#
  9265	# Disable the server group policy check upcall in compute.
  9266	#
  9267	# In order to detect races with server group affinity policy, the compute
  9268	# service attempts to validate that the policy was not violated by the
  9269	# scheduler. It does this by making an upcall to the API database to list
  9270	# the instances in the server group for one that it is booting, which violates
  9271	# our api/cell isolation goals. Eventually this will be solved by proper
  9272	# affinity
  9273	# guarantees in the scheduler and placement service, but until then, this late
  9274	# check is needed to ensure proper affinity policy.
  9275	#
  9276	# Operators that desire api/cell isolation over this check should
  9277	# enable this flag, which will avoid making that upcall from compute.
  9278	#
  9279	# Related options:
  9280	#
  9281	# * [filter_scheduler]/track_instance_changes also relies on upcalls from the
  9282	#   compute service to the scheduler service.
  9283	#  (boolean value)
  9284	#disable_group_policy_check_upcall=false
```

- compute3

```
  8966	[vnc]
  8967	#
  8968	# Virtual Network Computer (VNC) can be used to provide remote desktop
  8969	# console access to instances for tenants and/or administrators.
       
  8970	#
  8971	# From nova.conf
  8972	#
       
  8973	#
  8974	# Enable VNC related features.
  8975	#
  8976	# Guests will get created with graphical devices to support this. Clients
  8977	# (for example Horizon) can then establish a VNC connection to the guest.
  8978	#  (boolean value)
  8979	# Deprecated group;name - DEFAULT;vnc_enabled
  8980	#enabled=true
  8981	enabled=True
       
  8982	#
  8983	# Keymap for VNC.
  8984	#
  8985	# The keyboard mapping (keymap) determines which keyboard layout a VNC
  8986	# session should use by default.
  8987	#
  8988	# Possible values:
  8989	#
  8990	# * A keyboard layout which is supported by the underlying hypervisor on
  8991	#   this node. This is usually an 'IETF language tag' (for example
  8992	#   'en-us').  If you use QEMU as hypervisor, you should find the  list
  8993	#   of supported keyboard layouts at ``/usr/share/qemu/keymaps``.
  8994	#  (string value)
  8995	# Deprecated group;name - DEFAULT;vnc_keymap
  8996	#keymap=en-us
  8997	keymap=en-us
       
  8998	#
  8999	# The IP address or hostname on which an instance should listen to for
  9000	# incoming VNC connection requests on this node.
  9001	#  (unknown value)
  9002	# Deprecated group;name - DEFAULT;vncserver_listen
  9003	# Deprecated group;name - [vnc]/vncserver_listen
  9004	#server_listen=127.0.0.1
       
  9005	#
  9006	# Private, internal IP address or hostname of VNC console proxy.
  9007	#
  9008	# The VNC proxy is an OpenStack component that enables compute service
  9009	# users to access their instances through VNC clients.
  9010	#
  9011	# This option sets the private address to which proxy clients, such as
  9012	# ``nova-xvpvncproxy``, should connect to.
  9013	#  (unknown value)
  9014	# Deprecated group;name - DEFAULT;vncserver_proxyclient_address
  9015	# Deprecated group;name - [vnc]/vncserver_proxyclient_address
  9016	#server_proxyclient_address=127.0.0.1
       
  9017	#
  9018	# Public address of noVNC VNC console proxy.
  9019	#
  9020	# The VNC proxy is an OpenStack component that enables compute service
  9021	# users to access their instances through VNC clients. noVNC provides
  9022	# VNC support through a websocket-based client.
  9023	#
  9024	# This option sets the public base URL to which client systems will
  9025	# connect. noVNC clients can use this address to connect to the noVNC
  9026	# instance and, by extension, the VNC sessions.
  9027	#
  9028	# Related options:
  9029	#
  9030	# * novncproxy_host
  9031	# * novncproxy_port
  9032	#  (uri value)
  9033	#novncproxy_base_url=http://127.0.0.1:6080/vnc_auto.html
  9034	novncproxy_base_url=http://222.204.6.193:8080/vnc_auto.html
       
  9035	#
  9036	# IP address or hostname that the XVP VNC console proxy should bind to.
  9037	#
  9038	# The VNC proxy is an OpenStack component that enables compute service
  9039	# users to access their instances through VNC clients. Xen provides
  9040	# the Xenserver VNC Proxy, or XVP, as an alternative to the
  9041	# websocket-based noVNC proxy used by Libvirt. In contrast to noVNC,
  9042	# XVP clients are Java-based.
  9043	#
  9044	# This option sets the private address to which the XVP VNC console proxy
  9045	# service should bind to.
  9046	#
  9047	# Related options:
  9048	#
  9049	# * xvpvncproxy_port
  9050	# * xvpvncproxy_base_url
  9051	#  (unknown value)
  9052	#xvpvncproxy_host=0.0.0.0
       
  9053	#
  9054	# Port that the XVP VNC console proxy should bind to.
  9055	#
  9056	# The VNC proxy is an OpenStack component that enables compute service
  9057	# users to access their instances through VNC clients. Xen provides
  9058	# the Xenserver VNC Proxy, or XVP, as an alternative to the
  9059	# websocket-based noVNC proxy used by Libvirt. In contrast to noVNC,
  9060	# XVP clients are Java-based.
  9061	#
  9062	# This option sets the private port to which the XVP VNC console proxy
  9063	# service should bind to.
  9064	#
  9065	# Related options:
  9066	#
  9067	# * xvpvncproxy_host
  9068	# * xvpvncproxy_base_url
  9069	#  (port value)
  9070	# Minimum value: 0
  9071	# Maximum value: 65535
  9072	#xvpvncproxy_port=6081
       
  9073	#
  9074	# Public URL address of XVP VNC console proxy.
  9075	#
  9076	# The VNC proxy is an OpenStack component that enables compute service
  9077	# users to access their instances through VNC clients. Xen provides
  9078	# the Xenserver VNC Proxy, or XVP, as an alternative to the
  9079	# websocket-based noVNC proxy used by Libvirt. In contrast to noVNC,
  9080	# XVP clients are Java-based.
  9081	#
  9082	# This option sets the public base URL to which client systems will
  9083	# connect. XVP clients can use this address to connect to the XVP
  9084	# instance and, by extension, the VNC sessions.
  9085	#
  9086	# Related options:
  9087	#
  9088	# * xvpvncproxy_host
  9089	# * xvpvncproxy_port
  9090	#  (uri value)
  9091	#xvpvncproxy_base_url=http://127.0.0.1:6081/console
       
  9092	#
  9093	# IP address that the noVNC console proxy should bind to.
  9094	#
  9095	# The VNC proxy is an OpenStack component that enables compute service
  9096	# users to access their instances through VNC clients. noVNC provides
  9097	# VNC support through a websocket-based client.
  9098	#
  9099	# This option sets the private address to which the noVNC console proxy
  9100	# service should bind to.
  9101	#
  9102	# Related options:
  9103	#
  9104	# * novncproxy_port
  9105	# * novncproxy_base_url
  9106	#  (string value)
  9107	#novncproxy_host=0.0.0.0
       
  9108	#
  9109	# Port that the noVNC console proxy should bind to.
  9110	#
  9111	# The VNC proxy is an OpenStack component that enables compute service
  9112	# users to access their instances through VNC clients. noVNC provides
  9113	# VNC support through a websocket-based client.
  9114	#
  9115	# This option sets the private port to which the noVNC console proxy
  9116	# service should bind to.
  9117	#
  9118	# Related options:
  9119	#
  9120	# * novncproxy_host
  9121	# * novncproxy_base_url
  9122	#  (port value)
  9123	# Minimum value: 0
  9124	# Maximum value: 65535
  9125	novncproxy_port=8080
       
  9126	#
  9127	# The authentication schemes to use with the compute node.
  9128	#
  9129	# Control what RFB authentication schemes are permitted for connections between
  9130	# the proxy and the compute host. If multiple schemes are enabled, the first
  9131	# matching scheme will be used, thus the strongest schemes should be listed
  9132	# first.
  9133	#
  9134	# Possible values:
  9135	#
  9136	# * ``none``: allow connection without authentication
  9137	# * ``vencrypt``: use VeNCrypt authentication scheme
  9138	#
  9139	# Related options:
  9140	#
  9141	# * ``[vnc]vencrypt_client_key``, ``[vnc]vencrypt_client_cert``: must also be
  9142	# set
  9143	#  (list value)
  9144	#auth_schemes=none
       
  9145	# The path to the client certificate PEM file (for x509)
  9146	#
  9147	# The fully qualified path to a PEM file containing the private key which the
  9148	# VNC
  9149	# proxy server presents to the compute node during VNC authentication.
  9150	#
  9151	# Related options:
  9152	#
  9153	# * ``vnc.auth_schemes``: must include ``vencrypt``
  9154	# * ``vnc.vencrypt_client_cert``: must also be set
  9155	#  (string value)
  9156	#vencrypt_client_key=<None>
       
  9157	# The path to the client key file (for x509)
  9158	#
  9159	# The fully qualified path to a PEM file containing the x509 certificate which
  9160	# the VNC proxy server presents to the compute node during VNC authentication.
  9161	#
  9162	# Realted options:
  9163	#
  9164	# * ``vnc.auth_schemes``: must include ``vencrypt``
  9165	# * ``vnc.vencrypt_client_key``: must also be set
  9166	#  (string value)
  9167	#vencrypt_client_cert=<None>
       
  9168	# The path to the CA certificate PEM file
  9169	#
  9170	# The fully qualified path to a PEM file containing one or more x509
  9171	# certificates
  9172	# for the certificate authorities used by the compute node VNC server.
  9173	#
  9174	# Related options:
  9175	#
  9176	# * ``vnc.auth_schemes``: must include ``vencrypt``
  9177	#  (string value)
  9178	#vencrypt_ca_certs=<None>
       
       
  9179	vncserver_proxyclient_address=compute3
  9180	vncserver_listen=0.0.0.0
  9181	[workarounds]
  9182	#
  9183	# A collection of workarounds used to mitigate bugs or issues found in system
  9184	# tools (e.g. Libvirt or QEMU) or Nova itself under certain conditions. These
  9185	# should only be enabled in exceptional circumstances. All options are linked
  9186	# against bug IDs, where more information on the issue can be found.
       
  9187	#
  9188	# From nova.conf
  9189	#
       
  9190	#
  9191	# Use sudo instead of rootwrap.
  9192	#
  9193	# Allow fallback to sudo for performance reasons.
  9194	#
  9195	# For more information, refer to the bug report:
  9196	#
  9197	#   https://bugs.launchpad.net/nova/+bug/1415106
  9198	#
  9199	# Possible values:
  9200	#
  9201	# * True: Use sudo instead of rootwrap
  9202	# * False: Use rootwrap as usual
  9203	#
  9204	# Interdependencies to other options:
  9205	#
  9206	# * Any options that affect 'rootwrap' will be ignored.
  9207	#  (boolean value)
  9208	#disable_rootwrap=false
       
  9209	#
  9210	# Disable live snapshots when using the libvirt driver.
  9211	#
  9212	# Live snapshots allow the snapshot of the disk to happen without an
  9213	# interruption to the guest, using coordination with a guest agent to
  9214	# quiesce the filesystem.
  9215	#
  9216	# When using libvirt 1.2.2 live snapshots fail intermittently under load
  9217	# (likely related to concurrent libvirt/qemu operations). This config
  9218	# option provides a mechanism to disable live snapshot, in favor of cold
  9219	# snapshot, while this is resolved. Cold snapshot causes an instance
  9220	# outage while the guest is going through the snapshotting process.
  9221	#
  9222	# For more information, refer to the bug report:
  9223	#
  9224	#   https://bugs.launchpad.net/nova/+bug/1334398
  9225	#
  9226	# Possible values:
  9227	#
  9228	# * True: Live snapshot is disabled when using libvirt
  9229	# * False: Live snapshots are always used when snapshotting (as long as
  9230	#   there is a new enough libvirt and the backend storage supports it)
  9231	#  (boolean value)
  9232	#disable_libvirt_livesnapshot=false
       
  9233	#
  9234	# Enable handling of events emitted from compute drivers.
  9235	#
  9236	# Many compute drivers emit lifecycle events, which are events that occur when,
  9237	# for example, an instance is starting or stopping. If the instance is going
  9238	# through task state changes due to an API operation, like resize, the events
  9239	# are ignored.
  9240	#
  9241	# This is an advanced feature which allows the hypervisor to signal to the
  9242	# compute service that an unexpected state change has occurred in an instance
  9243	# and that the instance can be shutdown automatically. Unfortunately, this can
  9244	# race in some conditions, for example in reboot operations or when the compute
  9245	# service or when host is rebooted (planned or due to an outage). If such races
  9246	# are common, then it is advisable to disable this feature.
  9247	#
  9248	# Care should be taken when this feature is disabled and
  9249	# 'sync_power_state_interval' is set to a negative value. In this case, any
  9250	# instances that get out of sync between the hypervisor and the Nova database
  9251	# will have to be synchronized manually.
  9252	#
  9253	# For more information, refer to the bug report:
  9254	#
  9255	#   https://bugs.launchpad.net/bugs/1444630
  9256	#
  9257	# Interdependencies to other options:
  9258	#
  9259	# * If ``sync_power_state_interval`` is negative and this feature is disabled,
  9260	#   then instances that get out of sync between the hypervisor and the Nova
  9261	#   database will have to be synchronized manually.
  9262	#  (boolean value)
  9263	#handle_virt_lifecycle_events=true
       
  9264	#
  9265	# Disable the server group policy check upcall in compute.
  9266	#
  9267	# In order to detect races with server group affinity policy, the compute
  9268	# service attempts to validate that the policy was not violated by the
  9269	# scheduler. It does this by making an upcall to the API database to list
  9270	# the instances in the server group for one that it is booting, which violates
  9271	# our api/cell isolation goals. Eventually this will be solved by proper
  9272	# affinity
  9273	# guarantees in the scheduler and placement service, but until then, this late
  9274	# check is needed to ensure proper affinity policy.
  9275	#
  9276	# Operators that desire api/cell isolation over this check should
  9277	# enable this flag, which will avoid making that upcall from compute.
  9278	#
  9279	# Related options:
  9280	#
  9281	# * [filter_scheduler]/track_instance_changes also relies on upcalls from the
  9282	#   compute service to the scheduler service.
  9283	#  (boolean value)
  9284	#disable_group_policy_check_upcall=false
```

