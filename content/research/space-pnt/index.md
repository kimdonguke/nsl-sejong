---
title: "Space Navigation & PNT"
titleKorean: "우주항법 시스템"
date: 2024-01-04
weight: 4
icon: "space"
funding: "MSIT"
topics:
  - "Lunar Navigation"
  - "LNSS Constellation"
  - "NRHO Orbit"
  - "LEO-PNT"
  - "Inter-Satellite Link"
  - "KPS"
  - "Space Service Volume"
summary: "달·시스루나·저궤도 환경에서의 항법 신호 가시성과 위성군 궤도 설계, 위성간 링크(ISL) 기반 궤도결정, LEO 증강 PPP 등 차세대 우주 PNT 시스템을 연구합니다."
---

## 1. 서론

지금까지 PNT(Position, Navigation, Timing) 인프라는 지구 표면을 위한 것이었다. GPS·GLONASS·Galileo·BeiDou 등 모든 GNSS는 MEO(중궤도) 위성군이 지구를 향해 신호를 송출하는 구조이며, 사용자는 지구 표면 또는 그 부근(LEO·항공기 고도)에 위치한다고 가정한다. 그러나 NASA의 Artemis 프로그램, ESA의 Moonlight Initiative, 그리고 한국항공우주연구원(KARI) 등의 달 탐사 로드맵이 빠르게 진행되면서, 항법 인프라가 지구를 떠나 *달·시스루나(Cislunar) 공간*으로 확장될 필요가 생겼다 [1].

동시에 SpaceX Starlink·OneWeb 등 대규모 LEO 통신 위성군이 PNT 신호 송출을 함께 검토하기 시작했다 — 이른바 LEO-PNT다. 본 연구 분야는 두 흐름에 대응하여, 달·시스루나에서 작동할 항법위성군의 궤도 설계와 LEO를 활용한 차세대 PPP 증강 기법을 동시에 연구한다. 한국형 위성항법시스템 KPS(Korean Positioning System)와 관련된 메시지 분석·사용자 알고리즘 연구도 수행한다.

---

## 2. 달 항법위성시스템 (Lunar Navigation Satellite System, LNSS)

<!-- ![figure](01-lnss-constellation.svg) -->
*그림 1. ELFO·원형 동결궤도 결합 다층 달 항법위성군 — 달 남극 영구음영지역 커버리지 확보*

달 표면 — 특히 향후 유인 기지가 들어설 남극 영구음영지역(Permanently Shadowed Region, PSR) — 은 지구 GNSS 신호 가시성이 매우 제한적이다. 따라서 달 자체의 항법위성시스템(LNSS)이 별도로 필요하다. 본 연구실은 다층 동결궤도(Frozen Orbit) 결합 위성군 설계를 통해 최소 위성 수로 전역 가시성을 확보하는 방안을 연구하고 있다 [2].

LNSS 궤도 설계의 핵심은 두 가지 다른 궤도를 조합하는 것이다. *ELFO(Elliptical Lunar Frozen Orbit)*는 극궤도 영역에서 장주기 안정성을 보장하면서 남극 PSR 같은 핵심 임무 지역에 집중 커버리지를 제공한다. 여기에 *원형 동결궤도*가 적도·중위도 사용자의 보강 커버리지를 담당하면서 전 지구적 가용성을 확보한다. 이 두 궤도의 결합은 단순한 원형 위성군보다 훨씬 적은 위성 수로 동일 수준의 가시성을 만들어낼 수 있다는 장점이 있다.

달 궤도 설계에서 무시할 수 없는 외란은 *지구 삼체중력(Third-Body Gravity)* 과 *달 섭동력(J₂, C₂₂)* 이다. 지구의 중력이 달 궤도에 미치는 영향은 지구 GNSS 위성에 작용하는 외란과 비교가 안 될 정도로 강하며, 달의 비구형성(J₂, C₂₂)도 GNSS 위성보다 훨씬 큰 영향을 미친다. 본 연구실은 이러한 외란을 모두 반영한 장기 궤도 안정성 분석을 수행하며, DOP·가용성 기반 위성 배치 최적화로 사용자 측위 정확도를 직접 평가한다. ELFO와 원형 궤도를 결합한 *하이브리드 동결궤도 위성군* 설계 결과는 *Journal of Positioning, Navigation, and Timing* 등에 발표되었으며, 본 연구실 IPNT 2024·2025 학술대회에서도 다층 달 위성군 시뮬레이션 결과가 보고되었다.

---

## 3. 시스루나·달 환경에서의 GNSS 가시성

달 환경에서 지구 GNSS는 메인로브가 지구 표면을 향하기 때문에 직접 활용이 어렵지만, *사이드로브(Side-Lobe) 신호*는 일정 부분 활용 가능하다. *Space Service Volume(SSV)*은 지구로부터 약 3,000 km – 36,000 km 영역으로, 이 안에서 GNSS 신호 활용이 GPS·Galileo·BeiDou에서 이미 사양으로 정의되어 있다. 본 연구실은 SSV 개념을 달 거리(약 384,000 km)와 NRHO(Near-Rectilinear Halo Orbit) 영역까지 확장하는 가시성·신호 강도 분석을 수행하고 있다.

<!-- ![figure](02-cislunar-visibility.svg) -->
*그림 2. NRHO 궤도에서의 GNSS 가시성 — 메인·사이드로브 신호와 EKF 기반 궤도 추적 영역*

핵심 연구 주제는 여러 갈래로 진행 중이다. NRHO 궤도에서의 GNSS 가시성·DOP 시뮬레이션은 IPNT 2024 (ID 189)에서 발표되었으며, NRHO는 게이트웨이(Lunar Gateway) 배치가 검토되는 궤도이기 때문에 실용적 의미가 크다. 시스루나 거리에서의 EKF 기반 신호 추적 및 궤도 결정 알고리즘은 APISAT 2024에서 발표되었고, SSV 메인·사이드로브 신호 활용 가능성 분석도 함께 진행되었다. 지구 GNSS 위성군의 달 궤도 신호 가시성 분석과 지역 위성항법 시스템 기여도 예측은 2025 우주학술대회에서, Augmented Forward Signal과 Inter-Satellite Link를 결합한 다층 달 항법위성 궤도 결정은 IPNT 2025 (ID 89)에서 발표되었다.

시스루나 환경의 가시성·추적 분석이 어려운 이유는 신호 강도가 메인로브 대비 수십 dB 약하고 위성 동역학도 지구 근처와 크게 다르기 때문이다. 본 연구실은 강한 적분 시간을 활용한 약신호 추적 기법, 그리고 동력학 모델 기반 추적 보조(Doppler/위치 사전 예측) 기법을 함께 적용해 시스루나 GNSS 추적 가능성을 정량 분석하고 있다.

---

## 4. 위성간 링크 기반 자율 궤도결정 (ISL-Based Orbit Determination)

지구의 GNSS 위성은 전 세계 지상 모니터링 네트워크를 통해 궤도가 결정된다. 그러나 달 위성군에 대해서는 같은 규모의 지상 인프라를 운용하기 어렵다. 달 통신은 지구-달 간 왕복 신호 지연만 약 2.5초이며, 추적국 가시성도 제한적이기 때문이다. 따라서 LNSS 위성들은 *위성간 링크(Inter-Satellite Link, ISL)* 측정치를 기반으로 자율적으로 궤도를 결정해야 한다.

<!-- ![figure](03-isl-orbit-determination.svg) -->
*그림 3. ISL 거리·도플러 측정치 기반 초기 궤도 결정(IOD) — Batch vs. EKF 추정 비교*

본 연구실은 ISL 거리·도플러 측정치만으로 초기 궤도(Initial Orbit Determination, IOD)와 정밀 궤도(Precise Orbit Determination, POD)를 결정하는 알고리즘을 연구한다 [3]. 두 가지 추정 방식이 검토되는데, *Batch 처리 기반 IOD*는 일정 기간 누적된 측정치로 궤도 매개변수를 일괄 추정해 정확도가 높은 반면 실시간성이 떨어지고, *EKF 기반 순차 추정*은 실시간 운용 환경에서 측정치가 들어올 때마다 궤도를 연속적으로 갱신할 수 있다. 두 방식은 보완적으로 사용되며, 운용 초기에는 Batch로 정밀 초기치를 산출하고 이후 EKF로 실시간 갱신하는 하이브리드 구조가 일반적이다.

달 지상국과 UWB 보조 측정치를 융합하는 접근도 함께 연구되며 (2023 항법시스템학회 정기학술대회, *ION GNSS+ 2023* [[articleID=19209](https://www.ion.org/publications/abstract.cfm?articleID=19209)]), 동력학 모델 정밀화 — 태양복사압, 비구형 중력(C₂₀ 등), 지구 삼체중력 모델링 — 도 핵심 과제다. 특히 *ION GNSS+ 2023* [[articleID=19375](https://www.ion.org/publications/abstract.cfm?articleID=19375)] 에서 발표된 *A Strategy for Initial Orbit Determination of Lunar Navigation Satellite* 는 달 지상국으로부터의 거리·도플러 측정치를 활용해 위성 IOD를 수행하는 본 연구실의 핵심 성과 중 하나다.

---

## 5. 저궤도 위성항법 (LEO-PNT)

LEO(Low Earth Orbit)는 대규모 통신 위성군이 빠르게 구축되면서 PNT 인프라로서의 잠재력도 함께 주목받고 있다. LEO 신호는 MEO 대비 신호 강도가 매우 강하며(약 30 dB 강한 수신 강도), 고속 운동에 의한 빠른 기하 변화는 PPP 모호정수 수렴 시간을 단축시키는 부가 효과를 가져온다. 또한 고밀도 위성군은 도심·실내 인접 환경에서 가시성을 향상시키며, 단일 시스템으로 전 지구 커버리지가 가능하다는 점도 매력적이다.

<!-- ![figure](04-leo-pnt-architecture.svg) -->
*그림 4. LEO-PNT — LEO 위성군과 GNSS 결합을 통한 PPP 수렴 시간 단축 개념*

본 연구실은 LEO-PNT의 여러 측면을 다룬다. LEO 위성군 설계 방법론과 한반도 가용성 검증은 IPNT 2024–2025에서 지속적으로 발표되어 왔고, LEO 신호 활용 PPP 수렴 시간 단축 연구는 IPNT 2025 (ID 95)에서 다뤘다. LEO 위성 궤도 오차의 정량적 특성 분석과 사용자 측위 영향, LEO–GNSS 결합 무전리층(Iono-Free) 측위, NTN(Non-Terrestrial Network) 채널 모델 기반 LEO-PNT 시뮬레이션, 그리고 LEO 위성 기반 *Differential Positioning* 가능성 분석은 APISAT 2025에서 발표되었다.

다만 LEO-PNT는 이론적 잠재력과 별개로 풀어야 할 문제가 많다. LEO 위성은 궤도 오차가 크고, 시계 안정성이 GNSS 위성용 원자시계 대비 떨어지며, 신호 형식 표준화도 아직 완료되지 않았다. 따라서 가까운 미래에는 LEO-PNT가 GNSS를 *대체*하기보다는 *보강 인프라*로 자리잡는 것이 가장 현실적인 시나리오로 평가된다.

---

## 6. SPIRONE 큐브위성 LEO-PNT 페이로드

본 연구실은 큐브위성 플랫폼을 통해 LEO-PNT 시스템을 직접 검증하는 연구도 수행한다. SPIRONE은 LEO 항법신호 발생기를 탑재한 6U 큐브위성으로, 이론과 시뮬레이션을 실제 궤도 환경에서 입증하는 역할을 한다. LEO 항법신호 발생기 설계·검증 결과는 IPNT 2022 (ID 82)와 IPNT 2023 (ID 174)에서 보고되었으며, 6U 큐브위성 자세 결정 및 제어는 LNSS 운용 환경을 고려한 형태로 개발 중이다.

큐브위성 플랫폼에서 검증되는 또 다른 핵심 기능은 *단일주파수 RTK 상대항법*으로, SNUGLITE-III 호환 형태로 IPNT 2023 (ID 132)에서 발표되었다. 큐브위성 플랫폼을 이용한 GNSS 신호 수신·송신 실험은 IPNT 2025 (ID 176)에서 보고되었으며, 자율 랑데부 도킹 시 DGPS 상대항법 알고리즘도 함께 다뤄지고 있다. 이러한 큐브위성 실증은 차세대 LEO-PNT 위성군의 핵심 기능을 사전 검증하는 역할을 하며, 위성 운용 환경에서만 드러나는 다양한 실용 이슈를 사전에 발견·해결할 수 있게 한다.

---

## 7. 한국형 위성항법시스템 (KPS) 연계 연구

KPS는 한반도 영역을 중심으로 한 한국 자체 RNSS(Regional Navigation Satellite System) 사업이다. 본 연구실은 KPS와 관련된 메시지 분석, 다층 PNT 운용 시나리오, 사용자 측위 알고리즘 분야에서 연구를 수행하고 있다.

대표적으로 한반도 영역에 LEO-PNT 위성군을 추가한 다층 한국형 PNT 운용 시나리오 분석을 IPNT 2025에서 발표하였으며, 한국 지역 위성항법 적용을 위한 전리층 보정 연구(IPNT 2025)도 함께 진행되었다. KPS와 SBAS·LEO 등 한반도 다층 PNT 인프라가 어떻게 상호 보완적으로 동작할 수 있는지에 대한 시뮬레이션 기반 분석이 본 연구실의 주된 기여 방향이다.

KPS는 단순한 지역 GNSS가 아니라 한반도 통신·SBAS·LEO 등 다층 PNT 인프라의 일부로 설계되고 있으며, 본 연구실은 사용자 측위 알고리즘 측면에서 KPS 활용 가능성을 확장하는 연구를 수행한다.

---

## 8. 시뮬레이션 환경

우주 PNT 연구는 실험 환경 구축이 어렵기 때문에 시뮬레이션 검증이 절대적이다. 달 위성을 직접 운용해 검증하는 것은 비현실적이고, LEO 위성도 큐브위성 한두 기로 모든 시나리오를 다룰 수는 없다. 본 연구실은 NASA SPICE 데이터에 기반한 달·시스루나 궤도 전파 시뮬레이션 환경을 구축해 사용하고 있으며, ISL 측정치 생성 및 EKF/Batch 궤도결정 알고리즘의 검증에 활용한다. LEO-PNT 가시성·DOP 분석은 한반도 지역 모델을 포함한 형태로 수행되고 있다.

---

## 9. 결론

PNT 인프라는 더 이상 지구 표면에만 머무르지 않는다. 달 유인 탐사가 가시화되고, LEO 위성군이 PNT 신호 송출을 검토하며, 국가 단위 항법시스템(KPS) 사업이 본격화되고 있는 지금, 우주 PNT 시스템 설계는 항법 분야의 가장 빠르게 성장하는 영역이다. 본 연구실은 달 위성군 궤도 설계, ISL 기반 자율 궤도결정, LEO 증강 PPP, KPS 메시지 설계 등 우주 PNT 전반에 걸쳐 연구를 수행하며, 차세대 우주 항법 인프라의 한국 기술 자립에 기여하고자 한다. 향후 10–20년 동안 PNT 인프라가 어떻게 재편될지는 아직 정해지지 않았지만, 본 연구실은 그 변화의 흐름 한가운데에서 핵심 기술을 축적해 나가고 있다.

---

## 참고문헌

[1] NASA, "LunaNet Interoperability Specification," *NASA SCaN Office*, 2022; ESA Moonlight Initiative, 2021.

[2] 항법시스템연구실, "Design of Navigation Satellite Constellation for Lunar South Pole PNT," *Journal of Positioning, Navigation, and Timing*, 2025.

[3] 항법시스템연구실, "A Strategy for Initial Orbit Determination of Lunar Navigation Satellite Based on Range and Doppler Measurements from a Lunar Ground Station," *ION GNSS+ 2023*, [articleID=19375](https://www.ion.org/publications/abstract.cfm?articleID=19375).

[4] 항법시스템연구실, "Homogeneous Network RTK Correction Residual Error Modeling Techniques," *ION GNSS+ 2023*, [articleID=19209](https://www.ion.org/publications/abstract.cfm?articleID=19209).

[5] 항법시스템연구실, "Predicted Orbit Determination Performance of a Lunar Navigation System: Utilizing Inter-Satellite Measurements with Batch and EKF Estimation," *ION ITM 2025*, [articleID=20027](https://www.ion.org/publications/abstract.cfm?articleID=20027).

[6] 항법시스템연구실, "Simulation Based Tropospheric Error Estimation Performance Analysis with Low Earth Orbit (LEO) Satellites," *ION GNSS+ 2024*, [articleID=19934](https://www.ion.org/publications/abstract.cfm?articleID=19934).
