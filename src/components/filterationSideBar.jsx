import './filterationSideBar.css';

const symptoms = [
    "Headache",
    "Fatigue",
    "Cough",
    "Fever",
    "Nausea or Vomiting",
    "Abdominal Pain",
    "Dizziness",
    "Shortness of Breath",
    "Chest Pain",
    "Back Pain",
    "Joint or Muscle Pain",
    "Skin Rash",
    "Sore Throat",
    "Nasal Congestion",
    "Diarrhea",
    "Constipation",
    "Urinary Issues (e.g., frequency, pain)",
    "Sleep Disturbances",
    "Mood Changes (e.g., anxiety, depression)",
    "Weight Changes",
    "Appetite Changes",
    "Menstrual Irregularities"
  ];
  
  const FiltrationSideBar = () => {
    return (
      <div className="symptom-list">
        <h3 className="sidetext">What are your Symptoms ?</h3>
        <ul>
          {symptoms.map((symptom, index) => (
            <li className="indexli" key={index}>
              <label>
                <input type="checkbox" />
                {symptom}
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
 
export default FiltrationSideBar;