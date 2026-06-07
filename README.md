# 一杯时间

一杯时间是一个暑假博客和预约网站。

想法很简单：用免费的一杯咖啡时间，和不同的陌生人聊天。咖啡喝完，聊天也结束。可以线下在福州或多伦多见面，也可以线上用视频、录音或文字。

## Features

- 默认中文，支持英文切换。
- 黑白简约、方格线条和点阵视觉。
- 预约表单支持邮箱、地点、时区、日期、时间、聊天方式和备注。
- 服务端 API 使用 Resend 发预约邮件。
- 不保存预约数据库，只把信息发到站主邮箱。

## Tech

- Next.js App Router
- TypeScript
- Tailwind CSS
- Luxon
- Resend
- Vitest

## Local Development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Email Setup

Create `.env.local` from `.env.example`:

```bash
RESEND_API_KEY=your_resend_api_key
RESEND_FROM="One Cup Time <hello@your-verified-domain.com>"
BOOKING_TO_EMAIL=your_receiving_email@example.com
```

For production, set the same values in Vercel environment variables. `RESEND_FROM` should use a verified Resend domain for production email.

## Scripts

```bash
npm run test
npm run lint
npm run build
```

## Image Sources

All current site images are real photos from Wikimedia Commons, not AI-generated images.

- Hero: “Hot Coffee on a rainy day” by David Joyce, CC BY-SA 2.0: <https://commons.wikimedia.org/wiki/File:Hot_Coffee_on_a_rainy_day_-_Flickr_-_DeaPeaJay.jpg>
- Fuzhou story: “Former Residence of Lin Juemin” by Zhou Guanhuai, CC BY-SA 4.0: <https://commons.wikimedia.org/wiki/File:Former_Residence_of_Lin_Juemin.jpg>
- Toronto story: “An Evening in Toronto” by Derrick Mealiffe, CC BY-SA 2.0: <https://commons.wikimedia.org/wiki/File:An_Evening_in_Toronto.jpg>
- Online story: “Coffee-desk-laptop-notebook” by Pixel.la Free Stock Photos, CC0: <https://commons.wikimedia.org/wiki/File:Coffee-desk-laptop-notebook_(24244320481).jpg>

## Deployment

Recommended path:

1. Push the repository to GitHub.
2. Import the GitHub repository into Vercel.
3. Add `RESEND_API_KEY`, `RESEND_FROM`, and `BOOKING_TO_EMAIL` in Vercel.
4. Deploy production.
5. Submit a test booking and confirm the email arrives.
