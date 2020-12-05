import SubscriptionService from "./services/subscription.service";
import TaskService from "./services/task.service";
import webPush from "./services/webPush.service";

const displayRemainingTime = (reminderDate: Date | undefined,
  deadline: Date | undefined): string => {
  if (reminderDate === undefined || deadline === undefined) {
    return 'un temps incalculable';
  }
  const msec = deadline.getTime() - reminderDate.getTime();
  const min = Math.floor(msec / 60000) % 60;
  const hrs = Math.floor(min / 60) % 24;
  const day = Math.floor(hrs / 24) % 365;
  const yrs = Math.floor(day / 365);

  if (yrs > 0) {
    return `${yrs} an${yrs > 1 ? 's' : ''} et ${day} jour${day > 1 ? 's' : ''}`;
  }
  if (day > 0) {
    return `${day} jour${day > 1 ? 's' : ''}, ${hrs} heure${hrs > 1 ? 's' : ''} et ${min} minute${min > 1 ? 's' : ''}`;
  }
  if (hrs > 0) {
    return `${hrs} heure${hrs > 1 ? 's' : ''} et ${min} minute${min > 1 ? 's' : ''}`;
  }
  if (min > 1) {
    return `${min} minutes`;
  }
  return 'moins de 1 minutes';
};

const ONE_MIN = 60 * 1000;

export default function sendReminderNotification(): void {
  console.log('job starting'); // eslint-disable-line
  TaskService.getAll().then((tasks) => {
    tasks.forEach((task) => {
      task.reminders.forEach((rem) => {
        const now = new Date();
        if (Math.abs(now.getTime() - rem.date.getTime()) <= ONE_MIN) {
          console.log('it\'s time'); // eslint-disable-line
          SubscriptionService.getSubscriptionByUserId(task.user_id).then((sub) => {
            console.log(sub); // eslint-disable-line
            if (sub) {
              webPush.sendNotification(sub.sub, JSON.stringify({
                notification: {
                  title: 'Hey !',
                  body: `'${task.title}' se termine dans ${displayRemainingTime(rem.date, task.deadline)}.`,
                  vibrate: [100, 100, 100, 100, 100],
                  actions: [
                    {
                      action: 'explore',
                      title: 'Aller sur le site',
                    },
                    {
                      action: 'close',
                      title: 'Fermer la notification',
                    },
                  ],
                },
              }));
            }
          });
        }
      });
    });
    console.log('job end'); // eslint-disable-line
  });
}
