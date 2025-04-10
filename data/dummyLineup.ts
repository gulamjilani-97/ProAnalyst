import { MatchDetails } from '@/components/types/lineup';

export const matchData: MatchDetails = {
  homeTeam: {
    name: 'Manchester City',
    location: 'Manchester',
    logo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
    latestResults: ['w', 'w', 'w', 'w', 'w'],
    players: [
      { name: 'Ederson', position: 'GK', number: 31 },
      { name: 'Kyle Walker', position: 'RB', number: 2 },
      { name: 'Ruben Dias', position: 'CB', number: 3 },
      { name: 'John Stones', position: 'CB', number: 5 },
      { name: 'Josko Gvardiol', position: 'LB', number: 24 },
      { name: 'Rodri', position: 'CDM', number: 16 },
      { name: 'Kevin De Bruyne', position: 'CM', number: 17 },
      { name: 'Bernardo Silva', position: 'CM', number: 20 },
      { name: 'Phil Foden', position: 'RW', number: 47 },
      { name: 'Jeremy Doku', position: 'LW', number: 11 },
      { name: 'Erling Haaland', position: 'ST', number: 9 }
    ]
  },
  awayTeam: {
    name: 'Tottenham Hotspur',
    location: 'London',
    logo: 'https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg',
    latestResults: ['w', 'd', 'w', 'l', 'w'],
    players: [
      { name: 'Guglielmo Vicario', position: 'GK', number: 13 },
      { name: 'Pedro Porro', position: 'RB', number: 23 },
      { name: 'Cristian Romero', position: 'CB', number: 17 },
      { name: 'Micky van de Ven', position: 'CB', number: 37 },
      { name: 'Destiny Udogie', position: 'LB', number: 38 },
      { name: 'Yves Bissouma', position: 'CM', number: 8 },
      { name: 'Pape Matar Sarr', position: 'CM', number: 29 },
      { name: 'James Maddison', position: 'CAM', number: 10 },
      { name: 'Dejan Kulusevski', position: 'RW', number: 21 },
      { name: 'Son Heung-min', position: 'LW', number: 7 },
      { name: 'Richarlison', position: 'ST', number: 9 }
    ]
  },
  matchTime: '7:30 PM, Saturday, 29 Sep 2016',
  venue: {
    name: 'Etihad Stadium',
    image: '',
    description: '',
    location: '',
    capacity: 0
  },
  weather: {
    temperature: 7,
    condition: 'Partly cloudy night'
  }
};