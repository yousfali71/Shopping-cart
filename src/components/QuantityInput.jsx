import PropTypes from "prop-types";

export default function QuantityInput({ inputNum, setInputNum }) {
  QuantityInput.propTypes = {
    inputNum: PropTypes.number,
    setInputNum: PropTypes.func,
  };

  function handleInputChange(e) {
    const target = e.target.value;

    setInputNum(target);
  }

  function incrementInput() {
    setInputNum(inputNum + 1);
  }

  function decrementInput() {
    setInputNum(inputNum - 1);
  }
  return (
    <div className="input-container">
      <button className="subtract-input" onClick={decrementInput}>
        -
      </button>
      <input
        type="number"
        className="input-qty"
        value={inputNum}
        onChange={handleInputChange}
        min="1"
        max="100"
        readOnly
      />
      <button className="add-input" onClick={incrementInput}>
        +
      </button>
    </div>
  );
}
