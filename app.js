const events = [
  {
    id: "tariff2018",
    date: "2018-03-01",
    title: "美国关税摩擦",
    short: "关税",
    desc: "美国对欧盟、加拿大、中国等贸易伙伴加征关税，冲击了全球供应链格局，实际上提高了美国民众消费成本且阻碍美国经济扩张。",
  },
  {
    id: "covid",
    date: "2020-03-01",
    title: "新冠大流行",
    short: "疫情",
    desc: "新冠大流行对全球经济造成了自二战以来最严重的冲击，导致生产停摆、供应链中断、消费萎缩及金融市场剧烈动荡。",
  },
  {
    id: "ukraine",
    date: "2022-02-01",
    title: "俄乌冲突爆发",
    short: "俄乌",
    desc: "事件双方是粮食、能源出口大国，冲突爆发导致粮食、能源供应受阻、价格大涨。同时冲突及其引发的经济制裁阻碍了供应链，影响了欧洲乃至全球的制造业生产。",
  },
  {
    id: "svb",
    date: "2023-03-01",
    title: "硅谷银行破产",
    short: "硅谷银行",
    desc: "美国硅谷银行因遭严重挤兑、资不抵债，被关闭并接管，是自金融危机以来美国最大的银行倒闭案。其倒闭被指与美联储急剧加息有关。",
  },
  {
    id: "reciprocal2025",
    date: "2025-04-01",
    title: "美国全面“对等关税”",
    short: "对等关税",
    desc: "美国宣布面向海外施加“对等关税”，全球供应链再次面临重大不确定性，导致消费品价格水涨船高，美国经济“滞涨”风险增加。",
  },
  {
    id: "renovation",
    date: "2025-07-01",
    title: "美联储“装修门”",
    short: "装修门",
    desc: "美联储总部大楼翻新工程严重超支，引发总统不满，并因此展开调查。此举被认为是施压美联储降息、甚至试图撤换美联储官员的“政治筹码”。",
  },
  {
    id: "hormuz",
    date: "2026-03-01",
    title: "霍尔木兹海峡被封",
    short: "霍尔木兹",
    desc: "美以伊军事冲突升级，全球能源供给与贸易的关键航道之一的“霍尔木兹海峡”被封锁，供应链危机再度推高通胀。",
  },
];

const chartSource = window.powellChartData || { metrics: [] };
const metricDisplayOverrides = {
  rate: {
    name: "利率过山车",
    subtitle: "在鲍威尔任期内美国联邦基金利率大起大落",
  },
  gold: {
    subtitle: "月K · 美元/盎司",
  },
  oil: {
    subtitle: "月K · 美元/桶",
  },
  dollar: {
    subtitle: "月K",
  },
  sp500: {
    subtitle: "月K",
  },
};
const metrics = chartSource.metrics.map((metric) => ({
  ...metric,
  ...(metricDisplayOverrides[metric.id] || {}),
  points: metric.series.map(([date, value]) => ({
    date,
    value,
    displayValue: value,
  })),
}));

const chartAnnotations = {
  rate: [
    {
      date: "2023-07-27",
      type: "high",
      valueLabel: "5.50%",
      title: "2000年互联网泡沫破裂后新高",
    },
    {
      date: "2020-03-16",
      type: "low",
      valueLabel: "0.25%",
      title: "2008年金融危机以来新低",
    },
  ],
  inflation: [
    {
      date: "2022-06-01",
      type: "high",
      valueLabel: "9.10%",
      title: "1981年12月以来新高",
    },
  ],
  unemployment: [
    {
      date: "2020-04-01",
      type: "high",
      valueLabel: "14.8%",
      title: "历史最高",
    },
  ],
  gold: [
    {
      date: "2026-01-30",
      type: "high",
      title: "2026年1月29日：历史最高",
    },
  ],
  oil: [
    {
      date: "2020-04-30",
      type: "low",
      valueLabel: "负油价",
      title: "2020年4月20日：部分合约历史首现“负油价”",
    },
    {
      date: "2022-03-31",
      type: "high",
      title: "2022年3月7日：2008年7月以来新高",
    },
  ],
  dollar: [
    {
      date: "2022-09-30",
      type: "high",
      title: "2022年9月28日：2002年5月以来新高",
    },
  ],
  sp500: [
    {
      date: "last",
      type: "high",
      title: "历史新高",
    },
  ],
};

const rateCycles = [
  {
    id: "qe-end",
    type: "hike",
    start: "2018-02-05",
    end: "2019-06-30",
    range: "2018年2月-2019年6月",
    title: "结束QE",
    change: "+100个基点",
    desc: "延续前任耶伦的加息步伐，结束上一轮宽松政策。",
  },
  {
    id: "insurance-cut",
    type: "cut",
    start: "2019-08-01",
    end: "2020-01-31",
    range: "2019年8月-2020年1月",
    title: "预防性降息",
    change: "-75个基点",
    desc: "为应对贸易摩擦导致的增长放缓，在经济周期中段降息。",
  },
  {
    id: "zero-rate",
    type: "zero",
    start: "2020-03-01",
    end: "2022-03-16",
    range: "2020年3月-2022年3月",
    title: "零利率",
    change: "-150个基点",
    desc: "新冠疫情暴发，紧急将利率区间下限降至0%。",
  },
  {
    id: "hard-hike",
    type: "hike",
    start: "2022-03-17",
    end: "2023-07-31",
    range: "2022年3月-2023年7月",
    title: "激进式加息",
    change: "+525个基点",
    desc: "供应链崩溃导致40年未见的高通胀，开启“暴力”加息。",
  },
  {
    id: "normalization-cut",
    type: "cut",
    start: "2024-09-01",
    end: "2025-12-31",
    range: "2024年9月-2025年12月",
    title: "常态化转向",
    change: "-175个基点",
    desc: "在通胀回落与经济软着陆的预期下，开启降息周期。",
  },
];

const presets = [
  { id: "all", label: "全部", start: "2018-02-05", end: "2026-05-15" },
  { id: "trump1", label: "特朗普1.0", start: "2018-02-05", end: "2021-01-20" },
  { id: "biden", label: "拜登任期", start: "2021-01-20", end: "2025-01-20" },
  { id: "trump2", label: "特朗普2.0", start: "2025-01-20", end: "2026-05-15" },
];

const heroContent = {
  powell: {
    mode: "美联储权力交接",
    title: "再见，鲍威尔",
    leadType: "quote",
    lead: "他经受住了新冠大流行和美联储独立性危机的考验。以上任一件事，都足以让他青史留名。",
    source: "知名央行政策研究者、沃顿商学院副教授彼得·康提-布朗",
    picksTitle: "深度回顾",
    viewAll: "./picks.html?scope=powell",
  },
  warsh: {
    mode: "美联储权力交接",
    title: "你好，凯文·沃什",
    titleHtml: '<span class="hero-title-line">你好，</span><span class="hero-title-line">凯文·沃什</span>',
    leadType: "warsh-bubbles",
    bubbles: ["雅诗兰黛", "豪门赘婿", "最年轻理事", "最有钱主席", "通胀猎手", "降息", "缩表", "特朗普"],
    lead: "绝对不会成为总统的傀儡！",
    source: "凯文·沃什，4月21日美联储主席候选人听证会发言",
    picksTitle: "沃什相关",
    viewAll: "./picks.html?scope=warsh",
  },
};

const pickSets = {
  powell: [
    {
      type: "文章",
      title: "8年功过",
      href: "https://xnews.jin10.com/details/218700?id=218700",
      thumb: "thumb-powell-era",
    },
    {
      type: "文章",
      title: "鲍氏金句",
      href: "https://xnews.jin10.com/details/217926?id=217926",
      thumb: "thumb-powell-quotes",
    },
    {
      type: "文章",
      title: "留任理事",
      href: "https://xnews.jin10.com/details/218204?id=218204",
      thumb: "thumb-powell-board",
    },
    {
      type: "文章",
      title: "美联储VS特朗普",
      href: "https://xnews.jin10.com/details/217920?id=217920",
      thumb: "thumb-powell-fed",
    },
  ],
  warsh: [
    {
      type: "文章",
      title: "阅读沃什证词全文",
      meta: "证词全文：包含沃什的背景以及对美联储的领导方向",
      href: "https://xnews.jin10.com/details/217133?id=217133",
      thumb: "thumb-warsh-testimony",
    },
    {
      type: "文章",
      title: "观察沃什的沟通机制",
      meta: "美联储沟通机制",
      href: "https://xnews.jin10.com/details/218402?id=218402",
      thumb: "thumb-warsh-closed",
    },
    {
      type: "文章",
      title: "理解央行沟通逻辑重塑",
      meta: "美联储沟通机制",
      href: "https://xnews.jin10.com/details/217394?id=217394",
      thumb: "thumb-warsh-voice",
    },
    {
      type: "文章",
      title: "理解通胀目标再定义",
      meta: "对通胀的看法",
      href: "https://xnews.jin10.com/details/217411?id=217411",
      thumb: "thumb-warsh-inflation",
    },
    {
      type: "文章",
      title: "评估沃什的独立性平衡术",
      meta: "美联储独立性",
      href: "https://xnews.jin10.com/details/218238?id=218238",
      thumb: "thumb-warsh-balance",
    },
    {
      type: "文章",
      title: "美联储罕见爆发“四人分歧”！摩根大通：这或是给新主席的“下马威”",
      meta: "沃什上任后的挑战",
      href: "https://xnews.jin10.com/details/218007?id=218007",
      thumb: "thumb-warsh-challenge",
    },
    {
      type: "文章",
      title: "沃什给华尔街带来了“坏消息”，美股估值逻辑面临重构",
      meta: "对美股估值的影响",
      href: "https://xnews.jin10.com/details/218065?id=218065",
      thumb: "thumb-warsh-stocks",
    },
  ],
};

let activeEventId = "hormuz";
let activeChartDate = "2026-03-01";
let activePresetId = "all";
let activeRange = { ...presets[0] };
let activeHero = "powell";
let activeRateCycleId = null;

const timelineTrack = document.querySelector("#timelineTrack");
const timelineScroll = document.querySelector("#timelineScroll");
const chartsEl = document.querySelector("#charts");
const presetRow = document.querySelector("#presetRow");
const timelineDetail = document.querySelector("#timelineDetail");
const toast = document.querySelector("#toast");
const hero = document.querySelector(".hero");
const heroTitle = document.querySelector("#hero-title");
const heroLead = document.querySelector("#heroLead");
const heroMode = document.querySelector("#heroMode");
const heroSwipeHint = document.querySelector("#heroSwipeHint");
const personIntroBtn = document.querySelector("#personIntroBtn");
const profilePage = document.querySelector("#profilePage");
const profileClose = document.querySelector("#profileClose");
const pickRail = document.querySelector("#pickRail");
const picksTitle = document.querySelector("#picks-title");
const viewAllPicks = document.querySelector("#viewAllPicks");
const commentBtn = document.querySelector("#commentSection");

const toTime = (date) => new Date(`${date}T00:00:00`).getTime();
const fmtDate = (date) => date.replaceAll("-", ".");
const fmtMonth = (date) => {
  const [year, month] = date.split("-");
  return `${year}年${Number(month)}月`;
};
const toDateString = (time) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function formatValue(metric, value) {
  if (value == null) return "待接入";
  const precision = metric.precision ?? (metric.unit === "%" ? 1 : 2);
  const formatted = Number(value).toLocaleString("zh-CN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: precision,
  });
  return metric.unit === "%" ? `${formatted}%` : formatted;
}

function getPointAt(metric, date) {
  if (metric.frequency === "monthly") {
    const sameMonthPoint = metric.points.find((point) => point.date.slice(0, 7) === date.slice(0, 7));
    if (sameMonthPoint) return sameMonthPoint;
  }

  const target = toTime(date);
  let result = metric.points[0];
  for (const point of metric.points) {
    if (toTime(point.date) > target) break;
    result = point;
  }
  return result || { date, value: null, displayValue: null };
}

function getNearestPoint(metric, date) {
  const target = toTime(date);
  return metric.points.reduce((nearest, point) => {
    return Math.abs(toTime(point.date) - target) < Math.abs(toTime(nearest.date) - target) ? point : nearest;
  }, metric.points[0]);
}

function formatPointDate(metric, date) {
  return fmtMonth(date);
}

function formatAxisMonth(date) {
  return fmtMonth(date);
}

function resolveAnnotationPoint(metric, annotation) {
  if (annotation.date === "last") return metric.points.at(-1);
  return metric.points.find((point) => point.date === annotation.date) || getNearestPoint(metric, annotation.date);
}

function getMetricAnnotations(metric) {
  return (chartAnnotations[metric.id] || [])
    .map((annotation) => ({
      ...annotation,
      point: resolveAnnotationPoint(metric, annotation),
    }))
    .filter((annotation) => annotation.point);
}

function getAnnotationForPoint(metric, point) {
  return getMetricAnnotations(metric).find((annotation) => annotation.point.date === point.date);
}

function getActiveEvent() {
  return events.find((event) => event.id === activeEventId) || events[0];
}

function eventInRange(event) {
  const time = toTime(event.date);
  return time >= toTime(activeRange.start) && time <= toTime(activeRange.end);
}

function interpolateValue(metric, date) {
  const target = toTime(date);
  const points = metric.points;
  if (target <= toTime(points[0].date)) return points[0].value;
  if (target >= toTime(points.at(-1).date)) return points.at(-1).value;

  for (let index = 0; index < points.length - 1; index += 1) {
    const current = points[index];
    const next = points[index + 1];
    const currentTime = toTime(current.date);
    const nextTime = toTime(next.date);
    if (target >= currentTime && target <= nextTime) {
      const progress = (target - currentTime) / (nextTime - currentTime);
      return current.value + (next.value - current.value) * progress;
    }
  }

  return points.at(-1).value;
}

function pointsInRange(metric) {
  const start = toTime(activeRange.start);
  const end = toTime(activeRange.end);
  const innerPoints = metric.points.filter((point) => {
    const time = toTime(point.date);
    return time > start && time < end;
  });
  return [
    { date: activeRange.start, value: interpolateValue(metric, activeRange.start) },
    ...innerPoints,
    { date: activeRange.end, value: interpolateValue(metric, activeRange.end) },
  ];
}

function actualPointsInRange(metric) {
  const start = toTime(activeRange.start);
  const end = toTime(activeRange.end);
  return metric.points.filter((point) => {
    const time = toTime(point.date);
    return time >= start && time <= end;
  });
}

function clampRange(startTime, endTime) {
  const min = toTime(presets[0].start);
  const max = toTime(presets[0].end);
  const minSpan = 1000 * 60 * 60 * 24 * 210;
  let start = Math.max(startTime, min);
  let end = Math.min(endTime, max);
  if (end - start < minSpan) {
    const mid = (start + end) / 2;
    start = Math.max(mid - minSpan / 2, min);
    end = Math.min(mid + minSpan / 2, max);
  }
  return {
    id: "custom",
    label: "自定义区间",
    start: toDateString(start),
    end: toDateString(end),
  };
}

function renderPresets() {
  presetRow.innerHTML = presets
    .map(
      (preset) =>
        `<button class="preset-chip ${preset.id === activePresetId ? "is-active" : ""}" type="button" data-preset="${
          preset.id
        }">${preset.label}</button>`
    )
    .join("");
}

function renderTimeline() {
  const start = toTime(activeRange.start);
  const end = toTime(activeRange.end);
  const visibleEvents = events.filter(eventInRange);
  let trackWidth = Math.max(720, visibleEvents.length * 112);
  const minDotGap = 54;
  const positions = visibleEvents.map((event) => {
    const ratio = (toTime(event.date) - start) / (end - start);
    return Math.max(28, Math.min(trackWidth - 28, ratio * trackWidth));
  });

  for (let index = 1; index < positions.length; index += 1) {
    if (positions[index] - positions[index - 1] < minDotGap) {
      positions[index] = positions[index - 1] + minDotGap;
    }
  }

  if (positions.at(-1) > trackWidth - 28) {
    trackWidth = positions.at(-1) + 28;
  }
  timelineTrack.style.width = `${trackWidth}px`;

  timelineTrack.innerHTML = visibleEvents
    .map((event, index) => {
      const left = positions[index];
      const laneClass = index % 2 === 1 ? "is-alt" : "";
      return `
        <button
          class="event-dot ${laneClass} ${event.id === activeEventId ? "is-active" : ""}"
          type="button"
          style="left:${left}px"
          data-event="${event.id}"
          aria-label="${fmtDate(event.date)} ${event.title}"
        >
          <small>${event.date.slice(2, 7).replace("-", ".")}</small>
          <span>${event.short}</span>
        </button>
      `;
    })
    .join("");

  let tipLeft = timelineScroll.clientWidth / 2;
  const activeDot = timelineTrack.querySelector(".event-dot.is-active");
  if (activeDot) {
    const left = Number.parseFloat(activeDot.style.left);
    const maxScrollLeft = Math.max(0, trackWidth - timelineScroll.clientWidth);
    const nextScrollLeft = Math.min(maxScrollLeft, Math.max(0, left - timelineScroll.clientWidth / 2));
    tipLeft = Math.max(22, Math.min(timelineScroll.clientWidth - 22, left - nextScrollLeft));
    timelineScroll.scrollTo({
      left: nextScrollLeft,
      behavior: "smooth",
    });
  }
  renderTimelineDetail(tipLeft);
}

function renderCharts() {
  const selectedTime = toTime(activeChartDate);

  chartsEl.innerHTML = metrics
    .map((metric) => {
      const points = pointsInRange(metric);
      const drawablePoints = points.length > 1 ? points : metric.points;
      const values = drawablePoints.map((point) => point.value);
      const min = Math.min(...values);
      const max = Math.max(...values);
      const padding = Math.max((max - min) * 0.18, max === min ? 1 : 0);
      const yMin = min - padding;
      const yMax = max + padding;
      const start = toTime(activeRange.start);
      const end = toTime(activeRange.end);
      const width = 320;
      const height = 168;
      const top = 18;
      const bottom = 132;
      const left = 14;
      const right = 306;

      const xForTime = (time) => left + ((time - start) / (end - start)) * (right - left);
      const xFor = (date) => xForTime(toTime(date));
      const yFor = (value) => bottom - ((value - yMin) / (yMax - yMin || 1)) * (bottom - top);
      const cycleBands =
        metric.id === "rate"
          ? rateCycles
              .map((cycle) => {
                const cycleStart = Math.max(toTime(cycle.start), start);
                const cycleEnd = Math.min(toTime(cycle.end), end);
                if (cycleEnd <= cycleStart) return "";
                const bandX = xForTime(cycleStart);
                const bandWidth = Math.max(1, xForTime(cycleEnd) - bandX);
                const fill =
                  cycle.type === "hike"
                    ? "rgba(228,191,120,.18)"
                    : cycle.type === "cut"
                      ? "rgba(40,104,165,.12)"
                      : "rgba(105,113,129,.09)";
                return `<rect class="rate-cycle-band" x="${bandX.toFixed(2)}" y="${top}" width="${bandWidth.toFixed(
                  2
                )}" height="${bottom - top}" fill="${fill}" />`;
              })
              .join("")
          : "";
      const path = drawablePoints
        .map((point, index) => `${index === 0 ? "M" : "L"} ${xFor(point.date).toFixed(2)} ${yFor(point.value).toFixed(2)}`)
        .join(" ");
      const areaPath = `${path} L ${xFor(drawablePoints.at(-1).date).toFixed(2)} ${bottom} L ${xFor(
        drawablePoints[0].date
      ).toFixed(2)} ${bottom} Z`;
      const gradientId = `gradient-${metric.id}`;
      const areaFill = metric.id === "rate" ? "" : `<path d="${areaPath}" fill="url(#${gradientId})" />`;
      const buildExtremeMark = (annotation) => {
        const { point } = annotation;
        const pointX = xFor(point.date);
        const pointY = yFor(point.value);
        if (pointX < left || pointX > right) return "";
        const anchor = pointX > (left + right) / 2 ? "end" : "start";
        const labelX = anchor === "end" ? Math.max(left + 4, pointX - 7) : Math.min(right - 4, pointX + 7);
        const valueY = Math.max(top + 10, Math.min(bottom - 6, pointY - 9));
        return `
          <g class="chart-extreme chart-extreme-${annotation.type}">
            <circle class="chart-high-dot" cx="${pointX.toFixed(2)}" cy="${pointY.toFixed(2)}" r="4.2" />
            <text class="extreme-value-label" x="${labelX.toFixed(2)}" y="${valueY.toFixed(2)}" text-anchor="${anchor}">${annotation.valueLabel || formatValue(
              metric,
              point.displayValue
            )}</text>
          </g>
        `;
      };
      const extremeMarks = getMetricAnnotations(metric).map(buildExtremeMark).join("");
      const selectedPoint = getPointAt(metric, activeChartDate);
      const selectedValue = selectedPoint.displayValue;
      const selectedPlotValue = selectedPoint.value;
      const selectedX = xFor(selectedPoint.date);
      const selectedY = yFor(selectedPlotValue);
      const selectedPointTime = toTime(selectedPoint.date);
      const showSelected = selectedPointTime >= start && selectedPointTime <= end && selectedTime >= start && selectedTime <= end;
      const selectedLabelX = Math.min(selectedX + 7, right - 58);
      const selectedValueY = Math.max(selectedY - 8, 13);
      const first = drawablePoints[0];
      const last = drawablePoints.at(-1);
      const delta = last.value - first.value;
      const deltaText = `${delta >= 0 ? "+" : ""}${metric.unit === "%" ? delta.toFixed(2) : Math.round(delta).toLocaleString("zh-CN")}${
        metric.unit
      }`;
      const activeRateCycle =
        metric.id === "rate"
          ? rateCycles.find(
              (cycle) => cycle.id === activeRateCycleId && toTime(cycle.end) >= start && toTime(cycle.start) <= end
            )
          : null;
      const rateCycleDetail = activeRateCycle
        ? `
          <div class="rate-cycle-detail ${activeRateCycle.type}" role="status">
            <span>${activeRateCycle.range}</span>
            <strong>${activeRateCycle.title}<em>${activeRateCycle.change}</em></strong>
            <p>${activeRateCycle.desc}</p>
          </div>
        `
        : "";

      return `
        <article class="chart-card">
          <header>
            <div>
              <h3>${metric.name}</h3>
              <p>${metric.subtitle}</p>
            </div>
            <div class="metric-value">
              <strong>${formatValue(metric, selectedValue)}</strong>
              <small>${showSelected ? formatPointDate(metric, selectedPoint.date) : deltaText}</small>
            </div>
          </header>
          <svg class="chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${metric.name} 折线图" data-chart="${metric.id}">
            <defs>
              <linearGradient id="${gradientId}" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stop-color="${metric.color}" stop-opacity="0.26" />
                <stop offset="100%" stop-color="${metric.color}" stop-opacity="0" />
              </linearGradient>
              <filter id="watermark-black-${metric.id}" color-interpolation-filters="sRGB">
                <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
              </filter>
            </defs>
            ${cycleBands}
            <path d="M ${left} ${top} H ${right}" stroke="rgba(16,21,31,.08)" />
            <path d="M ${left} ${(top + bottom) / 2} H ${right}" stroke="rgba(16,21,31,.08)" />
            <path d="M ${left} ${bottom} H ${right}" stroke="rgba(16,21,31,.1)" />
            ${areaFill}
            <path d="${path}" fill="none" stroke="${metric.color}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
            ${extremeMarks}
            ${
              showSelected
                ? `
                  <path d="M ${selectedX.toFixed(2)} ${top} V ${bottom}" stroke="#111824" stroke-width="1.1" stroke-dasharray="4 4" />
                  <circle cx="${selectedX.toFixed(2)}" cy="${selectedY.toFixed(2)}" r="4.8" fill="${metric.color}" stroke="#fff" stroke-width="2" />
                  <text class="selected-label" x="${selectedLabelX.toFixed(2)}" y="${selectedValueY.toFixed(2)}">${formatValue(
                    metric,
                    selectedValue
                  )}</text>
                `
                : ""
            }
            <text class="axis-text" x="${left}" y="154">${formatAxisMonth(first.date)}</text>
            <text class="axis-text" x="${right - 58}" y="154">${formatAxisMonth(last.date)}</text>
            <image href="./assets/jin10-logo.svg" x="226" y="104" width="74" height="22" opacity="0.06" filter="url(#watermark-black-${metric.id})" pointer-events="none" />
            <rect class="chart-hitbox" x="${left}" y="${top}" width="${right - left}" height="${bottom - top}" fill="transparent" />
          </svg>
          ${rateCycleDetail}
        </article>
      `;
    })
    .join("");
}

function renderTimelineDetail(tipLeft = 180) {
  const activeEvent = getActiveEvent();
  timelineDetail.style.setProperty("--tip-left", tipLeft + "px");
  timelineDetail.innerHTML =
    '<div class="timeline-detail-head"><span>' +
    fmtMonth(activeEvent.date) +
    '</span><strong>' +
    activeEvent.title +
    '</strong></div><p>' +
    activeEvent.desc +
    "</p>";
}

function selectEvent(eventId) {
  activeEventId = eventId;
  if (!eventInRange(getActiveEvent())) {
    activeRange = { ...presets[0] };
    activePresetId = "all";
  }
  activeChartDate = getActiveEvent().date;
  renderAll();
}

function setPreset(presetId) {
  const preset = presets.find((item) => item.id === presetId);
  if (!preset) return;
  activeRange = { ...preset };
  activePresetId = preset.id;
  const visibleEvents = events.filter(eventInRange);
  if (visibleEvents.length && !visibleEvents.some((event) => event.id === activeEventId)) {
    activeEventId = visibleEvents.at(-1).id;
  }
  const chartTime = toTime(activeChartDate);
  if (chartTime < toTime(activeRange.start) || chartTime > toTime(activeRange.end)) {
    activeChartDate = visibleEvents.at(-1)?.date || activeRange.end;
  }
  renderAll();
}

function renderPicks() {
  const picks = pickSets[activeHero];
  pickRail.innerHTML = picks
    .map((item) => {
      const thumb = `<span class="thumb ${item.thumb}">
        ${item.video ? '<span class="play-icon" aria-hidden="true"></span>' : ""}
      </span>`;
      const content = `${thumb}<strong>${item.title}</strong>`;
      if (item.placeholder) {
        return `<article class="pick-card pick-placeholder">${content}</article>`;
      }
      return `<a class="pick-card ${item.video ? "video-card" : ""}" href="${item.href}" target="_blank" rel="noreferrer">${content}</a>`;
    })
    .join("");
}

function setHero(nextHero) {
  activeHero = nextHero;
  const content = heroContent[activeHero];
  hero.classList.toggle("is-warsh", activeHero === "warsh");
  document.body.classList.toggle("is-warsh-view", activeHero === "warsh");
  heroMode.textContent = content.mode;
  heroTitle.innerHTML = content.titleHtml || content.title;
  heroLead.classList.toggle("is-quote", content.leadType === "quote");
  heroLead.classList.toggle("is-warsh-bubbles", content.leadType === "warsh-bubbles");
  if (content.leadType === "quote") {
    heroLead.innerHTML = `<span class="quote-text">${content.lead}</span><span class="quote-source">${content.source}</span>`;
  } else if (content.leadType === "warsh-bubbles") {
    heroLead.innerHTML = `
      <span class="warsh-bubble-stage" aria-hidden="true">
        ${content.bubbles.map((bubble) => `<span class="warsh-word-bubble">${bubble}</span>`).join("")}
      </span>
      <span class="warsh-final-quote">
        <span class="quote-text">${content.lead}</span>
        <span class="quote-source">${content.source}</span>
      </span>
    `;
  } else {
    heroLead.textContent = content.lead;
  }
  picksTitle.textContent = content.picksTitle;
  viewAllPicks.href = content.viewAll;
  renderPicks();
}

function renderAll() {
  renderPresets();
  renderTimeline();
  renderCharts();
  renderPicks();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 1800);
}

function getChartClickState(event, svg) {
  const bounds = svg.getBoundingClientRect();
  const viewBoxWidth = 320;
  const viewBoxHeight = 168;
  const chartLeft = 14;
  const chartRight = 306;
  const viewX = ((event.clientX - bounds.left) / bounds.width) * viewBoxWidth;
  const viewY = ((event.clientY - bounds.top) / bounds.height) * viewBoxHeight;
  const clampedX = Math.max(chartLeft, Math.min(chartRight, viewX));
  const ratio = (clampedX - chartLeft) / (chartRight - chartLeft);
  const time = toTime(activeRange.start) + ratio * (toTime(activeRange.end) - toTime(activeRange.start));
  return {
    x: clampedX,
    y: Math.max(18, Math.min(132, viewY)),
    date: toDateString(time),
  };
}

function pickChartDate(event, svg) {
  return getChartClickState(event, svg).date;
}

function getChartPointPosition(metric, point) {
  const points = pointsInRange(metric);
  const drawablePoints = points.length > 1 ? points : metric.points;
  const values = drawablePoints.map((item) => item.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const padding = Math.max((max - min) * 0.18, max === min ? 1 : 0);
  const yMin = min - padding;
  const yMax = max + padding;
  const start = toTime(activeRange.start);
  const end = toTime(activeRange.end);
  const top = 18;
  const bottom = 132;
  const left = 14;
  const right = 306;
  const pointTime = toTime(point.date);

  if (pointTime < start || pointTime > end) return null;

  return {
    x: left + ((pointTime - start) / (end - start)) * (right - left),
    y: bottom - ((point.value - yMin) / (yMax - yMin || 1)) * (bottom - top),
    top,
    bottom,
  };
}

function showChartProbe(svg, metric, point) {
  const position = getChartPointPosition(metric, point);
  if (!position) return;

  svg.querySelectorAll(".chart-probe-line, .chart-probe-dot").forEach((node) => node.remove());

  const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
  line.setAttribute("class", "chart-probe-line");
  line.setAttribute("d", `M ${position.x.toFixed(2)} ${position.top} V ${position.bottom}`);

  const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  dot.setAttribute("class", "chart-probe-dot");
  dot.setAttribute("cx", position.x.toFixed(2));
  dot.setAttribute("cy", position.y.toFixed(2));
  dot.setAttribute("r", "4");

  const hitbox = svg.querySelector(".chart-hitbox");
  if (hitbox) {
    hitbox.before(line, dot);
  } else {
    svg.append(line, dot);
  }
}

function showChartToast(svg, metric, point, options = {}) {
  const card = svg.closest(".chart-card");
  if (!card) return;
  card.querySelector(".chart-toast")?.remove();
  showChartProbe(svg, metric, point);

  const toastTitle = options.title || (metric.id === "rate" ? "联邦基金利率(上限)" : metric.name);
  const toastValue = options.valueLabel || formatValue(metric, point.displayValue);
  const chartToast = document.createElement("div");
  chartToast.className = "chart-toast";
  chartToast.innerHTML = `
    <span>${toastTitle}</span>
    <strong>${toastValue}</strong>
    <small>${formatPointDate(metric, point.date)}</small>
  `;
  card.append(chartToast);

  window.clearTimeout(card.chartToastTimer);
  card.chartToastTimer = window.setTimeout(() => chartToast.remove(), 2200);
}

function getRateCycleAtDate(date) {
  const target = toTime(date);
  return rateCycles.find((cycle) => target >= toTime(cycle.start) && target <= toTime(cycle.end));
}

function showRateCycleDetail(cycleId) {
  activeRateCycleId = cycleId;
  renderCharts();
}

timelineTrack.addEventListener("click", (event) => {
  const button = event.target.closest("[data-event]");
  if (!button) return;
  selectEvent(button.dataset.event);
});

presetRow.addEventListener("click", (event) => {
  const button = event.target.closest("[data-preset]");
  if (!button) return;
  setPreset(button.dataset.preset);
});

chartsEl.addEventListener("click", (event) => {
  const svg = event.target.closest(".chart-svg");
  if (!svg) return;
  const metric = metrics.find((item) => item.id === svg.dataset.chart);
  if (!metric) return;
  const clickState = getChartClickState(event, svg);
  const nearestPoint = getNearestPoint(metric, clickState.date);

  if (metric.id === "rate") {
    const pointPosition = getChartPointPosition(metric, nearestPoint);
    const isNearLine = pointPosition && Math.abs(clickState.y - pointPosition.y) <= 12;
    const cycle = getRateCycleAtDate(clickState.date);
    if (cycle && !isNearLine) {
      showRateCycleDetail(cycle.id);
      return;
    }
    activeRateCycleId = null;
    svg.closest(".chart-card")?.querySelector(".rate-cycle-detail")?.remove();
  }

  const annotation = getAnnotationForPoint(metric, nearestPoint);
  showChartToast(
    svg,
    metric,
    nearestPoint,
    annotation ? { title: annotation.title, valueLabel: annotation.valueLabel } : {}
  );
});

let heroDragStartX = null;
hero.addEventListener("pointerdown", (event) => {
  heroDragStartX = event.clientX;
});

hero.addEventListener("pointerup", (event) => {
  if (heroDragStartX == null) return;
  const delta = event.clientX - heroDragStartX;
  heroDragStartX = null;
  if (Math.abs(delta) < 42) return;
  setHero(delta < 0 ? "warsh" : "powell");
});

hero.addEventListener("pointercancel", () => {
  heroDragStartX = null;
});

heroSwipeHint.addEventListener("click", () => {
  setHero(activeHero === "powell" ? "warsh" : "powell");
});

personIntroBtn.addEventListener("click", () => {
  profilePage.classList.add("is-open");
  profilePage.setAttribute("aria-hidden", "false");
});

profileClose.addEventListener("click", () => {
  profilePage.classList.remove("is-open");
  profilePage.setAttribute("aria-hidden", "true");
});

profilePage.addEventListener("click", (event) => {
  if (event.target !== profilePage) return;
  profilePage.classList.remove("is-open");
  profilePage.setAttribute("aria-hidden", "true");
});

document.querySelector("#downloadApp").addEventListener("click", () => {
  window.open("https://a.app.qq.com/o/simple.jsp?pkgname=com.jin10", "_blank", "noopener,noreferrer");
});

commentBtn.addEventListener("click", () => {
  showToast("评论区功能待接入");
});

const pressureCard = document.querySelector(".trump-pressure");
if (pressureCard) {
  const pressureTrigger = document.querySelector(".section-head--sub") || pressureCard;
  const playPressureAnimation = () => pressureCard.classList.add("is-pressure-ready");
  if ("IntersectionObserver" in window) {
    const pressureObserver = new IntersectionObserver(
      (entries, observer) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        playPressureAnimation();
        observer.disconnect();
      },
      { threshold: 0.64 }
    );
    pressureObserver.observe(pressureTrigger);
  } else {
    playPressureAnimation();
  }
}

const investigationCard = document.querySelector(".pressure-card.investigation");
if (investigationCard) {
  const playInvestigationAnimation = () => investigationCard.classList.add("is-investigation-ready");
  if ("IntersectionObserver" in window) {
    const investigationObserver = new IntersectionObserver(
      (entries, observer) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        playInvestigationAnimation();
        observer.disconnect();
      },
      { threshold: 0.48 }
    );
    investigationObserver.observe(investigationCard);
  } else {
    playInvestigationAnimation();
  }
}

document.querySelector("#sharePage").addEventListener("click", async () => {
  const shareData = {
    title: "鲍威尔时代落幕",
    text: "八年美联储掌舵，利率、通胀与全球市场曲线如何收场？",
    url: window.location.href,
  };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
      showToast("分享面板已打开");
      return;
    }
    await navigator.clipboard.writeText(window.location.href);
    showToast("专题链接已复制");
  } catch {
    showToast("分享未完成，可稍后重试");
  }
});

renderAll();
