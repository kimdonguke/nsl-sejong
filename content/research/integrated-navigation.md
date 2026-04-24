---
title: "Integrated Navigation"
titleKorean: "복합 항법 시스템"
date: 2024-01-02
icon: "integration"
funding: "ADD"
topics:
  - "GNSS/INS Fusion"
  - "Kalman Filter"
  - "Sensor Fusion"
  - "Dead Reckoning"
  - "Barometer"
  - "Magnetometer"
  - "GNSS-Denied"
summary: "Robust sensor fusion combining GNSS with inertial and other sensors for continuous navigation in GNSS-degraded and denied environments."
---

## Overview

Integrated navigation research addresses a fundamental challenge: GNSS alone is insufficient for many critical applications because satellite signals can be blocked, jammed, or degraded. Our work develops sensor fusion methodologies that combine GNSS with inertial navigation systems (INS), barometers, magnetometers, and other sensors to provide continuous, reliable navigation.

## Research Topics

### GNSS/INS Integration

The integration of GNSS and Inertial Navigation Systems (INS) is the cornerstone of robust navigation. We research all three integration levels:

**Loosely Coupled Integration**  
Position and velocity from GNSS are combined with INS outputs using an Extended Kalman Filter (EKF). This architecture provides robustness and is widely deployed in practical systems.

**Tightly Coupled Integration**  
GNSS raw pseudorange and Doppler measurements are fused directly with IMU data, enabling navigation with fewer than four visible satellites — critical for urban canyon environments.

**Deeply Coupled Integration**  
The most challenging architecture where GNSS signal tracking loops are aided by inertial data, providing optimal performance in high-dynamics and low-signal-to-noise environments.

### Advanced Kalman Filtering

Our research develops advanced estimation algorithms including:
- Extended Kalman Filter (EKF) for nonlinear systems
- Unscented Kalman Filter (UKF) for highly nonlinear dynamics
- Particle filters for non-Gaussian noise
- Factor graph-based optimization approaches

### IMU Error Modeling and Calibration

Precise knowledge of IMU errors is essential for good integration performance. We research:
- In-field IMU calibration methods
- Temperature-dependent error compensation
- Vibration-induced error modeling
- Long-term drift estimation

### Navigation in GNSS-Denied Environments

When GNSS signals are unavailable (tunnels, underground parking, dense urban canyons), we rely on:
- Inertial dead reckoning with error bounding
- Wi-Fi and cellular positioning
- LiDAR-based localization
- Map matching algorithms

## Experimental Platforms

Our lab operates vehicle and UAV platforms equipped with high-grade IMUs, multi-frequency GNSS receivers, and various auxiliary sensors for real-world testing of integrated navigation algorithms.
