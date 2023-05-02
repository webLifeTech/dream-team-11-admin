const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let matchsSchema = new mongoose.Schema({
  match_id: { type: String, default: '' },
  match_category: { type: Schema.Types.ObjectId, ref: 'categories', default: null },
  match_tournament: { type: Schema.Types.ObjectId, ref: 'tournaments', default: null },
  tournament_name: { type: String, default: '' },
  category_name: { type: String, default: '' },
  match_preview: { type: String, default: '' },
  prediction_img: { type: Array, default: [] },
  dream_team_img: { type: String, default: '' },
  match_date: { type: Date, default: new Date ()},
  match_end_time: { type: Date, default: new Date ()},
  team1data: { type: Schema.Types.ObjectId, ref: 'teams', default: null },
  team2data: { type: Schema.Types.ObjectId, ref: 'teams', default: null },
  position: { type: Number, default: 1 },
  status: { type: Boolean, default: true },
  deleted: { type: Number, default: null },
  // match_active: "1",
  // team_1: "15",
  // team_2: "8",
}, { timestamps: true })
// category_name: { type: String, default: '' },
// category_logo: { type: String, default: '' },

// {
//   "match_id": "65",
//   "match_category": "1",
//   "match_tournament": "27",
//   "team_1": "15",
//   "team_2": "8",
//   "match_preview": "",
//   "prediction_img": "http://dreamteam.gamdiyo.com/uploads/prediction/d1(1).png,http://dreamteam.gamdiyo.com/uploads/prediction/d2(1).png,http://dreamteam.gamdiyo.com/uploads/prediction/d3(1).png",
//   "dream_team_img": "",
//   "match_date": "2021-11-28 13:30:37",
//   "match_end_time": "0000-00-00 00:00:00",
//   "match_active": "1",
//   "match_created": "2021-11-24 09:28:07",
//   "match_updated": "2021-11-27 10:32:56",
//   "tournament_name": "South Africa vs Netherlands ODI",
//   "category_name": "Cricket",
//   "team1data": {
//     "team_id": "15",
//     "team_category": "1",
//     "team_name": "South Africa",
//     "team_short_name": "SA",
//     "team_logo": "https://dreamteam11app.lifetechsapps.com/uploads/teamlogo/South_Africa.png",
//     "team_active": "1",
//     "team_created": "2021-10-08 19:24:44",
//     "team_updated": "2021-11-27 02:20:35"
//   },
//   "team2data": {
//     "team_id": "8",
//     "team_category": "1",
//     "team_name": "Netherlands",
//     "team_short_name": "NETH",
//     "team_logo": "https://dreamteam11app.lifetechsapps.com/uploads/teamlogo/Netherlands.png",
//     "team_active": "1",
//     "team_created": "2021-10-08 19:14:32",
//     "team_updated": "2021-11-27 02:19:21"
//   }
// }

module.exports = mongoose.model('matchs', matchsSchema);
