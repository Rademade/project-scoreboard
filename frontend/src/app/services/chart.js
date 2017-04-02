import moment from 'moment'
import * as _ from 'lodash'

export default class ChartService {
  getChartData(sprint) {
    return {
      labels: this.getLabels(),
      datasets: [{
        type: 'line',
        label: 'Planned',
        borderColor: '#1c91c0',
        pointBackgroundColor: '#1c91c0',
        pointRadius: 0,
        fill: false,
        lineTension: 0,
        data: this.getPlannedSprintData(sprint)
      }, {
        type: 'line',
        label: 'Realized',
        borderColor: '#e2431e',
        pointBackgroundColor: '#e2431e',
        pointRadius: 0,
        fill: false,
        lineTension: 0,
        data: this.getRealizedSprintData(sprint)
      }]
    }
  }

  getCurrentWeekWorkDates() {
    return _.map(
      _.range(5), i => moment().startOf('week').add(i + 1, 'days').toDate()
    )
  }

  getLabels() {
    return _.map(this.getCurrentWeekWorkDates(), date => moment(date).format('MMM D'))
  }

  getPlannedSprintData(sprint) {
    let dates = this.getCurrentWeekWorkDates()
    let C = sprint.story_points.planned
    let k = C / (dates.length - 1)
    return _.map(_.range(dates.length), x => C - k * x)
  }

  getRealizedSprintData(sprint) {
    let data = []
    _.each(this.getCurrentWeekWorkDates(), (date, index) => {
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
