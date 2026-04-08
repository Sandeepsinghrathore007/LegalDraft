type LegalSection = {
  body: string[];
  heading: string;
};

type LegalPageContent = {
  description: string;
  eyebrow: string;
  sections: LegalSection[];
  title: string;
};

export const privacyContent: LegalPageContent = {
  description:
    "This Privacy Policy explains how LegalDraft collects, uses, and protects your information when using our agreement generation platform.",
  eyebrow: "Privacy",
  sections: [
    {
      body: [
        "We collect account details such as name, email, and plan activity to provide account access and plan-level download limits.",
        "We also collect document form inputs that you actively provide in order to generate preview and downloadable agreement drafts."
      ],
      heading: "Information We Collect"
    },
    {
      body: [
        "Your information is used to authenticate access, manage plan limits, and provide product support.",
        "We do not sell your personal information to third parties."
      ],
      heading: "How We Use Information"
    },
    {
      body: [
        "Client-side simulated flows may store user state in local storage for session continuity.",
        "You can clear browser storage at any time to remove locally stored simulated account data."
      ],
      heading: "Storage and Security"
    }
  ],
  title: "Privacy Policy"
};

export const termsContent: LegalPageContent = {
  description:
    "These Terms govern your access to and use of LegalDraft services, including plan subscriptions and document generation workflows.",
  eyebrow: "Terms",
  sections: [
    {
      body: [
        "By using LegalDraft, you agree to provide accurate information and use the service in compliance with applicable laws.",
        "You are responsible for reviewing generated documents before execution."
      ],
      heading: "Service Use"
    },
    {
      body: [
        "Plan features and download limits are enforced based on the plan associated with your account.",
        "Misuse of the platform may result in account restrictions."
      ],
      heading: "Plans and Access"
    },
    {
      body: [
        "LegalDraft provides drafting tools and does not substitute professional legal advice.",
        "You should consult qualified counsel for jurisdiction-specific legal requirements."
      ],
      heading: "Legal Disclaimer"
    }
  ],
  title: "Terms of Service"
};

export const refundPolicyContent: LegalPageContent = {
  description:
    "This Refund Policy defines when subscription charges may be refunded and outlines the steps for requesting a review.",
  eyebrow: "Refunds",
  sections: [
    {
      body: [
        "Starter and Pro plan upgrades are billed monthly based on the selected plan.",
        "If a billing issue occurs, contact support within 7 days of charge date."
      ],
      heading: "Eligibility"
    },
    {
      body: [
        "Refund requests are reviewed against account usage, billing records, and service availability logs.",
        "Approved refunds are issued to the original payment method."
      ],
      heading: "Review Process"
    },
    {
      body: [
        "To request a review, include your registered email, plan type, and transaction reference.",
        "Our support team typically responds within 2 business days."
      ],
      heading: "How to Request"
    }
  ],
  title: "Refund Policy"
};
