import {
  CalendarDays,
  Camera,
  FileText,
  Globe2,
  MapPin,
  Mic,
  Monitor,
  Video,
} from "lucide-react";
import type { ComponentType } from "react";
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

export const locales: Locale[] = ["zh", "en"];

export const siteCopy = {
  zh: {
    navStories: "故事",
    navBooking: "预约",
    navAbout: "关于",
    language: "English",
    heroTitle: "一杯咖啡的时间，认识一个新朋友。",
    heroBody:
      "暑假想和不同的陌生人聊一会儿。咖啡喝完，聊天也结束。福州、多伦多和线上都可以。",
    heroNoteTitle: "一杯时间，不多不少",
    heroNoteBody:
      "你可以选择拍摄、录音，或者只留下文字。信息会通过邮件发给我确认。",
    windowsTitle: "时间和地点",
    storiesTitle: "最近的故事",
    storiesBody: "真实聊天后会更新文章。现在先放项目笔记和路线计划。",
    readAll: "阅读全部",
    aboutTitle: "关于这个夏天的小项目",
    aboutBodyOne:
      "我想把聊天做得轻一点。不是正式采访，也不是很长的社交活动。只是坐下来，喝一杯咖啡，听一个人的故事。",
    aboutBodyTwo:
      "如果你愿意被记录，可以选择线下拍摄或录音。如果你想低调一点，也可以只留下文字。文章会保护隐私。",
    footerLeft: "一杯时间 · yibei.chat",
    footerRight: "一杯咖啡，一段真诚的对话。",
    storiesPageTitle: "故事和计划笔记",
    storiesPageBody:
      "这里会收集每一次咖啡聊天后的文章。现在先放开篇说明和福州、多伦多、线上聊天的安排。",
    backToStories: "返回故事",
  },
  en: {
    navStories: "Stories",
    navBooking: "Book",
    navAbout: "About",
    language: "中文",
    heroTitle: "One coffee, one honest conversation.",
    heroBody:
      "This summer I want to talk with different strangers. When the coffee ends, the chat ends. Fuzhou, Toronto, and online all work.",
    heroNoteTitle: "One cup of time",
    heroNoteBody:
      "You can choose filming, audio, video, or text. The booking details will be emailed to me.",
    windowsTitle: "Time and place",
    storiesTitle: "Recent stories",
    storiesBody:
      "Real stories will come after the chats. For now, these are project notes and route plans.",
    readAll: "Read all",
    aboutTitle: "About this summer project",
    aboutBodyOne:
      "I want the chat to feel light. It is not a formal interview. It is just one cup of coffee and one person’s story.",
    aboutBodyTwo:
      "If you are comfortable, we can film or record audio. If you want to stay quiet, text notes are okay too. I will protect privacy.",
    footerLeft: "One Cup Time · yibei.chat",
    footerRight: "One coffee, one honest conversation.",
    storiesPageTitle: "Stories and notes",
    storiesPageBody:
      "This page will collect coffee chat stories. For now, it has the first notes and city plans.",
    backToStories: "Back to stories",
  },
};

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
    id: "offline_filming",
    label: { zh: "线下拍摄", en: "In-person filming" },
    shortLabel: { zh: "线下拍摄", en: "Filming" },
    description: {
      zh: "适合愿意留下画面的聊天。",
      en: "For a chat that can be filmed.",
    },
    icon: Camera,
  },
  {
    id: "offline_text",
    label: { zh: "线下文字", en: "In-person text" },
    shortLabel: { zh: "线下文字", en: "Text" },
    description: {
      zh: "线下见面，但最后只写成文字。",
      en: "Meet in person, but publish text notes only.",
    },
    icon: FileText,
  },
  {
    id: "offline_audio",
    label: { zh: "线下录音", en: "In-person audio" },
    shortLabel: { zh: "线下录音", en: "Audio" },
    description: {
      zh: "线下聊天，只录声音。",
      en: "Meet in person and record audio only.",
    },
    icon: Mic,
  },
  {
    id: "online_video",
    label: { zh: "线上视频", en: "Online video" },
    shortLabel: { zh: "线上视频", en: "Video" },
    description: {
      zh: "线上视频聊天。",
      en: "A video chat online.",
    },
    icon: Video,
  },
  {
    id: "online_text",
    label: { zh: "线上文字", en: "Online text" },
    shortLabel: { zh: "线上文字", en: "Online text" },
    description: {
      zh: "只用文字聊天或整理文字。",
      en: "A text-only chat or written notes.",
    },
    icon: Globe2,
  },
];

export const timeSlots = ["10:30", "14:00", "15:30", "19:00"];

export const summerWindows = [
  {
    title: { zh: "福州线下", en: "Fuzhou in person" },
    detail: {
      zh: "默认中国时间，适合咖啡店、书店或安静街区。",
      en: "Uses China time. Coffee shops, bookstores, or quiet streets work well.",
    },
    icon: MapPin,
  },
  {
    title: { zh: "多伦多线下", en: "Toronto in person" },
    detail: {
      zh: "默认多伦多时间，湖边、市中心、校园附近都可以。",
      en: "Uses Toronto time. The lakefront, downtown, or campus areas are fine.",
    },
    icon: CalendarDays,
  },
  {
    title: { zh: "线上聊天", en: "Online chat" },
    detail: {
      zh: "可选中国时间或多伦多时间，视频或文字都可以。",
      en: "Choose China time or Toronto time. Video and text are both okay.",
    },
    icon: Monitor,
  },
];

export const stories: Story[] = [
  {
    slug: "why-one-cup",
    title: {
      zh: "开篇：为什么只聊一杯咖啡",
      en: "Why only one cup of coffee",
    },
    date: "2026-06-06",
    city: { zh: "计划笔记", en: "Project note" },
    status: { zh: "准备中", en: "Preparing" },
    summary: {
      zh: "一杯咖啡给对话一个边界，也让陌生人更容易开始。",
      en: "One cup gives the conversation a clear edge and makes it easier to start.",
    },
    image: "/images/story-online.jpg",
    imageAlt: {
      zh: "桌面上的咖啡、笔记本和电脑",
      en: "Coffee, notebook, and laptop on a desk",
    },
    body: {
      zh: [
        "这个博客从一个很简单的想法开始：我想在暑假和不同的陌生人聊一会儿。时间不用很长，一杯咖啡就够了。",
        "这个边界很重要。咖啡喝完，聊天也结束。这样双方都不用有太多压力，也不用把一次见面变得很正式。",
        "有些聊天会录视频，有些只录声音，有些我只会写成文字。每个人可以选自己舒服的方式。",
      ],
      en: [
        "This blog starts with a simple idea. I want to talk with different strangers during summer. It does not have to be long. One coffee is enough.",
        "The boundary matters. When the coffee ends, the chat ends too. It makes the meeting feel lighter.",
        "Some chats can be filmed, some can be audio only, and some can be text only. People can choose what feels comfortable.",
      ],
    },
  },
  {
    slug: "fuzhou-summer-route",
    title: {
      zh: "福州：老街和慢慢聊的下午",
      en: "Fuzhou: old streets and slow afternoons",
    },
    date: "2026-06-06",
    city: { zh: "福州", en: "Fuzhou" },
    status: { zh: "路线计划", en: "Route plan" },
    summary: {
      zh: "福州的线下聊天会选比较安静、好找、适合短谈的地方。",
      en: "For Fuzhou, I will choose quiet, easy-to-find places for short chats.",
    },
    image: "/images/story-fuzhou.jpg",
    imageAlt: {
      zh: "福州街道和城市建筑",
      en: "A Fuzhou street and city buildings",
    },
    body: {
      zh: [
        "福州的见面地点会尽量简单：好找、安全、环境不太吵。三坊七巷附近、学校附近、或安静咖啡店都可以。",
        "我不想把聊天做成采访。更像是两个人坐下来，聊生活、学习、工作、家乡，或者最近正在烦恼的事情。",
        "如果对方愿意，我会把聊天整理成一篇短文。文章会保护隐私，不写真实姓名，也不写太具体的个人信息。",
      ],
      en: [
        "For Fuzhou, the meeting place should be simple: easy to find, safe, and not too loud.",
        "I do not want the chat to feel like an interview. It is more like two people sitting down and talking about life.",
        "If the other person is comfortable, I will turn the chat into a short story. I will protect privacy.",
      ],
    },
  },
  {
    slug: "toronto-online",
    title: {
      zh: "多伦多和线上，也可以很自然",
      en: "Toronto and online can also feel natural",
    },
    date: "2026-06-06",
    city: { zh: "多伦多 / 线上", en: "Toronto / Online" },
    status: { zh: "开放预约", en: "Open" },
    summary: {
      zh: "不在同一座城市也没关系，视频、声音、文字都可以有温度。",
      en: "It is okay if we are not in the same city. Video, audio, and text can still feel warm.",
    },
    image: "/images/story-toronto.jpg",
    imageAlt: {
      zh: "多伦多湖边城市天际线",
      en: "Toronto skyline near the waterfront",
    },
    body: {
      zh: [
        "多伦多的线下聊天可以在湖边、市中心、校园附近进行。天气好的时候，散步前后的一杯咖啡会很舒服。",
        "线上聊天也会保留同样的边界：一杯咖啡的时间。可以视频，也可以只用文字。",
        "我希望这个项目不是很吵的内容。它更像一个安静的记录：一个夏天，很多短短的相遇。",
      ],
      en: [
        "In Toronto, the chat can happen near the lake, downtown, or close to campus.",
        "Online chats keep the same boundary: one cup of coffee. It can be video or text.",
        "I hope this project feels quiet. It is a small record of many short meetings in one summer.",
      ],
    },
  },
];

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
