function appendValue(value) {
  document.getElementById('display').value += value;
}

function calculate() {
  try {
    const result = eval(document.getElementById('display').value);
    document.getElementById('display').value = result;
  } catch {
    alert("Invalid expression");
  }
}

function clearDisplay() {
  document.getElementById('display').value = "";
}
