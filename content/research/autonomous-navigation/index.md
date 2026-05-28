---
title: "Autonomous Platform Navigation"
titleKorean: "자율 이동체 항법"
date: 2024-01-03
weight: 3
icon: "autonomous"
funding: "IITP"
topics:
  - "Moving Baseline RTK"
  - "Drone Swarm"
  - "HALE UAV"
  - "UAM / K-UAM"
  - "Autonomous Vehicles"
  - "GNSS Anti-Spoofing"
  - "Indoor Rescue Drone"
summary: "드론·무인기·자율주행차·도심항공모빌리티(UAM) 등 자율 이동체가 요구하는 cm급 상대항법, 강건 절대측위, 위협 환경 대응 알고리즘을 연구합니다."
---

## 1. 서론

자율 이동체는 운영 중 사용자의 직접 개입을 전제하지 않는다. 따라서 정확도(Accuracy), 연속성(Continuity), 무결성(Integrity)이 모두 보장되어야 하며, 항법 시스템이 잘못된 위치를 산출해도 그 사실을 *플랫폼 자체가* 검출하고 안전 절차를 발동해야 한다. 도심 협곡의 다중경로, 의도적 GNSS 재밍·기만, 통신 단절, 군집 비행 시의 충돌 위협 등 다양한 위협을 동시에 다뤄야 한다는 점에서 자율 이동체 항법은 일반 항법보다 훨씬 까다로운 요구를 받는다.

본 연구 분야는 드론·무인기·자율주행차·UAM 등 다양한 자율 플랫폼을 대상으로, GNSS를 중심에 두고 관성·영상·라이다·V2X·기압계를 융합하는 항법 솔루션을 개발한다. 특히 두 이동체 사이의 cm급 상대 위치를 산출하는 *Moving Baseline RTK*와, GNSS 위협 환경에서 항법해의 신뢰성을 보장하는 *고장 검출·완화(FDE/IM)* 기법이 핵심 축을 이룬다.

---

## 2. Moving Baseline RTK 기반 상대항법

<!-- ![figure](01-moving-baseline-rtk.svg) -->
*그림 1. Moving Baseline RTK — 기준국이 함께 이동하는 환경에서의 cm급 상대 위치 산출*

전통적인 RTK는 고정된 기준국과 이동하는 사용자(Rover) 간의 이중차분을 통해 cm급 상대 위치를 산출한다. 그러나 자율 이동체 응용에서는 *기준국 자체가 이동*하는 경우가 많다. 무인기가 함정에 착륙할 때, 드론이 지상 차량을 따라갈 때, 또는 군집 비행에서 드론들 간 상대 위치를 알아야 할 때가 모두 그렇다. **Moving Baseline RTK(MB-RTK)**는 두 수신기가 모두 이동하는 환경에서도 두 안테나 간의 기저선 벡터를 cm급으로 산출하는 기법이다.

MB-RTK의 핵심 원리는 단순하다. 두 이동체가 짧은 기저선(수십 m 이내)으로 가까이 있으면 위성 시계·궤도·대기 오차가 양쪽 수신기에서 거의 동일하게 발생하므로, 이중차분 과정에서 자동으로 소거된다. 따라서 두 이동체의 절대 위치는 단독측위 수준(수 m)이라도, 두 이동체 사이의 *상대* 위치는 cm급으로 결정될 수 있다. 이 원리는 충돌 회피, 자동 도킹, 편대 비행과 같은 다중 이동체 협력 임무의 기반 기술이 된다.

본 연구실은 다양한 MB-RTK 응용 시나리오를 다뤄 왔다. 가장 최근 연구인 *지상 이동체–드론(UGV–UAV) 결합 시스템*은 ION ITM 2024 [[articleID=19577](https://www.ion.org/publications/abstract.cfm?articleID=19577)]에서 발표되었으며, 자율 지상 차량과 결합한 드론의 실시간 cm급 상대 위치를 검증하였다. *드론 군집비행(Drone Swarm)* 환경에서 군집 내 위성 조합 차이에 따른 성능 변화를 분석한 결과는 한국항공우주공학회 2021에서 발표되었으며, 함상 이착륙·이동 표적 추적 시나리오에서도 정밀 상대항법 적용 가능성이 검토되었다. 운용 효율을 위해 MB-RTK 전용 확장 RTCM 메시지 포맷도 정의해 실시간 송수신에 적용하였다.

---

## 3. 무인기 (UAV) 항법

<!-- ![figure](02-uav-applications.svg) -->
*그림 2. 무인기 응용별 항법 요구사항 — HALE UAV, 멀티콥터, 재난 구조 드론*

무인기는 임무 환경과 비행 특성에 따라 항법 요구사항이 크게 다르다. 본 연구실은 소형 멀티콥터부터 성층권 체공 무인기까지 다양한 임무를 연구한다.

**HALE UAV (High Altitude Long Endurance)**는 성층권에서 장기 체공하는 무인기로, 광역 통신·관측·항법 임무에 활용될 수 있다. 본 연구실은 HALE UAV에 의사위성(Pseudolite) 송신기를 탑재해 지역적 GNSS 보강 시스템으로 활용하는 방안을 ION ITM 2015에서 발표하였다 [1]. 위성 신호 차폐 지역이나 의도적 GNSS 단절 환경에서 HALE UAV는 지역 차원의 대체 PNT 인프라 역할을 할 수 있다 — 위성보다 훨씬 가까이 있고 위치가 잘 알려져 있어 신호 강도와 측위 기하 모두 유리하다.

저가형 소형 드론에서는 cm·dm급 정확도뿐 아니라 항법해의 신뢰성을 사용자에게 정량적으로 알려주는 *보호 수준(Protection Level)* 산출이 중요하다. 사용자가 "지금 GPS 신호가 좋은가?"를 정량적으로 알 수 있어야 의사결정과 안전 절차를 자동화할 수 있기 때문이다. 본 연구실은 저가 GPS 수신기에서 SBAS 보정정보·코드 평활화·이상값 제거를 결합해 실시간 보호 수준 산출이 가능한 알고리즘을 개발해 왔다 [2].

재난·구조 응용에서는 RTK 보정정보를 송출하는 드론이 건물 외부에서 비행하면서 실내 사용자(구조요청자)의 3차원 위치를 결정하는 시스템이 핵심이다. 사용자 스마트폰의 기압계·GNSS 측정치와 드론에서 받은 보정정보를 결합하면 빌딩 차폐 환경에서도 cm급 절대 고도 결정이 가능하다. 또 다른 응용으로, SBAS 신호 차폐 지역에서 드론 운용을 위한 서버-사용자 통합 시스템과 자체 무결성 정보 송출 구조도 IPNT 2017에서 발표한 바 있다.

---

## 4. 자율주행 차량

차선 단위(< 0.1 m) 측위가 요구되는 자율주행 환경에서는 정밀 GNSS와 인지 센서의 결합이 필수적이다. 본 연구실은 도심 환경에 특화된 정밀 측위 인프라를 다년간 연구해 왔다.

핵심 성과 중 하나는 *Compact Network RTK 보정정보*다. 셀룰러 통신이 불안정한 육상교통 환경에서 통신 단절·지연을 보상하는 Compact RTK 메시지 구조는 *ION GNSS+ 2014* [3]와 *ION Pacific PNT 2015*에서 발표되었으며, 실제 차량 환경에서 30초의 통신 지연에서도 cm급 측위 유지가 가능함을 검증하였다. 이는 RTK 보정정보가 시간 변화에 따라 어떻게 외삽 가능한지에 대한 수학적 모델링과, 외삽 가능 시간을 정량화하는 통계적 분석에 기반한 결과다.

GNSS/INS의 절대 위치 위에는 LiDAR 점군과 HD맵의 정합, 카메라의 차선·교통표지·랜드마크 검출 결과가 융합된다. 단일 센서로는 모든 환경에서 안정적 차선 단위 측위가 불가능하기 때문이다. V2X 협력 측위(Cooperative Localization)는 인접 차량 간 정보 교환으로 가시 위성 부족 환경에서도 측위 강건성을 확보하는 접근으로, 미래 V2X 인프라가 보편화되면 더 큰 효과를 발휘할 것으로 기대된다.

---

## 5. 도심항공모빌리티 (UAM / K-UAM)

도심 상공을 비행하는 UAM(Urban Air Mobility)은 항공기 수준의 안전성과 도심 환경의 다중경로·신호 가시성 제약을 동시에 만족해야 한다. 즉 항공 정밀접근에 요구되는 무결성과 도심 GNSS의 비우호적 신호 환경이라는 정반대 요구가 한 플랫폼에 부과되는 셈이다.

본 연구실은 UAM 항법 요구사항 충족을 위해 여러 방향으로 연구한다. *RNP(Required Navigation Performance) 기반 항법성능 감시*는 UAM Corridor 내 항공기가 항법 정확도 요구를 만족하는지 실시간 감시하는 기법으로, 미만족 시 즉시 사용자에게 경고를 보내야 한다. *KASS 무결성 정보의 UAM 직접 적용*은 항공 정밀접근용으로 설계된 KASS의 보호 수준 산출 메커니즘이 UAM 환경에서도 유효한지 정량 분석하는 작업이다. *시간차분 반송파 측정치(TDCP) 기반 RAIM*은 단일 시점의 측정치만으로는 다중경로 검출이 어려운 도심 환경에서, 짧은 시간 동안의 반송파 변화를 활용해 무결성 한계를 산출하는 기법이며 IPNT 2024 (ID 124)에서 발표되었다. 또한 도심 항행 환경에서 NLOS·다중경로가 UAM 항법 요건에 미치는 영향을 정량 분석한 결과가 IPNT 2023 (ID 1)에서 발표되었다.

---

## 6. GNSS 위협 환경 대응 (Anti-Jamming / Anti-Spoofing)

<!-- ![figure](03-jamming-detection.svg) -->
*그림 3. 다중 안테나 기반 재밍 검출과 IMU 보조 기만 검출 흐름*

자율 이동체는 GNSS에 본질적으로 의존하기 때문에 의도적 간섭에 특히 취약하다. 재밍(Jamming)은 신호를 강한 잡음으로 압도하는 방식이고, 기만(Spoofing)은 실제 위성 신호처럼 보이는 가짜 신호로 사용자를 다른 위치로 유도하는 방식인데, 두 위협은 검출 기법이 서로 다르다.

본 연구실의 주된 접근은 *IMU 보조 GNSS 고장 감시*다. 별도의 배열안테나(CRPA) 없이도, 스마트폰·드론에 내장된 IMU가 예측한 운동 정보와 GNSS 측정치를 비교해 이상값을 검출하는 방식이다. ION GNSS+ 2022 [[articleID=18475](https://www.ion.org/publications/abstract.cfm?articleID=18475)]에서 안드로이드 IMU만으로 GNSS 고장(spoofing·jamming 효과)을 검출·완화하는 방법을 발표하였으며, 소형 플랫폼에서도 별도 하드웨어 추가 없이 위협을 감시할 수 있다는 점이 핵심 기여다.

또 다른 흥미로운 접근은 *기압계 기반 기만 검출*이다. 정상적인 GNSS 측위 결과의 고도 성분은 기압계가 제공하는 절대 고도와 일관되어야 한다는 단순한 원리에 기반하지만, 기만 공격이 보통 수평 위치만 조작하기 때문에 효과적인 검출 도구가 된다. 본 연구실은 Sejong–Colorado 공동 연구로 *Barometer-based GNSS Spoofing Detection* 결과를 발표하였으며, 이는 소형·저가형 사용자 환경에서도 적용 가능한 실용적 기만 검출 방안으로 평가된다.

---

## 7. 실험 플랫폼

자율 이동체 알고리즘은 시뮬레이션만으로 검증되기 어렵다. 실제 비행체의 진동, 통신 단절, 다중경로 변동 같은 요소는 모델링하기 까다롭기 때문이다. 본 연구실은 자체 멀티콥터 드론(자체 비행 시퀀스 + Moving Baseline RTK 수신·송신), 자율주행 차량(GNSS + IMU + LiDAR + 카메라 결합 데이터 수집), 그리고 RTK 송출 드론과 사용자 스마트폰을 결합한 응급 구조 실험 환경을 운용한다. 이러한 다층 플랫폼은 알고리즘 설계에서 실 비행체 검증까지 이어지는 단계적 검증 체계를 가능하게 한다.

---

## 8. 결론

자율 이동체는 단순한 응용 분야가 아니라 항법 기술 전반의 통합 시험장(Integration Testbed)이다. cm급 상대항법, 강건 절대측위, 인지 센서 융합, GNSS 위협 대응이 모두 한 플랫폼 위에서 동시에 동작해야 하기 때문이다. 본 연구 분야는 Moving Baseline RTK라는 핵심 기법을 중심으로, 무인기·자율차·UAM 응용까지 자율 시스템의 안전한 항법 기반을 제공하는 것을 목표로 한다. 향후 K-UAM 상용화와 자율주행 Level 4/5 확산이 본격화되면, 본 연구실이 다년간 축적한 정밀·강건 항법 기술이 직접적인 실사용 인프라로 이어질 것으로 기대된다.

---

## 참고문헌

[1] B. Park *et al.*, "Navigation augmentation in Urban area with pseudolite equipped High Altitude Long Endurance UAV," *ION ITM 2015*.

[2] B. Park *et al.*, "Algorithm Suggestion on Accuracy Improvement and Protection Level Generation for Low cost GPS Receiver of Drone," *2015 한국위성항법시스템학회 정기학술대회*, [proc/7](https://ipnt.or.kr/2015proc/7).

[3] B. Park *et al.*, "Latency Compensation by Compact RTK Under Harsh Communication Environment of Land Transportation," *ION GNSS+ 2014*.

[4] J. Yun, B. Park *et al.*, "Moving Baseline RTK-based Ground Vehicle-Drone Combination System," *ION ITM 2024*, [articleID=19577](https://www.ion.org/publications/abstract.cfm?articleID=19577).

[5] J. Yun, B. Park, "GNSS Fault Detection and Mitigation using Android IMU," *ION GNSS+ 2022*, [articleID=18475](https://www.ion.org/publications/abstract.cfm?articleID=18475).

[6] J. Jeong *et al.*, "Positioning Performance Analysis of Time-differenced Carrier Phase RAIM," *IPNT 2024 Proceedings*, ID 124.
