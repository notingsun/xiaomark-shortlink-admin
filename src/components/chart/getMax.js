const quantityExponent = function(val) {
  if (val === 0) {
    return 0
  }

  let exp = Math.floor(Math.log(val) / Math.LN10)
  /**
   * exp is expected to be the rounded-down result of the base-10 log of val.
   * But due to the precision loss with Math.log(val), we need to restore it
   * using 10^exp to make sure we can get val back from exp. #11249
   */

  if (val / Math.pow(10, exp) >= 10) {
    exp++
  }
  return exp
}

const nice = function(val, round) {
  let exponent = quantityExponent(val)

  let exp10 = Math.pow(10, exponent)

  let f = val / exp10 // 1 <= f < 10

  let nf

  if (round) {
    if (f < 1.5) {
      nf = 1
    } else if (f < 2.5) {
      nf = 2
    } else if (f < 4) {
      nf = 3
    } else if (f < 7) {
      nf = 5
    } else {
      nf = 10
    }
  } else if (f < 1) {
    nf = 1
  } else if (f < 2) {
    nf = 2
  } else if (f < 3) {
    nf = 3
  } else if (f < 5) {
    nf = 5
  } else {
    nf = 10
  }
  let val1 = nf * exp10

  // Fix 3 * 0.1 === 0.30000000000000004 issue (see IEEE 754).
  // 20 is the uppper bound of toFixed.
  /* eslint-disable */
  return exponent >= -20
    ? Number(val1.toFixed(exponent < 0 ? -exponent : 0))
    : val1
  /* eslint-enable */
}

const round = function(x, precision, returnStr) {
  let precision1 = precision,
    x1 = x

  if (precision === null) {
    precision1 = 10
  }
  // Avoid range error
  precision1 = Math.min(Math.max(0, precision1), 20)
  x1 = Number(x1).toFixed(precision1)
  return returnStr ? x1 : Number(x1)
}

const getPrecisionSafe = function(val) {
  let str = val.toString()

  // Consider scientific notation: '3.4e-12' '3.4e+12'
  let eIndex = str.indexOf('e')

  if (eIndex > 0) {
    let precision = Number(str.slice(eIndex + 1))

    return precision < 0 ? -precision : 0
  }

  let dotIndex = str.indexOf('.')

  return dotIndex < 0 ? 0 : str.length - 1 - dotIndex
}

const numberUtil = {
  nice,
  round,
  getPrecisionSafe
}

const getIntervalPrecision = function(interval) {
  // Tow more digital for tick.
  return numberUtil.getPrecisionSafe(interval) + 2
}

const clamp = function(niceTickExtent, idx, extent) {
  niceTickExtent[idx] = Math.max(
    Math.min(niceTickExtent[idx], extent[1]),
    extent[0]
  )
}

const fixExtent = function(niceTickExtent, extent) {
  !isFinite(niceTickExtent[0]) && (niceTickExtent[0] = extent[0])
  !isFinite(niceTickExtent[1]) && (niceTickExtent[1] = extent[1])
  clamp(niceTickExtent, 0, extent)
  clamp(niceTickExtent, 1, extent)
  if (niceTickExtent[0] > niceTickExtent[1]) {
    niceTickExtent[0] = niceTickExtent[1]
  }
}

// 官网的
export function intervalScaleNiceTicks(
  extent,
  splitNumber,
  minInterval,
  maxInterval
) {
  let result = {}

  let span = extent[1] - extent[0]

  let interval = numberUtil.nice(span / splitNumber, true)

  result.interval = interval

  if (minInterval !== null && interval < minInterval) {
    interval = result.interval = minInterval
  }
  if (maxInterval !== null && interval > maxInterval) {
    interval = result.interval = maxInterval
  }

  // Tow more digital for tick.
  let precision = getIntervalPrecision(interval)

  result.intervalPrecision = precision

  // Niced extent inside original extent
  let niceTickExtent = [
    numberUtil.round(Math.ceil(extent[0] / interval) * interval, precision),
    numberUtil.round(Math.floor(extent[1] / interval) * interval, precision)
  ]

  result.niceTickExtent = niceTickExtent

  fixExtent(niceTickExtent, extent)

  console.log({ result })

  return result
}

// 我们项目需要的精简版
function getYMax(max, splitNumber = 5) {
  let interval = numberUtil.nice(max / splitNumber, false)

  let precision = getIntervalPrecision(interval)

  const res = numberUtil.round(Math.ceil(max / interval) * interval, precision)

  return res
}
export default getYMax
