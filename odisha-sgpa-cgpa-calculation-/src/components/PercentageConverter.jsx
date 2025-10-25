import { useState } from "react";
import { ArrowRightLeft, Percent, Calculator } from "lucide-react";
import "../styles.css";

const PercentageConverter = () => {
  const [activeConversionTab, setActiveConversionTab] = useState("sgpa-to-percent");
  const [sgpa, setSgpa] = useState("");
  const [percentage, setPercentage] = useState("");
  const [marks, setMarks] = useState("");
  const [sgpaForMarks, setSgpaForMarks] = useState("");
  const [maxMarks, setMaxMarks] = useState("");
  const [sgpaResult, setSgpaResult] = useState(null);
  const [percentageResult, setPercentageResult] = useState(null);
  const [gradeResult, setGradeResult] = useState(null);
  const [totalMarksResult, setTotalMarksResult] = useState(null);

  const convertSGPAToPercentage = () => {
    const sgpaValue = parseFloat(sgpa);
    if (!isNaN(sgpaValue) && sgpaValue >= 0 && sgpaValue <= 10) {
      const result = (sgpaValue - 0.75) * 10;
      setPercentageResult(parseFloat(result.toFixed(2)));
    }
  };

  const convertPercentageToSGPA = () => {
    const percentValue = parseFloat(percentage);
    if (!isNaN(percentValue) && percentValue >= 0 && percentValue <= 100) {
      const result = percentValue / 10 + 0.75;
      setSgpaResult(parseFloat(result.toFixed(2)));
    }
  };

  const convertMarksToGrade = () => {
    const marksValue = parseFloat(marks);
    if (isNaN(marksValue) || marksValue < 0 || marksValue > 100) {
      return;
    }

    let grade = "";
    let gp = 0;

    if (marksValue >= 90) {
      grade = "O";
      gp = 10;
    } else if (marksValue >= 80) {
      grade = "A+";
      gp = 9;
    } else if (marksValue >= 70) {
      grade = "A";
      gp = 8;
    } else if (marksValue >= 60) {
      grade = "B+";
      gp = 7;
    } else if (marksValue >= 50) {
      grade = "B";
      gp = 6;
    } else if (marksValue >= 45) {
      grade = "C";
      gp = 5;
    } else if (marksValue >= 40) {
      grade = "D";
      gp = 4;
    } else {
      grade = "F";
      gp = 0;
    }

    setGradeResult({ grade, gp });
  };

  const convertSGPAToTotalMarks = () => {
    const sgpaValue = parseFloat(sgpaForMarks);
    const maxMarksValue = parseFloat(maxMarks);
    if (!isNaN(sgpaValue) && sgpaValue >= 0 && sgpaValue <= 10 && !isNaN(maxMarksValue) && maxMarksValue > 0) {
      const percentage = (sgpaValue - 0.75) * 10;
      const totalMarks = (percentage / 100) * maxMarksValue;
      setTotalMarksResult(parseFloat(totalMarks.toFixed(2)));
    }
  };

  return (
    <div className="card calculator-card">
      <div className="card-header">
        <h3 className="card-title">
          <ArrowRightLeft className="icon-inline" />
          Conversion Tools
        </h3>
        <p className="card-description">Convert between SGPA, percentage, and marks</p>
      </div>
      <div className="card-content">
        <div className="conversion-tabs">
          <div className="conversion-tabs-list">
            <button 
              className={`conversion-tab ${activeConversionTab === 'sgpa-to-percent' ? 'active' : ''}`}
              onClick={() => setActiveConversionTab('sgpa-to-percent')}
            >
              SGPA → %
            </button>
            <button 
              className={`conversion-tab ${activeConversionTab === 'percent-to-sgpa' ? 'active' : ''}`}
              onClick={() => setActiveConversionTab('percent-to-sgpa')}
            >
              % → SGPA
            </button>
            <button 
              className={`conversion-tab ${activeConversionTab === 'sgpa-to-marks' ? 'active' : ''}`}
              onClick={() => setActiveConversionTab('sgpa-to-marks')}
            >
              SGPA → Marks
            </button>
            <button 
              className={`conversion-tab ${activeConversionTab === 'marks-to-grade' ? 'active' : ''}`}
              onClick={() => setActiveConversionTab('marks-to-grade')}
            >
              Marks → Grade
            </button>
          </div>

          <div className="conversion-content">
            {activeConversionTab === 'sgpa-to-percent' && (
              <div className="conversion-panel">
                <div className="form-group">
                  <label htmlFor="sgpa-input" className="label">
                    Enter SGPA (0-10)
                  </label>
                  <input
                    id="sgpa-input"
                    type="number"
                    step="0.01"
                    className="input"
                    placeholder="7.34"
                    value={sgpa}
                    onChange={(e) => setSgpa(e.target.value)}
                  />
                </div>
                <button onClick={convertSGPAToPercentage} className="btn btn-primary btn-full">
                  <Percent className="icon-small" />
                  Convert to Percentage
                </button>
                {percentageResult !== null && (
                  <div className="result-card conversion-result">
                    <p className="result-label">Percentage</p>
                    <p className="result-value result-large">{percentageResult}%</p>
                  </div>
                )}
              </div>
            )}

            {activeConversionTab === 'percent-to-sgpa' && (
              <div className="conversion-panel">
                <div className="form-group">
                  <label htmlFor="percentage-input" className="label">
                    Enter Percentage (0-100)
                  </label>
                  <input
                    id="percentage-input"
                    type="number"
                    step="0.01"
                    className="input"
                    placeholder="65.90"
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                  />
                </div>
                <button onClick={convertPercentageToSGPA} className="btn btn-primary btn-full">
                  <Calculator className="icon-small" />
                  Convert to SGPA
                </button>
                {sgpaResult !== null && (
                  <div className="result-card conversion-result">
                    <p className="result-label">SGPA</p>
                    <p className="result-value result-large">{sgpaResult}</p>
                  </div>
                )}
              </div>
            )}

            {activeConversionTab === 'sgpa-to-marks' && (
              <div className="conversion-panel">
                <div className="form-group">
                  <label htmlFor="sgpa-marks-input" className="label">
                    Enter SGPA (0-10)
                  </label>
                  <input
                    id="sgpa-marks-input"
                    type="number"
                    step="0.01"
                    className="input"
                    placeholder="7.34"
                    value={sgpaForMarks}
                    onChange={(e) => setSgpaForMarks(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="max-marks-input" className="label">
                    Enter Maximum Marks
                  </label>
                  <input
                    id="max-marks-input"
                    type="number"
                    className="input"
                    placeholder="500"
                    value={maxMarks}
                    onChange={(e) => setMaxMarks(e.target.value)}
                  />
                </div>
                <button onClick={convertSGPAToTotalMarks} className="btn btn-primary btn-full">
                  <Calculator className="icon-small" />
                  Convert to Total Marks
                </button>
                {totalMarksResult !== null && (
                  <div className="result-card conversion-result">
                    <p className="result-label">Total Marks</p>
                    <p className="result-value result-large">{totalMarksResult}</p>
                    <p className="result-note">out of {maxMarks}</p>
                  </div>
                )}
              </div>
            )}

            {activeConversionTab === 'marks-to-grade' && (
              <div className="conversion-panel">
                <div className="form-group">
                  <label htmlFor="marks-input" className="label">
                    Enter Marks (0-100)
                  </label>
                  <input
                    id="marks-input"
                    type="number"
                    className="input"
                    placeholder="75"
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                  />
                </div>
                <button onClick={convertMarksToGrade} className="btn btn-primary btn-full">
                  <ArrowRightLeft className="icon-small" />
                  Convert to Grade
                </button>
                {gradeResult && (
                  <div className="result-card conversion-result">
                    <div className="grade-result-grid">
                      <div className="result-item">
                        <p className="result-label">Grade</p>
                        <p className="result-value result-large">{gradeResult.grade}</p>
                      </div>
                      <div className="result-item">
                        <p className="result-label">Grade Point</p>
                        <p className="result-value result-large">{gradeResult.gp}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PercentageConverter;
