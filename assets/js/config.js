/**
 * Lakshya Welfare Society — Centralized Configuration & Content Registry
 * ====================================================================
 * This configuration file serves as the Single Source of Truth for
 * organizational information, contact details, payment parameters,
 * initiatives, and gallery media.
 * 
 * To update website information in the future, simply edit the values below.
 */

const LAKSHYA_CONFIG = {
  /* Core Organization Metadata (Confirmed by Client) */
  organization: {
    name: "Lakshya Welfare Society",
    shortName: "Lakshya Welfare Society",
    founder: "Dr. Riaz Ahmad",
    foundedYear: 2011,
    foundedText: "Founded in 2011",
    sinceText: "Since 2011",
    location: "Chandoi, Pilibhit, Uttar Pradesh, India",
    district: "Pilibhit",
    state: "Uttar Pradesh",
    country: "India",
    tagline: "Every life is precious...",
    logoImage: "assets/images/logo/Logo.jpeg",
    founderPhoto: "assets/images/logo/DrRiaz.jpeg",
    foundingPrinciples: [
      "Grassroots community welfare and support for families in need since 2011",
      "Educational empowerment for rural children and youth",
      "Preventive health awareness and community wellness camps",
      "Ethical stewardship, transparency, and dignity for all individuals"
    ]
  },

  /* Verified & Pending Contact Channels */
  contact: {
    address: {
      line1: "Lakshya Welfare Society",
      area: "Chandoi",
      district: "Pilibhit",
      state: "Uttar Pradesh",
      country: "India",
      verified: true
    },
    social: {
      facebook: {
        name: "Official Facebook Page",
        url: "https://www.facebook.com/lwsociety/",
        handle: "@lwsociety",
        verified: true,
        note: "Primary verified digital communication channel"
      }
    },
    /* Directory records (Third-party NGO Portal / JustDial records awaiting direct verification) */
    directoryRecords: {
      phonePrimary: "+91 9411831566",
      phoneSecondary: "+91 9897640605",
      email: "drriazahmad16@gmail.com",
      status: "pending_direct_verification",
      note: "Publicly listed on NGO Portal directory under Dr. Riaz Ahmad. Retained as editable draft contact."
    }
  },

  /* Official Donation & Payment Configuration */
  payment: {
    status: "active",
    isLive: true,
    qrCodeImage: "assets/images/qr/official_qr_code.jpeg",
    officialPayeeName: "Lakshya Welfare Society",
    bankName: "UCO Bank",
    officialUpiId: "Lakshya Welfare Society (UCO Bank Official QR)",
    paymentNote: "Scan the official UCO Bank QR code with any UPI application (Google Pay, PhonePe, Paytm, BHIM, or mobile banking).",
    verificationNotice: "Verify that the recipient name displays 'Lakshya Welfare Society' before authorizing payment. Lakshya Welfare Society never accepts funds into unverified private accounts.",
    bankTransferInfo: {
      accountName: "Lakshya Welfare Society",
      bankName: "UCO Bank",
      branch: "Pilibhit, Uttar Pradesh",
      status: "Active Official Account"
    }
  },

  /* Documented Social Welfare Focus Areas */
  initiatives: [
    {
      id: "community-welfare",
      title: "Community Welfare & Direct Assistance",
      tag: "Social Welfare",
      shortDesc: "Grassroots outreach programs designed to provide direct relief, seasonal assistance, and welfare support to underprivileged families in Chandoi and surrounding rural areas.",
      details: "Lakshya Welfare Society operates with a community-first philosophy, identifying families requiring immediate aid, seasonal relief materials, and essential welfare support. We believe meaningful social work begins by listening to the local community.",
      highlights: [
        "Identification of vulnerable households in rural Pilibhit",
        "Direct community welfare and essential relief distribution",
        "Assistance to elderly, distressed, and underprivileged residents",
        "Collaborative neighborhood action and community volunteers"
      ],
      icon: "users"
    },
    {
      id: "child-education",
      title: "Education & Children's Learning Support",
      tag: "Education",
      shortDesc: "Encouraging rural schooling, distributing basic educational supplies, and supporting children from modest backgrounds in continuing their learning journey.",
      details: "Education is the greatest catalyst for enduring change. Our educational efforts emphasize keeping children engaged in schooling, providing learning materials, and creating an encouraging environment for young learners in Chandoi.",
      highlights: [
        "Encouraging regular school attendance in rural clusters",
        "Distribution of notebooks, textbooks, and learning supplies",
        "Mentorship and guidance for first-generation learners",
        "Community dialogues on the value of girls' education"
      ],
      icon: "book"
    },
    {
      id: "health-awareness",
      title: "Health Awareness & Medical Camps",
      tag: "Community Health",
      shortDesc: "Promoting preventive healthcare awareness, hygiene practices, and organizing rural health screening camps in collaboration with local medical practitioners.",
      details: "Under the leadership of founder Dr. Riaz Ahmad, healthcare accessibility remains a foundational priority. We focus on preventive health literacy, basic health screenings, hygiene awareness, and directing patients to timely medical facilities.",
      highlights: [
        "Rural health screening camps and doctor consultations",
        "Hygiene, sanitation, and clean drinking water awareness",
        "Seasonal disease prevention education for families",
        "Connecting underprivileged patients with care facilities"
      ],
      icon: "activity"
    },
    {
      id: "women-family",
      title: "Women & Family Welfare",
      tag: "Family Support",
      shortDesc: "Initiatives focused on maternal and child health awareness, family welfare counselling, and supporting women in rural communities towards self-sufficiency.",
      details: "A healthy family is the bedrock of a thriving village. Lakshya Welfare Society works closely with women and mothers to address family nutritional awareness, health concerns, and social dignity.",
      highlights: [
        "Family welfare and maternal well-being guidance",
        "Encouraging vocational confidence and self-reliance",
        "Community awareness against social vulnerabilities",
        "Safe forums for women to voice community challenges"
      ],
      icon: "heart"
    }
  ],

  /* Gallery Media Items (Documented Real Photographs) */
  gallery: [
    {
      id: "gal-1",
      title: "Free Rural Health & Diagnostic Camp",
      category: "health",
      categoryLabel: "Health Awareness",
      image: "assets/images/gallery/hospital_free_health_camp.jpeg",
      caption: "Free health check-up camp providing ECG, blood pressure testing, blood sugar analysis, and specialized medical consultations for rural patients.",
      date: "Documented Medical Camp"
    },
    {
      id: "gal-2",
      title: "Free Medicine Distribution Counter",
      category: "community",
      categoryLabel: "Community Welfare",
      image: "assets/images/gallery/rural_medicine_distribution.jpeg",
      caption: "Direct medicine dispensing counter delivering vital prescriptions and healthcare supplies to rural families under camp outreach canopy.",
      date: "Prescription Distribution"
    },
    {
      id: "gal-3",
      title: "BPCL Aonla Depot Diagnostic Camp",
      category: "health",
      categoryLabel: "Health Awareness",
      image: "assets/images/gallery/bpcl_health_camp.jpeg",
      caption: "Six-monthly health examination camp at BPCL Aonla Depot conducted by Dr. Riaz Ahmad and diagnostic team.",
      date: "Health Screening Drive"
    },
    {
      id: "gal-4",
      title: "First Aid & CPR Life-Saving Demonstration",
      category: "community",
      categoryLabel: "Community Welfare",
      image: "assets/images/gallery/cpr_industrial_training.jpeg",
      caption: "Dr. Riaz Ahmad delivering hands-on emergency first aid, CPR resuscitation, and vital life support training to workers.",
      date: "Emergency Training"
    },
    {
      id: "gal-5",
      title: "Morning Walkers Community Wellness Camp",
      category: "health",
      categoryLabel: "Health Awareness",
      image: "assets/images/gallery/outdoor_health_camp.jpeg",
      caption: "Community wellness check-up camp organized in CI Park / Gandhi Udyan providing early screening for cardiac and diabetic indicators.",
      date: "Outdoor Health Camp"
    },
    {
      id: "gal-6",
      title: "Doctor Consultation & Vital Checkups",
      category: "health",
      categoryLabel: "Health Awareness",
      image: "assets/images/gallery/doctor_consultation_camp.jpeg",
      caption: "Dr. Riaz Ahmad examining village patients, recording vital signs, and preparing customized treatment plans.",
      date: "Clinical Consultation"
    },
    {
      id: "gal-7",
      title: "Volunteer Doctors & Healthcare Delegation",
      category: "events",
      categoryLabel: "Volunteer Meetings",
      image: "assets/images/gallery/medical_volunteer_doctors.jpeg",
      caption: "Medical doctors, nurses, and community volunteers uniting to deliver free healthcare services across rural Pilibhit.",
      date: "Medical Delegation"
    },
    {
      id: "gal-8",
      title: "Press Coverage: Dainik Jagran Report",
      category: "events",
      categoryLabel: "Documentation",
      image: "assets/images/gallery/newspaper_health_camp.jpeg",
      caption: "Dainik Jagran news coverage highlighting the extensive free health camp and expert consultations organized by Dr. Riaz Ahmad.",
      date: "Media Documentation"
    },
    {
      id: "gal-9",
      title: "Village Health Screening & Registration",
      category: "health",
      categoryLabel: "Health Awareness",
      image: "assets/images/gallery/village_health_queue.jpeg",
      caption: "Nursing staff registering village women and elders for automated blood pressure and blood glucose evaluations.",
      date: "Rural Health Screening"
    },
    {
      id: "gal-10",
      title: "Youth Volunteers & Community Celebration",
      category: "events",
      categoryLabel: "Volunteer Meetings",
      image: "assets/images/gallery/youth_volunteers_flag.jpeg",
      caption: "Youth volunteer team and clinic personnel celebrating national solidarity and commitment to grassroots community service.",
      date: "Community Engagement"
    },
    {
      id: "gal-11",
      title: "Specialized Eye & Cataract Screening Camp",
      category: "health",
      categoryLabel: "Health Awareness",
      image: "assets/images/gallery/camp_cataract_banner.jpeg",
      caption: "Physicians and social workers coordinating diagnostic screening and cataract evaluation drives for elderly village citizens.",
      date: "Specialized Medical Outreach"
    },
    {
      id: "gal-12",
      title: "Occupational Safety & Health Briefing",
      category: "community",
      categoryLabel: "Community Welfare",
      image: "assets/images/gallery/worker_safety_briefing.jpeg",
      caption: "Health literacy and preventive occupational wellness guidance delivered to industrial and technical personnel.",
      date: "Workplace Health Session"
    }
  ]
};

// Freeze configuration to prevent accidental modification at runtime
if (typeof Object.freeze === 'function') {
  Object.freeze(LAKSHYA_CONFIG);
}
