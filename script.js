// Initialize Screen Switch
document.getElementById('btn').addEventListener('click', function() {
    document.getElementById('screen1').style.display = 'none';
    document.getElementById('screen2').style.display = 'flex';
  });
  
  // Screen Navigation
  function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.style.display = 'none');
    document.getElementById(screenId).style.display = 'flex';
  }
  
  // Screen 2 Options
  document.getElementById('bodOption').addEventListener('click', () => showScreen('bodCalcScreen'));
  document.getElementById('codOption').addEventListener('click', () => showScreen('codCalcScreen'));
  document.getElementById('organicsOption').addEventListener('click', () => showScreen('organicsCalcScreen'));
  document.getElementById('temperatureOption').addEventListener('click', () => showScreen('temperatureCalcScreen'));
  document.getElementById('monodOption').addEventListener('click', () => showScreen('monodCalcScreen'));
  document.getElementById('sludgeAgeOption').addEventListener('click', () => showScreen('sludgeAgeCalcScreen'));
  
  // BOD Calculation
  document.getElementById('generateBODFields').addEventListener('click', function() {
    const numSamples = parseInt(document.getElementById('numSamples').value);
    const bodSampleFields = document.getElementById('bodSampleFields');
    bodSampleFields.innerHTML = '';
    
    for (let i = 0; i < numSamples; i++) {
      bodSampleFields.innerHTML += `
        <div>
          <h3>Sample ${i + 1}</h3>
          <label for="sampleBOD${i}">BOD5:</label>
          <input type="number" id="sampleBOD${i}" required>
        </div>
      `;
    }
    document.getElementById('bodForm').style.display = 'block';
  });
  
  document.getElementById('bodForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const numSamples = parseInt(document.getElementById('numSamples').value);
    let totalBOD = 0;
  
    for (let i = 0; i < numSamples; i++) {
      const bodValue = parseFloat(document.getElementById(`sampleBOD${i}`).value);
      if (!isNaN(bodValue)) {
        totalBOD += bodValue;
      }
    }
  
    const averageBOD = totalBOD / numSamples;
    document.getElementById('bodResult').innerHTML = `Average BOD: ${averageBOD.toFixed(2)} mg/L`;
  });
  
  document.getElementById('bodReturnBtn').addEventListener('click', function() {
    showScreen('screen2');
  });
  
  // COD Calculation
  document.getElementById('generateCODFields').addEventListener('click', function() {
    const numSamples = parseInt(document.getElementById('numCODSamples').value);
    const codSampleFields = document.getElementById('codSampleFields');
    codSampleFields.innerHTML = '';
  
    for (let i = 0; i < numSamples; i++) {
      codSampleFields.innerHTML += `
        <div>
          <h3>Sample ${i + 1}</h3>
          <label for="sampleCOD${i}">COD:</label>
          <input type="number" id="sampleCOD${i}" required>
        </div>
      `;
    }
    document.getElementById('codForm').style.display = 'block';
  });
  
  document.getElementById('codForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const numSamples = parseInt(document.getElementById('numCODSamples').value);
    let totalCOD = 0;
  
    for (let i = 0; i < numSamples; i++) {
      const codValue = parseFloat(document.getElementById(`sampleCOD${i}`).value);
      if (!isNaN(codValue)) {
        totalCOD += codValue;
      }
    }
  
    const averageCOD = totalCOD / numSamples;
    document.getElementById('codResult').innerHTML = `Average COD: ${averageCOD.toFixed(2)} mg/L`;
  });
  
  document.getElementById('codReturnBtn').addEventListener('click', function() {
    showScreen('screen2');
  });
  
  // Organics Calculation
  document.getElementById('calcOrganics').addEventListener('click', function() {
    const tss = parseFloat(document.getElementById('tss').value);
    const tds = parseFloat(document.getElementById('tds').value);
    const ts = parseFloat(document.getElementById('ts').value);
    const tfs = parseFloat(document.getElementById('tfs').value);
    const tvs = parseFloat(document.getElementById('tvs').value);
  
    const organicsResult = `
      TSS: ${tss.toFixed(2)} mg/L<br>
      TDS: ${tds.toFixed(2)} mg/L<br>
      Total Solids: ${ts.toFixed(2)} mg/L<br>
      TFS: ${tfs.toFixed(2)} mg/L<br>
      TVS: ${tvs.toFixed(2)} mg/L
    `;
  
    document.getElementById('organicsResult').innerHTML = organicsResult;
  });
  
  // Temperature Adjustment
  document.getElementById('calcTempAdjustment').addEventListener('click', function() {
    const k20 = parseFloat(document.getElementById('k20').value);
    const theta = parseFloat(document.getElementById('theta').value);
    const temp = parseFloat(document.getElementById('temp').value);
  
    const kTemp = k20 * Math.pow(theta, (temp - 20));
    document.getElementById('tempResult').innerHTML = `Adjusted BOD Rate Constant: ${kTemp.toFixed(2)}`;
  });
  
  // Monod Equation
  document.getElementById('calcMonod').addEventListener('click', function() {
    const s = parseFloat(document.getElementById('s').value);
    const ks = parseFloat(document.getElementById('ks').value);
    const mumax = parseFloat(document.getElementById('mumax').value);
    const flowRate = parseFloat(document.getElementById('flowRate').value);
    const volume = parseFloat(document.getElementById('volume').value);
  
    const specificGrowthRate = mumax * s / (ks + s);
    const hydraulicRetentionTime = volume / flowRate;
  
    document.getElementById('monodResult').innerHTML = `
      Specific Growth Rate: ${specificGrowthRate.toFixed(2)} 1/day<br>
      Hydraulic Retention Time: ${hydraulicRetentionTime.toFixed(2)} days
    `;
  });
  
  // Sludge Age Calculation
  document.getElementById('calcSludgeAge').addEventListener('click', function() {
    const sludgeVolume = parseFloat(document.getElementById('sludgeVolume').value);
    const flowRate = parseFloat(document.getElementById('flowRate').value);
    const sludgeProduction = parseFloat(document.getElementById('sludgeProduction').value);
  
    const sludgeAge = sludgeVolume / (sludgeProduction / flowRate);
    document.getElementById('sludgeAgeResult').innerHTML = `Sludge Age: ${sludgeAge.toFixed(2)} days`;
  });
  