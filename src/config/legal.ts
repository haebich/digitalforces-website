export const legalReview = {
  status: 'Interner Arbeitsentwurf · vor Veröffentlichung fachlich und rechtlich prüfen',
  checkedAt: '2026-08-07',
  provider: {
    businessName: 'DigitalForces',
    owner: 'Stephen Häbich',
    street: 'Hanfweg 18/2',
    postalCode: '71116',
    city: 'Gärtringen',
    country: 'Deutschland',
    phone: '+49 (0) 152 57210404',
    vatId: 'DE315662704',
  },
  unresolved: {
    register: 'Prüfen, ob Register-, Kammer-, Zulassungs- oder Berufsangaben erforderlich sind.',
    editorialResponsibility: 'Anwendbarkeit von § 18 Abs. 2 MStV prüfen.',
    disputeResolution: 'Beschäftigtenzahl, Teilnahmebereitschaft und mögliche Verpflichtung bestätigen.',
    hosting: 'Hoster, Anschrift, Serverstandort, Unterauftragnehmer, AVV, Logdaten und Löschfristen bestätigen.',
    mail: 'Mailprovider, Serverstandort, AVV, Empfänger und Löschfristen bestätigen.',
    dataProtectionOfficer: 'Benennungspflicht oder freiwillige Benennung eines Datenschutzbeauftragten prüfen.',
  },
} as const;
