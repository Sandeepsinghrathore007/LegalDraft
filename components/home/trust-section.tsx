import { MaterialIcon } from "@/components/ui/material-icon";

type TrustCard = {
  body: string;
  bodyClassName?: string;
  fill: boolean;
  icon: string;
  iconBg: string;
  iconClassName: string;
  title: string;
  titleClassName?: string;
  wrapperClassName: string;
};

const cards: TrustCard[] = [
  {
    body: "Active Users Daily",
    icon: "groups",
    iconBg: "bg-primary-fixed",
    iconClassName: "text-primary",
    fill: true,
    title: "500+",
    wrapperClassName: "bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant/5"
  },
  {
    body: "All transactions are encrypted with bank-grade 256-bit SSL security protocol.",
    icon: "security",
    iconBg: "bg-tertiary-fixed",
    iconClassName: "text-on-tertiary-fixed-variant",
    fill: true,
    title: "Secure Payment",
    wrapperClassName: "bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant/5"
  },
  {
    body: "Draft, review, and download your e-signed document in under 5 minutes.",
    icon: "bolt",
    iconBg: "bg-on-primary/10",
    iconClassName: "",
    fill: true,
    title: "Instant Delivery",
    wrapperClassName: "bg-primary text-on-primary p-8 rounded-2xl shadow-xl md:row-span-1",
    titleClassName: "text-2xl font-bold mb-2",
    bodyClassName: "font-medium opacity-90 text-on-primary-container"
  }
];

export function TrustSection() {
  return (
    <section className="bg-surface-container-low px-4 py-20 md:px-8 md:py-24" id="trust">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
            Trusted by Professionals
          </h2>
          <p className="font-medium text-on-surface-variant">
            Join thousands of landlords and tenants using LegalDraft.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <div className={card.wrapperClassName} key={card.title}>
              <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${card.iconBg}`}>
                <MaterialIcon className={card.iconClassName} fill={card.fill} icon={card.icon} />
              </div>
              <div
                className={
                  card.title === "500+"
                    ? "mb-2 text-4xl font-extrabold text-primary"
                    : card.titleClassName ?? "mb-2 text-2xl font-bold text-primary"
                }
              >
                {card.title}
              </div>
              <p
                className={
                  card.title === "500+"
                    ? "font-semibold text-on-surface-variant"
                    : card.bodyClassName ?? "font-medium text-on-surface-variant"
                }
              >
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
