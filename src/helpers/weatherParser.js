import clearDay from '../assets/clearDay.svg';
import partlyCloudy from '../assets/partlyCloudy.svg';
import foggy from '../assets/foggy.svg';
import rainy from '../assets/rainIcon.svg';
import thunderstorm from '../assets/thunderstorm.svg';
import snowy from '../assets/snowy.svg';

export const weatherCode = {
  0: "Ciel clair",
  1: "Ciel clair",
  2: "Quelques nuages",
  3: "Nuageux",
  45: "Brouillard",
  48: "Brouillard givrant",
  51: "Légères bruines",
  53: "Bruines",
  55: "Fortes bruines",
  56: "Légères bruines glacées",
  57: "Fortes bruines glacées",
  61: "Faibles pluies",
  63: "Pluies",
  65: "Fortes pluies",
  66: "Faibles pluies glacées",
  67: "Fortes pluies glacées",
  71: "Faibles chutes de neige",
  73: "Chutes de neige",
  75: "Fortes chutes de neige",
  77: "Pluies de neige",
  80: "Légères averses de pluie",
  81: "Averses de pluie",
  82: "Violentes pluie",
  85: "Faibles averses de neige",
  86: "Fortes averses de neige",
  95: "Orageux",
  96: "Orageux avec légère grêle",
  99: "Orageux avec forte grêle",
}

export const getWeatherIconFromWeathercode = (code) => {
  switch (code) {
    case 1:
    case 2:
    case 3:
      return partlyCloudy;
    case 45:
    case 48:
      return foggy;
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return rainy;
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return snowy
    case 95:
    case 96:
    case 99:
      return thunderstorm
    default:
      return clearDay
  }
}

export const daysName = {
  0: "Dimanche",
  1: "Lundi",
  2: "Mardi",
  3: "Mercredi",
  4: "Jeudi",
  5: "Vendredi",
  6: "Samedi"
}

// ajouter les favoris + remove favoris + reselect favoris refresh la vue ----- ok
// gestion d'erreurs avec toasts
// ajouter les cards pour les daily ---------- ok
// useMemo / useCallback
// si geoloc refusé, affiche NaN au début, mettre un message
// rajouter la date du jour qqpart ----- no need
// si pas de favoris => message pas de fav + croix pour fermer en haut a droite