const en = {
  nav: { home: 'Home', services: 'Solutions', oilfield: 'Oil & Gas', about: 'About', contact: 'Contact', rfp: 'Request a proposal', language: 'العربية', open: 'Open navigation', close: 'Close navigation', skip: 'Skip to main content' },
  hero: {
    badge: 'ENGINEERING TECHNOLOGY FOR IRAQ',
    lines: ['Reliable infrastructure.', 'Integrated security.', 'Practical AI.'],
    intro: 'We design, deploy, and support digital infrastructure, security systems, and AI-enabled solutions for enterprise and industrial operations across Iraq.',
    explore: 'Explore solutions', contact: 'Discuss your project',
    diagramTitle: 'Connected by design.', diagramText: 'One coordinated engineering approach.',
    diagramLabel: 'Capability overview', diagramFoot: 'Design / Integrate / Support',
    diagramLayers: [ ['Intelligence', 'Operational insight & automation'], ['Security', 'People, facilities & information'], ['Infrastructure', 'Networks, data centers & power'] ],
    principles: [ ['End-to-end delivery', 'From assessment to ongoing support'], ['Built around your operation', 'Enterprise, industrial & remote sites'], ['A coordinated approach', 'Infrastructure, security & intelligence'] ],
  },
  solutions: { label: 'OUR SOLUTIONS', title: 'Three capabilities. One delivery partner.', intro: 'Start with your operational needs. We connect the right systems, define the scope, and plan for long-term support.', view: 'View solution', less: 'Hide details', request: 'Discuss this solution', detailTitle: 'Engineering scope', },
  pillars: [
    { id: 'infrastructure', icon: 'server', number: '01', title: 'Infrastructure & Power', tagline: 'Keep your essential systems connected and available.', summary: ['Data centers & server rooms', 'Fiber, enterprise networks & wireless', 'UPS & resilient power design'], details: ['Structured cabling, fiber testing, and network integration.', 'Rack layouts, cooling coordination, and data center design requirements.', 'Redundant power and connectivity options, sized to the agreed project scope.'] },
    { id: 'security', icon: 'shield', number: '02', title: 'Physical Security', tagline: 'Bring your surveillance, access, and perimeter systems together.', summary: ['CCTV & video management', 'Access control & visitor systems', 'Gates, barriers & perimeter detection'], details: ['Camera coverage planning and centralized recording.', 'Biometric, card-based, and vehicle access integration.', 'Facility protection requirements, equipment selection, and handover testing.'] },
    { id: 'cyber_ai', icon: 'cpu', number: '03', title: 'Cybersecurity & AI', tagline: 'Improve visibility, protect operations, and automate useful work.', summary: ['SOC, SIEM & security integration', 'Industrial network segmentation', 'Operational dashboards & applied AI'], details: ['Security monitoring and response workflows scoped to your operation.', 'IT/OT network separation, access policies, and integration planning.', 'AI-assisted document processing, computer vision, and custom business applications.'] },
  ],
  oil: {
    label: 'OIL, GAS & REMOTE OPERATIONS', title: 'Designed for demanding environments.', intro: 'Industrial projects need more than office-grade technology. We plan connectivity, security, and power around the conditions of each site.',
    items: [ ['Environmental requirements', 'Assess heat, dust, ingress protection, and hazardous-area requirements before selecting equipment.'], ['Resilient connectivity', 'Plan primary and backup links for field monitoring and remote-site communications.'], ['Maintainable systems', 'Define commissioning, documentation, spare parts, and support arrangements as part of the scope.'] ],
    cta: 'Discuss an industrial project', panelLabel: 'A PROJECT-LED APPROACH', panelTitle: 'Define the conditions. Engineer the system.', panelRows: [ ['01', 'Site assessment', 'Environment, access & operations'], ['02', 'System design', 'Connectivity, protection & power'], ['03', 'Delivery planning', 'Testing, handover & support'] ], note: 'Equipment ratings, availability targets, and response commitments are agreed per project.',
  },
  about: {
    label: 'THE SMART INNOVATION', title: 'Engineering that starts with your operation.', intro: 'We bring digital infrastructure, facility security, and operational intelligence into a coordinated engineering scope.', body: 'Your project should have a clear plan: what will be delivered, how it will be tested, and how it will be supported. Our approach keeps those decisions visible from the first conversation.',
    processLabel: 'HOW WE WORK', process: [ ['Discover', 'Understand your site, objectives, and constraints.'], ['Design', 'Define an integrated scope and implementation plan.'], ['Deliver', 'Integrate, test, document, and hand over the systems.'], ['Support', 'Agree the maintenance and support arrangements.'] ],
  },
  trust: {
    label: 'STANDARDS & ENGINEERING', title: 'Clear requirements. Documented scope.', intro: 'We discuss applicable standards at the design stage and identify the evidence required for your project.',
    items: [ ['TIA-942', 'Data center requirements', 'Specify the relevant facility, infrastructure, and redundancy requirements.'], ['ISO/IEC 27001', 'Information security', 'Align the agreed security scope with your information security requirements.'], ['IEC 62443', 'Industrial security', 'Define the relevant IT/OT security requirements and system boundaries.'], ['ATEX / IECEx', 'Hazardous-area equipment', 'Specify equipment certification requirements for the assessed environment.'] ],
    note: 'Standards shown describe design considerations, not claims of company certification or authorized vendor partnership. Any required project or equipment certificates must be verified in the proposal.',
  },
  contact: { label: 'LET’S DISCUSS YOUR PROJECT', title: 'A clear brief is a good start.', intro: 'Tell us what you need to achieve. Select a solution and prepare a structured inquiry for our team.', direct: 'Prefer a direct conversation?', directText: 'Contact us with your project scope or an initial question.', email: 'Email the team', call: 'Call us', whatsapp: 'Open WhatsApp', privacyTitle: 'Your inquiry, your choice', privacy: 'Your draft stays in this page’s memory. Preparing or downloading it does not send it. Email and WhatsApp open an external application; review your message there before sending. Do not include passwords, credentials, or sensitive network diagrams.', provider: 'Online submission provider', providerUnknown: 'Configured submission endpoint', },
  rfp: {
    title: 'Project inquiry', subtitle: 'Choose your scope. Add the details. Review the next step.', steps: ['Solution', 'Project', 'Contact & review'], step: 'Step', of: 'of', required: 'Fields marked * are required.',
    scopeTitle: 'What can we help you with?', modulesTitle: 'Areas of interest', optional: 'Optional',
    projectTitle: 'Tell us about the project.', contactTitle: 'How should we reach you?',
    pillar: 'Primary solution', location: 'Project location', facility: 'Facility type', timeline: 'Target timeline', choose: 'Select an option',
    name: 'Your name', company: 'Organization', email: 'Email address', phone: 'Phone number', notes: 'Project brief', notesHint: 'Describe your objectives, approximate scale, and any important constraints. Please omit sensitive information.',
    notePlaceholder: 'What do you need to achieve? What is the approximate size of the project?',
    attachment: 'Supporting document', fileHint: 'PDF, DOCX, XLSX, DWG, or ZIP. Maximum 25 MB. Do not attach confidential credentials.', removeFile: 'Remove attachment', manualFile: 'Documents are not uploaded in contact-handoff mode. Add any approved attachment yourself in email or WhatsApp.',
    consent: 'I agree to share these details with The Smart Innovation through the contact method I choose.', consentApi: 'I agree to send these details and any selected document to The Smart Innovation through the configured submission endpoint.',
    back: 'Back', next: 'Continue', prepare: 'Prepare inquiry', submit: 'Send inquiry', submitting: 'Sending…',
    modeManual: 'Prepare & hand off', modeApi: 'Online submission', modeManualText: 'This form prepares your brief. You choose how to send it.', modeApiText: 'This form sends your brief to the configured submission endpoint.',
    readyTitle: 'Your inquiry is ready.', readyText: 'It has not been sent. Review the details, then choose email or WhatsApp to send your message.', sentTitle: 'Your inquiry was accepted.', sentText: 'The submission service confirmed receipt. Keep the reference below for your records.', reference: 'Receipt reference',
    download: 'Download full brief', emailAction: 'Open email draft', whatsappAction: 'Open WhatsApp draft', edit: 'Edit inquiry', new: 'Start a new inquiry', summary: 'Inquiry summary', noModules: 'No specific areas selected', notProvided: 'Not provided', linkNote: 'Message drafts may contain a shortened brief. The downloaded text contains your full notes. Documents are not attached automatically.',
    retained: 'Changing language keeps your current draft.', scopeChanged: 'Solution updated. Contact and project details were kept; incompatible areas of interest were cleared.',
    errors: { required: 'Please complete this field.', email: 'Enter a valid email address.', phone: 'Enter a valid phone number with 7–15 digits.', consent: 'Please confirm how your details may be shared.', fileSize: 'Choose a non-empty file no larger than 25 MB.', fileType: 'Choose a PDF, DOCX, XLSX, DWG, or ZIP file.', timeout: 'The request timed out. Your draft is still available. Check with the team before retrying to avoid a duplicate.', network: 'Receipt was not confirmed. Your draft is still available; retry or contact the team directly.', endpoint: 'Online submission is not configured correctly. Contact the team directly; your draft has not been cleared.', response: 'The service did not confirm receipt. Your draft is still available.', tooLong: 'Please shorten this field.', },
  },
  options: {
    locations: [['baghdad', 'Baghdad'], ['basra', 'Basra'], ['maysan', 'Maysan'], ['dhiqar', 'Dhi Qar'], ['erbil', 'Erbil / Kurdistan Region'], ['other', 'Other location in Iraq']],
    facilities: [['enterprise', 'Enterprise office or campus'], ['datacenter', 'Data center / server room'], ['industrial', 'Industrial / oil & gas site'], ['public', 'Public-service facility'], ['logistics', 'Warehouse / logistics site'], ['other', 'Other']],
    timelines: [['urgent', 'Within 30 days'], ['quarter', '1–3 months'], ['planning', '3–6 months'], ['exploring', 'Exploring options']],
    modules: {
      infrastructure: [['datacenter', 'Data center design'], ['fiber', 'Fiber & structured cabling'], ['network', 'Enterprise & wireless networks'], ['power', 'UPS & power systems']],
      security: [['cctv', 'CCTV & video management'], ['access', 'Access control'], ['perimeter', 'Gates & perimeter systems'], ['alpr', 'Vehicle identification']],
      cyber_ai: [['soc', 'SOC / SIEM integration'], ['ot', 'Industrial security'], ['ai', 'Applied AI'], ['software', 'Dashboards & applications']],
      oilfield: [['rugged', 'Environmental equipment requirements'], ['remote', 'Remote-site connectivity'], ['fieldsecurity', 'Field security systems'], ['maintenance', 'Maintenance & support']],
    },
    oilfield: 'Oil & Gas / remote operations',
  },
  footer: { desc: 'Infrastructure. Security. Intelligence. A coordinated approach to technology delivery in Iraq.', explore: 'Explore', contact: 'Get in touch', rights: 'All rights reserved.', privacy: 'Inquiry privacy', standards: 'Standards & scope', top: 'Back to top' },
};

const ar = {
  nav: { home: 'الرئيسية', services: 'الحلول', oilfield: 'النفط والغاز', about: 'من نحن', contact: 'تواصل معنا', rfp: 'اطلب عرضاً', language: 'English', open: 'فتح القائمة', close: 'إغلاق القائمة', skip: 'الانتقال إلى المحتوى الرئيسي' },
  hero: {
    badge: 'حلول هندسية وتقنية في العراق', lines: ['بنية تحتية موثوقة.', 'أمن متكامل.', 'ذكاء اصطناعي عملي.'],
    intro: 'نصمم وننفذ وندعم البنية التحتية الرقمية والأنظمة الأمنية وحلول الذكاء الاصطناعي للمؤسسات والعمليات الصناعية في مختلف أنحاء العراق.',
    explore: 'استكشف الحلول', contact: 'ناقش مشروعك', diagramTitle: 'تكامل يبدأ من التصميم.', diagramText: 'منهج هندسي موحد يربط أنظمتك.', diagramLabel: 'نظرة على قدراتنا', diagramFoot: 'تصميم / تكامل / دعم',
    diagramLayers: [['الذكاء التشغيلي', 'تحليل العمليات وأتمتة الأعمال'], ['الأمن', 'حماية الأفراد والمنشآت والمعلومات'], ['البنية التحتية', 'الشبكات ومراكز البيانات والطاقة']],
    principles: [['تنفيذ متكامل', 'من دراسة المتطلبات إلى الدعم'], ['حلول تناسب عملياتك', 'للمؤسسات والمواقع الصناعية والنائية'], ['منهج مترابط', 'بنية تحتية وأمن وذكاء تشغيلي']],
  },
  solutions: { label: 'حلولنا', title: 'ثلاث قدرات. شريك تنفيذ واحد.', intro: 'نبدأ باحتياجاتك التشغيلية، ونربط الأنظمة المناسبة، ونحدد نطاق العمل وخطة الدعم طويل الأمد.', view: 'تفاصيل الحل', less: 'إخفاء التفاصيل', request: 'ناقش هذا الحل', detailTitle: 'نطاق العمل الهندسي' },
  pillars: [
    { id: 'infrastructure', icon: 'server', number: '01', title: 'البنية التحتية والطاقة', tagline: 'حافظ على اتصال أنظمتك الأساسية واستمرارية تشغيلها.', summary: ['مراكز البيانات وقاعات الخوادم', 'الألياف الضوئية والشبكات والاتصالات اللاسلكية', 'الطاقة غير المنقطعة وتصميم الاعتمادية'], details: ['الكابلات المنظمة وفحص الألياف وتكامل الشبكات.', 'تخطيط الرفوف والتبريد ومتطلبات تصميم مراكز البيانات.', 'خيارات الطاقة والاتصال الاحتياطية وفق نطاق المشروع المتفق عليه.'] },
    { id: 'security', icon: 'shield', number: '02', title: 'الأمن الفيزيائي', tagline: 'اربط أنظمة المراقبة والدخول وحماية المحيط في منظومة واحدة.', summary: ['كاميرات المراقبة وإدارة الفيديو', 'التحكم بالدخول وإدارة الزوار', 'البوابات والحواجز وكشف التسلل'], details: ['تخطيط تغطية الكاميرات والتسجيل المركزي.', 'تكامل الدخول بالبطاقات والقياسات الحيوية والمركبات.', 'تحديد متطلبات الحماية واختيار المعدات واختبارات التسليم.'] },
    { id: 'cyber_ai', icon: 'cpu', number: '03', title: 'الأمن السيبراني والذكاء الاصطناعي', tagline: 'حسّن الرؤية التشغيلية، واحمِ الأنظمة، وأتمت الأعمال المفيدة.', summary: ['تكامل مراكز العمليات الأمنية وSIEM', 'تقسيم الشبكات الصناعية وتأمينها', 'لوحات تشغيل وتطبيقات ذكاء اصطناعي'], details: ['تحديد نطاق المراقبة الأمنية وإجراءات الاستجابة.', 'فصل شبكات تقنية المعلومات والتشغيل وسياسات الوصول.', 'معالجة الوثائق والرؤية الحاسوبية وتطبيقات الأعمال المخصصة.'] },
  ],
  oil: {
    label: 'النفط والغاز والعمليات النائية', title: 'تصميم يناسب البيئات الصعبة.', intro: 'تحتاج المشاريع الصناعية إلى أكثر من تجهيزات مكتبية. نخطط للاتصالات والأمن والطاقة وفق ظروف كل موقع.',
    items: [['المتطلبات البيئية', 'دراسة الحرارة والغبار والحماية من التسرب ومتطلبات المناطق الخطرة قبل اختيار المعدات.'], ['اتصالات مرنة', 'تخطيط الروابط الأساسية والاحتياطية لمراقبة الحقول واتصالات المواقع النائية.'], ['أنظمة قابلة للصيانة', 'تحديد التشغيل التجريبي والوثائق وقطع الغيار وترتيبات الدعم ضمن نطاق العمل.']],
    cta: 'ناقش مشروعاً صناعياً', panelLabel: 'منهج يستند إلى متطلبات المشروع', panelTitle: 'حدد الظروف. صمم النظام.', panelRows: [['01', 'دراسة الموقع', 'البيئة والوصول والعمليات'], ['02', 'تصميم النظام', 'الاتصالات والحماية والطاقة'], ['03', 'تخطيط التنفيذ', 'الفحص والتسليم والدعم']], note: 'تُحدد مواصفات المعدات ومستويات الإتاحة وأوقات الاستجابة لكل مشروع على حدة.',
  },
  about: {
    label: 'الابتكار الذكي', title: 'هندسة تبدأ من احتياجات عملياتك.', intro: 'نجمع البنية التحتية الرقمية وأمن المنشآت والذكاء التشغيلي ضمن نطاق هندسي متكامل.', body: 'يحتاج مشروعك إلى خطة واضحة لما سيُنفذ وكيف سيُختبر وكيف سيُدعم. نحافظ على وضوح هذه القرارات منذ المحادثة الأولى.', processLabel: 'كيف نعمل', process: [['نستكشف', 'نفهم الموقع والأهداف والقيود.'], ['نصمم', 'نحدد نطاق العمل وخطة التنفيذ.'], ['ننفذ', 'نربط الأنظمة ونفحصها ونوثقها ونسلمها.'], ['ندعم', 'نتفق على ترتيبات الصيانة والدعم.']],
  },
  trust: {
    label: 'المعايير والعمل الهندسي', title: 'متطلبات واضحة. نطاق موثق.', intro: 'نناقش المعايير ذات الصلة خلال التصميم ونحدد أدلة المطابقة المطلوبة لمشروعك.',
    items: [['TIA-942', 'متطلبات مراكز البيانات', 'تحديد المتطلبات المناسبة للمنشأة والبنية التحتية والاعتمادية.'], ['ISO/IEC 27001', 'أمن المعلومات', 'مواءمة النطاق الأمني المتفق عليه مع متطلبات أمن المعلومات.'], ['IEC 62443', 'الأمن الصناعي', 'تحديد متطلبات أمن شبكات تقنية المعلومات والتشغيل وحدود الأنظمة.'], ['ATEX / IECEx', 'معدات المناطق الخطرة', 'تحديد شهادات المعدات المطلوبة وفق تصنيف بيئة العمل.']],
    note: 'تعرض هذه المعايير اعتبارات تصميمية، ولا تمثل ادعاءً بحصول الشركة على شهادات أو شراكات معتمدة. يجب التحقق من الشهادات المطلوبة للمشروع أو المعدات ضمن العرض.',
  },
  contact: { label: 'لنتحدث عن مشروعك', title: 'البداية الجيدة هي متطلبات واضحة.', intro: 'أخبرنا بالنتيجة التي تريد تحقيقها. اختر الحل وأعد طلباً منظماً لفريقنا.', direct: 'تفضل التواصل المباشر؟', directText: 'تواصل معنا لمناقشة نطاق مشروعك أو أي استفسار أولي.', email: 'راسل الفريق', call: 'اتصل بنا', whatsapp: 'افتح واتساب', privacyTitle: 'بيانات طلبك تحت اختيارك', privacy: 'تبقى المسودة في ذاكرة هذه الصفحة. إعدادها أو تنزيلها لا يرسلها. يفتح البريد وواتساب تطبيقاً خارجياً؛ راجع الرسالة فيه قبل إرسالها. لا تضف كلمات مرور أو بيانات اعتماد أو مخططات شبكات حساسة.', provider: 'مزود خدمة الإرسال', providerUnknown: 'جهة الإرسال المهيأة', },
  rfp: {
    title: 'طلب مشروع', subtitle: 'اختر النطاق. أضف التفاصيل. راجع الخطوة التالية.', steps: ['الحل', 'المشروع', 'التواصل والمراجعة'], step: 'الخطوة', of: 'من', required: 'الحقول المميزة بعلامة * مطلوبة.', scopeTitle: 'كيف يمكننا مساعدتك؟', modulesTitle: 'المجالات المطلوبة', optional: 'اختياري', projectTitle: 'أخبرنا عن المشروع.', contactTitle: 'كيف نتواصل معك؟', pillar: 'الحل الأساسي', location: 'موقع المشروع', facility: 'نوع المنشأة', timeline: 'الإطار الزمني', choose: 'اختر من القائمة', name: 'الاسم', company: 'المؤسسة', email: 'البريد الإلكتروني', phone: 'رقم الهاتف', notes: 'ملخص المشروع', notesHint: 'اذكر الأهداف والحجم التقريبي والقيود المهمة، دون معلومات حساسة.', notePlaceholder: 'ما المطلوب تحقيقه؟ وما الحجم التقريبي للمشروع؟', attachment: 'وثيقة داعمة', fileHint: 'PDF أو DOCX أو XLSX أو DWG أو ZIP. الحد الأقصى 25 ميجابايت. لا ترفق بيانات اعتماد سرية.', removeFile: 'إزالة المرفق', manualFile: 'لا تُرفع الوثائق في وضع التواصل الخارجي. أضف المرفق المعتمد بنفسك في البريد أو واتساب.', consent: 'أوافق على مشاركة هذه التفاصيل مع الابتكار الذكي عبر وسيلة التواصل التي أختارها.', consentApi: 'أوافق على إرسال هذه التفاصيل وأي وثيقة مختارة إلى الابتكار الذكي عبر جهة الإرسال المهيأة.', back: 'السابق', next: 'متابعة', prepare: 'إعداد الطلب', submit: 'إرسال الطلب', submitting: 'جارٍ الإرسال…', modeManual: 'إعداد وتواصل خارجي', modeApi: 'إرسال إلكتروني', modeManualText: 'يُعد النموذج ملخص طلبك. أنت تختار طريقة إرساله.', modeApiText: 'يرسل النموذج طلبك إلى جهة الإرسال المهيأة.', readyTitle: 'طلبك جاهز للمراجعة.', readyText: 'لم يُرسل بعد. راجع التفاصيل ثم اختر البريد الإلكتروني أو واتساب لإرسال الرسالة.', sentTitle: 'تم قبول طلبك.', sentText: 'أكدت خدمة الإرسال استلام الطلب. احتفظ بالمرجع أدناه للمتابعة.', reference: 'مرجع الاستلام', download: 'تنزيل الملخص الكامل', emailAction: 'فتح مسودة بريد', whatsappAction: 'فتح مسودة واتساب', edit: 'تعديل الطلب', new: 'بدء طلب جديد', summary: 'ملخص الطلب', noModules: 'لم تُحدد مجالات إضافية', notProvided: 'غير محدد', linkNote: 'قد تتضمن مسودة الرسالة ملخصاً مختصراً. يحتوي الملف النصي على ملاحظاتك كاملة. لا تُرفق الوثائق تلقائياً.', retained: 'تغيير اللغة يحافظ على المسودة الحالية.', scopeChanged: 'تم تحديث الحل والاحتفاظ ببيانات التواصل والمشروع، مع إزالة المجالات غير المتوافقة.',
    errors: { required: 'يرجى إكمال هذا الحقل.', email: 'أدخل بريداً إلكترونياً صالحاً.', phone: 'أدخل رقم هاتف صالحاً يحتوي على 7 إلى 15 رقماً.', consent: 'يرجى تأكيد الموافقة على مشاركة البيانات.', fileSize: 'اختر ملفاً غير فارغ لا يتجاوز حجمه 25 ميجابايت.', fileType: 'اختر ملف PDF أو DOCX أو XLSX أو DWG أو ZIP.', timeout: 'انتهت مهلة الطلب. ما زالت المسودة متاحة. تحقق مع الفريق قبل إعادة المحاولة لتجنب التكرار.', network: 'لم يُؤكد الاستلام. ما زالت المسودة متاحة؛ أعد المحاولة أو تواصل مع الفريق مباشرة.', endpoint: 'خدمة الإرسال غير مهيأة بصورة صحيحة. تواصل مع الفريق مباشرة؛ لم تُحذف المسودة.', response: 'لم تؤكد الخدمة استلام الطلب. ما زالت المسودة متاحة.', tooLong: 'يرجى تقصير هذا الحقل.' },
  },
  options: {
    locations: [['baghdad', 'بغداد'], ['basra', 'البصرة'], ['maysan', 'ميسان'], ['dhiqar', 'ذي قار'], ['erbil', 'أربيل / إقليم كردستان'], ['other', 'موقع آخر في العراق']],
    facilities: [['enterprise', 'مقر مؤسسة أو مجمع أعمال'], ['datacenter', 'مركز بيانات / قاعة خوادم'], ['industrial', 'موقع صناعي / نفطي'], ['public', 'مرفق خدمات عامة'], ['logistics', 'مستودع / موقع لوجستي'], ['other', 'أخرى']],
    timelines: [['urgent', 'خلال 30 يوماً'], ['quarter', 'من شهر إلى 3 أشهر'], ['planning', 'من 3 إلى 6 أشهر'], ['exploring', 'دراسة الخيارات']],
    modules: {
      infrastructure: [['datacenter', 'تصميم مركز بيانات'], ['fiber', 'ألياف ضوئية وكابلات منظمة'], ['network', 'شبكات مؤسسية ولاسلكية'], ['power', 'أنظمة الطاقة وUPS']],
      security: [['cctv', 'مراقبة بالكاميرات وإدارة الفيديو'], ['access', 'التحكم بالدخول'], ['perimeter', 'البوابات وحماية المحيط'], ['alpr', 'التعرف على المركبات']],
      cyber_ai: [['soc', 'تكامل SOC / SIEM'], ['ot', 'أمن صناعي'], ['ai', 'ذكاء اصطناعي تطبيقي'], ['software', 'لوحات معلومات وتطبيقات']],
      oilfield: [['rugged', 'متطلبات معدات البيئة الصناعية'], ['remote', 'ربط المواقع النائية'], ['fieldsecurity', 'أنظمة أمن الحقول'], ['maintenance', 'صيانة ودعم']],
    }, oilfield: 'النفط والغاز / العمليات النائية',
  },
  footer: { desc: 'بنية تحتية وأمن وذكاء تشغيلي. منهج متكامل لتنفيذ الحلول التقنية في العراق.', explore: 'استكشف', contact: 'تواصل معنا', rights: 'جميع الحقوق محفوظة.', privacy: 'خصوصية الطلب', standards: 'المعايير ونطاق العمل', top: 'العودة إلى الأعلى' },
};
export const translations = { en, ar };
