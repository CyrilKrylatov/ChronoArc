/* global requestAnimationFrame */

/** @type {number} */
let activeStep = 0

/** @type {NodeListOf<Element>} */
const stepsElements = document.querySelectorAll('.js-step')

document.addEventListener('click', ({ target }) => {
  updateStep(activeStep + 1)
})

/**
 * Updates the active step state and handles the display of steps.
 *
 * @param {number} step - The next step index to activate.
 */
const updateStep = (step) => {
  activeStep = step === stepsElements.length ? 0 : step

  const hiddenStep = document.querySelector('.js-step:not([hidden])')
  hiddenStep.hidden = true

  const stepElementToDisplay = stepsElements[activeStep]
  stepElementToDisplay.hidden = false

  if (activeStep === 1) {
    countDown({
      seconds: 10,
      element: stepElementToDisplay,
      callback: () => updateStep(2)
    })
  }

  if (activeStep === 2) {
    countDown({
      seconds: 120,
      element: stepElementToDisplay,
      callback: () => updateStep(0)
    })
  }
}

/**
 * Creates a countdown timer that updates the text content of a given element
 * with the remaining seconds. Executes a callback function when the timer
 * reaches zero. Uses requestAnimationFrame for better performance and accuracy.
 *
 * @param {Object} options
 * @param {number} options.seconds - The number of seconds for the countdown.
 * @param {HTMLElement} options.element - The HTML element to display the countdown.
 * @param {Function} options.callback - The function to execute when the countdown ends.
 */
function countDown ({ seconds, element, callback = () => {} }) {
  if (!element) {
    return
  }

  const endTime = Date.now() + seconds * 1000

  function updateCountdown () {
    const now = Date.now()
    const remainingSeconds = Math.max(0, Math.round((endTime - now) / 1000))

    element.textContent = remainingSeconds

    if (remainingSeconds > 0) {
      requestAnimationFrame(updateCountdown)
    } else {
      callback()
    }
  }

  updateCountdown()
}
