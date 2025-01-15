/* global requestAnimationFrame */

/** @type {number} */
let ACTIVE_STEP = 0

/** @type {NodeListOf<Element>} */
const STEPS_ELEMENTS = document.querySelectorAll('.js-step')

const AUDIO_ELEMENT = document.querySelector('.js-audio')

/** @type {number} */
let CURRENT_PLAYER_COUNT = 1

/**
 * A mapping of step indices to their corresponding theme colors.
 * @type {Record<number, string>}
 */

const THEME_COLOR = {
  0: '#5599FE',
  1: '#FFD351',
  2: '#5EAB87'
}

document.addEventListener('click', ({ target }) => {
  updateStep(ACTIVE_STEP + 1)
})

/**
 * Updates the active step state and handles the display of steps.
 *
 * @param {number} step - The next step index to activate.
 */
const updateStep = (step) => {
  ACTIVE_STEP = step === STEPS_ELEMENTS.length ? 0 : step

  const hiddenStep = document.querySelector('.js-step:not([hidden])')
  hiddenStep.hidden = true

  const stepElementToDisplay = STEPS_ELEMENTS[ACTIVE_STEP]
  stepElementToDisplay.hidden = false

  updateThemeColor(THEME_COLOR[ACTIVE_STEP])

  if (ACTIVE_STEP === 1) {
    playAudioWithRepeats(2)
    countDown({
      seconds: 10,
      element: stepElementToDisplay,
      callback: () => updateStep(2)
    })
  }

  if (ACTIVE_STEP === 2) {
    playAudioWithRepeats(1)
    countDown({
      seconds: 120,
      element: stepElementToDisplay,
      callback: () => {
        updateStep(0)
        playAudioWithRepeats(3)
      }
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

/**
 * Updates the theme color in the meta tag with the given hexadecimal color value
 * @param {string} hexColor
 */

function updateThemeColor (hexColor) {
  document.querySelector('meta[name="theme-color"]').setAttribute('content', hexColor)
}

/**
 * Plays an audio file a specified number of times.
 * @param {number} repeatCount - The number of times to play the audio.
 */

function playAudioWithRepeats (repeatCount) {
  AUDIO_ELEMENT.play()
  AUDIO_ELEMENT.addEventListener('ended', () => {
    if (CURRENT_PLAYER_COUNT < repeatCount) {
      CURRENT_PLAYER_COUNT = CURRENT_PLAYER_COUNT + 1
      playAudioWithRepeats(repeatCount)
      return
    }
    CURRENT_PLAYER_COUNT = 1
  }, { once: true })
}
