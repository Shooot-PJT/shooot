package com.shooot.dockermanager.service;

import java.util.Map;

public class VagrantInstanceConstants {

    public static final Map<String, String> keys = Map.of(
        "instance1",
        "/home/hyunjinkim/deployment/scripts/.vagrant/machines/instance1/virtualbox/private_key",
        "instance2",
        "/home/hyunjinkim/deployment/scripts/.vagrant/machines/instance2/virtualbox/private_key",
        "instance3",
        "/home/hyunjinkim/deployment/scripts/.vagrant/machines/instance3/virtualbox/private_key",
        "instance4",
        "/home/hyunjinkim/deployment/scripts/.vagrant/machines/instance4/virtualbox/private_key",
        "instance5",
        "/home/hyunjinkim/deployment/scripts/.vagrant/machines/instance5/virtualbox/private_key"
    );

    public static final Map<String, Integer> ports = Map.of(
        "instance1", 2222,
        "instance2", 2200,
        "instance3", 2201,
        "instance4", 2202,
        "instance5", 2203
    );
}
