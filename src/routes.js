import * as home from './controller/homeController';

export default app => {
  app.route('/')
    .get(home.index);

  app.route('/register')
    .post(home.create);

  app.route('/login')
    .post(home.login);

  app.route('/get-data')
    .post(home.getUserData);

  app.route('/create/quest')
    .post(home.createQuest);

  app.route('/update-leaderboard')
    .post(home.updateLeaderBoard)

  app.route('/get-leaderboard')
    .get(home.getLeaderboard)

  app.route('/get-quests')
    .get(home.getQuests)

  app.route('/update-point')
  .post(home.upadatePoint)
}