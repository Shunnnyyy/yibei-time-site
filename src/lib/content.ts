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

export type CoffeeMethod = "all" | "pourover" | "espresso" | "coldbrew";
export type CoffeeScene = "morning" | "afternoon" | "anytime";
export type CoffeeFlavor = "fruity" | "nutty";

export type CoffeeProfile = {
  id: string;
  name: LocalizedText;
  scene: CoffeeScene;
  flavorFamily: CoffeeFlavor;
  roast: 1 | 2 | 3;
  acid: 1 | 2 | 3;
  method: Exclude<CoffeeMethod, "all">;
  mark: string;
  tag: LocalizedText;
  flavor: LocalizedText;
  description: LocalizedText;
  storySlug: string;
  image: string;
  imageAlt: LocalizedText;
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
    coffeeFinderTitle: "找到适合你的一杯",
    coffeeFinderBody:
      "像选择一把椅子一样选择咖啡。调整烘焙、酸度和冲煮方式，找到最适合今天心情的文章入口。",
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
    coffeeFinderTitle: "Find your cup",
    coffeeFinderBody:
      "Choose coffee like choosing a chair. Adjust roast, acidity, and brew method to find the story that fits today.",
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

export const coffeeFinderCopy = {
  zh: {
    logo: "Coffee Finder",
    progressLabel: "进度",
    back: "返回上一步",
    restart: "重新配置",
    resultEyebrow: "完美匹配",
    resultTitle: "最适合你当前状态的咖啡",
    resultBody: "点击一个咖啡标志，直接进入对应的博客阅读。",
    fallbackBody: "没有完全匹配的一杯，所以先给你最接近的阅读入口。",
    questions: [
      {
        step: "01 / 03",
        title: "你通常在什么时候或什么状态下享用这杯咖啡？",
        field: "scene",
        options: [
          {
            value: "morning",
            label: "清晨唤醒：需要瞬间提神醒脑",
          },
          {
            value: "afternoon",
            label: "午后悠闲：搭配甜点细细品味风味",
          },
          {
            value: "anytime",
            label: "全天候：随时随地想喝，不影响睡眠",
          },
        ],
      },
      {
        step: "02 / 03",
        title: "在风味图谱中，你更倾向于哪种调性？",
        field: "flavor",
        options: [
          {
            value: "fruity",
            label: "明亮的水果：像柑橘、莓果或花香",
          },
          {
            value: "nutty",
            label: "醇厚的坚果：像黑巧克力、焦糖与烤坚果",
          },
        ],
      },
      {
        step: "03 / 03",
        title: "你打算用什么方式来冲煮它？",
        field: "method",
        options: [
          {
            value: "pourover",
            label: "手冲滤杯、法压壶：精致慢滤",
          },
          {
            value: "espresso",
            label: "意式咖啡机、胶囊机：快速高压",
          },
          {
            value: "coldbrew",
            label: "冷萃或冰滴：夏天慢慢喝",
          },
        ],
      },
    ],
    methods: {
      all: "全部",
      pourover: "手冲滤杯",
      espresso: "意式浓缩",
      coldbrew: "冷萃/冰滴",
    },
    readStory: "阅读",
  },
  en: {
    logo: "Coffee Finder",
    progressLabel: "Progress",
    back: "Back",
    restart: "Restart",
    resultEyebrow: "Perfect match",
    resultTitle: "Coffee for your current mood",
    resultBody: "Click a coffee mark to read the matching blog story.",
    fallbackBody: "No perfect match, so here are the closest reading paths.",
    questions: [
      {
        step: "01 / 03",
        title: "When do you usually want this coffee?",
        field: "scene",
        options: [
          {
            value: "morning",
            label: "Morning wake-up: I need quick energy",
          },
          {
            value: "afternoon",
            label: "Slow afternoon: I want to taste the details",
          },
          {
            value: "anytime",
            label: "Any time: easy to drink and not too heavy",
          },
        ],
      },
      {
        step: "02 / 03",
        title: "Which flavor direction feels closer to you?",
        field: "flavor",
        options: [
          {
            value: "fruity",
            label: "Bright fruit: citrus, berries, or flowers",
          },
          {
            value: "nutty",
            label: "Warm nuts: dark chocolate, caramel, roasted nuts",
          },
        ],
      },
      {
        step: "03 / 03",
        title: "How will you brew it?",
        field: "method",
        options: [
          {
            value: "pourover",
            label: "Pour-over or French press: slow and clear",
          },
          {
            value: "espresso",
            label: "Espresso or capsule machine: fast and strong",
          },
          {
            value: "coldbrew",
            label: "Cold brew or ice drip: slow summer cup",
          },
        ],
      },
    ],
    methods: {
      all: "All",
      pourover: "Pour-over",
      espresso: "Espresso",
      coldbrew: "Cold brew",
    },
    readStory: "Read",
  },
} satisfies Record<
  Locale,
  {
    logo: string;
    progressLabel: string;
    back: string;
    restart: string;
    resultEyebrow: string;
    resultTitle: string;
    resultBody: string;
    fallbackBody: string;
    questions: Array<{
      step: string;
      title: string;
      field: "scene" | "flavor" | "method";
      options: Array<{
        value: CoffeeScene | CoffeeFlavor | Exclude<CoffeeMethod, "all">;
        label: string;
      }>;
    }>;
    methods: Record<CoffeeMethod, string>;
    readStory: string;
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
    mark: "Y",
    tag: { zh: "轻盈花果香", en: "Light floral fruit" },
    flavor: { zh: "柑橘 / 茉莉 / 清亮", en: "Citrus / jasmine / clean" },
    description: {
      zh: "适合喜欢轻盈、花香和明亮酸感的人。它像一个很容易开始的下午聊天。",
      en: "For people who like light body, floral notes, and bright acidity. It feels like an easy afternoon talk.",
    },
    storySlug: "why-one-cup",
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
    mark: "H",
    tag: { zh: "坚果焦糖平衡", en: "Nutty caramel balance" },
    flavor: { zh: "坚果 / 巧克力 / 平衡", en: "Nutty / chocolate / balanced" },
    description: {
      zh: "适合第一次不知道怎么选的人。甜感和酸感都比较温和，像日常但不无聊的对话。",
      en: "A good first choice. Sweetness and acidity stay gentle, like a daily conversation that is not boring.",
    },
    storySlug: "fuzhou-summer-route",
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
    mark: "E",
    tag: { zh: "意式浓郁油脂", en: "Rich espresso crema" },
    flavor: { zh: "可可 / 奶香 / 浓郁", en: "Cocoa / milk / rich" },
    description: {
      zh: "适合喜欢低酸、厚重和拿铁口感的人。它比较直接，也很适合短短的一杯时间。",
      en: "For people who like low acidity, heavy body, and latte texture. It is direct and works well for one short cup.",
    },
    storySlug: "toronto-online",
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
    mark: "K",
    tag: { zh: "高酸清爽提神", en: "Bright and energetic" },
    flavor: { zh: "乌梅 / 黑加仑 / 清爽", en: "Plum / blackcurrant / fresh" },
    description: {
      zh: "适合想要冰一点、果汁感强一点的人。冷萃后会更顺口，也更适合夏天。",
      en: "For people who want something cold and fruity. Cold brew makes it smoother and very summer-friendly.",
    },
    storySlug: "why-one-cup",
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
    mark: "M",
    tag: { zh: "低酸木质醇厚", en: "Low-acid and full" },
    flavor: { zh: "木质 / 草本 / 醇厚", en: "Woody / herbal / full" },
    description: {
      zh: "适合不喜欢酸味的人。它更沉稳，适合慢慢聊家乡、生活和最近的烦恼。",
      en: "For people who do not like sour coffee. It feels calm and suits slower talks about home and life.",
    },
    storySlug: "fuzhou-summer-route",
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
    mark: "T",
    tag: { zh: "夏日冰感干净", en: "Clean summer cold cup" },
    flavor: { zh: "焦糖 / 冰感 / 干净", en: "Caramel / cold / clean" },
    description: {
      zh: "适合线上或多伦多的夏天。风味不太尖锐，适合边散步边聊。",
      en: "Good for online chats or a Toronto summer. It is not too sharp, nice for walking and talking.",
    },
    storySlug: "toronto-online",
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
