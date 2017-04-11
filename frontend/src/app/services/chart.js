import moment from 'moment'
import * as _ from 'lodash'

export default class ChartService {
  getChartData(sprint) {
    return {
      labels: this.getLabels(sprint),
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
    _.each(this.getWeekDates(sprint), date => {
      if (new Date(date) > new Date()) {
        let data = _.map(this.getWeekDates(sprint), _date =>
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

    return datasets
  }

  getWeekDates(sprint) {
    let startOfSprintWeek = moment(sprint.started_at).startOf('week')
    let endOfSprintWeek = moment(sprint.ended_at).endOf('week')
    let duration = moment.duration(endOfSprintWeek.diff(startOfSprintWeek))
    let days = Math.round(duration.asDays())
    return _.map(_.range(days), day => moment(sprint.started_at).startOf('week').add(day, 'days').toDate())
  }

  getSpendWeekDays(sprint) {
    let startOfSprintWeek = moment(sprint.started_at).startOf('week')
    let today = moment(new Date())
    let duration = moment.duration(today.diff(startOfSprintWeek))
    let days = Math.round(duration.asDays())
    return _.map(_.range(days), day => moment(sprint.started_at).startOf('week').add(day, 'days').toDate())
  }

  getRestWeekDays(sprint) {
    let today = moment(new Date())
    let endOfSprintWeek = moment(sprint.ended_at).endOf('week')
    let duration = moment.duration(endOfSprintWeek.diff(today))
    let days = Math.round(duration.asDays())
    return _.map(_.range(days), day => moment(new Date()).add(day, 'days').toDate())
  }

  getLabels(sprint) {
    return _.map(this.getWeekDates(sprint), date => moment(date).format('MMM D'))
  }

  getPlannedSprintData(sprint) {
    let dates = this.getWeekDates(sprint)
    let C = sprint.story_points.planned
    let k = C / (dates.length - 1)
    return _.map(_.range(dates.length), x => C - k * x)
  }

  getRealizedSprintData(sprint) {
    let data = []
    _.each(this.getSpendWeekDays(sprint), (date, index) => {
      let issues = _.filter(sprint.issues, issue =>
        issue.status == 'Done' && (new Date(date)).setHours(0, 0, 0, 0) == (new Date(issue.resolution_date)).setHours(0, 0, 0, 0)
      )

      let points = _.sumBy(issues, 'story_points')

      (index > 0)
        ? data.push(data[index - 1] - points)
        : data.push(sprint.story_points.planned - points)
    })

    return data
  }
}
