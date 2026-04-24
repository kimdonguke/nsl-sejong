---
title: "GNSS Signal Processing"
titleKorean: "위성항법 신호 처리"
date: 2024-01-01
icon: "gnss"
funding: "NRF"
topics:
  - "Signal Acquisition"
  - "Code Tracking"
  - "Carrier Phase"
  - "Anti-Jamming"
  - "Anti-Spoofing"
  - "Multipath Mitigation"
  - "Multi-Constellation"
summary: "Advanced signal processing algorithms for GNSS receivers including acquisition, tracking, and robust positioning under challenging signal conditions."
---

## Overview

GNSS signal processing forms the fundamental layer of our research, focusing on the design and analysis of algorithms that extract accurate navigation information from satellite signals. Our work spans the entire signal processing chain from signal acquisition through to final position, velocity, and time (PVT) solutions.

## Research Topics

### Signal Acquisition and Tracking

We develop novel acquisition algorithms capable of rapid satellite signal detection in challenging environments. Our tracking research focuses on designing robust discriminators and loop filters that maintain signal lock under high dynamics, ionospheric scintillation, and urban multipath conditions.

### Multi-Constellation GNSS

Our lab works with all four major GNSS constellations: GPS (USA), GLONASS (Russia), Galileo (Europe), and BeiDou (China). We investigate optimal combination methods to improve accuracy, reliability, and availability beyond what any single constellation can provide.

### Anti-Jamming and Anti-Spoofing

With the growing vulnerability of GNSS to intentional interference, we research:
- Spatial and temporal processing for jamming mitigation
- Spoofing detection and authentication methods
- Receiver autonomous integrity monitoring (RAIM)
- Signal authentication using cryptographic methods

### Multipath Mitigation

Urban environments pose significant multipath challenges. We develop:
- Advanced correlator architectures
- Machine learning-based multipath detection
- 3D mapping-aided positioning
- Shadow matching techniques

## Software Defined Radio (SDR) GNSS

Our lab maintains a software defined radio GNSS testbed that allows rapid prototyping of new signal processing algorithms using real satellite signals or hardware-in-the-loop simulation.

## Key Publications

- Research on robust GNSS tracking under ionospheric scintillation conditions
- Novel anti-spoofing detection using signal quality monitoring
- Multi-constellation processing algorithms for improved urban positioning
