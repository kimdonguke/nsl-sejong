---
title: "Autonomous Navigation"
titleKorean: "자율 주행 항법"
date: 2024-01-03
icon: "autonomous"
//funding: "IITP"
topics:
  - "Autonomous Vehicles"
  - "UAV Navigation"
  - "LiDAR"
  - "Visual Odometry"
  - "HD Maps"
  - "SLAM"
  - "Lane-Level Positioning"
summary: "Precise navigation solutions for autonomous vehicles and UAVs combining GNSS with LiDAR, cameras, and HD maps for lane-level localization."
---

## Overview

Autonomous navigation research at NSL targets the demanding requirements of self-driving vehicles and unmanned aerial vehicles (UAVs). These applications require sub-decimeter positioning accuracy, continuous availability, and extremely high integrity — far beyond what conventional GNSS can provide alone. We develop multi-sensor fusion systems that meet these stringent requirements.

## Research Topics

### Autonomous Vehicle Localization

Self-driving cars require lane-level positioning accuracy (< 0.1 m) in all weather and lighting conditions. Our research integrates:

- **GNSS/INS** as the primary navigation backbone
- **LiDAR** point cloud matching against HD maps
- **Camera-based** lane detection and landmark recognition  
- **HD Map** fusion for absolute position correction
- **Vehicle odometry** for additional constraints

### UAV Navigation

Unmanned aerial vehicles face unique navigation challenges including high dynamics, weight constraints, and operation in both urban and GPS-degraded environments. We research:

- Lightweight GNSS/IMU systems for small UAVs
- Vision-aided navigation using optical flow and visual odometry
- Safe landing zone detection using onboard sensors
- Geofencing and corridor navigation using precise positioning

### Simultaneous Localization and Mapping (SLAM)

When HD maps are unavailable, SLAM algorithms can simultaneously build a map while localizing within it. We develop:

- LiDAR-SLAM for outdoor environments
- Visual-inertial SLAM for indoor/GPS-denied scenarios
- GNSS-aided SLAM for globally consistent maps
- Tightly-coupled optimization using factor graphs

### Deep Learning for Navigation

Machine learning is transforming navigation systems. Our research applies:

- Neural networks for GNSS signal quality assessment
- Deep learning-based pedestrian dead reckoning
- End-to-end learning for visual odometry
- GNSS positioning error prediction using neural networks

## Test Platforms

- Ground vehicle equipped with GNSS, IMU, LiDAR, and cameras
- Fixed-wing and multirotor UAVs for aerial navigation testing
- ROS-based software stack for rapid algorithm development

## Applications

Our research directly enables technologies for:
- Level 4/5 autonomous driving
- Last-mile delivery drones
- Urban air mobility (UAM) vehicles
- Precision agriculture UAVs
