const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(compression());
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: process.env.NODE_ENV === 'production' ? '1d' : 0,
    etag: true,
    lastModified: true
}));

// Security headers for production
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
});

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// =====================================================
// TRANSLATIONS
// =====================================================
const translations = {
    es: {
        // Meta
        lang: 'es',
        langName: 'Español',
        // Header
        nav: {
            home: 'Inicio',
            services: 'Servicios',
            about: 'Nosotros',
            specialists: 'Especialistas',
            reviews: 'Opiniones',
            contact: 'Contacto'
        },
        header: {
            callUs: 'Llámanos',
            freeAppointment: 'Cita Gratuita'
        },
        // Hero
        hero: {
            badge: 'Clínica Premium #1 en Polonia',
            title1: 'Transformamos',
            title2: 'Tu Salud',
            title3: 'En Bienestar',
            description: 'Tecnología de vanguardia, especialistas de renombre internacional y más de',
            descriptionYears: 'años creando sonrisas perfectas.',
            offerBadge: 'OFERTA EXCLUSIVA',
            offerDiscount: '-50%',
            offerText: 'Primera consulta + Diagnóstico GRATIS',
            btnAppointment: 'Reservar Cita Gratis',
            btnLearnMore: 'Conocer Más',
            trustLifetime: 'Garantía de por vida',
            trustFinancing: 'Financiación 0%',
            trustResults: 'Resultados inmediatos',
            scrollDiscover: 'Descubre más',
            reviews: 'reseñas',
            happyPatients: 'Pacientes felices',
            yearsExperience: 'Años experiencia'
        },
        // Stats
        stats: {
            treatments: 'Tratamientos Exitosos',
            specialists: 'Especialistas Expertos',
            satisfaction: 'Satisfacción Garantizada',
            awards: 'Premios Internacionales'
        },
        // Services
        services: {
            subtitle: 'Nuestros Servicios',
            title: 'Tratamientos de',
            titleHighlight: 'Excelencia',
            description: 'Tecnología de última generación y los mejores profesionales del sector',
            popular: 'Más Popular',
            from: 'Desde',
            moreInfo: 'Más información'
        },
        // About
        about: {
            subtitle: 'Sobre Nosotros',
            title: 'La Clínica de',
            titleHighlight: 'Referencia',
            titleEnd: 'en Polonia',
            description: 'Combinamos la experiencia de más de dos décadas con la tecnología más avanzada. Nuestro equipo de especialistas, formados en las mejores universidades del mundo, está comprometido con ofrecerte resultados excepcionales.',
            premiumFacilities: 'Instalaciones Premium',
            technology3D: 'Tecnología 3D',
            yearsExcellence: 'Años de Excelencia',
            featureTech: 'Tecnología de Vanguardia',
            featureTechDesc: 'Escáner 3D, láser dental, cirugía guiada',
            featureTeam: 'Equipo de Élite',
            featureTeamDesc: 'Formación internacional certificada',
            featureCare: 'Atención Personalizada',
            featureCareDesc: 'Plan único para cada paciente',
            featureFinancing: 'Financiación Flexible',
            featureFinancingDesc: 'Hasta 60 meses sin intereses',
            meetTeam: 'Conoce al Equipo'
        },
        // Specialists
        specialists: {
            subtitle: 'Nuestro Equipo',
            title: 'Especialistas de',
            titleHighlight: 'Renombre',
            description: 'Profesionales dedicados a cuidar de tu salud',
            yearsExp: 'Años Exp.',
            viewAll: 'Ver Todo el Equipo',
            medicalDirector: 'Director Médico',
            bookAppointment: 'Pedir Cita',
            viewProfile: 'Ver Perfil',
            yearsExperience: 'años de experiencia',
            pageTitle: 'Un equipo de profesionales altamente cualificados dedicados a tu salud',
            appointmentNotice: 'Para citas con nuestros especialistas:'
        },
        // Testimonials
        testimonials: {
            subtitle: 'Testimonios',
            title: 'Lo Que Dicen',
            titleHighlight: 'Nuestros Pacientes',
            verifiedReviews: 'reseñas verificadas',
            verified: 'Verificado',
            featured: 'Destacado',
            recognizedBy: 'Reconocidos por:'
        },
        // Appointment
        appointment: {
            subtitle: 'Reserva tu Cita',
            title: 'Tu Nueva Sonrisa',
            titleHighlight: 'Empieza Aquí',
            description: 'Primera consulta y diagnóstico 3D completamente gratis. Sin compromiso. Te llamamos en menos de 2 horas.',
            benefitConsult: 'Consulta Gratuita',
            benefitConsultDesc: 'Valoración completa sin coste',
            benefitDiag: 'Diagnóstico 3D',
            benefitDiagDesc: 'Tecnología de última generación',
            benefitPlan: 'Plan Personalizado',
            benefitPlanDesc: 'Presupuesto detallado sin compromiso',
            benefitFinancing: 'Financiación 0%',
            benefitFinancingDesc: 'Hasta 60 meses sin intereses',
            callFree: 'Llámanos gratis',
            whatsapp: 'WhatsApp',
            formTitle: 'Solicita tu Cita Gratis',
            formSubtitle: 'Te contactamos en menos de 2 horas',
            formName: 'Tu nombre completo',
            formPhone: 'Tu teléfono',
            formEmail: 'Tu email',
            formTreatment: 'Selecciona un tratamiento',
            formOther: 'Otro / No estoy seguro',
            formMessage: 'Cuéntanos tu caso (opcional)',
            formPrivacy: 'Acepto la',
            formPrivacyLink: 'política de privacidad',
            formSubmit: 'Solicitar Cita Gratuita',
            formSecure: 'Tus datos están protegidos y seguros'
        },
        // Contact
        contact: {
            subtitle: 'Contacto',
            title: 'Visítanos en',
            titleHighlight: 'Nuestra Clínica',
            address: 'Dirección',
            viewMap: 'Ver en mapa',
            phone: 'Teléfono',
            freeCall: 'Llamada gratuita',
            callNow: 'Llamar ahora',
            schedule: 'Horario',
            weekdays: 'Lun - Vie',
            saturday: 'Sábados',
            bookAppointment: 'Reservar cita',
            email: 'Email',
            sendEmail: 'Enviar email'
        },
        // Footer
        footer: {
            description: 'Centro médico multiespecialidad con más de 25 años de experiencia. Tecnología de vanguardia y los mejores especialistas.',
            quickLinks: 'Enlaces Rápidos',
            ourServices: 'Nuestros Servicios',
            contactInfo: 'Información de Contacto',
            parking: 'Estacionamiento privado gratuito',
            allRights: 'Todos los derechos reservados.',
            developedWith: 'Desarrollado con'
        },
        // CTA Doctors page
        cta: {
            title: '¿Necesitas una consulta con uno de nuestros especialistas?',
            description: 'Primera visita gratuita. Te ayudamos a encontrar el tratamiento adecuado.',
            btnAppointment: 'Reservar Cita Gratis'
        },
        // Service names
        serviceNames: {
            odontologia: 'Odontología',
            cardiologia: 'Cardiología',
            oftalmologia: 'Oftalmología',
            ortopedia: 'Ortopedia',
            psiquiatria: 'Psiquiatría',
            pediatria: 'Pediatría',
            oncologia: 'Cirugía Oncológica',
            geriatria: 'Geriatría',
            nutricion: 'Nutrición Clínica',
            proctologia: 'Proctología',
            estetica: 'Medicina Estética',
            rehabilitacion: 'Rehabilitación'
        },
        // Stats labels
        statsLabels: {
            implants: 'Implantes',
            cases: 'Casos',
            surgeries: 'Cirugías',
            patients: 'Pacientes',
            treatments: 'Tratamientos',
            veneers: 'Carillas',
            smiles: 'Sonrisas',
            kids: 'Niños',
            families: 'Familias',
            complex: 'Complejos',
            regenerations: 'Regeneraciones',
            invisalign: 'Invisalign',
            consultations: 'Consultas',
            assessments: 'Evaluaciones',
            plans: 'Planes',
            procedures: 'Procedimientos',
            echocardiograms: 'Ecocardiogramas',
            screenings: 'Exámenes',
            athletes: 'Atletas',
            prostheses: 'Prótesis',
            sessions: 'Sesiones',
            endodoncias: 'Endodoncias',
            children: 'Niños'
        },
        // Hours
        hours: {
            weekdays: '9:00 - 18:00',
            saturday: 'Cerrado',
            sunday: 'Cerrado'
        },
        // 404
        notFound: {
            title: 'Página No Encontrada',
            description: 'Lo sentimos, la página que buscas no existe.',
            backHome: 'Volver al Inicio'
        },
        // Legal
        legal: {
            privacyTitle: 'Política de Privacidad',
            termsTitle: 'Reglamento',
            cookiesTitle: 'Política de Cookies',
            lastUpdated: 'Última actualización',
            dataController: 'Responsable del Tratamiento',
            dataControllerText: 'El responsable del tratamiento de sus datos personales es:',
            companyName: 'Nombre de la empresa',
            address: 'Dirección',
            email: 'Correo electrónico',
            phone: 'Teléfono',
            dataCollected: 'Datos que Recopilamos',
            dataCollectedText: 'Recopilamos los siguientes tipos de datos personales:',
            dataName: 'Nombre y apellidos',
            dataEmail: 'Dirección de correo electrónico',
            dataPhone: 'Número de teléfono',
            dataHealth: 'Datos de salud (historial médico, tratamientos)',
            dataIP: 'Dirección IP y datos de navegación',
            purposeTitle: 'Finalidad del Tratamiento',
            purposeText: 'Sus datos personales son tratados para las siguientes finalidades:',
            purposeAppointment: 'Gestión de citas médicas',
            purposeMedical: 'Prestación de servicios médicos',
            purposeContact: 'Comunicación con pacientes',
            purposeMarketing: 'Marketing directo (con consentimiento)',
            legalBasis: 'Base Legal',
            legalBasisText: 'El tratamiento de sus datos se basa en:',
            gdprArt6: 'Artículo 6 del RGPD:',
            consent: 'Consentimiento del interesado',
            contract: 'Ejecución de un contrato',
            legalObligation: 'Cumplimiento de obligación legal',
            vitalInterest: 'Interés vital del paciente',
            rightsTitle: 'Sus Derechos',
            rightsText: 'Según el RGPD, usted tiene los siguientes derechos:',
            rightAccess: 'Derecho de acceso a sus datos',
            rightRectification: 'Derecho de rectificación',
            rightErasure: 'Derecho de supresión (derecho al olvido)',
            rightRestriction: 'Derecho a la limitación del tratamiento',
            rightPortability: 'Derecho a la portabilidad de datos',
            rightObjection: 'Derecho de oposición',
            retentionTitle: 'Conservación de Datos',
            retentionText: 'Sus datos médicos se conservarán durante el período legalmente establecido (20 años según la legislación sanitaria). Los datos de contacto se conservarán mientras mantenga relación con nosotros.',
            securityTitle: 'Seguridad de los Datos',
            securityText: 'Implementamos medidas técnicas y organizativas apropiadas para garantizar la seguridad de sus datos personales, incluyendo cifrado, control de acceso y copias de seguridad regulares.',
            contactDPO: 'Contacto',
            contactDPOText: 'Para ejercer sus derechos o realizar consultas sobre protección de datos, contacte con nosotros:',
            generalProvisions: 'Disposiciones Generales',
            generalProvisionsText: 'Este reglamento establece las condiciones generales de uso de los servicios médicos prestados por Gabinety Borki. Al utilizar nuestros servicios, acepta las siguientes condiciones.',
            servicesOffered: 'Servicios Ofrecidos',
            servicesOfferedText: 'Nuestro centro médico ofrece los siguientes servicios:',
            servicesDentistry: 'Servicios de odontología y periodoncia',
            servicesCardiology: 'Consultas y diagnóstico cardiológico',
            servicesOphthalmology: 'Servicios de oftalmología',
            servicesOrthopedics: 'Traumatología y ortopedia',
            servicesOther: 'Otras especialidades médicas según disponibilidad',
            appointmentRules: 'Normas de Citas',
            appointmentRulesText: 'Las citas se gestionan de la siguiente manera:',
            appointmentPhone: 'Las citas pueden solicitarse por teléfono o a través del formulario web',
            appointmentOnline: 'La confirmación de cita se enviará por SMS o email',
            appointmentCancel: 'Las cancelaciones deben realizarse con al menos 24 horas de antelación',
            patientRights: 'Derechos del Paciente',
            patientRightsText: 'Como paciente, usted tiene derecho a:',
            rightInfo: 'Información completa sobre su estado de salud y tratamientos',
            rightDocs: 'Acceso a su documentación médica',
            rightConfidentiality: 'Confidencialidad de sus datos médicos',
            rightComplaint: 'Presentar reclamaciones',
            patientObligations: 'Obligaciones del Paciente',
            patientObligationsText: 'El paciente se compromete a:',
            obligationInfo: 'Proporcionar información veraz sobre su estado de salud',
            obligationPunctual: 'Acudir puntualmente a las citas programadas',
            obligationRespect: 'Respetar al personal médico y las instalaciones',
            obligationPayment: 'Abonar los servicios según las tarifas establecidas',
            payments: 'Pagos',
            paymentsText: 'Los pagos se realizan en efectivo, tarjeta de débito/crédito o transferencia bancaria. Ofrecemos financiación hasta 60 meses sin intereses.',
            liability: 'Responsabilidad',
            liabilityText: 'El centro médico no se responsabiliza de las consecuencias derivadas del incumplimiento de las indicaciones médicas por parte del paciente.',
            complaints: 'Reclamaciones',
            complaintsText: 'Las reclamaciones pueden presentarse por escrito o email. Serán atendidas en un plazo máximo de 30 días.',
            finalProvisions: 'Disposiciones Finales',
            finalProvisionsText: 'Este reglamento está sujeto a la legislación polaca y de la Unión Europea. Cualquier modificación será comunicada a los pacientes.',
            whatAreCookies: '¿Qué son las Cookies?',
            whatAreCookiesText: 'Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio web. Nos ayudan a mejorar su experiencia de navegación.',
            cookiesWeUse: 'Cookies que Utilizamos',
            cookiesWeUseText: 'Utilizamos los siguientes tipos de cookies:',
            essentialCookies: 'Cookies Esenciales',
            essentialCookiesText: 'Necesarias para el funcionamiento básico del sitio web.',
            analyticsCookies: 'Cookies Analíticas',
            analyticsCookiesText: 'Nos ayudan a entender cómo los visitantes interactúan con el sitio.',
            cookieName: 'Nombre',
            cookiePurpose: 'Propósito',
            cookieDuration: 'Duración',
            cookieLangPurpose: 'Almacena la preferencia de idioma del usuario',
            cookieSessionPurpose: 'Mantiene la sesión del usuario',
            cookieAnalyticsPurpose: 'Análisis de tráfico web',
            sessionDuration: 'Sesión',
            year: 'año',
            years: 'años',
            hours: 'horas',
            manageCookies: 'Gestionar Cookies',
            manageCookiesText: 'Puede gestionar las cookies a través de la configuración de su navegador:',
            browserSettings: 'Configuración',
            privacy: 'Privacidad',
            preferences: 'Preferencias',
            thirdPartyCookies: 'Cookies de Terceros',
            thirdPartyCookiesText: 'Nuestro sitio puede contener cookies de terceros:',
            cookieConsent: 'Consentimiento',
            cookieConsentText: 'Al continuar navegando en nuestro sitio, acepta el uso de cookies según esta política.',
            contactCookies: 'Contacto',
            contactCookiesText: 'Para consultas sobre nuestra política de cookies:'
        }
    },
    pl: {
        lang: 'pl',
        langName: 'Polski',
        nav: {
            home: 'Strona główna',
            services: 'Usługi',
            about: 'O nas',
            specialists: 'Specjaliści',
            reviews: 'Opinie',
            contact: 'Kontakt'
        },
        header: {
            callUs: 'Zadzwoń',
            freeAppointment: 'Bezpłatna wizyta'
        },
        hero: {
            badge: 'Klinika Premium #1 w Polsce',
            title1: 'Przekształcamy',
            title2: 'Twoje Zdrowie',
            title3: 'W Dobre Samopoczucie',
            description: 'Najnowocześniejsza technologia, renomowani specjaliści i ponad',
            descriptionYears: 'lat tworzenia pięknych uśmiechów.',
            offerBadge: 'EKSKLUZYWNA OFERTA',
            offerDiscount: '-50%',
            offerText: 'Pierwsza konsultacja + Diagnoza GRATIS',
            btnAppointment: 'Zarezerwuj bezpłatną wizytę',
            btnLearnMore: 'Dowiedz się więcej',
            trustLifetime: 'Dożywotnia gwarancja',
            trustFinancing: 'Finansowanie 0%',
            trustResults: 'Natychmiastowe wyniki',
            scrollDiscover: 'Odkryj więcej',
            reviews: 'opinii',
            happyPatients: 'Zadowolonych pacjentów',
            yearsExperience: 'Lat doświadczenia'
        },
        stats: {
            treatments: 'Udanych zabiegów',
            specialists: 'Ekspertów specjalistów',
            satisfaction: 'Gwarantowana satysfakcja',
            awards: 'Nagrody międzynarodowe'
        },
        services: {
            subtitle: 'Nasze Usługi',
            title: 'Zabiegi',
            titleHighlight: 'Doskonałości',
            description: 'Najnowocześniejsza technologia i najlepsi specjaliści w branży',
            popular: 'Najpopularniejsze',
            from: 'Od',
            moreInfo: 'Więcej informacji'
        },
        about: {
            subtitle: 'O Nas',
            title: 'Wiodąca Klinika',
            titleHighlight: 'Referencji',
            titleEnd: 'w Polsce',
            description: 'Łączymy ponad dwudziestoletnie doświadczenie z najnowocześniejszą technologią. Nasz zespół specjalistów, wykształconych na najlepszych uczelniach świata, jest zaangażowany w dostarczanie wyjątkowych wyników.',
            premiumFacilities: 'Obiekty Premium',
            technology3D: 'Technologia 3D',
            yearsExcellence: 'Lat Doskonałości',
            featureTech: 'Najnowocześniejsza Technologia',
            featureTechDesc: 'Skaner 3D, laser stomatologiczny, chirurgia prowadzona',
            featureTeam: 'Zespół Elitarny',
            featureTeamDesc: 'Certyfikowane szkolenie międzynarodowe',
            featureCare: 'Spersonalizowana Opieka',
            featureCareDesc: 'Unikalny plan dla każdego pacjenta',
            featureFinancing: 'Elastyczne Finansowanie',
            featureFinancingDesc: 'Do 60 miesięcy bez odsetek',
            meetTeam: 'Poznaj Zespół'
        },
        specialists: {
            subtitle: 'Nasz Zespół',
            title: 'Renomowani',
            titleHighlight: 'Specjaliści',
            description: 'Profesjonaliści oddani dbaniu o Twoje zdrowie',
            yearsExp: 'Lat dośw.',
            viewAll: 'Zobacz Cały Zespół',
            medicalDirector: 'Dyrektor Medyczny',
            bookAppointment: 'Umów wizytę',
            viewProfile: 'Zobacz profil',
            yearsExperience: 'lat doświadczenia',
            pageTitle: 'Zespół wysoko wykwalifikowanych profesjonalistów oddanych Twojemu zdrowiu',
            appointmentNotice: 'Aby umówić wizytę ze specjalistą:'
        },
        testimonials: {
            subtitle: 'Opinie',
            title: 'Co Mówią',
            titleHighlight: 'Nasi Pacjenci',
            verifiedReviews: 'zweryfikowanych opinii',
            verified: 'Zweryfikowany',
            featured: 'Wyróżniony',
            recognizedBy: 'Uznani przez:'
        },
        appointment: {
            subtitle: 'Zarezerwuj Wizytę',
            title: 'Twój Nowy Uśmiech',
            titleHighlight: 'Zaczyna się Tutaj',
            description: 'Pierwsza konsultacja i diagnostyka 3D całkowicie bezpłatne. Bez zobowiązań. Oddzwonimy w ciągu 2 godzin.',
            benefitConsult: 'Bezpłatna Konsultacja',
            benefitConsultDesc: 'Pełna ocena bez kosztów',
            benefitDiag: 'Diagnostyka 3D',
            benefitDiagDesc: 'Najnowocześniejsza technologia',
            benefitPlan: 'Spersonalizowany Plan',
            benefitPlanDesc: 'Szczegółowa wycena bez zobowiązań',
            benefitFinancing: 'Finansowanie 0%',
            benefitFinancingDesc: 'Do 60 miesięcy bez odsetek',
            callFree: 'Zadzwoń bezpłatnie',
            whatsapp: 'WhatsApp',
            formTitle: 'Poproś o bezpłatną wizytę',
            formSubtitle: 'Skontaktujemy się w ciągu 2 godzin',
            formName: 'Twoje imię i nazwisko',
            formPhone: 'Twój telefon',
            formEmail: 'Twój email',
            formTreatment: 'Wybierz zabieg',
            formOther: 'Inny / Nie jestem pewien',
            formMessage: 'Opisz swój przypadek (opcjonalnie)',
            formPrivacy: 'Akceptuję',
            formPrivacyLink: 'politykę prywatności',
            formSubmit: 'Poproś o bezpłatną wizytę',
            formSecure: 'Twoje dane są chronione i bezpieczne'
        },
        contact: {
            subtitle: 'Kontakt',
            title: 'Odwiedź Nas w',
            titleHighlight: 'Naszej Klinice',
            address: 'Adres',
            viewMap: 'Zobacz na mapie',
            phone: 'Telefon',
            freeCall: 'Połączenie bezpłatne',
            callNow: 'Zadzwoń teraz',
            schedule: 'Godziny otwarcia',
            weekdays: 'Pon - Pt',
            saturday: 'Soboty',
            bookAppointment: 'Zarezerwuj wizytę',
            email: 'Email',
            sendEmail: 'Wyślij email'
        },
        footer: {
            description: 'Wielospecjalistyczne centrum medyczne z ponad 25-letnim doświadczeniem. Najnowocześniejsza technologia i najlepsi specjaliści.',
            quickLinks: 'Szybkie Linki',
            ourServices: 'Nasze Usługi',
            contactInfo: 'Informacje Kontaktowe',
            parking: 'Bezpłatny prywatny parking',
            allRights: 'Wszelkie prawa zastrzeżone.',
            developedWith: 'Opracowano z'
        },
        cta: {
            title: 'Potrzebujesz konsultacji z jednym z naszych specjalistów?',
            description: 'Pierwsza wizyta bezpłatna. Pomożemy znaleźć odpowiednie leczenie.',
            btnAppointment: 'Zarezerwuj bezpłatną wizytę'
        },
        serviceNames: {
            odontologia: 'Stomatologia',
            cardiologia: 'Kardiologia',
            oftalmologia: 'Okulistyka',
            ortopedia: 'Ortopedia',
            psiquiatria: 'Psychiatria',
            pediatria: 'Pediatria',
            oncologia: 'Chirurgia Onkologiczna',
            geriatria: 'Geriatria',
            nutricion: 'Dietetyka Kliniczna',
            proctologia: 'Proktologia',
            estetica: 'Medycyna Estetyczna',
            rehabilitacion: 'Rehabilitacja'
        },
        statsLabels: {
            implants: 'Implantów',
            cases: 'Przypadków',
            surgeries: 'Operacji',
            patients: 'Pacjentów',
            treatments: 'Zabiegów',
            veneers: 'Licówek',
            smiles: 'Uśmiechów',
            kids: 'Dzieci',
            families: 'Rodzin',
            complex: 'Złożonych',
            regenerations: 'Regeneracji',
            invisalign: 'Invisalign',
            consultations: 'Konsultacji',
            assessments: 'Ocen',
            plans: 'Planów',
            procedures: 'Procedur',
            echocardiograms: 'Echokardiogramów',
            screenings: 'Badań',
            athletes: 'Sportowców',
            prostheses: 'Protez',
            sessions: 'Sesji',
            endodoncias: 'Endodoncji',
            children: 'Dzieci'
        },
        hours: {
            weekdays: '9:00 - 18:00',
            saturday: 'Zamknięte',
            sunday: 'Zamknięte'
        },
        notFound: {
            title: 'Strona nie znaleziona',
            description: 'Przepraszamy, strona której szukasz nie istnieje.',
            backHome: 'Powrót do strony głównej'
        },
        // Legal
        legal: {
            privacyTitle: 'Polityka Prywatności',
            termsTitle: 'Regulamin',
            cookiesTitle: 'Polityka Cookies',
            lastUpdated: 'Ostatnia aktualizacja',
            dataController: 'Administrator Danych',
            dataControllerText: 'Administratorem Twoich danych osobowych jest:',
            companyName: 'Nazwa firmy',
            address: 'Adres',
            email: 'Email',
            phone: 'Telefon',
            dataCollected: 'Zbierane Dane',
            dataCollectedText: 'Zbieramy następujące rodzaje danych osobowych:',
            dataName: 'Imię i nazwisko',
            dataEmail: 'Adres email',
            dataPhone: 'Numer telefonu',
            dataHealth: 'Dane zdrowotne (historia medyczna, leczenie)',
            dataIP: 'Adres IP i dane przeglądania',
            purposeTitle: 'Cel Przetwarzania',
            purposeText: 'Twoje dane osobowe są przetwarzane w następujących celach:',
            purposeAppointment: 'Zarządzanie wizytami medycznymi',
            purposeMedical: 'Świadczenie usług medycznych',
            purposeContact: 'Komunikacja z pacjentami',
            purposeMarketing: 'Marketing bezpośredni (za zgodą)',
            legalBasis: 'Podstawa Prawna',
            legalBasisText: 'Przetwarzanie danych opiera się na:',
            gdprArt6: 'Artykuł 6 RODO:',
            consent: 'Zgoda osoby zainteresowanej',
            contract: 'Wykonanie umowy',
            legalObligation: 'Obowiązek prawny',
            vitalInterest: 'Żywotny interes pacjenta',
            rightsTitle: 'Twoje Prawa',
            rightsText: 'Zgodnie z RODO masz następujące prawa:',
            rightAccess: 'Prawo dostępu do danych',
            rightRectification: 'Prawo do sprostowania',
            rightErasure: 'Prawo do usunięcia (prawo do bycia zapomnianym)',
            rightRestriction: 'Prawo do ograniczenia przetwarzania',
            rightPortability: 'Prawo do przenoszenia danych',
            rightObjection: 'Prawo do sprzeciwu',
            retentionTitle: 'Przechowywanie Danych',
            retentionText: 'Twoje dane medyczne będą przechowywane przez okres wymagany prawem (20 lat zgodnie z przepisami zdrowotnymi). Dane kontaktowe będą przechowywane tak długo, jak utrzymujesz z nami relację.',
            securityTitle: 'Bezpieczeństwo Danych',
            securityText: 'Wdrażamy odpowiednie środki techniczne i organizacyjne w celu zapewnienia bezpieczeństwa Twoich danych osobowych, w tym szyfrowanie, kontrolę dostępu i regularne kopie zapasowe.',
            contactDPO: 'Kontakt',
            contactDPOText: 'Aby skorzystać ze swoich praw lub zadać pytania dotyczące ochrony danych, skontaktuj się z nami:',
            generalProvisions: 'Postanowienia Ogólne',
            generalProvisionsText: 'Niniejszy regulamin określa ogólne warunki korzystania z usług medycznych świadczonych przez Gabinety Borki. Korzystając z naszych usług, akceptujesz poniższe warunki.',
            servicesOffered: 'Oferowane Usługi',
            servicesOfferedText: 'Nasz ośrodek medyczny oferuje następujące usługi:',
            servicesDentistry: 'Usługi stomatologiczne i periodontologiczne',
            servicesCardiology: 'Konsultacje i diagnostyka kardiologiczna',
            servicesOphthalmology: 'Usługi okulistyczne',
            servicesOrthopedics: 'Traumatologia i ortopedia',
            servicesOther: 'Inne specjalizacje medyczne w zależności od dostępności',
            appointmentRules: 'Zasady Wizyt',
            appointmentRulesText: 'Wizyty są zarządzane w następujący sposób:',
            appointmentPhone: 'Wizyty można umawiać telefonicznie lub przez formularz internetowy',
            appointmentOnline: 'Potwierdzenie wizyty zostanie wysłane SMS-em lub emailem',
            appointmentCancel: 'Odwołania należy dokonać z co najmniej 24-godzinnym wyprzedzeniem',
            patientRights: 'Prawa Pacjenta',
            patientRightsText: 'Jako pacjent masz prawo do:',
            rightInfo: 'Pełnej informacji o stanie zdrowia i leczeniu',
            rightDocs: 'Dostępu do dokumentacji medycznej',
            rightConfidentiality: 'Poufności danych medycznych',
            rightComplaint: 'Składania reklamacji',
            patientObligations: 'Obowiązki Pacjenta',
            patientObligationsText: 'Pacjent zobowiązuje się do:',
            obligationInfo: 'Przekazywania prawdziwych informacji o stanie zdrowia',
            obligationPunctual: 'Punktualnego przychodzenia na umówione wizyty',
            obligationRespect: 'Szanowania personelu medycznego i obiektów',
            obligationPayment: 'Płacenia za usługi zgodnie z ustalonymi cenami',
            payments: 'Płatności',
            paymentsText: 'Płatności dokonywane są gotówką, kartą debetową/kredytową lub przelewem bankowym. Oferujemy finansowanie do 60 miesięcy bez odsetek.',
            liability: 'Odpowiedzialność',
            liabilityText: 'Ośrodek medyczny nie ponosi odpowiedzialności za konsekwencje wynikające z nieprzestrzegania przez pacjenta zaleceń medycznych.',
            complaints: 'Reklamacje',
            complaintsText: 'Reklamacje można składać pisemnie lub emailem. Zostaną rozpatrzone w maksymalnym terminie 30 dni.',
            finalProvisions: 'Postanowienia Końcowe',
            finalProvisionsText: 'Niniejszy regulamin podlega prawu polskiemu i Unii Europejskiej. Wszelkie zmiany będą komunikowane pacjentom.',
            whatAreCookies: 'Czym są Cookies?',
            whatAreCookiesText: 'Cookies to małe pliki tekstowe przechowywane na Twoim urządzeniu podczas odwiedzania naszej strony. Pomagają nam poprawić Twoje doświadczenie przeglądania.',
            cookiesWeUse: 'Używane Cookies',
            cookiesWeUseText: 'Używamy następujących rodzajów cookies:',
            essentialCookies: 'Cookies Niezbędne',
            essentialCookiesText: 'Niezbędne do podstawowego funkcjonowania strony.',
            analyticsCookies: 'Cookies Analityczne',
            analyticsCookiesText: 'Pomagają nam zrozumieć, jak odwiedzający wchodzą w interakcję ze stroną.',
            cookieName: 'Nazwa',
            cookiePurpose: 'Cel',
            cookieDuration: 'Czas trwania',
            cookieLangPurpose: 'Przechowuje preferencję językową użytkownika',
            cookieSessionPurpose: 'Utrzymuje sesję użytkownika',
            cookieAnalyticsPurpose: 'Analiza ruchu na stronie',
            sessionDuration: 'Sesja',
            year: 'rok',
            years: 'lat',
            hours: 'godzin',
            manageCookies: 'Zarządzanie Cookies',
            manageCookiesText: 'Możesz zarządzać cookies przez ustawienia przeglądarki:',
            browserSettings: 'Ustawienia',
            privacy: 'Prywatność',
            preferences: 'Preferencje',
            thirdPartyCookies: 'Cookies Stron Trzecich',
            thirdPartyCookiesText: 'Nasza strona może zawierać cookies stron trzecich:',
            cookieConsent: 'Zgoda',
            cookieConsentText: 'Kontynuując przeglądanie naszej strony, wyrażasz zgodę na używanie cookies zgodnie z niniejszą polityką.',
            contactCookies: 'Kontakt',
            contactCookiesText: 'W sprawie pytań dotyczących naszej polityki cookies:'
        }
    },
    uk: {
        lang: 'uk',
        langName: 'Українська',
        nav: {
            home: 'Головна',
            services: 'Послуги',
            about: 'Про нас',
            specialists: 'Спеціалісти',
            reviews: 'Відгуки',
            contact: 'Контакти'
        },
        header: {
            callUs: 'Зателефонуйте',
            freeAppointment: 'Безкоштовний прийом'
        },
        hero: {
            badge: 'Преміум Клініка #1 у Польщі',
            title1: 'Перетворюємо',
            title2: "Ваше Здоров'я",
            title3: 'На Благополуччя',
            description: "Передові технології, всесвітньо відомі спеціалісти та понад",
            descriptionYears: 'років створення досконалих посмішок.',
            offerBadge: 'ЕКСКЛЮЗИВНА ПРОПОЗИЦІЯ',
            offerDiscount: '-50%',
            offerText: 'Перша консультація + Діагностика БЕЗКОШТОВНО',
            btnAppointment: 'Записатися безкоштовно',
            btnLearnMore: 'Дізнатися більше',
            trustLifetime: 'Довічна гарантія',
            trustFinancing: 'Фінансування 0%',
            trustResults: 'Миттєві результати',
            scrollDiscover: 'Відкрийте більше',
            reviews: 'відгуків',
            happyPatients: 'Щасливих пацієнтів',
            yearsExperience: 'Років досвіду'
        },
        stats: {
            treatments: 'Успішних процедур',
            specialists: 'Експертів спеціалістів',
            satisfaction: 'Гарантована задоволеність',
            awards: 'Міжнародні нагороди'
        },
        services: {
            subtitle: 'Наші Послуги',
            title: 'Лікування',
            titleHighlight: 'Досконалості',
            description: 'Найсучасніші технології та найкращі спеціалісти галузі',
            popular: 'Найпопулярніше',
            from: 'Від',
            moreInfo: 'Більше інформації'
        },
        about: {
            subtitle: 'Про Нас',
            title: 'Провідна Клініка',
            titleHighlight: 'Референція',
            titleEnd: 'у Польщі',
            description: 'Ми поєднуємо понад двадцятирічний досвід з найсучаснішими технологіями. Наша команда спеціалістів, які навчалися в найкращих університетах світу, прагне досягти виняткових результатів.',
            premiumFacilities: 'Преміум Заклади',
            technology3D: '3D Технологія',
            yearsExcellence: 'Років Досконалості',
            featureTech: 'Передові Технології',
            featureTechDesc: '3D сканер, стоматологічний лазер, керована хірургія',
            featureTeam: 'Елітна Команда',
            featureTeamDesc: 'Сертифіковане міжнародне навчання',
            featureCare: 'Персоналізована Турбота',
            featureCareDesc: 'Унікальний план для кожного пацієнта',
            featureFinancing: 'Гнучке Фінансування',
            featureFinancingDesc: 'До 60 місяців без відсотків',
            meetTeam: 'Познайомтесь з Командою'
        },
        specialists: {
            subtitle: 'Наша Команда',
            title: 'Відомі',
            titleHighlight: 'Спеціалісти',
            description: "Професіонали, віддані турботі про ваше здоров'я",
            yearsExp: 'Років досв.',
            viewAll: 'Переглянути всю команду',
            medicalDirector: 'Медичний Директор',
            bookAppointment: 'Записатися',
            viewProfile: 'Переглянути профіль',
            yearsExperience: 'років досвіду',
            pageTitle: "Команда висококваліфікованих професіоналів, відданих вашому здоров'ю",
            appointmentNotice: 'Для запису до наших спеціалістів:'
        },
        testimonials: {
            subtitle: 'Відгуки',
            title: 'Що Говорять',
            titleHighlight: 'Наші Пацієнти',
            verifiedReviews: 'перевірених відгуків',
            verified: 'Перевірено',
            featured: 'Виділено',
            recognizedBy: 'Визнані:'
        },
        appointment: {
            subtitle: 'Запишіться на Прийом',
            title: 'Ваша Нова Посмішка',
            titleHighlight: 'Починається Тут',
            description: 'Перша консультація та 3D діагностика повністю безкоштовні. Без зобов\'язань. Зателефонуємо протягом 2 годин.',
            benefitConsult: 'Безкоштовна Консультація',
            benefitConsultDesc: 'Повна оцінка без оплати',
            benefitDiag: '3D Діагностика',
            benefitDiagDesc: 'Найсучасніші технології',
            benefitPlan: 'Персоналізований План',
            benefitPlanDesc: 'Детальна оцінка без зобов\'язань',
            benefitFinancing: 'Фінансування 0%',
            benefitFinancingDesc: 'До 60 місяців без відсотків',
            callFree: 'Зателефонуйте безкоштовно',
            whatsapp: 'WhatsApp',
            formTitle: 'Запросіть безкоштовний прийом',
            formSubtitle: "Зв'яжемося протягом 2 годин",
            formName: "Ваше повне ім'я",
            formPhone: 'Ваш телефон',
            formEmail: 'Ваш email',
            formTreatment: 'Виберіть лікування',
            formOther: 'Інше / Не впевнений',
            formMessage: 'Опишіть ваш випадок (необов\'язково)',
            formPrivacy: 'Я приймаю',
            formPrivacyLink: 'політику конфіденційності',
            formSubmit: 'Запросити безкоштовний прийом',
            formSecure: 'Ваші дані захищені та безпечні'
        },
        contact: {
            subtitle: 'Контакти',
            title: 'Відвідайте Нас в',
            titleHighlight: 'Нашій Клініці',
            address: 'Адреса',
            viewMap: 'Переглянути на карті',
            phone: 'Телефон',
            freeCall: 'Безкоштовний дзвінок',
            callNow: 'Зателефонувати',
            schedule: 'Графік роботи',
            weekdays: 'Пн - Пт',
            saturday: 'Субота',
            bookAppointment: 'Записатися',
            email: 'Email',
            sendEmail: 'Надіслати email'
        },
        footer: {
            description: 'Мультиспеціалізований медичний центр з понад 25-річним досвідом. Передові технології та найкращі спеціалісти.',
            quickLinks: 'Швидкі Посилання',
            ourServices: 'Наші Послуги',
            contactInfo: 'Контактна Інформація',
            parking: 'Безкоштовна приватна парковка',
            allRights: 'Усі права захищені.',
            developedWith: 'Розроблено з'
        },
        cta: {
            title: 'Потрібна консультація з одним із наших спеціалістів?',
            description: 'Перший візит безкоштовний. Допоможемо знайти правильне лікування.',
            btnAppointment: 'Записатися безкоштовно'
        },
        serviceNames: {
            odontologia: 'Стоматологія',
            cardiologia: 'Кардіологія',
            oftalmologia: 'Офтальмологія',
            ortopedia: 'Ортопедія',
            psiquiatria: 'Психіатрія',
            pediatria: 'Педіатрія',
            oncologia: 'Онкологічна Хірургія',
            geriatria: 'Геріатрія',
            nutricion: 'Клінічне Харчування',
            proctologia: 'Проктологія',
            estetica: 'Естетична Медицина',
            rehabilitacion: 'Реабілітація'
        },
        statsLabels: {
            implants: 'Імплантів',
            cases: 'Випадків',
            surgeries: 'Операцій',
            patients: 'Пацієнтів',
            treatments: 'Процедур',
            veneers: 'Вінірів',
            smiles: 'Посмішок',
            kids: 'Дітей',
            families: 'Сімей',
            complex: 'Складних',
            regenerations: 'Регенерацій',
            invisalign: 'Invisalign',
            consultations: 'Консультацій',
            assessments: 'Оцінок',
            plans: 'Планів',
            procedures: 'Процедур',
            echocardiograms: 'Ехокардіограм',
            screenings: 'Обстежень',
            athletes: 'Спортсменів',
            prostheses: 'Протезів',
            sessions: 'Сесій',
            endodoncias: 'Ендодонтій',
            children: 'Дітей'
        },
        hours: {
            weekdays: '9:00 - 18:00',
            saturday: 'Зачинено',
            sunday: 'Зачинено'
        },
        notFound: {
            title: 'Сторінку не знайдено',
            description: 'Вибачте, сторінка, яку ви шукаєте, не існує.',
            backHome: 'Повернутися на головну'
        },
        // Legal
        legal: {
            privacyTitle: 'Політика Конфіденційності',
            termsTitle: 'Регламент',
            cookiesTitle: 'Політика Cookies',
            lastUpdated: 'Останнє оновлення',
            dataController: 'Адміністратор Даних',
            dataControllerText: 'Адміністратором ваших персональних даних є:',
            companyName: 'Назва компанії',
            address: 'Адреса',
            email: 'Електронна пошта',
            phone: 'Телефон',
            dataCollected: 'Дані, що Збираються',
            dataCollectedText: 'Ми збираємо такі типи персональних даних:',
            dataName: "Ім'я та прізвище",
            dataEmail: 'Адреса електронної пошти',
            dataPhone: 'Номер телефону',
            dataHealth: "Дані про здоров'я (медична історія, лікування)",
            dataIP: 'IP-адреса та дані перегляду',
            purposeTitle: 'Мета Обробки',
            purposeText: 'Ваші персональні дані обробляються з такими цілями:',
            purposeAppointment: 'Управління медичними прийомами',
            purposeMedical: 'Надання медичних послуг',
            purposeContact: "Зв'язок з пацієнтами",
            purposeMarketing: 'Прямий маркетинг (за згодою)',
            legalBasis: 'Правова Основа',
            legalBasisText: 'Обробка даних базується на:',
            gdprArt6: 'Стаття 6 GDPR:',
            consent: 'Згода суб\'єкта даних',
            contract: 'Виконання договору',
            legalObligation: 'Юридичне зобов\'язання',
            vitalInterest: 'Життєвий інтерес пацієнта',
            rightsTitle: 'Ваші Права',
            rightsText: 'Відповідно до GDPR, ви маєте такі права:',
            rightAccess: 'Право доступу до даних',
            rightRectification: 'Право на виправлення',
            rightErasure: 'Право на видалення (право бути забутим)',
            rightRestriction: 'Право на обмеження обробки',
            rightPortability: 'Право на переносимість даних',
            rightObjection: 'Право на заперечення',
            retentionTitle: 'Зберігання Даних',
            retentionText: "Ваші медичні дані зберігатимуться протягом періоду, встановленого законом (20 років відповідно до законодавства про охорону здоров'я). Контактні дані зберігатимуться, поки ви підтримуєте з нами відносини.",
            securityTitle: 'Безпека Даних',
            securityText: 'Ми впроваджуємо відповідні технічні та організаційні заходи для забезпечення безпеки ваших персональних даних, включаючи шифрування, контроль доступу та регулярне резервне копіювання.',
            contactDPO: 'Контакт',
            contactDPOText: "Щоб скористатися своїми правами або поставити запитання щодо захисту даних, зв'яжіться з нами:",
            generalProvisions: 'Загальні Положення',
            generalProvisionsText: 'Цей регламент встановлює загальні умови користування медичними послугами, що надаються Gabinety Borki. Користуючись нашими послугами, ви приймаєте наступні умови.',
            servicesOffered: 'Пропоновані Послуги',
            servicesOfferedText: 'Наш медичний центр пропонує такі послуги:',
            servicesDentistry: 'Стоматологічні та пародонтологічні послуги',
            servicesCardiology: 'Кардіологічні консультації та діагностика',
            servicesOphthalmology: 'Офтальмологічні послуги',
            servicesOrthopedics: 'Травматологія та ортопедія',
            servicesOther: 'Інші медичні спеціальності за наявності',
            appointmentRules: 'Правила Запису',
            appointmentRulesText: 'Запис на прийом здійснюється наступним чином:',
            appointmentPhone: 'Записатися можна по телефону або через онлайн-форму',
            appointmentOnline: 'Підтвердження запису буде надіслано SMS або електронною поштою',
            appointmentCancel: 'Скасування необхідно здійснювати щонайменше за 24 години',
            patientRights: 'Права Пацієнта',
            patientRightsText: 'Як пацієнт, ви маєте право на:',
            rightInfo: "Повну інформацію про стан здоров'я та лікування",
            rightDocs: 'Доступ до медичної документації',
            rightConfidentiality: 'Конфіденційність медичних даних',
            rightComplaint: 'Подання скарг',
            patientObligations: "Обов'язки Пацієнта",
            patientObligationsText: "Пацієнт зобов'язується:",
            obligationInfo: "Надавати правдиву інформацію про стан здоров'я",
            obligationPunctual: 'Приходити вчасно на заплановані прийоми',
            obligationRespect: 'Поважати медичний персонал та приміщення',
            obligationPayment: 'Оплачувати послуги відповідно до встановлених тарифів',
            payments: 'Оплата',
            paymentsText: "Оплата здійснюється готівкою, дебетовою/кредитною карткою або банківським переказом. Ми пропонуємо фінансування до 60 місяців без відсотків.",
            liability: 'Відповідальність',
            liabilityText: 'Медичний центр не несе відповідальності за наслідки, що виникають внаслідок недотримання пацієнтом медичних рекомендацій.',
            complaints: 'Скарги',
            complaintsText: 'Скарги можна подавати письмово або електронною поштою. Вони будуть розглянуті максимум протягом 30 днів.',
            finalProvisions: 'Заключні Положення',
            finalProvisionsText: 'Цей регламент підпорядковується законодавству Польщі та Європейського Союзу. Будь-які зміни будуть повідомлені пацієнтам.',
            whatAreCookies: 'Що таке Cookies?',
            whatAreCookiesText: 'Cookies - це невеликі текстові файли, що зберігаються на вашому пристрої під час відвідування нашого сайту. Вони допомагають нам покращити ваш досвід перегляду.',
            cookiesWeUse: 'Cookies, які ми використовуємо',
            cookiesWeUseText: 'Ми використовуємо такі типи cookies:',
            essentialCookies: 'Необхідні Cookies',
            essentialCookiesText: 'Необхідні для базового функціонування сайту.',
            analyticsCookies: 'Аналітичні Cookies',
            analyticsCookiesText: 'Допомагають нам зрозуміти, як відвідувачі взаємодіють із сайтом.',
            cookieName: 'Назва',
            cookiePurpose: 'Призначення',
            cookieDuration: 'Тривалість',
            cookieLangPurpose: 'Зберігає мовні налаштування користувача',
            cookieSessionPurpose: 'Підтримує сесію користувача',
            cookieAnalyticsPurpose: 'Аналіз веб-трафіку',
            sessionDuration: 'Сесія',
            year: 'рік',
            years: 'років',
            hours: 'годин',
            manageCookies: 'Управління Cookies',
            manageCookiesText: 'Ви можете керувати cookies через налаштування браузера:',
            browserSettings: 'Налаштування',
            privacy: 'Конфіденційність',
            preferences: 'Налаштування',
            thirdPartyCookies: 'Cookies Третіх Сторін',
            thirdPartyCookiesText: 'Наш сайт може містити cookies третіх сторін:',
            cookieConsent: 'Згода',
            cookieConsentText: 'Продовжуючи переглядати наш сайт, ви погоджуєтесь на використання cookies відповідно до цієї політики.',
            contactCookies: 'Контакт',
            contactCookiesText: 'Для запитань щодо нашої політики cookies:'
        }
    },
    en: {
        lang: 'en',
        langName: 'English',
        nav: {
            home: 'Home',
            services: 'Services',
            about: 'About Us',
            specialists: 'Specialists',
            reviews: 'Reviews',
            contact: 'Contact'
        },
        header: {
            callUs: 'Call Us',
            freeAppointment: 'Free Appointment'
        },
        hero: {
            badge: 'Premium Clinic #1 in Poland',
            title1: 'Transforming',
            title2: 'Your Health',
            title3: 'Into Wellness',
            description: 'Cutting-edge technology, world-renowned specialists and over',
            descriptionYears: 'years creating perfect smiles.',
            offerBadge: 'EXCLUSIVE OFFER',
            offerDiscount: '-50%',
            offerText: 'First consultation + Diagnosis FREE',
            btnAppointment: 'Book Free Appointment',
            btnLearnMore: 'Learn More',
            trustLifetime: 'Lifetime Guarantee',
            trustFinancing: '0% Financing',
            trustResults: 'Immediate Results',
            scrollDiscover: 'Discover More',
            reviews: 'reviews',
            happyPatients: 'Happy Patients',
            yearsExperience: 'Years Experience'
        },
        stats: {
            treatments: 'Successful Treatments',
            specialists: 'Expert Specialists',
            satisfaction: 'Guaranteed Satisfaction',
            awards: 'International Awards'
        },
        services: {
            subtitle: 'Our Services',
            title: 'Treatments of',
            titleHighlight: 'Excellence',
            description: 'State-of-the-art technology and the best professionals in the industry',
            popular: 'Most Popular',
            from: 'From',
            moreInfo: 'More Information'
        },
        about: {
            subtitle: 'About Us',
            title: 'The Leading',
            titleHighlight: 'Reference',
            titleEnd: 'Clinic in Poland',
            description: 'We combine over two decades of experience with the most advanced technology. Our team of specialists, trained at the world\'s best universities, is committed to delivering exceptional results.',
            premiumFacilities: 'Premium Facilities',
            technology3D: '3D Technology',
            yearsExcellence: 'Years of Excellence',
            featureTech: 'Cutting-Edge Technology',
            featureTechDesc: '3D scanner, dental laser, guided surgery',
            featureTeam: 'Elite Team',
            featureTeamDesc: 'Certified international training',
            featureCare: 'Personalized Care',
            featureCareDesc: 'Unique plan for each patient',
            featureFinancing: 'Flexible Financing',
            featureFinancingDesc: 'Up to 60 months interest-free',
            meetTeam: 'Meet the Team'
        },
        specialists: {
            subtitle: 'Our Team',
            title: 'Renowned',
            titleHighlight: 'Specialists',
            description: 'Professionals dedicated to caring for your health',
            yearsExp: 'Years Exp.',
            viewAll: 'View Full Team',
            medicalDirector: 'Medical Director',
            bookAppointment: 'Book Appointment',
            viewProfile: 'View Profile',
            yearsExperience: 'years of experience',
            pageTitle: 'A team of highly qualified professionals dedicated to your health',
            appointmentNotice: 'For appointments with our specialists:'
        },
        testimonials: {
            subtitle: 'Testimonials',
            title: 'What Our',
            titleHighlight: 'Patients Say',
            verifiedReviews: 'verified reviews',
            verified: 'Verified',
            featured: 'Featured',
            recognizedBy: 'Recognized by:'
        },
        appointment: {
            subtitle: 'Book Your Appointment',
            title: 'Your New Smile',
            titleHighlight: 'Starts Here',
            description: 'First consultation and 3D diagnosis completely free. No commitment. We\'ll call you within 2 hours.',
            benefitConsult: 'Free Consultation',
            benefitConsultDesc: 'Complete assessment at no cost',
            benefitDiag: '3D Diagnosis',
            benefitDiagDesc: 'State-of-the-art technology',
            benefitPlan: 'Personalized Plan',
            benefitPlanDesc: 'Detailed quote without commitment',
            benefitFinancing: '0% Financing',
            benefitFinancingDesc: 'Up to 60 months interest-free',
            callFree: 'Call us free',
            whatsapp: 'WhatsApp',
            formTitle: 'Request Your Free Appointment',
            formSubtitle: 'We\'ll contact you within 2 hours',
            formName: 'Your full name',
            formPhone: 'Your phone',
            formEmail: 'Your email',
            formTreatment: 'Select a treatment',
            formOther: 'Other / Not sure',
            formMessage: 'Tell us about your case (optional)',
            formPrivacy: 'I accept the',
            formPrivacyLink: 'privacy policy',
            formSubmit: 'Request Free Appointment',
            formSecure: 'Your data is protected and secure'
        },
        contact: {
            subtitle: 'Contact',
            title: 'Visit Us at',
            titleHighlight: 'Our Clinic',
            address: 'Address',
            viewMap: 'View on map',
            phone: 'Phone',
            freeCall: 'Free call',
            callNow: 'Call now',
            schedule: 'Schedule',
            weekdays: 'Mon - Fri',
            saturday: 'Saturdays',
            bookAppointment: 'Book appointment',
            email: 'Email',
            sendEmail: 'Send email'
        },
        footer: {
            description: 'Multi-specialty medical center with over 25 years of experience. Cutting-edge technology and the best specialists.',
            quickLinks: 'Quick Links',
            ourServices: 'Our Services',
            contactInfo: 'Contact Information',
            parking: 'Free private parking',
            allRights: 'All rights reserved.',
            developedWith: 'Developed with'
        },
        cta: {
            title: 'Need a consultation with one of our specialists?',
            description: 'First visit free. We\'ll help you find the right treatment.',
            btnAppointment: 'Book Free Appointment'
        },
        serviceNames: {
            odontologia: 'Dentistry',
            cardiologia: 'Cardiology',
            oftalmologia: 'Ophthalmology',
            ortopedia: 'Orthopedics',
            psiquiatria: 'Psychiatry',
            pediatria: 'Pediatrics',
            oncologia: 'Oncological Surgery',
            geriatria: 'Geriatrics',
            nutricion: 'Clinical Nutrition',
            proctologia: 'Proctology',
            estetica: 'Aesthetic Medicine',
            rehabilitacion: 'Rehabilitation'
        },
        statsLabels: {
            implants: 'Implants',
            cases: 'Cases',
            surgeries: 'Surgeries',
            patients: 'Patients',
            treatments: 'Treatments',
            veneers: 'Veneers',
            smiles: 'Smiles',
            kids: 'Kids',
            families: 'Families',
            complex: 'Complex',
            regenerations: 'Regenerations',
            invisalign: 'Invisalign',
            consultations: 'Consultations',
            assessments: 'Assessments',
            plans: 'Plans',
            procedures: 'Procedures',
            echocardiograms: 'Echocardiograms',
            screenings: 'Screenings',
            athletes: 'Athletes',
            prostheses: 'Prostheses',
            sessions: 'Sessions',
            endodoncias: 'Root canals',
            children: 'Children'
        },
        hours: {
            weekdays: '9:00 AM - 6:00 PM',
            saturday: 'Closed',
            sunday: 'Closed'
        },
        notFound: {
            title: 'Page Not Found',
            description: 'Sorry, the page you are looking for does not exist.',
            backHome: 'Back to Home'
        },
        // Legal
        legal: {
            privacyTitle: 'Privacy Policy',
            termsTitle: 'Terms of Service',
            cookiesTitle: 'Cookie Policy',
            lastUpdated: 'Last updated',
            dataController: 'Data Controller',
            dataControllerText: 'The controller of your personal data is:',
            companyName: 'Company name',
            address: 'Address',
            email: 'Email',
            phone: 'Phone',
            dataCollected: 'Data We Collect',
            dataCollectedText: 'We collect the following types of personal data:',
            dataName: 'Full name',
            dataEmail: 'Email address',
            dataPhone: 'Phone number',
            dataHealth: 'Health data (medical history, treatments)',
            dataIP: 'IP address and browsing data',
            purposeTitle: 'Purpose of Processing',
            purposeText: 'Your personal data is processed for the following purposes:',
            purposeAppointment: 'Medical appointment management',
            purposeMedical: 'Provision of medical services',
            purposeContact: 'Communication with patients',
            purposeMarketing: 'Direct marketing (with consent)',
            legalBasis: 'Legal Basis',
            legalBasisText: 'Data processing is based on:',
            gdprArt6: 'Article 6 of GDPR:',
            consent: 'Consent of the data subject',
            contract: 'Contract performance',
            legalObligation: 'Legal obligation',
            vitalInterest: 'Vital interest of the patient',
            rightsTitle: 'Your Rights',
            rightsText: 'Under GDPR, you have the following rights:',
            rightAccess: 'Right of access to your data',
            rightRectification: 'Right to rectification',
            rightErasure: 'Right to erasure (right to be forgotten)',
            rightRestriction: 'Right to restriction of processing',
            rightPortability: 'Right to data portability',
            rightObjection: 'Right to object',
            retentionTitle: 'Data Retention',
            retentionText: 'Your medical data will be retained for the legally required period (20 years according to health legislation). Contact data will be kept as long as you maintain a relationship with us.',
            securityTitle: 'Data Security',
            securityText: 'We implement appropriate technical and organizational measures to ensure the security of your personal data, including encryption, access control, and regular backups.',
            contactDPO: 'Contact',
            contactDPOText: 'To exercise your rights or make inquiries about data protection, contact us:',
            generalProvisions: 'General Provisions',
            generalProvisionsText: 'This regulation establishes the general conditions for using medical services provided by Gabinety Borki. By using our services, you accept the following conditions.',
            servicesOffered: 'Services Offered',
            servicesOfferedText: 'Our medical center offers the following services:',
            servicesDentistry: 'Dental and periodontal services',
            servicesCardiology: 'Cardiology consultations and diagnostics',
            servicesOphthalmology: 'Ophthalmology services',
            servicesOrthopedics: 'Traumatology and orthopedics',
            servicesOther: 'Other medical specialties as available',
            appointmentRules: 'Appointment Rules',
            appointmentRulesText: 'Appointments are managed as follows:',
            appointmentPhone: 'Appointments can be requested by phone or through the web form',
            appointmentOnline: 'Appointment confirmation will be sent by SMS or email',
            appointmentCancel: 'Cancellations must be made at least 24 hours in advance',
            patientRights: 'Patient Rights',
            patientRightsText: 'As a patient, you have the right to:',
            rightInfo: 'Complete information about your health status and treatments',
            rightDocs: 'Access to your medical records',
            rightConfidentiality: 'Confidentiality of your medical data',
            rightComplaint: 'File complaints',
            patientObligations: 'Patient Obligations',
            patientObligationsText: 'The patient agrees to:',
            obligationInfo: 'Provide truthful information about their health status',
            obligationPunctual: 'Arrive punctually to scheduled appointments',
            obligationRespect: 'Respect medical staff and facilities',
            obligationPayment: 'Pay for services according to established rates',
            payments: 'Payments',
            paymentsText: 'Payments are made by cash, debit/credit card, or bank transfer. We offer financing up to 60 months interest-free.',
            liability: 'Liability',
            liabilityText: 'The medical center is not responsible for consequences arising from patient non-compliance with medical recommendations.',
            complaints: 'Complaints',
            complaintsText: 'Complaints can be submitted in writing or by email. They will be addressed within a maximum of 30 days.',
            finalProvisions: 'Final Provisions',
            finalProvisionsText: 'This regulation is subject to Polish and European Union law. Any modifications will be communicated to patients.',
            whatAreCookies: 'What are Cookies?',
            whatAreCookiesText: 'Cookies are small text files stored on your device when you visit our website. They help us improve your browsing experience.',
            cookiesWeUse: 'Cookies We Use',
            cookiesWeUseText: 'We use the following types of cookies:',
            essentialCookies: 'Essential Cookies',
            essentialCookiesText: 'Necessary for basic website functionality.',
            analyticsCookies: 'Analytics Cookies',
            analyticsCookiesText: 'Help us understand how visitors interact with the site.',
            cookieName: 'Name',
            cookiePurpose: 'Purpose',
            cookieDuration: 'Duration',
            cookieLangPurpose: 'Stores user language preference',
            cookieSessionPurpose: 'Maintains user session',
            cookieAnalyticsPurpose: 'Web traffic analysis',
            sessionDuration: 'Session',
            year: 'year',
            years: 'years',
            hours: 'hours',
            manageCookies: 'Managing Cookies',
            manageCookiesText: 'You can manage cookies through your browser settings:',
            browserSettings: 'Settings',
            privacy: 'Privacy',
            preferences: 'Preferences',
            thirdPartyCookies: 'Third-Party Cookies',
            thirdPartyCookiesText: 'Our site may contain third-party cookies:',
            cookieConsent: 'Consent',
            cookieConsentText: 'By continuing to browse our site, you consent to the use of cookies according to this policy.',
            contactCookies: 'Contact',
            contactCookiesText: 'For inquiries about our cookie policy:'
        }
    }
};

// =====================================================
// DATA
// =====================================================
const clinicData = {
    name: 'WOJTEK',
    phone: '32 42 47 370',
    whatsapp: '+48 32 42 47 370',
    email: 'rejestracja@gabinetyborki.pl',
    address: 'ul. Borki 20, 44-200 Rybnik, Silesia',
    stats: {
        treatments: 50000,
        specialists: 18,
        satisfaction: 98,
        awards: 15,
        years: 25
    },
    social: {
        facebook: 'https://facebook.com/GabinetyBorki',
        instagram: '#',
        twitter: '#',
        youtube: '#',
        linkedin: '#'
    }
};

const servicesData = [
    { id: 'odontologia', icon: 'fa-tooth', featured: true },
    { id: 'cardiologia', icon: 'fa-heartbeat' },
    { id: 'oftalmologia', icon: 'fa-eye' },
    { id: 'ortopedia', icon: 'fa-bone' },
    { id: 'psiquiatria', icon: 'fa-brain' },
    { id: 'pediatria', icon: 'fa-baby' },
    { id: 'oncologia', icon: 'fa-ribbon' },
    { id: 'geriatria', icon: 'fa-user-clock' },
    { id: 'nutricion', icon: 'fa-apple-alt' },
    { id: 'proctologia', icon: 'fa-stethoscope' },
    { id: 'estetica', icon: 'fa-spa' },
    { id: 'rehabilitacion', icon: 'fa-running' }
];

const doctors = [
    { id: 1, name: 'lek. Wiesław Durczok', category: 'oncologia', experience: '20+', stats: { surgeries: '5K+', patients: '8K+' }, featured: true },
    { id: 2, name: 'dr nauk o zdrowiu Patrycja Kłósek-Bzowska', category: 'nutricion', experience: '12+', stats: { patients: '3K+', plans: '5K+' } },
    { id: 3, name: 'lek. med. Anna Koterba', category: 'psiquiatria', experience: '15+', stats: { patients: '4K+', consultations: '12K+' } },
    { id: 4, name: 'dr n. med. Ewa Kraszewska', category: 'oftalmologia', experience: '18+', stats: { surgeries: '3K+', patients: '10K+' } },
    { id: 5, name: 'lek. med. Anna Krynicka-Mazurek', category: 'geriatria', experience: '14+', stats: { patients: '6K+', assessments: '8K+' } },
    { id: 6, name: 'lek. Teresa Lubszczyk', category: 'infectologia', experience: '22+', stats: { cases: '15K+', patients: '20K+' } },
    { id: 7, name: 'dr n. med. Iwona Pawełczyk', category: 'proctologia', experience: '16+', stats: { procedures: '4K+', surgeries: '2K+' } },
    { id: 8, name: 'lek. Mariusz Puszkarz', category: 'ortopedia', experience: '15+', stats: { surgeries: '6K+', patients: '12K+' } },
    { id: 9, name: 'dr n. med. Sławomir Rychlik', category: 'cardiologia', experience: '20+', stats: { echocardiograms: '8K+', patients: '15K+' } },
    { id: 10, name: 'dr n. med. Katarzyna Radkowska-Braun', category: 'senologia', experience: '17+', stats: { screenings: '10K+', patients: '7K+' } },
    { id: 11, name: 'lek. Michał Seemann', category: 'ortopedia', experience: '12+', stats: { athletes: '2K+', surgeries: '3K+' } },
    { id: 12, name: 'lek. Dejan Simić', category: 'ortopedia', experience: '18+', stats: { prostheses: '1K+', surgeries: '5K+' } },
    { id: 13, name: 'mgr Marzena Sobota', category: 'rehabilitacion', experience: '10+', stats: { sessions: '15K+', patients: '3K+' } },
    { id: 14, name: 'lek. stom. Aleksandra Stysz', category: 'odontologia', experience: '8+', stats: { treatments: '8K+', patients: '4K+' } },
    { id: 15, name: 'lek. dent. Barbara Stysz', category: 'odontologia', experience: '25+', stats: { endodoncias: '5K+', patients: '12K+' } },
    { id: 16, name: 'lek. stom. Wojciech Stysz', category: 'odontologia', experience: '28+', stats: { implants: '3K+', treatments: '10K+' }, featured: true },
    { id: 17, name: 'lek. med. Iwona Sułecka', category: 'estetica', experience: '20+', stats: { treatments: '6K+', patients: '8K+' } },
    { id: 18, name: 'lek. Agata Szpila-Duda', category: 'pediatria', experience: '12+', stats: { children: '5K+', consultations: '15K+' } }
];

const testimonials = [
    { id: 1, name: 'Laura Martínez', initials: 'LM', treatment: 'Implantes + Carillas', rating: 5, verified: true },
    { id: 2, name: 'Pedro Sánchez', initials: 'PS', treatment: 'Invisalign + Blanqueamiento', rating: 5, verified: true, featured: true },
    { id: 3, name: 'Ana López', initials: 'AL', treatment: 'Tratamiento completo', rating: 5, verified: true }
];

// Doctor role/specialty translations
const doctorRoles = {
    es: {
        1: { role: 'Cirujano Oncólogo', specialty: 'Cirugía Oncológica', bio: 'Especialista en cirugía oncológica con amplia experiencia en diagnóstico y tratamiento quirúrgico de tumores.' },
        2: { role: 'Dietista Clínico', specialty: 'Nutrición y Psicodietética', bio: 'Doctora en ciencias de la salud especializada en dietética clínica y psicodietética.' },
        3: { role: 'Psiquiatra', specialty: 'Psiquiatría General', bio: 'Médica psiquiatra especializada en diagnóstico y tratamiento de trastornos mentales.' },
        4: { role: 'Oftalmóloga', specialty: 'Oftalmología General', bio: 'Doctora en medicina especializada en oftalmología y cirugía de cataratas.' },
        5: { role: 'Geriatra', specialty: 'Geriatría', bio: 'Médica especialista en geriatría dedicada al cuidado integral de adultos mayores.' },
        6: { role: 'Infectóloga', specialty: 'Enfermedades Infecciosas', bio: 'Especialista en diagnóstico y tratamiento de infecciones bacterianas, virales y parasitarias.' },
        7: { role: 'Proctóloga', specialty: 'Proctología', bio: 'Doctora especializada en diagnóstico y tratamiento de enfermedades del colon y recto.' },
        8: { role: 'Ortopeda', specialty: 'Ortopedia y Traumatología', bio: 'Especialista en ortopedia y traumatología con enfoque en lesiones deportivas.' },
        9: { role: 'Cardiólogo', specialty: 'Cardiología', bio: 'Doctor especializado en cardiología con tecnología de vanguardia.' },
        10: { role: 'Senóloga', specialty: 'Enfermedades de Mama', bio: 'Doctora especializada en diagnóstico y tratamiento de enfermedades de la mama.' },
        11: { role: 'Ortopeda', specialty: 'Ortopedia Deportiva', bio: 'Especialista en ortopedia con enfoque en medicina deportiva.' },
        12: { role: 'Ortopeda', specialty: 'Cirugía Ortopédica', bio: 'Especialista en cirugía ortopédica y prótesis articulares.' },
        13: { role: 'Fisioterapeuta', specialty: 'Rehabilitación', bio: 'Magíster en rehabilitación especializada en fisioterapia ortopédica.' },
        14: { role: 'Odontóloga', specialty: 'Odontología General', bio: 'Odontóloga especializada en tratamientos conservadores y estética dental.' },
        15: { role: 'Odontóloga', specialty: 'Odontología Conservadora', bio: 'Dentista con amplia experiencia en odontología conservadora y endodoncia.' },
        16: { role: 'Periodoncista', specialty: 'Periodoncia', bio: 'Odontólogo especialista en periodoncia, implantes y regeneración tisular.' },
        17: { role: 'Medicina Estética', specialty: 'Estética y Reumatología', bio: 'Médica especialista en medicina estética y tratamientos de rejuvenecimiento.' },
        18: { role: 'Pediatra', specialty: 'Pediatría', bio: 'Médica pediatra dedicada al cuidado integral de niños y adolescentes.' }
    },
    pl: {
        1: { role: 'Chirurg Onkolog', specialty: 'Chirurgia Onkologiczna', bio: 'Specjalista chirurgii onkologicznej z szerokim doświadczeniem w diagnostyce i leczeniu nowotworów.' },
        2: { role: 'Dietetyk Kliniczny', specialty: 'Żywienie i Psychodietetyka', bio: 'Doktor nauk o zdrowiu specjalizujący się w dietetyce klinicznej i psychodietetyce.' },
        3: { role: 'Psychiatra', specialty: 'Psychiatria Ogólna', bio: 'Lekarz psychiatra specjalizujący się w diagnostyce i leczeniu zaburzeń psychicznych.' },
        4: { role: 'Okulista', specialty: 'Okulistyka Ogólna', bio: 'Doktor medycyny specjalizujący się w okulistyce i chirurgii zaćmy.' },
        5: { role: 'Geriatra', specialty: 'Geriatria', bio: 'Lekarz specjalista geriatrii zajmujący się kompleksową opieką nad osobami starszymi.' },
        6: { role: 'Specjalista Chorób Zakaźnych', specialty: 'Choroby Zakaźne', bio: 'Specjalista w diagnostyce i leczeniu infekcji bakteryjnych, wirusowych i pasożytniczych.' },
        7: { role: 'Proktolog', specialty: 'Proktologia', bio: 'Doktor specjalizujący się w diagnostyce i leczeniu chorób jelita grubego i odbytnicy.' },
        8: { role: 'Ortopeda', specialty: 'Ortopedia i Traumatologia', bio: 'Specjalista ortopedii i traumatologii z naciskiem na urazy sportowe.' },
        9: { role: 'Kardiolog', specialty: 'Kardiologia', bio: 'Doktor specjalizujący się w kardiologii z najnowocześniejszą technologią.' },
        10: { role: 'Senolog', specialty: 'Choroby Piersi', bio: 'Doktor specjalizujący się w diagnostyce i leczeniu chorób piersi.' },
        11: { role: 'Ortopeda', specialty: 'Ortopedia Sportowa', bio: 'Specjalista ortopedii z naciskiem na medycynę sportową.' },
        12: { role: 'Ortopeda', specialty: 'Chirurgia Ortopedyczna', bio: 'Specjalista chirurgii ortopedycznej i protez stawowych.' },
        13: { role: 'Fizjoterapeuta', specialty: 'Rehabilitacja', bio: 'Magister rehabilitacji specjalizujący się w fizjoterapii ortopedycznej.' },
        14: { role: 'Stomatolog', specialty: 'Stomatologia Ogólna', bio: 'Stomatolog specjalizujący się w leczeniu zachowawczym i estetyce dentystycznej.' },
        15: { role: 'Stomatolog', specialty: 'Stomatologia Zachowawcza', bio: 'Dentysta z szerokim doświadczeniem w stomatologii zachowawczej i endodoncji.' },
        16: { role: 'Periodontolog', specialty: 'Periodontologia', bio: 'Stomatolog specjalista periodontologii, implantów i regeneracji tkanek.' },
        17: { role: 'Medycyna Estetyczna', specialty: 'Estetyka i Reumatologia', bio: 'Lekarz specjalista medycyny estetycznej i zabiegów odmładzających.' },
        18: { role: 'Pediatra', specialty: 'Pediatria', bio: 'Lekarz pediatra zajmujący się kompleksową opieką nad dziećmi i młodzieżą.' }
    },
    uk: {
        1: { role: 'Хірург-онколог', specialty: 'Онкологічна хірургія', bio: 'Спеціаліст з онкологічної хірургії з великим досвідом діагностики та лікування пухлин.' },
        2: { role: 'Клінічний дієтолог', specialty: 'Харчування та психодієтетика', bio: 'Доктор наук про здоров\'я, що спеціалізується на клінічній дієтетиці та психодієтетиці.' },
        3: { role: 'Психіатр', specialty: 'Загальна психіатрія', bio: 'Лікар-психіатр, що спеціалізується на діагностиці та лікуванні психічних розладів.' },
        4: { role: 'Офтальмолог', specialty: 'Загальна офтальмологія', bio: 'Доктор медицини, що спеціалізується на офтальмології та хірургії катаракти.' },
        5: { role: 'Геріатр', specialty: 'Геріатрія', bio: 'Лікар-спеціаліст з геріатрії, що займається комплексним доглядом за літніми людьми.' },
        6: { role: 'Інфекціоніст', specialty: 'Інфекційні захворювання', bio: 'Спеціаліст з діагностики та лікування бактеріальних, вірусних та паразитарних інфекцій.' },
        7: { role: 'Проктолог', specialty: 'Проктологія', bio: 'Доктор, що спеціалізується на діагностиці та лікуванні захворювань товстої кишки та прямої кишки.' },
        8: { role: 'Ортопед', specialty: 'Ортопедія та травматологія', bio: 'Спеціаліст з ортопедії та травматології з акцентом на спортивні травми.' },
        9: { role: 'Кардіолог', specialty: 'Кардіологія', bio: 'Доктор, що спеціалізується на кардіології з передовими технологіями.' },
        10: { role: 'Мамолог', specialty: 'Захворювання молочної залози', bio: 'Доктор, що спеціалізується на діагностиці та лікуванні захворювань молочної залози.' },
        11: { role: 'Ортопед', specialty: 'Спортивна ортопедія', bio: 'Спеціаліст з ортопедії з акцентом на спортивну медицину.' },
        12: { role: 'Ортопед', specialty: 'Ортопедична хірургія', bio: 'Спеціаліст з ортопедичної хірургії та суглобових протезів.' },
        13: { role: 'Фізіотерапевт', specialty: 'Реабілітація', bio: 'Магістр реабілітації, що спеціалізується на ортопедичній фізіотерапії.' },
        14: { role: 'Стоматолог', specialty: 'Загальна стоматологія', bio: 'Стоматолог, що спеціалізується на консервативному лікуванні та естетичній стоматології.' },
        15: { role: 'Стоматолог', specialty: 'Консервативна стоматологія', bio: 'Дантист з великим досвідом у консервативній стоматології та ендодонтії.' },
        16: { role: 'Пародонтолог', specialty: 'Пародонтологія', bio: 'Стоматолог-спеціаліст з пародонтології, імплантів та регенерації тканин.' },
        17: { role: 'Естетична медицина', specialty: 'Естетика та ревматологія', bio: 'Лікар-спеціаліст з естетичної медицини та омолоджуючих процедур.' },
        18: { role: 'Педіатр', specialty: 'Педіатрія', bio: 'Лікар-педіатр, що займається комплексним доглядом за дітьми та підлітками.' }
    },
    en: {
        1: { role: 'Oncological Surgeon', specialty: 'Oncological Surgery', bio: 'Specialist in oncological surgery with extensive experience in tumor diagnosis and treatment.' },
        2: { role: 'Clinical Dietitian', specialty: 'Nutrition and Psychodietetics', bio: 'Doctor of Health Sciences specializing in clinical dietetics and psychodietetics.' },
        3: { role: 'Psychiatrist', specialty: 'General Psychiatry', bio: 'Medical psychiatrist specializing in diagnosis and treatment of mental disorders.' },
        4: { role: 'Ophthalmologist', specialty: 'General Ophthalmology', bio: 'Medical doctor specializing in ophthalmology and cataract surgery.' },
        5: { role: 'Geriatrician', specialty: 'Geriatrics', bio: 'Geriatric specialist dedicated to comprehensive care for older adults.' },
        6: { role: 'Infectious Disease Specialist', specialty: 'Infectious Diseases', bio: 'Specialist in diagnosis and treatment of bacterial, viral and parasitic infections.' },
        7: { role: 'Proctologist', specialty: 'Proctology', bio: 'Doctor specializing in diagnosis and treatment of colon and rectal diseases.' },
        8: { role: 'Orthopedist', specialty: 'Orthopedics and Traumatology', bio: 'Orthopedics and traumatology specialist focusing on sports injuries.' },
        9: { role: 'Cardiologist', specialty: 'Cardiology', bio: 'Doctor specializing in cardiology with cutting-edge technology.' },
        10: { role: 'Breast Specialist', specialty: 'Breast Diseases', bio: 'Doctor specializing in diagnosis and treatment of breast diseases.' },
        11: { role: 'Orthopedist', specialty: 'Sports Orthopedics', bio: 'Orthopedic specialist focusing on sports medicine.' },
        12: { role: 'Orthopedist', specialty: 'Orthopedic Surgery', bio: 'Specialist in orthopedic surgery and joint prostheses.' },
        13: { role: 'Physiotherapist', specialty: 'Rehabilitation', bio: 'Master in rehabilitation specializing in orthopedic physiotherapy.' },
        14: { role: 'Dentist', specialty: 'General Dentistry', bio: 'Dentist specializing in conservative treatments and dental aesthetics.' },
        15: { role: 'Dentist', specialty: 'Conservative Dentistry', bio: 'Dentist with extensive experience in conservative dentistry and endodontics.' },
        16: { role: 'Periodontist', specialty: 'Periodontics', bio: 'Dental specialist in periodontics, implants and tissue regeneration.' },
        17: { role: 'Aesthetic Medicine', specialty: 'Aesthetics and Rheumatology', bio: 'Medical specialist in aesthetic medicine and rejuvenation treatments.' },
        18: { role: 'Pediatrician', specialty: 'Pediatrics', bio: 'Pediatrician dedicated to comprehensive care for children and adolescents.' }
    }
};

const testimonialTexts = {
    es: {
        1: 'Increíble transformación. Llevaba años avergonzada de mi sonrisa y en Wojtek me han cambiado la vida. ¡No puedo dejar de sonreír!',
        2: 'Como profesional de la imagen, mi sonrisa es mi carta de presentación. Diseñaron mi ortodoncia invisible perfectamente.',
        3: 'Tenía pánico al dentista desde pequeña. En Wojtek me trataron con tanta paciencia que ahora voy sin ningún miedo.'
    },
    pl: {
        1: 'Niesamowita transformacja. Przez lata wstydziłam się mojego uśmiechu, a w Wojtek zmienili mi życie. Nie mogę przestać się uśmiechać!',
        2: 'Jako profesjonalista od wizerunku, mój uśmiech jest moją wizytówką. Doskonale zaprojektowali moją niewidoczną ortodoncję.',
        3: 'Od dziecka bałam się dentysty. W Wojtek traktowali mnie z taką cierpliwością, że teraz chodzę bez żadnego strachu.'
    },
    uk: {
        1: 'Неймовірна трансформація. Роками соромилася своєї посмішки, а в Wojtek змінили моє життя. Не можу перестати посміхатися!',
        2: 'Як професіонал у сфері іміджу, моя посмішка - це моя візитівка. Вони ідеально розробили мою невидиму ортодонтію.',
        3: 'З дитинства боялася стоматолога. У Wojtek ставилися до мене з такою терплячістю, що тепер ходжу без жодного страху.'
    },
    en: {
        1: 'Incredible transformation. I was embarrassed about my smile for years and at Wojtek they changed my life. I can\'t stop smiling!',
        2: 'As an image professional, my smile is my calling card. They designed my invisible orthodontics perfectly.',
        3: 'I was terrified of the dentist since childhood. At Wojtek they treated me with such patience that now I go without any fear.'
    }
};

// Service descriptions by language
const serviceDescriptions = {
    es: {
        odontologia: { desc: 'Servicios dentales completos incluyendo periodoncia, tratamientos conservadores y estética dental.', features: ['Periodoncia especializada', 'Tratamientos conservadores', 'Estética dental'] },
        cardiologia: { desc: 'Diagnóstico y tratamiento de enfermedades cardiovasculares con tecnología avanzada.', features: ['Electrocardiograma', 'Ecocardiografía', 'Prevención cardiovascular'] },
        oftalmologia: { desc: 'Cuidado integral de la salud visual. Diagnóstico y tratamiento de enfermedades oculares.', features: ['Examen completo de vista', 'Tratamiento de cataratas', 'Glaucoma'] },
        ortopedia: { desc: 'Especialistas en sistema musculoesquelético. Tratamiento de lesiones y enfermedades óseas.', features: ['Traumatología', 'Cirugía ortopédica', 'Rehabilitación'] },
        psiquiatria: { desc: 'Atención especializada en salud mental. Diagnóstico y tratamiento de trastornos psiquiátricos.', features: ['Evaluación psiquiátrica', 'Tratamiento farmacológico', 'Seguimiento continuo'] },
        pediatria: { desc: 'Cuidado médico integral para niños y adolescentes en un ambiente acogedor.', features: ['Control de crecimiento', 'Vacunaciones', 'Atención preventiva'] },
        oncologia: { desc: 'Especialistas en diagnóstico y tratamiento quirúrgico de enfermedades oncológicas.', features: ['Diagnóstico temprano', 'Cirugía especializada', 'Seguimiento oncológico'] },
        geriatria: { desc: 'Atención médica especializada para adultos mayores. Cuidado integral de la tercera edad.', features: ['Evaluación geriátrica', 'Prevención de caídas', 'Manejo de polifarmacia'] },
        nutricion: { desc: 'Dietética clínica y psiconutrición. Planes alimentarios personalizados.', features: ['Dietas personalizadas', 'Psiconutrición', 'Control de peso'] },
        proctologia: { desc: 'Diagnóstico y tratamiento de enfermedades del colon, recto y ano.', features: ['Colonoscopia', 'Tratamiento de hemorroides', 'Cirugía mínimamente invasiva'] },
        estetica: { desc: 'Tratamientos estéticos no invasivos para rejuvenecimiento y cuidado de la piel.', features: ['Botox y rellenos', 'Tratamientos faciales', 'Rejuvenecimiento'] },
        rehabilitacion: { desc: 'Fisioterapia y rehabilitación para recuperación funcional y mejora de calidad de vida.', features: ['Fisioterapia', 'Terapia manual', 'Ejercicio terapéutico'] }
    },
    pl: {
        odontologia: { desc: 'Kompleksowe usługi stomatologiczne obejmujące periodontologię, leczenie zachowawcze i estetykę dentystyczną.', features: ['Periodontologia specjalistyczna', 'Leczenie zachowawcze', 'Estetyka dentystyczna'] },
        cardiologia: { desc: 'Diagnostyka i leczenie chorób układu krążenia z wykorzystaniem zaawansowanej technologii.', features: ['Elektrokardiogram', 'Echokardiografia', 'Profilaktyka kardiologiczna'] },
        oftalmologia: { desc: 'Kompleksowa opieka nad zdrowiem wzroku. Diagnostyka i leczenie chorób oczu.', features: ['Pełne badanie wzroku', 'Leczenie zaćmy', 'Jaskra'] },
        ortopedia: { desc: 'Specjaliści układu mięśniowo-szkieletowego. Leczenie urazów i chorób kości.', features: ['Traumatologia', 'Chirurgia ortopedyczna', 'Rehabilitacja'] },
        psiquiatria: { desc: 'Specjalistyczna opieka zdrowia psychicznego. Diagnostyka i leczenie zaburzeń psychicznych.', features: ['Ocena psychiatryczna', 'Leczenie farmakologiczne', 'Ciągła obserwacja'] },
        pediatria: { desc: 'Kompleksowa opieka medyczna dla dzieci i młodzieży w przyjaznym środowisku.', features: ['Kontrola rozwoju', 'Szczepienia', 'Opieka profilaktyczna'] },
        oncologia: { desc: 'Specjaliści w diagnostyce i chirurgicznym leczeniu chorób nowotworowych.', features: ['Wczesna diagnostyka', 'Specjalistyczna chirurgia', 'Obserwacja onkologiczna'] },
        geriatria: { desc: 'Specjalistyczna opieka medyczna dla osób starszych. Kompleksowa opieka senioralna.', features: ['Ocena geriatryczna', 'Profilaktyka upadków', 'Zarządzanie polifarmacją'] },
        nutricion: { desc: 'Dietetyka kliniczna i psychonutrition. Indywidualne plany żywieniowe.', features: ['Spersonalizowane diety', 'Psychonutrition', 'Kontrola wagi'] },
        proctologia: { desc: 'Diagnostyka i leczenie chorób jelita grubego, odbytnicy i odbytu.', features: ['Kolonoskopia', 'Leczenie hemoroidów', 'Chirurgia małoinwazyjna'] },
        estetica: { desc: 'Nieinwazyjne zabiegi estetyczne odmładzające i pielęgnujące skórę.', features: ['Botoks i wypełniacze', 'Zabiegi na twarz', 'Odmładzanie'] },
        rehabilitacion: { desc: 'Fizjoterapia i rehabilitacja dla odzyskania funkcji i poprawy jakości życia.', features: ['Fizjoterapia', 'Terapia manualna', 'Ćwiczenia terapeutyczne'] }
    },
    uk: {
        odontologia: { desc: 'Комплексні стоматологічні послуги, включаючи пародонтологію, консервативне лікування та естетичну стоматологію.', features: ['Спеціалізована пародонтологія', 'Консервативне лікування', 'Естетична стоматологія'] },
        cardiologia: { desc: 'Діагностика та лікування серцево-судинних захворювань з використанням передових технологій.', features: ['Електрокардіограма', 'Ехокардіографія', 'Профілактика серцево-судинних захворювань'] },
        oftalmologia: { desc: "Комплексний догляд за здоров'ям зору. Діагностика та лікування захворювань очей.", features: ['Повний огляд зору', 'Лікування катаракти', 'Глаукома'] },
        ortopedia: { desc: "Спеціалісти з м'язово-скелетної системи. Лікування травм та захворювань кісток.", features: ['Травматологія', 'Ортопедична хірургія', 'Реабілітація'] },
        psiquiatria: { desc: "Спеціалізована допомога з психічного здоров'я. Діагностика та лікування психічних розладів.", features: ['Психіатрична оцінка', 'Фармакологічне лікування', 'Постійне спостереження'] },
        pediatria: { desc: 'Комплексна медична допомога для дітей та підлітків у затишній атмосфері.', features: ['Контроль росту', 'Вакцинація', 'Профілактична допомога'] },
        oncologia: { desc: 'Спеціалісти з діагностики та хірургічного лікування онкологічних захворювань.', features: ['Рання діагностика', 'Спеціалізована хірургія', 'Онкологічне спостереження'] },
        geriatria: { desc: 'Спеціалізована медична допомога для літніх людей. Комплексний догляд за людьми похилого віку.', features: ['Геріатрична оцінка', 'Профілактика падінь', 'Управління поліфармацією'] },
        nutricion: { desc: 'Клінічна дієтетика та психохарчування. Індивідуальні харчові плани.', features: ['Персоналізовані дієти', 'Психохарчування', 'Контроль ваги'] },
        proctologia: { desc: 'Діагностика та лікування захворювань товстої кишки, прямої кишки та ануса.', features: ['Колоноскопія', 'Лікування геморою', 'Малоінвазивна хірургія'] },
        estetica: { desc: 'Неінвазивні естетичні процедури для омолодження та догляду за шкірою.', features: ['Ботокс та філери', 'Процедури для обличчя', 'Омолодження'] },
        rehabilitacion: { desc: 'Фізіотерапія та реабілітація для відновлення функцій та покращення якості життя.', features: ['Фізіотерапія', 'Мануальна терапія', 'Лікувальні вправи'] }
    },
    en: {
        odontologia: { desc: 'Complete dental services including periodontics, conservative treatments and dental aesthetics.', features: ['Specialized periodontics', 'Conservative treatments', 'Dental aesthetics'] },
        cardiologia: { desc: 'Diagnosis and treatment of cardiovascular diseases with advanced technology.', features: ['Electrocardiogram', 'Echocardiography', 'Cardiovascular prevention'] },
        oftalmologia: { desc: 'Comprehensive eye health care. Diagnosis and treatment of eye diseases.', features: ['Complete eye exam', 'Cataract treatment', 'Glaucoma'] },
        ortopedia: { desc: 'Musculoskeletal system specialists. Treatment of injuries and bone diseases.', features: ['Traumatology', 'Orthopedic surgery', 'Rehabilitation'] },
        psiquiatria: { desc: 'Specialized mental health care. Diagnosis and treatment of psychiatric disorders.', features: ['Psychiatric evaluation', 'Pharmacological treatment', 'Continuous monitoring'] },
        pediatria: { desc: 'Comprehensive medical care for children and adolescents in a welcoming environment.', features: ['Growth control', 'Vaccinations', 'Preventive care'] },
        oncologia: { desc: 'Specialists in diagnosis and surgical treatment of oncological diseases.', features: ['Early diagnosis', 'Specialized surgery', 'Oncological follow-up'] },
        geriatria: { desc: 'Specialized medical care for older adults. Comprehensive senior care.', features: ['Geriatric assessment', 'Fall prevention', 'Polypharmacy management'] },
        nutricion: { desc: 'Clinical dietetics and psychonutrition. Personalized meal plans.', features: ['Personalized diets', 'Psychonutrition', 'Weight control'] },
        proctologia: { desc: 'Diagnosis and treatment of colon, rectum and anus diseases.', features: ['Colonoscopy', 'Hemorrhoid treatment', 'Minimally invasive surgery'] },
        estetica: { desc: 'Non-invasive aesthetic treatments for rejuvenation and skin care.', features: ['Botox and fillers', 'Facial treatments', 'Rejuvenation'] },
        rehabilitacion: { desc: 'Physiotherapy and rehabilitation for functional recovery and quality of life improvement.', features: ['Physiotherapy', 'Manual therapy', 'Therapeutic exercise'] }
    }
};

// =====================================================
// LANGUAGE MIDDLEWARE
// =====================================================
app.use((req, res, next) => {
    // Check query param first, then cookie, then default to 'es'
    let lang = req.query.lang || req.cookies.lang || 'pl';

    // Validate language
    if (!['es', 'pl', 'uk', 'en'].includes(lang)) {
        lang = 'es';
    }

    // Set cookie for persistence
    if (req.query.lang) {
        res.cookie('lang', lang, { maxAge: 365 * 24 * 60 * 60 * 1000 }); // 1 year
    }

    req.lang = lang;
    req.t = translations[lang];
    next();
});

// Helper function to build services with translations
function getServicesWithTranslations(lang) {
    const t = translations[lang];
    const serviceDescs = serviceDescriptions[lang];

    return servicesData.map(service => ({
        ...service,
        title: t.serviceNames[service.id],
        description: serviceDescs[service.id].desc,
        features: serviceDescs[service.id].features,
        price: lang === 'en' ? 'Contact us' : lang === 'pl' ? 'Zapytaj' : lang === 'uk' ? 'Запитайте' : 'Consultar'
    }));
}

// Helper function to build doctors with translations
function getDoctorsWithTranslations(lang) {
    const roles = doctorRoles[lang];

    return doctors.map(doctor => ({
        ...doctor,
        role: roles[doctor.id].role,
        specialty: roles[doctor.id].specialty,
        bio: roles[doctor.id].bio,
        education: lang === 'pl' ? 'Uniwersytet Medyczny' : lang === 'uk' ? 'Медичний університет' : lang === 'en' ? 'Medical University' : 'Universidad de Medicina',
        languages: lang === 'pl' ? ['Polski', 'Ukraiński', 'Hiszpański', 'Angielski'] :
                   lang === 'uk' ? ['Польська', 'Українська', 'Іспанська', 'Англійська'] :
                   lang === 'en' ? ['Polish', 'Ukrainian', 'Spanish', 'English'] :
                   ['Polaco', 'Ucraniano', 'Español', 'Inglés']
    }));
}

// Helper function to build testimonials with translations
function getTestimonialsWithTranslations(lang) {
    const texts = testimonialTexts[lang];

    return testimonials.map(testimonial => ({
        ...testimonial,
        text: texts[testimonial.id]
    }));
}

// =====================================================
// ROUTES
// =====================================================
app.get('/', (req, res) => {
    const lang = req.lang;
    const t = req.t;
    const doctorsData = getDoctorsWithTranslations(lang);

    res.render('index', {
        clinic: clinicData,
        services: getServicesWithTranslations(lang),
        doctors: doctorsData.slice(0, 4),
        testimonials: getTestimonialsWithTranslations(lang),
        page: 'home',
        lang: lang,
        t: t
    });
});

app.get('/especialistas', (req, res) => {
    const lang = req.lang;
    const t = req.t;

    res.render('doctors', {
        clinic: clinicData,
        doctors: getDoctorsWithTranslations(lang),
        page: 'doctors',
        lang: lang,
        t: t
    });
});

app.get('/servicios', (req, res) => {
    const lang = req.lang;
    const t = req.t;

    res.render('services', {
        clinic: clinicData,
        services: getServicesWithTranslations(lang),
        page: 'services',
        lang: lang,
        t: t
    });
});

// Legal pages
app.get('/privacidad', (req, res) => {
    const lang = req.lang;
    const t = req.t;
    res.render('privacidad', {
        clinic: clinicData,
        page: 'privacy',
        lang: lang,
        t: t
    });
});

app.get('/regulamin', (req, res) => {
    const lang = req.lang;
    const t = req.t;
    res.render('regulamin', {
        clinic: clinicData,
        page: 'terms',
        lang: lang,
        t: t
    });
});

app.get('/cookies', (req, res) => {
    const lang = req.lang;
    const t = req.t;
    res.render('cookies', {
        clinic: clinicData,
        page: 'cookies',
        lang: lang,
        t: t
    });
});

// API endpoints
app.post('/api/appointment', (req, res) => {
    const { nombre, telefono, email, tratamiento, mensaje } = req.body;
    console.log('Nueva cita:', { nombre, telefono, email, tratamiento, mensaje });

    const lang = req.lang;
    const messages = {
        es: '¡Gracias! Te contactaremos en menos de 2 horas.',
        pl: 'Dziękujemy! Skontaktujemy się w ciągu 2 godzin.',
        uk: 'Дякуємо! Зв\'яжемося протягом 2 годин.',
        en: 'Thank you! We\'ll contact you within 2 hours.'
    };

    res.json({
        success: true,
        message: messages[lang]
    });
});

app.get('/api/doctors', (req, res) => {
    const { category } = req.query;
    const lang = req.lang;
    let filteredDoctors = getDoctorsWithTranslations(lang);

    if (category && category !== 'all') {
        filteredDoctors = filteredDoctors.filter(d => d.category === category);
    }

    res.json(filteredDoctors);
});

// 404 handler
app.use((req, res) => {
    const lang = req.lang || 'pl';
    const t = translations[lang];

    res.status(404).render('404', {
        clinic: clinicData,
        lang: lang,
        t: t
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
    ╔═══════════════════════════════════════════════════╗
    ║                                                   ║
    ║   🏥 WOJTEK - Centro Médico Multiespecialidad    ║
    ║                                                   ║
    ║   Server running at: http://localhost:${PORT}       ║
    ║   Languages: ES | PL | UK | EN                   ║
    ║                                                   ║
    ╚═══════════════════════════════════════════════════╝
    `);
});
