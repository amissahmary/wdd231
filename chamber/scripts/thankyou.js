const params = new URLSearchParams(window.location.search);
 
  const levelLabels = {
    np:     'NP Membership (Non-Profit)',
    bronze: 'Bronze Membership',
    silver: 'Silver Membership',
    gold:   'Gold Membership'
  };
 
  const fields = [
    { key: 'fname',     label: 'First Name' },
    { key: 'lname',     label: 'Last Name' },
    { key: 'email',     label: 'Email Address' },
    { key: 'mobile',    label: 'Mobile Phone' },
    { key: 'org',       label: 'Organization' },
    { key: 'membership',label: 'Membership Level', transform: v => levelLabels[v] || v },
  ];
 
  const body = document.getElementById('summaryBody');
 
  let hasData = false;
 
  fields.forEach(f => {
    const val = params.get(f.key);
    if (!val) return;
    hasData = true;
    const display = f.transform ? f.transform(val) : val;
    body.insertAdjacentHTML('beforeend', `
      <div class="field-block">
        <dt>${f.label}</dt>
        <dd>${escapeHTML(display)}</dd>
      </div>
    `);
  });
 
  // Divider before timestamp
  if (hasData) {
    body.insertAdjacentHTML('beforeend', '<div class="divider"></div>');
  }
 
  // Timestamp
  const ts = params.get('timestamp');
  if (ts) {
    body.insertAdjacentHTML('beforeend', `
      <div class="timestamp-block">
        <span class="ts-icon">🕐</span>
        <div>
          <dt>Form Submitted</dt>
          <dd>${escapeHTML(ts)}</dd>
        </div>
      </div>
    `);
  }
 
  if (!hasData && !ts) {
    document.getElementById('summaryCard').innerHTML = `
      <div class="no-data">
        <p>No application data found. <a href="join.html">Please fill out the form.</a></p>
      </div>
    `;
  }
 
  function escapeHTML(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }