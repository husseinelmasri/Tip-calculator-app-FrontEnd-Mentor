// Get all DOM elements
const bill = document.getElementById('bill');
const customTip = document.getElementById('custom_tip');
const people = document.getElementById('people');
const tipAmount = document.getElementById('tip-amount');
const totalAmount = document.getElementById('total-amount');
const resetBtn = document.getElementById('reset-btn');
const tipButtons = document.querySelectorAll('.tip_btn');
const peopleError = document.getElementById('people-error');

let activeTipPercentage = 0;

function removeActiveClass() {
  tipButtons.forEach((btn) => btn.classList.remove('active'));
}

// Calculate tip function
function calculateTip() {
  const billValue = parseFloat(bill.value) || 0;
  const peopleValue = parseInt(people.value) || 0;

  let tipPercentage = activeTipPercentage;

  if (customTip.value) {
    tipPercentage = parseFloat(customTip.value) || 0;
  }

  if (peopleValue <= 0) {
    peopleError.style.display = 'inline';
    people.parentElement.classList.add('error');
    tipAmount.textContent = '$0.00';
    totalAmount.textContent = '$0.00';
    return;
  } else {
    peopleError.style.display = 'none';
    people.parentElement.classList.remove('error');
  }

  // Calculate tip
  const tipAmountValue = (billValue * tipPercentage) / 100;
  const totalValue = billValue + tipAmountValue;

  const perPersonTip = tipAmountValue / peopleValue;
  const perPersonTotal = totalValue / peopleValue;

  // Format and display results
  tipAmount.textContent = `$${perPersonTip.toFixed(2)}`;
  totalAmount.textContent = `$${perPersonTotal.toFixed(2)}`;
}

// Handle tip button clicks
tipButtons.forEach((button) => {
  button.addEventListener('click', () => {
    removeActiveClass();

    button.classList.add('active');

    activeTipPercentage = parseFloat(button.dataset.tip);

    customTip.value = '';

    calculateTip();
  });

  // Add keyboard support
  button.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      button.click();
    }
  });
});

customTip.addEventListener('input', () => {
  removeActiveClass();

  activeTipPercentage = 0;

  calculateTip();
});

bill.addEventListener('input', calculateTip);
people.addEventListener('input', calculateTip);

resetBtn.addEventListener('click', () => {
  bill.value = '';
  customTip.value = '';
  people.value = '1';

  removeActiveClass();

  activeTipPercentage = 0;

  tipAmount.textContent = '$0.00';
  totalAmount.textContent = '$0.00';

  peopleError.style.display = 'none';
  people.parentElement.classList.remove('error');
});

resetBtn.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    resetBtn.click();
  }
});

calculateTip();
