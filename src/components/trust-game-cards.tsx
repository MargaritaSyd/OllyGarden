const cards = [
  {
    position: "quiz-hero-card-pos quiz-hero-card-pos-top",
    motion: "quiz-hero-card-bob",
    kicker: "Case 04 · Logs",
    claim: "The health-check logs are all INFO, so the checks are passing.",
    holds: false,
    rows: [
      { severity: "INFO", body: "service check got error ECONNREFUSED", highlight: true },
      { severity: "INFO", body: "service check got error ECONNREFUSED", highlight: true },
    ],
  },
  {
    position: "quiz-hero-card-pos quiz-hero-card-pos-bottom tg-hero-pos-bottom",
    motion: "quiz-hero-card-bob quiz-hero-card-bob-slow",
    kicker: "Case 01 · Trace",
    claim: "The provider had no record for this customer. Our own services were fast.",
    holds: true,
    rows: [
      { severity: "OK", body: "user-profile GET /v1/users 1.2 ms", highlight: false },
      { severity: "ERROR", body: "fetch provider report 1.13 s", highlight: true },
    ],
  },
] as const;

function severityClass(severity: string) {
  if (severity === "ERROR") return "is-error";
  if (severity === "OK" || severity === "INFO") return "is-ok";
  return "is-muted";
}

/** Decorative cases beside the hero. They are not the visitor's round. */
export function TrustGameCards() {
  return (
    <div className="quiz-hero-visual" aria-hidden="true">
      {cards.map((card) => (
        <div key={card.kicker} className={card.position}>
          <div className="quiz-hero-card-par">
            <div className={card.motion}>
              <div className="tg-hero-card">
                <p className="tg-hero-kicker">{card.kicker}</p>
                <p className="tg-hero-claim">{card.claim}</p>
                <div className="tg-hero-rows">
                  {card.rows.map((row, rowIndex) => (
                    <p key={rowIndex} className={row.highlight ? "is-hl" : undefined}>
                      <span className={severityClass(row.severity)}>{row.severity}</span>
                      <span>{row.body}</span>
                    </p>
                  ))}
                </div>
                <p className={`tg-hero-stamp ${card.holds ? "is-holds" : "is-fails"}`}>
                  {card.holds ? "Holds up" : "Doesn't hold up"}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
