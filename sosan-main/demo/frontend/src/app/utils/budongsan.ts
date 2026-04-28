const SERVICE_KEY  = import.meta.env.VITE_MOLIT_API_KEY as string;
const SBIZ_KEY     = import.meta.env.VITE_SBIZ_API_KEY  as string;

/* ── 시도+시군구 조합 → 5자리 법정동 코드 ── */
const SIGUNGU_CODE_MAP: Record<string, string> = {
  // 서울
  "서울 종로구": "11110", "서울 중구": "11140", "서울 용산구": "11170", "서울 성동구": "11200",
  "서울 광진구": "11215", "서울 동대문구": "11230", "서울 중랑구": "11260", "서울 성북구": "11290",
  "서울 강북구": "11305", "서울 도봉구": "11320", "서울 노원구": "11350", "서울 은평구": "11380",
  "서울 서대문구": "11410", "서울 마포구": "11440", "서울 양천구": "11470", "서울 강서구": "11500",
  "서울 구로구": "11530", "서울 금천구": "11545", "서울 영등포구": "11560", "서울 동작구": "11590",
  "서울 관악구": "11620", "서울 서초구": "11650", "서울 강남구": "11680", "서울 송파구": "11710",
  "서울 강동구": "11740",
  // 부산
  "부산 중구": "26110", "부산 서구": "26140", "부산 동구": "26170", "부산 영도구": "26200",
  "부산 부산진구": "26230", "부산 동래구": "26260", "부산 남구": "26290", "부산 북구": "26320",
  "부산 해운대구": "26350", "부산 사하구": "26380", "부산 금정구": "26410", "부산 강서구": "26440",
  "부산 연제구": "26470", "부산 수영구": "26500", "부산 사상구": "26530",
  // 대구
  "대구 달서구": "27290", "대구 수성구": "27260",
  // 인천
  "인천 남동구": "28245", "인천 연수구": "28185", "인천 부평구": "28237",
  // 경기
  "수원시": "41111", "성남시": "41131", "고양시": "41281", "용인시": "41461",
  "부천시": "41190", "안산시": "41271", "안양시": "41171", "남양주시": "41360",
  "화성시": "41590", "평택시": "41220", "의정부시": "41150", "시흥시": "41390",
  "파주시": "41480", "김포시": "41570", "광명시": "41210",
  // 대전
  "대전 유성구": "30230", "대전 서구": "30170",
  // 광주
  "광주 북구": "29170",
  // 울산
  "울산 남구": "31140",
};

export function getSigunguCode(regionText: string): string | null {
  // "서울특별시 강남구" → "서울 강남구" 형태로 정규화
  const normalized = regionText
    .replace("특별시", "").replace("광역시", "").replace("특별자치시", "")
    .replace("특별자치도", "").replace("도 ", " ").trim();

  // 정규화된 전체 문자열로 먼저 탐색
  if (SIGUNGU_CODE_MAP[normalized]) return SIGUNGU_CODE_MAP[normalized];

  // 마지막 부분(시군구)만으로 경기도 등 단독 시 탐색
  const parts = normalized.split(" ");
  const last = parts[parts.length - 1];
  if (SIGUNGU_CODE_MAP[last]) return SIGUNGU_CODE_MAP[last];

  // 앞 두 단어 조합 탐색 ("서울 강남구")
  if (parts.length >= 2) {
    const key = `${parts[0]} ${parts[parts.length - 1]}`;
    if (SIGUNGU_CODE_MAP[key]) return SIGUNGU_CODE_MAP[key];
  }

  return null;
}

/* ── 상업업무용 실거래 항목 ── */
export interface CommercialContext {
  sigunguCode: string;
  regionName: string;
  latestYearMonth: string;
  trades: {
    buildingName: string;
    use: string;
    floor: string;
    area: string;
    amount: string;
    dong: string;
  }[];
  avgAmountPerPyeong: number;
  sampleCount: number;
}

/* ── 국토교통부 상업업무용 부동산 실거래가 API ── */
export async function fetchCommercialContext(
  regionText: string
): Promise<CommercialContext | null> {
  if (!SERVICE_KEY) return null;

  const sigunguCode = getSigunguCode(regionText);
  if (!sigunguCode) return null;

  const now = new Date();
  // 이번달, 지난달 순으로 시도
  const ymds = [0, 1].map((offset) => {
    const d = new Date(now.getFullYear(), now.getMonth() - offset, 1);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    return `${y}${m}`;
  });

  for (const dealYMD of ymds) {
    try {
      const params = new URLSearchParams({
        serviceKey: SERVICE_KEY,
        LAWD_CD: sigunguCode,
        DEAL_YMD: dealYMD,
        numOfRows: "30",
        pageNo: "1",
      });

      const res = await fetch(
        `https://apis.data.go.kr/1613000/RTMSDataSvcNrgTrade/getRTMSDataSvcNrgTrade?${params}`
      );
      if (!res.ok) continue;

      const text = await res.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "text/xml");
      const items = Array.from(xml.querySelectorAll("item"));
      if (items.length === 0) continue;

      const get = (item: Element, ...tags: string[]) => {
        for (const tag of tags) {
          const val = item.querySelector(tag)?.textContent?.trim();
          if (val) return val;
        }
        return "-";
      };

      const trades = items.map((item) => ({
        buildingName: get(item, "buildingName", "건물명"),
        use: get(item, "buildingUse", "건물주용도"),
        floor: get(item, "floor", "층"),
        area: get(item, "buildingArea", "건물면적"),
        amount: get(item, "dealAmount", "거래금액"),
        dong: get(item, "umdNm", "법정동"),
      }));

      // 평당 평균 거래금액
      let totalPerPyeong = 0, validCount = 0;
      trades.forEach((t) => {
        const amt = Number(t.amount.replace(/,/g, ""));
        const area = Number(t.area);
        if (amt > 0 && area > 0) {
          totalPerPyeong += amt / (area / 3.3);
          validCount++;
        }
      });

      const y = dealYMD.slice(0, 4);
      const m = String(parseInt(dealYMD.slice(4, 6)));

      return {
        sigunguCode,
        regionName: regionText,
        latestYearMonth: `${y}년 ${m}월`,
        trades: trades.slice(0, 10),
        avgAmountPerPyeong: validCount > 0 ? Math.round(totalPerPyeong / validCount) : 0,
        sampleCount: trades.length,
      };
    } catch {
      continue;
    }
  }

  return null;
}

/* ── 소상공인 상가정보 타입 ── */
export interface SbizStore {
  bizesNm: string;    // 상가업소명
  rdnmAdr: string;    // 도로명주소
  lnoAdr: string;     // 지번주소
  bldNm: string;      // 건물명
  flrNo: string;      // 층
  indsSclsNm: string; // 업종 소분류명
  indsMclsNm: string; // 업종 중분류명
  adongNm: string;    // 행정동명
  lon: string;
  lat: string;
}

export interface SbizStoreData {
  regionName: string;
  totalCount: number;
  stores: SbizStore[];
  buildingGroups: {
    bldNm: string;
    address: string;
    floors: string[];
    bizTypes: string[];
    count: number;
  }[];
}

/* ── 소상공인시장진흥공단 상가(상권)정보 API ── */
export async function fetchSbizStores(
  regionText: string,
  bizCategory?: string  // 업종 (예: "카페", "식당")
): Promise<SbizStoreData | null> {
  if (!SBIZ_KEY) return null;

  const sigunguCode = getSigunguCode(regionText);
  if (!sigunguCode) return null;

  // 업종 대분류 코드 매핑 (음식 = Q)
  const bizCodeMap: Record<string, string> = {
    "식당": "Q09", "카페": "Q12", "디저트": "Q12",
    "배달전문": "Q09", "주점": "Q09",
  };
  const indsLclsCd = bizCategory ? (bizCodeMap[bizCategory] ?? "Q09") : "Q09";

  try {
    const params = new URLSearchParams({
      serviceKey: SBIZ_KEY,
      pageNo: "1",
      numOfRows: "50",
      divId: "signguCd",
      key: sigunguCode,
      indsLclsCd,
    });

    const res = await fetch(
      `https://apis.data.go.kr/B553077/api/open/sdsc2/storeListInDong?${params}`
    );
    if (!res.ok) return null;

    const text = await res.text();

    // JSON 응답인 경우
    if (text.trim().startsWith("{")) {
      const json = JSON.parse(text);
      const items: any[] = json?.body?.items?.item ?? [];
      return parseStoreItems(items, regionText);
    }

    // XML 응답인 경우
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "text/xml");
    const items = Array.from(xml.querySelectorAll("item")).map((el) => {
      const get = (tag: string) => el.querySelector(tag)?.textContent?.trim() ?? "";
      return {
        bizesNm: get("bizesNm"),
        rdnmAdr: get("rdnmAdr"),
        lnoAdr: get("lnoAdr"),
        bldNm: get("bldNm"),
        flrNo: get("flrNo"),
        indsSclsNm: get("indsSclsNm"),
        indsMclsNm: get("indsMclsNm"),
        adongNm: get("adongNm"),
        lon: get("lon"),
        lat: get("lat"),
      };
    });

    return parseStoreItems(items, regionText);
  } catch {
    return null;
  }
}

function parseStoreItems(items: any[], regionName: string): SbizStoreData {
  const stores: SbizStore[] = items.map((i: any) => ({
    bizesNm:    i.bizesNm    ?? "",
    rdnmAdr:    i.rdnmAdr    ?? "",
    lnoAdr:     i.lnoAdr     ?? "",
    bldNm:      i.bldNm      ?? "",
    flrNo:      i.flrNo      ?? "-",
    indsSclsNm: i.indsSclsNm ?? "",
    indsMclsNm: i.indsMclsNm ?? "",
    adongNm:    i.adongNm    ?? "",
    lon:        String(i.lon ?? ""),
    lat:        String(i.lat ?? ""),
  }));

  // 건물별 그룹핑
  const bldMap = new Map<string, typeof stores>();
  stores.forEach((s) => {
    const key = s.bldNm || s.rdnmAdr;
    if (!bldMap.has(key)) bldMap.set(key, []);
    bldMap.get(key)!.push(s);
  });

  const buildingGroups = Array.from(bldMap.entries())
    .map(([bldNm, list]) => ({
      bldNm,
      address: list[0].rdnmAdr || list[0].lnoAdr,
      floors:  [...new Set(list.map((s) => s.flrNo).filter(Boolean))],
      bizTypes:[...new Set(list.map((s) => s.indsSclsNm).filter(Boolean))],
      count:   list.length,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return { regionName, totalCount: stores.length, stores, buildingGroups };
}

/* ── 실거래가 → 프롬프트 텍스트 ── */
export function commercialContextToText(ctx: CommercialContext): string {
  const lines = ctx.trades
    .map((t) => `  • ${t.dong} ${t.buildingName} ${t.floor}층 / ${t.area}㎡ / ${t.use} / ${t.amount}만원`)
    .join("\n");

  return `[국토교통부 상업업무용 실거래가 - ${ctx.latestYearMonth} 기준]
- 지역: ${ctx.regionName} (코드: ${ctx.sigunguCode})
- 조회 건수: ${ctx.sampleCount}건
- 평당 평균 거래금액: 약 ${ctx.avgAmountPerPyeong.toLocaleString()}만원/평
- 실거래 목록:
${lines}
(위 실거래 데이터를 기반으로 현실적인 매물 보증금·임대료를 추천하세요.)`;
}
