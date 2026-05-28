---
title: "GNSS Signal Processing & Precise Positioning"
titleKorean: "위성항법 신호처리 및 정밀측위"
date: 2024-01-01
weight: 1
icon: "gnss"
funding: "NRF"
topics:
  - "KASS / SBAS"
  - "Homogeneous Network RTK"
  - "PPP-RTK"
  - "QZSS CLAS"
  - "Smartphone GNSS"
  - "Multipath Mitigation"
  - "Ionospheric Monitoring"
summary: "GNSS 측정치 오차 모델링부터 위성기반 보강(SBAS/RTK/PPP-RTK), 도심지 다중경로 완화, 스마트폰 정밀측위까지, 신호 수신에서 측위해 산출에 이르는 전 과정을 다룹니다."
---

## 1. 서론

위성항법시스템(Global Navigation Satellite System, GNSS)은 항공·해상·육상 등 거의 모든 운송 수단의 항법 기반 인프라이지만, 사용자가 실제 얻는 단독측위(Standalone Positioning)의 정확도는 자유공간(Open-sky)에서도 약 3–5 m 수준에 머문다. 위성 시계·궤도 오차, 전리층·대류층 지연이 누적되며, 도심에서는 다중경로(Multipath)와 비가시(Non-Line-of-Sight, NLOS) 신호까지 더해지면서 오차가 수십 미터 단위로 증폭된다 [1]. 차세대 응용 — 자율주행, 도심항공모빌리티(UAM), 정밀 농업, 측지 등 — 이 요구하는 cm급 또는 dm급 정확도와는 두 자릿수 이상의 간극이 있다.

본 연구실은 이 간극을 메우기 위해 *측정치 모델링 → 위성기반 보강(Augmentation) → 도심 신호 완화 → 사용자 무결성 감시*로 이어지는 GNSS 처리 흐름 전체를 다룬다. 특히 KASS(Korea Augmentation Satellite System)와 같은 국가 SBAS 사업, 그리고 본 연구실이 제안한 동질형 네트워크 RTK(Homogeneous Network RTK, HN-RTK) [2] 등 차세대 정밀측위 인프라 설계에 직접 기여하고 있다.

---

## 2. 위성기반 보강 시스템: KASS와 차세대 SBAS

<!-- ![figure](01-sbas-architecture.svg) -->
*그림 1. SBAS 구성 — 기준국(KRS)·중앙처리국(KPS)·통신국(KUS)·GEO 위성 및 사용자 신호 흐름*

SBAS(Satellite-Based Augmentation System)는 GNSS 측정치의 무결성(Integrity)과 정확도를 항공 안전 수준으로 끌어올리기 위해 GEO 위성을 통해 보정정보·무결성 정보를 방송하는 인프라다. 본 연구실은 한국 SBAS인 KASS에 대한 연구를 다년간 수행해 왔으며, 단일주파수(L1) SBAS의 메시지 분석, 이중주파수 다중위성군(DFMC) SBAS의 메시지 변경점 분석, 그리고 단일주파수 다중위성군(SFMC) SBAS 메시지를 이중주파수 사용자가 활용하는 통합 모델까지 다뤄 왔다 [3]. KASS는 한반도 영역에서 항공 정밀접근(APV-I/II) 수준 서비스를 목표로 하기 때문에, 메시지 설계는 가용성·정확도·무결성을 동시에 만족시켜야 한다.

SBAS 운용에서 가장 까다로운 제약은 메시지 대역폭(250 bps)이다. 위성 시계·궤도 빠른 보정(MT 25), 전리층 격자 보정(MT 26), 위성 모니터링 정보(MT 1–7) 등을 250 bps 안에 어떻게 효율적으로 배치할지가 핵심 설계 변수다. 본 연구실은 *Removal of RRC and Fast Correction* 기법을 통해 메시지 효율을 개선하는 방법을 ION TIM/PTTI 2017 [[articleID=14879](https://www.ion.org/publications/abstract.cfm?articleID=14879)]에서 발표하였으며, 한반도 영역에서 KASS·MSAS·WAAS·SDCM 등 다중 SBAS의 호환 운용 가능성을 정량 분석한 바 있다.

차세대 SBAS는 L1 단독 사용자와 L1/L5 이중주파수 사용자, 그리고 GPS·Galileo·BeiDou 다중위성군 사용자를 동시에 지원해야 한다. 본 연구실은 APISAT 2025와 한국항행학회 2024 학술대회에서 L1 SBAS 전리층 보정정보를 활용해 DFMC SBAS 사용자 성능을 끌어올리는 방안과, 단일·이중 주파수 사용자를 동시 지원하는 SBAS 보정정보 설계 결과를 발표하였다. 이는 KASS의 향후 확장과 UAM·자율주행 등 다양한 응용을 동시에 만족시키는 인프라 설계의 토대가 된다.

---

## 3. 동질형 네트워크 RTK (Homogeneous Network RTK)

<!-- ![figure](02-hnrtk-concept.svg) -->
*그림 2. HN-RTK 개념도 — 위성 방송 OSR 보정과 사용자 균일 정밀도 모델*

기존 Network RTK는 사용자가 셀룰러 통신을 통해 가장 가까운 기준국 군의 VRS·MAC·FKP 보정정보를 받아 cm급 측위를 수행한다. 그러나 이 방식은 두 가지 본질적 한계를 안고 있다. 첫째, 네트워크 외곽으로 갈수록 대기 오차 보정의 외삽(extrapolation) 정확도가 떨어지면서 사용자의 측위 정확도가 빠르게 저하된다. 둘째, 셀룰러 음영지역이나 다수 사용자가 동시 접속하는 환경에서는 서비스 가용성이 크게 떨어진다 — 통신은 본질적으로 1:1 모델이기 때문이다.

본 연구실이 제안한 동질형 네트워크 RTK(HN-RTK) [2]는 두 가지 핵심 아이디어로 이 문제를 동시에 해결한다. 첫째 아이디어는 보정정보를 **위성 방송형 OSR(Observation Space Representation)**으로 송출하는 것이다. 셀룰러 1:1 통신 대신 위성이 한 번에 전국으로 동일한 보정 메시지를 방송하기 때문에, 사용자 수에 무관하게 서비스 가용성이 보장되고 음영지역 문제도 사라진다. 둘째 아이디어는 **Universal Kriging 기반 대기오차 모델링**이다. 단순 선형 보간 대신 공간 통계 모델로 전리층·대류층 잔여오차를 추정하면서 그 불확실성을 함께 정량화하기 때문에, 네트워크 외부 사용자에게도 일관된 cm급 정확도를 보장할 수 있다.

핵심 기술 요소는 위성-방송형 OSR 보정정보의 송출 구조와 메시지 스케줄링 설계, 네트워크 내부·외부 사용자를 위한 잔여오차(Residual Error)의 통계 모델링, Universal Kriging을 활용한 대기 오차 모델링과 불확실성 정량화, 그리고 Compact Network RTK 호환 메시지 포맷 및 대역폭 최적화로 구성된다. 본 연구 결과는 ION GNSS+ 2025에서 *A New Paradigm in Nationwide GNSS Precise Positioning* [[articleID=20335](https://www.ion.org/publications/abstract.cfm?articleID=20335)]로 발표되었으며, 위성 방송형 PPP-RTK 인프라의 한 가능성을 제시한다.

---

## 4. PPP-RTK와 QZSS CLAS

PPP(Precise Point Positioning)는 단일 수신기만으로 전 지구에서 cm급 측위가 가능하다는 장점이 있지만, 초기 모호정수 수렴까지 수십 분이 걸리는 것이 가장 큰 실사용 장벽이다. PPP-RTK는 SSR(State Space Representation) 형태의 위성 시계·궤도·바이어스·대기 오차 보정정보를 활용해 PPP의 수렴 시간을 분 단위로 단축한다. 일본의 QZSS-CLAS(Centimeter-Level Augmentation Service)는 현재 운용되고 있는 대표적인 PPP-RTK 서비스로, 한반도 일부 지역에서도 신호를 수신할 수 있다.

본 연구실은 QZSS CLAS 메시지를 직접 디코딩하고, 단일주파수·저가형 수신기에서도 동작하는 PPP-RTK 알고리즘을 구현해 왔다 [4]. 또한 위성 위상 바이어스(Satellite Phase Bias)의 전송 효율을 최적화한 **Common IFPB 포맷**을 제안하여 PPP-RTK 메시지 대역폭을 줄이는 연구를 IPNT 2025에서 진행하였다. IFPB(Inter-Frequency Phase Bias)는 위성별·주파수별로 다른 위상 바이어스 값을 가지는데, 이를 공통 항(Common Term)과 위성별 잔차 항으로 분리하면 전송할 매개변수 수가 크게 줄어들면서 무결성에는 영향을 주지 않는다는 점이 핵심이다.

---

## 5. 도심지 GNSS와 다중경로 완화

<!-- ![figure](03-multipath-map.svg) -->
*그림 3. 머신러닝 기반 도심 다중경로 지도 — 3D 건물 모델과 결합한 위성별 신호 품질 예측*

도심 협곡(Urban Canyon)에서는 빌딩에 반사된 NLOS 신호가 위치해를 수십 미터 단위로 왜곡시킨다. 본 연구실은 이러한 환경에서 다중경로 오차를 사전에 예측·완화하는 **동적 지도(Dynamic Map)**를 구축한다. 핵심 아이디어는 비선형 회귀(Nonlinear Regression) 및 머신러닝 모델로 위성 방위각·고도각·CMC(Code-Minus-Carrier) 통계를 결합해 위성별 다중경로 오차를 정량화하고, 3D 건물 모델을 활용해 NLOS 차폐 여부를 사전 판단하는 것이다 [5]. 이렇게 구축된 지도는 사용자 위치와 위성 기하만 알면 각 위성의 신호 신뢰도를 즉시 예측할 수 있다.

지도는 한 번 만들고 끝나는 것이 아니라 시간에 따라 변화하는 환경에 적응해야 한다. 새로 건설된 건물, 식생 변화, 임시 구조물 등이 다중경로 패턴에 영향을 미치기 때문이다. 본 연구실은 사용자 데이터를 익명으로 수집·클라우딩하는 **적응형 다중경로 지도 갱신(Adaptive Map Update)** 기법을 ION GNSS+ 2024에서 발표하였다. 또한 ION GNSS+ 2025에서는 재귀벡터(Recurrence Vector)와 확률적 가시성 맵(Stochastic Visibility Map) 선택을 결합한 위치해 강건화 기법을 제시하였는데, 이는 다중 후보 위성 집합 중 가장 그럴듯한 가시 위성 부분집합을 확률적으로 선택해 측위에 활용하는 접근이다.

---

## 6. 스마트폰 정밀측위

<!-- ![figure](04-smartphone-decimeter.svg) -->
*그림 4. Google Smartphone Decimeter Challenge 2023-2024 결과 — 본 연구팀(녹색) vs. Google 기준해(청색) vs. 실제 경로(주황색)*

2016년 안드로이드 7.0이 GNSS 원시측정치(Raw Measurement) API를 공개한 이후, 스마트폰은 정밀측위 플랫폼으로서의 가능성을 새롭게 얻었다. 그러나 스마트폰의 LP(Linear Polarized) 안테나, 배터리 절약을 위한 듀티 사이클 수신, 시스템 시각과의 비동기성 등 구조적 한계로 인해 일반 GNSS 수신기에 적용되던 알고리즘이 그대로 동작하지 않는다 [6]. 의사거리·반송파 위상·도플러 측정치가 서로 다른 시계 소스로 기록되기 때문에, 단순한 잔차 기반 이상값 검출조차 오탐지가 99% 이상 발생하는 사례가 보고되었다.

본 연구실은 이러한 제약을 극복하기 위해 네 가지 기법을 통합한 스마트폰 측위 알고리즘을 개발해 왔다. 먼저, L1/L5 이중주파수 측정치에 Divergence-Free Hatch 필터와 이중차분을 적용해 전리층 영향과 다중경로 노이즈를 동시에 완화한다. 둘째로, 위성간 단일 차분으로 수신기 시계 항을 소거하는 **SDOM(Single-Difference based Outlier Monitoring)** 기법을 적용해 오탐지 없이 실제 이상값만 선별적으로 제거한다. 셋째로, TDCP(Time-Differenced Carrier Phase) 기반 속도 보정과 2단계 정밀 속도 추정을 결합해 동적 환경에서의 위치해 정확도를 끌어올린다. 마지막으로 GNSS/INS 강결합을 통해 INS가 예측한 위성별 의사거리와 실제 측정치를 비교, NLOS 위성을 직접 검출·제거한다.

이러한 알고리즘 묶음으로 본 연구팀은 **Google Smartphone Decimeter Challenge 2023-2024**에서 322개 팀 중 **세계 3위**를 달성하였으며 [7], 듀얼 주파수 스마트폰에서 수평 오차 0.3 m, 수직 0.4 m 수준의 정확도를 검증하였다. 특히 후처리 방식을 활용한 1·2위 팀과 달리 본 연구팀은 forward-only(실시간 처리 등가) 방식을 채택하였기 때문에, 결과적으로 실시간 서비스 환경에서도 동일한 성능을 기대할 수 있게 되었다는 점이 의미 있다.

---

## 7. 사이클 슬립과 무결성 감시

도심지 차량 환경에서는 빌딩 차폐로 인한 반송파 측정치 불연속(Cycle Slip)이 빈번하다. 본 연구실은 단일·이중·삼중 주파수 측정치 조합 모두에서 동작하는 사이클 슬립 검출 알고리즘을 개발해 왔다. ION GNSS+ 2021 [[articleID=17884](https://www.ion.org/publications/abstract.cfm?articleID=17884)]에서는 Wide-lane·Geometry-free 측정치 조합을 활용한 검출 기법을 발표하였으며, ION GNSS+ 2023에서는 단거리 이중차분 구속과 짧은 기저선(Short Baseline)을 결합한 *Effective Carrier Phase Anomaly Detection* 기법을 발표하였다. 짧은 기저선 환경에서는 대기 오차가 거의 동일하게 소거되기 때문에, 측정치 잔차에 남는 신호가 곧 사이클 슬립이라는 단순한 원리에 기반한다.

무결성 감시는 ARAIM(Advanced Receiver Autonomous Integrity Monitoring)과 H-ARAIM 사용자 알고리즘을 기반으로 한다. KASS 사용자 환경에서 한반도 가용성을 정량 분석한 결과가 IPNT 정기학술대회 등에서 지속적으로 보고되어 왔다. 무결성은 단순히 "위치가 얼마나 정확한가"를 넘어, "지금 산출된 위치 오차가 일정 한도 이하일 확률이 얼마인가"를 정량화하는 작업이기 때문에, 자율주행·UAM 등 안전 중요 응용에서 점점 더 중요해지고 있다.

---

## 8. 전리층 감시와 우주기상 응용

GNSS 측정치는 전리층의 영향을 직접 받기 때문에, 역으로 전리층 상태를 감시·관측하는 데에도 활용된다. 본 연구실은 ROT(Rate of TEC) 변화 기반 전리층 이상 검출 시스템을 안드로이드 클라우드 환경에서 구축한 바 있으며 [[articleID=17624](https://www.ion.org/publications/abstract.cfm?articleID=17624)], 이는 스마트폰 사용자가 분산된 위치에서 측정한 전리층 정보를 클라우드로 통합해 광역 전리층 상태를 추정하는 흥미로운 접근이다. ION GNSS+ 2023에서는 기준국 간 ROT 교차상관(Inter-Station Cross Correlation)을 활용해 지진 진앙지를 추정하는 기법을 발표하였는데, 2023년 튀르키예-시리아 지진을 실제 사례로 분석하였다 — 지진이 발생하면 음향-중력파(AGW)가 전리층을 흔들며, GNSS 측정치에 그 흔적이 남는다.

한반도 환경에 적합한 Klobuchar / NeQuick-G / NTCM-G 전리층 모델 비교 분석은 한국항행학회 2025 학술대회에서 발표되었다. 각 모델은 적용 가능한 위도 범위와 전리층 활동 강도에 따라 강·약점이 다르며, 한반도와 같이 자기 적도와 중위도의 중간 영역에서는 어떤 모델이 가장 적합한지를 정량 비교하는 작업이 사용자 측위 정확도와 직접 연결된다.

---

## 9. 결론

본 연구 분야는 GNSS 측정치 모델링에서 출발하여 KASS와 같은 국가 SBAS 인프라, 본 연구실이 제안한 HN-RTK 패러다임, 도심 다중경로 완화, 스마트폰 정밀측위에 이르는 정밀측위 전 영역을 다룬다. 위성 방송형 PPP-RTK·LEO-PNT 증강·차세대 SBAS 등 인프라가 빠르게 변화하고 있으며, 사용자 환경 또한 항공·도심·실내까지 확장되는 만큼, 신호 수신에서 보강·다중경로 완화·무결성 감시로 이어지는 통합적 접근이 더욱 중요해질 것이다. 본 연구실은 메시지 설계·알고리즘 개발·실증 검증 전 영역에 걸쳐 차세대 정밀측위 인프라의 한국 기술 자립에 기여하고자 한다.

---

## 참고문헌

[1] G. A. McGraw, P. D. Groves, and B. W. Ashman, "Robust Positioning in the Presence of Multipath and NLOS GNSS Signals," in *Position, Navigation, and Timing Technologies in the 21st Century*, Wiley, 2020.

[2] B. Park *et al.*, "A New Paradigm in Nationwide GNSS Precise Positioning: Satellite-Broadcasted OSR Corrections via Homogeneous Network RTK Methodology," *ION GNSS+ 2025*.

[3] 항법시스템연구실, "DFMC SBAS Performance Enhancement Using L1 SBAS Ionospheric Corrections," *APISAT 2025*; *2024 한국항행학회 종합학술대회*, 2024.

[4] J. Shin, J. Han, B. Park, "Development and Evaluation of PPP-RTK Algorithm Based on QZSS CLAS," *IPNT 2024 Proceedings*, ID 18.

[5] Y. Lee, P. Wang, and B. Park, "Nonlinear Regression-Based GNSS Multipath Dynamic Map Construction and Its Application in Deep Urban Areas," *IEEE Transactions on Intelligent Transportation Systems*, 2023.

[6] J. Yun, C. Lim, B. Park, "Inherent Limitations of Smartphone GNSS Positioning and Effective Methods to Increase the Accuracy Utilizing Dual-Frequency Measurements," *Sensors*, vol. 22, no. 24, 2022.

[7] J. Yun, B. Park *et al.*, "Third Place Winner of the Smartphone Decimeter Challenge: Improving Smartphone Accuracy with a Two-step Accurate Velocity Estimation," *ION GNSS+ 2024*, [articleID=19922](https://www.ion.org/publications/abstract.cfm?articleID=19922).
