// API для подразделов расписания
export const SCHEDULE_API_URL = 'https://su-med-backend-35d3d951c74b.herokuapp.com/api/schedule/subsections/';

export async function getScheduleSubsections(language = 'ru') {
  const lang = language === 'kg' ? 'ky' : language;
  const url = `${SCHEDULE_API_URL}?lang=${lang}`;
  try {
    const response = await fetch(url);
    if (!response.ok) return [];
    const data = await response.json();
    if (Array.isArray(data)) return data;
    if (data.results) return data.results;
    return [];
  } catch {
    return [];
  }
}
