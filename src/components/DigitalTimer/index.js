// Write your code here
import {Component} from 'react'

import './index.css'

const initialState = {
  isTimeRunning: false,
  timeElapsedInMinute: 25,
  timeElapsedInSecond: 0,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimeLimitButton = () => {
    const {timeElapsedInMinute} = this.state

    if (timeElapsedInMinute > 1) {
      this.setState(prevState => ({
        timeElapsedInMinute: prevState.timeElapsedInMinute - 1,
      }))
    }
  }

  onIncreaseTimeLimitButton = () => {
    this.setState(prevState => ({
      timeElapsedInMinute: prevState.timeElapsedInMinute + 1,
    }))
  }

  renderTimeLimitController = () => {
    const {timeElapsedInSecond, timeElapsedInMinute} = this.state
    const isButtonDisabled = timeElapsedInSecond > 0

    return (
      <div className="time-limit-controller-container">
        <p className="labeled-text">Set Timer limit</p>
        <div className="time-limit-controller">
          <button
            className="limit-controller-button"
            type="button"
            disabled={isButtonDisabled}
            onClick={this.onDecreaseTimeLimitButton}
          >
            -
          </button>
          <div className="limit-labeled-text">
            <p className="limit-value">{timeElapsedInMinute}</p>
          </div>
          <button
            className="limit-controller-button"
            type="button"
            disabled={isButtonDisabled}
            onClick={this.onIncreaseTimeLimitButton}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  increamentTimerElapsedInSeconds = () => {
    const {timeElapsedInMinute, timeElapsedInSecond} = this.state
    const isTimeCompleted = timeElapsedInSecond === timeElapsedInMinute * 60

    if (isTimeCompleted) {
      this.clearTimerInterval()
      this.setState({isTimeRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSecond: prevState.timeElapsedInSecond + 1,
      }))
    }
  }

  onStartsPauseTime = () => {
    const {isTimeRunning, timeElapsedInMinute, timeElapsedInSecond} = this.state

    const isTimerCompleted = timeElapsedInSecond === timeElapsedInMinute * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSecond: 0})
    }

    if (isTimeRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimerElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimeRunning: !prevState.isTimeRunning}))
  }

  renderTimeController = () => {
    const {isTimeRunning} = this.state
    const startsOrPausedImageUrl = isTimeRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startsPauseText = isTimeRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controller-container">
        <button
          type="button"
          className="time-controller-btn"
          onClick={this.onStartsPauseTime}
        >
          <img
            src={startsOrPausedImageUrl}
            alt={startsPauseText}
            className="time-controller-icon"
          />
          <p className="time-controller-label">
            {isTimeRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          className="time-controller-btn"
          type="button"
          onClick={this.onResetTimer}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="time-controller-icon"
          />
          <p className="time-controller-label">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsTimeFormat = () => {
    const {timeElapsedInMinute, timeElapsedInSecond} = this.state

    const totalRemainingSeconds = timeElapsedInMinute * 60 - timeElapsedInSecond

    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringfiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringfiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    console.log(stringfiedSeconds)

    return `${stringfiedMinutes}:${stringfiedSeconds}`
  }

  render() {
    const {isTimeRunning} = this.state
    const labeledText = isTimeRunning ? 'Running' : 'Paused'
    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-time-container">
          <div className="time-display-container">
            <div className="time-elapsed-container">
              <h1 className="elapsed-time">
                {this.getElapsedSecondsTimeFormat()}
              </h1>
              <p className="time-state">{labeledText}</p>
            </div>
          </div>
          <div className="control-container">
            {this.renderTimeController()}
            {this.renderTimeLimitController()}
            {}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
