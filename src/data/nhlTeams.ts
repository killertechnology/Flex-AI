export type TeamTheme = {
  id: string;
  name: string;
  abbreviation: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  backgroundAlt: string;
  surface: string;
  surfaceHover: string;
  text: string;
  textMuted: string;
  border: string;
  buttonBackground: string;
  buttonText: string;
};

export const nhlTeams: TeamTheme[] = [
  { id: 'ana', name: 'Anaheim Ducks', abbreviation: 'ANA', primary: '#f47a38', secondary: '#111111', accent: '#b9975b', background: '#120f0d', backgroundAlt: '#1d1713', surface: '#221b17', surfaceHover: '#2f251f', text: '#fff8f1', textMuted: '#d8c6b7', border: '#493528', buttonBackground: '#f47a38', buttonText: '#111111' },
  { id: 'bos', name: 'Boston Bruins', abbreviation: 'BOS', primary: '#111111', secondary: '#ffb81c', accent: '#ffffff', background: '#10100f', backgroundAlt: '#1a1711', surface: '#211d15', surfaceHover: '#30291b', text: '#fff9ec', textMuted: '#d7c8a5', border: '#4a3b1e', buttonBackground: '#ffb81c', buttonText: '#111111' },
  { id: 'buf', name: 'Buffalo Sabres', abbreviation: 'BUF', primary: '#003087', secondary: '#ffb81c', accent: '#ffffff', background: '#07152c', backgroundAlt: '#0d2140', surface: '#102a52', surfaceHover: '#173665', text: '#f6fbff', textMuted: '#bdd2ef', border: '#264e82', buttonBackground: '#ffb81c', buttonText: '#07152c' },
  { id: 'cgy', name: 'Calgary Flames', abbreviation: 'CGY', primary: '#c8102e', secondary: '#f1be48', accent: '#111111', background: '#16070a', backgroundAlt: '#250c12', surface: '#311018', surfaceHover: '#431522', text: '#fff5f5', textMuted: '#ecc1c8', border: '#6b2634', buttonBackground: '#f1be48', buttonText: '#16070a' },
  { id: 'car', name: 'Carolina Hurricanes', abbreviation: 'CAR', primary: '#cc0000', secondary: '#111111', accent: '#a2aaad', background: '#111111', backgroundAlt: '#1c1515', surface: '#241818', surfaceHover: '#321f1f', text: '#fff5f5', textMuted: '#d2c4c4', border: '#4b2b2b', buttonBackground: '#cc0000', buttonText: '#ffffff' },
  { id: 'chi', name: 'Chicago Blackhawks', abbreviation: 'CHI', primary: '#cf0a2c', secondary: '#111111', accent: '#ff671b', background: '#15090d', backgroundAlt: '#221016', surface: '#2a161c', surfaceHover: '#391d25', text: '#fff7f7', textMuted: '#e3c4ca', border: '#5c2d39', buttonBackground: '#cf0a2c', buttonText: '#ffffff' },
  { id: 'col', name: 'Colorado Avalanche', abbreviation: 'COL', primary: '#6f263d', secondary: '#236192', accent: '#a2aaad', background: '#110d16', backgroundAlt: '#1c1422', surface: '#261a2d', surfaceHover: '#33223d', text: '#f9f6fb', textMuted: '#cdbdd5', border: '#503657', buttonBackground: '#8a304d', buttonText: '#ffffff' },
  { id: 'cbj', name: 'Columbus Blue Jackets', abbreviation: 'CBJ', primary: '#002654', secondary: '#ce1126', accent: '#a4a9ad', background: '#071122', backgroundAlt: '#0d1b33', surface: '#102744', surfaceHover: '#173556', text: '#f5f9ff', textMuted: '#bfd0e6', border: '#2b4568', buttonBackground: '#ce1126', buttonText: '#ffffff' },
  { id: 'dal', name: 'Dallas Stars', abbreviation: 'DAL', primary: '#006847', secondary: '#111111', accent: '#8f8f8c', background: '#071613', backgroundAlt: '#0e241c', surface: '#123124', surfaceHover: '#1a432f', text: '#f3fff8', textMuted: '#b9d5c6', border: '#2e5a44', buttonBackground: '#00a35c', buttonText: '#071613' },
  { id: 'det', name: 'Detroit Red Wings', abbreviation: 'DET', primary: '#ce1126', secondary: '#ffffff', accent: '#f2b8c0', background: '#17070a', backgroundAlt: '#250c12', surface: '#311018', surfaceHover: '#431622', text: '#fff8f9', textMuted: '#efc2c8', border: '#612634', buttonBackground: '#ce1126', buttonText: '#ffffff' },
  { id: 'edm', name: 'Edmonton Oilers', abbreviation: 'EDM', primary: '#041e42', secondary: '#ff4c00', accent: '#ffffff', background: '#061326', backgroundAlt: '#0b1d36', surface: '#112946', surfaceHover: '#18385d', text: '#f5f9ff', textMuted: '#bdd1e8', border: '#2d4b72', buttonBackground: '#ff6a21', buttonText: '#061326' },
  { id: 'fla', name: 'Florida Panthers', abbreviation: 'FLA', primary: '#c8102e', secondary: '#041e42', accent: '#b9975b', background: '#090f1d', backgroundAlt: '#121a2f', surface: '#18223b', surfaceHover: '#212e4f', text: '#f9fbff', textMuted: '#c1ccdf', border: '#354565', buttonBackground: '#c8102e', buttonText: '#ffffff' },
  { id: 'lak', name: 'Los Angeles Kings', abbreviation: 'LAK', primary: '#111111', secondary: '#a2aaad', accent: '#ffffff', background: '#0f1113', backgroundAlt: '#171a1d', surface: '#202428', surfaceHover: '#2b3035', text: '#f7f8f9', textMuted: '#c8ced2', border: '#3d444a', buttonBackground: '#d7dcdf', buttonText: '#111111' },
  { id: 'min', name: 'Minnesota Wild', abbreviation: 'MIN', primary: '#154734', secondary: '#a6192e', accent: '#ddcba4', background: '#071511', backgroundAlt: '#0f211a', surface: '#152f24', surfaceHover: '#1e4030', text: '#f8fff8', textMuted: '#c4dacd', border: '#365b47', buttonBackground: '#ddcba4', buttonText: '#071511' },
  { id: 'mtl', name: 'Montreal Canadiens', abbreviation: 'MTL', primary: '#af1e2d', secondary: '#192168', accent: '#ffffff', background: '#0b1028', backgroundAlt: '#141b3f', surface: '#1c2652', surfaceHover: '#28336a', text: '#f8faff', textMuted: '#c9d0ed', border: '#3b4780', buttonBackground: '#d3223a', buttonText: '#ffffff' },
  { id: 'nsh', name: 'Nashville Predators', abbreviation: 'NSH', primary: '#ffb81c', secondary: '#041e42', accent: '#ffffff', background: '#081326', backgroundAlt: '#101f38', surface: '#172d4c', surfaceHover: '#203d62', text: '#f8fbff', textMuted: '#c4d1e5', border: '#36557c', buttonBackground: '#ffb81c', buttonText: '#081326' },
  { id: 'njd', name: 'New Jersey Devils', abbreviation: 'NJD', primary: '#ce1126', secondary: '#111111', accent: '#ffffff', background: '#13080a', backgroundAlt: '#211012', surface: '#2b1518', surfaceHover: '#3a1b20', text: '#fff7f8', textMuted: '#e2c5c8', border: '#552b31', buttonBackground: '#ce1126', buttonText: '#ffffff' },
  { id: 'nyi', name: 'New York Islanders', abbreviation: 'NYI', primary: '#00539b', secondary: '#f47d30', accent: '#ffffff', background: '#07182a', backgroundAlt: '#102743', surface: '#163456', surfaceHover: '#1f4770', text: '#f4fbff', textMuted: '#bed6ed', border: '#315a85', buttonBackground: '#f47d30', buttonText: '#07182a' },
  { id: 'nyr', name: 'New York Rangers', abbreviation: 'NYR', primary: '#0038a8', secondary: '#ce1126', accent: '#ffffff', background: '#07142e', backgroundAlt: '#0f2147', surface: '#172e5d', surfaceHover: '#1f3c76', text: '#f6faff', textMuted: '#c0d1ef', border: '#334f8c', buttonBackground: '#ce1126', buttonText: '#ffffff' },
  { id: 'ott', name: 'Ottawa Senators', abbreviation: 'OTT', primary: '#c52032', secondary: '#111111', accent: '#c69214', background: '#13090b', backgroundAlt: '#211112', surface: '#2a1718', surfaceHover: '#3a1e21', text: '#fff7f5', textMuted: '#dfc6c1', border: '#573032', buttonBackground: '#c69214', buttonText: '#13090b' },
  { id: 'phi', name: 'Philadelphia Flyers', abbreviation: 'PHI', primary: '#f74902', secondary: '#111111', accent: '#ffffff', background: '#140d08', backgroundAlt: '#23150e', surface: '#2d1d14', surfaceHover: '#3e281b', text: '#fff8f2', textMuted: '#e4cbb9', border: '#5d3c29', buttonBackground: '#f74902', buttonText: '#111111' },
  { id: 'pit', name: 'Pittsburgh Penguins', abbreviation: 'PIT', primary: '#111111', secondary: '#fcb514', accent: '#ffffff', background: '#10100f', backgroundAlt: '#1a1710', surface: '#231f15', surfaceHover: '#302a1a', text: '#fff9ed', textMuted: '#d7c8a6', border: '#493c20', buttonBackground: '#fcb514', buttonText: '#111111' },
  { id: 'sjs', name: 'San Jose Sharks', abbreviation: 'SJS', primary: '#006d75', secondary: '#111111', accent: '#ea7200', background: '#061617', backgroundAlt: '#0c2426', surface: '#113135', surfaceHover: '#184449', text: '#f3feff', textMuted: '#b7d9dd', border: '#2d5b61', buttonBackground: '#00a2ad', buttonText: '#061617' },
  { id: 'sea', name: 'Seattle Kraken', abbreviation: 'SEA', primary: '#001628', secondary: '#99d9d9', accent: '#e9072b', background: '#06131f', backgroundAlt: '#0a1d2e', surface: '#10283d', surfaceHover: '#173650', text: '#f2fbff', textMuted: '#b9d7e3', border: '#294b63', buttonBackground: '#99d9d9', buttonText: '#06131f' },
  { id: 'stl', name: 'St. Louis Blues', abbreviation: 'STL', primary: '#002f87', secondary: '#fcb514', accent: '#ffffff', background: '#07152d', backgroundAlt: '#0e2244', surface: '#152e59', surfaceHover: '#1d3c70', text: '#f5f9ff', textMuted: '#c1d2ef', border: '#33518a', buttonBackground: '#fcb514', buttonText: '#07152d' },
  { id: 'tbl', name: 'Tampa Bay Lightning', abbreviation: 'TBL', primary: '#002868', secondary: '#ffffff', accent: '#7ba7d9', background: '#071326', backgroundAlt: '#0e203b', surface: '#152d4f', surfaceHover: '#1e3d68', text: '#f5fbff', textMuted: '#c2d5ec', border: '#34547b', buttonBackground: '#7ba7d9', buttonText: '#071326' },
  { id: 'tor', name: 'Toronto Maple Leafs', abbreviation: 'TOR', primary: '#00205b', secondary: '#ffffff', accent: '#82a9d6', background: '#071225', backgroundAlt: '#0d1d39', surface: '#142b4c', surfaceHover: '#1d3a62', text: '#f5faff', textMuted: '#c1d3ea', border: '#335174', buttonBackground: '#82a9d6', buttonText: '#071225' },
  { id: 'uta', name: 'Utah Mammoth', abbreviation: 'UTA', primary: '#69b3e7', secondary: '#111111', accent: '#c8ff00', background: '#07151f', backgroundAlt: '#102434', surface: '#173348', surfaceHover: '#20445f', text: '#f3fbff', textMuted: '#bed8e8', border: '#335d7b', buttonBackground: '#69b3e7', buttonText: '#07151f' },
  { id: 'van', name: 'Vancouver Canucks', abbreviation: 'VAN', primary: '#00205b', secondary: '#00843d', accent: '#ffffff', background: '#071526', backgroundAlt: '#0e2238', surface: '#15304d', surfaceHover: '#1e4264', text: '#f4fbff', textMuted: '#bfd4e6', border: '#335675', buttonBackground: '#00843d', buttonText: '#ffffff' },
  { id: 'vgk', name: 'Vegas Golden Knights', abbreviation: 'VGK', primary: '#333f48', secondary: '#b4975a', accent: '#ffffff', background: '#0f1114', backgroundAlt: '#181c20', surface: '#22282d', surfaceHover: '#2f363d', text: '#f8f7f2', textMuted: '#d0cab9', border: '#4b4b42', buttonBackground: '#b4975a', buttonText: '#0f1114' },
  { id: 'wsh', name: 'Washington Capitals', abbreviation: 'WSH', primary: '#c8102e', secondary: '#041e42', accent: '#ffffff', background: '#081020', backgroundAlt: '#111b31', surface: '#172540', surfaceHover: '#203354', text: '#f8fbff', textMuted: '#c3ccdf', border: '#354867', buttonBackground: '#c8102e', buttonText: '#ffffff' },
  { id: 'wpg', name: 'Winnipeg Jets', abbreviation: 'WPG', primary: '#041e42', secondary: '#004c97', accent: '#ac162c', background: '#071326', backgroundAlt: '#0e2039', surface: '#142d4d', surfaceHover: '#1d3d64', text: '#f5faff', textMuted: '#bfd2ea', border: '#335577', buttonBackground: '#ac162c', buttonText: '#ffffff' }
];

export function getTeamTheme(teamId: string | null | undefined) {
  if (!teamId) return undefined;
  return nhlTeams.find((team) => team.id === teamId.toLowerCase());
}
