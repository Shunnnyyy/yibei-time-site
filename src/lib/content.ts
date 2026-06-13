import {
  CalendarDays,
  MapPin,
  Monitor,
} from "lucide-react";
import type { ComponentType } from "react";
import type { CoffeeIconId } from "@/components/coffee-icons";
import storyEntries from "../content/stories.json";
import type {
  ConversationFormat,
  Locale,
  LocationId,
  TimeZoneId,
} from "./booking";

type Icon = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

type LocalizedText = Record<Locale, string>;

export type BookingOption<T extends string> = {
  id: T;
  label: LocalizedText;
  shortLabel: LocalizedText;
  description: LocalizedText;
  icon: Icon;
};

export type LocationOption = BookingOption<LocationId> & {
  timezone: TimeZoneId;
};

export type Story = {
  slug: string;
  title: LocalizedText;
  date: string;
  city: LocalizedText;
  summary: LocalizedText;
  status: LocalizedText;
  image: string;
  imageAlt: LocalizedText;
  body: Record<Locale, string[]>;
};

export type CoffeeMethod = "all" | "pourover" | "espresso" | "coldbrew";
export type CoffeeScene = "morning" | "afternoon" | "anytime";
export type CoffeeFlavor = "fruity" | "nutty";
export type CoffeeTimeBand =
  | "08:00"
  | "10:00"
  | "12:00"
  | "14:00"
  | "16:00"
  | "18:00"
  | "20:00"
  | "22:00"
  | "anytime";
export type CoffeeAgeBand =
  | "teen"
  | "student"
  | "young_adult"
  | "adult"
  | "open";
export type CoffeeSize = "sm" | "md" | "lg";

export type CoffeeProfile = {
  id: string;
  name: LocalizedText;
  scene: CoffeeScene;
  flavorFamily: CoffeeFlavor;
  roast: 1 | 2 | 3;
  acid: 1 | 2 | 3;
  method: Exclude<CoffeeMethod, "all">;
  icon: CoffeeIconId;
  tag: LocalizedText;
  flavor: LocalizedText;
  description: LocalizedText;
  storySlug: string;
  timeBand: CoffeeTimeBand;
  ageBand: CoffeeAgeBand;
  baseSize: CoffeeSize;
  scatter: {
    x: number;
    y: number;
    rotate: number;
  };
  image: string;
  imageAlt: LocalizedText;
};

export const locales: Locale[] = ["zh", "en"];

export const siteCopy = {
  zh: {
    navStories: "故事",
    navCoffee: "咖啡",
    navBooking: "预约",
    language: "English",
    heroTitle: "一杯咖啡的时间，认识一个新朋友。",
    heroBody:
      "暑假想和不同的陌生人聊一会儿。咖啡喝完，聊天也结束。福州、多伦多和线上都可以。",
    heroNoteTitle: "一杯时间，不多不少",
    heroNoteBody:
      "你可以选择线下或线上。信息会通过邮件发给我确认。",
    coffeeFinderTitle: "找到适合你的一杯",
    coffeeFinderBody:
      "先凭感觉选一选，再从一杯咖啡走进一段故事。每个标志都藏着一种聊天的气味。",
    storiesTitle: "最近的故事",
    storiesBody: "真实聊天后会更新文章。现在先放项目笔记和路线计划。",
    readAll: "阅读全部",
    footerLeft: "一杯时间 · yibei.chat",
    footerRight: "一杯咖啡，一段真诚的对话。",
    storiesPageTitle: "故事和计划笔记",
    storiesPageBody:
      "这里会收集每一次咖啡聊天后的文章。现在先放开篇说明和福州、多伦多、线上聊天的安排。",
    backToStories: "返回故事",
  },
  en: {
    navStories: "Stories",
    navCoffee: "Coffee",
    navBooking: "Book",
    language: "中文",
    heroTitle: "One coffee, one honest conversation.",
    heroBody:
      "This summer I want to talk with different strangers. When the coffee ends, the chat ends. Fuzhou, Toronto, and online all work.",
    heroNoteTitle: "One cup of time",
    heroNoteBody:
      "You can choose in person or online. The booking details will be emailed to me.",
    coffeeFinderTitle: "Find your cup",
    coffeeFinderBody:
      "Choose by feeling, then enter a story through a cup. Each mark carries a different mood.",
    storiesTitle: "Recent stories",
    storiesBody:
      "Real stories will come after the chats. For now, these are project notes and route plans.",
    readAll: "Read all",
    footerLeft: "One Cup Time · yibei.chat",
    footerRight: "One coffee, one honest conversation.",
    storiesPageTitle: "Stories and notes",
    storiesPageBody:
      "This page will collect coffee chat stories. For now, it has the first notes and city plans.",
    backToStories: "Back to stories",
  },
};

export const coffeeFinderCopy = {
  zh: {
    eyebrow: "Coffee Notes",
    pageTitle: "选一杯，进入一个故事",
    pageBody:
      "不用想得太认真。点一个标志，或者顺着下面几个小问题，找到今天比较靠近的一杯。",
    homeCta: "去选一杯",
    allStories: "全部故事",
    backHome: "返回首页",
    openStory: "点击阅读故事",
    selectedLabel: "现在靠近",
    helperText: "答案只留在这一页，刷新后就会消失。",
    controlsTitle: "慢慢选",
    timeLabel: "聊天时间",
    ageLabel: "年龄段",
    timeSliderLabel: "选择聊天发生时间",
    ageSliderLabel: "选择聊天者年龄段",
    dialHint: "从一个小问题开始，让这一杯慢慢浮到前面。",
    timeBands: {
      "08:00": "08:00",
      "10:00": "10:00",
      "12:00": "12:00",
      "14:00": "14:00",
      "16:00": "16:00",
      "18:00": "18:00",
      "20:00": "20:00",
      "22:00": "22:00",
      anytime: "不限",
    },
    ageBands: {
      teen: "15-18",
      student: "大学生",
      young_adult: "初入职场",
      adult: "25+",
      open: "不公开",
    },
  },
  en: {
    eyebrow: "Coffee Notes",
    pageTitle: "Pick a cup, enter a story",
    pageBody:
      "No need to overthink it. Click a mark, or follow a few quiet questions to find a cup for now.",
    homeCta: "Open coffee finder",
    allStories: "All stories",
    backHome: "Back home",
    openStory: "Read story",
    selectedLabel: "Closest now",
    helperText: "Answers stay on this page and disappear after refresh.",
    controlsTitle: "Choose slowly",
    timeLabel: "Chat time",
    ageLabel: "Age range",
    timeSliderLabel: "Choose the chat time",
    ageSliderLabel: "Choose the person age range",
    dialHint: "Start with a small question and let one cup drift forward.",
    timeBands: {
      "08:00": "08:00",
      "10:00": "10:00",
      "12:00": "12:00",
      "14:00": "14:00",
      "16:00": "16:00",
      "18:00": "18:00",
      "20:00": "20:00",
      "22:00": "22:00",
      anytime: "Anytime",
    },
    ageBands: {
      teen: "15-18",
      student: "Student",
      young_adult: "First job",
      adult: "25+",
      open: "Private",
    },
  },
} satisfies Record<
  Locale,
  {
    eyebrow: string;
    pageTitle: string;
    pageBody: string;
    homeCta: string;
    allStories: string;
    backHome: string;
    openStory: string;
    selectedLabel: string;
    helperText: string;
    controlsTitle: string;
    timeLabel: string;
    ageLabel: string;
    timeSliderLabel: string;
    ageSliderLabel: string;
    dialHint: string;
    timeBands: Record<CoffeeTimeBand, string>;
    ageBands: Record<CoffeeAgeBand, string>;
  }
>;

export const coffeeProfiles: CoffeeProfile[] = [
  {
    id: "yirgacheffe",
    name: { zh: "埃塞俄比亚 耶加雪菲", en: "Ethiopia Yirgacheffe" },
    scene: "afternoon",
    flavorFamily: "fruity",
    roast: 1,
    acid: 3,
    method: "pourover",
    icon: "yirgacheffe",
    tag: { zh: "轻盈花果香", en: "Light floral fruit" },
    flavor: { zh: "柑橘 / 茉莉 / 清亮", en: "Citrus / jasmine / clean" },
    description: {
      zh: "适合喜欢轻盈、花香和明亮酸感的人。它像一个很容易开始的下午聊天。",
      en: "For people who like light body, floral notes, and bright acidity. It feels like an easy afternoon talk.",
    },
    storySlug: "why-one-cup",
    timeBand: "14:00",
    ageBand: "student",
    baseSize: "md",
    scatter: { x: 12, y: 22, rotate: -10 },
    image: "/images/story-online.jpg",
    imageAlt: {
      zh: "桌面上的咖啡、笔记本和电脑",
      en: "Coffee, notebook, and laptop on a desk",
    },
  },
  {
    id: "colombia-huila",
    name: { zh: "哥伦比亚 蕙兰", en: "Colombia Huila" },
    scene: "afternoon",
    flavorFamily: "nutty",
    roast: 2,
    acid: 2,
    method: "pourover",
    icon: "huila",
    tag: { zh: "坚果焦糖平衡", en: "Nutty caramel balance" },
    flavor: { zh: "坚果 / 巧克力 / 平衡", en: "Nutty / chocolate / balanced" },
    description: {
      zh: "适合第一次不知道怎么选的人。甜感和酸感都比较温和，像日常但不无聊的对话。",
      en: "A good first choice. Sweetness and acidity stay gentle, like a daily conversation that is not boring.",
    },
    storySlug: "fuzhou-summer-route",
    timeBand: "16:00",
    ageBand: "young_adult",
    baseSize: "lg",
    scatter: { x: 31, y: 14, rotate: 5 },
    image: "/images/story-fuzhou.jpg",
    imageAlt: {
      zh: "福州街道和城市建筑",
      en: "A Fuzhou street and city buildings",
    },
  },
  {
    id: "espresso-blend",
    name: { zh: "经典意式拼配", en: "Classic espresso blend" },
    scene: "morning",
    flavorFamily: "nutty",
    roast: 3,
    acid: 1,
    method: "espresso",
    icon: "espresso",
    tag: { zh: "意式浓郁油脂", en: "Rich espresso crema" },
    flavor: { zh: "可可 / 奶香 / 浓郁", en: "Cocoa / milk / rich" },
    description: {
      zh: "适合喜欢低酸、厚重和拿铁口感的人。它比较直接，也很适合短短的一杯时间。",
      en: "For people who like low acidity, heavy body, and latte texture. It is direct and works well for one short cup.",
    },
    storySlug: "toronto-online",
    timeBand: "10:00",
    ageBand: "adult",
    baseSize: "lg",
    scatter: { x: 58, y: 16, rotate: -3 },
    image: "/images/coffee-hero.jpg",
    imageAlt: {
      zh: "窗边热咖啡照片",
      en: "Hot coffee by a window",
    },
  },
  {
    id: "kenya-aa",
    name: { zh: "肯尼亚 AA", en: "Kenya AA" },
    scene: "morning",
    flavorFamily: "fruity",
    roast: 1,
    acid: 3,
    method: "coldbrew",
    icon: "kenya",
    tag: { zh: "高酸清爽提神", en: "Bright and energetic" },
    flavor: { zh: "乌梅 / 黑加仑 / 清爽", en: "Plum / blackcurrant / fresh" },
    description: {
      zh: "适合想要冰一点、果汁感强一点的人。冷萃后会更顺口，也更适合夏天。",
      en: "For people who want something cold and fruity. Cold brew makes it smoother and very summer-friendly.",
    },
    storySlug: "why-one-cup",
    timeBand: "08:00",
    ageBand: "teen",
    baseSize: "md",
    scatter: { x: 80, y: 22, rotate: 9 },
    image: "/images/story-online.jpg",
    imageAlt: {
      zh: "桌面上的咖啡、笔记本和电脑",
      en: "Coffee, notebook, and laptop on a desk",
    },
  },
  {
    id: "mandheling",
    name: { zh: "曼特宁 G1", en: "Mandheling G1" },
    scene: "anytime",
    flavorFamily: "nutty",
    roast: 3,
    acid: 1,
    method: "pourover",
    icon: "mandheling",
    tag: { zh: "低酸木质醇厚", en: "Low-acid and full" },
    flavor: { zh: "木质 / 草本 / 醇厚", en: "Woody / herbal / full" },
    description: {
      zh: "适合不喜欢酸味的人。它更沉稳，适合慢慢聊家乡、生活和最近的烦恼。",
      en: "For people who do not like sour coffee. It feels calm and suits slower talks about home and life.",
    },
    storySlug: "fuzhou-summer-route",
    timeBand: "20:00",
    ageBand: "adult",
    baseSize: "sm",
    scatter: { x: 19, y: 58, rotate: -7 },
    image: "/images/story-fuzhou.jpg",
    imageAlt: {
      zh: "福州街道和城市建筑",
      en: "A Fuzhou street and city buildings",
    },
  },
  {
    id: "toronto-cold-cup",
    name: { zh: "多伦多夏日冷杯", en: "Toronto summer cold cup" },
    scene: "anytime",
    flavorFamily: "fruity",
    roast: 2,
    acid: 2,
    method: "coldbrew",
    icon: "coldCup",
    tag: { zh: "夏日冰感干净", en: "Clean summer cold cup" },
    flavor: { zh: "焦糖 / 冰感 / 干净", en: "Caramel / cold / clean" },
    description: {
      zh: "适合线上或多伦多的夏天。风味不太尖锐，适合边散步边聊。",
      en: "Good for online chats or a Toronto summer. It is not too sharp, nice for walking and talking.",
    },
    storySlug: "toronto-online",
    timeBand: "anytime",
    ageBand: "open",
    baseSize: "md",
    scatter: { x: 71, y: 57, rotate: 4 },
    image: "/images/story-toronto.jpg",
    imageAlt: {
      zh: "多伦多湖边城市天际线",
      en: "Toronto skyline near the waterfront",
    },
  },
];

export const bookingCopy = {
  zh: {
    location: "地点",
    email: "邮箱",
    emailPlaceholder: "你的邮箱，用来确认预约",
    date: "日期",
    time: "时间",
    timezone: "时区",
    format: "方式",
    note: "备注（可选）",
    notePlaceholder: "你可以简单介绍自己，或者写想聊什么。",
    submit: "预约这一杯时间",
    sending: "正在发送预约",
    privacy:
      "提交后会把预约信息发到我的邮箱。你的信息不会公开显示在网站上。",
    successTitle: "预约已发送",
    successBody: "我收到邮件后会再回复你确认具体安排。",
    failureTitle: "预约暂时没有发出",
    missingEnv:
      "邮件服务还没有配置。上线前需要设置 Resend 环境变量。",
    genericError: "请稍后再试，或者直接邮件联系我。",
    timezoneHint: "线上聊天可以选择你更方便的时区。",
  },
  en: {
    location: "Place",
    email: "Email",
    emailPlaceholder: "Your email for booking confirmation",
    date: "Date",
    time: "Time",
    timezone: "Time zone",
    format: "Format",
    note: "Note (optional)",
    notePlaceholder: "You can introduce yourself or what you want to talk about.",
    submit: "Book this cup of time",
    sending: "Sending booking",
    privacy:
      "The booking will be sent to my email. Your details will not be shown publicly.",
    successTitle: "Booking sent",
    successBody: "I will reply by email to confirm the details.",
    failureTitle: "Booking was not sent",
    missingEnv:
      "Email service is not configured yet. Resend environment variables are needed before launch.",
    genericError: "Please try later, or email me directly.",
    timezoneHint: "For online chats, choose the time zone that is easier for you.",
  },
};

export const bookingLocations: LocationOption[] = [
  {
    id: "fuzhou",
    timezone: "Asia/Shanghai",
    label: { zh: "福州", en: "Fuzhou" },
    shortLabel: { zh: "福州", en: "Fuzhou" },
    description: {
      zh: "线下见面按中国时间。",
      en: "In-person meetings use China time.",
    },
    icon: MapPin,
  },
  {
    id: "toronto",
    timezone: "America/Toronto",
    label: { zh: "多伦多", en: "Toronto" },
    shortLabel: { zh: "多伦多", en: "Toronto" },
    description: {
      zh: "线下见面按多伦多时间。",
      en: "In-person meetings use Toronto time.",
    },
    icon: CalendarDays,
  },
  {
    id: "online",
    timezone: "America/Toronto",
    label: { zh: "线上", en: "Online" },
    shortLabel: { zh: "线上", en: "Online" },
    description: {
      zh: "线上可以选择中国或多伦多时区。",
      en: "Online chats can use China or Toronto time.",
    },
    icon: Monitor,
  },
];

export const timeZoneOptions: Array<{
  id: TimeZoneId;
  label: LocalizedText;
}> = [
  {
    id: "Asia/Shanghai",
    label: { zh: "中国时间 / 福州", en: "China time / Fuzhou" },
  },
  {
    id: "America/Toronto",
    label: { zh: "加拿大东部时间 / 多伦多", en: "Eastern time / Toronto" },
  },
];

export const conversationFormats: BookingOption<ConversationFormat>[] = [
  {
    id: "offline",
    label: { zh: "线下", en: "In person" },
    shortLabel: { zh: "线下", en: "In person" },
    description: {
      zh: "福州或多伦多见面聊天。",
      en: "Meet in Fuzhou or Toronto.",
    },
    icon: MapPin,
  },
  {
    id: "online",
    label: { zh: "线上", en: "Online" },
    shortLabel: { zh: "线上", en: "Online" },
    description: {
      zh: "线上视频或文字聊天。",
      en: "Video or text chat online.",
    },
    icon: Monitor,
  },
];

export const timeSlots = [
  "08:00",
  "10:00",
  "12:00",
  "14:00",
  "16:00",
  "18:00",
  "20:00",
  "22:00",
];

export const stories = storyEntries as Story[];

export function getStory(slug: string) {
  return stories.find((story) => story.slug === slug);
}

export function getLocale(value: string | string[] | undefined): Locale {
  return value === "en" ? "en" : "zh";
}

export function withLocale(path: string, locale: Locale) {
  if (locale !== "en") {
    return path;
  }

  const [base, hash] = path.split("#");
  const separator = base.includes("?") ? "&" : "?";
  return `${base}${separator}lang=en${hash ? `#${hash}` : ""}`;
}
