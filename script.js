const resultLeftBox = document.getElementById('default_text')
const completeResultBox = document.getElementById('calculations_container')

document.querySelectorAll('.mortgage_type').forEach(input => {
  input.addEventListener('change', function () {
    document.querySelectorAll('radio_inputs').forEach(div => {
      div.classList.remove('selected')
    })
    if (this.checked) {
      this.parentElement.classList.add('selected')
    }
  })
})

document.getElementById('calculate_btn').addEventListener('click', () => {
  const amount = parseFloat(document.getElementById('mortgage_amount').value)
  const term = parseFloat(document.getElementById('mortgage_term').value)
  const rate = parseFloat(document.getElementById('interest_rate').value) / 100;
  const mortgageType = document.querySelector('input[name="mortgage_type"]:checked')

  let isValid = true

  document.querySelectorAll('.form_flex').forEach(el => {
    el.classList.remove('error')
  })

  if (isNaN(amount) || amount <= 0) {
    document.getElementById('amount_alert').style.display = 'block';
    document.getElementById('mortgage_amount_main').classList.add('error')
    isValid = false
  } else {
    document.getElementById('amount_alert').style.display = 'none'
  }

  if (isNaN(term) || term <= 0) {
    document.getElementById('term_alert').style.display = 'block';
    document.getElementById('mortgage_term').classList.add('error')
    isValid = false
  } else {
    document.getElementById('term_alert').style.display = 'none'
  }

  if (isNaN(rate) || rate <= 0) {
    document.getElementById('rate_alert').style.display = 'block';
    document.getElementById('interest_rate_main').classList.add('error')
    isValid = false
  } else {
    document.getElementById('rate_alert').style.display = 'none'
  }

  if (!mortgageType) {
    document.getElementById('type_alert').style.display = 'block'
    document.querySelectorAll('.radio_inputs').forEach(el => {
      el.classList.add('error')
    })
    isValid = false
  } else {
    document.getElementById('type_alert').style.display = 'none'
    document.querySelectorAll('.radio_inputs').forEach(el => {
      el.classList.remove('error')
    })
  }

  if (isValid) {
    let monthlyPayment = 0;
    let totalRepayment = 0;

    resultLeftBox.classList.add('hide')
    completeResultBox.classList.add('show')

    if (mortgageType.value === 'repayment') {
      const monthlyRate = rate / 12
      const n = term * 12
      monthlyPayment = (amount * monthlyRate) / (1 - Math.pow((1 + monthlyRate), -n))
      totalRepayment = monthlyPayment * n
    } else if (mortgageType.value === 'interest_only') {
      monthlyPayment = (amount * rate) / 12
      totalRepayment = monthlyPayment * term * 12
    }

    document.getElementById('result').innerText = `$${monthlyPayment.toFixed(2)}`
    document.getElementById('term_result').innerText = `$${totalRepayment.toFixed(2)}`

  } else {
    document.getElementById('result').innerHTML = ''
    document.getElementById('term_result').innerHTML = ''

    resultLeftBox.classList.remove('hide')
    completeResultBox.classList.remove('show')
  }
})

document.getElementById('clear_btn').addEventListener('click', () => {
  document.getElementById('mortgage_form').reset()
  document.getElementById('result').innerText = ''
  document.getElementById('term_result').innerText = ''
  document.querySelectorAll('.form_alert').forEach(alert => {
    alert.style.display = 'none'
  })

  resultLeftBox.classList.remove('hide')
  completeResultBox.classList.remove('show')

  document.querySelectorAll('.radio_inputs').forEach(div => {
    div.classList.remove('selected')
  })

  document.querySelectorAll('.form_flex').forEach(el => {
    el.classList.remove('error')
  })

})

document.querySelectorAll('.form_alert').forEach(alert => {
  alert.style.display = 'none'
})
