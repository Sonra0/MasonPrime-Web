type Lang = 'en' | 'fa';

interface Translations {
  [key: string]: string;
}

const STORAGE_KEY = 'mason-lang';

const en: Translations = {
  page_title: 'MasonPrime VPN — Private. Secure. Unstoppable.',
  nav_cta: 'Connect via Telegram',
  mobile_cta: 'Connect via Telegram',

  hero_title_1: 'Private.',
  hero_title_2: 'Secure.',
  hero_title_3: 'Unstoppable.',
  hero_subtitle: 'Built for <span class="hero-highlight">Iranians</span> to break through GFW censorship.<br>Powered by Telegram. No logs, no limits, no compromise.',
  hero_cta_primary: 'Get Started',
  hero_cta_ghost: 'Server Status',

  trust_tag: 'Trusted Worldwide',
  trust_title: 'Numbers That Speak <span class="accent">Louder</span>',
  trust_label_1: 'Active Users',
  trust_label_2: 'Global Servers',
  trust_label_3: 'Traffic Processed',
  trust_label_4: 'Industry Experience',
  trust_suffix_1: '+',
  trust_suffix_2: '+',
  trust_suffix_3: ' TB',
  trust_suffix_4: '+ Years',

  features_tag: 'Why MasonPrime',
  features_title: 'Built for the <span class="accent">Fearless</span>',
  features_desc: 'Enterprise-grade privacy wrapped in simplicity.<br>No apps to install, no data to surrender.',
  feature_1_title: 'Zero-Log Architecture',
  feature_1_desc: "We don't store what doesn't exist. RAM-only servers wipe on every reboot. Your activity is yours alone.",
  feature_2_title: 'Blazing Fast Speeds',
  feature_2_desc: 'Premium tier infrastructure across 50+ locations. V2ray protocols for speeds that feel like no VPN at all.',
  feature_3_title: 'Crypto Payments',
  feature_3_desc: 'Pay with BTC, ETH, USDT, or TON. Complete anonymity from subscription to connection. No identity required.',
  feature_4_title: 'GFW Bypass Engine',
  feature_4_desc: 'Purpose-built for Iranian users. Advanced anti-censorship protocols defeat GFW deep packet inspection with ease.',

  steps_tag: 'Get Connected',
  steps_title: 'Four Steps to <span class="accent">Freedom</span>',
  steps_desc: 'From zero to fully encrypted in under two minutes. All through Telegram.',
  step_1_title: 'Open the Bot',
  step_1_desc: "Find @MasonPrimeBot on Telegram and hit Start. That's your control panel.",
  step_2_title: 'Charge Account',
  step_2_desc: 'Top up your balance with cryptocurrency. Instant, anonymous, and fully secure.',
  step_3_title: 'Select Plan',
  step_3_desc: 'Pick the duration and server location that fits your needs. Flexible, no lock-in.',
  step_4_title: 'Get Config',
  step_4_desc: "Receive your V2ray config instantly. Import it and you're invisible.",

  footer_tagline: 'Privacy is not a privilege.',
  footer_product_heading: 'Product',
  footer_server_status: 'Server Status',
  footer_telegram_support: 'Telegram Support',
  footer_legal_heading: 'Legal',
  footer_privacy_policy: 'Privacy Policy',
  footer_terms: 'Terms',
  footer_copyright: '&copy; 2021–2026 MasonPrime. All rights reserved.',

  variant_crystal: 'Crystal',
  variant_nebula: 'Nebula',
  variant_sphere: 'Sphere',

  // --- Terms of Service ---
  terms_page_title: 'Terms of Service — MasonPrime VPN',
  terms_heading: 'Terms of Service',
  terms_last_updated: 'Last updated: February 2026',
  terms_intro: 'By purchasing and using MasonPrime VPN services, you agree to the following terms and conditions. Please read them carefully before proceeding.',

  terms_s1_title: '1. Service Purpose',
  terms_s1_text: 'MasonPrime VPN services are provided solely for the purpose of ensuring internet security and bypassing sanctions imposed against Iran. Our service is designed to protect your online privacy and provide unrestricted access to the open internet.',

  terms_s2_title: '2. Disclaimer of Liability',
  terms_s2_text: 'All legal responsibilities related to the service, its usage, and the type of activities conducted by the subscriber are entirely the responsibility of the subscriber. MasonPrime VPN bears no responsibility in this regard. You are solely accountable for ensuring your use of the service complies with applicable laws.',

  terms_s3_title: '3. Compliance with Laws',
  terms_s3_text: 'In circumstances where MasonPrime VPN becomes aware or reaches a reasonable conclusion with convincing evidence that a subscriber is using the service for illegal purposes, it reserves the right to immediately and without prior notice block or delete all of the user\'s services.',

  terms_s4_title: '4. Refund Policy',
  terms_s4_text: 'After purchase and delivery of an account, refunds and service cancellations are not possible. Please ensure you understand the service terms before making a purchase. We recommend starting with a shorter plan if you are a new user.',

  terms_s5_title: '5. Connection Limits',
  terms_s5_text: 'You are required to adhere to the connection limits of your plan. For example, if you have purchased a 6-user plan, only 6 simultaneous IP connections are allowed. Failure to comply will result in a permanent ban with no possibility of a refund.',

  terms_s6_title: '6. Force Majeure',
  terms_s6_text: 'If during the service period, disruptions occur due to circumstances beyond our control — including but not limited to natural disasters (floods, earthquakes, fires), telecommunications failures, domestic or international restrictions, demands for additional charges by foreign service providers, changes in domestic or international regulations, war, strikes, currency fluctuations, server shutdowns by data centers, and any other conditions beyond our reach — MasonPrime VPN and its management shall bear no responsibility.',

  terms_s7_title: '7. Account Security',
  terms_s7_text: 'You are responsible for maintaining the security of your account credentials and connection configurations. Do not share your V2ray configs with unauthorized parties. MasonPrime VPN is not liable for any damages arising from unauthorized access to your account due to your negligence.',

  terms_s8_title: '8. Service Modifications',
  terms_s8_text: 'MasonPrime VPN reserves the right to modify, update, or discontinue any aspect of the service at any time. We will make reasonable efforts to notify users of significant changes through our Telegram channels.',

  terms_s9_title: '9. Acceptance of Terms',
  terms_s9_text: 'By purchasing MasonPrime VPN services, you accept all of the above terms and conditions. After account delivery, the buyer is deemed to have accepted all terms. In case of violation, action will be taken according to these rules. MasonPrime VPN reserves the right to unilaterally terminate the service of any customer who violates any of the above rules, and the subscriber shall have no right to object.',

  terms_s10_title: '10. Contact',
  terms_s10_text: 'For questions regarding these terms, contact us via Telegram support.',

  // --- Privacy Policy ---
  privacy_page_title: 'Privacy Policy — MasonPrime VPN',
  privacy_heading: 'Privacy Policy',
  privacy_last_updated: 'Last updated: February 2026',
  privacy_intro: 'At MasonPrime VPN, privacy is not a feature — it is our foundation. This policy explains how we handle your data, which in most cases means: we don\'t.',

  privacy_s1_title: '1. Zero-Log Policy',
  privacy_s1_text: 'MasonPrime VPN operates on a strict zero-log architecture. We do not monitor, record, or store any of your online activity, including browsing history, traffic destination, DNS queries, or IP addresses. Our servers run entirely on RAM — all data is wiped on every reboot. What doesn\'t exist cannot be compromised.',

  privacy_s2_title: '2. Information We Collect',
  privacy_s2_text: 'We collect only the minimum information necessary to provide the service: your Telegram user ID (for account management via our bot), subscription plan details, and payment transaction hashes for verification. We do not collect your name, email address, phone number, or physical address.',

  privacy_s3_title: '3. Payment Privacy',
  privacy_s3_text: 'All payments are processed exclusively through cryptocurrency (BTC, ETH, USDT, TON). We do not accept credit cards or bank transfers, ensuring there is no link between your financial identity and your VPN subscription. Payment transaction hashes are stored solely for transaction verification and dispute resolution.',

  privacy_s4_title: '4. Data Storage & Security',
  privacy_s4_text: 'Any minimal data we hold (Telegram ID, subscription status) is stored on encrypted servers. Our VPN servers are RAM-only — they contain no persistent storage and are wiped completely on every restart. We employ industry-standard security practices to protect our infrastructure.',

  privacy_s5_title: '5. Cookies & Tracking',
  privacy_s5_text: 'Our website does not use tracking cookies, analytics services, or any third-party trackers. We do not use Google Analytics, Facebook Pixel, or any similar surveillance tools. The only data stored locally is your language preference (EN/FA) via localStorage.',

  privacy_s6_title: '6. Third-Party Services',
  privacy_s6_text: 'Our service interacts with Telegram (for account management) and cryptocurrency networks (for payments). We are not responsible for the privacy practices of these third-party platforms. We recommend reviewing their respective privacy policies.',

  privacy_s7_title: '7. Data Retention',
  privacy_s7_text: 'Account information is retained only for the duration of your active subscription. Once a subscription expires and is not renewed within 30 days, all associated data is permanently deleted. VPN connection data is never stored at any point.',

  privacy_s8_title: '8. Your Rights',
  privacy_s8_text: 'You have the right to request information about what data we hold about you, request deletion of your data, and close your account at any time. Contact our Telegram support to exercise any of these rights.',

  privacy_s9_title: '9. Changes to This Policy',
  privacy_s9_text: 'We may update this privacy policy from time to time. Significant changes will be announced through our Telegram channels. Continued use of the service after changes constitutes acceptance of the updated policy.',

  privacy_s10_title: '10. Contact',
  privacy_s10_text: 'For privacy-related inquiries or concerns, contact us via Telegram support.',

  legal_back_home: '&larr; Back to Home',
};

const fa: Translations = {
  page_title: 'MasonPrime VPN — خصوصی. امن. غیرقابل توقف.',
  nav_cta: 'اتصال از طریق تلگرام',
  mobile_cta: 'اتصال از طریق تلگرام',

  hero_title_1: 'خصوصی.',
  hero_title_2: 'امن.',
  hero_title_3: 'غیرقابل توقف.',
  hero_subtitle: 'ساخته شده برای <span class="hero-highlight">ایرانیان</span> برای عبور از فیلترینگ.<br>با تلگرام. بدون لاگ، بدون محدودیت، بدون سازش.',
  hero_cta_primary: 'شروع کنید',
  hero_cta_ghost: 'وضعیت سرور',

  trust_tag: 'مورد اعتماد جهانی',
  trust_title: 'اعدادی که <span class="accent">بلندتر</span> صحبت می‌کنند',
  trust_label_1: 'کاربران فعال',
  trust_label_2: 'سرورهای جهانی',
  trust_label_3: 'ترافیک پردازش شده',
  trust_label_4: 'تجربه در صنعت',
  trust_suffix_1: '+',
  trust_suffix_2: '+',
  trust_suffix_3: ' TB',
  trust_suffix_4: '+ سال',

  features_tag: 'چرا MasonPrime',
  features_title: 'ساخته شده برای <span class="accent">مردم</span>',
  features_desc: 'حریم خصوصی سازمانی در قالب سادگی.<br>بدون نصب اپلیکیشن، بدون تحویل اطلاعات.',
  feature_1_title: 'معماری بدون لاگ',
  feature_1_desc: 'آنچه وجود ندارد ذخیره نمی‌کنیم. سرورهای فقط RAM در هر راه‌اندازی مجدد پاک می‌شوند. فعالیت شما فقط متعلق به شماست.',
  feature_2_title: 'سرعت‌های فوق‌العاده',
  feature_2_desc: 'زیرساخت پریمیوم در بیش از ۵۰ موقعیت. پروتکل‌های V2ray با سرعتی که انگار VPN وجود ندارد.',
  feature_3_title: 'پرداخت با رمزارز',
  feature_3_desc: 'با BTC، ETH، USDT یا TON پرداخت کنید. ناشناسی کامل از اشتراک تا اتصال. بدون نیاز به هویت.',
  feature_4_title: 'موتور عبور از GFW',
  feature_4_desc: 'ساخته شده ویژه کاربران ایرانی. پروتکل‌های ضد سانسور پیشرفته که بازرسی عمیق بسته‌ها را شکست می‌دهند.',

  steps_tag: 'متصل شوید',
  steps_title: 'چهار قدم تا <span class="accent">آزادی</span>',
  steps_desc: 'از صفر تا رمزنگاری کامل در کمتر از دو دقیقه. همه از طریق تلگرام.',
  step_1_title: 'ربات را باز کنید',
  step_1_desc: '@MasonPrimeBot را در تلگرام پیدا کنید و Start بزنید. این پنل کنترل شماست.',
  step_2_title: 'شارژ حساب',
  step_2_desc: 'موجودی خود را با رمزارز شارژ کنید. فوری، ناشناس و کاملاً امن.',
  step_3_title: 'انتخاب پلن',
  step_3_desc: 'مدت و موقعیت سرور مناسب خود را انتخاب کنید. منعطف، بدون قفل.',
  step_4_title: 'دریافت کانفیگ',
  step_4_desc: 'کانفیگ V2ray خود را فوراً دریافت کنید. وارد کنید و نامرئی شوید.',

  footer_tagline: 'حریم خصوصی یک امتیاز نیست.',
  footer_product_heading: 'محصول',
  footer_server_status: 'وضعیت سرور',
  footer_telegram_support: 'پشتیبانی تلگرام',
  footer_legal_heading: 'حقوقی',
  footer_privacy_policy: 'سیاست حفظ حریم خصوصی',
  footer_terms: 'شرایط',
  footer_copyright: '&copy; ۲۰۲۱–۲۰۲۶ MasonPrime. تمامی حقوق محفوظ است.',

  variant_crystal: 'کریستال',
  variant_nebula: 'سحابی',
  variant_sphere: 'کره',

  // --- Terms of Service ---
  terms_page_title: 'شرایط استفاده — MasonPrime VPN',
  terms_heading: 'شرایط استفاده',
  terms_last_updated: 'آخرین به‌روزرسانی: بهمن ۱۴۰۴',
  terms_intro: 'با خرید و استفاده از خدمات MasonPrime VPN، شما با شرایط و ضوابط زیر موافقت می‌کنید. لطفاً قبل از ادامه آن‌ها را با دقت مطالعه کنید.',

  terms_s1_title: '۱. هدف سرویس',
  terms_s1_text: 'ارائه سرویس فقط به جهت ایجاد امنیت در استفاده از اینترنت و رفع تحریم‌ها علیه ایران می‌باشد.',

  terms_s2_title: '۲. رفع مسئولیت',
  terms_s2_text: 'کلیه مسئولیت‌های حقوقی مرتبط با سرویس، نحوه استفاده و نوع فعالیت‌هایی که توسط مشترک انجام می‌شود، کاملاً بر عهده مشترک است و MasonVPN هیچ‌گونه مسئولیتی در این خصوص بر عهده ندارد.',

  terms_s3_title: '۳. منطبق با قوانین کشور',
  terms_s3_text: 'در شرایطی که MasonVPN مطلع شود یا با دلایل قانع‌کننده و با استدلال به این نتیجه برسد که مشترک برای مقاصد غیرقانونی از سرویس استفاده می‌کند، این حق را خواهد داشت که بلافاصله و بدون اطلاع قبلی، کلیه سرویس‌های کاربر را مسدود و یا حذف نماید.',

  terms_s4_title: '۴. سیاست بازپرداخت',
  terms_s4_text: 'بعد از خرید و دریافت اکانت، امکان برگشت وجه و لغو سرویس وجود ندارد. لطفاً قبل از خرید از شرایط سرویس مطمئن شوید. به کاربران جدید توصیه می‌کنیم با پلن کوتاه‌مدت شروع کنند.',

  terms_s5_title: '۵. محدودیت اتصال',
  terms_s5_text: 'شما موظف هستید که اگر سرویس ۶ کاربره گرفته‌اید فقط با ۶ آی‌پی متصل شوید. در صورت رعایت نکردن، سرویس بن و امکان برگشت وجه وجود ندارد.',

  terms_s6_title: '۶. فورس ماژور',
  terms_s6_text: 'چنانچه در مدت زمان ارائه خدمات به دلایلی که از اراده ما خارج باشد مانند مواردی همچون تغییرات مخرب جوی، سیل، آتش‌سوزی، زلزله، اشکالات مخابراتی، هر گونه ممنوعیت داخلی و خارجی، عدم پاسخگویی و یا اجبار بر دریافت مبالغ اضافی توسط شرکت‌های خارجی فراهم‌کننده خدمات، هر گونه تغییرات در قوانین داخلی و خارجی، جنگ، اعتصابات، تغییرات در نرخ ارز، بسته شدن سرور توسط دیتا سنتر و کلیه شرایطی که از دسترس ما خارج باشد، در تداوم ارائه خدمات خدشه‌ای وارد گردد و یا باعث قطع موقت آن گردد، هیچ‌گونه مسئولیتی بر ما و مسئولین آن نخواهد بود.',

  terms_s7_title: '۷. امنیت حساب',
  terms_s7_text: 'شما مسئول حفظ امنیت اطلاعات حساب و کانفیگ‌های اتصال خود هستید. کانفیگ‌های V2ray خود را با افراد غیرمجاز به اشتراک نگذارید. MasonPrime VPN مسئولیتی در قبال خسارات ناشی از دسترسی غیرمجاز به حساب شما به دلیل سهل‌انگاری شما ندارد.',

  terms_s8_title: '۸. تغییرات سرویس',
  terms_s8_text: 'MasonPrime VPN حق تغییر، به‌روزرسانی یا توقف هر بخشی از سرویس را در هر زمان برای خود محفوظ می‌دارد. ما تلاش معقول خواهیم کرد تا تغییرات مهم را از طریق کانال‌های تلگرام اطلاع‌رسانی کنیم.',

  terms_s9_title: '۹. پذیرش شرایط',
  terms_s9_text: 'بدیهی است که خرید سرویس‌های MasonVPN به معنای قبول تمامی شرایط MasonVPN بوده و خریدار پس از تحویل اکانت تمامی شرایط را پذیرفته و در صورت تخلف طبق قوانین با او برخورد خواهد شد. همچنین MasonVPN برای خود این حق را محفوظ می‌دارد در صورتی که هر یک از مشتریان هر یک از قوانین بالا را نقض کنند به صورت یک‌جانبه اقدام به قطع سرویس نماید و مشترک حق هیچ‌گونه اعتراضی نخواهد داشت.',

  terms_s10_title: '۱۰. تماس',
  terms_s10_text: 'برای سوالات مربوط به این شرایط، از طریق پشتیبانی تلگرام با ما در تماس باشید.',

  // --- Privacy Policy ---
  privacy_page_title: 'سیاست حفظ حریم خصوصی — MasonPrime VPN',
  privacy_heading: 'سیاست حفظ حریم خصوصی',
  privacy_last_updated: 'آخرین به‌روزرسانی: بهمن ۱۴۰۴',
  privacy_intro: 'در MasonPrime VPN، حریم خصوصی یک ویژگی نیست — بلکه پایه و اساس ماست. این سیاست توضیح می‌دهد که ما چگونه با داده‌های شما برخورد می‌کنیم، که در بیشتر موارد یعنی: ما اصلاً داده‌ای نداریم.',

  privacy_s1_title: '۱. سیاست بدون لاگ',
  privacy_s1_text: 'MasonPrime VPN بر اساس معماری کاملاً بدون لاگ فعالیت می‌کند. ما هیچ‌یک از فعالیت‌های آنلاین شما را نظارت، ثبت یا ذخیره نمی‌کنیم، از جمله تاریخچه مرور، مقصد ترافیک، درخواست‌های DNS یا آدرس‌های IP. سرورهای ما کاملاً روی RAM اجرا می‌شوند — تمام داده‌ها با هر بار راه‌اندازی مجدد پاک می‌شوند. آنچه وجود ندارد نمی‌تواند به خطر بیفتد.',

  privacy_s2_title: '۲. اطلاعاتی که جمع‌آوری می‌کنیم',
  privacy_s2_text: 'ما فقط حداقل اطلاعات لازم برای ارائه سرویس را جمع‌آوری می‌کنیم: شناسه تلگرام شما (برای مدیریت حساب از طریق ربات ما)، جزئیات پلن اشتراک، و هش تراکنش‌های پرداخت برای تأیید. ما نام، آدرس ایمیل، شماره تلفن یا آدرس فیزیکی شما را جمع‌آوری نمی‌کنیم.',

  privacy_s3_title: '۳. حریم خصوصی پرداخت',
  privacy_s3_text: 'تمام پرداخت‌ها منحصراً از طریق رمزارز (BTC، ETH، USDT، TON) پردازش می‌شوند. ما کارت اعتباری یا حواله بانکی قبول نمی‌کنیم، و هیچ ارتباطی بین هویت مالی شما و اشتراک VPN شما وجود ندارد. هش‌های تراکنش پرداخت فقط برای تأیید تراکنش و حل اختلاف ذخیره می‌شوند.',

  privacy_s4_title: '۴. ذخیره‌سازی و امنیت داده‌ها',
  privacy_s4_text: 'هر داده حداقلی که نگه می‌داریم (شناسه تلگرام، وضعیت اشتراک) روی سرورهای رمزنگاری‌شده ذخیره می‌شود. سرورهای VPN ما فقط RAM هستند — هیچ حافظه دائمی ندارند و با هر بار راه‌اندازی مجدد کاملاً پاک می‌شوند. ما از اقدامات امنیتی استاندارد صنعت برای حفاظت از زیرساخت خود استفاده می‌کنیم.',

  privacy_s5_title: '۵. کوکی‌ها و ردیابی',
  privacy_s5_text: 'وبسایت ما از کوکی‌های ردیابی، سرویس‌های تحلیلی یا هیچ‌گونه ردیاب شخص ثالثی استفاده نمی‌کند. ما از Google Analytics، Facebook Pixel یا هیچ ابزار نظارتی مشابهی استفاده نمی‌کنیم. تنها داده‌ای که به صورت محلی ذخیره می‌شود تنظیم زبان شما (EN/FA) از طریق localStorage است.',

  privacy_s6_title: '۶. سرویس‌های شخص ثالث',
  privacy_s6_text: 'سرویس ما با تلگرام (برای مدیریت حساب) و شبکه‌های رمزارز (برای پرداخت) تعامل دارد. ما مسئول سیاست‌های حریم خصوصی این پلتفرم‌های شخص ثالث نیستیم. توصیه می‌کنیم سیاست‌های حریم خصوصی مربوطه آن‌ها را مطالعه کنید.',

  privacy_s7_title: '۷. نگهداری داده‌ها',
  privacy_s7_text: 'اطلاعات حساب فقط در مدت اشتراک فعال شما نگهداری می‌شود. پس از انقضای اشتراک و عدم تمدید ظرف ۳۰ روز، تمام داده‌های مرتبط به طور دائم حذف می‌شوند. داده‌های اتصال VPN هرگز در هیچ مرحله‌ای ذخیره نمی‌شوند.',

  privacy_s8_title: '۸. حقوق شما',
  privacy_s8_text: 'شما حق دارید اطلاعاتی درباره داده‌هایی که ما از شما نگهداری می‌کنیم درخواست کنید، حذف داده‌های خود را بخواهید و در هر زمان حساب خود را ببندید. برای استفاده از هر یک از این حقوق با پشتیبانی تلگرام تماس بگیرید.',

  privacy_s9_title: '۹. تغییرات در این سیاست',
  privacy_s9_text: 'ما ممکن است این سیاست حریم خصوصی را هر از گاهی به‌روزرسانی کنیم. تغییرات مهم از طریق کانال‌های تلگرام ما اعلام خواهد شد. ادامه استفاده از سرویس پس از تغییرات به معنای پذیرش سیاست به‌روزشده است.',

  privacy_s10_title: '۱۰. تماس',
  privacy_s10_text: 'برای سوالات مربوط به حریم خصوصی، از طریق پشتیبانی تلگرام با ما در تماس باشید.',

  legal_back_home: '&rarr; بازگشت به صفحه اصلی',
};

const translations: Record<Lang, Translations> = { en, fa };

export function getSavedLang(): Lang {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'fa' || saved === 'en') return saved;
  return 'en';
}

export function applyLang(lang: Lang): void {
  const html = document.documentElement;

  html.setAttribute('dir', lang === 'fa' ? 'rtl' : 'ltr');
  html.setAttribute('lang', lang);

  const titleKey = html.dataset.titleKey || 'page_title';
  document.title = translations[lang][titleKey] || translations[lang].page_title;

  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n!;
    const text = translations[lang][key];
    if (text !== undefined) {
      el.textContent = text;
    }
  });

  document.querySelectorAll<HTMLElement>('[data-i18n-html]').forEach((el) => {
    const key = el.dataset.i18nHtml!;
    const text = translations[lang][key];
    if (text !== undefined) {
      el.innerHTML = text;
    }
  });

  document.querySelectorAll('.lang-toggle-label').forEach((el) => {
    el.textContent = lang === 'en' ? 'FA' : 'EN';
  });

  localStorage.setItem(STORAGE_KEY, lang);
}

export function toggleLang(): void {
  const current = getSavedLang();
  const next: Lang = current === 'en' ? 'fa' : 'en';
  applyLang(next);
}

export function initI18n(): void {
  applyLang(getSavedLang());

  document.querySelectorAll('#lang-toggle, #lang-toggle-mobile').forEach((btn) => {
    btn.addEventListener('click', toggleLang);
  });
}
