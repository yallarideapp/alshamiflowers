export const LAST_UPDATED = '2026-11-06';

const notices = {
  en: 'The Al-Shami Flowers name and business imagery belong to their respective owners. Other names and trademarks belong to their owners.',
  ar: 'اسم أزهار الشامي وصور أعماله مملوكة لأصحاب الحقوق المعنيين. وتعود الأسماء والعلامات التجارية الأخرى إلى أصحابها.',
};

export function trademarkNotice(lang = 'en') {
  return notices[lang] || notices.en;
}

export const labels = {
  en: { privacy: 'Privacy policy', terms: 'Terms & conditions', updated: 'Last updated' },
  ar: { privacy: 'سياسة الخصوصية', terms: 'الشروط والأحكام', updated: 'آخر تحديث' },
};

export const legal = {
  en: {
    labels: labels.en,
    privacy: {
      title: 'Privacy policy',
      sections: [
        {
          title: 'About this website',
          body: 'This website presents Al-Shami Flowers in Irbid, Jordan. The interface has no customer accounts, personal-data forms, payment processing or order-submission service. To enquire, contact @alshami.flowers on Instagram or call +962 7 9067 6747.',
        },
        {
          title: 'Preferences saved on your device',
          body: 'Your browser stores your language in alshami-v2-language and selected design IDs and quantities in alshami-v2-selection. These localStorage entries contain no contact details and remain until you clear your browser’s site data; resetting your selection clears the saved designs. Selections are never sent automatically. You choose whether to copy them and share them with the shop.',
        },
        {
          title: 'Images, cookies and external services',
          body: 'Fonts and images are served with the site. This interface does not set cookies or use analytics, advertising pixels or embedded social feeds. Instagram and telephone links open only when you choose them. Instagram is operated by Meta under its own privacy terms; messages and calls are handled outside this website.',
        },
        {
          title: 'Hosting and conversation records',
          body: 'This version is supplied as website source in a GitHub repository. A production hosting provider and access-log retention period have not been specified. The shop has not supplied its retention period for enquiries or customer conversations. Ask the shop for these details before sharing personal information.',
        },
        {
          title: 'Your choices and rights',
          body: 'Clear this site’s browser data to remove saved preferences. For access, correction, deletion, an objection or withdrawal of consent relating to information shared directly with the shop, contact @alshami.flowers or +962 7 9067 6747. Information held by Instagram is also subject to Meta’s account and privacy controls. No specific response or deletion deadline is promised here.',
        },
        {
          title: 'Jordanian law and complaints',
          body: 'Jordan’s Personal Data Protection Law No. 24 of 2023 provides the applicable framework for personal-data processing within its scope. Raise a concern with the shop first. If it is not appropriately addressed, the Ministry of Digital Economy and Entrepreneurship’s Personal Data Protection Directorate explains escalation through the Bekhidmetkom portal on its Services page: https://modee.gov.jo/EN/Pages/Services',
        },
      ],
    },
    terms: {
      title: 'Terms & conditions',
      sections: [
        {
          title: 'Exploring and making an enquiry',
          body: 'This website is a floral showcase. Saving or copying a selection is not an order, reservation or payment. Any enquiry remains a request until the shop confirms the arrangement and its commercial terms directly with you.',
        },
        {
          title: 'Designs and images',
          body: 'Design names and the displayed collection are illustrative inspiration, not a live stock list. Photos include business imagery from Instagram and an AI-generated decorative hero illustration. Flowers, colours, wrapping, sizes and seasonal substitutions may differ; agree on the final arrangement with the shop.',
        },
        {
          title: 'Price, payment and delivery',
          body: 'Availability, final price and currency, payment method, delivery area, delivery fee and timing must be confirmed by the shop before you agree to proceed. The website does not take payments or guarantee a delivery date.',
        },
        {
          title: 'Changes, cancellations and concerns',
          body: 'The shop has not supplied a published cancellation, refund, return or flower-quality policy for this version. Confirm these terms directly before ordering, and contact the shop promptly about a concern. Nothing here limits mandatory consumer rights under applicable Jordanian law.',
        },
        {
          title: 'Names and media rights',
          body: trademarkNotice('en'),
        },
        {
          title: 'Use and contact',
          body: 'Use the website lawfully and do not interfere with its operation or misuse its content. Any limitation of responsibility is subject to applicable law and mandatory consumer rights. These terms are governed by applicable Jordanian law. For questions, contact @alshami.flowers on Instagram or +962 7 9067 6747.',
        },
      ],
    },
  },
  ar: {
    labels: labels.ar,
    privacy: {
      title: 'سياسة الخصوصية',
      sections: [
        {
          title: 'عن هذا الموقع',
          body: 'يعرض هذا الموقع أزهار الشامي في إربد، الأردن. لا تتضمن الواجهة حسابات للعملاء أو نماذج للبيانات الشخصية أو معالجة للمدفوعات أو خدمة لإرسال الطلبات. للاستفسار، تواصلوا مع @alshami.flowers عبر إنستغرام أو اتصلوا على +962 7 9067 6747.',
        },
        {
          title: 'التفضيلات المحفوظة على جهازك',
          body: 'يحفظ المتصفح اللغة في المفتاح alshami-v2-language، ومعرّفات التصاميم المختارة وكمياتها في المفتاح alshami-v2-selection باستخدام التخزين المحلي. لا تتضمن هذه البيانات معلومات اتصال، وتبقى حتى تمسح بيانات الموقع من المتصفح. تؤدي إعادة تعيين الاختيارات إلى مسح التصاميم المحفوظة. لا تُرسل الاختيارات تلقائياً؛ أنت من يختار نسخها ومشاركتها مع المتجر.',
        },
        {
          title: 'الصور وملفات الارتباط والخدمات الخارجية',
          body: 'تُقدَّم الخطوط والصور من ملفات الموقع. لا تستخدم الواجهة ملفات تعريف الارتباط أو أدوات التحليل أو بكسلات الإعلانات أو موجزات التواصل الاجتماعي المضمّنة. تُفتح روابط إنستغرام والاتصال فقط عند اختيارها. تدير شركة Meta إنستغرام وفق شروط الخصوصية الخاصة بها، وتُجرى الرسائل والمكالمات خارج هذا الموقع.',
        },
        {
          title: 'الاستضافة وسجلات المحادثات',
          body: 'تُقدَّم هذه النسخة بصفتها ملفات موقع في مستودع GitHub. لم يُحدَّد مزوّد استضافة للنشر العام أو مدة للاحتفاظ بسجلات الوصول. ولم يزوّد المتجر هذه النسخة بمدة للاحتفاظ بالاستفسارات أو محادثات العملاء. يرجى طلب هذه التفاصيل من المتجر قبل مشاركة المعلومات الشخصية.',
        },
        {
          title: 'خياراتك وحقوقك',
          body: 'يمكنك مسح بيانات الموقع من المتصفح لإزالة التفضيلات المحفوظة. لطلب الوصول إلى المعلومات التي شاركتها مباشرة مع المتجر أو تصحيحها أو حذفها أو الاعتراض على معالجتها أو سحب الموافقة، تواصل مع @alshami.flowers أو +962 7 9067 6747. تخضع المعلومات لدى إنستغرام أيضاً لإعدادات الحساب والخصوصية لدى Meta. لا تتضمن هذه السياسة وعداً بمهلة محددة للرد أو الحذف.',
        },
        {
          title: 'القانون الأردني والشكاوى',
          body: 'يشكّل قانون حماية البيانات الشخصية الأردني رقم 24 لسنة 2023 الإطار القانوني لمعالجة البيانات الشخصية ضمن نطاق تطبيقه. قدّم الشكوى إلى المتجر أولاً. وفي حال عدم اتخاذ الإجراء المناسب، توضّح مديرية حماية البيانات الشخصية في وزارة الاقتصاد الرقمي والريادة طريقة التصعيد عبر بوابة بخدمتكم في صفحة الخدمات: https://modee.gov.jo/EN/Pages/Services',
        },
      ],
    },
    terms: {
      title: 'الشروط والأحكام',
      sections: [
        {
          title: 'التصفّح والاستفسار',
          body: 'هذا الموقع معرض لتنسيقات الزهور. لا يشكّل حفظ الاختيارات أو نسخها طلباً أو حجزاً أو دفعاً. يظل الاستفسار طلباً أولياً حتى يؤكد المتجر التنسيق والشروط التجارية مباشرة معك.',
        },
        {
          title: 'التصاميم والصور',
          body: 'أسماء التصاميم والمجموعة المعروضة أمثلة للإلهام وليست قائمة مخزون مباشرة. تشمل الصور صوراً لأعمال المتجر من إنستغرام وصورة زخرفية رئيسية مولّدة بالذكاء الاصطناعي. قد تختلف الزهور والألوان والتغليف والأحجام والبدائل الموسمية؛ لذا يرجى الاتفاق مع المتجر على التنسيق النهائي.',
        },
        {
          title: 'الأسعار والدفع والتوصيل',
          body: 'يؤكد المتجر التوافر والسعر النهائي والعملة وطريقة الدفع ومنطقة التوصيل ورسومه وموعده قبل الموافقة على التنفيذ. لا يستقبل الموقع المدفوعات ولا يضمن موعداً للتوصيل.',
        },
        {
          title: 'التعديل والإلغاء والملاحظات',
          body: 'لم يزوّد المتجر هذه النسخة بسياسة منشورة للإلغاء أو الاسترداد أو الإرجاع أو جودة الزهور. يرجى تأكيد هذه الشروط مباشرة قبل الطلب، والتواصل مع المتجر سريعاً عند وجود ملاحظة. لا تنتقص هذه الشروط من حقوق المستهلك الإلزامية وفق القانون الأردني المعمول به.',
        },
        {
          title: 'الأسماء وحقوق الصور',
          body: trademarkNotice('ar'),
        },
        {
          title: 'الاستخدام والتواصل',
          body: 'استخدم الموقع بصورة مشروعة، ولا تعطل تشغيله أو تسيء استخدام محتواه. يخضع أي تحديد للمسؤولية للقانون المعمول به وحقوق المستهلك الإلزامية. تخضع هذه الشروط للقانون الأردني المعمول به. للاستفسار، تواصل مع @alshami.flowers عبر إنستغرام أو اتصل على +962 7 9067 6747.',
        },
      ],
    },
  },
};
