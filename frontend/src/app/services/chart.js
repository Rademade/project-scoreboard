import moment from 'moment'
import * as _ from 'lodash'

const options = {
  animation : false,
  scaleShowLabels : false,
  legend: {
    display: false
  },
  tooltips: {
    enabled: false
  },
  scales: {
    yAxes: [{
      scaleLabel: {
        display: false,
        labelString: 'Story Points'
      },
      ticks: {
        beginAtZero: true
      }
    }]
  },
  legend: {
    display: false
  }
}

const getDatasetsWrapper = (data1, data2) => {
  return [{
    type: 'line',
    label: 'Planned',
    borderColor: '#1c91c0',
    pointBackgroundColor: '#1c91c0',
    pointRadius: 0,
    borderWidth: 1,
    fill: false,
    lineTension: 0,
    data: data1
  }, {
    type: 'line',
    label: 'Realized',
    borderColor: '#e2431e',
    pointBackgroundColor: '#e2431e',
    pointRadius: 0,
    borderWidth: 1,
    fill: false,
    lineTension: 0,
    data: data2
  }]
}

const getWeekDates = (sprint) => {
  let startOfSprintWeek = moment(sprint.started_at);
  let endOfSprintWeek = moment(sprint.ended_at).add(1, 'days');
  let duration = moment.duration(endOfSprintWeek.diff(startOfSprintWeek));
  let days = Math.round(duration.asDays());
  return _.range(days).map((day) => moment(sprint.started_at).add(day, 'days').toDate());
}

const getSpendWeekDays = (sprint) => {
  let startOfSprintWeek = moment(sprint.started_at);
  let today = moment(new Date());
  let duration = moment.duration(today.diff(startOfSprintWeek));
  let days = Math.floor(duration.asDays());
  return _.range(days).map((day) => moment(sprint.started_at).add(day, 'days').toDate());
}

const getPlannedSprintData = (sprint) => {
  let dates = getWeekDates(sprint);
  let C = sprint.planned_velocity;
  let k = C / (dates.length - 1);
  return _.range(dates.length).map((x) => C - k * x);
}

const getRealizedSprintData = (sprint) => {
  let data = [];
  let issues = [];

  _.each(getSpendWeekDays(sprint), (date, index) => {
    issues = sprint.issues
      .filter((issue) => issue.resolved)
      .filter((issue) => {
        let weekDay = (new Date(date)).setHours(0, 0, 0, 0);
        let issueResolutionDay = (new Date(issue.resolved)).setHours(0, 0, 0, 0);
        return weekDay == issueResolutionDay;
      });

    if (index > 0) {
      data.push(data[index - 1] - _.sumBy(issues, 'score'));
    } else {
      data.push(sprint.planned_velocity - _.sumBy(issues, 'score'));
    }
  });

  return data;
}

const getLabels = (sprint) => {
  return getWeekDates(sprint).map((date) => moment(date).format('MMM D'))
}

const getDatasets = (sprint) => {
  let plannedSprintData = getPlannedSprintData(sprint);
  let realizedSprintData = getRealizedSprintData(sprint);
  let datasets = getDatasetsWrapper(
    plannedSprintData,
    realizedSprintData
  );

  let totalRealizedStoryPoints = _.last(realizedSprintData);
  let dates = getWeekDates(sprint);

  _.each(dates, date => {
    if (new Date(date) > new Date()) {
      let data = _.map(dates, _date =>
        (new Date(date) > new Date(_date)) ? null : totalRealizedStoryPoints
      )

      datasets.push({
        fill: false,
        borderColor: 'rgba(255, 255, 255, .0)',
        pointBackgroundColor: '#e2431e',
        pointRadius: 1,
        data: data
      })
    }
  })

  return datasets;
}

export default {
  getData(sprint) {
    return {
      labels: getLabels(sprint),
      datasets: getDatasets(sprint)
    }
  },
  getOptions() {
    return options;
  }
}
