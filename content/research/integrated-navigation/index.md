---
title: "Integrated Navigation Systems"
titleKorean: "복합항법 시스템"
date: 2024-01-02
weight: 2
icon: "integration"
funding: "ADD"
topics:
  - "GNSS/INS Coupling"
  - "Cycle Slip Detection"
  - "Sensor Fusion"
  - "Pedestrian Dead Reckoning"
  - "Indoor Positioning"
  - "Barometer Aiding"
  - "Vehicle Dynamics"
summary: "GNSS와 관성·기압·자기·영상 센서를 융합하여 신호 단절·다중경로·고기동 환경에서도 끊김 없는 항법해를 제공하는 복합항법 시스템을 연구합니다."
---

## 1. 서론

GNSS 단독 항법은 가시 위성이 4기 미만이거나 신호 품질이 급격히 저하되는 환경 — 도심 협곡, 터널, 실내, 산악 — 에서 즉시 무용지물이 된다. 또한 항공기·미사일·고기동 무인기처럼 짧은 시간에 큰 가속도가 발생하는 플랫폼에서는 GNSS 수신기의 추적 루프(Tracking Loop) 자체가 신호를 놓치는 일이 잦다. 단일 센서 항법의 이러한 본질적 한계 때문에, 안전·임무 중요(Safety/Mission-Critical) 응용에서는 GNSS와 관성항법장치(Inertial Navigation System, INS)·기압계·자기계·영상 센서 등을 결합하는 *복합항법(Integrated Navigation)* 이 사실상 표준이 되었다.

복합항법은 상보적 구조를 갖는다. 신호가 살아있을 때는 GNSS의 절대 위치로 INS의 누적오차를 보정하고, GNSS 신호가 단절되었을 때는 INS와 기타 센서의 상대 위치로 항법해를 유지한다. 본 연구 분야는 결합 수준(Coupling Level) 설계, 적응형 추정 기법, IMU 오차 모델링, 그리고 도심·실내 환경의 다중 센서 융합까지 전 영역을 다룬다.

---

## 2. GNSS/INS 결합 수준

<!-- ![figure](01-coupling-levels.svg) -->
*그림 1. GNSS/INS 결합 수준 비교 — Loose / Tight / Deep(Ultra-tight) 아키텍처*

GNSS/INS 결합은 데이터 결합 지점에 따라 세 단계로 구분되며, 각 단계는 구현 복잡도와 성능이 정비례로 증가하는 트레이드오프 구조를 가진다.

가장 보편적인 **Loose Coupling**은 GNSS 수신기가 산출한 PVT(Position·Velocity·Time)를 INS와 EKF(Extended Kalman Filter) 기반으로 결합한다. 구현이 단순하고 GNSS 수신기를 블랙박스로 다룰 수 있어 상용 항법 모듈에 가장 광범위하게 적용되지만, 가시 위성 4기 미만 환경에서는 GNSS 측정 자체가 동작하지 않아 결합 효과가 사라진다는 한계가 있다.

다음 단계인 **Tight Coupling**은 GNSS 의사거리(Pseudorange)와 도플러 측정치 영역에서 INS와 직접 결합한다. 가시 위성이 1–3기만 남은 환경에서도 부분적인 GNSS 정보를 활용할 수 있어, 도심 협곡·터널 입구 등에서 위치해 연속성을 크게 개선한다. 본 연구실은 차량용 NHC(Non-Holonomic Constraint)를 결합한 Tight Coupling 알고리즘을 통해 RTK 측위 정확도를 안정화하는 방향을 연구한다. NHC는 정상 주행 차량이 측면(side-slip) 속도와 수직 속도가 0에 가깝다는 차량 동역학 구속을 EKF에 추가 제약으로 넣는 기법으로, 가용한 정보가 부족할 때 효과가 크다.

가장 고도화된 형태인 **Deep / Ultra-tight Coupling**은 관성 정보를 GNSS 추적 루프(Tracking Loop)에 직접 환류해 약신호·고기동 환경에서 추적 안정성을 확보한다. 항공기·발사체 등 임무 환경이 가혹한 응용에서 필수적인 구조다. 추가로, IMU의 인가 비정렬(Mounting Misalignment)과 레버암(Lever-Arm) 오차는 추정 알고리즘 안에 함께 모델링되어 자동 보정된다 — 이는 차량·드론처럼 IMU 장착 위치를 매번 동일하게 맞출 수 없는 환경에서 실용적 가치가 크다.

---

## 3. 관성 보조 사이클 슬립 검출

<!-- ![figure](02-cycle-slip-detection.svg) -->
*그림 2. 차량 환경에서 발생하는 사이클 슬립과 IMU 보조 검출 절차*

도심 차량 환경에서 가장 큰 RTK 측위 위협 중 하나는 빌딩 사이를 지날 때 일어나는 짧고 빈번한 신호 차폐 — 즉 *사이클 슬립(Cycle Slip)*이다. 본 연구실은 위성 기하 정보와 저가 IMU 측정치를 결합해 사이클 슬립을 검출·복구하는 알고리즘을 ION GNSS+ 2014 [1] 와 ION Pacific PNT 2013 [2]에서 발표하였다.

핵심 아이디어는 INS의 단기 예측 능력을 활용해 GNSS 측정치의 이상 여부를 판단하는 것이다. 먼저 INS 기구화(Mechanization)로 직전 시점의 위치·속도를 전파(Propagate)한다. 전파된 결과로부터 각 위성에 대한 의사거리·도플러 예상치를 계산하고, 실제 측정치와의 잔차(Residual)를 산출한다. 이 잔차가 위성 기하에 따라 결정된 임계값을 초과하면 해당 위성을 이상값으로 분류하고, 정상 위성만으로 최종 위치·반송파 모호정수를 재결정한다. 위성 기하를 임계값 산출에 반영하는 것이 이 알고리즘의 핵심 — 위성 고도각이 낮을수록 사이클 슬립의 위치해 영향이 크기 때문에 임계값도 위성별로 차등 설정된다.

이 접근의 실용적 의의는 단일주파수 저가형 GPS 수신기에서도 신뢰성 있는 RTK 가능성을 확보한다는 점이다. 다중주파수·다중 위성군 수신기에서만 가능했던 cm급 측위가 보급형 차량용 GNSS 모듈로 확장될 수 있는 길을 연 셈이다. 여기에 차량 동역학 NHC 구속을 추가로 결합하면 측위 강건성이 더 향상되어, 도심에서도 안정적인 RTK 운용이 가능해진다.

---

## 4. 스마트폰·웨어러블 다중 센서 융합

스마트폰·웨어러블 환경에서는 IMU(가속도계·자이로) 외에도 기압계, 자기계, BLE, Wi-Fi RTT 등 다양한 보조 측정치가 함께 활용된다. 본 연구실은 GNSS/IMU 강결합 기반 NLOS 위성 제거 알고리즘을 안드로이드 스마트폰 환경에서 실증하였으며 [3], 이는 INS가 예측한 위성별 의사거리를 실제 측정치와 비교해 빌딩에 가려진 NLOS 위성을 직접 검출하는 접근이다. 도심 차량 실험에서 실제 빌딩 배치와 일관된 NLOS 판별 결과를 얻었으며, 이는 본 연구실 알고리즘의 타당성을 정량적으로 입증한 사례다.

또 다른 핵심 연구 주제는 스마트폰 IMU의 in-flight 자체 보정(Self-Calibration)이다. ION GNSS+ 2019에서 발표된 이 기법 [4]은 GNSS 원시측정치로 IMU 바이어스를 추정해 별도의 캘리브레이션 절차 없이도 IMU를 활용 가능하게 만든다. 도심 보행자 측위에서는 LSTM 기반 보행 모드 분류와 시간차분 반송파 측정치(TDCP)를 결합한 측위 강건화 기법을 연구하며, 보폭 추정(Step Length Estimation)에서는 다양한 보행 형태에 대해 강건하게 동작하는 PDR(Pedestrian Dead Reckoning) 알고리즘을 개발한다.

기압계 결합은 특히 실내·재난 응용에서 핵심적이다. 본 연구실은 RTK 수신기를 탑재한 드론이 정지된 실내 사용자(구조요청자)의 3차원 위치를 결정하는 시스템을 ION GNSS+ 2021 및 *JPNT 2022*에서 발표하였다. 동적 드론의 RTK 위치 정보와 사용자 스마트폰의 기압계 측정치를 결합하면 수신기 절대 고도를 cm급으로 보정할 수 있다는 원리에 기반한다 — 두 기압계가 측정한 압력의 차이는 두 지점 간의 상대 고도와 직접 연결되며, 드론 측에서 RTK로 절대 고도를 알면 사용자의 절대 고도가 자동으로 결정된다.

---

## 5. 적응형 추정 기법

복합항법 추정기는 환경에 따라 매우 다른 노이즈 특성을 다뤄야 한다. 신틸레이션·다중경로가 심한 도심에서는 GNSS 측정치 노이즈가 시간적으로 크게 변하고, IMU 측정치는 진동·온도에 따라 분산이 변한다. 이러한 비정상(non-stationary) 환경을 다루기 위해 본 연구실은 여러 추정 기법을 응용한다. 표준 비선형 결합 기준이 되는 확장칼만필터(EKF)에서 출발해, 자세·각도 등 강비선형 상태를 다루는 무향칼만필터(UKF), 비가우시안·다봉(multi-modal) 분포 처리에 강한 입자 필터(Particle Filter), 다중 센서·다중 시점을 통합 최적화하는 Factor Graph Optimization(FGO), 측정 노이즈 공분산을 잔차 기반으로 갱신하는 Adaptive Kalman, 그리고 위성별 가설 비교로 무결성 한계(Position Error Bound)를 산출하는 Solution Separation까지 활용 범위가 넓다.

이 중 FGO는 최근 자율주행·UAM 분야에서 표준 도구로 자리잡고 있다. 시간 윈도우 내 모든 측정치를 일관되게 다루기 때문에 GNSS 단절 후 재획득(Re-fix) 시점의 위치해를 부드럽게 잇는 장점이 있으며, 비선형 최적화 기반이라 비가우시안 노이즈에도 비교적 잘 대응한다. 본 연구실은 FGO를 활용한 GNSS/IMU 결합과 LiDAR 점군 정합을 통합하는 연구를 IPNT 정기학술대회에서 발표하고 있다.

---

## 6. GNSS 단절·실내 환경 항법

<!-- ![figure](03-gnss-denied.svg) -->
*그림 3. GNSS 단절 환경에서의 복합 측위 자원 — INS, UWB, Wi-Fi/BLE, V-SLAM, 지도 매칭*

GNSS 신호가 완전히 단절된 영역 — 지하 주차장, 터널, 실내 — 에서는 관성 추측항법(Dead Reckoning)이 짧은 시간 절대 정확도를 유지하지만, 시간이 지날수록 누적오차가 발산한다. 따라서 보조 측위 자원이 함께 결합되어야 한다. 실내에서 cm급 거리 측정이 가능한 UWB(Ultra-Wideband), 셀룰러·Wi-Fi 인프라를 활용한 Wi-Fi RTT/RSSI Fingerprinting, 저전력 광역 측위에 유리한 BLE Beacon, 카메라·LiDAR 기반 영상 항법(Visual-Inertial Odometry / V-SLAM), 그리고 HD맵·도로 그래프와 정합하는 지도 매칭(Map Matching)이 대표적 자원이다.

본 연구실은 실내 응급 구조 응용에 특히 관심을 두어, LSTM 기반 보행 동작 분류와 PDR을 결합한 시스템을 연구하고 있다. 사용자가 걷는지, 뛰는지, 계단을 오르는지에 따라 보폭 모델과 자세 추정 파라미터가 달라지기 때문에, 동작 분류가 PDR 정확도에 직접 영향을 미친다. 또한 GNSS와 기압계 측정치의 강결합을 통해 반(半)실내 환경에서의 3차원 매핑 가능성을 *IEEE Geoscience and Remote Sensing Letters* (2024)에서 정량 분석한 바 있다 [5].

---

## 7. 실험 환경

복합항법 알고리즘의 검증에는 실제 운용 플랫폼이 필수적이다. 시뮬레이션만으로는 IMU 노이즈·진동 특성, GNSS 신호 차폐의 시간적 변동, 사용자 동작의 비정형성을 충분히 재현하기 어렵기 때문이다. 본 연구실의 차량 플랫폼은 항법용 GNSS 수신기, 전술/MEMS급 IMU, OBD 차륜 속도, 자기계와 기압계를 동시에 수집한다. 무인기 플랫폼은 멀티콥터에 저가형 GNSS/IMU·기압계·카메라를 결합한 형태로 운용되며, 안드로이드 스마트폰 다수 모델(Pixel·Galaxy 등)에서는 원시 GNSS 측정치와 9축 IMU·기압계를 동시에 기록한다. 실내 실험실에는 UWB 앵커와 Wi-Fi/BLE 비콘이 다중 채널 환경으로 배치되어 있어 알고리즘 검증의 통제된 기준 환경을 제공한다.

---

## 8. 결론

복합항법 시스템은 단일 센서의 한계를 보완하는 도구 이상의 의미를 가진다. 자율주행·UAM·항공기·재난 응급 시스템 등 안전 중요 응용은 모두 다층 센서 융합을 전제로 설계되며, 결합 방식의 선택이 최종 시스템 성능을 좌우한다. 본 연구 분야는 결합 수준의 이론적 토대 — Loose/Tight/Deep — 부터, IMU 보조 사이클 슬립 검출, 스마트폰 다중 센서 통합, FGO 기반 시간 윈도우 최적화까지를 통합적으로 연구하며, 결과적으로 어떤 환경에서도 끊김 없이 신뢰할 수 있는 항법해를 제공하는 것을 목표로 한다.

---

## 참고문헌

[1] J. Lim, B. Park *et al.*, "Inertial Aided Cycle Slip Detection by Considering Satellite Geometry for Land Vehicle," *ION GNSS+ 2014*.

[2] J. Lim, B. Park *et al.*, "GPS Cycle-slip Detection with Low-cost IMU and Single-frequency Receiver of Land Vehicle," *ION 2013 Pacific PNT Meeting*, [articleID=11064](https://www.ion.org/publications/abstract.cfm?articleID=11064).

[3] J. Yun, B. Park, "Enhanced Smartphone Positioning in Urban Environments: GNSS Fault Detection and Mitigation through Integrated Navigation System," *ION GNSS+ 2024*, [articleID=19772](https://www.ion.org/publications/abstract.cfm?articleID=19772).

[4] Y. Lee, B. Park, "The Performance of GNSS-IMU Integration of Smartphone based on In-flight Calibration of IMU using Android GNSS Raw Measurements," *ION GNSS+ 2019*.

[5] J. Yun, B. Park, "A GNSS/Barometric Altimeter Tightly Coupled Integration for Three-Dimensional Semi-Indoor Mapping With Android Smartphones," *IEEE Geoscience and Remote Sensing Letters*, vol. 21, 2024.
