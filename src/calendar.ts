/** Festiva regional festival registry. No dates are guessed for movable festivals. */
export type FestivaLocale = "no" | "np";
export type FestivalId = "christmas" | "christmas-eve" | "christmas-day" | "boxing-day" | "new-year" | "new-years-day" | "constitution-day" | "labour-day" | "sami-national-day" | "sankthans" | "olsok" | "lucia" | "halloween" | "valentines-day" | "womens-day" | "un-day" | "advent" | "easter" | "palm-sunday" | "maundy-thursday" | "good-friday" | "easter-sunday" | "easter-monday" | "ascension" | "pentecost" | "whit-sunday" | "whit-monday" | "fastelavn" | "mothers-day" | "fathers-day" | "dashain" | "ghatasthapana" | "phulpati" | "maha-ashtami" | "maha-navami" | "vijaya-dashami" | "kojagrat-purnima" | "tihar" | "dhanteras" | "kag-tihar" | "kukur-tihar" | "laxmi-puja" | "gai-tihar" | "govardhan-puja" | "mha-puja" | "bhai-tika" | "nepal-sambat-new-year" | "chhath" | "holi" | "holi-terai" | "maha-shivaratri" | "buddha-jayanti" | "ubhauli" | "udhauli" | "teej" | "rishi-panchami" | "janai-purnima" | "raksha-bandhan" | "gai-jatra" | "indra-jatra" | "krishna-janmashtami" | "nag-panchami" | "kushe-aunsi" | "mata-tirtha-aunsi" | "ghode-jatra" | "bisket-jatra" | "rato-machhindranath-jatra" | "seto-machhindranath-jatra" | "bhoto-jatra" | "chaitra-dashain" | "ram-navami" | "gaura-parva" | "jitiya" | "bala-chaturdashi" | "swasthani-purnima" | "shree-panchami" | "sonam-lhosar" | "gyalpo-lhosar" | "tamu-lhosar" | "maghe-sankranti" | "sawane-sankranti" | "nepali-new-year" | "republic-day" | "democracy-day" | "martyrs-day" | "eid-al-fitr" | "eid-al-adha" | "guru-nanak-jayanti" | "yomari-punhi" | "sithi-nakha" | "pahan-charhe";
export type FestivaEffect = "snow" | "lights" | "confetti" | "sparkles";
export type FestivalPreset = {
 id: FestivalId;
 locale: FestivaLocale;
 name: string;
 effect: FestivaEffect;
 /** Fixed recurring month-day ranges; variable festivals require external dates. */
 startsOn?: string;
 endsOn?: string;
 needsDates?: boolean;
};
export const presets: Record<FestivaLocale, readonly FestivalPreset[]> = {
 no: [
  { id: "christmas", locale: "no", name: "Jul", effect: "snow", startsOn: "12-01", endsOn: "12-26" },
  { id: "christmas-eve", locale: "no", name: "Julaften", effect: "lights", startsOn: "12-24", endsOn: "12-24" },
  { id: "christmas-day", locale: "no", name: "Første juledag", effect: "snow", startsOn: "12-25", endsOn: "12-25" },
  { id: "boxing-day", locale: "no", name: "Andre juledag", effect: "snow", startsOn: "12-26", endsOn: "12-26" },
  { id: "new-year", locale: "no", name: "Nyttår", effect: "confetti", startsOn: "12-31", endsOn: "01-01" },
  { id: "new-years-day", locale: "no", name: "Første nyttårsdag", effect: "confetti", startsOn: "01-01", endsOn: "01-01" },
  { id: "constitution-day", locale: "no", name: "17. mai", effect: "confetti", startsOn: "05-17", endsOn: "05-17" },
  { id: "labour-day", locale: "no", name: "Arbeidernes dag", effect: "confetti", startsOn: "05-01", endsOn: "05-01" },
  { id: "sami-national-day", locale: "no", name: "Samenes nasjonaldag", effect: "confetti", startsOn: "02-06", endsOn: "02-06" },
  { id: "sankthans", locale: "no", name: "Sankthansaften", effect: "lights", startsOn: "06-23", endsOn: "06-23" },
  { id: "olsok", locale: "no", name: "Olsok", effect: "lights", startsOn: "07-29", endsOn: "07-29" },
  { id: "lucia", locale: "no", name: "Luciadagen", effect: "lights", startsOn: "12-13", endsOn: "12-13" },
  { id: "halloween", locale: "no", name: "Halloween", effect: "sparkles", startsOn: "10-20", endsOn: "10-31" },
  { id: "valentines-day", locale: "no", name: "Valentinsdagen", effect: "sparkles", startsOn: "02-14", endsOn: "02-14" },
  { id: "womens-day", locale: "no", name: "Kvinnedagen", effect: "confetti", startsOn: "03-08", endsOn: "03-08" },
  { id: "un-day", locale: "no", name: "FN-dagen", effect: "confetti", startsOn: "10-24", endsOn: "10-24" },
  { id: "advent", locale: "no", name: "Advent", effect: "lights", needsDates: true },
  { id: "easter", locale: "no", name: "Påske", effect: "sparkles", needsDates: true },
  { id: "palm-sunday", locale: "no", name: "Palmesøndag", effect: "sparkles", needsDates: true },
  { id: "maundy-thursday", locale: "no", name: "Skjærtorsdag", effect: "sparkles", needsDates: true },
  { id: "good-friday", locale: "no", name: "Langfredag", effect: "sparkles", needsDates: true },
  { id: "easter-sunday", locale: "no", name: "Første påskedag", effect: "sparkles", needsDates: true },
  { id: "easter-monday", locale: "no", name: "Andre påskedag", effect: "sparkles", needsDates: true },
  { id: "ascension", locale: "no", name: "Kristi himmelfartsdag", effect: "sparkles", needsDates: true },
  { id: "pentecost", locale: "no", name: "Pinse", effect: "lights", needsDates: true },
  { id: "whit-sunday", locale: "no", name: "Første pinsedag", effect: "lights", needsDates: true },
  { id: "whit-monday", locale: "no", name: "Andre pinsedag", effect: "lights", needsDates: true },
  { id: "fastelavn", locale: "no", name: "Fastelavn", effect: "confetti", needsDates: true },
  { id: "mothers-day", locale: "no", name: "Morsdag", effect: "sparkles", needsDates: true },
  { id: "fathers-day", locale: "no", name: "Farsdag", effect: "sparkles", needsDates: true },
 ],
 np: [
  { id: "dashain", locale: "np", name: "Dashain", effect: "sparkles", needsDates: true },
  { id: "ghatasthapana", locale: "np", name: "Ghatasthapana", effect: "sparkles", needsDates: true },
  { id: "phulpati", locale: "np", name: "Phulpati", effect: "sparkles", needsDates: true },
  { id: "maha-ashtami", locale: "np", name: "Maha Ashtami", effect: "sparkles", needsDates: true },
  { id: "maha-navami", locale: "np", name: "Maha Navami", effect: "sparkles", needsDates: true },
  { id: "vijaya-dashami", locale: "np", name: "Vijaya Dashami", effect: "sparkles", needsDates: true },
  { id: "kojagrat-purnima", locale: "np", name: "Kojagrat Purnima", effect: "lights", needsDates: true },
  { id: "tihar", locale: "np", name: "Tihar / Deepawali", effect: "lights", needsDates: true },
  { id: "dhanteras", locale: "np", name: "Dhanteras", effect: "lights", needsDates: true },
  { id: "kag-tihar", locale: "np", name: "Kag Tihar", effect: "sparkles", needsDates: true },
  { id: "kukur-tihar", locale: "np", name: "Kukur Tihar", effect: "sparkles", needsDates: true },
  { id: "laxmi-puja", locale: "np", name: "Laxmi Puja", effect: "lights", needsDates: true },
  { id: "gai-tihar", locale: "np", name: "Gai Tihar", effect: "lights", needsDates: true },
  { id: "govardhan-puja", locale: "np", name: "Govardhan Puja", effect: "lights", needsDates: true },
  { id: "mha-puja", locale: "np", name: "Mha Puja", effect: "lights", needsDates: true },
  { id: "bhai-tika", locale: "np", name: "Bhai Tika", effect: "lights", needsDates: true },
  { id: "nepal-sambat-new-year", locale: "np", name: "Nepal Sambat New Year", effect: "confetti", needsDates: true },
  { id: "chhath", locale: "np", name: "Chhath", effect: "lights", needsDates: true },
  { id: "holi", locale: "np", name: "Holi / Fagu Purnima", effect: "confetti", needsDates: true },
  { id: "holi-terai", locale: "np", name: "Holi (Terai)", effect: "confetti", needsDates: true },
  { id: "maha-shivaratri", locale: "np", name: "Maha Shivaratri", effect: "sparkles", needsDates: true },
  { id: "buddha-jayanti", locale: "np", name: "Buddha Jayanti", effect: "lights", needsDates: true },
  { id: "ubhauli", locale: "np", name: "Ubhauli", effect: "confetti", needsDates: true },
  { id: "udhauli", locale: "np", name: "Udhauli", effect: "confetti", needsDates: true },
  { id: "teej", locale: "np", name: "Haritalika Teej", effect: "sparkles", needsDates: true },
  { id: "rishi-panchami", locale: "np", name: "Rishi Panchami", effect: "sparkles", needsDates: true },
  { id: "janai-purnima", locale: "np", name: "Janai Purnima", effect: "sparkles", needsDates: true },
  { id: "raksha-bandhan", locale: "np", name: "Raksha Bandhan", effect: "sparkles", needsDates: true },
  { id: "gai-jatra", locale: "np", name: "Gai Jatra", effect: "confetti", needsDates: true },
  { id: "indra-jatra", locale: "np", name: "Indra Jatra", effect: "confetti", needsDates: true },
  { id: "krishna-janmashtami", locale: "np", name: "Krishna Janmashtami", effect: "sparkles", needsDates: true },
  { id: "nag-panchami", locale: "np", name: "Nag Panchami", effect: "sparkles", needsDates: true },
  { id: "kushe-aunsi", locale: "np", name: "Kushe Aunsi / Father's Day", effect: "sparkles", needsDates: true },
  { id: "mata-tirtha-aunsi", locale: "np", name: "Mata Tirtha Aunsi / Mother's Day", effect: "sparkles", needsDates: true },
  { id: "ghode-jatra", locale: "np", name: "Ghode Jatra", effect: "confetti", needsDates: true },
  { id: "bisket-jatra", locale: "np", name: "Bisket Jatra", effect: "confetti", needsDates: true },
  { id: "rato-machhindranath-jatra", locale: "np", name: "Rato Machhindranath Jatra", effect: "confetti", needsDates: true },
  { id: "seto-machhindranath-jatra", locale: "np", name: "Seto Machhindranath Jatra", effect: "confetti", needsDates: true },
  { id: "bhoto-jatra", locale: "np", name: "Bhoto Jatra", effect: "confetti", needsDates: true },
  { id: "chaitra-dashain", locale: "np", name: "Chaitra Dashain", effect: "sparkles", needsDates: true },
  { id: "ram-navami", locale: "np", name: "Ram Navami", effect: "sparkles", needsDates: true },
  { id: "gaura-parva", locale: "np", name: "Gaura Parva", effect: "sparkles", needsDates: true },
  { id: "jitiya", locale: "np", name: "Jitiya", effect: "sparkles", needsDates: true },
  { id: "bala-chaturdashi", locale: "np", name: "Bala Chaturdashi", effect: "sparkles", needsDates: true },
  { id: "swasthani-purnima", locale: "np", name: "Swasthani Purnima", effect: "lights", needsDates: true },
  { id: "shree-panchami", locale: "np", name: "Saraswati Puja / Shree Panchami", effect: "sparkles", needsDates: true },
  { id: "sonam-lhosar", locale: "np", name: "Sonam Lhosar", effect: "confetti", needsDates: true },
  { id: "gyalpo-lhosar", locale: "np", name: "Gyalpo Lhosar", effect: "confetti", needsDates: true },
  { id: "tamu-lhosar", locale: "np", name: "Tamu Lhosar", effect: "confetti", needsDates: true },
  { id: "maghe-sankranti", locale: "np", name: "Maghe Sankranti", effect: "lights", needsDates: true },
  { id: "sawane-sankranti", locale: "np", name: "Sawane Sankranti", effect: "lights", needsDates: true },
  { id: "nepali-new-year", locale: "np", name: "Nepali New Year (Bikram Sambat)", effect: "confetti", needsDates: true },
  { id: "new-year", locale: "np", name: "Gregorian New Year", effect: "confetti", startsOn: "12-31", endsOn: "01-01" },
  { id: "constitution-day", locale: "np", name: "Constitution Day", effect: "confetti", startsOn: "09-20", endsOn: "09-20" },
  { id: "republic-day", locale: "np", name: "Republic Day", effect: "confetti", startsOn: "05-28", endsOn: "05-28" },
  { id: "democracy-day", locale: "np", name: "Democracy Day", effect: "confetti", startsOn: "02-19", endsOn: "02-19" },
  { id: "martyrs-day", locale: "np", name: "Martyrs' Day", effect: "lights", startsOn: "01-30", endsOn: "01-30" },
  { id: "labour-day", locale: "np", name: "Labour Day", effect: "confetti", startsOn: "05-01", endsOn: "05-01" },
  { id: "womens-day", locale: "np", name: "International Women's Day", effect: "confetti", startsOn: "03-08", endsOn: "03-08" },
  { id: "christmas", locale: "np", name: "Christmas", effect: "snow", startsOn: "12-25", endsOn: "12-25" },
  { id: "eid-al-fitr", locale: "np", name: "Eid al-Fitr", effect: "lights", needsDates: true },
  { id: "eid-al-adha", locale: "np", name: "Eid al-Adha", effect: "lights", needsDates: true },
  { id: "guru-nanak-jayanti", locale: "np", name: "Guru Nanak Jayanti", effect: "lights", needsDates: true },
  { id: "yomari-punhi", locale: "np", name: "Yomari Punhi", effect: "lights", needsDates: true },
  { id: "sithi-nakha", locale: "np", name: "Sithi Nakha", effect: "sparkles", needsDates: true },
  { id: "pahan-charhe", locale: "np", name: "Pahan Charhe", effect: "sparkles", needsDates: true },
 ]
};
export function getFestivals(locale: FestivaLocale): readonly FestivalPreset[] {
 return presets[locale];
}
export function isDateInRange(date: string, start: string, end: string): boolean {
 return start > end ? date >= start || date <= end : date >= start && date <= end;
}
export function isPresetActive(preset: FestivalPreset, now: Date, dates?: { start: string; end: string }): boolean {
 const monthDay = `${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`;
 if (dates) {
   const current = `${now.getFullYear()}-${monthDay}`;
   return current >= dates.start && current <= dates.end;
 }
 if (preset.needsDates || !preset.startsOn || !preset.endsOn) return false;
 return isDateInRange(monthDay, preset.startsOn, preset.endsOn);
}
