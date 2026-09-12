

export const ReportForm = (_props: any) => {
  return (
    <>
      
<button className="pbt no-print" onClick={() => window.print()}>&#128438; Print / Save PDF</button>

{/* PAGE 1 */}
<div className="form-page" id="page1">
  <div className="form-title">Medico-Legal Examination of Accused of Sexual Violence</div>

  <div className="sb">
    <span className="sn">1. Case Particulars:</span>
    <div className="i1 mt1">
      <p>Requisition from <input className="li liw" id="req-from" type="text" placeholder="..." /> vide letter No. <input className="li" id="letter-no" type="text" placeholder="No." /> dated <input className="li" id="letter-date" type="date" /> for examination of: -</p>
      <p className="mt1"><input className="li lif" id="exam-of" type="text" placeholder="Name of person to be examined..." /></p>
      <p className="mt1">brought and identified by: - <input className="li liw" id="identified-by" type="text" placeholder="..." /></p>
      <p className="mt1"><input className="li lif" id="identified-by-2" type="text" placeholder="..." /></p>
    </div>
  </div>

  <div className="sb">
    <span className="sn">2. Particulars of the alleged accused:</span>
    <div className="i1">
      <div className="phb" title="Click to upload photo">
        <input type="file" id="photo-upload" accept="image/*" onChange={() => {}} />
        <span id="photo-label">PHOTO</span>
      </div>
      <p className="mt1">i. Name: <input className="li liw" id="acc-name" type="text" placeholder="Full name..." /> S/o <input className="li liw" id="acc-father" type="text" placeholder="Father's name..." /></p>
      <p className="mt1">ii. Address: <input className="li" style={{"minWidth":"380px"}} id="acc-addr1" type="text" placeholder="Address line 1..." /></p>
      <p className="mt1"><input className="li lif" id="acc-addr2" type="text" placeholder="Address line 2..." /></p>
      <p className="mt1">iii. Age as stated: <input className="li" id="acc-age" type="text" placeholder="e.g. 30 years" /></p>
      <p className="mt1">iv. Occupation: <input className="li lim" id="acc-occ" type="text" placeholder="..." /></p>
      <p className="mt1">v. Religion: <input className="li lim" id="acc-rel" type="text" placeholder="..." /></p>
      <p className="mt1">vi. Consent given in writing: - <input className="li liw" id="acc-consent" type="text" placeholder="Yes / No / Details..." /></p>
    </div>
  </div>

  <div className="sb">
    <p><span className="sn">3. Examined in presence of:</span> <input className="li" style={{"minWidth":"320px"}} id="exam-presence" type="text" placeholder="..." /></p>
    <div className="i1 mt1">
      <p>Place of Examination: - <input className="li liw" id="exam-place" type="text" placeholder="Dept of FM&amp;T, SCB MCH, CUTTACK" /></p>
      <p className="mt1">Date and Time of Examination: - <input className="li lim" id="exam-datetime" type="datetime-local" /></p>
    </div>
    <div className="fpr i1 mt2">
      <div><div className="fpb">CLEAR<br />LTI</div><div style={{"fontSize":"10px","textAlign":"center"}}>Left Thumb</div></div>
      <div><div className="fpb">CLEAR<br />RTI</div><div style={{"fontSize":"10px","textAlign":"center"}}>Right Thumb</div></div>
    </div>
  </div>

  <div className="sb">
    <span className="sn">4. Marks of Identification:</span>
    <div className="i1 mt1">
      <p>(1) <input className="li" style={{"minWidth":"360px"}} id="marks-id-1" type="text" placeholder="First identification mark..." /></p>
      <p className="mt1">(2) <input className="li" style={{"minWidth":"360px"}} id="marks-id-2" type="text" placeholder="Second identification mark..." /></p>
    </div>
  </div>

  <div className="sb">
    <span className="sn tb">Brief History:</span>
    <div className="i1 mt1">
      <p className="mb1">i. As given by police: <input className="li" style={{"minWidth":"280px"}} id="hist-police" type="text" placeholder="As per inquest / details..." /></p>
      <p className="tb mb1">ii. As given by alleged accused:</p>
      <div className="i1">
        <p>a. If he admits or denies the incidence:</p>
        <textarea className="lta" id="hist-admit" rows={2} placeholder="Account of incidence as per his statement..."></textarea>
        <p className="mt1">b. Did he know the victim before: <input className="li" id="hist-know-victim" type="text" placeholder="Yes / No / Details..." /></p>
        <p className="mt1">c. If any injury is present, could it be due to struggle and resistance by the victim:</p>
        <p><input className="li liw" id="hist-injury-struggle" type="text" placeholder="YES / NO / Description..." /></p>
        <p className="mt1">d. If his clothing show evidence of lipstick, blood, foreign hair, mud, grass, vaginal stains:</p>
        <p><input className="li lif" id="hist-clothing-stains" type="text" placeholder="YES / NO / Details..." /></p>
        <p className="mt1">e. If his clothing show evidence of recent tear, loss of button, loose foreign pubic hair:</p>
        <p><input className="li lif" id="hist-clothing-tear" type="text" placeholder="YES / NO / Details..." /></p>
        <p className="mt1">f. Any history of S.T.D before: <label className="rl"><input type="radio" name="std-history" defaultValue="YES" /> YES</label><label className="rl"><input type="radio" name="std-history" defaultValue="NO" /> NO</label></p>
        <p className="mt1">g. Did he take bath, wash etc. after the alleged incidence: <label className="rl"><input type="radio" name="bath-after" defaultValue="YES" /> YES</label><label className="rl"><input type="radio" name="bath-after" defaultValue="NO" /> NO</label></p>
        <p className="mt1">h. Has he changed clothes after the incidence: <label className="rl"><input type="radio" name="clothes-changed" defaultValue="YES" /> YES</label><label className="rl"><input type="radio" name="clothes-changed" defaultValue="NO" /> NO</label></p>
      </div>
    </div>
  </div>

  <div className="sb">
    <span className="sn">5. Physical examination</span>
    <div className="i1 mt1">
      <p>i. <b>Clothing:</b> Look for blood stains, semen, vaginal stain, female pubic hair, mud, grass, lipstick, any tear etc. and describe:</p>
      <textarea className="lta" id="clothing-desc" rows={2} placeholder="Description of clothing evidence / NO"></textarea>

      <p className="mt2">ii. <b>Marks of violence if any</b> (Tick mark if present and describe):</p>
      <div className="i1 mt1">
        <div className="cbr"><label className="cbi"><input type="checkbox" id="bite-marks" /> Bite marks:</label> <input className="li" id="bite-marks-desc" type="text" placeholder="Describe / ABSENT" /></div>
        <div className="cbr mt1"><label className="cbi"><input type="checkbox" id="abrasions" /> Abrasions:</label> <input className="li" id="abrasions-desc" type="text" placeholder="Describe / ABSENT" /></div>
        <div className="cbr mt1"><label className="cbi"><input type="checkbox" id="contusions" /> Contusions:</label> <input className="li" id="contusions-desc" type="text" placeholder="Describe / ABSENT" /></div>
        <div className="cbr mt1"><label className="cbi"><input type="checkbox" id="other-violence" /> Any other:</label> <input className="li" id="other-violence-desc" type="text" placeholder="Describe / ABSENT" /></div>
      </div>

      <p className="mt2">iii. <b>General Configuration:</b></p>
      <div className="i1 mt1">
        <table style={{"border":"none"}}>
          <tr><td style={{"border":"none"}}>Height: <input className="li" id="height" type="text" placeholder="cm" /></td><td style={{"border":"none"}}>Weight: <input className="li" id="weight" type="text" placeholder="kg" /></td></tr>
          <tr><td style={{"border":"none"}}>Body Built: <input className="li" id="body-built" type="text" placeholder="..." /></td><td style={{"border":"none"}}>Blood Pressure: <input className="li" id="bp" type="text" placeholder="mmHg" /></td></tr>
          <tr><td style={{"border":"none"}}>Pulse: <input className="li" id="pulse" type="text" placeholder="b/min" /></td><td style={{"border":"none"}}>Mental status: <input className="li" id="mental-status" type="text" placeholder="SOUND MIND / ..." /></td></tr>
        </table>
      </div>

      <p className="mt1">iv. Axillary hair: <input className="li" id="axillary-hair" type="text" placeholder="ADULT TYPE" /></p>
      <p className="mt1">v. Beard &amp; Mustaches: <input className="li lim" id="beard" type="text" placeholder="PRESENT AND ADULT TYPE / ABSENT" /></p>
      <p className="mt1">vi. Pubic hair (including Tanner staging): <input className="li lim" id="pubic-hair" type="text" placeholder="ADULT TYPE, TANNER STAGE IV" /></p>
      <p className="ann">(If matted preserve clipping for forensic examination)</p>

      <p className="mt2">vii. <b>Dentition:</b> <span className="ann">(Click tooth to mark as not erupted)</span></p>
      <div className="dch">
        <div className="dlb">UPPER JAW (Maxillary) &mdash; Right | Left</div>
        <div className="dr">
          <div className="tooth e" onClick={() => {}} title="UR8">8</div><div className="tooth e" onClick={() => {}} title="UR7">7</div><div className="tooth e" onClick={() => {}} title="UR6">6</div><div className="tooth e" onClick={() => {}} title="UR5">5</div><div className="tooth e" onClick={() => {}} title="UR4">4</div><div className="tooth e" onClick={() => {}} title="UR3">3</div><div className="tooth e" onClick={() => {}} title="UR2">2</div><div className="tooth e" onClick={() => {}} title="UR1">1</div>
          <div className="tdv"></div>
          <div className="tooth e" onClick={() => {}} title="UL1">1</div><div className="tooth e" onClick={() => {}} title="UL2">2</div><div className="tooth e" onClick={() => {}} title="UL3">3</div><div className="tooth e" onClick={() => {}} title="UL4">4</div><div className="tooth e" onClick={() => {}} title="UL5">5</div><div className="tooth e" onClick={() => {}} title="UL6">6</div><div className="tooth e" onClick={() => {}} title="UL7">7</div><div className="tooth e" onClick={() => {}} title="UL8">8</div>
        </div>
        <div className="tsp"></div>
        <div className="dr">
          <div className="tooth e" onClick={() => {}} title="LR8">8</div><div className="tooth e" onClick={() => {}} title="LR7">7</div><div className="tooth e" onClick={() => {}} title="LR6">6</div><div className="tooth e" onClick={() => {}} title="LR5">5</div><div className="tooth e" onClick={() => {}} title="LR4">4</div><div className="tooth e" onClick={() => {}} title="LR3">3</div><div className="tooth e" onClick={() => {}} title="LR2">2</div><div className="tooth e" onClick={() => {}} title="LR1">1</div>
          <div className="tdv"></div>
          <div className="tooth e" onClick={() => {}} title="LL1">1</div><div className="tooth e" onClick={() => {}} title="LL2">2</div><div className="tooth e" onClick={() => {}} title="LL3">3</div><div className="tooth e" onClick={() => {}} title="LL4">4</div><div className="tooth e" onClick={() => {}} title="LL5">5</div><div className="tooth e" onClick={() => {}} title="LL6">6</div><div className="tooth e" onClick={() => {}} title="LL7">7</div><div className="tooth e" onClick={() => {}} title="LL8">8</div>
        </div>
        <div className="dlb">LOWER JAW (Mandibular) &mdash; Right | Left</div>
        <div style={{"marginTop":"5px","display":"flex","gap":"18px","fontSize":"12px"}}>
          <span>Total no: <input className="li" id="teeth-total" type="number" style={{"minWidth":"45px"}} placeholder="0" /></span>
          <span>Permanent: <input className="li" id="teeth-perm" type="number" style={{"minWidth":"45px"}} placeholder="0" /></span>
          <span>Temporary: <input className="li" id="teeth-temp" type="number" style={{"minWidth":"45px"}} placeholder="0" /></span>
        </div>
        <div style={{"marginTop":"3px","fontSize":"12px"}}>Artificial, if any: <input className="li lim" id="teeth-artificial" type="text" placeholder="None / describe..." /></div>
        <div style={{"marginTop":"3px","fontSize":"12px"}}>Spacing behind 2nd permanent molar: <input className="li lim" id="teeth-spacing" type="text" placeholder="..." /></div>
      </div>
    </div>
  </div>
</div>

{/* PAGE 2 Genital Examination */}
<div className="form-page" id="page2">
  <div className="sb">
    <div className="i1">viii. <b>Genital Examination:</b></div>
    <div className="i2 mt1">
      <p>a. (Indicate as Y = Yes, N = No, DNK = Do Not Know)</p>
      <table>
        <thead><tr><th>Parameter</th><th>Pubic region</th><th>Thigh and adjoining part</th></tr></thead>
        <tbody>
          <tr><td>Matted hair</td><td className="ctr"><select className="sel" id="gmp1"><option defaultValue="">-</option><option>Y</option><option>N</option><option>DNK</option></select></td><td className="ctr"><select className="sel" id="gmt1"><option defaultValue="">-</option><option>Y</option><option>N</option><option>DNK</option></select></td></tr>
          <tr><td>Seminal stain</td><td className="ctr"><select className="sel" id="gmp2"><option defaultValue="">-</option><option>Y</option><option>N</option><option>DNK</option></select></td><td className="ctr"><select className="sel" id="gmt2"><option defaultValue="">-</option><option>Y</option><option>N</option><option>DNK</option></select></td></tr>
          <tr><td>Blood</td><td className="ctr"><select className="sel" id="gmp3"><option defaultValue="">-</option><option>Y</option><option>N</option><option>DNK</option></select></td><td className="ctr"><select className="sel" id="gmt3"><option defaultValue="">-</option><option>Y</option><option>N</option><option>DNK</option></select></td></tr>
          <tr><td>Loose foreign hair</td><td className="ctr"><select className="sel" id="gmp4"><option defaultValue="">-</option><option>Y</option><option>N</option><option>DNK</option></select></td><td className="ctr"><select className="sel" id="gmt4"><option defaultValue="">-</option><option>Y</option><option>N</option><option>DNK</option></select></td></tr>
          <tr><td>Injuries</td><td className="ctr"><select className="sel" id="gmp5"><option defaultValue="">-</option><option>Y</option><option>N</option><option>DNK</option></select></td><td className="ctr"><select className="sel" id="gmt5"><option defaultValue="">-</option><option>Y</option><option>N</option><option>DNK</option></select></td></tr>
        </tbody>
      </table>

      <p className="mt2">b. <b>Penis:</b></p>
      <table>
        <thead><tr><th>Parameter</th><th>Remark</th></tr></thead>
        <tbody>
          <tr><td>Development (Tanner Stage)</td><td><input type="text" id="pen-dev" placeholder="ADULT TYPE IV" /></td></tr>
          <tr><td>Any defect</td><td><input type="text" id="pen-defect" placeholder="NIL / describe" /></td></tr>
          <tr><td>Deformity</td><td><input type="text" id="pen-deform" placeholder="NIL / describe" /></td></tr>
          <tr><td>Length and Girth in flaccid condition</td><td><input type="text" id="pen-flaccid" placeholder="Length: ___ cm, Girth: ___ cm" /></td></tr>
          <tr><td>Length and Girth in erect condition</td><td><input type="text" id="pen-erect" placeholder="Length: ___ cm, Girth: ___ cm" /></td></tr>
          <tr><td>Glans penis and frenulum</td><td><input type="text" id="pen-glans" placeholder="INTACT / describe" /></td></tr>
          <tr><td>Whether foreskin can be freely rolled up or is circumcised</td><td><select className="sel" id="pen-foreskin" style={{"width":"100%"}}><option defaultValue="">Select...</option><option>FREELY ROLLED UP</option><option>CIRCUMCISED</option><option>PHIMOSIS</option><option>OTHER</option></select></td></tr>
          <tr><td>Any injury on the frenulum</td><td><input type="text" id="pen-fren" placeholder="NIL / describe" /></td></tr>
          <tr><td>Any injury elsewhere on the organ</td><td><input type="text" id="pen-other-inj" placeholder="NIL / describe" /></td></tr>
          <tr><td>Evidence of any disease e.g. STD</td><td><input type="text" id="pen-disease" placeholder="NIL / describe" /></td></tr>
          <tr><td>Presence of smegma under the foreskin</td><td><select className="sel" id="pen-smegma" style={{"width":"100%"}}><option defaultValue="">Select...</option><option>PRESENT</option><option>ABSENT</option></select></td></tr>
          <tr><td>Hair under prepuce</td><td><select className="sel" id="pen-hair" style={{"width":"100%"}}><option defaultValue="">Select...</option><option>PRESENT</option><option>ABSENT</option></select></td></tr>
          <tr><td>Any stains nearby</td><td><input type="text" id="pen-stains" placeholder="NIL / describe" /></td></tr>
        </tbody>
      </table>
      <p className="mt1">Any Other Remark: <input className="li lif" id="pen-remark" type="text" placeholder="..." /></p>

      <p className="mt2">c. <b>Scrotum and testes</b></p>
      <table>
        <thead><tr><th>Parameter</th><th>Remark</th></tr></thead>
        <tbody>
          <tr><td>Development (Tanner Stage)</td><td><input type="text" id="scr-dev" placeholder="TANNER STAGE IV" /></td></tr>
          <tr><td>Enlargement</td><td><select className="sel" id="scr-enlarge" style={{"width":"100%"}}><option defaultValue="">Select...</option><option>YES</option><option>NO</option></select></td></tr>
          <tr><td>Both testes descended or not</td><td><select className="sel" id="scr-desc" style={{"width":"100%"}}><option defaultValue="">Select...</option><option>YES - Both descended</option><option>NO - Undescended</option><option>ONE SIDE</option></select></td></tr>
          <tr><td>Any disease</td><td><input type="text" id="scr-disease" placeholder="NIL / describe" /></td></tr>
          <tr><td>Any injury</td><td><input type="text" id="scr-injury" placeholder="NIL / describe" /></td></tr>
          <tr><td>Cremasteric Reflex</td><td><select className="sel" id="scr-crem" style={{"width":"100%"}}><option defaultValue="">Select...</option><option>PRESENT</option><option>ABSENT</option></select></td></tr>
        </tbody>
      </table>
      <p className="mt1">Any Other Remark: <input className="li lif" id="scr-remark" type="text" placeholder="..." /></p>

      <p className="mt2">d. <b>Details regarding any Disease/Injury:</b> (Y=Yes, N=No, DNK=Do Not Know, EO=Emission Occurred)</p>
      <table>
        <thead><tr><th>Any Disease/Injury</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>Vas deference</td><td><select className="sel" id="d-vas" style={{"width":"100%"}}><option defaultValue="">-</option><option>Y</option><option>N</option><option>DNK</option><option>EO</option></select></td></tr>
          <tr><td>Epididymis</td><td><select className="sel" id="d-epid" style={{"width":"100%"}}><option defaultValue="">-</option><option>Y</option><option>N</option><option>DNK</option><option>EO</option></select></td></tr>
          <tr><td>Prostate</td><td><select className="sel" id="d-prost" style={{"width":"100%"}}><option defaultValue="">-</option><option>Y</option><option>N</option><option>DNK</option><option>EO</option></select></td></tr>
          <tr><td>On the genital</td><td><select className="sel" id="d-genit" style={{"width":"100%"}}><option defaultValue="">-</option><option>Y</option><option>N</option><option>DNK</option><option>EO</option></select></td></tr>
          <tr><td>Anywhere on the body</td><td><select className="sel" id="d-body" style={{"width":"100%"}}><option defaultValue="">-</option><option>Y</option><option>N</option><option>DNK</option><option>EO</option></select></td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

{/* LEGEND TEMPLATE (reusable) */}


{/* PAGE 3 BODY MAP ANTERIOR/POSTERIOR */}
<div className="form-page" id="page3">
  <div className="bmw">
    <div className="bmt">Body Map Chart &ndash; Anterior and Posterior View</div>
    <div id="legend3"></div>
    <div className="vlr" style={{"marginTop":"8px"}}><span>RIGHT</span><span>LEFT</span><span>LEFT</span><span>RIGHT</span></div>
    <div className="vlr" style={{"fontWeight":"normal","fontSize":"12px"}}><span style={{"flex":"1","textAlign":"center"}}>ANTERIOR</span><span style={{"flex":"1","textAlign":"center"}}>POSTERIOR</span></div>
    <div className="bmir"><img src="image1.png" alt="Anterior and Posterior Body Map" className="bmi" style={{"maxHeight":"340px"}} /></div>
    <div style={{"marginTop":"7px"}}>
      <p style={{"fontSize":"12px","fontWeight":"bold"}}>Findings / Annotations (use legend codes):</p>
      <textarea className="lta" id="bm-ant-post" rows={3} placeholder="Describe findings using legend codes or: NO INJURIES DETECTED IN THE ANTERIOR AND POSTERIOR PART OF BODY."></textarea>
    </div>
    <div className="nin"><label className="cbi" style={{"justifyContent":"center"}}><input type="checkbox" id="ni-ant-post" /> No Injuries Detected in the Anterior and Posterior Part of Body</label></div>
  </div>
</div>

{/* PAGE 4 LATERAL VIEWS */}
<div className="form-page" id="page4">
  <div className="bmw">
    <div className="bmt">Body Map Chart &ndash; Lateral &amp; Inner Views (Right &amp; Left Legs/Body)</div>
    <div id="legend4"></div>
    <div className="bmir" style={{"marginTop":"8px"}}>
      <div style={{"textAlign":"center"}}>
        <img src="image2.png" alt="Lateral Body Views" className="bmi" style={{"maxHeight":"360px"}} />
        <div style={{"display":"flex","justifyContent":"space-around","fontSize":"11px","fontWeight":"bold","marginTop":"3px"}}>
          <span>Inner</span><span>Right<br /><small>Outer</small></span><span>Outer<br /><small>Left</small></span><span>Inner</span>
        </div>
      </div>
    </div>
    <div style={{"marginTop":"7px"}}>
      <p style={{"fontSize":"12px","fontWeight":"bold"}}>Findings / Annotations:</p>
      <textarea className="lta" id="bm-lateral" rows={3} placeholder="Describe findings or: NO INJURIES DETECTED"></textarea>
    </div>
    <div className="nin"><label className="cbi" style={{"justifyContent":"center"}}><input type="checkbox" id="ni-lateral" /> No Injuries Detected (Lateral &amp; Inner Views)</label></div>
  </div>
</div>

{/* PAGE 5 GENITAL MAP */}
<div className="form-page" id="page5">
  <div className="bmw">
    <div className="bmt">Genital Map Chart &ndash; Detailed Regional Views (Right &amp; Left)</div>
    <div id="legend5"></div>
    <div style={{"display":"flex","justifyContent":"space-around","alignItems":"flex-start","gap":"20px","marginTop":"10px"}}>
      <div style={{"textAlign":"center"}}>
        <div style={{"fontWeight":"bold","fontSize":"12px","marginBottom":"4px"}}>RIGHT</div>
        <div style={{"border":"1px solid #aaa","display":"inline-block"}}><img src="image3.png" alt="Genital Map Right" style={{"maxWidth":"200px","height":"auto","display":"block"}} /></div>
      </div>
      <div style={{"textAlign":"center"}}>
        <div style={{"fontWeight":"bold","fontSize":"12px","marginBottom":"4px"}}>LEFT</div>
        <div style={{"border":"1px solid #aaa","display":"inline-block"}}><img src="image3.png" alt="Genital Map Left" style={{"maxWidth":"200px","height":"auto","display":"block","transform":"scaleX(-1)"}} /></div>
      </div>
    </div>
    <div style={{"marginTop":"7px"}}>
      <p style={{"fontSize":"12px","fontWeight":"bold"}}>Findings / Annotations:</p>
      <textarea className="lta" id="bm-genital" rows={3} placeholder="Describe findings or: NO INJURIES DETECTED IN THE ABOVE DETAILED REGIONAL VIEWS."></textarea>
    </div>
    <div className="nin"><label className="cbi" style={{"justifyContent":"center"}}><input type="checkbox" id="ni-genital" /> No Injuries Detected in the Above Detailed Regional Views</label></div>
  </div>
</div>

{/* PAGE 6 SAMPLE COLLECTION */}
<div className="form-page" id="page6">
  <div className="sb">
    <span className="sn">6. Collection of Samples for Forensic Analysis:</span>
    <div className="i1 mt1">

      <p>a. <b>Clothing</b>, where available (Each garment to be wrapped separately and packed in paper bags after air drying &ndash; in envelope labeled step 1A and 1B)</p>
      <table style={{"marginTop":"4px"}}><thead><tr><th style={{"width":"55px"}}>Step</th><th>Evidence Material</th><th style={{"width":"110px"}}>Collected (Y/N)</th><th>Reason if not collected</th></tr></thead><tbody>
        <tr><td className="ctr bld">1A</td><td>Clothing worn at time of alleged incident (Garment 1)</td><td className="ctr"><select className="sel" id="s1a"><option defaultValue="">-</option><option>Y</option><option>N</option></select></td><td><input type="text" id="r1a" placeholder="..." /></td></tr>
        <tr><td className="ctr bld">1B</td><td>Clothing worn at time of alleged incident (Garment 2)</td><td className="ctr"><select className="sel" id="s1b"><option defaultValue="">-</option><option>Y</option><option>N</option></select></td><td><input type="text" id="r1b" placeholder="..." /></td></tr>
      </tbody></table>

      <p className="mt2">b. <b>Collection of Hair Sample</b> (In envelope labeled step 2A, 2B and 2C)</p>
      <table style={{"marginTop":"4px"}}><thead><tr><th style={{"width":"55px"}}>Steps</th><th>Evidence Material</th><th style={{"width":"110px"}}>Collected (Y/N)</th><th>Reason if not collected</th></tr></thead><tbody>
        <tr><td className="ctr bld">2A</td><td>Plucked Pubic hair (mention if shaved)</td><td className="ctr"><select className="sel" id="s2a"><option defaultValue="">-</option><option>Y</option><option>N</option></select></td><td><input type="text" id="r2a" placeholder="..." /></td></tr>
        <tr><td className="ctr bld">2B</td><td>Cut strands of pubic hair (mention if shaved)</td><td className="ctr"><select className="sel" id="s2b"><option defaultValue="">-</option><option>Y</option><option>N</option></select></td><td><input type="text" id="r2b" placeholder="..." /></td></tr>
        <tr><td className="ctr bld">2C</td><td>Cut strands of Matted pubic hair</td><td className="ctr"><select className="sel" id="s2c"><option defaultValue="">-</option><option>Y</option><option>N</option></select></td><td><input type="text" id="r2c" placeholder="..." /></td></tr>
      </tbody></table>

      <p className="mt2">c. <b>Collection of Loose foreign pubic hair or fiber of clothing</b> (In envelope labeled step 3)</p>
      <table style={{"marginTop":"4px"}}><thead><tr><th style={{"width":"55px"}}>Steps</th><th>Evidence Material</th><th style={{"width":"110px"}}>Collected (Y/N)</th><th>Reason if not collected</th></tr></thead><tbody>
        <tr><td className="ctr bld">3A</td><td>Loose foreign pubic hair</td><td className="ctr"><select className="sel" id="s3a"><option defaultValue="">-</option><option>Y</option><option>N</option></select></td><td><input type="text" id="r3a" placeholder="..." /></td></tr>
        <tr><td className="ctr bld">3B</td><td>Loose fiber of clothing</td><td className="ctr"><select className="sel" id="s3b"><option defaultValue="">-</option><option>Y</option><option>N</option></select></td><td><input type="text" id="r3b" placeholder="..." /></td></tr>
      </tbody></table>

      <p className="mt2">d. <b>Collection of Swabs for semen, blood, mud, grass etc on body</b> (In envelope labeled step 4)</p>
      <table style={{"marginTop":"4px"}}><thead><tr><th style={{"width":"55px"}}>Steps</th><th>Evidence Material</th><th style={{"width":"110px"}}>Collected (Y/N)</th><th>Reason if not collected</th></tr></thead><tbody>
        <tr><td className="ctr bld">4A</td><td>Two Swabs and two slides from Stains on the body</td><td className="ctr"><select className="sel" id="s4a"><option defaultValue="">-</option><option>Y</option><option>N</option></select></td><td><input type="text" id="r4a" placeholder="..." /></td></tr>
        <tr><td className="ctr bld">4B</td><td>Two Swabs and two slides for semen</td><td className="ctr"><select className="sel" id="s4b"><option defaultValue="">-</option><option>Y</option><option>N</option></select></td><td><input type="text" id="r4b" placeholder="..." /></td></tr>
        <tr><td className="ctr bld">4C</td><td>Two Swabs and two slides for blood</td><td className="ctr"><select className="sel" id="s4c"><option defaultValue="">-</option><option>Y</option><option>N</option></select></td><td><input type="text" id="r4c" placeholder="..." /></td></tr>
        <tr><td className="ctr bld">4D</td><td>Two Swabs from muddy stains, grass etc</td><td className="ctr"><select className="sel" id="s4d"><option defaultValue="">-</option><option>Y</option><option>N</option></select></td><td><input type="text" id="r4d" placeholder="..." /></td></tr>
      </tbody></table>

      <p className="mt2">e. <b>Collection of Urethral swabs and smears and Scrotal Swabs and smears</b> (In envelope labeled step 5)</p>
      <p className="ann">(for detection of seminal content, gonococci etc., DNA testing, STD, etc.)</p>
      <table style={{"marginTop":"4px"}}><thead><tr><th style={{"width":"55px"}}>Steps</th><th>Evidence Material</th><th style={{"width":"110px"}}>Collected (Y/N)</th><th>Reason if not collected</th></tr></thead><tbody>
        <tr><td className="ctr bld">5A</td><td>One Urethral swabs and two slides (for semen examination and DNA testing)</td><td className="ctr"><select className="sel" id="s5a"><option defaultValue="">-</option><option>Y</option><option>N</option></select></td><td><input type="text" id="r5a" placeholder="..." /></td></tr>
        <tr><td className="ctr bld">5B</td><td>One Urethral swabs (for STD)</td><td className="ctr"><select className="sel" id="s5b"><option defaultValue="">-</option><option>Y</option><option>N</option></select></td><td><input type="text" id="r5b" placeholder="..." /></td></tr>
        <tr><td className="ctr bld">5C</td><td>Two Scrotal Swabs and two slides</td><td className="ctr"><select className="sel" id="s5c"><option defaultValue="">-</option><option>Y</option><option>N</option></select></td><td><input type="text" id="r5c" placeholder="..." /></td></tr>
      </tbody></table>

      <p className="mt2">f. <b>Collection of Penile swabs and smears and Penile washings</b> (In envelope labeled step 6)</p>
      <table style={{"marginTop":"4px"}}><thead><tr><th style={{"width":"55px"}}>Steps</th><th>Evidence Material</th><th style={{"width":"110px"}}>Collected (Y/N)</th><th>Reason if not collected</th></tr></thead><tbody>
        <tr><td className="ctr bld">6A</td><td>Two Penile swabs and two slides</td><td className="ctr"><select className="sel" id="s6a"><option defaultValue="">-</option><option>Y</option><option>N</option></select></td><td><input type="text" id="r6a" placeholder="..." /></td></tr>
        <tr><td className="ctr bld">6B</td><td>Penile washings</td><td className="ctr"><select className="sel" id="s6b"><option defaultValue="">-</option><option>Y</option><option>N</option></select></td><td><input type="text" id="r6b" placeholder="..." /></td></tr>
      </tbody></table>

      <p className="mt2">g. <b>Collection of Nail Cuttings and scrapings</b> (In envelope labeled step 7)</p>
      <table style={{"marginTop":"4px"}}><thead><tr><th style={{"width":"55px"}}>Steps</th><th>Evidence Material</th><th style={{"width":"110px"}}>Collected (Y/N)</th><th>Reason if not collected</th></tr></thead><tbody>
        <tr><td className="ctr bld">7A</td><td>Nail scrapings</td><td className="ctr"><select className="sel" id="s7a"><option defaultValue="">-</option><option>Y</option><option>N</option></select></td><td><input type="text" id="r7a" placeholder="..." /></td></tr>
        <tr><td className="ctr bld">7B</td><td>Nail Cuttings</td><td className="ctr"><select className="sel" id="s7b"><option defaultValue="">-</option><option>Y</option><option>N</option></select></td><td><input type="text" id="r7b" placeholder="..." /></td></tr>
      </tbody></table>

      <p className="mt2">h. <b>Collection of Swabs from buccal mucosa</b> (In envelope labeled step 8)</p>
      <table style={{"marginTop":"4px"}}><thead><tr><th style={{"width":"55px"}}>Steps</th><th>Evidence Material</th><th style={{"width":"110px"}}>Collected (Y/N)</th><th>Reason if not collected</th></tr></thead><tbody>
        <tr><td className="ctr bld">8</td><td>Air Dried Saliva Soaked Gauze</td><td className="ctr"><select className="sel" id="s8"><option defaultValue="">-</option><option>Y</option><option>N</option></select></td><td><input type="text" id="r8" placeholder="..." /></td></tr>
      </tbody></table>

      <p className="mt2">i. <b>Blood Collection</b> (In envelope labeled step 9)</p>
      <table style={{"marginTop":"4px"}}><thead><tr><th style={{"width":"55px"}}>Steps</th><th>Evidence Material</th><th style={{"width":"110px"}}>Collected (Y/N)</th><th>Reason if not collected</th></tr></thead><tbody>
        <tr><td className="ctr bld">9A</td><td>Blood for grouping (gauze cloth)</td><td className="ctr"><select className="sel" id="s9a"><option defaultValue="">-</option><option>Y</option><option>N</option></select></td><td><input type="text" id="r9a" placeholder="..." /></td></tr>
        <tr><td className="ctr bld">9B</td><td>Blood for DNA analysis on DNA card</td><td className="ctr"><select className="sel" id="s9b"><option defaultValue="">-</option><option>Y</option><option>N</option></select></td><td><input type="text" id="r9b" placeholder="..." /></td></tr>
      </tbody></table>
    </div>
  </div>
</div>

{/* PAGE 7 XRAY POTENCY OPINION */}
<div className="form-page" id="page7">
  <div className="sb">
    <p><span className="sn">7. X-ray for age estimation (if needed):</span> <input className="li liw" id="xray" type="text" placeholder="NOT APPLICABLE / details..." /></p>
  </div>
  <hr className="sd" />

  <div className="sb">
    <span className="sn">8. Tests advised for potency / impotency (Wherever required)</span>
    <div className="i1 mt1">
      <p className="tb">1. Blood Sample Collection (EDTA) for following tests:</p>
      <div className="i1 mt1">
        <div className="cbr"><label className="cbi"><input type="checkbox" id="t-gtt" /> GTT (Glucose Tolerance Test)</label><label className="cbi"><input type="checkbox" id="t-elec" /> Serum Electrolytes</label><label className="cbi"><input type="checkbox" id="t-creat" /> Serum Creatinine</label></div>
        <div className="cbr mt1"><label className="cbi"><input type="checkbox" id="t-lft" /> Liver Function Tests (LFT)</label><label className="cbi"><input type="checkbox" id="t-fbc" /> Full Blood Count, Hemogram, ESR, Hb</label><label className="cbi"><input type="checkbox" id="t-prol" /> Serum Prolactin Level</label></div>
        <div className="cbr mt1"><label className="cbi"><input type="checkbox" id="t-thy" /> Thyroid Function Test</label><label className="cbi"><input type="checkbox" id="t-testo" /> Serum Testosterone</label><label className="cbi"><input type="checkbox" id="t-shbg" /> Sex Hormone Binding Globulin (SHBG)</label></div>
      </div>
      <p className="tb mt2">2. Accused referred for special investigation for confirmation of potency (if required):</p>
      <div className="i1 mt1">
        <div className="cbr"><label className="cbi"><input type="checkbox" id="i-npt" /> Nocturnal Penile Tumescence (NPT)</label><label className="cbi"><input type="checkbox" id="i-cav" /> Cavernosography</label><label className="cbi"><input type="checkbox" id="i-pipe" /> Pharmacologically Induced Penile Erection (PIPE) Test</label></div>
        <div className="cbr mt1"><label className="cbi"><input type="checkbox" id="i-dop" /> Doppler Studies</label><label className="cbi"><input type="checkbox" id="i-pud" /> Pudendal Arteriography</label><label className="cbi"><input type="checkbox" id="i-pharm" /> Pharmacocavernosometry</label></div>
      </div>
      <div className="mt2">
        <label className="cbi"><input type="checkbox" id="t-na" /> <b>THE ABOVE-MENTIONED TEST IS NOT APPLICABLE.</b></label>
        <p className="mt1">Remarks: <input className="li lif" id="potency-rem" type="text" placeholder="Additional remarks..." /></p>
      </div>
    </div>
  </div>

  <hr className="sd" />

  <div className="sb">
    <span className="sn">Opinion:</span> <span className="ann">(May be given as format attached as Appendix A)</span>
    <ol className="opl mt1">
      <li>From examination of the physical &amp; mental development &amp; mental status, there was:
        <textarea className="lta mt1" id="op1" rows={2} placeholder="nothing detected to suggest that the accused is not capable of sexual intercourse / OR describe..."></textarea>
      </li>
      <li>Bodily injuries on the person of the accused:
        <textarea className="lta mt1" id="op2" rows={2} placeholder="No bodily injuries could be detected / OR describe injuries..."></textarea>
      </li>
      <li>Wearing apparels / clothing:
        <textarea className="lta mt1" id="op3" rows={2} placeholder="The wearing apparels of the time of the alleged incident were not produced / OR describe..."></textarea>
      </li>
      <li>Physical findings suggestive of a recent sexual act:
        <textarea className="lta mt1" id="op4" rows={2} placeholder="There were no physical findings...however, possibility could not be ruled out completely. / OR describe..."></textarea>
      </li>
      <li>Urethral swab &amp; smear:
        <textarea className="lta mt1" id="op5" rows={2} placeholder="Urethral swab & smear has been preserved and handed over to accompanying police for onward transmission to SBPL / describe..."></textarea>
      </li>
      <li>Additional findings / remarks:
        <textarea className="lta mt1" id="op6" rows={2} placeholder="Air dried soaked salivary gauze and plucked pubic hair has been preserved / describe..."></textarea>
      </li>
    </ol>
  </div>

  <div className="sgg">
    <div>
      <div className="sro">Station: <input className="li lim" id="sig-station" type="text" placeholder="e.g. CUTTACK" /></div>
      <div className="sro">Date: <input className="li" id="sig-date" type="date" /></div>
      <div className="sro">Time: <input className="li" id="sig-time" type="time" /></div>
    </div>
    <div style={{"textAlign":"right"}}>
      <div style={{"marginBottom":"36px","fontSize":"12px"}}>Signature .....................................................................</div>
      <div className="sro" style={{"justifyContent":"flex-end"}}>Name: <input className="li lim" id="sig-name" type="text" placeholder="Doctor's full name" /></div>
      <div className="sro" style={{"justifyContent":"flex-end"}}>Reg. No: <input className="li" id="sig-reg" type="text" placeholder="e.g. 27706/2021" /></div>
      <div className="sro" style={{"justifyContent":"flex-end"}}>Designation: <input className="li lim" id="sig-desig" type="text" placeholder="e.g. PG DEPT OF FM&T, SCB" /></div>
    </div>
  </div>
  <div style={{"marginTop":"14px","border":"1.5px dashed #000","padding":"9px","textAlign":"center","fontSize":"11px","color":"#777"}}>[ Official Seal / Stamp ]</div>
</div>



    </>
  );
};
