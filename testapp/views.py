# coding: utf-8
from django.shortcuts import render
from django.http import HttpResponse
from keystoneauth1.identity import v3
from keystoneauth1 import session
from keystoneclient.v3 import client


def get_keystone(request):
    auth = v3.Password(auth_url="http://192.168.1.106:5000/v3", username="admin",
                       password="openstack@good308", project_name="admin",
                       user_domain_id="default", project_domain_id="default")

    sess = session.Session(auth=auth)
    keystone = client.Client(session=sess)
    prj_list = keystone.projects.list()
    prj = prj_list[0]
    return HttpResponse("prj_id:"+prj.id)


def sys_index(request):

    return HttpResponse("Good云主页");
