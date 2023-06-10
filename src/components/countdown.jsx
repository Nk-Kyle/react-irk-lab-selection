import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'

export const Countdown = ({ timestamp }) => {
  const calculateTimeLeft = () => {
    const difference = timestamp - Math.floor(Date.now() / 1000)
    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (60 * 60 * 24)),
        hours: Math.floor((difference / (60 * 60)) % 24),
        minutes: Math.floor((difference / 60) % 60),
        seconds: Math.floor(difference % 60),
      }
    }

    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())
  const [expired, setExpired] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const newTimeLeft = calculateTimeLeft()
      setTimeLeft(newTimeLeft)

      if (Object.keys(newTimeLeft).length === 0) {
        setExpired(true)
      }
    }, 1000)

    return () => clearTimeout(timer)
  })

  return (
    <div>
      {expired ? (
        <Alert variant="danger m-3" className="text-center">
          Selection Finished
        </Alert>
      ) : (
        <Alert variant="warning m-3" className="text-center">
          Time Left <b>{timeLeft.days}</b> days, <b>{timeLeft.hours}</b> hours,{' '}
          <b>{timeLeft.minutes}</b> minutes, <b>{timeLeft.seconds} </b>seconds
        </Alert>
      )}
    </div>
  )
}
