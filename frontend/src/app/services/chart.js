import moment from 'moment'
import * as _ from 'lodash'

export default class ChartService {
  getChartData(sprint) {
    return {
      labels: this.getLabels(),
      datasets: this.getDatasets(sprint)
    }
  }

  getDatasets(sprint) {
    let datasets = [{
      type: 'line',
      label: 'Planned',
      borderColor: '#1c91c0',
      pointBackgroundColor: '#1c91c0',
      pointRadius: 0,
      borderWidth: 1,
      fill: false,
      lineTension: 0,
      data: this.getPlannedSprintData(sprint)
    }, {
      type: 'line',
      label: 'Realized',
      borderColor: '#e2431e',
      pointBackgroundColor: '#e2431e',
      pointRadius: 0,
      borderWidth: 1,
      fill: false,
      lineTension: 0,
      data: this.getRealizedSprintData(sprint)
    }]

    let totalRealizedStoryPoints = _.last(this.getRealizedSprintData(sprint))
    _.each(this.getWeekDates(), date => {
      if (new Date(date) > new Date()) {
        let data = _.map(this.getWeekDates(), _date =>
          (new Date(date) > new Date(_date)) ? null : totalRealizedStoryPoints
        )

        datasets.push({
          fill: false,
          borderColor: 'rgba(255, 255, 255, .0)',
          pointBackgroundColor: '#e2431e',
          pointRadius: 2,
          data: data
        })
      }
    })

    return datasets
  }

  getWeekDates() {
    let startOfWeek = moment().startOf('week')
    return _.map(_.range(5), i => startOfWeek.add(1, 'days').toDate())
  }

  getSpendWeekDays() {
    let today = moment(new Date())
    let startOfWeek = moment().startOf('week')
    let duration = moment.duration(today.diff(startOfWeek))
    let days = Math.round(duration.asDays())
    if (days > 5) days = 5;
    return _.map(_.range(days), _ => startOfWeek.add(1, 'days').toDate())
  }

  getRestWeekDays() {
    let today = moment(new Date())
    let endOfWeek = moment().endOf('week').subtract(1, 'days')
    let duration = moment.duration(endOfWeek.diff(today))
    let days = Math.round(duration.asDays())
    return _.map(_.range(days), _ => today.add(1, 'days').toDate())
  }

  getLabels() {
    return _.map(this.getWeekDates(), date => moment(date).format('MMM D'))
  }

  getPlannedSprintData(sprint) {
    let dates = this.getWeekDates()
    let C = sprint.story_points.planned
    let k = C / (dates.length - 1)
    return _.map(_.range(dates.length), x => C - k * x)
  }

  getRealizedSprintData(sprint) {
    let data = []
    _.each(this.getSpendWeekDays(), (date, index) => {
      let issues = _.filter(sprint.issues, issue => {
        return issue.status == 'Done'
          ? (new Date(date)).setHours(0, 0, 0, 0) == (new Date(issue.resolution_date)).setHours(0, 0, 0, 0)
          : false
      })

      if (index > 0) {
        data.push(data[index - 1] - _.sumBy(issues, 'story_points'))
      } else {
        data.push(sprint.story_points.planned - _.sumBy(issues, 'story_points'))
      }
    })

    return data
  }
}
