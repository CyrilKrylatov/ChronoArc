/* global requestAnimationFrame */

/** @type {number} */

const stepsCount = document.querySelector('.js-main').childElementCount

document.addEventListener('click', ({ target }) => {
  updateActiveStep()
  handleSteps(target)
})


function updateActiveStep () {
  const activeStep = Number(document.body.dataset.activeStep)
  document.body.dataset.activeStep = activeStep === stepsCount - 1 ? 0 : activeStep + 1
}

function handleSteps (element) {
  console.log(element)
}

/**
 * Creates a countdown timer that updates the text content of a given element
 * with the remaining seconds. Executes a callback function when the timer
 * reaches zero. Uses requestAnimationFrame for better performance and accuracy.
 *
 * @param {number} seconds - The number of seconds for the countdown.
 * @param {HTMLElement} element - The HTML element to display the countdown.
 * @param {Function} callback - The function to execute when the countdown ends.
 */
function countDown (seconds, element, callback) {
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
    } else if (typeof callback === 'function') {
      callback()
    }
  }

  updateCountdown()
}
